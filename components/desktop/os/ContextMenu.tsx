"use client";
import { useEffect } from "react";
import { useBootStore } from "@/lib/desktop/bootStore";
import { useDesktopStore } from "@/lib/desktop/desktopStore";
import { keepInside } from "@/lib/desktop/touch";
import RetroMenu from "./RetroMenu";
import { buildContext } from "./menus";

export default function ContextMenu({ bounds }: { bounds: { w: number; h: number } }) {
  const ctx = useDesktopStore((s) => s.context);
  const close = useDesktopStore((s) => s.closeContext);
  const muted = useBootStore((s) => s.muted);

  useEffect(() => {
    if (!ctx) return;
    const away = (e: PointerEvent) => {
      if (!(e.target as HTMLElement).closest?.("[data-context]")) close();
    };
    window.addEventListener("pointerdown", away);
    return () => window.removeEventListener("pointerdown", away);
  }, [ctx, close]);

  if (!ctx) return null;
  const items = buildContext(ctx.app, muted);
  // Keep the menu inside the screen (approximate size is enough for clamping).
  const x = Math.min(ctx.x, bounds.w - 210);
  const y = Math.min(ctx.y, bounds.h - (items.length * 28 + 16));
  return (
    <div ref={keepInside} data-context className="absolute z-40" style={{ left: Math.max(4, x), top: Math.max(36, y) }}>
      <RetroMenu items={items} onDone={close} />
    </div>
  );
}
