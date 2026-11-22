"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useSettings } from "@/lib/desktop/settingsStore";

const KEYS: [string, string][] = [
  ["Alt+1 ... Alt+6", "Open Work, About, Services, Journal, Contact, CV"],
  ["Arrow keys", "Move icon selection"],
  ["Enter", "Open selected icon"],
  ["Ctrl/Cmd+A", "Select all icons"],
  ["Alt+W", "Close active window"],
  ["Alt+M", "Minimize active window"],
  ["Alt+Enter", "Maximize / restore window"],
  ["Alt+`", "Switch to next window"],
  ["Esc", "Close menu or dialog, deselect"],
  ["?", "Show this list"],
];

export default function ShortcutsOverlay() {
  const open = useSettings((s) => s.shortcutsOpen);
  const setOpen = useSettings((s) => s.setShortcutsOpen);
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="shortcuts"
          className="absolute inset-0 z-50 flex items-center justify-center bg-[#020b14]/70 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.12 }}
          onPointerDown={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <div role="dialog" aria-label="Keyboard shortcuts" className="w-full max-w-md border-2 border-[#ffb648] bg-[#020b14] font-[family-name:var(--font-chivo)] text-sm text-[#ffb648] shadow-[6px_6px_0_rgba(0,0,0,0.55)]">
            <div className="flex items-center justify-between bg-[#ffb648] px-3 py-2 text-[#020b14]">
              <span>Keyboard Shortcuts</span>
              <button type="button" autoFocus aria-label="Close" onClick={() => setOpen(false)} className="px-2 hover:bg-[#020b14] hover:text-[#ffb648] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#020b14]">X</button>
            </div>
            <dl className="max-h-[60vh] overflow-auto p-3">
              {KEYS.map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 border-b border-[#ffb648]/20 py-1.5">
                  <dt className="shrink-0">{k}</dt>
                  <dd className="text-right opacity-75">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
