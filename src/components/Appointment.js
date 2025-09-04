import React, { useState } from "react";

export default function Appointment() {
  const [dob, setDob] = useState("");
  const [age, setAge] = useState("");

  // Function to calculate age from DOB
  const handleDobChange = (e) => {
    const selectedDob = e.target.value;
    setDob(selectedDob);

    if (selectedDob) {
      const birthDate = new Date(selectedDob);
      const today = new Date();
      let calculatedAge = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        calculatedAge--;
      }

      setAge(calculatedAge);
    } else {
      setAge("");
    }
  };

  return (
    <section id="appointment" className="py-16 bg-green-50 px-6">
      <div className="max-w-4xl mx-auto">
        <h3 className="text-3xl font-bold text-green-700 text-center mb-10">
          Book an Appointment
        </h3>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white shadow-lg rounded-xl p-8">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            />
          </div>
{/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            />
          </div>

          {/* DOB */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              value={dob}
              onChange={handleDobChange}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            />
          </div>

          {/* Age */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Age</label>
            <input
              type="text"
              value={age ? `${age} years` : ""}
              placeholder="Auto-calculated"
              readOnly
              className="w-full p-3 border rounded-md bg-gray-100 text-gray-600"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="Enter phone number"
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            />
          </div>

          

          {/* Appointment Date */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Appointment Date
            </label>
            <input
              type="date"
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            />
          </div>

          {/* Address (full width) */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-medium mb-2">
              Address
            </label>
            <textarea
              rows="3"
              placeholder="Enter your address"
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 text-center">
            <button className="bg-green-600 text-white px-8 py-3 rounded-lg shadow-md hover:bg-green-700 transition-transform transform hover:scale-105 duration-300">
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
