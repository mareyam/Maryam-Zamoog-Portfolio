"use client";
import { APPS, type AppId } from "@/lib/desktop/apps";
import { useDesktopStore } from "@/lib/desktop/desktopStore";
import { useWindowStore } from "@/lib/desktop/windowStore";
import { touch } from "@/lib/desktop/touch";
import PixelIcon from "../icons/PixelIcon";

export default function DesktopIcon({ id }: { id: AppId }) {
  const label = APPS.find((a) => a.id === id)!.label;
  const selected = useDesktopStore((s) => s.selected.includes(id));
  const launched = useWindowStore((s) => !!s.windows[id]);
  const { select, launch, openContext } = useDesktopStore.getState();

  return (
    <button
      type="button"
      data-icon
      data-app={id}
      aria-label={label}
      aria-pressed={selected}
      onClick={(e) => {
        if (Date.now() < touch.swallowClickUntil) return;
        // A single click, tap or keypress opens the app (like the reference).
        // Ctrl/Cmd/Shift-click only selects, for multi-select.
        if (e.detail > 0 && (e.shiftKey || e.metaKey || e.ctrlKey)) select(id, true);
        else launch(id);
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        e.stopPropagation();
        const r = e.currentTarget.closest("[data-desktop]")!.getBoundingClientRect();
        select(id);
        openContext({ x: e.clientX - r.left, y: e.clientY - r.top, app: id });
      }}
      className="group flex w-full max-w-28 pointer-coarse:sm:max-w-36 flex-col items-center gap-3 p-1 focus-visible:outline-none"
    >
      <PixelIcon
        name={id}
        className={`h-[60px] w-[60px] drop-shadow-[0_0_4px_rgba(255,182,72,0.4)] pointer-coarse:sm:h-[72px] pointer-coarse:sm:w-[72px] transition-transform duration-100 group-hover:-translate-y-0.5 group-hover:brightness-125 group-active:translate-y-0 ${selected ? "brightness-125" : ""}`}
      />
      <span
        className={`px-1.5 font-[family-name:var(--font-chivo)] text-sm pointer-coarse:sm:text-base font-medium leading-[18px] group-focus-visible:outline group-focus-visible:outline-1 group-focus-visible:outline-offset-2 group-focus-visible:outline-[#ffb648] ${selected ? "icon-blink bg-[#ffb648] text-[#020b14]" : "text-[#ffb648] group-hover:underline"}`}
        style={selected ? undefined : { textShadow: "0 0 6px rgba(255,182,72,0.5)" }}
      >
        {label}
        {launched && <span aria-hidden> *</span>}
      </span>
    </button>
  );
}
