/** Pixel-style power glyph drawn in SVG. */
export default function PowerGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" shapeRendering="crispEdges" className={className} fill="currentColor" aria-hidden>
      <rect x="7" y="1" width="2" height="7" />
      <rect x="4" y="3" width="2" height="1" />
      <rect x="10" y="3" width="2" height="1" />
      <rect x="3" y="4" width="1" height="2" />
      <rect x="12" y="4" width="1" height="2" />
      <rect x="2" y="6" width="1" height="4" />
      <rect x="13" y="6" width="1" height="4" />
      <rect x="3" y="10" width="1" height="2" />
      <rect x="12" y="10" width="1" height="2" />
      <rect x="4" y="12" width="2" height="1" />
      <rect x="10" y="12" width="2" height="1" />
      <rect x="6" y="13" width="4" height="1" />
    </svg>
  );
}
