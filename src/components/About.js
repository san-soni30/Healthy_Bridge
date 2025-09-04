import React from "react";
import dieticianImage from "../assets/dietician.jpg"; 

export default function About() {
  return (
    <div>
    <section id="about" className="py-16 max-w-5xl mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-1 items-center ">
        <img
          src={dieticianImage}
          alt="Dietician"
          className="rounded-xl shadow-lg object-cover transform transition duration-500 hover:scale-105 hover:shadow-2xl"
  style={{ height: "550px" }}
        />
        <div>
          <h3 className="text-3xl font-bold text-green-700 mb-4">About Me</h3>
          <p className="text-gray-700 leading-relaxed mb-6">
            Hi, I’m <b>Dr. Sarah Williams</b>, a certified dietician with over
            10 years of experience in helping people live healthier lives. I
            specialize in weight management, nutrition for medical conditions,
            and wellness coaching.
          </p>
          <ul className="space-y-2 text-gray-700">
            <li>✅ Personalized Nutrition Plans</li>
            <li>✅ Weight Management Support</li>
            <li>✅ Wellness & Lifestyle Coaching</li>
          </ul>
        </div>
      </div>
    </section>
    </div>
  );
}
