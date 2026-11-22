"use client";
import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

export const glow = { textShadow: "0 0 6px rgba(255,182,72,0.45)" };

export function AppShell({ children }: { children: ReactNode }) {
  return <div className="@container select-text font-[family-name:var(--font-chivo)] text-sm leading-relaxed text-[#ffb648]">{children}</div>;
}

/** Slides/fades between views of one app. */
export function ViewSwitch({ id, children }: { id: string; children: ReactNode }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={id}
        initial={{ opacity: 0, x: 14 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -14 }}
        transition={{ duration: 0.14, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export function Crumbs({ items }: { items: { label: string; onClick?: () => void }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="sticky top-0 z-10 flex flex-wrap items-center gap-1 border-b border-[#ffb648]/30 bg-[#020b14] px-4 py-2 text-[13px]">
      {items.map((it, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && <span aria-hidden className="opacity-50">&gt;</span>}
          {it.onClick ? (
            <button type="button" onClick={it.onClick} className="py-1 pointer-coarse:py-2.5 underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#ffb648]">{it.label}</button>
          ) : (
            <span aria-current="page" className="opacity-70">{it.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

export function Heading({ children, size = "text-3xl" }: { children: ReactNode; size?: string }) {
  return <h2 className={`font-[family-name:var(--font-jersey)] leading-none ${size}`} style={{ textShadow: "0 0 10px rgba(255,182,72,0.5)" }}>{children}</h2>;
}

export function Tag({ children }: { children: ReactNode }) {
  return <span className="inline-block border border-[#ffb648]/60 px-1.5 py-px text-xs">{children}</span>;
}

type BtnProps = { children: ReactNode; onClick?: () => void; href?: string; disabled?: boolean; type?: "button" | "submit"; active?: boolean; external?: boolean; newTab?: boolean };
export function RetroButton({ children, onClick, href, disabled, type = "button", active, external = true, newTab = false }: BtnProps) {
  const cls = `inline-flex items-center gap-1.5 border border-[#ffb648] px-3 py-1 pointer-coarse:py-2 shadow-[2px_2px_0_rgba(255,182,72,0.35)] active:translate-x-px active:translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffb648] ${active ? "bg-[#ffb648] text-[#020b14]" : "hover:bg-[#ffb648] hover:text-[#020b14]"} ${disabled ? "pointer-events-none opacity-40" : ""}`;
  if (href) {
    return <a href={href} className={cls} {...(newTab || (external && href.startsWith("http")) ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{children}</a>;
  }
  return <button type={type} onClick={onClick} disabled={disabled} className={cls}>{children}</button>;
}

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-5">
      <h3 className="mb-2 border-b border-[#ffb648]/30 pb-1 text-xs uppercase tracking-[0.18em] opacity-80">{title}</h3>
      {children}
    </section>
  );
}

export function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((t) => (
        <li key={t} className="flex gap-2"><span aria-hidden className="opacity-60">&gt;</span><span>{t}</span></li>
      ))}
    </ul>
  );
}

/** Placeholder block clearly marked as temporary content. */
export function TempNote({ children }: { children: ReactNode }) {
  return (
    <div role="note" className="border border-dashed border-[#ffb648]/60 bg-[#ffb648]/5 p-3 text-[13px]">
      <span className="mr-2 bg-[#ffb648] px-1 text-[11px] font-bold uppercase text-[#020b14]">Temporary</span>
      {children}
    </div>
  );
}

export const clean = (s: string) => s.replaceAll("&apos;", "'");
