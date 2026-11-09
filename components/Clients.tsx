"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import logos from "@/lib/clients-data.json";

/* Logos come from scripts/make-client-logos.py, each in its own colours;
   `height` is how tall each is shown, in the line's own units, chosen by eye
   so they carry equal weight. Clients without a logo file yet are set in type. */
const clients: { name: string; logo?: keyof typeof logos; height?: number }[] = [
  { name: "Queen Rose" },
  { name: "Eldon London", logo: "eldon-london", height: 3 },
  { name: "L’Hôtel Marrakech", logo: "lhotel-marrakech", height: 2.9 },
  { name: "Villa Mabrouka", logo: "villa-mabrouka", height: 6.4 },
  { name: "Harriet and Hera" },
  { name: "Salsa Rose", logo: "salsa-rose", height: 1.15 },
  { name: "London Velvet", logo: "london-velvet", height: 1.15 },
  { name: "Lindos Villas" },
];

/* How far the line drifts on its own, in pixels per second. */
const DRIFT = 40;

/* The clients in one line that drifts slowly from right to left and can be
   scrolled sideways by hand: swiped on a phone, scrolled sideways on a
   trackpad, or dragged with the mouse. It stops while the pointer rests on it
   and carries on a moment after it is let go. The second copy of the line is
   only there so it can loop without a gap. */
export default function Clients() {
  const strip = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = strip.current;
    if (!el) return;
    const drifting = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let held = false;
    let resting = false;
    let quietUntil = 0;
    let last = performance.now();
    let pos = 0;
    let frame = 0;

    /* The line is two identical copies; any position is kept within the first
       copy's width, so the line never runs out in either direction. */
    const within = (x: number) => {
      const half = el.scrollWidth / 2;
      return half > 0 ? ((x % half) + half) % half : x;
    };

    const tick = (now: number) => {
      const dt = Math.min(now - last, 100) / 1000;
      last = now;
      pos = drifting && !held && !resting && now > quietUntil ? pos + DRIFT * dt : el.scrollLeft;
      pos = within(pos);
      if (Math.abs(el.scrollLeft - pos) > 0.5) el.scrollLeft = pos;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    /* Any scrolling by hand pauses the drift briefly. */
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) quietUntil = performance.now() + 1500;
    };
    const onTouch = () => (quietUntil = performance.now() + 1500);

    /* Dragging with the mouse. */
    let startX = 0;
    let startLeft = 0;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      held = true;
      startX = e.clientX;
      startLeft = el.scrollLeft;
      el.setPointerCapture(e.pointerId);
      el.dataset.dragging = "";
    };
    const onMove = (e: PointerEvent) => {
      if (held) el.scrollLeft = within(startLeft - (e.clientX - startX));
    };
    const onUp = () => {
      if (!held) return;
      held = false;
      quietUntil = performance.now() + 1200;
      delete el.dataset.dragging;
    };
    const onEnter = () => (resting = true);
    const onLeave = () => (resting = false);

    el.addEventListener("wheel", onWheel, { passive: true });
    el.addEventListener("touchstart", onTouch, { passive: true });
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouch);
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={strip} className="clients">
      <div className="clients-track">
        {[false, true].map((copy) => (
          <ul key={String(copy)} aria-hidden={copy || undefined}>
            {clients.map((c) => {
              const logo = c.logo && logos[c.logo];
              return (
                <li key={c.name}>
                  {logo ? (
                    <Image
                      src={logo.src}
                      alt={c.name}
                      width={logo.width}
                      height={logo.height}
                      sizes="20rem"
                      draggable={false}
                      style={{ height: `${c.height}em` }}
                      className="w-auto max-w-none"
                    />
                  ) : (
                    c.name
                  )}
                </li>
              );
            })}
          </ul>
        ))}
      </div>
    </div>
  );
}
