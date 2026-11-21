import { APPS } from "@/lib/desktop/apps";
import { useBootStore } from "@/lib/desktop/bootStore";
import { useDesktopStore } from "@/lib/desktop/desktopStore";
import { useSettings } from "@/lib/desktop/settingsStore";
import { setMuted, sfx } from "@/lib/desktop/sound";
import { useWindowStore } from "@/lib/desktop/windowStore";
import type { MenuEntry } from "./RetroMenu";

export function toggleSound() {
  const b = useBootStore.getState();
  b.toggleMute();
  setMuted(!b.muted);
  useDesktopStore.getState().say(b.muted ? "Sound on." : "Sound off.");
}

export function toggleAmbient() {
  const st = useSettings.getState();
  st.toggleAmbient();
  useDesktopStore.getState().say(st.ambient ? "Ambient hum off." : "Ambient hum on.");
}

export function toggleFlicker() {
  const st = useSettings.getState();
  st.toggleFlicker();
  useDesktopStore.getState().say(st.flicker ? "Screen flicker off." : "Screen flicker on.");
}

export function shutDown() {
  sfx.shutdown();
  useWindowStore.getState().reset();
  useDesktopStore.getState().resetDesktop();
  useBootStore.getState().reset();
}

const about = () =>
  useDesktopStore.getState().say("NOSTALGIA OS 1.0 - 640K RAM - AMBER PHOSPHOR DISPLAY");

export function openItems(): MenuEntry[] {
  const d = useDesktopStore.getState();
  return APPS.map((a) => ({ label: `Open ${a.label}`, onSelect: () => d.launch(a.id) }));
}

export function buildMenus(muted: boolean): Record<string, MenuEntry[]> {
  const d = useDesktopStore.getState();
  return {
    File: [...openItems(), "sep", { label: "Shut Down", onSelect: shutDown }],
    View: [
      { label: "Select All", onSelect: d.selectAll, hint: "Ctrl+A" },
      { label: "Deselect", onSelect: d.clearSelection, hint: "Esc" },
      "sep",
      { label: `Screen Flicker: ${useSettings.getState().flicker ? "On" : "Off"}`, onSelect: toggleFlicker },
    ],
    Sound: [
      { label: muted ? "Turn Sound On" : "Turn Sound Off", onSelect: toggleSound },
      { label: `Ambient Hum: ${useSettings.getState().ambient ? "On" : "Off"}`, onSelect: toggleAmbient },
    ],
  };
}

export function buildContext(app: string | null, muted: boolean): MenuEntry[] {
  const d = useDesktopStore.getState();
  if (app) {
    const a = APPS.find((x) => x.id === app)!;
    return [{ label: `Open ${a.label}`, onSelect: () => d.launch(a.id) }, { label: "Select", onSelect: () => d.select(a.id) }];
  }
  return [
    { label: "Select All Icons", onSelect: d.selectAll },
    { label: muted ? "Turn Sound On" : "Turn Sound Off", onSelect: toggleSound },
    { label: "About This Computer", onSelect: about },
    "sep",
    { label: "Shut Down", onSelect: shutDown },
  ];
}
