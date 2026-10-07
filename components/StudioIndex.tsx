"use client";

import { useEffect, useState } from "react";

type Item = { id: string; label: string };

/* The short list of chapters that stays at the right of the Studio page. The
   chapter currently being read is set in italics. */
export default function StudioIndex({ items }: { items: Item[] }) {
  const [current, setCurrent] = useState(items[0].id);

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
      className="studio-text fixed top-52 left-[86vw] hidden lg:block"
    >
      <ul>
        {items.map((i) => (
          <li key={i.id}>
            <a
              href={`#${i.id}`}
              aria-current={current === i.id ? "true" : undefined}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(i.id)?.scrollIntoView({ behavior: "smooth" });
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
