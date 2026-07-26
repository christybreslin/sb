"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { BlobFill, BlobOutline } from "./Blob";

const socials = ["Instagram", "TikTok", "LinkedIn"];

export default function Contact() {
  return (
    <section id="contact" className="relative bg-paper">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <Reveal>
          <div className="cursor-cream relative overflow-hidden rounded-[3rem] bg-rust px-8 py-16 text-cream sm:px-16 sm:py-24">
            {/* floating tonal accents */}
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 -right-16"
              animate={{ y: [0, 18, 0], rotate: [0, 6, 0] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            >
              <BlobFill shape="pebble" className="h-80 w-80 text-rust-deep" />
            </motion.div>
            <BlobOutline
              shape="bell"
              className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 text-cream/20"
            />

            <div className="relative max-w-2xl">
              <p className="display-voice text-[0.62rem] tracking-[0.34em] text-cream/60 sm:text-xs">
                Ready when you are
              </p>
              <h2 className="display-voice mt-4 text-[clamp(2.6rem,8vw,5rem)] leading-[0.95] text-cream">
                Let&rsquo;s get
                <br />
                you seen
              </h2>
              <p className="mt-5 max-w-[46ch] text-[1rem] leading-relaxed text-cream/85 sm:text-lg">
                Tell us about your brand and we&rsquo;ll show you what fresh,
                intentional content can do for it.
              </p>

              <a
                href="mailto:hello@studioborne.co"
                className="display-voice mt-8 inline-flex rounded-full bg-cream px-7 py-3.5 text-[0.72rem] tracking-[0.14em] text-rust transition-colors duration-300 hover:bg-paper sm:text-sm"
              >
                hello@studioborne.co
              </a>

              <div className="mt-8 flex gap-6">
                {socials.map((s) => (
                  <a
                    key={s}
                    href="#contact"
                    className="display-voice text-[0.6rem] tracking-[0.24em] text-cream/80 transition-colors duration-300 hover:text-sand sm:text-xs"
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
