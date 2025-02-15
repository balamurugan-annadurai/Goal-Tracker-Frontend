"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-[#10B981]">
              GoalTracker
            </Link>
          </div>
          <div className="hidden sm:flex sm:items-center">
            <Link
              href="/signin"
              className="text-gray-600 hover:text-[#10B981] px-3 py-2 rounded-md text-sm font-medium"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="bg-[#10B981] text-white hover:bg-[#0D9668] px-4 py-2 rounded-md text-sm font-medium ml-2"
            >
              Sign Up
            </Link>
          </div>
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-[#10B981]"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/signin"
              className="text-gray-600 hover:text-[#10B981] block px-3 py-2 rounded-md text-base font-medium"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="bg-[#10B981] text-white hover:bg-[#0D9668] block px-3 py-2 rounded-md text-base font-medium"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
