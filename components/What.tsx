"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";

const pillars = [
  {
    bg: "bg-rust",
    round: "rounded-t-[2.5rem] sm:rounded-t-none sm:rounded-l-[2.5rem]",
    title: "Content creation",
    body: "Compelling, on‑brand content and a versatile library we continuously draw from, repurpose and optimise.",
  },
  {
    bg: "bg-rust-deep",
    round: "rounded-b-[2.5rem] sm:rounded-b-none sm:rounded-r-[2.5rem]",
    title: "Social media management",
    body: "Beyond just posting: strategic scheduling and audience‑first content, timed for maximum impact.",
  },
];

const services = [
  "Competitor and audience analysis",
  "Content guidance and creative direction",
  "Social media planning and scheduling",
  "Marketing support and fresh campaign concepts",
  "Performance tracking through key KPIs",
  "Ongoing content optimisation based on results",
  "Meta ad management",
];

export default function What() {
  return (
    <section id="what" className="relative bg-paper">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        {/* ── Intro ── */}
        <Reveal className="max-w-3xl">
          <p className="display-voice text-[0.62rem] tracking-[0.34em] text-sand sm:text-xs">
            What we do
          </p>
          <h2 className="display-voice mt-4 text-[clamp(2.4rem,7vw,4.5rem)] text-rust">
            Two core pillars
          </h2>
          <p className="mt-5 max-w-[52ch] text-[1rem] leading-relaxed text-ink/75 sm:text-lg">
            Great content and a sharp social strategy each fall flat on their
            own. Studio Borne lives at the intersection, and everything we do
            stands on these two.
          </p>
        </Reveal>

        {/* ── The two pillars as two halves of one form, meeting in the middle ── */}
        <div className="mt-12 grid grid-cols-1 items-stretch gap-2 sm:mt-16 sm:grid-cols-2">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              className="reveal flex"
              initial={{ opacity: 0, x: i === 0 ? -48 : 48 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className={`group relative flex h-full min-h-[15rem] w-full flex-col overflow-hidden p-8 text-cream transition-transform duration-300 ease-out hover:-translate-y-1.5 sm:min-h-[22rem] sm:p-10 cursor-cream ${p.bg} ${p.round}`}
              >
                {/* oversized ghost numeral, drifts on hover */}
                <span
                  aria-hidden="true"
                  className="display-voice pointer-events-none absolute -top-6 right-2 select-none text-[8rem] leading-none text-cream/10 transition-transform duration-500 ease-out group-hover:-translate-y-2 group-hover:scale-110 sm:text-[12rem]"
                >
                  {i + 1}
                </span>
                <span className="display-voice relative text-[0.62rem] tracking-[0.34em] text-cream/60 sm:text-xs">
                  Pillar {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="display-voice relative mt-auto text-[clamp(1.7rem,4.5vw,2.8rem)] text-cream">
                  {p.title}
                </h3>
                <span
                  className="relative mt-5 h-px w-10 bg-cream/40 transition-all duration-300 ease-out group-hover:w-16"
                  aria-hidden="true"
                />
                <p className="relative mt-5 max-w-[36ch] text-[0.9rem] leading-relaxed text-cream/85 sm:text-[0.98rem]">
                  {p.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Services ── */}
        <div className="mt-20 border-t border-ink/15 pt-10 sm:mt-28 sm:pt-14">
          <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="display-voice text-[0.6rem] tracking-[0.34em] text-sand sm:text-xs">
                What&rsquo;s included
              </p>
              <h3 className="display-voice mt-2 text-[clamp(1.8rem,5vw,3rem)] text-rust">
                Social strategy services
              </h3>
            </div>
            <p className="max-w-sm text-[0.9rem] leading-relaxed text-ink/70 sm:text-right sm:text-[0.95rem]">
              Clear, customised strategies grounded in insight and tailored to
              your brand&rsquo;s goals.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="mt-10 grid gap-x-14 sm:grid-cols-2">
              {services.map((s, i) => (
                <li
                  key={s}
                  className="group flex items-baseline gap-5 border-t border-ink/10 py-4 transition-colors duration-300 first:border-t-0 hover:border-rust/40 sm:[&:nth-child(2)]:border-t-0"
                >
                  <span className="display-voice shrink-0 text-lg text-sand tabular-nums transition-colors duration-300 group-hover:text-rust sm:text-xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[0.95rem] font-medium text-ink transition-transform duration-300 ease-out group-hover:translate-x-1 sm:text-base">
                    {s}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
