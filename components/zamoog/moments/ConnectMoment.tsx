"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useReducedMotion } from "../useReducedMotion";

const NODES = [
  { label: "Website", x: 70, y: 50 },
  { label: "Payments", x: 330, y: 50 },
  { label: "Calendar", x: 70, y: 170 },
  { label: "Customer records", x: 330, y: 170 },
];

/** Service 04 — four separate tools join into one flow of information. */
export default function ConnectMoment() {
  const reduce = useReducedMotion();
  const [on, setOn] = useState(false);
  const lines = useRef<(SVGLineElement | null)[]>([]);
  const core = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      lines.current.forEach((l, i) => {
        if (!l) return;
        const len = l.getTotalLength();
        gsap.to(l, { strokeDashoffset: on ? 0 : len, duration: reduce ? 0 : 0.9, delay: reduce ? 0 : i * 0.12, ease: "power2.inOut" });
      });
      gsap.to(core.current, { attr: { r: on ? 15 : 6 }, duration: reduce ? 0 : 0.7, delay: reduce ? 0 : 0.4, ease: "back.out(2)" });
    });
    return () => ctx.revert();
  }, [on, reduce]);

  return (
    <figure className="zm-fig py-6">
      <svg viewBox="0 0 400 220" className="zm-svg w-full" role="img" aria-label={on ? "Four tools joined together" : "Four tools standing apart"}>
        {NODES.map((n, i) => (
          <line
            key={n.label} ref={(el) => { lines.current[i] = el; }} x1={n.x} y1={n.y} x2="200" y2="110"
            stroke="var(--zm-ink)" strokeWidth="1.2" strokeDasharray="400" strokeDashoffset="400"
          />
        ))}
        <circle ref={core} cx="200" cy="110" r="6" fill="var(--zm-accent)" stroke="var(--zm-ink)" strokeWidth="1" />
        {NODES.map((n) => (
          <g key={n.label}>
            <circle cx={n.x} cy={n.y} r="9" fill={on ? "var(--zm-ink)" : "var(--zm-bg)"} stroke="var(--zm-ink)" strokeWidth="1" style={{ transition: "fill .5s .3s" }} />
            <text x={n.x} y={n.y + (n.y < 100 ? -18 : 26)} textAnchor="middle">{n.label.toUpperCase()}</text>
          </g>
        ))}
      </svg>
      <p className="mt-2 min-h-[3rem] text-[0.95rem] text-[var(--zm-grey)]" aria-live="polite">
        {on ? "One flow of information, wherever it starts." : "Four tools. Four separate boxes. Nothing shared."}
      </p>
      <figcaption className="mt-3">
        <button type="button" className="zm-moment-btn" aria-pressed={on} onClick={() => setOn((v) => !v)}>
          {on ? "Disconnect them" : "Connect them"}
        </button>
      </figcaption>
    </figure>
  );
}
