"use client";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { useBootStore } from "@/lib/desktop/bootStore";
import BootScreen from "./boot/BootScreen";
import CrtFrame from "./boot/CrtFrame";
import Desktop from "./os/Desktop";

export default function DesktopApp() {
  const phase = useBootStore((s) => s.phase);
  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence mode="wait">
        {phase !== "done" ? (
          <BootScreen key="boot" />
        ) : (
          <motion.div
            key="desktop"
            // CRT switch-on: a bright line widens, then opens to full height.
            initial={{ scaleY: 0.01, scaleX: 0.2 }}
            animate={{ scaleY: [0.01, 0.01, 1], scaleX: [0.2, 1, 1], filter: ["brightness(2.4)", "brightness(2)", "brightness(1)"] }}
            transition={{ duration: 0.6, times: [0, 0.35, 1], ease: "easeOut" }}
            className="fixed inset-0"
          >
            <CrtFrame>
              <Desktop />
            </CrtFrame>
            {/* Phosphor warm-up: screen fades up from black while a soft core glow blooms and fades. */}
            <motion.div aria-hidden className="pointer-events-none fixed inset-0 z-[60] bg-black" initial={{ opacity: 0.85 }} animate={{ opacity: 0 }} transition={{ duration: 1.1, ease: "easeOut" }} />
            <motion.div
              aria-hidden
              className="pointer-events-none fixed left-1/2 top-1/2 z-[61] h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(255,198,111,0.7) 0%, rgba(255,182,72,0.32) 18%, rgba(255,182,72,0.1) 42%, transparent 70%)" }}
              initial={{ opacity: 0, scale: 0.35 }}
              animate={{ opacity: [0, 0.55, 0], scale: [0.35, 0.8, 1.6] }}
              transition={{ duration: 1.7, ease: "easeOut", times: [0, 0.3, 1] }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}
