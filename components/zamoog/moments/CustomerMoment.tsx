"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { useReducedMotion } from "../useReducedMotion";

const STAGES = ["New", "Talking", "Quoted", "Booked"];
const DOTS = 28;
/** Deterministic pseudo-random 0..1 from an integer (no Math.sin, so no SSR/client float drift). */
const scatter = (n: number) => ((n * 9301 + 49297) % 233280) / 233280;

/** Service 02 — a scatter of customers tidies into a clear picture. */
export default function CustomerMoment() {
  const reduce = useReducedMotion();
  const [tidy, setTidy] = useState(false);
  const refs = useRef<(SVGCircleElement | null)[]>([]);
  const labels = useRef<(SVGTextElement | null)[]>([]);

  const pos = useMemo(
    () =>
      Array.from({ length: DOTS }, (_, i) => {
        const stage = i % 4;
        const row = Math.floor(i / 4);
        return {
          // scattered. Integer maths only, so the server and the browser compute identical values.
          sx: 30 + scatter(i * 2 + 1) * 340,
          sy: 20 + scatter(i * 2 + 2) * 150,
          // tidy: four labelled columns
          tx: 62 + stage * 92,
          ty: 40 + row * 17,
          stage,
        };
      }),
    [],
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      const d = reduce ? 0 : 1.1;
      refs.current.forEach((el, i) => {
        if (!el) return;
        gsap.to(el, {
          attr: { cx: tidy ? pos[i].tx : pos[i].sx, cy: tidy ? pos[i].ty : pos[i].sy },
          duration: d, ease: "power3.inOut", delay: reduce ? 0 : i * 0.015,
        });
      });
      gsap.to(labels.current, { opacity: tidy ? 1 : 0, duration: reduce ? 0 : 0.6, delay: reduce ? 0 : 0.5 });
    });
    return () => ctx.revert();
  }, [tidy, reduce, pos]);

  return (
    <figure className="zm-fig py-6">
      <svg viewBox="0 0 400 200" className="zm-svg w-full" role="img" aria-label={tidy ? "Customers sorted into four clear stages" : "Customers scattered with no order"}>
        {pos.map((p, i) => (
          <circle
            key={i} ref={(el) => { refs.current[i] = el; }}
            cx={p.sx} cy={p.sy} r="5.5" fill={tidy && p.stage === 3 ? "var(--zm-accent)" : "var(--zm-ink)"}
            style={{ transition: "fill .5s" }}
          />
        ))}
        {STAGES.map((s, i) => (
          <text key={s} ref={(el) => { labels.current[i] = el; }} x={62 + i * 92} y="188" textAnchor="middle" opacity="0">{s.toUpperCase()}</text>
        ))}
      </svg>
      <p className="mt-2 min-h-[3rem] text-[0.95rem] text-[var(--zm-grey)]" aria-live="polite">
        {tidy ? "Every customer, exactly where they are in the journey." : "Right now they’re everywhere: inboxes, notebooks, phones."}
      </p>
      <figcaption className="mt-3">
        <button type="button" className="zm-moment-btn" aria-pressed={tidy} onClick={() => setTidy((v) => !v)}>
          {tidy ? "Scatter them again" : "Tidy it up"}
        </button>
      </figcaption>
    </figure>
  );
}
