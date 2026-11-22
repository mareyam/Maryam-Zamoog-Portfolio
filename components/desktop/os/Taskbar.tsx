"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { APPS } from "@/lib/desktop/apps";
import { useBootStore } from "@/lib/desktop/bootStore";
import { useDesktopStore } from "@/lib/desktop/desktopStore";
import { useWindowStore } from "@/lib/desktop/windowStore";
import PixelIcon from "../icons/PixelIcon";
import DockTicker from "./DockTicker";
import { toggleSound } from "./menus";

function Clock() {
  const [t, setT] = useState("--:--");
  useEffect(() => {
    const tick = () => setT(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false }));
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 15000);
    return () => { clearTimeout(first); clearInterval(id); };
  }, []);
  return <span className="w-[45px] text-[15px] opacity-80" aria-label="Clock">{t}</span>;
}

export default function Taskbar() {
  const windows = useWindowStore((s) => s.windows);
  const activeId = useWindowStore((s) => s.activeId);
  const notice = useDesktopStore((s) => s.notice);
  const muted = useBootStore((s) => s.muted);
  const [tip, setTip] = useState(false);

  useEffect(() => {
    if (!notice) return;
    const id = setTimeout(() => useDesktopStore.setState({ notice: null }), 2600);
    return () => clearTimeout(id);
  }, [notice]);

  const bevel = "border border-[#ffb648]/70 bg-[#0a1a28] shadow-[2px_2px_0_rgba(255,182,72,0.35)]";
  const message = notice?.text ?? (tip ? (muted ? "Sound off. Click to turn it on." : "Sound on. Click to turn it off.") : null);

  return (
    <div className="os-dock absolute inset-x-0 bottom-0 z-20 border-t border-[#ffb648]/25 bg-[#020b14]/70 px-3 pb-4 pt-3 sm:px-6 pointer-coarse:pb-3 pointer-coarse:pt-2 font-[family-name:var(--font-chivo)] text-[#ffb648]">
      <AnimatePresence>
        {message && (
          <motion.div
            key={notice?.id ?? "tip"}
            initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            role="status"
            className="absolute bottom-full right-3 mb-1 sm:right-6 bg-[#ffb648] px-2 py-0.5 text-sm text-[#020b14]"
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex items-center gap-2">
        <div className="-mb-2 flex min-w-0 items-center gap-1.5 overflow-x-auto pb-2 pr-1 [scrollbar-width:none]">
        {APPS.filter((a) => a.docked || windows[a.id]).map((a) => {
          const w = windows[a.id];
          const open = !!w;
          const minimized = !!w?.minimized;
          const current = open && !minimized && activeId === a.id;
          return (
            <button
              key={a.id}
              type="button"
              data-taskbar={a.id}
              data-no-sfx
              aria-label={a.label}
              aria-pressed={current}
              title={minimized ? `${a.label} (minimized)` : a.label}
              onClick={() => useWindowStore.getState().taskbarToggle(a.id)}
              className={`relative h-[34px] w-[34px] shrink-0 p-1.5 pointer-coarse:h-10 pointer-coarse:w-10 transition-transform active:translate-x-0.5 active:translate-y-0.5 ${bevel} ${current ? "translate-x-0.5 translate-y-0.5 bg-[#74582b]/60 shadow-none" : "hover:brightness-125"} ${minimized ? "opacity-60" : ""}`}
            >
              <PixelIcon name={a.id} className="h-full w-full" />
              {open && (
                <span aria-hidden className={`absolute -bottom-1 left-1/2 h-0.5 -translate-x-1/2 bg-[#ffb648] ${current ? "w-5" : minimized ? "w-1" : "w-2.5"}`} />
              )}
            </button>
          );
        })}
        <span aria-hidden className="mx-1 h-7 shrink-0 border-l border-[#ffb648]/30 sm:mx-2" />
        </div>
        <DockTicker />
        <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-4">
          <button
            type="button"
            aria-label={muted ? "Turn sound on" : "Turn sound off"}
            aria-pressed={muted}
            onClick={toggleSound}
            onPointerEnter={() => setTip(true)}
            onPointerLeave={() => setTip(false)}
            onFocus={() => setTip(true)}
            onBlur={() => setTip(false)}
            className={`h-[34px] w-[34px] p-1.5 pointer-coarse:h-10 pointer-coarse:w-10 hover:brightness-125 ${bevel}`}
          >
            <PixelIcon name={muted ? "speaker-off" : "speaker-on"} className="h-full w-full" />
          </button>
          <Clock />
        </div>
      </div>
    </div>
  );
}
