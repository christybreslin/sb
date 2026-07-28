"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { BlobFill, BlobOutline, type BlobShape } from "./Blob";
import HeroBlobVideo from "./HeroBlobVideo";

/*
 * Background treatments for the hero. The homepage runs "original"; the rest are
 * candidates being compared on /hero-options.
 *
 * Every raster variant carries a separate portrait and landscape asset. A single
 * image cannot serve both frame shapes: background-size: cover lets the viewport
 * decide what survives, which crops markings away on desktop and upscales a
 * narrow slice on mobile. Art direction fixes that at the source.
 */
export type HeroVariant =
  | "original"
  | "soft"
  | "warm"
  | "marks"
  | "silk"
  | "blobvid";

type ImgSet = { avif?: string; webp?: string; jpg: string };
type VidSet = { webm?: string; mp4: string };

type HeroMedia =
  | { kind: "image"; portrait: ImgSet; landscape: ImgSet }
  | {
      kind: "video";
      portrait: VidSet;
      landscape: VidSet;
      poster: { portrait: ImgSet; landscape: ImgSet };
    }
  | { kind: "blobvid" };

const heroMedia: Record<HeroVariant, HeroMedia> = {
  original: {
    kind: "image",
    portrait: { jpg: "/hide-split.jpg" },
    landscape: { jpg: "/hide-split.jpg" },
  },
  soft: {
    kind: "image",
    portrait: { jpg: "/hide-soft.jpg" },
    landscape: { jpg: "/hide-soft.jpg" },
  },
  /* The first genuinely art-directed pair: each orientation is its own shot,
     composed for that frame, so neither is a crop of the other. */
  warm: {
    kind: "image",
    portrait: { jpg: "/hide-warm-portrait.jpg" },
    landscape: { jpg: "/hide-warm-landscape.jpg" },
  },
  /* Landscape only so far. The portrait shot came back as an all-over rug
     pattern with no clear centre, so it is pending a redo. */
  marks: {
    kind: "image",
    portrait: { jpg: "/hide-marks-landscape.jpg" },
    landscape: { jpg: "/hide-marks-landscape.jpg" },
  },
  silk: {
    kind: "video",
    portrait: { mp4: "/silk-portrait.mp4" },
    landscape: { mp4: "/silk-landscape.mp4" },
    poster: {
      portrait: { jpg: "/silk-portrait-poster.jpg" },
      landscape: { jpg: "/silk-landscape-poster.jpg" },
    },
  },
  blobvid: { kind: "blobvid" },
};

const WIDE = "(min-width: 768px)";

function useMedia(query: string, serverValue: boolean) {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => serverValue,
  );
}

/* Art-directed still: the landscape sources only apply from md up. */
function Backdrop({ portrait, landscape }: { portrait: ImgSet; landscape: ImgSet }) {
  return (
    <picture>
      {landscape.avif && <source media={WIDE} srcSet={landscape.avif} type="image/avif" />}
      {landscape.webp && <source media={WIDE} srcSet={landscape.webp} type="image/webp" />}
      <source media={WIDE} srcSet={landscape.jpg} type="image/jpeg" />
      {portrait.avif && <source srcSet={portrait.avif} type="image/avif" />}
      {portrait.webp && <source srcSet={portrait.webp} type="image/webp" />}
      <img
        src={portrait.jpg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
    </picture>
  );
}

/*
 * Only one orientation is ever downloaded. The `media` attribute on <source> is
 * unreliable inside <video>, so the choice is made here and the element is keyed
 * to force a remount when the viewport crosses the breakpoint.
 */
function VideoBackdrop({
  portrait,
  landscape,
  poster,
}: Extract<HeroMedia, { kind: "video" }>) {
  const wide = useMedia(WIDE, true);
  const still = useMedia("(prefers-reduced-motion: reduce)", false);

  if (still) return <Backdrop portrait={poster.portrait} landscape={poster.landscape} />;

  const set = wide ? landscape : portrait;
  return (
    <video
      key={wide ? "landscape" : "portrait"}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={wide ? poster.landscape.jpg : poster.portrait.jpg}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full object-cover object-center"
    >
      {set.webm && <source src={set.webm} type="video/webm" />}
      <source src={set.mp4} type="video/mp4" />
    </video>
  );
}

function HeroBackdrop({ variant }: { variant: HeroVariant }) {
  const media = heroMedia[variant];
  if (media.kind === "blobvid") return <HeroBlobVideo />;
  if (media.kind === "video") return <VideoBackdrop {...media} />;
  return <Backdrop portrait={media.portrait} landscape={media.landscape} />;
}

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
      className={`reveal ${className}`}
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

export default function Hero({ variant = "original" }: { variant?: HeroVariant }) {
  return (
    <section className="relative flex h-svh flex-col overflow-hidden bg-paper">
      {/* the split hide, full strength, no veil */}
      <HeroBackdrop variant={variant} />

      <div className="relative flex flex-1 flex-col items-center justify-center px-5 py-14">
        {/* the logo IS the hero */}
        <motion.div
          initial={{ opacity: 0, scale: 0.86 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="reveal w-[min(78vw,26rem)] sm:w-[min(56vh,32rem)]"
        >
          <Image
            src="/logo.png"
            alt="Studio Borne: content creation & social media strategy"
            width={1391}
            height={1400}
            priority
            className="h-auto w-full"
          />
        </motion.div>

        {/* one clear line, legible over either half of the hide */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="reveal relative mt-6 max-w-[24rem] rounded-full bg-paper/85 px-6 py-3 text-center text-[0.66rem] font-bold tracking-[0.18em] text-rust uppercase backdrop-blur-sm sm:text-xs"
        >
          Content that gets your brand seen
        </motion.p>

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
