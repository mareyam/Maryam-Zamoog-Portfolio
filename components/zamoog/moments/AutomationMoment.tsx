"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useReducedMotion } from "../useReducedMotion";

const N = 7;

/** Service 03 — the same tasks, stuck waiting for a person vs. flowing on their own. */
export default function AutomationMoment() {
  const reduce = useReducedMotion();
  const [auto, setAuto] = useState(false);
  const refs = useRef<(SVGCircleElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = refs.current.filter(Boolean) as SVGCircleElement[];
      if (!auto) {
        gsap.to(els, { attr: { cx: (i: number) => 40 + i * 7, cy: (i: number) => 100 - (i % 3) * 6 }, duration: reduce ? 0 : 0.8, ease: "power3.out", overwrite: true });
        return;
      }
      if (reduce) {
        gsap.set(els, { attr: { cx: (i: number) => 60 + i * 46, cy: 100 } });
        return;
      }
      els.forEach((el, i) => {
        gsap.fromTo(el, { attr: { cx: 30, cy: 100 } }, { attr: { cx: 370 }, duration: 4.2, ease: "none", repeat: -1, delay: -(i * 4.2) / N });
      });
    });
    return () => ctx.revert();
  }, [auto, reduce]);

  return (
    <figure className="zm-fig py-6">
      <svg viewBox="0 0 400 200" className="zm-svg w-full" role="img" aria-label={auto ? "Tasks flowing along a line by themselves" : "Tasks piled up waiting"}>
        <line x1="20" x2="380" y1="100" y2="100" stroke="var(--zm-ink)" strokeWidth="1" opacity="0.35" strokeDasharray={auto ? "0" : "3 5"} />
        <text x="20" y="150">{auto ? "" : "WAITING FOR SOMEONE TO COPY AND PASTE…"}</text>
        <text x="380" y="150" textAnchor="end">{auto ? "DONE IN THE BACKGROUND" : ""}</text>
        {Array.from({ length: N }, (_, i) => (
          <circle key={i} ref={(el) => { refs.current[i] = el; }} cx={40 + i * 7} cy={100 - (i % 3) * 6} r="6" fill={auto ? "var(--zm-accent)" : "var(--zm-ink)"} stroke="var(--zm-ink)" strokeWidth="1" style={{ transition: "fill .4s" }} />
        ))}
      </svg>
      <p className="mt-2 min-h-[3rem] text-[0.95rem] text-[var(--zm-grey)]" aria-live="polite">
        {auto ? "Information moves where it needs to go. Nobody has to touch it." : "Every task waits until someone has time to move it by hand."}
      </p>
      <figcaption className="mt-3 flex items-center gap-3 text-sm">
        <span className="text-[var(--zm-grey)]">{auto ? "Automatic" : "By hand"}</span>
        <button type="button" role="switch" aria-checked={auto} aria-label="Let the tasks happen automatically" className="zm-moment-btn" onClick={() => setAuto((v) => !v)}>
          {auto ? "Switch back to by hand" : "Let it happen"}
        </button>
      </figcaption>
    </figure>
  );
}
