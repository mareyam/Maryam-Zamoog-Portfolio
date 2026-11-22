import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import "./zamoog.css";

const head = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-zm-head", display: "swap" });
const body = DM_Sans({ subsets: ["latin"], variable: "--font-zm-body", display: "swap" });

const TITLE = "Zamoog — Smarter systems for businesses that have better things to do";
const DESCRIPTION =
  "We build AI phone assistants, customer management systems and automations that handle the busywork, connect your tools and help your business run better.";

export const metadata: Metadata = {
  metadataBase: new URL("https://zamoog.com"),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/", siteName: "Zamoog", type: "website" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F8F8F5",
};

export default function ZamoogLayout({ children }: { children: React.ReactNode }) {
  return <div className={`zm ${head.variable} ${body.variable}`}>{children}</div>;
}
