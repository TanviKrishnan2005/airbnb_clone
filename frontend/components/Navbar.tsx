"use client";

import Link from "next/link";
import { useState } from "react";
import {
  FaAirbnb,
  FaGlobe,
  FaHome,
  FaUmbrellaBeach,
  FaConciergeBell,
  FaUserCircle,
} from "react-icons/fa";
import { HiMenu } from "react-icons/hi";

const categories = [
  {
    title: "All",
    icon: "🌍",
  },
  {
    title: "Homes",
    icon: <FaHome size={24} />,
  },
  {
    title: "Experiences",
    icon: <FaUmbrellaBeach size={24} />,
  },
  {
    title: "Services",
    icon: <FaConciergeBell size={24} />,
  },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">

      <div className="max-w-7xl mx-auto px-10">

        <div className="h-24 flex items-center justify-between">

          {/* Logo */}

          <Link
            href="/"
            className="flex items-center gap-2 text-rose-500"
          >
            <FaAirbnb size={34} />

            <span className="text-3xl font-bold">
              airbnb
            </span>
          </Link>

          {/* Categories */}

          <div className="hidden lg:flex items-center gap-12">

            {categories.map((item) => (

              <div
                key={item.title}
                className={`flex flex-col items-center cursor-pointer pb-3 transition
                ${item.title === "All"
                    ? "border-b-2 border-black"
                    : "text-gray-500 hover:text-black"
                  }`}
              >

                <div className="text-3xl">
                  {item.icon}
                </div>

                <span className="text-sm font-medium mt-1">
                  {item.title}
                </span>

              </div>

            ))}

          </div>

          {/* Right Side */}

          <div className="flex items-center gap-4">

            <button className="hidden md:block text-sm font-semibold hover:bg-gray-100 px-4 py-3 rounded-full transition">
              Become a host
            </button>

            <button className="hidden md:flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition">
              <FaGlobe />
            </button>

            {/* Profile Menu */}

            <div className="relative">

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-3 border border-gray-300 rounded-full px-3 py-2 shadow-sm hover:shadow-md transition"
              >

                <HiMenu size={20} />

                <FaUserCircle
                  size={32}
                  className="text-gray-500"
                />

              </button>

              {menuOpen && (

                <div className="absolute right-0 mt-3 w-60 bg-white rounded-2xl shadow-xl border overflow-hidden">

                  <Link
                    href="/wishlist"
                    className="block px-5 py-3 hover:bg-gray-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    Wishlist
                  </Link>

                  <Link
                    href="/my-trips"
                    className="block px-5 py-3 hover:bg-gray-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    My Trips
                  </Link>

                  <Link
                    href="/host"
                    className="block px-5 py-3 hover:bg-gray-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    Host Dashboard
                  </Link>

                  <hr />

                  <button
                    className="w-full text-left px-5 py-3 hover:bg-gray-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    Log Out
                  </button>

                </div>

              )}

            </div>

          </div>

        </div>

      </div>

    </header>
  );
}