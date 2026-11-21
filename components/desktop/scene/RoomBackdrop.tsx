/**
 * Original illustration of a warm 1980s study: wall, shelf, lamp, window blinds and slanted
 * light. Drawn with CSS and inline SVG (no photographs). Shown only on wide screens.
 */
export default function RoomBackdrop() {
  return (
    <div className="room" aria-hidden>
      <div className="room-wall" />
      <svg className="room-props" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
        {/* shelf with books and a small frame */}
        <rect x="0" y="150" width="620" height="18" fill="#5b3d22" />
        <rect x="0" y="168" width="620" height="8" fill="#2d1d10" opacity="0.5" />
        {[
          [40, 60, 38, "#2b2a33"], [82, 78, 30, "#8a5240"], [116, 66, 34, "#4a5560"],
          [154, 84, 28, "#b79b68"], [186, 70, 36, "#3b3f36"], [226, 58, 30, "#7a6a50"],
        ].map(([x, h, w, c], i) => (
          <rect key={i} x={x as number} y={150 - (h as number)} width={w as number} height={h as number} fill={c as string} />
        ))}
        <rect x="330" y="96" width="70" height="54" rx="3" fill="#d8c79a" stroke="#6d4c28" strokeWidth="4" />
        <rect x="342" y="108" width="46" height="30" fill="#9fb0b8" opacity="0.7" />
        {/* framed poster */}
        <rect x="700" y="60" width="150" height="190" fill="#cdb98c" stroke="#7a5a33" strokeWidth="6" />
        <rect x="716" y="78" width="118" height="70" fill="#4a6f9c" opacity="0.55" />
        <rect x="716" y="160" width="118" height="6" fill="#6d5a3a" opacity="0.5" />
        <rect x="716" y="176" width="90" height="6" fill="#6d5a3a" opacity="0.4" />
        {/* desk lamp */}
        <ellipse cx="90" cy="870" rx="70" ry="14" fill="#14110e" />
        <path d="M90 868 L170 600 L300 380" fill="none" stroke="#1b1815" strokeWidth="11" strokeLinecap="round" />
        <path d="M250 372 Q300 320 360 372 L340 410 Q300 398 262 410 Z" fill="#1b1815" />
        {/* books stacked at right */}
        <rect x="1330" y="700" width="170" height="32" fill="#8a6a46" />
        <rect x="1340" y="668" width="150" height="32" fill="#a98b5e" />
        <rect x="1350" y="640" width="130" height="28" fill="#6d4f32" />
      </svg>
      <div className="room-blinds" />
      <div className="room-light" />
      <div className="room-desk" />
      <div className="room-vignette" />
    </div>
  );
}
