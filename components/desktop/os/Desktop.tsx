"use client";
import { useEffect, useRef, useState } from "react";
import { APPS } from "@/lib/desktop/apps";
import { useDesktopStore } from "@/lib/desktop/desktopStore";
import { useSettings } from "@/lib/desktop/settingsStore";
import { setAmbient, sfx } from "@/lib/desktop/sound";
import { touch } from "@/lib/desktop/touch";
import { startWindowSounds } from "@/lib/desktop/windowSounds";
import { COMPACT_W, useWindowStore } from "@/lib/desktop/windowStore";
import WindowManager from "../windows/WindowManager";
import ContextMenu from "./ContextMenu";
import DesktopIcon from "./DesktopIcon";
import MenuBar from "./MenuBar";
import ShortcutsOverlay from "./ShortcutsOverlay";
import Taskbar from "./Taskbar";
import Typewriter from "./Typewriter";

const TAGLINE = "AI automation developer and software engineer. Intelligent systems that save time, cut friction and scale effortlessly.";
const COLS = 3;

export default function Desktop() {
  const ref = useRef<HTMLDivElement>(null);
  const [bounds, setBounds] = useState({ w: 800, h: 600 });
  const ambient = useSettings((s) => s.ambient);
  const press = useRef<{ t: ReturnType<typeof setTimeout>; x: number; y: number } | null>(null);
  const cancelPress = () => {
    if (press.current) clearTimeout(press.current.t);
    press.current = null;
  };

  // Window open/close/minimize/maximize sounds (watches the window store).
  useEffect(() => startWindowSounds(), []);

  // Optional ambient hum: only ever started from a menu click, after the power-on gesture.
  useEffect(() => {
    setAmbient(ambient);
    return () => setAmbient(false);
  }, [ambient]);

  useEffect(() => {
    const el = ref.current!;
    const measure = () => setBounds({ w: el.clientWidth, h: el.clientHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);

    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest?.("input, textarea, [contenteditable]")) return;
      const d = useDesktopStore.getState();
      const w = useWindowStore.getState();
      const st = useSettings.getState();

      if (e.key === "Escape") {
        if (st.shortcutsOpen) st.setShortcutsOpen(false);
        else { d.closeAllMenus(); d.clearSelection(); }
        return;
      }
      if (e.key === "?" && !e.ctrlKey && !e.metaKey && !e.altKey) {
        st.setShortcutsOpen(!st.shortcutsOpen);
        return;
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "a") {
        e.preventDefault();
        d.selectAll();
        return;
      }
      // Alt combos use e.code because Option+key types symbols on macOS.
      if (e.altKey && !e.ctrlKey && !e.metaKey) {
        const n = e.code.startsWith("Digit") ? Number(e.code.slice(5)) : 0;
        if (n >= 1 && n <= APPS.length) { e.preventDefault(); d.launch(APPS[n - 1].id); return; }
        const id = w.activeId;
        if (e.code === "KeyW" && id) { e.preventDefault(); w.close(id); }
        else if (e.code === "KeyM" && id) { e.preventDefault(); w.minimize(id); }
        else if (e.code === "Enter" && id && w.area.w >= COMPACT_W) { e.preventDefault(); w.toggleMaximize(id); }
        else if (e.code === "Backquote") { e.preventDefault(); w.cycleNext(); }
        return;
      }
      if (e.ctrlKey || e.metaKey) return;

      // Enter opens the selected icons (unless a control has focus and will handle Enter itself).
      if (e.key === "Enter" && !t.closest("button, a, [role=menuitem], [role=tab]")) {
        d.selected.forEach((id) => d.launch(id));
        return;
      }
      // Arrow keys move the icon selection while the desktop itself (or an icon) has focus.
      const onDesktop = t === document.body || !!t.closest("[data-icon]");
      const windowOpen = Object.values(w.windows).some((x) => x && !x.minimized);
      const delta = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -COLS, ArrowDown: COLS }[e.key];
      if (delta && onDesktop && (!windowOpen || t.closest("[data-icon]"))) {
        e.preventDefault();
        const cur = APPS.findIndex((a) => a.id === d.selected[d.selected.length - 1]);
        const next = cur < 0 ? 0 : Math.min(Math.max(cur + delta, 0), APPS.length - 1);
        d.select(APPS[next].id);
        document.querySelector<HTMLElement>(`[data-icon][aria-label="${APPS[next].label}"]`)?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => { ro.disconnect(); window.removeEventListener("keydown", onKey); };
  }, []);

  return (
    <div
      ref={ref}
      data-desktop
      className="retro-os absolute inset-0 select-none overflow-hidden"
      // Button-press tick for any control that doesn't have its own sound (data-no-sfx opts out).
      onPointerDownCapture={(e) => {
        const c = (e.target as HTMLElement).closest("button, a, [role=menuitem], [role=tab]") as HTMLButtonElement | null;
        if (c && !c.disabled && !c.closest("[data-no-sfx]")) sfx.click();
      }}
      onPointerDown={(e) => {
        const target = e.target as HTMLElement;
        if (!target.closest("[data-icon]")) useDesktopStore.getState().clearSelection();
        // Touch has no right-click: a long press on the desktop or an icon opens the context menu.
        if (e.pointerType === "touch" && !target.closest("button:not([data-icon]), a, input, textarea, [data-window], [role=menu], nav")) {
          cancelPress();
          const { clientX: x, clientY: y } = e;
          const appId = target.closest("[data-icon]")?.getAttribute("data-app") ?? null;
          press.current = {
            x, y,
            t: setTimeout(() => {
              const r = ref.current!.getBoundingClientRect();
              touch.swallowClickUntil = Date.now() + 600;
              useDesktopStore.getState().openContext({ x: x - r.left, y: y - r.top, app: appId as never });
              press.current = null;
            }, 550),
          };
        }
      }}
      onPointerMove={(e) => {
        if (press.current && Math.hypot(e.clientX - press.current.x, e.clientY - press.current.y) > 8) cancelPress();
      }}
      onPointerUp={cancelPress}
      onPointerCancel={cancelPress}
      onContextMenu={(e) => {
        e.preventDefault();
        const r = ref.current!.getBoundingClientRect();
        useDesktopStore.getState().openContext({ x: e.clientX - r.left, y: e.clientY - r.top, app: null });
      }}
    >
      <MenuBar />
      <div className="home-scroller absolute inset-0 overflow-y-auto overflow-x-hidden pb-[calc(var(--dock-h)+2rem)] pt-[calc(var(--bar-h)+1rem)]">
        <div className="home-icons mx-auto grid max-w-[720px] grid-cols-3 justify-items-center gap-y-[18px] px-6 pt-6 pointer-coarse:sm:max-w-[820px] pointer-coarse:sm:gap-y-6">
          {APPS.map((a) => <DesktopIcon key={a.id} id={a.id} />)}
        </div>
        <div className="home-tagline mx-auto mt-12 max-w-[560px] px-6 text-center font-[family-name:var(--font-chivo)] text-[15px] leading-[25px] text-[#ffb648] sm:text-[17px]" style={{ textShadow: "0 0 6px rgba(255,182,72,0.5)" }}>
          <Typewriter text={TAGLINE} />
        </div>
        <h1
          className="home-name mt-8 px-4 text-center font-[family-name:var(--font-jersey)] text-[clamp(36px,10.5vw,100px)] leading-none text-[#ffb648]"
          style={{ textShadow: "0 0 14px rgba(255,182,72,0.55)" }}
        >
          Maryam @ Zamoog
        </h1>
        <p className="home-hint">Open an icon to see a page</p>
      </div>
      <WindowManager />
      <ContextMenu bounds={bounds} />
      <Taskbar />
      <ShortcutsOverlay />
    </div>
  );
}
