"use client";
import { useEffect } from "react";

/** When a section's buttons scroll into view they "ring" (jiggle + glow) a few times to invite a click. */
export default function CtaRing() {
  useEffect(() => {
    const btns = Array.from(document.querySelectorAll<HTMLElement>(".zm-section .zm-btn, .zm-section .zm-moment-btn"));
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          const el = e.target as HTMLElement;
          if (!e.isIntersecting) return el.classList.remove("zm-ringing");
          // wait for the section's own reveal to finish, then ring
          window.setTimeout(() => el.classList.add("zm-ringing"), 900);
        }),
      { threshold: 0.9 },
    );
    btns.forEach((b) => io.observe(b));
    return () => io.disconnect();
  }, []);
  return null;
}
