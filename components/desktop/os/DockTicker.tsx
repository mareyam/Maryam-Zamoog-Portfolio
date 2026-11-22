"use client";
import { useEffect, useState } from "react";
import { email } from "@/lib/data";
import { PROFILE } from "@/lib/maryam-content";

// Only facts that already exist in the project's profile data.
const MESSAGES = [
  `Now: ${PROFILE.availability}`,
  "Building AI voice and chat agents, lead-gen engines and CRM automations",
  `Say hello: ${email}`,
];

/** Status line in the dock (shown on wide screens only, via CSS). Cycles every few seconds. */
export default function DockTicker() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((v) => (v + 1) % MESSAGES.length), 5000);
    return () => clearInterval(id);
  }, []);
  return (
    <p className="dock-ticker" aria-live="off">
      {MESSAGES[i]}
    </p>
  );
}
