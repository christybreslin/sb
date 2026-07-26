"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { BlobFill, BlobOutline } from "./Blob";

/* The two founders map onto the two pillars: Ellie → content, Honor → strategy. */
const founders = [
  {
    initial: "E",
    name: "Ellie",
    shape: "pebble" as const,
    pillar: "Content creation",
    body: "Photographer and videographer for top brands, crafting standout visual content that captures attention and tells a story.",
  },
  {
    initial: "H",
    name: "Honor",
    shape: "tri" as const,
    pillar: "Social media management",
    body: "Launched her own business, then led social media and campaign marketing at an international brand. Building a strong media presence is her home turf.",
  },
];

export default function Who() {
  return (
    <section id="who" className="relative bg-paper">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        {/* ── Intro ── */}
        <Reveal className="max-w-3xl">
          <p className="display-voice text-[0.62rem] tracking-[0.34em] text-sand sm:text-xs">
            Who we are
          </p>
          <h2 className="display-voice mt-4 text-[clamp(2.4rem,7vw,4.5rem)] text-rust">
            Content and strategy,
            <br />
            under one roof
          </h2>
          <p className="mt-5 max-w-[52ch] text-[1rem] leading-relaxed text-ink/75 sm:text-lg">
            Studio Borne is a London‑based social media strategy and content
            creation agency. We make fresh content, uniquely tailored to your
            brand and designed to show off your product or service the way it
            truly deserves.
          </p>
        </Reveal>

        {/* ── The founders, one per pillar ── */}
        <div className="mt-16 sm:mt-24">
          <Reveal>
            <p className="display-voice text-[0.6rem] tracking-[0.34em] text-sand sm:text-xs">
              The founders
            </p>
            <h3 className="display-voice mt-2 text-[clamp(1.8rem,5vw,3rem)] text-rust">
              Two people behind the two pillars
            </h3>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {founders.map((f, i) => (
              <motion.div
                key={f.name}
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
                <div className="group h-full rounded-[2rem] bg-cream p-8 transition-transform duration-300 ease-out hover:-translate-y-1.5 sm:p-10">
                  {/* blob avatar with initial */}
                  <div className="relative w-16 transition-transform duration-300 ease-out group-hover:scale-110 sm:w-20">
                    <BlobFill shape={f.shape} className="h-auto w-full text-rust" />
                    <span className="display-voice absolute inset-0 flex items-center justify-center text-xl text-cream sm:text-2xl">
                      {f.initial}
                    </span>
                  </div>

                  <h4 className="display-voice mt-6 text-[clamp(1.6rem,4vw,2.2rem)] text-rust">
                    {f.name}
                  </h4>
                  <p className="display-voice mt-1 text-[0.58rem] tracking-[0.28em] text-sand sm:text-[0.66rem]">
                    {f.pillar}
                  </p>
                  <p className="mt-4 max-w-[42ch] text-[0.9rem] leading-relaxed text-ink/75 sm:text-[0.98rem]">
                    {f.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Philosophy: ties back to the intersection ── */}
        <div className="relative mt-20 sm:mt-28">
          <BlobOutline
            shape="pebble"
            className="pointer-events-none absolute -top-16 left-1/2 h-72 w-72 -translate-x-1/2 text-sand/40"
          />
          <Reveal className="relative mx-auto max-w-3xl text-center">
            <p className="display-voice text-[clamp(1.5rem,4.5vw,2.6rem)] leading-[1.1] text-ink">
              Great content isn&rsquo;t enough on its own. Neither is a strong
              social strategy.{" "}
              <span className="text-rust">
                Success lives in the intersection of both.
              </span>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
