"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/studio", label: "The studio" },
  { href: "/feed", label: "The Feed" },
  { href: "/contact", label: "Say hello" },
];

/* How long the home page stays bare before the nav can be summoned, so the
   wordmark always gets its moment alone even if the mouse is already moving. */
const QUIET_MS = 1600;

export default function Nav() {
  const pathname = usePathname();
  const home = pathname === "/";
  const [revealed, setRevealed] = useState(false);
  const [open, setOpen] = useState(false);

  /* On the home page the nav drops in on the visitor's first movement. */
  useEffect(() => {
    if (!home || revealed) return;
    const events = ["pointermove", "pointerdown", "keydown", "touchstart"];
    const reveal = () => setRevealed(true);
    const arm = setTimeout(() => {
      events.forEach((e) => window.addEventListener(e, reveal, { once: true, passive: true }));
    }, QUIET_MS);
    return () => {
      clearTimeout(arm);
      events.forEach((e) => window.removeEventListener(e, reveal));
    };
  }, [home, revealed]);

  const shown = !home || revealed;
  /* The home page already has the big wordmark; elsewhere a small one leads home. */
  const docked = !home;

  return (
    <header
      data-shown={shown}
      className="site-nav fixed inset-x-0 top-0 z-50 bg-cream text-red"
    >
      <nav
        aria-label="Main"
        className="grid h-16 grid-cols-[1fr_auto] items-center px-(--gutter) md:grid-cols-[1fr_auto_1fr]"
      >
        <Link
          href="/"
          aria-label="Studio Borne, home"
          tabIndex={docked ? 0 : -1}
          className={`justify-self-start transition-opacity duration-500 ${
            docked ? "wordmark-link opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <Image
            src="/wordmark.png"
            alt=""
            width={2025}
            height={569}
            className="h-7 w-auto"
          />
        </Link>

        <ul className="hidden items-center gap-8 md:flex lg:gap-12">
          {tabs.map((t) => (
            <li key={t.href}>
              <Link
                href={t.href}
                aria-current={pathname === t.href ? "page" : undefined}
                className="label link-draw py-2 [--draw-gap:0.2rem]"
              >
                <span className="roll">
                  <span data-text={t.label}>{t.label}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="label justify-self-end py-2 md:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      {open && (
        <ul
          id="mobile-menu"
          className="flex h-[calc(100svh-4rem)] flex-col justify-center gap-2 bg-cream px-(--gutter) pb-16 md:hidden"
        >
          {tabs.map((t) => (
            <li key={t.href}>
              <Link
                href={t.href}
                onClick={() => setOpen(false)}
                aria-current={pathname === t.href ? "page" : undefined}
                className="block py-1 text-5xl font-medium tracking-tight aria-[current=page]:underline"
              >
                {t.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
