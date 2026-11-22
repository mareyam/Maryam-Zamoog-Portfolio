"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BRAND, EMAIL, NAV_LINKS, SECTIONS } from "./content";

/** Fixed header with an off-canvas menu, plus the scroll progress bar and section counter. */
export default function Nav() {
  const [open, setOpen] = useState(false);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const menuBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuBtn.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <div className="zm-progress" aria-hidden />
      <p className="zm-counter" aria-hidden>
        <span data-counter>01</span> / {String(SECTIONS.length).padStart(2, "0")} &nbsp;<span data-counter-label>{SECTIONS[0]}</span>
      </p>
      <header className="zm-nav">
        <Link href="/" className="zm-brand" aria-label={`${BRAND} — home`}>{BRAND}</Link>
        <nav aria-label="Primary" className="flex items-center gap-8">
          <ul className="hidden items-center gap-8 text-[0.95rem] lg:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.href}><a href={`/${l.href}`} className="text-[var(--zm-purple)] hover:underline hover:decoration-[var(--zm-accent)] hover:decoration-2 hover:underline-offset-4">{l.label}</a></li>
            ))}
          </ul>
          <button ref={menuBtn} type="button" className="zm-moment-btn" aria-expanded={open} aria-controls="zm-menu" onClick={() => setOpen(true)}>
            Menu
          </button>
        </nav>
      </header>

      <div className="zm-backdrop" data-open={open} onClick={() => setOpen(false)} aria-hidden />
      <div id="zm-menu" className="zm-panel" data-open={open} role="dialog" aria-modal="true" aria-label="Menu" inert={!open}>
        <div className="flex items-center justify-between">
          <span className="zm-brand">{BRAND}</span>
          <button ref={closeBtn} type="button" className="rounded-full border border-[var(--zm-bg)] px-4 py-2 text-sm hover:bg-[var(--zm-bg)] hover:text-[var(--zm-ink)]" onClick={() => { setOpen(false); menuBtn.current?.focus(); }}>
            Close
          </button>
        </div>
        <ul className="mt-14 space-y-2">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a href={`/${l.href}`} onClick={() => setOpen(false)} className="zm-head block text-[clamp(2rem,6vw,3.2rem)]">{l.label}</a>
            </li>
          ))}
        </ul>
        <a href={`mailto:${EMAIL}`} className="mt-auto text-lg">{EMAIL}</a>
      </div>
    </>
  );
}
