import { create } from "zustand";

export type BootPhase = "off" | "booting" | "done";

interface BootState {
  phase: BootPhase;
  muted: boolean;
  /** Only the first call (from "off") has any effect, so repeat triggers are ignored. */
  start: () => boolean;
  finish: () => void;
  /** Shut down: return to the powered-off boot state. */
  reset: () => void;
  toggleMute: () => void;
}

// Boot state lives apart from any future desktop state.
export const useBootStore = create<BootState>((set, get) => ({
  phase: "off",
  muted: false,
  start: () => {
    if (get().phase !== "off") return false;
    set({ phase: "booting" });
    return true;
  },
  finish: () => {
    if (get().phase === "booting") set({ phase: "done" });
  },
  reset: () => set({ phase: "off" }),
  toggleMute: () => set((s) => ({ muted: !s.muted })),
}));
