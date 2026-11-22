/**
 * The single shared description of the central sphere. Scroll animations write to this
 * object (GSAP tweens it directly); the Three.js loop reads it every frame. Keeping it a
 * plain mutable object means no React re-renders while scrolling.
 */
export interface StoryState {
  /** 0 = ordered sphere, 1 = scattered and tangled */
  chaos: number;
  /** strength of the spherical wave motion */
  wave: number;
  /** voice moment: rings radiate outward */
  ripple: number;
  /** customer moment: points gather into groups */
  cluster: number;
  /** automation moment: bands flow around the sphere */
  flow: number;
  /** connection moment: meridian lines join the rings */
  link: number;
  /** share of points drawn in the accent green */
  accent: number;
  /** overall opacity (lowered where text needs to read clearly) */
  alpha: number;
  scale: number;
  /** horizontal position as a fraction of half the viewport width */
  xBase: number;
  xBias: number;
  /** vertical position as a fraction of half the viewport height */
  y: number;
  /** intro: 0 -> 1 */
  reveal: number;
}

export const HERO_STATE: StoryState = {
  chaos: 0, wave: 1, ripple: 0, cluster: 0, flow: 0, link: 0,
  accent: 0.15, alpha: 0.72, scale: 1, xBase: 0.42, xBias: 0, y: 0.04, reveal: 0,
};

export const story: StoryState = { ...HERO_STATE };

// The resting state of the sphere for each part of the story.
export const SCENES = {
  problemStart: { chaos: 0, wave: 1, accent: 0.15, alpha: 0.72, scale: 1, xBase: 0.42, y: 0.04 },
  problemEnd: { chaos: 1, wave: 0.15, accent: 0, alpha: 0.28, scale: 1.05, xBase: 0.3, y: 0 },
  shiftEnd: { chaos: 0, wave: 1, accent: 0.9, alpha: 0.5, scale: 0.98, xBase: 0.12, y: 0.12 },
  build: { chaos: 0, wave: 0.8, accent: 0.5, alpha: 0.3, scale: 0.9, xBase: 0, y: 0 },
  journey: { chaos: 0, wave: 0.6, accent: 0.7, alpha: 0.3, scale: 0.55, xBase: 0.5, y: 0.1 },
  result: { chaos: 0, wave: 0.5, accent: 1, alpha: 0.3, scale: 1.05, xBase: 0, y: 0 },
  contact: { chaos: 0, wave: 1, accent: 0.8, alpha: 0.35, scale: 0.95, xBase: 0, y: -0.75 },
} as const;

/**
 * Which step of the "How it works" journey is showing. While that section is pinned, scrolling
 * drives it (Story writes it); otherwise visitors drive it by clicking.
 */
let journeyStep = 0;
const journeyListeners = new Set<() => void>();
export const getJourneyStep = () => journeyStep;
export const setJourneyStep = (n: number) => {
  if (n === journeyStep) return;
  journeyStep = n;
  journeyListeners.forEach((l) => l());
};
export const subscribeJourney = (cb: () => void) => {
  journeyListeners.add(cb);
  return () => {
    journeyListeners.delete(cb);
  };
};
/** Set by Story when the journey section is pinned, so a click can scroll to a step. */
export const journeyControl = {
  pinned: false,
  scrollTo: (() => {}) as (step: number, smooth?: boolean) => void,
};

let dirty = true;
export const markDirty = () => {
  dirty = true;
};
export const consumeDirty = () => {
  const d = dirty;
  dirty = false;
  return d;
};
