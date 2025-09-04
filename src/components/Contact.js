import React from "react";

export default function Contact() {
  return (
    <section id="contact" className="py-16 max-w-4xl mx-auto px-6">
      <h3 className="text-3xl font-bold text-green-700 text-center mb-6">
        Get in Touch
      </h3>
      <form className="space-y-4">
        <input type="text" placeholder="Your Name" className="w-full p-3 border rounded-md" />
        <input type="email" placeholder="Your Email" className="w-full p-3 border rounded-md" />
        <textarea placeholder="Your Message" rows="5" className="w-full p-3 border rounded-md"></textarea>
        <button className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700">
          Send Message
        </button>
      </form>
    </section>
  );
}
