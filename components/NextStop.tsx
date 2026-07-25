import Link from "next/link";
import { BlobFill, BlobOutline } from "./Blob";

export default function NextStop({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <div className="flex justify-center pb-24">
      <Link href={href} className="group relative block w-40 blob-bob sm:w-44">
        <BlobFill
          shape="tri"
          className="h-auto w-full text-rust transition-colors duration-300 group-hover:text-rust-deep"
        />
        <BlobOutline
          shape="pebble"
          className="pointer-events-none absolute inset-0 h-full w-full scale-[1.15] text-sand"
        />
        <span className="display-voice absolute inset-0 flex flex-col items-center justify-center text-center text-[0.6rem] tracking-[0.14em] text-cream">
          <span className="text-sand">Next stop</span>
          <span className="mt-1 text-[0.78rem] leading-tight whitespace-pre-line">
            {label}
          </span>
          <span aria-hidden="true" className="mt-1 transition-transform duration-300 group-hover:translate-x-1.5">
            &rarr;
          </span>
        </span>
      </Link>
    </div>
  );
}
