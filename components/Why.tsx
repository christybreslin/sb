"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { BlobFill, type BlobShape } from "./Blob";

const reasons: { shape: BlobShape; title: string; body: string }[] = [
  {
    shape: "pebble",
    title: "Two pillars, one team",
    body: "Social media strategy and content creation live under one roof, so nothing falls through the gap between them.",
  },
  {
    shape: "bell",
    title: "Complementary strengths",
    body: "Honor brings a strategic edge from launching her own business and leading in‑house marketing. Ellie brings creative depth from years shooting for leading brands.",
  },
  {
    shape: "tri",
    title: "Content with intent",
    body: "To gain real traction, content has to align with strategy: timed, placed, and delivered with intention to reach its full potential.",
  },
];

export default function Why() {
  return (
    <section id="why" className="relative bg-paper">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        {/* ── Intro ── */}
        <Reveal className="max-w-3xl">
          <p className="display-voice text-[0.62rem] tracking-[0.34em] text-sand sm:text-xs">
            Why us?
          </p>
          <h2 className="display-voice mt-4 text-[clamp(2.4rem,7vw,4.5rem)] text-rust">
            Where strategy
            <br />
            meets craft
          </h2>
          <p className="mt-5 max-w-[52ch] text-[1rem] leading-relaxed text-ink/75 sm:text-lg">
            The Studio Borne team is built on the same two pillars of marketing:
            social media strategy and content creation. Here&rsquo;s why that
            combination works.
          </p>
        </Reveal>

        {/* ── Three reasons ── */}
        <div className="mt-14 grid grid-cols-1 gap-5 sm:mt-20 sm:grid-cols-3">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              className="reveal"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.7,
                delay: 0.1 + i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="group h-full rounded-[2rem] bg-cream p-8 transition-transform duration-300 ease-out hover:-translate-y-1.5 sm:p-9">
                <div className="relative w-14 transition-transform duration-300 ease-out group-hover:scale-110">
                  <BlobFill shape={r.shape} className="h-auto w-full text-rust" />
                  <span className="display-voice absolute inset-0 flex items-center justify-center text-lg text-cream">
                    {i + 1}
                  </span>
                </div>
                <h3 className="display-voice mt-6 text-[clamp(1.3rem,3vw,1.7rem)] leading-tight text-rust">
                  {r.title}
                </h3>
                <p className="mt-3 text-[0.9rem] leading-relaxed text-ink/75 sm:text-[0.95rem]">
                  {r.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Closing statement ── */}
        <Reveal className="mx-auto mt-16 max-w-3xl text-center sm:mt-24">
          <p className="display-voice text-[clamp(1.5rem,4.5vw,2.6rem)] leading-[1.1] text-ink">
            Distinct strengths, one shared goal:{" "}
            <span className="text-rust">work that truly performs.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
