"use client";

import { useEffect, useRef, type CSSProperties, type MouseEvent } from "react";
import Image from "next/image";
import Lenis from "lenis";
import { arrange, featured, feed, photo, type Photo, type PhotoId } from "@/lib/gallery";

/* Which photos go in which column, top to bottom. Every column starts level
   at the top; they are deliberately unequal in length, and that difference is
   what makes them travel at different speeds. The numbers are each column's
   length relative to the shortest, and also its speed relative to the
   others: the left column is longest and moves fastest. The featured photos
   open the page. */
type Layout = PhotoId[][];

const WIDE: Layout = arrange(feed, [1.77, 1.41, 1], featured);
const NARROW: Layout = arrange(feed, [1.4, 1], featured);

/* How fast the quickest column moves compared with the page itself; the rest
   are slower than the page, in proportion to their lengths. As on
   ol.studio/photography: about 1.08, 0.86 and 0.61 times the page. */
const FASTEST = 1.08;

/* Only the first few rows fade in one after another as the page arrives; the
   rest are below the screen by then. */
const STAGGERED = 9;

/* On hover (or keyboard focus) the client's name comes up in large letters
   over the bottom of the photo, light or dark to suit the photo. On touch
   screens a tap shows it, and a second tap, or a tap on another photo, puts
   it away. `order` sets when this photo fades in as the page arrives. */
function toggleName(e: MouseEvent<HTMLElement>) {
  if (window.matchMedia("(hover: hover)").matches) return;
  const tile = e.currentTarget;
  const show = !("shown" in tile.dataset);
  document.querySelectorAll<HTMLElement>(".tile[data-shown]").forEach((t) => delete t.dataset.shown);
  if (show) tile.dataset.shown = "";
}

function Tile({
  photo,
  sizes,
  preload,
  order,
}: {
  photo: Photo;
  sizes: string;
  preload: boolean;
  order: number;
}) {
  return (
    <figure
      tabIndex={0}
      data-tone={photo.tone}
      onClick={toggleName}
      className="tile relative"
      style={{ "--order": order } as CSSProperties}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        sizes={sizes}
        placeholder="blur"
        blurDataURL={photo.blurDataURL}
        preload={preload}
        className="block h-auto w-full"
      />
      <figcaption className="tile-name">{photo.client}</figcaption>
    </figure>
  );
}

/* The frame is set to the height at which the longest column travels at
   FASTEST times the page. Columns longer than the frame hang out of its bottom
   and are slid upward as the page scrolls; shorter ones are let down. Each
   moves by exactly its difference from the frame, so every column travels at
   its own rate and they all finish level with its bottom. */
function Columns({ layout, sizes, className }: { layout: Layout; sizes: string; className: string }) {
  const frame = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = frame.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cols = Array.from(el.children) as HTMLElement[];
    let shift = cols.map(() => 0);
    let queued = 0;

    /* Where the browser can tie an animation to the page's scroll (see
       .feed-column[data-linked] in globals.css), it moves the columns itself,
       in step with the scroll. Otherwise the script follows the scroll, which
       lags it by a frame and jitters on phones. */
    const linked = CSS.supports("animation-timeline: scroll()");
    if (linked) cols.forEach((c) => (c.dataset.linked = ""));

    const move = () => {
      queued = 0;
      if (linked) return;
      const range = document.documentElement.scrollHeight - window.innerHeight;
      const progress = range > 0 ? Math.min(1, Math.max(0, window.scrollY / range)) : 0;
      cols.forEach((col, i) => {
        col.style.transform = `translate3d(0, ${-shift[i] * progress}px, 0)`;
      });
    };

    const measure = () => {
      /* This layout is hidden at the current screen width. */
      if (el.offsetParent === null) return;
      const heights = cols.map((c) => c.offsetHeight);
      const longest = Math.max(...heights);
      /* Everything on the page that can be scrolled past apart from the frame.
         The page's scroll range is this plus the frame's height. */
      const rest = document.documentElement.scrollHeight - window.innerHeight - el.offsetHeight;
      const frameHeight = (longest - (FASTEST - 1) * rest) / FASTEST;
      el.style.height = `${Math.min(longest, Math.max(Math.min(...heights), frameHeight))}px`;
      shift = heights.map((h) => h - el.offsetHeight);
      cols.forEach((c, i) => c.style.setProperty("--shift", `${shift[i]}px`));
      move();
    };

    /* A phone's toolbar sliding away changes the window's height mid-scroll;
       only a change of width calls for measuring again. */
    let width = window.innerWidth;
    const onResize = () => {
      if (window.innerWidth === width) return;
      width = window.innerWidth;
      measure();
    };

    /* While the page is moving at any real speed, photos ignore the pointer,
       so names are not uncovered just because a photo passed under a resting
       mouse. The slow tail end of an eased scroll does not count as moving. */
    let settle: ReturnType<typeof setTimeout> | undefined;
    let lastY = window.scrollY;
    const onScroll = () => {
      if (!queued) queued = requestAnimationFrame(move);
      const step = Math.abs(window.scrollY - lastY);
      lastY = window.scrollY;
      if (step < 5) return;
      el.style.pointerEvents = "none";
      clearTimeout(settle);
      settle = setTimeout(() => {
        el.style.pointerEvents = "";
      }, 90);
    };

    const sizeWatcher = new ResizeObserver(measure);
    cols.forEach((c) => sizeWatcher.observe(c));
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    measure();

    return () => {
      sizeWatcher.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(queued);
      clearTimeout(settle);
      el.style.pointerEvents = "";
      el.style.height = "";
      cols.forEach((c) => {
        c.style.transform = "";
        c.style.removeProperty("--shift");
        delete c.dataset.linked;
      });
    };
  }, []);

  return (
    <div ref={frame} className={`feed-frame items-start gap-(--feed-gap) ${className}`}>
      {layout.map((ids, i) => (
        <div key={i} className="feed-column flex flex-col gap-(--feed-gap)">
          {ids.map((id, j) => (
            <Tile key={id} photo={photo(id)} sizes={sizes} preload={j === 0} order={Math.min(j * layout.length + i, STAGGERED)} />
          ))}
        </div>
      ))}
    </div>
  );
}

/* Three columns on a wide screen, two on a phone. Only the layout that fits
   the screen is shown (and loaded). */
export default function Feed() {
  /* A heavy, slow scroll: each turn of the wheel, or swipe on a phone, moves
     the page less than usual, and it eases on afterwards instead of tracking
     the finger or wheel exactly. */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.03,
      wheelMultiplier: 0.5,
      syncTouch: true,
      syncTouchLerp: 0.05,
      touchMultiplier: 0.7,
    });
    return () => lenis.destroy();
  }, []);

  return (
    <>
      <Columns layout={WIDE} sizes="34vw" className="hidden grid-cols-3 md:grid" />
      <Columns layout={NARROW} sizes="50vw" className="grid grid-cols-2 md:hidden" />
    </>
  );
}
