"use client";
import { useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import type { AppId } from "@/lib/desktop/apps";
import { useWindowStore } from "@/lib/desktop/windowStore";
import { useDesktopStore } from "@/lib/desktop/desktopStore";
import AboutApp from "../apps/AboutApp";
import ContactApp from "../apps/ContactApp";
import CvApp from "../apps/CvApp";
import JournalApp from "../apps/JournalApp";
import ServicesApp from "../apps/ServicesApp";
import WorkApp from "../apps/WorkApp";
import Window from "./Window";

/** Maps an app to its content. */
function renderApp(id: AppId, prefill: { text: string; n: number }) {
  switch (id) {
    case "work": return <WorkApp />;
    case "about": return <AboutApp />;
    case "services": return <ServicesApp />;
    case "journal": return <JournalApp />;
    case "contact": return <ContactApp key={prefill.n} prefill={prefill.text} />;
    case "cv": return <CvApp />;
  }
}

/** Owns the window area (between menu bar and taskbar) and renders every open window. */
export default function WindowManager() {
  const ref = useRef<HTMLDivElement>(null);
  const windows = useWindowStore((s) => s.windows);
  const ids = Object.keys(windows) as AppId[];
  const setArea = useWindowStore((s) => s.setArea);
  const prefill = useDesktopStore((s) => s.contactPrefill);

  useEffect(() => {
    const el = ref.current!;
    const measure = () => setArea({ w: el.clientWidth, h: el.clientHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [setArea]);

  return (
    <div ref={ref} data-window-area className="pointer-events-none absolute inset-x-0 bottom-[var(--dock-h)] top-[var(--bar-h)] z-10 [&>*]:pointer-events-auto">
      <AnimatePresence>
        {ids.map((id) => (
          <Window key={id} id={id}>{renderApp(id, prefill)}</Window>
        ))}
      </AnimatePresence>
    </div>
  );
}
