import Reveal from "./Reveal";
import { BlobCard, BlobOutline } from "./Blob";

const services = [
  "Competitor and audience analysis",
  "Content guidance and creative direction",
  "Social media planning and scheduling",
  "Marketing support and fresh campaign concepts",
  "Performance tracking through key KPIs",
  "Ongoing content optimisation based on results",
  "Meta ad management",
];

export default function What() {
  return (
    <section id="what" className="relative overflow-hidden bg-paper">
      {/* full-bleed hide band, washed light */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/hide-brown.jpg')" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
          <Reveal className="mx-auto w-[min(88vw,34rem)]">
            <BlobCard
              shape="bell"
              fillClassName="text-taupe"
              outline
              outlineShape="pebble"
              outlineClassName="text-rust"
              contentClassName="px-[13%]"
            >
              <h2 className="display-voice text-[clamp(2.4rem,7vw,4.2rem)] text-paper">
                What
                <br />
                we
                <br />
                do
              </h2>
            </BlobCard>
          </Reveal>

          <Reveal delay={0.15} className="mx-auto max-w-md text-center">
            <p className="blob-voice rounded-3xl bg-paper/80 px-6 py-5 text-[0.78rem] text-rust backdrop-blur-sm sm:text-base">
              Everything we do at Studio Borne is anchored in two core pillars
            </p>
          </Reveal>
        </div>

        {/* the two pillars, edges kissing like the deck spread */}
        <div className="mt-4 flex flex-wrap items-center justify-center sm:mt-10">
          <Reveal delay={0.1} className="w-[min(72vw,26rem)]">
            <BlobCard
              shape="pebble"
              fillClassName="text-taupe"
              outline
              outlineClassName="text-rust"
              contentClassName="px-[16%]"
            >
              <h3 className="display-voice text-[clamp(1.15rem,3vw,1.8rem)] text-paper">
                Content
                <br />
                creation
              </h3>
              <p className="blob-voice mt-3 hidden text-[0.6rem] text-paper/90 sm:block sm:text-[0.66rem]">
                Compelling, on&#8209;brand content and a versatile content
                library we continuously draw from, repurpose and optimise
              </p>
            </BlobCard>
          </Reveal>

          <Reveal
            delay={0.25}
            className="-mt-10 w-[min(72vw,26rem)] sm:-ml-14 sm:mt-24"
          >
            <BlobCard
              shape="tri"
              fillClassName="text-taupe-deep"
              outline
              outlineShape="bell"
              outlineClassName="text-rust"
              contentClassName="px-[16%]"
            >
              <h3 className="display-voice text-[clamp(1.15rem,3vw,1.8rem)] text-paper">
                Social media
                <br />
                management
              </h3>
              <p className="blob-voice mt-3 hidden text-[0.6rem] text-paper/90 sm:block sm:text-[0.66rem]">
                Beyond just posting &mdash; strategic scheduling and
                audience&#8209;first content, timed for maximum impact
              </p>
            </BlobCard>
          </Reveal>
        </div>

        {/* strategy services */}
        <div className="relative mt-6 sm:mt-16">
          <BlobOutline
            shape="tri"
            className="absolute -right-40 -bottom-32 h-[26rem] w-[26rem] text-rust/80"
          />
          <Reveal className="mx-auto max-w-2xl rounded-[3rem] bg-cream/95 px-7 py-10 sm:px-14 sm:py-12">
            <h3 className="display-voice text-center text-xl text-rust sm:text-2xl">
              Social strategy services
            </h3>
            <p className="blob-voice mt-3 text-center text-[0.62rem] text-ink/70 sm:text-xs">
              Clear, customised strategies grounded in insight and tailored to
              your brand&rsquo;s goals
            </p>
            <ul className="mt-6 space-y-2.5">
              {services.map((s) => (
                <li
                  key={s}
                  className="flex items-start gap-3 text-[0.68rem] font-bold tracking-wide text-rust uppercase sm:text-[0.78rem]"
                >
                  <svg viewBox="0 0 600 600" className="mt-0.5 h-3 w-3 shrink-0">
                    <path
                      d="M317 36 C428 30 532 96 556 210 C580 324 546 470 428 534 C310 598 156 574 84 470 C12 366 24 208 108 118 C168 54 236 41 317 36 Z"
                      fill="currentColor"
                    />
                  </svg>
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
