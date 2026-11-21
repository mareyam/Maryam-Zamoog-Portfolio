"use client";
import { useEffect, useState } from "react";

export default function Typewriter({ text, delay = 500 }: { text: string; delay?: number }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let id: ReturnType<typeof setInterval>;
    const start = setTimeout(() => {
      id = setInterval(() => setN((v) => (v >= text.length ? v : reduce ? text.length : v + 1)), 28);
    }, delay);
    return () => { clearTimeout(start); clearInterval(id); };
  }, [text, delay]);
  return (
    <p aria-label={text}>
      <span aria-hidden>{text.slice(0, n)}</span>
      <span aria-hidden className="ml-0.5 inline-block h-[1.1em] w-[0.6em] translate-y-[3px] animate-pulse bg-[#ffb648]" />
    </p>
  );
}
