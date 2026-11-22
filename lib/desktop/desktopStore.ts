import { create } from "zustand";
import type { AppId } from "./apps";
import { useWindowStore } from "./windowStore";

export interface ContextTarget {
  x: number;
  y: number;
  app: AppId | null;
}

interface DesktopState {
  selected: AppId[];
  openMenu: string | null;
  context: ContextTarget | null;
  notice: { id: number; text: string } | null;
  /** Text to prefill in the Contact form; `n` changes on every request so the form remounts. */
  contactPrefill: { text: string; n: number };
  setContactPrefill: (text: string) => void;
  select: (id: AppId, additive?: boolean) => void;
  selectAll: () => void;
  clearSelection: () => void;
  launch: (id: AppId) => void;
  setMenu: (name: string | null) => void;
  openContext: (c: ContextTarget) => void;
  closeContext: () => void;
  closeAllMenus: () => void;
  say: (text: string) => void;
  resetDesktop: () => void;
}

let noticeId = 0;

export const useDesktopStore = create<DesktopState>((set) => ({
  selected: [],
  openMenu: null,
  context: null,
  notice: null,
  contactPrefill: { text: "", n: 0 },
  setContactPrefill: (text) => set((s) => ({ contactPrefill: { text, n: s.contactPrefill.n + 1 } })),
  select: (id, additive) =>
    set((s) => ({
      selected: additive ? (s.selected.includes(id) ? s.selected : [...s.selected, id]) : [id],
    })),
  selectAll: () => set({ selected: ["work", "about", "services", "journal", "contact", "cv"] }),
  clearSelection: () => set({ selected: [] }),
  launch: (id) => {
    set({ selected: [id] });
    useWindowStore.getState().open(id);
  },
  setMenu: (name) => set({ openMenu: name, context: null }),
  openContext: (c) => set({ context: c, openMenu: null }),
  closeContext: () => set({ context: null }),
  closeAllMenus: () => set({ openMenu: null, context: null }),
  say: (text) => set({ notice: { id: ++noticeId, text } }),
  resetDesktop: () => set({ selected: [], openMenu: null, context: null, notice: null, contactPrefill: { text: "", n: 0 } }),
}));
