"use client";

import { useState } from "react";
import Hero, { type HeroVariant } from "./Hero";
import { BlobFill } from "./Blob";

/*
 * A comparison rig for the hero background. Each option renders the real Hero
 * component, so what you see here is exactly what ships.
 */
const options: {
  id: HeroVariant;
  label: string;
  kind: "still" | "video";
  summary: string;
  detail: string;
  tradeoff: string;
}[] = [
  {
    id: "warm",
    label: "Warm matte",
    kind: "still",
    summary: "The hide, warm and luminous, with the shine removed",
    detail:
      "A separate 9:16 and 16:9 shot, each composed for its own frame rather than cropped from the other. Lit with a large soft directional source so the nap keeps depth and direction, with the specular sheen killed off entirely.",
    tradeoff:
      "The first option that is genuinely art directed, so it holds its composition on a phone and on a desktop instead of the viewport deciding what survives. Currently the strongest still.",
  },
  {
    id: "silk",
    label: "Silk (video)",
    kind: "video",
    summary: "Hand-dyed silk moving in a slow current of air",
    detail:
      "Sandwashed silk crepe, dyed in the shibori tradition, so the rust shapes have feathered bleeding edges that echo the blob language. Dye gathers left and right, leaving a clean cream centre for the logo. Ping-ponged in ffmpeg so the loop has no seam.",
    tradeoff:
      "The composition holds across the whole clip, which is what the full-bleed hide videos could never do. Landscape is the native shot; the portrait is a crop of it, so a dedicated 9:16 pass would be better if this wins.",
  },
  {
    id: "blobvid",
    label: "Silk in blobs",
    kind: "video",
    summary: "The silk clip cut into the brand shapes",
    detail:
      "A still hide background with three brand shapes cut out of it, each holding the looping silk clip and wearing the signature offset outline of a sibling shape.",
    tradeoff:
      "Exists because full-bleed video kept failing: a hero-sized clip has to hold its composition while only the subject moves, which is the opposite of what the video model wants to do. Inside a blob the subject is small and free to morph, which turns that weakness into the effect.",
  },
  {
    id: "marks",
    label: "Markings",
    kind: "still",
    summary: "The centre split, plus natural coat markings",
    detail:
      "Irregular patches of the opposite colour gathered into the left and right thirds, leaving the centre open. Markings are asymmetric and unevenly spaced rather than a repeating spot pattern.",
    tradeoff:
      "Landscape only for now. The portrait attempt came back as an all-over rug pattern with heavy patches through the middle where the logo sits, so it is pending a redo. Until then mobile crops the landscape, which lands on the calm cream centre and holds up, but it is not true art direction.",
  },
  {
    id: "soft",
    label: "Soft and wide",
    kind: "still",
    summary: "Matte and diffuse, detail pulled right back",
    detail:
      "Portrait 2:3, shot wider and lit with flat diffuse daylight. Fully matte with no specular hotspots, and the warm palette of the inspo without the glare.",
    tradeoff:
      "Sits back further than anything else here and lets the blobs lead completely. Gives up the directional depth that makes Warm matte feel lit rather than flat.",
  },
  {
    id: "original",
    label: "Original",
    kind: "still",
    summary: "The hide as originally shot",
    detail:
      "Portrait 2:3 crop of the original photograph. Diffuse overcast light with no directional key, so the coat reads as a soft even nap with very little strand detail.",
    tradeoff:
      "The baseline everything else is measured against. The whites sit cool and slightly grey against the warm cream palette.",
  },
];

type Frame = "desktop" | "phone";

export default function HeroOptions() {
  const [active, setActive] = useState<HeroVariant>("warm");
  const [frame, setFrame] = useState<Frame>("desktop");
  const current = options.find((o) => o.id === active) ?? options[0];

  return (
    <>
      <section className="relative bg-paper">
        <div className="mx-auto max-w-6xl px-5 pt-24 pb-8 sm:px-8 sm:pt-28">
          <p className="display-voice text-[0.62rem] tracking-[0.34em] text-sand sm:text-xs">
            Internal
          </p>
          <h1 className="display-voice mt-4 text-[clamp(2.4rem,7vw,4.5rem)] text-rust">
            Hero options
          </h1>
          <p className="mt-5 max-w-[58ch] text-[1rem] leading-relaxed text-ink/75 sm:text-lg">
            Six treatments, each rendered through the live Hero component, so what
            you see is what ships. Pick one to preview it, and switch frames to
            check how it holds on a phone.
          </p>

          {/* ── The switcher ── */}
          <div className="mt-9 flex flex-wrap gap-2.5">
            {options.map((o) => {
              const on = o.id === active;
              return (
                <button
                  key={o.id}
                  onClick={() => setActive(o.id)}
                  aria-pressed={on}
                  className={`display-voice flex items-center gap-2 rounded-full px-5 py-2.5 text-[0.68rem] tracking-[0.16em] transition-colors ${
                    on
                      ? "bg-rust text-cream"
                      : "bg-cream text-ink/70 hover:bg-cream-soft hover:text-rust"
                  }`}
                >
                  {on && <BlobFill shape="tri" className="h-2 w-2 text-cream" />}
                  {o.label}
                </button>
              );
            })}
          </div>

          {/* ── Frame toggle. A real narrow viewport, not a scaled div, because
                 media queries respond to viewport width. ── */}
          <div className="mt-4 flex flex-wrap items-center gap-2.5">
            <span className="display-voice text-[0.6rem] tracking-[0.28em] text-sand">
              Frame
            </span>
            {(["desktop", "phone"] as Frame[]).map((f) => (
              <button
                key={f}
                onClick={() => setFrame(f)}
                aria-pressed={frame === f}
                className={`display-voice rounded-full px-4 py-2 text-[0.62rem] tracking-[0.16em] transition-colors ${
                  frame === f
                    ? "bg-ink text-cream"
                    : "bg-cream/60 text-ink/60 hover:text-rust"
                }`}
              >
                {f === "desktop" ? "Desktop" : "Phone 390"}
              </button>
            ))}
          </div>

          {/* ── Notes on the active option ── */}
          <div className="mt-8 max-w-[64ch] border-l-2 border-sand/50 pl-5">
            <div className="flex items-baseline gap-3">
              <p className="display-voice text-[0.95rem] text-rust sm:text-base">
                {current.summary}
              </p>
              <span className="display-voice shrink-0 rounded-full bg-cream px-2.5 py-1 text-[0.55rem] tracking-[0.16em] text-ink/60">
                {current.kind}
              </span>
            </div>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-ink/75">
              {current.detail}
            </p>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-ink/60">
              {current.tradeoff}
            </p>
          </div>
        </div>
      </section>

      {frame === "desktop" ? (
        /* keyed so the entrance animation replays on each switch */
        <Hero key={active} variant={active} />
      ) : (
        <div className="flex justify-center bg-taupe/15 px-5 py-12">
          <div className="overflow-hidden rounded-[2.25rem] border-[10px] border-ink/85 shadow-2xl">
            <iframe
              key={active}
              src={`/hero-preview?variant=${active}`}
              width={390}
              height={844}
              title={`${current.label} on a 390px viewport`}
              className="block"
            />
          </div>
        </div>
      )}
    </>
  );
}
