import Reveal from "./Reveal";
import { BlobCard, BlobImage, BlobOutline } from "./Blob";

export default function Who() {
  return (
    <section id="who" className="relative overflow-hidden py-24 sm:py-32">
      {/* stray outline drifting off the edge, like the deck margins */}
      <BlobOutline
        shape="pebble"
        className="absolute -top-40 -left-48 h-[30rem] w-[30rem] text-sand/70"
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-6">
          <Reveal className="mx-auto w-[min(88vw,34rem)]">
            <BlobCard
              shape="pebble"
              fillClassName="text-cream"
              outline
              outlineShape="bell"
              outlineClassName="text-sand"
              contentClassName="px-[13%]"
            >
              <h2 className="display-voice text-[clamp(2.4rem,7vw,4.2rem)] text-rust">
                Who
                <br />
                we
                <br />
                are
              </h2>
            </BlobCard>
          </Reveal>

          <Reveal delay={0.15} className="mx-auto w-[min(88vw,36rem)]">
            <BlobCard
              shape="tri"
              fillClassName="text-cream-soft"
              outline
              outlineShape="pebble"
              outlineClassName="text-rust/70"
              contentClassName="px-[14%]"
            >
              <p className="blob-voice text-[0.72rem] text-rust sm:text-[0.95rem]">
                Studio Borne is a London&#8209;based social media strategy and
                content creation agency. We specialise in fresh content that is
                uniquely tailored to your brand and designed to show&#8209;off
                your product or service in the way it truly deserves
              </p>
            </BlobCard>
          </Reveal>
        </div>

        {/* founders */}
        <div className="mt-8 grid items-start gap-8 sm:mt-16 lg:grid-cols-3">
          <Reveal delay={0.05} className="mx-auto w-[min(80vw,24rem)] lg:mt-16">
            <BlobCard
              shape="bell"
              fillClassName="text-taupe"
              outline
              outlineClassName="text-sand"
              contentClassName="px-[15%]"
            >
              <span className="display-voice mb-2 text-lg text-cream">
                Honor
              </span>
              <p className="blob-voice text-[0.6rem] text-paper sm:text-[0.7rem]">
                Launched her own business, then led social media and campaign
                marketing at an international brand &mdash; building strong
                media presence is her home turf
              </p>
            </BlobCard>
          </Reveal>

          <Reveal delay={0.15} className="mx-auto hidden w-[min(80vw,22rem)] lg:block">
            <div className="relative">
              <BlobImage
                shape="pebble"
                src="/hide-brown.jpg"
                alt="Brown and white cowhide texture"
                className="h-auto w-full"
              />
              <BlobOutline
                shape="tri"
                className="pointer-events-none absolute inset-0 h-full w-full scale-[1.12] text-rust/70"
              />
            </div>
          </Reveal>

          <Reveal delay={0.25} className="mx-auto w-[min(80vw,24rem)] lg:mt-24">
            <BlobCard
              shape="tri"
              fillClassName="text-taupe"
              outline
              outlineShape="bell"
              outlineClassName="text-sand"
              contentClassName="px-[15%]"
            >
              <span className="display-voice mb-2 text-lg text-cream">
                Ellie
              </span>
              <p className="blob-voice text-[0.6rem] text-paper sm:text-[0.7rem]">
                Photographer and videographer for top brands, crafting standout
                visual content that captures attention and tells a story
              </p>
            </BlobCard>
          </Reveal>
        </div>

        <Reveal className="mx-auto mt-10 max-w-2xl text-center sm:mt-16">
          <p className="blob-voice text-[0.72rem] text-ink/75 sm:text-sm">
            Founded from a shared understanding: great content isn&rsquo;t
            enough on its own&hellip; neither is a strong social strategy.{" "}
            <span className="text-rust">
              Success lies in the intersection of both
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
