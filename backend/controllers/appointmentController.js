const Appointment = require('../models/Appointment');
const { sendEmail } = require("../services/emailService");
const { callMeetingWorkflow } = require("../services/n8nService");
const appointmentBooked = require("../templates/appointmentBooked");
const appointmentApproved = require("../templates/appointmentApproved");
const paymentConfirmed = require("../templates/paymentConfirmed");
const meetingLinkTemplate = require("../templates/meetingLink");
const crypto = require('crypto')

// Helper - Meeting token generation
// const generateMeetingToken = () => {
//   return crypto.randomBytes(32).toString("hex");
// }

// Helper - Passed time slot verification
const isPastTimeSlot = (appointmentDate, timeSlot) => {
  const [startTime] = timeSlot.split("-");
  const [hours, minutes] = startTime.split(":").map(Number);

  const slotDateTime = new Date(appointmentDate);
  slotDateTime.setHours(hours, minutes, 0, 0);

  return slotDateTime < new Date();
};

// Helper - Meeting Link expiration
const isMeetingExpired = (expiresAt) => {
  return expiresAt && expiresAt < new Date();
};

// Helper - Meeting link join request withing time slot
const isWithinAppointmentWindow = (appointmentDate, timeSlot) => {
  const [start, end] = timeSlot.split("-");

  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);

  const startTime = new Date(appointmentDate);
  startTime.setHours(sh, sm, 0, 0);

  const endTime = new Date(appointmentDate);
  endTime.setHours(eh, em, 0, 0);

  const now = new Date();

  return now >= startTime && now <= endTime;
};

// Helper - If sendEmail fails
const safeSendEmail = async (options) => {
  try {
    await sendEmail(options);
  } catch (err) {
    console.error("📧 Email failed:", err.message);
  }
};

// Helper - Appointment cancel if payement not done within duration
const autoCancelUnpaidAppointments = async () => {
  const expiryTime = new Date(Date.now() - 24 * 60 * 60 * 1000);

  await Appointment.updateMany(
    {
      status: "approved",
      updatedAt: { $lt: expiryTime },
    },
    {
      status: "cancelled",
      adminNote: "Auto-cancelled due to non-payment",
    }
  );
};


// Book Appointment (Client)
exports.bookAppointment = async (req, res) => {
  try {
    const { name, email, phone, dob, appointmentDate, timeSlot, address } = req.body;

    const selectedDate = new Date(appointmentDate);
    const today = new Date();

    if (
      selectedDate.toDateString() === today.toDateString() &&
      isPastTimeSlot(selectedDate, timeSlot)
    ) {
      return res.status(400).json({
        message: "Selected time slot has already passed. Please choose another slot.",
      });
    }

    const appointment = await Appointment.create({
      user: req.user.id,
      name,
      email,
      phone,
      dob,
      appointmentDate,
      timeSlot,
      address,
    });

    await safeSendEmail({
      to: appointment.email,
      subject: "Appointment Request Received",
      html: appointmentBooked(
        appointment.name,
        new Date(appointment.appointmentDate).toDateString(),
        appointment.timeSlot
      ),
    });

    return res.status(201).json({
      message: "Appointment booked successfully",
      appointment,
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Selected date and time slot is already booked",
      });
    }
    return res.status(500).json({ message: error.message });
  }
};

// View all appointments (Admin)
exports.getAllAppointments = async (req, res) => {
  try {
    await autoCancelUnpaidAppointments();

    const appointments = await Appointment.find().sort({ createdAt: -1 });

    for (const appointment of appointments) {
      if (isMeetingExpired(appointment.meetingExpiresAt)) {
        appointment.meetingLink = null;
        appointment.meetingExpiresAt = null;
        await appointment.save();
      }
    }

    return res.status(200).json({ appointments });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Update appointment status (Admin)
exports.updateAppointment = async (req, res) => {
  try {
    const { status, adminNote } = req.body;
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    const allowedTransitions = {
      pending: ['approved', 'rejected', 'cancelled'],
      approved: ['cancelled'],
      paid: ['ongoing', 'cancelled'],
      ongoing: ['completed'],
    };

    if (
      allowedTransitions[appointment.status] &&
      !allowedTransitions[appointment.status].includes(status)
    ) {
      return res.status(400).json({
        message: `Invalid status transition from ${appointment.status} to ${status}`,
      });
    }

    appointment.status = status;
    if (adminNote) appointment.adminNote = adminNote;
    await appointment.save();

    if (status === "approved") {
      await safeSendEmail({
        to: appointment.email,
        subject: "Appointment Approved",
        html: appointmentApproved(
          appointment.name,
          new Date(appointment.appointmentDate).toDateString(),
          appointment.timeSlot
        ),
      });
    }

    return res.status(200).json({
      message: "Appointment status updated successfully",
      appointment,
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Confirm payment (Admin)
exports.confirmPayment = async (req, res) => {
  try {
    const { paymentId, method, amount } = req.body;
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    if (appointment.status !== "approved") {
      return res.status(400).json({
        message: "Payment allowed only after appointment approval",
      });
    }

    if (appointment.payment?.paidAt) {
      return res.status(400).json({ message: "Payment already confirmed" });
    }

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid payment amount" });
    }

    appointment.payment = {
      paymentId,
      method,
      amount,
      paidAt: new Date(),
    };
    appointment.status = "paid";

    if (!appointment.meetingToken) {
      try {
        const data = await callMeetingWorkflow({
          appointmentId: appointment._id.toString(),
          name: appointment.name,
          email: appointment.email,
          appointmentDate: appointment.appointmentDate,
          timeSlot: appointment.timeSlot,
        });

        appointment.meetingLink = data.meetingLink;
        appointment.meetingToken = data.meetingToken;

        const [_, end] = appointment.timeSlot.split("-");
        const [eh, em] = end.split(":").map(Number);
        const expiresAt = new Date(appointment.appointmentDate);
        expiresAt.setHours(eh, em, 0, 0);
        appointment.meetingExpiresAt = expiresAt;

      } catch (err) {
        console.error("⚠️ n8n error:", err.message);
        appointment.adminNote = "Meeting generation failed";
      }
    }

    await appointment.save();

    await safeSendEmail({
      to: appointment.email,
      subject: "Payment Confirmation",
      html: paymentConfirmed(appointment.name, amount),
    });

    return res.status(200).json({
      message: "Payment confirmed successfully",
      appointment,
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


// Meeting Link handling 
exports.joinMeeting = async (req, res) => {
  try {
    const { token } = req.params;

    const appointment = await Appointment.findOne({
      meetingToken: token,
      status: { $in: ["paid", "ongoing"] },
    });

    if (!appointment) {
      return res.status(404).json({ message: "Invalid meeting link" });
    }

    
    if (!isWithinAppointmentWindow(
      appointment.appointmentDate,
      appointment.timeSlot
    )) {
      return res.status(403).json({
        message: "Meeting link is not active yet",
      });
    }

    if (appointment.meetingExpiresAt && appointment.meetingExpiresAt < new Date()) {
      return res.status(403).json({ message: "Meeting link expired" });
    }

    if (appointment.status !== "ongoing") {
      appointment.status = "ongoing";
      await appointment.save();
    }

    return res.status(200).json({
      message: "Meeting access granted",
      appointmentId: appointment._id,
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


// Delete appointment (Admin)
exports.deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    await appointment.deleteOne();
    return res.status(200).json({ message: 'Appointment deleted successfully' });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

