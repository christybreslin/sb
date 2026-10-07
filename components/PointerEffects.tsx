"use client";

import { useEffect } from "react";

/* Anything marked data-magnet leans a little towards the pointer while the
   pointer is over it, and eases back when it leaves. The attribute's value is
   how strongly (a fraction of the pointer's distance from the centre). */
export default function PointerEffects() {
  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.matchMedia("(hover: hover)").matches
    )
      return;

    let held: HTMLElement | null = null;
    const release = () => {
      held?.style.removeProperty("--mx");
      held?.style.removeProperty("--my");
      held = null;
    };
    const onMove = (e: PointerEvent) => {
      const el = (e.target as Element).closest?.<HTMLElement>("[data-magnet]") ?? null;
      if (el !== held) release();
      if (!el) return;
      held = el;
      const box = el.getBoundingClientRect();
      const pull = Number(el.dataset.magnet) || 0.04;
      el.style.setProperty("--mx", `${((e.clientX - box.left - box.width / 2) * pull).toFixed(1)}px`);
      el.style.setProperty("--my", `${((e.clientY - box.top - box.height / 2) * pull).toFixed(1)}px`);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", release);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", release);
      release();
    };
  }, []);

  return null;
}
