import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";
const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

/** True when the visitor has asked for less motion. Server renders as false. */
export function useReducedMotion() {
  return useSyncExternalStore(
    subscribe,
    // `?reduce=1` is a development-only switch so this path can be tested (stripped from production).
    () => window.matchMedia(QUERY).matches || (process.env.NODE_ENV !== "production" && window.location.search.includes("reduce=1")),
    () => false,
  );
}
