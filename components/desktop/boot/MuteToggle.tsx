"use client";
import { useBootStore } from "@/lib/desktop/bootStore";
import { setMuted } from "@/lib/desktop/sound";

export default function MuteToggle() {
  const muted = useBootStore((s) => s.muted);
  const toggle = useBootStore((s) => s.toggleMute);
  return (
    <button
      type="button"
      aria-pressed={muted}
      aria-label={muted ? "Unmute sound" : "Mute sound"}
      onClick={(e) => {
        e.stopPropagation(); // never doubles as a power-on click
        toggle();
        setMuted(!muted);
      }}
      className="absolute right-5 top-5 z-10 border border-[#ffb648]/60 px-3 py-1 pointer-coarse:px-4 pointer-coarse:py-2.5 font-[family-name:var(--font-chivo)] text-sm text-[#ffb648] hover:bg-[#ffb648] hover:text-[#020b14] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffb648]"
    >
      Sound {muted ? "off" : "on"}
    </button>
  );
}
