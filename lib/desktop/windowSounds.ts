import { sfx } from "./sound";
import { useWindowStore } from "./windowStore";

/**
 * Plays window sounds by watching the store, so every path (title bar, taskbar,
 * menus, keyboard) sounds the same without each caller remembering to.
 */
export function startWindowSounds() {
  return useWindowStore.subscribe((s, prev) => {
    const cur = s.windows;
    const old = prev.windows;
    const curIds = Object.keys(cur) as (keyof typeof cur)[];
    const oldIds = Object.keys(old) as (keyof typeof old)[];
    // Shut down closes everything at once: stay quiet (the shutdown jingle plays instead).
    if (curIds.length === 0 && oldIds.length > 1) return;
    for (const id of curIds) {
      const a = cur[id]!;
      const b = old[id];
      if (!b) sfx.windowOpen();
      else if (a.minimized !== b.minimized) (a.minimized ? sfx.minimize : sfx.restore)();
      else if (a.maximized !== b.maximized) sfx.maximize();
    }
    for (const id of oldIds) if (!cur[id]) sfx.windowClose();
  });
}
