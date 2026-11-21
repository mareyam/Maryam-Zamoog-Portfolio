"use client";
import type { ReactNode } from "react";
import { useSettings } from "@/lib/desktop/settingsStore";
import RoomBackdrop from "../scene/RoomBackdrop";
import ZoomControls from "../scene/ZoomControls";

// Static film-grain tile (tiny SVG turbulence); drawn once, no animation.
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='0.9'/%3E%3C/svg%3E\")";

/** Rounded CRT bezel with the phosphor effect stack (values follow the reference's layers). */
export default function CrtFrame({ children }: { children: ReactNode }) {
  const flicker = useSettings((s) => s.flicker);
  const zoom = useSettings((s) => s.zoom);
  return (
    <div className="scene" data-zoom={zoom}>
      <RoomBackdrop />
      <div className="monitor">
        <div className="housing" aria-hidden>
          <span className="housing-led" />
          <span className="housing-knob" />
        </div>
        <div className="glass">
        {children}
        {/* Warm phosphor glow that slowly breathes */}
        <div
          aria-hidden
          className="crt-breath pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(78% 74% at 50% 46%, rgba(255,182,72,0.032), rgba(255,182,72,0.012) 62%, rgba(255,182,72,0.005) 100%)" }}
        />
        {/* Scanlines */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: "repeating-linear-gradient(rgba(0,0,0,0.16) 0, rgba(0,0,0,0.16) 1px, transparent 1px, transparent 3px)" }}
        />
        {/* Grain texture */}
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.05]" style={{ backgroundImage: GRAIN }} />
        {/* Optional brightness jitter (off for reduced motion and touch via CSS) */}
        {flicker && <div aria-hidden className="crt-jit pointer-events-none absolute inset-0 bg-black/[0.035]" />}
        {/* Vignette */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(72% 70% at 50% 48%, transparent 55%, rgba(0,0,0,0.6) 100%)" }}
        />
        {/* Window-blind reflection on the glass (wide screens) */}
        <div aria-hidden className="glass-reflection" />
        </div>
      </div>
      <ZoomControls />
    </div>
  );
}
