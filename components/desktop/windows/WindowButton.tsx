type Glyph = "minimize" | "maximize" | "restore" | "close";

const A = "#ffb648";
const D = "#020b14";

function GlyphSvg({ glyph }: { glyph: Glyph }) {
  return (
    <svg viewBox="0 0 8 8" shapeRendering="crispEdges" className="h-3.5 w-3.5" fill={A} aria-hidden>
      {glyph === "minimize" && <rect x="0" y="5" width="8" height="2" />}
      {glyph === "maximize" && (
        <>
          <rect x="0" y="0" width="8" height="2" /><rect x="0" y="6" width="8" height="2" />
          <rect x="0" y="0" width="1" height="8" /><rect x="7" y="0" width="1" height="8" />
        </>
      )}
      {glyph === "restore" && (
        <>
          <rect x="2" y="0" width="6" height="1" /><rect x="2" y="0" width="1" height="2" /><rect x="7" y="0" width="1" height="6" /><rect x="5" y="5" width="3" height="1" />
          <rect x="0" y="2" width="6" height="1" /><rect x="0" y="7" width="6" height="1" /><rect x="0" y="2" width="1" height="6" /><rect x="5" y="2" width="1" height="6" />
        </>
      )}
      {glyph === "close" &&
        [0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <g key={i}><rect x={i} y={i} width="1" height="1" /><rect x={7 - i} y={i} width="1" height="1" /></g>
        ))}
    </svg>
  );
}

/** Square title-bar control: dark box, amber glyph, offset bevel like the reference's close button. */
export default function WindowButton({ glyph, label, onClick }: { glyph: Glyph; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      data-no-sfx
      aria-label={label}
      title={label}
      onClick={onClick}
      onPointerDown={(e) => e.stopPropagation()}
      onDoubleClick={(e) => e.stopPropagation()}
      className="flex h-7 w-7 items-center justify-center pointer-coarse:h-10 pointer-coarse:w-10 bg-[#020b14] shadow-[2px_2px_0_rgba(2,11,20,0.45)] hover:brightness-150 active:translate-x-px active:translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#020b14]"
      style={{ color: D }}
    >
      <GlyphSvg glyph={glyph} />
    </button>
  );
}
