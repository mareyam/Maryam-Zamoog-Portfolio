"use client";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { JOURNEY, SECTIONS } from "./content";
import { HERO_STATE, SCENES, journeyControl, markDirty, setJourneyStep, story, type StoryState } from "./story-state";
import { useReducedMotion } from "./useReducedMotion";

const SphereCanvas = dynamic(() => import("./SphereCanvas"), { ssr: false });

const $ = (s: string, root: ParentNode = document) => root.querySelector<HTMLElement>(s);
const $$ = (s: string, root: ParentNode = document) => gsap.utils.toArray<HTMLElement>(s, root);
const upd = { onUpdate: markDirty };

type Scene = Partial<StoryState>;

/**
 * Writes the sphere state for one scroll segment from its scroll progress. Segments never
 * overlap and only the one in range writes, so (unlike several competing tweens) the page
 * always shows one coherent state, whatever order or speed the visitor scrolls in.
 */
const blend = (from: Scene, to: Scene, ease: (t: number) => number = (t) => t) => (self: ScrollTrigger) => {
  const e = ease(self.progress);
  (Object.keys(to) as (keyof StoryState)[]).forEach((k) => {
    const a = from[k] as number;
    story[k] = a + ((to[k] as number) - a) * e;
  });
  markDirty();
};
/** On refresh, only segments the visitor has already entered may write (not ones still ahead). */
const ifEntered = (f: (self: ScrollTrigger) => void) => (self: ScrollTrigger) => {
  if (self.progress > 0) f(self);
};
const inOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

/** Wires the whole page to the sphere. Sections are plain markup; this file is the director. */
function direct(reduce: boolean) {
  journeyControl.pinned = false;
  setJourneyStep(0);

  // ---- progress bar + section counter (shown in both modes) ----
  gsap.to(".zm-progress", {
    scaleX: 1,
    ease: "none",
    scrollTrigger: { trigger: document.documentElement, start: "top top", end: "bottom bottom", scrub: 0.3 },
  });
  const ids = ["hero", "problem", "shift", "build", "journey", "result", "contact"];
  ids.forEach((id, i) =>
    ScrollTrigger.create({
      trigger: `#${id}`,
      start: "top 55%",
      end: "bottom 55%",
      onToggle: (s) => {
        if (!s.isActive) return;
        const n = $("[data-counter]");
        const l = $("[data-counter-label]");
        if (n) n.textContent = String(i + 1).padStart(2, "0");
        if (l) l.textContent = SECTIONS[i];
      },
    }),
  );

  // ---- services: each one gives the sphere a different "moment" (all modes) ----
  const service = (k: number) => {
    const to = { ripple: +(k === 0), cluster: +(k === 1), flow: +(k === 2), link: +(k === 3), xBias: k < 0 ? 0 : k % 2 ? 0.34 : -0.34 };
    if (reduce) {
      Object.assign(story, to);
      markDirty();
    } else {
      gsap.to(story, { ...to, duration: 1.4, ease: "power2.inOut", overwrite: "auto", ...upd });
    }
  };
  $$("[data-service]").forEach((el, i) =>
    ScrollTrigger.create({ trigger: el, start: "top 60%", end: "bottom 60%", onToggle: (s) => s.isActive && service(i) }),
  );
  ScrollTrigger.create({ trigger: "#build", start: "top 80%", end: "bottom 30%", onToggle: (s) => !s.isActive && service(-1) });

  if (reduce) {
    // Reduced motion: no pinning or scrubbing. The sphere simply takes each section's resting
    // shape as that section comes into view, and all text is shown immediately.
    story.reveal = 1;
    markDirty();
    gsap.set(".zm-wi", { y: 0, yPercent: 0 });
    gsap.set("[data-rv], [data-pin]", { autoAlpha: 1, y: 0 });
    const stamp = (s: Scene) => () => {
      Object.assign(story, s);
      markDirty();
    };
    ScrollTrigger.create({ trigger: "#hero", start: "top 60%", end: "bottom 60%", onEnter: stamp({ ...HERO_STATE, reveal: 1 }), onEnterBack: stamp({ ...HERO_STATE, reveal: 1 }) });
    (
      [
        ["#problem", SCENES.problemEnd],
        ["#shift", SCENES.shiftEnd],
        ["#build", SCENES.build],
        ["#journey", SCENES.journey],
        ["#result", SCENES.result],
        ["#contact", SCENES.contact],
      ] as const
    ).forEach(([sel, st]) => ScrollTrigger.create({ trigger: sel, start: "top 60%", onEnter: stamp(st), onEnterBack: stamp(st) }));
    return;
  }

  // The CSS hides words with translateY(112%). Tell GSAP that explicitly (as a percentage, with
  // no pixel offset) so animating yPercent back to 0 fully reveals them.
  gsap.set(".zm-wi", { y: 0, yPercent: 112 });

  // ---- hero entrance ----
  const intro = gsap.timeline({ delay: 0.2 });
  intro
    .to(story, { reveal: 1, duration: 2.8, ease: "power2.out", ...upd }, 0)
    .fromTo("#hero .zm-wi", { yPercent: 112 }, { yPercent: 0, duration: 1.3, ease: "power4.out", stagger: 0.07 }, 0.35)
    .fromTo("#hero [data-rv]", { y: 26, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1, ease: "power3.out", stagger: 0.12 }, 0.9);

  // ---- text reveals everywhere else ----
  $$("[data-words]").forEach((h) => {
    if (h.closest("#hero")) return;
    gsap.fromTo($$(".zm-wi", h), { yPercent: 112 }, { yPercent: 0, duration: 1.1, ease: "power4.out", stagger: 0.05, scrollTrigger: { trigger: h, start: "top 88%", once: true } });
  });
  $$("[data-rv]").forEach((el) => {
    if (el.closest("#hero")) return;
    gsap.fromTo(el, { y: 26, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%", once: true } });
  });

  // ---- 2. the problem: pinned. Scrolling makes the sphere fragment and tangle ----
  const items = $$("#problem [data-pin]");
  const problem = blend(SCENES.problemStart, SCENES.problemEnd);
  const tlP = gsap.timeline({
    scrollTrigger: {
      trigger: "#problem", start: "top top", end: "+=230%", pin: "#problem .zm-pin", scrub: 0.8, anticipatePin: 1, refreshPriority: 10,
      onUpdate: problem, onRefresh: ifEntered(problem),
    },
  });
  items.forEach((el, i) => {
    tlP.fromTo(el, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out", immediateRender: false }, i + 0.4);
    // Earlier items step back by turning grey, not by fading, so the sphere never shows through them.
    if (i > 0) tlP.fromTo(items[i - 1], { color: "#151515" }, { color: "#5a5a5a", duration: 0.6, immediateRender: false }, i + 0.4);
  });
  tlP.set({}, {}, items.length + 1); // pad the timeline so the last item has room

  // ---- 3. the shift: pinned. The tangle reconnects into one flowing sphere ----
  const shift = blend(SCENES.problemEnd, SCENES.shiftEnd, inOut);
  const tlS = gsap.timeline({
    scrollTrigger: {
      trigger: "#shift", start: "top top", end: "+=190%", pin: "#shift .zm-pin", scrub: 0.8, anticipatePin: 1, refreshPriority: 9,
      onUpdate: shift, onRefresh: ifEntered(shift),
    },
  });
  tlS.fromTo("#shift [data-pin]", { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 1, immediateRender: false }, 2);
  tlS.set({}, {}, 3);

  // ---- 5. how it works: pinned. Scrolling steps through the customer journey ----
  // Needs a reasonably tall screen to fit on one screen height; otherwise steps are click-driven.
  const jPin = $("#journey .zm-jpin");
  if (jPin && window.matchMedia("(min-height: 640px)").matches) {
    const n = JOURNEY.length;
    const stepAt = (p: number) => Math.min(n - 1, Math.floor(p * n));
    const st = ScrollTrigger.create({
      trigger: "#journey", start: "top top", end: `+=${n * 60}%`, pin: jPin, anticipatePin: 1, refreshPriority: 8,
      onUpdate: (s) => setJourneyStep(stepAt(s.progress)),
      onRefresh: (s) => setJourneyStep(stepAt(s.progress)),
    });
    journeyControl.pinned = true;
    journeyControl.scrollTo = (i, smooth) =>
      window.scrollTo({ top: st.start + ((i + 0.5) / n) * (st.end - st.start), behavior: smooth ? "smooth" : "auto" });
  }

  // ---- 4-7. the sphere settles into each remaining section ----
  const glide = (trigger: string, from: Scene, to: Scene) => {
    const f = blend(from, to);
    ScrollTrigger.create({ trigger, start: "top bottom", end: "top 25%", onUpdate: f, onRefresh: ifEntered(f) });
  };
  glide("#build", SCENES.shiftEnd, SCENES.build);
  glide("#journey", SCENES.build, SCENES.journey);
  glide("#result", SCENES.journey, SCENES.result);
  glide("#contact", SCENES.result, SCENES.contact);
}

export default function Story() {
  const reduce = useReducedMotion();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    // Development only (removed from production builds): lets automated tests run GSAP in real
    // time even when the browser delivers very few animation frames.
    if (process.env.NODE_ENV !== "production") Object.assign(window, { __gsap: gsap, __story: story, __ST: ScrollTrigger });
    Object.assign(story, HERO_STATE);
    markDirty();
    const ctx = gsap.context(() => direct(reduce));
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);
    return () => {
      window.removeEventListener("load", refresh);
      journeyControl.pinned = false;
      ctx.revert();
      Object.assign(story, HERO_STATE);
    };
  }, [reduce]);

  return <SphereCanvas reduce={reduce} />;
}
