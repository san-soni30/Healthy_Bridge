import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Appointment from "./components/Appointment";
import Blog from "./components/Blog";
import Feedback from "./components/Feedback";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Appointment />
      <Blog />
      <Feedback />
      <Contact />
      <Footer />
    </>
  );
}
