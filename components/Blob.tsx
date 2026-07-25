import type { CSSProperties, ReactNode } from "react";

/*
 * Organic pebble shapes drawn in a 600x600 box. The signature move from the
 * deck: a filled blob with a thin outline blob of a sibling shape drifting
 * over it, never quite aligned.
 */
export const BLOBS = {
  pebble:
    "M317 36 C428 30 532 96 556 210 C580 324 546 470 428 534 C310 598 156 574 84 470 C12 366 24 208 108 118 C168 54 236 41 317 36 Z",
  bell:
    "M300 34 C338 30 366 58 376 96 C390 150 452 172 502 224 C552 276 570 366 528 442 C486 518 384 566 288 560 C192 554 96 512 62 428 C28 344 52 250 118 204 C160 174 204 160 224 104 C238 66 268 38 300 34 Z",
  tri:
    "M258 60 C318 22 402 40 448 102 C494 164 560 240 552 330 C544 420 470 520 360 546 C250 572 130 520 84 424 C38 328 76 220 140 158 C186 114 210 90 258 60 Z",
} as const;

export type BlobShape = keyof typeof BLOBS;

export function BlobFill({
  shape = "pebble",
  className = "",
  style,
}: {
  shape?: BlobShape;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 600 600"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path d={BLOBS[shape]} fill="currentColor" />
    </svg>
  );
}

export function BlobOutline({
  shape = "bell",
  className = "",
  style,
  drift = true,
}: {
  shape?: BlobShape;
  className?: string;
  style?: CSSProperties;
  drift?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 600 600"
      className={`${drift ? "outline-drift " : ""}${className}`}
      style={style}
      aria-hidden="true"
    >
      <path
        d={BLOBS[shape]}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/* A photo clipped inside a blob, for the feed grid + texture accents. */
export function BlobImage({
  shape = "pebble",
  src,
  alt = "",
  className = "",
  style,
  imgClassName = "",
}: {
  shape?: BlobShape;
  src: string;
  alt?: string;
  className?: string;
  style?: CSSProperties;
  imgClassName?: string;
}) {
  const id = `blobclip-${shape}-${src.replace(/[^a-zA-Z0-9]/g, "")}`;
  return (
    <svg viewBox="0 0 600 600" className={className} style={style} role="img" aria-label={alt}>
      <clipPath id={id}>
        <path d={BLOBS[shape]} />
      </clipPath>
      <image
        href={src}
        width="600"
        height="600"
        preserveAspectRatio="xMidYMid slice"
        clipPath={`url(#${id})`}
        className={imgClassName}
      />
    </svg>
  );
}

/* Filled blob with centered content laid over it. */
export function BlobCard({
  shape = "pebble",
  fillClassName = "text-cream",
  className = "",
  contentClassName = "",
  children,
  outline,
  outlineShape,
  outlineClassName = "text-sand",
  outlineStyle,
}: {
  shape?: BlobShape;
  fillClassName?: string;
  className?: string;
  contentClassName?: string;
  children: ReactNode;
  outline?: boolean;
  outlineShape?: BlobShape;
  outlineClassName?: string;
  outlineStyle?: CSSProperties;
}) {
  return (
    <div className={`relative ${className}`}>
      <BlobFill shape={shape} className={`h-full w-full ${fillClassName}`} />
      {outline && (
        <BlobOutline
          shape={outlineShape ?? (shape === "bell" ? "pebble" : "bell")}
          className={`pointer-events-none absolute inset-0 h-full w-full ${outlineClassName}`}
          style={{ scale: "1.12", ...outlineStyle }}
        />
      )}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center text-center ${contentClassName}`}
      >
        {children}
      </div>
    </div>
  );
}
