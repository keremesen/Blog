import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  return (
    <nav className="flex items-center justify-between w-full bg-gradient-to-r from-white to-zinc-50 px-6 py-4 md:py-8">
      <Link to="/" className="text-3xl font-semibold">
        Lorem
      </Link>
      <div className="z-10 md:hidden text-zinc-900">
        <button
          onClick={() => setNavbarOpen(!navbarOpen)}
          className="text-2xl p-2"
        >
          {navbarOpen ? "✕" : "☰"}
        </button>
        {navbarOpen && (
          <div className="p-4 rounded-sm absolute flex flex-col top-16 right-0 text-sm bg-white w-full md:w-64">
            <Link to="/" className="mb-2">
              Home
            </Link>
            <Link to="/" className="mb-2">
              About Me
            </Link>
            <Link to="/" className="mb-2">
              My Blog
            </Link>
            <Link to="/" className="mb-2">
              Services
            </Link>
            <Link to="/" className="mb-2">
              Contact
            </Link>
          </div>
        )}
      </div>
      <div className="hidden md:flex w-2/3 justify-end font-semibold text-zinc-900">
        <Link to="/" className="link link-underline link-underline-color mx-4">
          Home
        </Link>
        <Link to="/" className="link link-underline link-underline-color mx-4">
          About Me
        </Link>
        <Link to="/" className="link link-underline link-underline-color mx-4">
          My Blog
        </Link>
        <Link to="/" className="link link-underline link-underline-color mx-4">
          Services
        </Link>
        <Link to="/" className="link link-underline link-underline-color mx-4">
          Contact
        </Link>
      </div>
    </nav>
  );
};

export default Header;
