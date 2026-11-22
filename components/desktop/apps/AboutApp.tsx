"use client";
import { useState } from "react";
import Image from "next/image";
import { APPROACH, PROFILE, STORY } from "@/lib/maryam-content";
import { tools } from "@/components/sections/Resume";
import { AppShell, Heading, RetroButton, Tag, ViewSwitch } from "./ui";

const TABS = ["Profile", "Approach", "Timeline", "Skills"] as const;
type Tab = (typeof TABS)[number];

function Fact({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-[#ffb648]/20 py-1.5">
      <dt className="opacity-60">{k}</dt>
      <dd className="text-right">{v}</dd>
    </div>
  );
}

export default function AboutApp() {
  const [tab, setTab] = useState<Tab>("Profile");
  const [step, setStep] = useState(0);
  const [q, setQ] = useState("");
  const skills = tools.filter((t) => t.toLowerCase().includes(q.trim().toLowerCase()));

  return (
    <AppShell>
      <div role="tablist" aria-label="About sections" className="sticky top-0 z-10 flex gap-1 overflow-x-auto border-b border-[#ffb648]/30 bg-[#020b14] px-2 pt-2 sm:px-3">
        {TABS.map((t) => (
          <button
            key={t}
            role="tab"
            type="button"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={`shrink-0 border border-b-0 border-[#ffb648]/60 px-2 py-1 pointer-coarse:py-2 text-[13px] focus-visible:outline-offset-[-2px] sm:px-3 sm:text-sm focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#ffb648] ${tab === t ? "bg-[#ffb648] text-[#020b14]" : "hover:bg-[#ffb648]/15"}`}
          >
            {t}
          </button>
        ))}
      </div>
      <ViewSwitch id={tab}>
        <div role="tabpanel" className="p-4">
          {tab === "Profile" && (
            <div className="flex flex-col gap-4 @lg:flex-row">
              <div className="relative h-40 w-32 shrink-0 self-start overflow-hidden border-2 border-[#ffb648]">
                <Image src="/images/maryam-profile-v2.jpg" alt={`Portrait of ${PROFILE.name}`} fill sizes="128px" className="object-cover grayscale contrast-125" />
                <div aria-hidden className="absolute inset-0 bg-[#ffb648] mix-blend-multiply" />
                <div aria-hidden className="absolute inset-0" style={{ backgroundImage: "repeating-linear-gradient(0deg, rgba(2,11,20,0.35) 0 1px, transparent 1px 3px)" }} />
              </div>
              <div className="min-w-0 flex-1">
                <Heading>{PROFILE.name}</Heading>
                <p className="mt-1 opacity-80">{PROFILE.role}</p>
                <p className="mt-3">{PROFILE.eyebrow}.</p>
                <p className="mt-3 opacity-90">{STORY[0].text}</p>
                <dl className="mt-4">
                  <Fact k="Based in" v={PROFILE.location} />
                  <Fact k="Independent since" v="2024" />
                  <Fact k="Availability" v={PROFILE.availability} />
                  <Fact k="Email" v={PROFILE.email} />
                  <Fact k="Site" v={PROFILE.site} />
                </dl>
              </div>
            </div>
          )}
          {tab === "Approach" && (
            <div>
              <Heading>How a project runs</Heading>
              <p className="mt-2 text-xs opacity-60">Step {step + 1} of {APPROACH.length}</p>
              <ol className="my-3 flex gap-2" aria-label="Steps">
                {APPROACH.map((a, i) => (
                  <li key={a.number} className="flex-1">
                    <button type="button" onClick={() => setStep(i)} aria-current={i === step ? "step" : undefined} className={`w-full border px-2 py-1 text-left ${i === step ? "border-[#ffb648] bg-[#ffb648] text-[#020b14]" : "border-[#ffb648]/40 hover:bg-[#ffb648]/15"}`}>
                      {a.number} {a.title}
                    </button>
                  </li>
                ))}
              </ol>
              <ViewSwitch id={`step-${step}`}>
                <p className="border border-[#ffb648]/40 p-3">{APPROACH[step].text}</p>
              </ViewSwitch>
              <div className="mt-3 flex justify-between">
                <RetroButton disabled={step === 0} onClick={() => setStep(step - 1)}>&lt; Back</RetroButton>
                <RetroButton disabled={step === APPROACH.length - 1} onClick={() => setStep(step + 1)}>Next &gt;</RetroButton>
              </div>
            </div>
          )}
          {tab === "Timeline" && (
            <ol className="space-y-4 border-l-2 border-[#ffb648]/40 pl-4">
              {STORY.map((s) => (
                <li key={s.title} className="relative">
                  <span aria-hidden className="absolute -left-[22px] top-1.5 h-2.5 w-2.5 bg-[#ffb648]" />
                  <p className="text-xs opacity-60">{s.year}</p>
                  <p className="font-bold">{s.title}</p>
                  <p className="opacity-90">{s.text}</p>
                </li>
              ))}
            </ol>
          )}
          {tab === "Skills" && (
            <div>
              <label className="block text-xs uppercase tracking-widest opacity-70" htmlFor="skill-filter">Filter tools</label>
              <input id="skill-filter" value={q} onChange={(e) => setQ(e.target.value)} placeholder="type a tool name..." className="mt-1 w-full border border-[#ffb648]/60 bg-transparent px-2 py-1 pointer-coarse:py-2 pointer-coarse:text-base placeholder:text-[#ffb648]/40 focus:border-[#ffb648] focus:outline-none" />
              <p className="my-2 text-xs opacity-60">{skills.length} of {tools.length}</p>
              <div className="flex flex-wrap gap-2">{skills.map((t) => <Tag key={t}>{t}</Tag>)}</div>
              {skills.length === 0 && <p className="opacity-70">No tool matches &quot;{q}&quot;.</p>}
            </div>
          )}
        </div>
      </ViewSwitch>
    </AppShell>
  );
}
