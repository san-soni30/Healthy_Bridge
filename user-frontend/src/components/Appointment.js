import React, { useState } from "react";

export default function Appointment() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    age: "",
    address: "",
    consultationType: "offline",
    appointmentDate: "",
    timeSlot: "",
  });

  // Calculate age from DOB
  const handleDobChange = (e) => {
    const dob = e.target.value;
    let age = "";

    if (dob) {
      const birthDate = new Date(dob);
      const today = new Date();
      age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
    }

    setFormData({ ...formData, dob, age });
  };

  // Generic input handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const timeSlots = [
    "09:00-09:30",
    "09:30-10:00",
    "10:00-10:30",
    "10:30-11:00",
    "11:00-11:30",
    "11:30-12:00",
    "16:00-16:30",
    "16:30-17:00",
    "17:00-17:30",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // send to backend
  };
const inputClass =
  "w-full p-3 border rounded-md outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500";

  return (
    <section className="py-16 bg-green-50 px-6">
      <div className="max-w-4xl mx-auto">
        <h3 className="text-3xl font-bold text-green-700 text-center mb-10">
          Book an Appointment
        </h3>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white shadow-lg rounded-xl p-8"
        >
          {/* Name */}
          <div>
            <label className="font-medium text-gray-700">Full Name</label>
            <input
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Email */}
          <div>
            <label className="font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* DOB */}
          <div>
            <label className="font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              name="dob"
              required
              value={formData.dob}
              onChange={handleDobChange}
              className={inputClass}
            />
          </div>

          {/* Age */}
          <div>
            <label className="font-medium text-gray-700">Age</label>
            <input
              value={formData.age ? `${formData.age} years` : ""}
              readOnly
              className={inputClass}
            />
          </div>

          {/* Phone */}
          <div>
            <label className="font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Consultation Type */}
          <div>
            <label className="font-medium text-gray-700">
              Consultation Type
            </label>
            <select
              name="consultationType"
              value={formData.consultationType}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="offline">Offline</option>
              <option value="online">Online (Video Call)</option>
            </select>
          </div>

          {/* Appointment Date */}
          <div>
            <label className="font-medium text-gray-700">
              Appointment Date
            </label>
            <input
              type="date"
              name="appointmentDate"
              required
              value={formData.appointmentDate}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Time Slot (Only Online) */}
          {formData.consultationType === "online" && (
            <div>
              <label className="font-medium text-gray-700">Time Slot</label>
              <select
                name="timeSlot"
                required
                value={formData.timeSlot}
                onChange={handleChange}
                className={inputClass}>
                <option value="">Select Time Slot</option>
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Address */}
          <div className="md:col-span-2">
            <label className="font-medium text-gray-700">Address</label>
            <textarea
              name="address"
              required
              rows="3"
              value={formData.address}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Submit */}
          <div className="md:col-span-2 text-center">
            <button
              type="submit"
              className="bg-green-600 text-white px-10 py-3 rounded-lg hover:bg-green-700 transition"
            >
              Book Appointment
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
