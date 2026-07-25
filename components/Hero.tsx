"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { BlobFill, BlobOutline, type BlobShape } from "./Blob";

/* Little satellite blobs in the style of the logo: cream fill, sand ring, red type. */
const satellites: {
  href: string;
  label: string;
  shape: BlobShape;
  pos: string; /* desktop position around the logo */
  dur: number;
}[] = [
  {
    href: "/who",
    label: "Who\nwe are",
    shape: "pebble",
    pos: "left-[4%] top-[24%] w-28 lg:left-[13%] lg:w-32",
    dur: 6.5,
  },
  {
    href: "/what",
    label: "What\nwe do",
    shape: "tri",
    pos: "right-[4%] top-[20%] w-28 lg:right-[13%] lg:w-32",
    dur: 7.8,
  },
  {
    href: "/why",
    label: "Why\nus?",
    shape: "bell",
    pos: "left-[9%] bottom-[18%] w-24 lg:left-[18%] lg:w-28",
    dur: 7.2,
  },
  {
    href: "/feed",
    label: "The\nfeed",
    shape: "pebble",
    pos: "right-[9%] bottom-[22%] w-24 lg:right-[18%] lg:w-28",
    dur: 8.6,
  },
];

function Satellite({
  s,
  className = "",
  delay,
}: {
  s: (typeof satellites)[number];
  className?: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      <motion.div
        animate={{ y: [0, -14, 0], x: [0, 7, 0], rotate: [0, 3, 0] }}
        transition={{
          duration: s.dur,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay * 1.7,
        }}
      >
        <Link href={s.href} className="group block">
          <div className="relative transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
            <BlobFill
              shape={s.shape}
              className="h-auto w-full text-cream transition-colors duration-300 group-hover:text-cream-soft"
            />
            <BlobOutline
              shape={s.shape === "pebble" ? "bell" : "pebble"}
              className="pointer-events-none absolute inset-0 h-full w-full scale-[1.18] text-sand"
            />
            <span className="display-voice absolute inset-0 flex items-center justify-center whitespace-pre-line text-center text-[0.62rem] leading-[1.15] tracking-[0.12em] text-rust sm:text-[0.7rem]">
              {s.label}
            </span>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section className="relative flex h-svh flex-col overflow-hidden bg-paper">
      {/* the split hide, full strength — no veil */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/hide-split.jpg')" }}
        aria-hidden="true"
      />

      <div className="relative flex flex-1 flex-col items-center justify-center px-5 py-14">
        {/* the logo IS the hero */}
        <motion.div
          initial={{ opacity: 0, scale: 0.86 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="w-[min(78vw,26rem)] sm:w-[min(56vh,32rem)]"
        >
          <Image
            src="/logo.png"
            alt="Studio Borne — content creation & social media strategy"
            width={1391}
            height={1400}
            priority
            className="h-auto w-full"
          />
        </motion.div>

        {/* desktop: satellites float around the logo */}
        {satellites.map((s, i) => (
          <Satellite
            key={s.href}
            s={s}
            delay={0.6 + i * 0.12}
            className={`absolute hidden md:block ${s.pos}`}
          />
        ))}

        {/* mobile: satellites gather under the logo */}
        <div className="mt-8 flex items-center justify-center gap-3 md:hidden">
          {satellites.map((s, i) => (
            <Satellite key={s.href} s={s} delay={0.6 + i * 0.12} className="w-20" />
          ))}
        </div>
      </div>
    </section>
  );
}
