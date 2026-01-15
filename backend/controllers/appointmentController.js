const Appointment = require('../models/Appointment');

// Book Aoppointment by Client
exports.bookAppointment = async (req, res) => {
   try {
      const { name, email, phone, dob, appointmentDate, address} = req.body;

      const appointment = await Appointment.create({user: req.user.id, name, email, phone, dob, appointmentDate, address});

      res.status(200).json({ message: 'Appointment booked successfully', appointment });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}

// View all appointments to Admin 
exports.getAllAppointments = async(req, res) => {
   try {
      const appointment = await Appointment.find().sort({createdAt: -1});
      return res.status(200).json({appointment});

   } catch (error) {
      return res.status(500).json({message: error.message});
   }
}

// Update appointment status by Admin
exports.updateAppointment = async(req, res) => {
   try {
      const {status} = req.body;

      const appointment = await Appointment.findById(req.params.id);

      if(!appointment){
         return status(404).json({message: 'Appointment not found'});
      }

      appointment.status = status;
      await appointment.save();
      return res.status(200).json({message: 'Appointment status updated successfully', appointment});

   } catch (error) {
      return res.status(500).json({message: error.message});
   }
}

// Delete appointment by Admin 
exports.deleteAppointment = async (req, res) => {
   try {
      const appointment = await Appointment.findById(req.params.id);

      if(!appointment) {
         return res.status(404).json({ message: 'Appointment not found' });
      }

      await Appointment.findByIdAndDelete(req.params.id);
      return res.status(200).json({ message: 'Appointment deleted successfully' });

   } catch (error) {
      return res.status(500).json({message: error.message});
   }
}

