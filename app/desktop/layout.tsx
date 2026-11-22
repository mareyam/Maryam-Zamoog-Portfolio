import type { Viewport } from "next";
import "./desktop.css";
import { CURSOR_ARROW, CURSOR_EW, CURSOR_HAND, CURSOR_NESW, CURSOR_NS, CURSOR_NWSE, CURSOR_TEXT } from "@/lib/desktop/cursors";
import { Chivo_Mono, Jersey_10 } from "next/font/google";

const chivo = Chivo_Mono({ variable: "--font-chivo", subsets: ["latin"] });
const jersey = Jersey_10({ variable: "--font-jersey", subsets: ["latin"], weight: "400" });

// Fill the screen on notched phones and tint the browser chrome to match the display.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#020b14",
};

export default function DesktopLayout({ children }: { children: React.ReactNode }) {
  return <div
      className={`retro-os ${chivo.variable} ${jersey.variable}`}
      style={
        {
          "--cursor-arrow": CURSOR_ARROW,
          "--cursor-hand": CURSOR_HAND,
          "--cursor-text": CURSOR_TEXT,
          "--cursor-ew": CURSOR_EW,
          "--cursor-ns": CURSOR_NS,
          "--cursor-nwse": CURSOR_NWSE,
          "--cursor-nesw": CURSOR_NESW,
        } as React.CSSProperties
      }
    >{children}</div>;
}
