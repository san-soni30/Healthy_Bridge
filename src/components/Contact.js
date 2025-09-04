import React from "react";

export default function Contact() {
  return (
    <div>
    <section id="contact" className="py-16 max-w-4xl mx-auto px-6">
      <h3 className="text-3xl font-bold text-green-700 text-center mb-6">
        Get in Touch
      </h3>
      <form className="space-y-4">
        {/* Email */}
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
    </section>
    </div>
  );
}

