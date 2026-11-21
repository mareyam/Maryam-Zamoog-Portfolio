"use client";
import { useState } from "react";
import { JOURNAL } from "@/lib/maryam-content";
import { AppShell, Crumbs, Heading, RetroButton, TempNote, ViewSwitch } from "./ui";

export default function JournalApp() {
  const [sel, setSel] = useState<number | null>(null);
  const post = sel !== null ? JOURNAL[sel] : null;

  return (
    <AppShell>
      <ViewSwitch id={post ? `j-${sel}` : "list"}>
        {!post ? (
          <div>
            <Crumbs items={[{ label: "JOURNAL" }]} />
            <ul className="space-y-3 p-4">
              {JOURNAL.map((j, i) => (
                <li key={j.number}>
                  <button type="button" onClick={() => setSel(i)} className="group w-full border border-[#ffb648]/50 p-3 text-left hover:border-[#ffb648] hover:bg-[#ffb648]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#ffb648]">
                    <span className="text-xs opacity-60">NOTE {j.number}</span>
                    <span className="mt-1 block text-base font-bold group-hover:underline">{j.title}</span>
                    <span className="mt-1 block opacity-80">{j.excerpt}</span>
                    <span className="mt-2 block text-xs">Read &gt;</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div>
            <Crumbs items={[{ label: "JOURNAL", onClick: () => setSel(null) }, { label: `Note ${post.number}` }]} />
            <article className="p-4">
              <p className="text-xs opacity-60">NOTE {post.number}</p>
              <Heading size="text-3xl">{post.title}</Heading>
              <p className="mt-4 border-l-2 border-[#ffb648] pl-3 text-base">{post.excerpt}</p>
              <div className="mt-4">
                <TempNote>The full text of this note isn&apos;t in the project data yet, so only the opening is shown here. Add the body to replace this block.</TempNote>
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-[#ffb648]/30 pt-3">
                <RetroButton onClick={() => setSel(null)}>&lt; All notes</RetroButton>
                <div className="flex gap-2">
                  <RetroButton disabled={sel === 0} onClick={() => setSel((sel ?? 1) - 1)}>Prev</RetroButton>
                  <RetroButton disabled={sel === JOURNAL.length - 1} onClick={() => setSel((sel ?? 0) + 1)}>Next</RetroButton>
                </div>
              </div>
            </article>
          </div>
        )}
      </ViewSwitch>
    </AppShell>
  );
}
