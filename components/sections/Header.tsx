"use client";

import Link from "next/link";
import { useState } from "react";
import { email } from "@/lib/data";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white">
      <div className="flex items-center justify-between px-6 py-5 sm:px-10">
        <Link
          href="/"
          className="text-base font-bold text-black tracking-tight"
        >
          zamoog
        </Link>

        <div className="flex items-center gap-6">
          {menuOpen && (
            <nav className="flex items-center gap-6 text-sm text-black">
              <a href="#work" className="hover:text-black/60">
                Works
              </a>

              <a href="#about" className="hover:text-black/60">
                About
              </a>

              <a href={`mailto:${email}`} className="hover:text-black/60">
                Contact
              </a>
            </nav>
          )}

          {/* Grid dots */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            className="text-black"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="4" cy="4" r="2" fill="currentColor" />
              <circle cx="10" cy="4" r="2" fill="currentColor" />
              <circle cx="16" cy="4" r="2" fill="currentColor" />
              <circle cx="4" cy="10" r="2" fill="currentColor" />
              <circle cx="10" cy="10" r="2" fill="currentColor" />
              <circle cx="16" cy="10" r="2" fill="currentColor" />
              <circle cx="4" cy="16" r="2" fill="currentColor" />
              <circle cx="10" cy="16" r="2" fill="currentColor" />
              <circle cx="16" cy="16" r="2" fill="currentColor" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
