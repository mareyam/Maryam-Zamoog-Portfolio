"use client";
import { useSettings } from "@/lib/desktop/settingsStore";

function Magnifier({ plus }: { plus: boolean }) {
  return (
    <svg viewBox="0 0 16 16" shapeRendering="crispEdges" fill="currentColor" className="h-5 w-5" aria-hidden>
      <rect x="4" y="1" width="5" height="1" /><rect x="3" y="2" width="1" height="1" /><rect x="9" y="2" width="1" height="1" />
      <rect x="2" y="3" width="1" height="5" /><rect x="10" y="3" width="1" height="5" />
      <rect x="3" y="8" width="1" height="1" /><rect x="9" y="8" width="1" height="1" /><rect x="4" y="9" width="5" height="1" />
      <rect x="10" y="9" width="1" height="1" /><rect x="11" y="10" width="1" height="1" /><rect x="12" y="11" width="2" height="1" />
      <rect x="13" y="12" width="2" height="2" />
      <rect x="4" y="5" width="5" height="1" />
      {plus && <rect x="6" y="3" width="1" height="5" />}
    </svg>
  );
}

/** Zoom between "monitor in the room" and "screen fills the window". Wide screens only (CSS). */
export default function ZoomControls() {
  const zoom = useSettings((s) => s.zoom);
  const setZoom = useSettings((s) => s.setZoom);
  const btn = (active: boolean) =>
    `flex h-10 w-10 items-center justify-center text-[#ffb648] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#ffb648] ${active ? "opacity-35" : "hover:bg-[#ffb648]/15"}`;
  return (
    <div className="zoom-controls" role="group" aria-label="Zoom">
      <button type="button" aria-label="Zoom in to the screen" aria-pressed={zoom === "screen"} disabled={zoom === "screen"} className={btn(zoom === "screen")} onClick={() => setZoom("screen")}>
        <Magnifier plus />
      </button>
      <button type="button" aria-label="Zoom out to the room" aria-pressed={zoom === "room"} disabled={zoom === "room"} className={btn(zoom === "room")} onClick={() => setZoom("room")}>
        <Magnifier plus={false} />
      </button>
    </div>
  );
}
