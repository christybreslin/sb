import Reveal from "./Reveal";
import { BlobCard, BlobOutline } from "./Blob";

export default function Why() {
  return (
    <section id="why" className="relative overflow-hidden py-24 sm:py-32">
      <BlobOutline
        shape="bell"
        className="absolute -top-52 right-[-14rem] h-[34rem] w-[34rem] text-sand/70"
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal className="mx-auto w-[min(88vw,34rem)]">
            <BlobCard
              shape="pebble"
              fillClassName="text-rust"
              outline
              outlineShape="bell"
              outlineClassName="text-sand"
              contentClassName="px-[13%]"
            >
              <h2 className="display-voice text-[clamp(2.4rem,7vw,4.2rem)] text-sand">
                Why
                <br />
                us?
              </h2>
            </BlobCard>
          </Reveal>

          <Reveal delay={0.15} className="mx-auto w-[min(88vw,34rem)]">
            <BlobCard
              shape="bell"
              fillClassName="text-rust"
              outline
              outlineShape="tri"
              outlineClassName="text-sand"
              contentClassName="px-[15%]"
            >
              <p className="blob-voice text-[0.68rem] text-cream sm:text-[0.85rem]">
                The Studio Borne team is built on two core pillars of
                marketing:
              </p>
              <p className="display-voice mt-4 text-[0.95rem] text-cream sm:text-lg">
                Social media strategy
                <br />
                <span className="text-sand">&amp;</span>
                <br />
                Content creation
              </p>
            </BlobCard>
          </Reveal>
        </div>

        <div className="mt-4 grid items-start gap-6 sm:mt-12 lg:grid-cols-2">
          <Reveal delay={0.1} className="mx-auto w-[min(84vw,28rem)]">
            <BlobCard
              shape="tri"
              fillClassName="text-rust"
              outline
              outlineClassName="text-sand"
              contentClassName="px-[15%]"
            >
              <p className="blob-voice text-[0.58rem] text-cream sm:text-[0.68rem]">
                Honor brings a strategic edge, shaped by launching her own
                business and managing in&#8209;house marketing within an
                international company. Ellie brings creative depth, with years
                of experience in photography and videography for leading brands
              </p>
            </BlobCard>
          </Reveal>

          <Reveal delay={0.22} className="mx-auto w-[min(84vw,28rem)] lg:mt-20">
            <BlobCard
              shape="pebble"
              fillClassName="text-rust-deep"
              outline
              outlineShape="bell"
              outlineClassName="text-sand"
              contentClassName="px-[15%]"
            >
              <p className="blob-voice text-[0.58rem] text-cream sm:text-[0.68rem]">
                Each side brings distinct strengths, but both contribute across
                strategy and content &mdash; working collaboratively to deliver
                insight&#8209;driven, high&#8209;impact work that truly
                performs
              </p>
            </BlobCard>
          </Reveal>
        </div>

        <Reveal className="mx-auto mt-12 max-w-2xl text-center sm:mt-16">
          <p className="blob-voice text-[0.72rem] text-ink/75 sm:text-sm">
            To gain real traction, your content must align seamlessly with
            your social strategy &mdash;{" "}
            <span className="text-rust">
              timed, placed, and delivered with intention
            </span>{" "}
            to reach its full potential
          </p>
        </Reveal>
      </div>
    </section>
  );
}
