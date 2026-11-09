import type { CSSProperties, ReactNode } from "react";

/* A line that moves slowly and steadily from right to left, on a loop, and
   never stops: no pausing on hover, no dragging. The browser animates it on
   its own (see .marquee in globals.css), so it stays smooth. The second copy
   is only there so the loop has no gap. `seconds` is how long one copy takes
   to pass. */
export default function Marquee({
  seconds,
  className,
  children,
}: {
  seconds: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`marquee ${className ?? ""}`}>
      <div className="marquee-track" style={{ "--marquee-time": `${seconds}s` } as CSSProperties}>
        <div className="marquee-copy">{children}</div>
        <div className="marquee-copy" aria-hidden="true" inert>
          {children}
        </div>
      </div>
    </div>
  );
}
