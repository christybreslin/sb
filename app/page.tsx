import Image from "next/image";

/* One still screen: cream, the wordmark, then the tagline beneath it.
   Nothing to scroll. */
export default function Home() {
  return (
    <main className="grid h-svh place-items-center overflow-hidden px-6">
      <div className="w-[min(72vw,44rem)]">
        <h1 className="wordmark-in" data-magnet="0.035">
          <Image
            src="/wordmark.png"
            alt="Studio Borne"
            width={2025}
            height={569}
            preload
            className="h-auto w-full"
          />
        </h1>
        <p className="tagline mt-[3%] text-[clamp(0.75rem,1.7vw,1.3rem)] leading-tight font-bold tracking-[0.01em] text-red uppercase">
          <span data-side="left">Content creation</span> <span data-side="middle">&amp;</span>{" "}
          <span data-side="right">social media strategy</span>
        </p>
      </div>
    </main>
  );
}
