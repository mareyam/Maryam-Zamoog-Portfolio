"use client";
import { useEffect, useState } from "react";
import { useBootStore } from "@/lib/desktop/bootStore";
import { playBeep, playChime, playTick } from "@/lib/desktop/sound";

const LINES = [
  "NOSTALGIA BIOS v1.02",
  "(C) 1987 RETRO SYSTEMS INC.",
  "",
  "MEMORY TEST ........ 640K OK",
  "DISPLAY ............ PHOSPHOR AMBER",
  "FLOPPY A: .......... DETECTED",
  "LOADING PORTFOLIO.SYS",
];
const BAR = 24;

export default function BootSequence() {
  const finish = useBootStore((s) => s.finish);
  const [shown, setShown] = useState(0);
  const [bar, setBar] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const at = (ms: number, fn: () => void) => timers.push(setTimeout(fn, ms));
    at(300, playBeep);
    LINES.forEach((_, i) => at(500 + i * 330, () => { setShown(i + 1); playTick(); }));
    const barStart = 500 + LINES.length * 330 + 150;
    for (let i = 1; i <= BAR; i++) at(barStart + i * 70, () => { setBar(i); if (i % 4 === 0) playTick(); });
    const end = barStart + BAR * 70 + 250;
    at(end, playChime);
    at(end + 700, finish);
    return () => timers.forEach(clearTimeout);
  }, [finish]);

  return (
    <div className="absolute inset-0 flex flex-col justify-center px-6 font-[family-name:var(--font-chivo)] text-[13px] leading-6 text-[#ffb648] sm:px-16 sm:text-base" style={{ textShadow: "0 0 6px rgba(255,182,72,0.6)" }}>
      {LINES.slice(0, shown).map((l, i) => (
        <div key={i} className="min-h-6 whitespace-pre">{l}</div>
      ))}
      {shown === LINES.length && (
        <div className="mt-3 whitespace-pre" aria-label="loading">
          [{"█".repeat(bar)}{"░".repeat(BAR - bar)}] {Math.round((bar / BAR) * 100)}%
        </div>
      )}
      <span className="mt-1 inline-block h-4 w-2 animate-pulse bg-[#ffb648]" aria-hidden />
    </div>
  );
}
