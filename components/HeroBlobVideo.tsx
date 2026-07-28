"use client";

import { BLOBS, BlobOutline, type BlobShape } from "./Blob";

/*
 * Video clipped inside the brand's blob shapes, sitting on a calm still.
 *
 * This sidesteps the problem that killed the full-bleed video attempts. A hero
 * sized clip has to hold a fixed composition while only the hair moves, which is
 * the opposite of what the video model wants to do, so the split boundary drifts
 * and the whole hide undulates. Inside a blob the subject is small, abstract and
 * free to morph, which is the model working with us instead of against us.
 *
 * Each clip also gets the signature offset outline of a sibling shape, so a
 * moving blob still reads as brand rather than as a video window.
 *
 * Clipping is done with CSS clip-path pointing at the real BLOBS paths, scaled
 * into objectBoundingBox units (the paths are drawn in a 600 box, so 1/600).
 */

const SCALE = 1 / 600;

type Clip = {
  src: string;
  shape: BlobShape;
  ring: BlobShape;
  pos: string;
};

const clips: Clip[] = [
  {
    src: "/silk-square.mp4",
    shape: "pebble",
    ring: "bell",
    pos: "left-[2%] top-[34%] w-[min(20vmax,34vw)]",
  },
  {
    src: "/silk-square.mp4",
    shape: "bell",
    ring: "tri",
    pos: "right-[3%] top-[26%] w-[min(15vmax,26vw)]",
  },
  {
    src: "/silk-square.mp4",
    shape: "tri",
    ring: "pebble",
    pos: "hidden md:block md:left-[27%] md:bottom-[5%] md:w-[min(12vmax,20vw)]",
  },
];

export default function HeroBlobVideo() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* the calm still the clips sit on */}
      <picture>
        <source
          media="(min-width: 768px)"
          srcSet="/hide-warm-landscape.jpg"
          type="image/jpeg"
        />
        <img
          src="/hide-warm-portrait.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      </picture>

      {/* one clipPath per brand shape, normalised to the 0-1 box */}
      <svg width="0" height="0" className="absolute">
        <defs>
          {(Object.keys(BLOBS) as BlobShape[]).map((k) => (
            <clipPath key={k} id={`blobvid-${k}`} clipPathUnits="objectBoundingBox">
              <path d={BLOBS[k]} transform={`scale(${SCALE})`} />
            </clipPath>
          ))}
        </defs>
      </svg>

      {clips.map((c, i) => (
        <div key={i} className={`absolute aspect-square ${c.pos}`}>
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            src={c.src}
            className="h-full w-full object-cover"
            style={{ clipPath: `url(#blobvid-${c.shape})` }}
          />
          <BlobOutline
            shape={c.ring}
            className="pointer-events-none absolute inset-0 h-full w-full scale-[1.14] text-sand"
          />
        </div>
      ))}
    </div>
  );
}
