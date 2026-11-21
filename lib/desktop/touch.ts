/** Shared by the long-press context menu and icon taps. */
export const touch = {
  /** After a long press opens a menu, swallow the click that the finger-lift generates. */
  swallowClickUntil: 0,
};

/**
 * Shifts a popup so it stays fully inside the desktop (used for dropdowns and the context
 * menu on narrow screens). Safe to call repeatedly: it resets its own offset first.
 */
export function keepInside(el: HTMLElement | null) {
  if (!el) return;
  const root = el.closest("[data-desktop]");
  if (!root) return;
  el.style.translate = "0 0";
  const r = root.getBoundingClientRect();
  const b = el.getBoundingClientRect();
  const pad = 4;
  let dx = 0;
  let dy = 0;
  if (b.right > r.right - pad) dx = r.right - pad - b.right;
  if (b.left + dx < r.left + pad) dx = r.left + pad - b.left;
  if (b.bottom > r.bottom - pad) dy = r.bottom - pad - b.bottom;
  if (b.top + dy < r.top + pad) dy = r.top + pad - b.top;
  el.style.translate = dx || dy ? `${dx}px ${dy}px` : "0 0";
}
