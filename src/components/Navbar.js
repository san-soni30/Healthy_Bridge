import React, { useState } from "react";
import { User } from "lucide-react";
import { NavLink } from "react-router-dom";
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
        <h1 className="text-3xl font-bold text-green-600"><NavLink to="/" >
          NutriFit</NavLink></h1>

        <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "text-green-600 font-semibold" : "hover:text-green-600"
              }
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/appointment"
              className={({ isActive }) =>
                isActive ? "text-green-600 font-semibold" : "hover:text-green-600"
              }
            >
              Appointment
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/blog"
              className={({ isActive }) =>
                isActive ? "text-green-600 font-semibold" : "hover:text-green-600"
              }
            >
              Blog
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/feedback"
              className={({ isActive }) =>
                isActive ? "text-green-600 font-semibold" : "hover:text-green-600"
              }
            >
              Feedback
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? "text-green-600 font-semibold" : "hover:text-green-600"
              }
            >
              Contact
            </NavLink>
          </li>
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

      {/* Login & Signup */}
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
