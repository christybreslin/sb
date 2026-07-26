"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { BlobFill } from "./Blob";

const tabs = [
  { href: "/who", label: "Who" },
  { href: "/what", label: "What" },
  { href: "/why", label: "Why" },
  { href: "/feed", label: "The Feed" },
];

export default function Nav() {
  const pathname = usePathname();
  const home = pathname === "/";
  const [open, setOpen] = useState(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 ${
        home ? "" : "bg-paper/90 shadow-[0_1px_0_0_rgba(51,38,27,0.08)] backdrop-blur-md"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-8">
        <Link href="/" className="transition-opacity hover:opacity-80">
          <Image
            src="/logo.png"
            alt="Studio Borne: content creation & social media strategy"
            width={1391}
            height={1400}
            priority
            className="h-14 w-auto sm:h-[4.25rem]"
          />
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {tabs.map((t) => {
            const active = pathname === t.href;
            return (
              <Link
                key={t.href}
                href={t.href}
                className={`relative flex flex-col items-center gap-1 text-[0.7rem] font-bold tracking-[0.22em] uppercase transition-colors ${
                  home
                    ? "text-cream drop-shadow-[0_1px_2px_rgba(51,38,27,0.45)] hover:text-sand"
                    : active
                      ? "text-rust"
                      : "text-ink/70 hover:text-rust"
                }`}
              >
                {t.label}
                {active && (
                  <motion.span layoutId="tab-dot" className="absolute -bottom-2.5">
                    <BlobFill shape="tri" className="h-2 w-2 text-rust" />
                  </motion.span>
                )}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="display-voice rounded-full bg-rust px-5 py-2.5 text-[0.68rem] tracking-[0.16em] text-cream transition-colors hover:bg-rust-deep"
          >
            Say hello
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span
            className={`h-0.5 w-6 transition-transform ${home ? "bg-cream" : "bg-ink"} ${open ? "translate-y-1 rotate-45" : ""}`}
          />
          <span
            className={`h-0.5 w-6 transition-transform ${home ? "bg-cream" : "bg-ink"} ${open ? "-translate-y-1 -rotate-45" : ""}`}
          />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-ink/10 bg-paper md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {tabs.map((t) => (
                <Link
                  key={t.href}
                  href={t.href}
                  onClick={() => setOpen(false)}
                  className={`display-voice py-2 text-lg ${
                    pathname === t.href ? "text-rust" : "text-ink"
                  }`}
                >
                  {t.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="display-voice mt-2 self-start rounded-full bg-rust px-5 py-2.5 text-xs tracking-[0.16em] text-cream"
              >
                Say hello
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
