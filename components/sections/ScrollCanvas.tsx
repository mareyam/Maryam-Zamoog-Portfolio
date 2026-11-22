"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PROJECTS, type Project } from "@/lib/projects";
import ProjectDetail from "./ProjectDetail";

type Waypoint = {
  x: number;
  y: number;
  scale: number;
  label: string;
};

const WAYPOINTS: Waypoint[] = [
  { x: 0, y: 0, scale: 1, label: "01 / SELECTED WORK" },
  { x: -560, y: -60, scale: 1.05, label: "02 / WHO I AM" },
  { x: -1120, y: 40, scale: 1, label: "03 / EXPERIENCE" },
  { x: -1680, y: -20, scale: 1, label: "04 / SAY HELLO" },
];

const SCROLL_PER_WAYPOINT_VH = 100;

function findProject(id: string): Project {
  const p = PROJECTS.find((proj) => proj.id === id);
  if (!p) throw new Error(`Unknown project id: ${id}`);
  return p;
}

export default function ScrollCanvas() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const current = useRef({ x: 0, y: 0, scale: 1 });
  const target = useRef({ x: 0, y: 0, scale: 1, label: WAYPOINTS[0].label });
  const rafId = useRef<number | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = selectedId ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedId]);

  useEffect(() => {
    const computeTarget = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      if (totalScrollable <= 0) return;

      const progress = Math.min(Math.max(-rect.top / totalScrollable, 0), 1);
      const waypointProgress = progress * (WAYPOINTS.length - 1);
      const index = Math.round(waypointProgress);
      const wp = WAYPOINTS[Math.min(index, WAYPOINTS.length - 1)];

      target.current = { x: wp.x, y: wp.y, scale: wp.scale, label: wp.label };
    };

    const tick = () => {
      const lerp = 0.08;
      current.current.x += (target.current.x - current.current.x) * lerp;
      current.current.y += (target.current.y - current.current.y) * lerp;
      current.current.scale += (target.current.scale - current.current.scale) * lerp;

      if (canvasRef.current) {
        canvasRef.current.style.transform = `translate(${current.current.x}px, ${current.current.y}px) scale(${current.current.scale})`;
      }
      if (labelRef.current && labelRef.current.textContent !== target.current.label) {
        labelRef.current.textContent = target.current.label;
      }

      rafId.current = requestAnimationFrame(tick);
    };

    const onScroll = () => computeTarget();

    computeTarget();
    window.addEventListener("scroll", onScroll, { passive: true });
    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative w-full"
      style={{ height: `${WAYPOINTS.length * SCROLL_PER_WAYPOINT_VH}vh` }}
    >
      <div
        className="sticky top-0 h-screen w-full overflow-hidden transition-colors duration-700"
        style={{ backgroundColor: "var(--theme-bg)" }}
      >
        {/* dot-grid backdrop, tinted by the accent color */}
        <div
          className="pointer-events-none absolute inset-0 opacity-30 transition-opacity duration-700"
          style={{
            backgroundImage:
              "radial-gradient(circle, var(--theme-accent) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div
          className="absolute left-8 top-8 z-20 font-mono text-xs uppercase tracking-widest transition-colors duration-700 sm:left-14 sm:top-10"
          style={{ color: "var(--theme-accent)" }}
        >
          <span ref={labelRef}>{WAYPOINTS[0].label}</span>
        </div>
        <div
          className="absolute bottom-8 left-8 z-20 text-sm transition-colors duration-700 sm:left-14 sm:bottom-10"
          style={{ color: "var(--theme-text)", opacity: 0.6 }}
        >
          Scroll to pan the canvas ↓
        </div>

        <div
          ref={canvasRef}
          className="absolute left-1/2 top-1/2 h-[1500px] w-[2700px] -translate-x-1/2 -translate-y-1/2"
          style={{ willChange: "transform" }}
        >
          {/* 01 / Selected Work */}
          <WindowCard
            className="left-[60px] top-[480px] rotate-2"
            title="what-i-do.txt"
            body={
              <p className="text-[13px] leading-snug text-[#4a463e]">
                I design and build AI agents, automations and custom systems
                that take manual, repetitive work off a business&apos;s plate —
                from voice/chat agents to full CRM pipelines.
              </p>
            }
            accent
          />
          <WindowCard
            className="left-[100px] top-[150px] -rotate-6"
            title="automations.log"
            project={findProject("automations")}
            onOpen={setSelectedId}
            body={
              <ul className="space-y-1 text-[13px] leading-snug text-[#4a463e]">
                <li>AI Voice &amp; Chat Agents — Vapi, Retell, OpenAI, Twilio</li>
                <li>GoHighLevel CRM, Funnels &amp; Pipeline Automation</li>
                <li>RAG WhatsApp Assistants &amp; Telegram Bots</li>
              </ul>
            }
          />
          <WindowCard
            className="left-[470px] top-[440px] rotate-3"
            title="leadgen.log"
            project={findProject("leadgen")}
            onOpen={setSelectedId}
            accent
            body={
              <ul className="space-y-1 text-[13px] leading-snug text-[#4a463e]">
                <li>Lead Research, Enrichment &amp; Cold Email Systems</li>
                <li>LinkedIn Automation &amp; Social Prospecting</li>
                <li>Property &amp; Web Scraping — n8n, Apify, Python</li>
              </ul>
            }
          />
          <WindowCard
            className="left-[880px] top-[180px] -rotate-3"
            title="products.log"
            project={findProject("products")}
            onOpen={setSelectedId}
            body={
              <ul className="space-y-1 text-[13px] leading-snug text-[#4a463e]">
                <li>WorkAmbitions — SaaS product</li>
                <li>Quick Photos — SaaS product</li>
                <li>Claude Code app for multi-account Google Workspace</li>
              </ul>
            }
          />

          {/* 02 / Who I am */}
          <WindowCard
            className="left-[1180px] top-[460px] rotate-2"
            title="identity.txt"
            accent
            body={
              <p className="text-[13px] leading-snug text-[#4a463e]">
                I&apos;m a Software Engineer and AI Automation Specialist who
                turns messy manual workflows into systems that run
                themselves.
              </p>
            }
          />
          <WindowCard
            className="left-[1450px] top-[180px] -rotate-6"
            title="identity-2.txt"
            body={
              <p className="text-[13px] leading-snug text-[#4a463e]">
                I&apos;m a Senior GoHighLevel Developer and AI SDR builder,
                shipping voice agents, chatbots and lead-gen pipelines with
                n8n, Vapi and OpenAI.
              </p>
            }
          />

          {/* 03 / Experience */}
          <WindowCard
            className="left-[1760px] top-[440px] rotate-3"
            title="experience.log"
            project={findProject("experience-freelance")}
            onOpen={setSelectedId}
            accent
            body={
              <div className="text-[13px] leading-snug text-[#4a463e]">
                <p className="font-semibold text-[#2d1b69]">
                  Freelance — Automation &amp; Software Engineer
                </p>
                <p>2024 — Present</p>
              </div>
            }
          />
          <WindowCard
            className="left-[2040px] top-[150px] -rotate-3"
            title="experience-2.log"
            project={findProject("experience-moshpit")}
            onOpen={setSelectedId}
            body={
              <div className="text-[13px] leading-snug text-[#4a463e]">
                <p className="font-semibold text-[#2d1b69]">
                  Moshpit Studios — Fullstack Developer
                </p>
                <p>2023 — 2024, MetaVerse product</p>
              </div>
            }
          />

          {/* 04 / Say hello */}
          <WindowCard
            className="left-[2360px] top-[420px] rotate-6"
            title="say-hello.eml"
            accent
            body={
              <div className="text-[13px] leading-snug text-[#4a463e]">
                <p>maryam@zamoog.com</p>
                <p className="mt-1 text-[#9b7fe0] underline">
                  linkedin.com/in/maryam-naveed-zamoog-n8n
                </p>
              </div>
            }
          />
        </div>
      </div>

      <AnimatePresence>
        {selectedId && (
          <ProjectDetail
            project={findProject(selectedId)}
            onClose={() => setSelectedId(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function WindowCard({
  className,
  title,
  body,
  accent,
  project,
  onOpen,
}: {
  className: string;
  title: string;
  body: React.ReactNode;
  accent?: boolean;
  project?: Project;
  onOpen?: (id: string) => void;
}) {
  const interactive = Boolean(project && onOpen);
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className={`absolute w-[300px] rounded-xl border border-black/5 bg-white p-4 shadow-[0_12px_30px_-8px_rgba(0,0,0,0.15)] ${className} ${
        interactive ? "cursor-pointer" : ""
      }`}
      whileHover={
        interactive
          ? {
              scale: 1.06,
              boxShadow:
                "0 20px 45px -10px rgba(0,0,0,0.25), 0 0 0 2px var(--theme-accent)",
            }
          : undefined
      }
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      onHoverStart={interactive ? () => setHovered(true) : undefined}
      onHoverEnd={interactive ? () => setHovered(false) : undefined}
      onClick={interactive ? () => onOpen!(project!.id) : undefined}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      onKeyDown={
        interactive
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") onOpen!(project!.id);
            }
          : undefined
      }
    >
      <div className="mb-3 flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ec6a5e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#f4bf4f]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#61c454]" />
        <span className="ml-2 truncate font-mono text-[11px] text-[#9a948a]">
          {title}
        </span>
      </div>
      <div
        className="rounded-md p-3 transition-colors duration-700"
        style={{
          backgroundColor: accent
            ? "color-mix(in srgb, var(--theme-accent) 15%, white)"
            : "#f4f1ea",
        }}
      >
        {body}
      </div>

      {interactive && (
        <motion.div
          className="mt-2 flex items-center justify-end text-[11px] font-medium text-[#9b7fe0]"
          initial={{ opacity: 0, y: 4 }}
          animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
          transition={{ duration: 0.18 }}
        >
          Explore Project ↗
        </motion.div>
      )}
    </motion.div>
  );
}
