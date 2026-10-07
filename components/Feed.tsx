"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import Image from "next/image";
import Lenis from "lenis";
import { arrange, feed, photo, type Photo, type PhotoId } from "@/lib/gallery";

/* Which photos go in which column, top to bottom. Every column starts level
   at the top; they are deliberately unequal in length, and that difference is
   what makes them travel at different speeds. The numbers are each column's
   length relative to the shortest. */
type Layout = PhotoId[][];

const WIDE: Layout = arrange(feed, [1, 1.4, 1.18]);
const NARROW: Layout = arrange(feed, [1, 1.3]);

/* Only the first few rows fade in one after another as the page arrives; the
   rest are below the screen by then. */
const STAGGERED = 9;

/* The client's name lies on the page beneath the photo. On hover (or keyboard
   focus) the whole photo lifts clear of it, pushing the photos above it up the
   column, while the other columns ease upward a little in sympathy. `order`
   sets when this photo fades in as the page arrives. */
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
    <figure tabIndex={0} className="tile relative" style={{ "--order": order } as CSSProperties}>
      <figcaption className="tile-under absolute inset-x-0 bottom-0 flex h-(--reveal) items-center text-[0.7rem] font-semibold tracking-[0.2em] text-brown uppercase md:text-sm">
        {photo.client}
      </figcaption>
      <Image
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        sizes={sizes}
        placeholder="blur"
        blurDataURL={photo.blurDataURL}
        preload={preload}
        className="tile-photo relative block h-auto w-full"
      />
    </figure>
  );
}

/* The frame is as tall as the shortest column. Longer columns hang out of the
   bottom of it and are slid upward as the page scrolls, each by exactly its own
   surplus, so every column travels at its own rate and they all finish level. */
function Columns({ layout, sizes, className }: { layout: Layout; sizes: string; className: string }) {
  const frame = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = frame.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cols = Array.from(el.children) as HTMLElement[];
    let surplus = cols.map(() => 0);
    let queued = 0;

    const move = () => {
      queued = 0;
      const range = document.documentElement.scrollHeight - window.innerHeight;
      const progress = range > 0 ? Math.min(1, Math.max(0, window.scrollY / range)) : 0;
      cols.forEach((col, i) => {
        col.style.transform = `translate3d(0, ${-surplus[i] * progress}px, 0)`;
      });
    };

    const measure = () => {
      /* This layout is hidden at the current screen width. */
      if (el.offsetParent === null) return;
      const heights = cols.map((c) => c.offsetHeight);
      const shortest = Math.min(...heights);
      el.style.height = `${shortest}px`;
      surplus = heights.map((h) => h - shortest);
      move();
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
    window.addEventListener("resize", measure);
    measure();

    return () => {
      sizeWatcher.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      cancelAnimationFrame(queued);
      clearTimeout(settle);
      el.style.pointerEvents = "";
      el.style.height = "";
      cols.forEach((c) => (c.style.transform = ""));
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
  /* A heavier scroll: the page eases after the wheel or trackpad instead of
     tracking it exactly, so it feels like it has weight. Mouse and trackpad
     only; touch screens keep their own native scrolling. */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ autoRaf: true, lerp: 0.055, wheelMultiplier: 0.85 });
    return () => lenis.destroy();
  }, []);

  return (
    <>
      <Columns layout={WIDE} sizes="34vw" className="hidden grid-cols-3 md:grid" />
      <Columns layout={NARROW} sizes="50vw" className="grid grid-cols-2 md:hidden" />
    </>
  );
}
