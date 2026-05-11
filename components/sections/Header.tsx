"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { email } from "@/lib/data";

export default function Header() {
  const pathname = usePathname();

  const workLink = pathname === "/" ? "#work" : "/#work";
  const aboutLink = pathname === "/" ? "#about" : "/#about";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white">
      <div className="flex flex-col items-center justify-center gap-4 px-6 py-5 sm:flex-row sm:justify-between sm:px-10">
        <Link
          href="/"
          className="text-base font-bold tracking-tight text-black"
        >
          zamoog
        </Link>

        <div className="flex items-center justify-center">
          <nav className="flex items-center text-sm text-black">
            <Link
              href={workLink}
              className="border border-black px-2 py-2 hover:bg-black hover:text-white transition"
            >
              Work
            </Link>

            <Link
              href={aboutLink}
              className="border border-black px-2 py-2 hover:bg-black hover:text-white transition"
            >
              About
            </Link>

            <Link
              href="/usecases"
              className="border border-black px-2 py-2 hover:bg-black hover:text-white transition"
            >
              Use Cases
            </Link>

            <Link
              href="/contact"
              className="border border-black px-2 py-2 hover:bg-black hover:text-white transition"
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
