import React from "react";

export default function Footer() {
  return (
    <footer className="bg-green-700 text-white py-6 text-center">
      <p>© 2025 NutriCare. All Rights Reserved.</p>
      <div className="mt-2 space-x-4">
        <a href="/" className="hover:underline">Facebook</a>
        <a href="/" className="hover:underline">Instagram</a>
        <a href="/" className="hover:underline">LinkedIn</a>
      </div>
    </footer>
  );
}
