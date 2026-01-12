
import React from "react";
import heroImg from "../assets/hero.png"; // add your illustration here

export default function Hero() {
  return (
    <section className="relative bg-green-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-14 grid grid-cols-1 md:grid-cols-2 items-center gap-10">

        {/* LEFT CONTENT */}
        <div className="text-center md:text-left z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Eat Healthy, <br /> Live Happy 🌱
          </h2>

          <p className="mt-4 text-lg text-gray-600 max-w-xl">
            Personalized diet plans and expert nutrition advice for a healthier you.
          </p>

          <div className="mt-8 flex justify-center md:justify-start gap-4">
            <button className="bg-green-600 text-white px-8 py-3 rounded-lg shadow-md hover:bg-green-700 transition-transform transform hover:scale-105 duration-300">
              Book Appointment
            </button>

            <button className="border border-green-600 text-green-600 px-6 py-3 rounded-lg hover:bg-green-600 hover:text-white transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>

        {/* RIGHT BACKGROUND SHAPE */}
        <div className="relative flex justify-center">
          {/* Floating Image */}
          <img
            src={heroImg}
            alt="Nutrition Experts"
            className="relative w-96 md:w-[420px] lg:w-[480px] drop-shadow-xl animate-float"
          />

        </div>
      </div>
    </section>
  );
}
