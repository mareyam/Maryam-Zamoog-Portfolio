// Pixel cursors drawn as inline SVG (amber fill, navy outline), matching the reference's style.
const ARROW = [
  "X..........",
  "XX.........",
  "XaX........",
  "XaaX.......",
  "XaaaX......",
  "XaaaaX.....",
  "XaaaaaX....",
  "XaaaaaaX...",
  "XaaaaaaaX..",
  "XaaaaaXXXXX",
  "XaaXaaX....",
  "XaX.XaaX...",
  "XX..XaaX...",
  "X....XaaX..",
  ".....XXXX..",
];
const HAND = [
  "....XX.........",
  "...XaaX........",
  "...XaaX........",
  "...XaaX........",
  "...XaaXXX......",
  "...XaaXaaXX....",
  ".XXXaaXaaXaaX..",
  "XaaXaaaaaaaaaX.",
  "XaaXaaaaaaaaaX.",
  ".XaaaaaaaaaaaX.",
  "..XaaaaaaaaaaX.",
  "..XaaaaaaaaaX..",
  "...XaaaaaaaaX..",
  "...XaaaaaaaaX..",
  "....XXXXXXXX...",
];

export function toCursor(rows: string[], hx: number, hy: number, fallback: string) {
  const w = Math.max(...rows.map((r) => r.length));
  const rects = rows
    .flatMap((row, y) =>
      [...row].map((c, x) =>
        c === "." ? "" : `<rect x='${x}' y='${y}' width='1' height='1' fill='${c === "X" ? "#020b14" : "#ffb648"}'/>`,
      ),
    )
    .join("");
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${w * 2}' height='${rows.length * 2}' viewBox='0 0 ${w} ${rows.length}' shape-rendering='crispEdges'>${rects}</svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}") ${hx} ${hy}, ${fallback}`;
}

export const CURSOR_ARROW = toCursor(ARROW, 0, 0, "default");
export const CURSOR_HAND = toCursor(HAND, 10, 2, "pointer");

const EW = [
  "...X.......X...",
  "..XX.......XX..",
  ".XaX.......XaX.",
  "XaaXXXXXXXXXaaX",
  "XaaaaaaaaaaaaaX",
  "XaaXXXXXXXXXaaX",
  ".XaX.......XaX.",
  "..XX.......XX..",
  "...X.......X...",
];
const transpose = (rows: string[]) => [...rows[0]].map((_, x) => rows.map((r) => r[x]).join(""));
const NWSE = [
  "XXXXX......",
  "XaaaX......",
  "XaaX.......",
  "XaXaX......",
  "XX.XaX.....",
  "X...XaX....",
  ".....XaX.XX",
  "......XaXaX",
  ".......XaaX",
  "......XaaaX",
  "......XXXXX",
];
const mirror = (rows: string[]) => rows.map((r) => [...r].reverse().join(""));
const IBEAM = [
  "XXXXXXX",
  "XaaaaaX",
  "XXXaXXX",
  "..XaX..", "..XaX..", "..XaX..", "..XaX..", "..XaX..", "..XaX..", "..XaX..", "..XaX..", "..XaX..",
  "XXXaXXX",
  "XaaaaaX",
  "XXXXXXX",
];

export const CURSOR_EW = toCursor(EW, 15, 9, "ew-resize");
export const CURSOR_NS = toCursor(transpose(EW), 9, 15, "ns-resize");
export const CURSOR_NWSE = toCursor(NWSE, 11, 11, "nwse-resize");
export const CURSOR_NESW = toCursor(mirror(NWSE), 11, 11, "nesw-resize");
export const CURSOR_TEXT = toCursor(IBEAM, 7, 15, "text");
