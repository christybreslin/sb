import Image from "next/image";
import StudioContent from "@/components/StudioContent";
import StudioMotion from "@/components/StudioMotion";

/* A full screen of cream, the wordmark and the tagline beneath it. Scrolling
   on carries straight down into The Studio. */
export default function Home() {
  return (
    <>
      <section className="grid h-svh place-items-center overflow-hidden px-6">
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
            <span data-side="left">Content creation</span>{" "}
            <span data-side="middle">&amp;</span>{" "}
            <span data-side="right">social media strategy</span>
          </p>
        </div>
      </section>
      <StudioMotion>
        <StudioContent />
      </StudioMotion>
    </>
  );
}
