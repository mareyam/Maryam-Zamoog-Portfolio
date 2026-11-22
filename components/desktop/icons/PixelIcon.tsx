import type { ReactElement } from "react";
import type { AppId } from "@/lib/desktop/apps";

// Original 16x16 pixel-art icons built from rectangles (A = amber, D = dim amber, L = light).
const A = "#ffb648";
const D = "#74582b";
const L = "#ffdba4";

type R = [number, number, number, number, string];
const box = (x: number, y: number, w: number, h: number, fill = D): R[] => [
  [x, y, w, h, fill],
  [x, y, w, 1, A],
  [x, y + h - 1, w, 1, A],
  [x, y, 1, h, A],
  [x + w - 1, y, 1, h, A],
];

const SHAPES: Record<string, R[]> = {
  work: [[1, 2, 6, 3, A], ...box(1, 4, 14, 10), [2, 5, 12, 1, L]],
  about: [
    ...box(3, 1, 10, 14),
    [10, 1, 3, 3, L],
    [5, 6, 6, 1, A], [5, 8, 6, 1, A], [5, 10, 6, 1, A], [5, 12, 4, 1, A],
  ],
  services: [
    [6, 2, 4, 1, A], [5, 3, 1, 2, A], [10, 3, 1, 2, A],
    ...box(1, 5, 14, 9), [1, 9, 14, 1, A], [7, 8, 2, 3, L],
  ],
  journal: [
    ...box(3, 1, 10, 14), [5, 1, 1, 14, A],
    [7, 4, 5, 1, A], [7, 6, 5, 1, A], [7, 8, 3, 1, A],
  ],
  contact: [
    ...box(1, 3, 14, 10),
    ...[0, 1, 2, 3, 4, 5].flatMap((i): R[] => [[2 + i, 4 + i, 1, 1, L], [13 - i, 4 + i, 1, 1, L]]),
  ],
  cv: [
    ...box(2, 1, 12, 14), [5, 1, 6, 4, L], [8, 2, 2, 2, D], [5, 9, 6, 5, L],
  ],
  "speaker-on": [
    [2, 6, 3, 4, A], [5, 5, 1, 6, A], [6, 4, 1, 8, A], [7, 3, 1, 10, A],
    [10, 6, 1, 4, A], [12, 4, 1, 8, A],
  ],
  "speaker-off": [
    [2, 6, 3, 4, A], [5, 5, 1, 6, A], [6, 4, 1, 8, A], [7, 3, 1, 10, A],
    ...[0, 1, 2, 3, 4].flatMap((i): R[] => [[10 + i, 5 + i, 1, 1, A], [14 - i, 5 + i, 1, 1, A]]),
  ],
};

export type IconName = AppId | "speaker-on" | "speaker-off";

export default function PixelIcon({ name, className = "" }: { name: IconName; className?: string }): ReactElement {
  return (
    <svg viewBox="0 0 16 16" shapeRendering="crispEdges" className={className} aria-hidden>
      {SHAPES[name].map(([x, y, w, h, f], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} fill={f} />
      ))}
    </svg>
  );
}
