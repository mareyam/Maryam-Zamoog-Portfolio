"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Palette from the Dribbble reference — each stop is {bg, accent}.
// Sequence cycles through these as the whole page scrolls.
const THEME_STOPS: { bg: string; accent: string }[] = [
  { bg: "#329C47", accent: "#58CA74" }, // green
  { bg: "#020807", accent: "#FAA32F" }, // dark + orange
  { bg: "#2A5931", accent: "#58CA74" }, // forest green
  { bg: "#D13927", accent: "#FAA32F" }, // red
  { bg: "#AF9834", accent: "#020807" }, // gold
  { bg: "#329C47", accent: "#58CA74" }, // loop back to green
];

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function rgbToHex([r, g, b]: [number, number, number]) {
  const c = (v: number) => Math.round(v).toString(16).padStart(2, "0");
  return `#${c(r)}${c(g)}${c(b)}`;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function lerpColor(hexA: string, hexB: string, t: number) {
  const a = hexToRgb(hexA);
  const b = hexToRgb(hexB);
  return rgbToHex([lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)]);
}

// Perceived luminance -> pick readable foreground text color.
function readableTextColor(hex: string) {
  const [r, g, b] = hexToRgb(hex);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.55 ? "#1a1a1a" : "#ffffff";
}

export default function ScrollTheme({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);
  const targetProgress = useRef(0);
  const currentProgress = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      targetProgress.current =
        scrollable > 0 ? Math.min(Math.max(window.scrollY / scrollable, 0), 1) : 0;
    };

    const tick = () => {
      // ease the progress itself for extra smoothness (no abrupt jumps)
      currentProgress.current +=
        (targetProgress.current - currentProgress.current) * 0.08;

      const segments = THEME_STOPS.length - 1;
      const pos = currentProgress.current * segments;
      const index = Math.min(Math.floor(pos), segments - 1);
      const t = pos - index;

      const from = THEME_STOPS[index];
      const to = THEME_STOPS[index + 1];

      const bg = lerpColor(from.bg, to.bg, t);
      const accent = lerpColor(from.accent, to.accent, t);
      const text = readableTextColor(bg);
      const accentText = readableTextColor(accent);

      if (rootRef.current) {
        rootRef.current.style.setProperty("--theme-bg", bg);
        rootRef.current.style.setProperty("--theme-accent", accent);
        rootRef.current.style.setProperty("--theme-text", text);
        rootRef.current.style.setProperty("--theme-accent-text", accentText);
      }

      rafId.current = requestAnimationFrame(tick);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      style={
        {
          "--theme-bg": THEME_STOPS[0].bg,
          "--theme-accent": THEME_STOPS[0].accent,
          "--theme-text": readableTextColor(THEME_STOPS[0].bg),
          "--theme-accent-text": readableTextColor(THEME_STOPS[0].accent),
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
