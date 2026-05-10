"use client";

import Image from "next/image";
import { email } from "@/lib/data";

export default function Hero() {
  return (
    <section className="min-h-screen bg-white flex flex-col px-6 sm:px-10 pt-20 pb-10 select-text">
      {/* Upper: wordmark left, photo top-right */}
      <div className="flex items-start justify-between gap-6">
        {/* Wordmark + subtitle */}
        <div className="select-text">
          <h1 className="select-text p-4 m-4 uppercase text-black font-black leading-none tracking-tighter border text-7xl sm:text-8xl md:text-9xl lg:text-[10.5rem]">
            ZAMOOG
          </h1>

          <p className="select-text inline-block mt-2 ml-4 border p-2 text-black text-base md:text-lg lg:text-xl">
            (ours, hamara)
          </p>
        </div>

        {/* Circular photo */}
        {/* <div className="shrink-0 rounded-full overflow-hidden mt-1 w-28 h-28 sm:w-36 sm:h-36 lg:w-52 lg:h-52">
          <Image
            src="/profile.png"
            alt="Maryam Zamoog"
            width={50}
            height={50}
            className="w-full h-full object-cover"
            priority
          />
        </div> */}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      <div className="flex items-end justify-between gap-8 m-4">
        <a
          href={`mailto:${email}`}
          className="border p-4 select-text inline-flex items-center gap-2 shrink-0 text-xl md:text-2xl text-black hover:text-black/60 transition-colors"
        >
          <span>{email}</span>

          <svg
            width="20"
            height="20"
            viewBox="0 0 18 18"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              d="M5 13L13 5M13 5H7M13 5V11"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>

        <p className="border p-4 select-text max-w-[300px] sm:max-w-[420px] lg:max-w-[580px] text-justify leading-[1.4] text-black text-xl md:text-2xl lg:text-3xl">
          Hello, I&apos;m a freelance AI-Automation Developer and Pre-AI era
          Software Engineer based in Pakistan, working remotely. Let&apos;s
          create!
        </p>
      </div>
    </section>
  );
}
