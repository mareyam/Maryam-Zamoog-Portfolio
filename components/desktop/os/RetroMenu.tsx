"use client";
import { motion } from "framer-motion";
import { sfx } from "@/lib/desktop/sound";

export type MenuEntry = { label: string; onSelect: () => void; hint?: string; disabled?: boolean } | "sep";

// Four-step easing gives the drop-down a chunky, low-frame-rate feel.
const stepped = (t: number) => Math.floor(t * 4) / 4;

/** Shared dropdown/context list, styled as an amber phosphor menu. */
export default function RetroMenu({ items, onDone }: { items: MenuEntry[]; onDone: () => void }) {
  return (
    <motion.ul
      role="menu"
      initial={{ opacity: 0, scaleY: 0.5 }}
      animate={{ opacity: 1, scaleY: 1 }}
      transition={{ duration: 0.12, ease: stepped }}
      style={{ transformOrigin: "top" }}
      className="min-w-[190px] whitespace-nowrap border border-[#ffb648] bg-[#020b14] py-1 font-[family-name:var(--font-chivo)] text-[13px] text-[#ffb648] shadow-[4px_4px_0_rgba(255,182,72,0.25)]"
    >
      {items.map((it, i) =>
        it === "sep" ? (
          <li key={i} role="separator" className="my-1 border-t border-[#ffb648]/30" />
        ) : (
          <li key={i} role="none">
            <button
              role="menuitem"
              type="button"
              data-no-sfx
              disabled={it.disabled}
              onPointerEnter={(e) => e.pointerType === "mouse" && sfx.hover()}
              onClick={() => {
                sfx.menuSelect();
                it.onSelect();
                onDone();
              }}
              className="flex w-full items-center justify-between gap-6 px-3 py-1 text-left pointer-coarse:py-2.5 pointer-coarse:text-sm hover:bg-[#ffb648] hover:text-[#020b14] focus-visible:bg-[#ffb648] focus-visible:text-[#020b14] focus-visible:outline-none disabled:opacity-40"
            >
              <span>{it.label}</span>
              {it.hint && <span className="opacity-60">{it.hint}</span>}
            </button>
          </li>
        ),
      )}
    </motion.ul>
  );
}
