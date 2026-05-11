"use client";
import { email } from "@/lib/data";

export default function Contact() {
  return (
    <section className="bg-black px-6 py-32 sm:px-10 overflow-hidden">
      <h2
        className="font-bold leading-tight tracking-tighter"
        style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
      >
        <span className="text-white">Curious about what </span>

        <span className="text-white animate-pulse">we can </span>

        <span
          className="text-white/70 animate-pulse"
          style={{ animationDelay: "0.4s" }}
        >
          create together?
        </span>

        <br />

        <span
          className="text-white/50 animate-pulse"
          style={{ animationDelay: "0.8s" }}
        >
          Let&apos;s bring something{" "}
        </span>

        <span
          className="text-white/30 animate-pulse"
          style={{ animationDelay: "1.2s" }}
        >
          extraordinary to life!
        </span>
      </h2>

      <div className="mt-16 flex flex-col gap-5 sm:flex-row sm:items-center">
        <a
          href="/contact"
          className="inline-flex items-center justify-center border-2 border-white bg-white px-10 py-4 text-sm font-semibold text-black transition-all duration-300 hover:bg-black hover:text-white"
        >
          Get in Touch
        </a>

        <div className="flex items-center gap-2 text-sm text-white/60">
          <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
          Available For Work
        </div>
      </div>
    </section>
  );
}
