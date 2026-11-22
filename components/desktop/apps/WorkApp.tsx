"use client";
import { useMemo, useRef, useState } from "react";
import { PROJECTS, type Project } from "@/lib/projects";
import { FDE_GROUP, SUMMARY_PROJECTS, WORK_GROUPS, type SummaryProject } from "@/lib/desktop/workProjects";
import { LOOM_BY_ID } from "@/lib/desktop/workLooms";
import PixelIcon from "../icons/PixelIcon";
import { AppShell, Bullets, Crumbs, Heading, RetroButton, Section, Tag, TempNote, ViewSwitch } from "./ui";

type Item =
  | { kind: "rich"; id: string; group: string; label: string; title: string; blurb: string; p: Project }
  | { kind: "summary"; id: string; group: string; label: string; title: string; blurb: string; s: SummaryProject };

// The three detailed project pages first, then the grouped write-ups.
// Where each detailed project lives. Projects not listed here are not shown in Work.
const RICH_GROUP: Record<string, string> = {
  automations: "WhatsApp Agents & Voice AI",
  leadgen: "Clay / Outreach / Cold Email / LinkedIn",
  products: FDE_GROUP,
};
const ITEMS: Item[] = [
  ...PROJECTS.filter((p) => RICH_GROUP[p.id]).map(
    (p): Item => ({ kind: "rich", id: p.id, group: RICH_GROUP[p.id], label: p.fileTitle, title: p.title, blurb: p.tagline, p }),
  ),
  ...SUMMARY_PROJECTS.map(
    (s): Item => ({ kind: "summary", id: s.id, group: s.group, label: `${s.id}.log`, title: s.title, blurb: s.bullets[0], s }),
  ),
];
const GROUPS: string[] = [...WORK_GROUPS];
const COUNTS = Object.fromEntries(GROUPS.map((g) => [g, ITEMS.filter((i) => i.group === g).length]));

function SourceNote({ children }: { children: React.ReactNode }) {
  return (
    <div role="note" className="border border-dashed border-[#ffb648]/60 bg-[#ffb648]/5 p-3 text-[13px]">
      <span className="mr-2 bg-[#ffb648] px-1 text-[11px] font-bold uppercase text-[#020b14]">Note</span>
      {children}
    </div>
  );
}

export default function WorkApp() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [filter, setFilter] = useState("All");
  const query = "";
  const root = useRef<HTMLDivElement>(null);

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    // Same order as the grouped list, so Prev/Next follow what is on screen.
    const rank = (g: string) => GROUPS.indexOf(g);
    return ITEMS.filter((i) => {
      if (filter !== "All" && i.group !== filter) return false;
      if (!q) return true;
      const hay = i.kind === "summary" ? `${i.title} ${i.s.bullets.join(" ")} ${i.group}` : `${i.title} ${i.blurb} ${i.p.tech.join(" ")}`;
      return hay.toLowerCase().includes(q);
    }).sort((x, y) => rank(x.group) - rank(y.group));
  }, [filter, query]);

  const open = ITEMS.find((i) => i.id === openId) ?? null;
  const idx = open ? shown.findIndex((i) => i.id === open.id) : -1;

  // The window body is the scroller: start each view at the top.
  const go = (id: string | null) => {
    setOpenId(id);
    requestAnimationFrame(() => root.current?.closest(".overflow-auto")?.scrollTo({ top: 0 }));
  };

  const card = (i: Item) => (
    <li key={i.id}>
      <button
        type="button"
        onClick={() => go(i.id)}
        className="group flex h-full w-full flex-col gap-2 border border-[#ffb648]/50 p-3 text-left hover:border-[#ffb648] hover:bg-[#ffb648]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#ffb648]"
      >
        <span className="flex items-center gap-3">
          <PixelIcon name="work" className="h-9 w-9 shrink-0 transition-transform group-hover:-translate-y-0.5" />
          <span className="min-w-0 truncate text-xs opacity-60">{i.label}</span>
        </span>
        <span className="line-clamp-3 text-[15px] font-bold leading-snug">{i.title}</span>
        <span className="mt-auto flex flex-wrap gap-1.5 pt-1">
          {i.kind !== "summary" && <Tag>{i.p.category}</Tag>}
        </span>
      </button>
    </li>
  );

  return (
    <AppShell>
      <div ref={root}>
        <ViewSwitch id={open ? open.id : "list"}>
          {!open ? (
            <div>
              <Crumbs items={[{ label: filter === "All" ? "C:\\WORK" : `C:\\WORK\\${filter}` }]} />
              <div className="p-4">
                <div role="group" aria-label="Filter by category" className="mb-4 flex flex-wrap gap-2">
                  {["All", ...GROUPS].map((g) => (
                    <RetroButton key={g} active={filter === g} onClick={() => setFilter(g)}>
                      {g}
                      <span className="text-xs opacity-60">{g === "All" ? ITEMS.length : COUNTS[g]}</span>
                    </RetroButton>
                  ))}
                </div>
                <p className="mb-3 text-xs opacity-60" role="status">{shown.length} item(s)</p>
                {GROUPS.filter((g) => shown.some((i) => i.group === g)).map((g) => (
                  <section key={g} className="mb-6" aria-label={g}>
                    {filter === "All" && (
                      <h3 className="mb-2 border-b border-[#ffb648]/30 pb-1 text-xs uppercase tracking-[0.18em] opacity-80">
                        {g} <span className="opacity-60">({shown.filter((i) => i.group === g).length})</span>
                      </h3>
                    )}
                    <ul className="grid gap-3 @lg:grid-cols-2 @3xl:grid-cols-3">{shown.filter((i) => i.group === g).map(card)}</ul>
                  </section>
                ))}
                {shown.length === 0 && <p className="opacity-70">No project matches &quot;{query}&quot;.</p>}
              </div>
            </div>
          ) : (
            <div>
              <Crumbs
                items={[
                  { label: "C:\\WORK", onClick: () => go(null) },
                  ...(open.kind === "summary" ? [{ label: open.group, onClick: () => { setFilter(open.group); go(null); } }] : []),
                  { label: open.label },
                ]}
              />
              <article className="p-4">
                <Heading size={open.kind === "summary" ? "text-2xl" : "text-3xl"}>{open.title}</Heading>
                {open.kind === "rich" ? (
                  <>
                    <div className="mt-2 flex flex-wrap gap-2"><Tag>{open.p.category}</Tag>{open.p.period && <Tag>{open.p.period}</Tag>}</div>
                    <p className="mt-3">{open.p.overview}</p>
                    <Section title="The problem"><Bullets items={open.p.problems} /></Section>
                    <Section title="What I built"><Bullets items={open.p.built} /></Section>
                    <Section title="Features"><Bullets items={open.p.features} /></Section>
                    <Section title="Tech">
                      <div className="flex flex-wrap gap-2">{open.p.tech.map((t) => <Tag key={t}>{t}</Tag>)}</div>
                    </Section>
                    <Section title="Screenshots">
                      <div className="grid grid-cols-2 gap-3">
                        {open.p.screenshots.map((s) => (
                          <div key={s.label} className="flex aspect-video flex-col items-center justify-center gap-1 border border-dashed border-[#ffb648]/50 text-center text-xs" style={{ backgroundImage: "repeating-linear-gradient(45deg, rgba(255,182,72,0.06) 0 6px, transparent 6px 12px)" }}>
                            <span>{s.label}</span>
                            <span className="opacity-60">placeholder: image not provided yet</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-2"><TempNote>Screenshot slots are placeholders from your project data. Add real images to replace them.</TempNote></div>
                    </Section>
                  </>
                ) : (
                  <>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <Tag>{open.group}</Tag>
                    </div>
                    {LOOM_BY_ID[open.id] && (
                      <a href={LOOM_BY_ID[open.id]} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block border border-[#ffb648] bg-[#ffb648] px-3 py-1 font-bold text-[#020b14] hover:bg-transparent hover:text-[#ffb648]">
                        &#9654; Watch the Loom
                      </a>
                    )}
                    <div className="mt-4"><Bullets items={open.s.bullets} /></div>
                    {open.s.note && <div className="mt-4"><SourceNote>{open.s.note}</SourceNote></div>}
                  </>
                )}
                <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-[#ffb648]/30 pt-3">
                  <RetroButton onClick={() => go(null)}>&lt; Back to files</RetroButton>
                  <div className="flex items-center gap-2">
                    <span className="text-xs opacity-60">{idx >= 0 ? `${idx + 1} of ${shown.length}` : ""}</span>
                    <RetroButton disabled={idx <= 0} onClick={() => go(shown[idx - 1].id)}>Prev</RetroButton>
                    <RetroButton disabled={idx < 0 || idx === shown.length - 1} onClick={() => go(shown[idx + 1].id)}>Next</RetroButton>
                  </div>
                </div>
              </article>
            </div>
          )}
        </ViewSwitch>
      </div>
    </AppShell>
  );
}
