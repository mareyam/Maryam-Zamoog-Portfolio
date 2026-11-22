"use client";
import { useEffect, useState } from "react";
import { useReducedMotion } from "../useReducedMotion";

const LINES = [
  { who: "Caller", text: "“Hi, do you have anything free on Thursday?”" },
  { who: "Assistant", text: "“Yes! Would 10:30 suit you? Could I take your name?”" },
  { who: "Booked", text: "Thursday, 10:30. You’ve been notified." },
];

/** Service 01 — tap to "ring" the business and watch a call get answered. */
export default function VoiceMoment() {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(0);
  const [ringing, setRinging] = useState(false);

  useEffect(() => {
    if (!ringing) return;
    if (reduce) return;
    const ts = LINES.map((_, i) => setTimeout(() => setShown(i + 1), 900 + i * 1500));
    return () => ts.forEach(clearTimeout);
  }, [ringing, reduce]);

  const visible = ringing && reduce ? LINES.length : shown;
  const start = () => {
    setShown(0);
    setRinging(false);
    // restart the sequence even if tapped twice
    requestAnimationFrame(() => setRinging(true));
  };

  return (
    <figure className="zm-fig py-6">
      <svg viewBox="0 0 400 240" className="zm-svg w-full" role="img" aria-label="Rings spreading out from a ringing phone">
        <g>
          {[0, 1, 2, 3].map((i) => (
            <circle
              key={i}
              cx="200" cy="120" r={38 + i * 26} fill="none" stroke="var(--zm-ink)" strokeWidth="1"
              opacity={ringing ? undefined : 0.35 - i * 0.06}
              className={ringing ? "zm-ring" : undefined}
              style={ringing ? { animationDelay: `${i * 0.35}s` } : undefined}
            />
          ))}
          <circle cx="200" cy="120" r="14" fill={visible >= 3 ? "var(--zm-accent)" : "var(--zm-ink)"} style={{ transition: "fill .4s" }} />
        </g>
      </svg>
      <div className="mt-2 min-h-[8.5rem] space-y-2 text-[0.95rem]" aria-live="polite">
        {visible === 0 ? (
          <p className="text-[var(--zm-grey)]">Tap to hear what happens when a customer calls and you can&rsquo;t pick up.</p>
        ) : (
          LINES.slice(0, visible).map((l) => (
            <p key={l.who} className="zm-fade">
              <span className="mr-2 text-[0.72rem] uppercase tracking-[0.14em] text-[var(--zm-grey)]">{l.who}</span>
              {l.text}
            </p>
          ))
        )}
      </div>
      <figcaption className="mt-3">
        <button type="button" className="zm-moment-btn" onClick={start} aria-pressed={ringing}>
          {ringing ? "Ring again" : "Ring the phone"}
        </button>
      </figcaption>
    </figure>
  );
}
