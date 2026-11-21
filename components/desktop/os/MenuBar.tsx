"use client";
import { useEffect } from "react";
import { useBootStore } from "@/lib/desktop/bootStore";
import { useDesktopStore } from "@/lib/desktop/desktopStore";
import { sfx } from "@/lib/desktop/sound";
import { keepInside } from "@/lib/desktop/touch";
import RetroMenu from "./RetroMenu";
import { buildMenus } from "./menus";

export default function MenuBar() {
  const open = useDesktopStore((s) => s.openMenu);
  const setMenu = useDesktopStore((s) => s.setMenu);
  const muted = useBootStore((s) => s.muted);
  const menus = buildMenus(muted);

  useEffect(() => {
    if (!open) return;
    const close = (e: PointerEvent) => {
      if (!(e.target as HTMLElement).closest?.("[data-menubar]")) setMenu(null);
    };
    window.addEventListener("pointerdown", close);
    return () => window.removeEventListener("pointerdown", close);
  }, [open, setMenu]);

  return (
    <nav
      data-menubar
      aria-label="System menu"
      className="absolute inset-x-0 top-0 z-30 flex h-[var(--bar-h)] items-center gap-1 border-b border-[#ffb648]/25 bg-[#020b14]/80 px-2 sm:px-4 font-[family-name:var(--font-chivo)] text-[13px] text-[#ffb648]"
    >
      <span className="mr-3 hidden tracking-widest opacity-80 sm:inline">NOSTALGIA</span>
      {Object.entries(menus).map(([name, items]) => (
        <div key={name} className="relative">
          <button
            type="button"
            data-no-sfx
            aria-haspopup="menu"
            aria-expanded={open === name}
            onClick={() => {
              if (open !== name) sfx.menuOpen();
              setMenu(open === name ? null : name);
            }}
            onPointerEnter={() => open && setMenu(name)}
            className={`px-2 py-0.5 pointer-coarse:h-10 pointer-coarse:px-3 pointer-coarse:py-0 pointer-coarse:text-sm focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#ffb648] ${open === name ? "bg-[#ffb648] text-[#020b14]" : "hover:bg-[#ffb648]/20"}`}
          >
            {name}
          </button>
          {open === name && (
            <div ref={keepInside} className="absolute left-0 top-full mt-px">
              <RetroMenu items={items} onDone={() => setMenu(null)} />
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}
