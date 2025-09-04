import React, { useState } from "react";
import { User } from "lucide-react";
import Login from "./Login";
import Signup from "./Signup";

export default function Navbar() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const openSignup = () => {
    setIsLoginOpen(false);
    setIsSignupOpen(true);
  };

  const openLogin = () => {
    setIsSignupOpen(false);
    setIsLoginOpen(true);
  };

  return (
    <nav className="fixed top-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
       
        <h1 className="text-3xl font-bold text-green-600">NutriFit</h1>

        <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <li><a href="#about">About</a></li>
          <li><a href="#appointment">Appointment</a></li>
          <li><a href="#blog">Blog</a></li>
          <li><a href="#feedback">Feedback</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsLoginOpen(true)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-green-600 border border-green-600 
              hover:bg-white hover:text-green-600 transition"
          >
            <User className="w-5 h-5 text-white hover:text-green-600" />
          </button>
        </div>
      </div>

      <Login
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSignup={openSignup}
      />

      <Signup
        isOpen={isSignupOpen}
        onClose={() => setIsSignupOpen(false)}
        onLogin={openLogin}
      />
    </nav>
  );
}
