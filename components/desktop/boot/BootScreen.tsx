"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { useBootStore } from "@/lib/desktop/bootStore";
import { initAudio, playPowerOn, setMuted } from "@/lib/desktop/sound";
import CrtFrame from "./CrtFrame";
import PowerGlyph from "./PowerButton";
import MuteToggle from "./MuteToggle";
import BootSequence from "./BootSequence";

const IGNORED_KEYS = ["Shift", "Control", "Alt", "Meta", "CapsLock", "Tab"];

export default function BootScreen() {
  const phase = useBootStore((s) => s.phase);
  const start = useBootStore((s) => s.start);

  const powerOn = () => {
    if (!start()) return; // already booting: ignore repeat triggers
    initAudio(); // inside the user gesture
    setMuted(useBootStore.getState().muted);
    playPowerOn();
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.repeat || IGNORED_KEYS.includes(e.key)) return;
      // Enter/Space on a focused button activates that button (mute, power), not a global power-on.
      if ((e.key === "Enter" || e.key === " ") && (e.target as HTMLElement).closest?.("button")) return;
      powerOn();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      key="boot"
      className="fixed inset-0 z-[9999]"
      initial={{ opacity: 1 }}
      exit={{
        scaleY: [1, 0.01, 0.01],
        scaleX: [1, 1, 0],
        opacity: [1, 1, 0],
        filter: ["brightness(1)", "brightness(3)", "brightness(3)"],
        transition: { duration: 0.4, times: [0, 0.6, 1], ease: "easeIn" },
      }}
    >
      <CrtFrame>
        <MuteToggle />
        {phase === "off" ? (
          <button
            type="button"
            onClick={powerOn}
            className="absolute inset-0 flex cursor-pointer flex-col items-center justify-center gap-6 font-[family-name:var(--font-chivo)] text-[#ffb648] focus-visible:outline-none"
          >
            <motion.span
              animate={{ opacity: [1, 0.35, 1] }}
              transition={{ duration: 1.6, repeat: Infinity }}
              className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-[#ffb648]/70"
              style={{ boxShadow: "0 0 24px rgba(255,182,72,0.35)" }}
            >
              <PowerGlyph className="h-12 w-12" />
            </motion.span>
            <span className="px-6 text-center text-sm tracking-widest sm:text-base">
              CLICK OR PRESS ANY KEY TO POWER ON
            </span>
          </button>
        ) : (
          <>
            <motion.div
              aria-hidden
              className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ffb648]"
              initial={{ opacity: 1, scale: 1 }}
              animate={{ opacity: 0, scale: 40 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{ boxShadow: "0 0 60px 20px rgba(255,182,72,0.6)" }}
            />
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15, duration: 0.3 }}>
              <BootSequence />
            </motion.div>
          </>
        )}
      </CrtFrame>
    </motion.div>
  );
}
