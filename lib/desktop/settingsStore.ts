import { create } from "zustand";

/** Display and sound options the user can toggle from the menus. Sound mute lives in bootStore. */
interface SettingsState {
  flicker: boolean;
  ambient: boolean;
  shortcutsOpen: boolean;
  /** "room": monitor shown in the room (wide screens). "screen": the screen fills the window. */
  zoom: "room" | "screen";
  setZoom: (z: "room" | "screen") => void;
  toggleFlicker: () => void;
  toggleAmbient: () => void;
  setShortcutsOpen: (open: boolean) => void;
}

export const useSettings = create<SettingsState>((set) => ({
  flicker: true,
  ambient: false,
  shortcutsOpen: false,
  zoom: "room",
  setZoom: (zoom) => set({ zoom }),
  toggleFlicker: () => set((s) => ({ flicker: !s.flicker })),
  toggleAmbient: () => set((s) => ({ ambient: !s.ambient })),
  setShortcutsOpen: (shortcutsOpen) => set({ shortcutsOpen }),
}));
