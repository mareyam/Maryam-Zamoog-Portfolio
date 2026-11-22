"use client";

import { motion } from "framer-motion";
import type { Project } from "@/lib/projects";

export default function ProjectDetail({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-y-auto bg-[#f4f1ea]"
      initial={{ opacity: 0, scale: 0.92, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 12 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto max-w-3xl px-6 py-10 sm:px-10 sm:py-16">
        <button
          onClick={onClose}
          className="mb-10 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-[#4a463e] shadow-sm transition hover:-translate-x-0.5 hover:shadow-md"
        >
          ← Back to canvas
        </button>

        <p className="font-mono text-xs uppercase tracking-widest text-[#9b7fe0]">
          {project.category}
          {project.period ? ` · ${project.period}` : ""}
        </p>
        <h1 className="mt-3 text-3xl font-black italic text-[#2d1b69] sm:text-5xl">
          {project.title}
        </h1>
        <p className="mt-4 max-w-xl text-lg text-[#4a463e]">{project.tagline}</p>

        <Section title="Overview">
          <p className="text-[#4a463e]">{project.overview}</p>
        </Section>

        <Section title="The problem">
          <ul className="list-disc space-y-1.5 pl-5 text-[#4a463e]">
            {project.problems.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </Section>

        <Section title="What I built">
          <ul className="list-disc space-y-1.5 pl-5 text-[#4a463e]">
            {project.built.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </Section>

        <Section title="Previews">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {project.screenshots.map((s) => (
              <div
                key={s.label}
                className="flex h-40 items-center justify-center rounded-xl border border-black/10 bg-white font-mono text-xs text-[#9a948a]"
              >
                {s.label}
              </div>
            ))}
          </div>
        </Section>

        <Section title="Key features">
          <ul className="list-disc space-y-1.5 pl-5 text-[#4a463e]">
            {project.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </Section>

        <Section title="Tools & tech">
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-full bg-[#2d1b69]/10 px-3 py-1 text-sm font-medium text-[#2d1b69]"
              >
                {t}
              </span>
            ))}
          </div>
        </Section>

        {project.link && (
          <a
            href={project.link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#2d1b69] px-6 py-3 text-sm font-semibold text-white transition hover:scale-105"
          >
            {project.link.label} ↗
          </a>
        )}
      </div>
    </motion.div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-10">
      <h2 className="mb-3 font-mono text-xs uppercase tracking-widest text-[#9a948a]">
        {title}
      </h2>
      {children}
    </div>
  );
}
