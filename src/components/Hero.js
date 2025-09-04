import React from "react";

export default function Hero() {
  return (
    <section className="bg-green-50 pt-28 pb-20 text-center">
      <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
        Eat Healthy, Live Happy 🌱
      </h2>
      <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
        Personalized diet plans and expert nutrition advice for a healthier you.
      </p>
      <div className="mt-6 flex justify-center space-x-4">
        <button  className="bg-green-600 text-white px-8 py-3 rounded-lg shadow-md hover:bg-green-700 transition-transform transform hover:scale-105 duration-300">
          Book Appointment
        </button>
        <button className="border border-green-600 text-green-600 px-6 py-3 rounded-lg hover:bg-green-600 hover:text-white transition-all duration-300 ease-in-out">
          Learn More
        </button>
      </div>
    </section>
  );
}
