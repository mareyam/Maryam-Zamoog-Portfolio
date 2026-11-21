"use client";
import { useState } from "react";
import { pricing } from "@/lib/data";
import { useDesktopStore } from "@/lib/desktop/desktopStore";
import { useWindowStore } from "@/lib/desktop/windowStore";
import { AppShell, Crumbs, Heading, RetroButton, Tag, ViewSwitch, clean } from "./ui";

export default function ServicesApp() {
  const [sel, setSel] = useState<number | null>(null);
  const item = sel !== null ? pricing[sel] : null;

  const ask = () => {
    if (!item) return;
    useDesktopStore.getState().setContactPrefill(`Interested in: ${item.title} (${item.price})`);
    useWindowStore.getState().open("contact");
  };

  return (
    <AppShell>
      <ViewSwitch id={item ? `s-${sel}` : "list"}>
        {!item ? (
          <div>
            <Crumbs items={[{ label: "SERVICES" }]} />
            <ul className="divide-y divide-[#ffb648]/20 p-2">
              {pricing.map((p, i) => (
                <li key={p.title}>
                  <button type="button" onClick={() => setSel(i)} className="flex w-full items-center justify-between gap-3 px-2 py-2 pointer-coarse:py-3 text-left hover:bg-[#ffb648] hover:text-[#020b14] focus-visible:bg-[#ffb648] focus-visible:text-[#020b14] focus-visible:outline-none">
                    <span><span aria-hidden className="mr-2">&gt;</span>{p.title}</span>
                    <span className="shrink-0 text-xs">{p.price}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div>
            <Crumbs items={[{ label: "SERVICES", onClick: () => setSel(null) }, { label: item.title }]} />
            <article className="p-4">
              <Heading>{item.title}</Heading>
              <div className="mt-2"><Tag>{item.price}</Tag></div>
              <p className="mt-4">{clean(item.desc)}</p>
              <p className="mt-3 border-l-2 border-[#ffb648] pl-3 opacity-90">{clean(item.advantage)}</p>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-[#ffb648]/30 pt-3">
                <RetroButton onClick={() => setSel(null)}>&lt; All services</RetroButton>
                <div className="flex gap-2">
                  <RetroButton disabled={sel === 0} onClick={() => setSel((sel ?? 1) - 1)}>Prev</RetroButton>
                  <RetroButton disabled={sel === pricing.length - 1} onClick={() => setSel((sel ?? 0) + 1)}>Next</RetroButton>
                  <RetroButton active onClick={ask}>Ask about this</RetroButton>
                </div>
              </div>
            </article>
          </div>
        )}
      </ViewSwitch>
    </AppShell>
  );
}
