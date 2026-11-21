import { create } from "zustand";
import type { AppId } from "./apps";

export interface Rect { x: number; y: number; w: number; h: number }
export interface WinState {
  id: AppId;
  rect: Rect;
  z: number;
  minimized: boolean;
  maximized: boolean;
  /** Rect to return to when un-maximizing. */
  restore: Rect | null;
}

export const MIN_W = 280;
export const MIN_H = 180;
/** Below this desktop width windows are always full-area (phones). */
export const COMPACT_W = 640;

type Area = { w: number; h: number };

function clamp(r: Rect, a: Area): Rect {
  const w = Math.min(Math.max(r.w, MIN_W), Math.max(a.w, 1));
  const h = Math.min(Math.max(r.h, MIN_H), Math.max(a.h, 1));
  return { w, h, x: Math.min(Math.max(r.x, 0), Math.max(a.w - w, 0)), y: Math.min(Math.max(r.y, 0), Math.max(a.h - h, 0)) };
}

interface WindowState {
  area: Area;
  windows: Partial<Record<AppId, WinState>>;
  activeId: AppId | null;
  zTop: number;
  lastRects: Partial<Record<AppId, Rect>>;
  setArea: (a: Area) => void;
  open: (id: AppId) => void;
  close: (id: AppId) => void;
  minimize: (id: AppId) => void;
  toggleMaximize: (id: AppId) => void;
  focus: (id: AppId) => void;
  move: (id: AppId, x: number, y: number) => void;
  setRect: (id: AppId, r: Rect) => void;
  /** Taskbar behaviour: open -> restore -> focus -> minimize. */
  taskbarToggle: (id: AppId) => void;
  /** Raise the bottom-most visible window (cycles through them). */
  cycleNext: () => void;
  reset: () => void;
}

function topVisible(windows: WindowState["windows"], skip?: AppId): AppId | null {
  const list = Object.values(windows).filter((w): w is WinState => !!w && !w.minimized && w.id !== skip);
  return list.sort((a, b) => b.z - a.z)[0]?.id ?? null;
}

export const useWindowStore = create<WindowState>((set, get) => ({
  area: { w: 800, h: 600 },
  windows: {},
  activeId: null,
  zTop: 1,
  lastRects: {},

  setArea: (area) =>
    set((s) => {
      // On phones windows render full-screen, so leave their stored sizes alone; otherwise a
      // portrait visit would permanently shrink them for landscape or tablet widths.
      if (area.w < COMPACT_W) return { area };
      const windows = { ...s.windows };
      for (const w of Object.values(windows)) {
        if (w) windows[w.id] = { ...w, rect: clamp(w.rect, area), restore: w.restore && clamp(w.restore, area) };
      }
      return { area, windows };
    }),

  open: (id) => {
    const s = get();
    const existing = s.windows[id];
    const z = s.zTop + 1;
    if (existing) {
      set({ windows: { ...s.windows, [id]: { ...existing, minimized: false, z } }, activeId: id, zTop: z });
      return;
    }
    const n = Object.keys(s.windows).length;
    // While compact the real desktop size is unknown, so size for a typical one.
    const compact = s.area.w < COMPACT_W;
    const aw = compact ? 760 : s.area.w;
    const ah = compact ? 600 : s.area.h;
    const base: Rect = {
      w: Math.min(aw - 40, 640),
      h: Math.min(ah - 40, Math.max(460, Math.round(ah * 0.62))),
      x: 24 + (n % 6) * 28,
      y: 16 + (n % 6) * 28,
    };
    // Windows open full-screen by default; the restore button returns them to this floating rect.
    const rect = compact ? (s.lastRects[id] ?? base) : clamp(s.lastRects[id] ?? base, s.area);
    set({
      windows: { ...s.windows, [id]: { id, rect, z, minimized: false, maximized: true, restore: rect } },
      activeId: id,
      zTop: z,
    });
  },

  close: (id) =>
    set((s) => {
      const w = s.windows[id];
      if (!w) return s;
      const windows = { ...s.windows };
      delete windows[id];
      return {
        windows,
        lastRects: { ...s.lastRects, [id]: w.restore ?? w.rect },
        activeId: s.activeId === id ? topVisible(windows) : s.activeId,
      };
    }),

  minimize: (id) =>
    set((s) => {
      const w = s.windows[id];
      if (!w) return s;
      const windows = { ...s.windows, [id]: { ...w, minimized: true } };
      return { windows, activeId: s.activeId === id ? topVisible(windows, id) : s.activeId };
    }),

  toggleMaximize: (id) =>
    set((s) => {
      const w = s.windows[id];
      if (!w) return s;
      const z = s.zTop + 1;
      const next: WinState = w.maximized
        ? { ...w, maximized: false, rect: clamp(w.restore ?? w.rect, s.area), restore: null, z }
        : { ...w, maximized: true, restore: w.rect, z };
      return { windows: { ...s.windows, [id]: next }, activeId: id, zTop: z };
    }),

  focus: (id) =>
    set((s) => {
      const w = s.windows[id];
      if (!w || (s.activeId === id && !w.minimized)) return s;
      const z = s.zTop + 1;
      return { windows: { ...s.windows, [id]: { ...w, z, minimized: false } }, activeId: id, zTop: z };
    }),

  move: (id, x, y) =>
    set((s) => {
      const w = s.windows[id];
      if (!w || w.maximized) return s;
      return { windows: { ...s.windows, [id]: { ...w, rect: clamp({ ...w.rect, x, y }, s.area) } } };
    }),

  setRect: (id, r) =>
    set((s) => {
      const w = s.windows[id];
      if (!w || w.maximized) return s;
      return { windows: { ...s.windows, [id]: { ...w, rect: clamp(r, s.area) } } };
    }),

  taskbarToggle: (id) => {
    const s = get();
    const w = s.windows[id];
    if (!w) return get().open(id);
    if (w.minimized || s.activeId !== id) return get().focus(id);
    get().minimize(id);
  },

  cycleNext: () => {
    const vis = Object.values(get().windows)
      .filter((w): w is WinState => !!w && !w.minimized)
      .sort((a, b) => a.z - b.z);
    if (vis.length > 1) get().focus(vis[0].id);
  },

  reset: () => set({ windows: {}, activeId: null, zTop: 1, lastRects: {} }),
}));
