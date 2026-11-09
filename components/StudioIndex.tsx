"use client";

import { useEffect, useState } from "react";

type Item = { id: string; label: string };

/* The short list of chapters that stays at the right of the Studio page. The
   chapter currently being read is set in italics. It only shows while the
   Studio is on screen, so on the home page it waits until the visitor has
   scrolled down past the wordmark. */
export default function StudioIndex({ items }: { items: Item[] }) {
  const [current, setCurrent] = useState(items[0].id);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const studio = document.getElementById("studio");
    if (!studio) return;
    const watch = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      {
        rootMargin: "-45% 0px -55% 0px",
      },
    );
    watch.observe(studio);
    return () => watch.disconnect();
  }, []);

  useEffect(() => {
    const watch = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setCurrent(e.target.id);
      },
      /* A chapter is current while it crosses a line just above mid-screen. */
      { rootMargin: "-45% 0px -55% 0px" },
    );
    for (const { id } of items) {
      const el = document.getElementById(id);
      if (el) watch.observe(el);
    }
    return () => watch.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="On this page"
      aria-hidden={!inView || undefined}
      inert={!inView}
      className={`studio-text fixed top-52 left-[86vw] hidden transition-opacity duration-700 lg:block ${
        inView ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <ul>
        {items.map((i) => (
          <li key={i.id}>
            <a
              href={`#${i.id}`}
              aria-current={current === i.id ? "true" : undefined}
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById(i.id)
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="studio-index-link block py-0.5"
            >
              {i.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
