"use client";

import { useEffect, useRef, type ReactNode } from "react";

/* Wraps the Studio page and brings each part in as it is scrolled to: photos
   fade in, and the headings and paragraphs of a passage arrive one after
   another (see "Studio motion" in globals.css). Without script, or with
   reduced motion, everything is simply there. */
export default function StudioMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    el.dataset.ready = "";
    const watch = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          (e.target as HTMLElement).dataset.seen = "";
          watch.unobserve(e.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    el.querySelectorAll("[data-reveal]").forEach((p) => watch.observe(p));
    return () => watch.disconnect();
  }, []);

  return <div ref={root}>{children}</div>;
}
