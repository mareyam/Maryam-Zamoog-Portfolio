"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { animate, motion, useMotionValue, useReducedMotion } from "framer-motion";
import { appLabel, type AppId } from "@/lib/desktop/apps";
import { COMPACT_W, MIN_H, MIN_W, useWindowStore, type Rect } from "@/lib/desktop/windowStore";
import WindowButton from "./WindowButton";

type Dir = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";
const HANDLES: { dir: Dir; cls: string; cursor: string }[] = [
  { dir: "n", cls: "left-2 right-2 top-0 h-1.5 pointer-coarse:h-4", cursor: "ns" },
  { dir: "s", cls: "left-2 right-2 bottom-0 h-1.5 pointer-coarse:h-4", cursor: "ns" },
  { dir: "w", cls: "bottom-2 left-0 top-2 w-1.5 pointer-coarse:w-4", cursor: "ew" },
  { dir: "e", cls: "bottom-2 right-0 top-2 w-1.5 pointer-coarse:w-4", cursor: "ew" },
  { dir: "nw", cls: "left-0 top-0 h-3 w-3 pointer-coarse:h-6 pointer-coarse:w-6", cursor: "nwse" },
  { dir: "ne", cls: "right-0 top-0 h-3 w-3 pointer-coarse:h-6 pointer-coarse:w-6", cursor: "nesw" },
  { dir: "sw", cls: "bottom-0 left-0 h-3 w-3 pointer-coarse:h-6 pointer-coarse:w-6", cursor: "nesw" },
  { dir: "se", cls: "bottom-0 right-0 h-3 w-3 pointer-coarse:h-6 pointer-coarse:w-6", cursor: "nwse" },
];

/** New rect for a drag of `dir`, anchoring the opposite edge once the minimum size is reached. */
function resized(start: Rect, dir: Dir, dx: number, dy: number): Rect {
  let { x, y, w, h } = start;
  if (dir.includes("e")) w = Math.max(MIN_W, start.w + dx);
  if (dir.includes("s")) h = Math.max(MIN_H, start.h + dy);
  if (dir.includes("w")) { w = Math.max(MIN_W, start.w - dx); x = start.x + start.w - w; }
  if (dir.includes("n")) { h = Math.max(MIN_H, start.h - dy); y = start.y + start.h - h; }
  return { x, y, w, h };
}

/** Generic retro window chrome. Knows nothing about what it contains. */
export default function Window({ id, children }: { id: AppId; children: ReactNode }) {
  const win = useWindowStore((s) => s.windows[id]);
  const active = useWindowStore((s) => s.activeId === id);
  const area = useWindowStore((s) => s.area);
  const { focus, move, setRect, minimize, close, toggleMaximize } = useWindowStore.getState();
  const [snap, setSnap] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const reduce = useReducedMotion();
  const minimized = win?.minimized ?? false;

  // On minimize the window shrinks toward its taskbar button; restoring flies it back.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let tx = 0;
    let ty = 0;
    if (minimized) {
      const tb = document.querySelector(`[data-taskbar="${id}"]`);
      if (tb) {
        const a = el.getBoundingClientRect();
        const b = tb.getBoundingClientRect();
        tx = b.left + b.width / 2 - (a.left + a.width / 2 - mx.get());
        ty = b.top + b.height / 2 - (a.top + a.height / 2 - my.get());
      }
    }
    if (reduce) {
      mx.set(tx);
      my.set(ty);
      return;
    }
    const opts = { duration: 0.22, ease: minimized ? "easeIn" : "easeOut" } as const;
    const c1 = animate(mx, tx, opts);
    const c2 = animate(my, ty, opts);
    return () => {
      c1.stop();
      c2.stop();
    };
  }, [minimized, id, mx, my, reduce]);

  // Move keyboard focus into a window when it opens so Tab continues from its content.
  useEffect(() => {
    ref.current?.focus({ preventScroll: true });
  }, []);

  if (!win) return null;

  const compact = area.w < COMPACT_W;
  const full = win.maximized || compact;
  const r = full ? { x: 0, y: 0, w: area.w, h: area.h } : win.rect;

  const track = (e: React.PointerEvent, onMove: (dx: number, dy: number) => void) => {
    if (e.button !== 0) return;
    const el = e.currentTarget as HTMLElement;
    try {
      el.setPointerCapture(e.pointerId);
    } catch {
      // Capture is best-effort; listeners on the element still receive the moves.
    }
    const sx = e.clientX, sy = e.clientY;
    const mv = (ev: PointerEvent) => onMove(ev.clientX - sx, ev.clientY - sy);
    const up = () => {
      el.removeEventListener("pointermove", mv);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
    };
    el.addEventListener("pointermove", mv);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
  };

  const toggleMax = () => {
    setSnap(true);
    toggleMaximize(id);
    setTimeout(() => setSnap(false), 220);
  };

  const title = appLabel(id);
  const stripes = "repeating-linear-gradient(0deg, rgba(2,11,20,0.12) 0, rgba(2,11,20,0.12) 1px, transparent 1px, transparent 3px)";

  return (
    <motion.section
      ref={ref}
      role="dialog"
      aria-label={title}
      aria-hidden={win.minimized || undefined}
      inert={win.minimized}
      data-window={id}
      tabIndex={-1}
      data-active={active}
      initial={{ opacity: 0, scale: 0.94 }}
      animate={win.minimized ? { opacity: 0, scale: 0.15 } : { opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      onPointerDownCapture={() => focus(id)}
      onContextMenu={(e) => {
        e.stopPropagation();
        if (!(e.target as HTMLElement).closest("input, textarea")) e.preventDefault();
      }}
      className="absolute flex flex-col border-2 border-[#ffb648] bg-[#020b14] text-[#ffb648] outline-none"
      style={{
        left: r.x, top: r.y, width: r.w, height: r.h, zIndex: win.z,
        x: mx,
        y: my,
        transformOrigin: "50% 50%",
        pointerEvents: win.minimized ? "none" : "auto",
        transition: snap ? "left .18s, top .18s, width .18s, height .18s" : undefined,
        boxShadow: active
          ? "6px 6px 0 rgba(0,0,0,0.55), 0 0 28px rgba(255,182,72,0.18)"
          : "4px 4px 0 rgba(0,0,0,0.45)",
      }}
    >
      <header
        data-drag={full ? undefined : true}
        onPointerDown={(e) => {
          if (full) return;
          const { x, y } = win.rect;
          track(e, (dx, dy) => move(id, x + dx, y + dy));
        }}
        onDoubleClick={() => !compact && toggleMax()}
        className={`flex h-[42px] shrink-0 touch-none pointer-coarse:h-12 select-none items-center justify-between gap-2 px-3 font-[family-name:var(--font-chivo)] text-base text-[#020b14] ${active ? "bg-[#ffb648]" : "bg-[#b98532]"}`}
        style={{ backgroundImage: stripes }}
      >
        <span className="truncate">{title}</span>
        <div className="flex items-center gap-2">
          <WindowButton glyph="minimize" label={`Minimize ${title}`} onClick={() => minimize(id)} />
          {!compact && (
            <WindowButton glyph={win.maximized ? "restore" : "maximize"} label={`${win.maximized ? "Restore" : "Maximize"} ${title}`} onClick={toggleMax} />
          )}
          <WindowButton glyph="close" label={`Close ${title}`} onClick={() => close(id)} />
        </div>
      </header>
      <div className="min-h-0 flex-1 overflow-auto overscroll-contain">{children}</div>
      {!full &&
        HANDLES.map(({ dir, cls, cursor }) => (
          <div
            key={dir}
            aria-hidden
            className={`absolute z-10 touch-none ${cls}`}
            data-cursor={cursor}
            onPointerDown={(e) => {
              const start = win.rect;
              track(e, (dx, dy) => setRect(id, resized(start, dir, dx, dy)));
            }}
          />
        ))}
    </motion.section>
  );
}
