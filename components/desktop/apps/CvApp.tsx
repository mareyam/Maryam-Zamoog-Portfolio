"use client";
import { experience, tools } from "@/components/sections/Resume";
import { email } from "@/lib/data";
import { PROFILE } from "@/lib/maryam-content";
import { AppShell, Bullets, Heading, RetroButton, Section, Tag } from "./ui";

export default function CvApp() {
  return (
    <AppShell>
      <div className="p-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <Heading>{PROFILE.name}</Heading>
            <p className="mt-1 opacity-80">{PROFILE.role}</p>
          </div>
          <div className="flex gap-2">
            <RetroButton active href="/resume" newTab>Open printable CV</RetroButton>
            <RetroButton href={`mailto:${email}`}>Email</RetroButton>
          </div>
        </div>
        <Section title="Experience">
          <div className="space-y-5">
            {experience.map((x) => (
              <div key={x.role + x.period}>
                <p className="font-bold">{x.title}</p>
                <p className="mb-2 text-xs opacity-60">{x.role} / {x.period}</p>
                <Bullets items={x.bullets} />
              </div>
            ))}
          </div>
        </Section>
        <Section title="Tools">
          <div className="flex flex-wrap gap-2">{tools.map((t) => <Tag key={t}>{t}</Tag>)}</div>
        </Section>
      </div>
    </AppShell>
  );
}
