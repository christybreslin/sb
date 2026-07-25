import Reveal from "./Reveal";
import { BlobFill, BlobOutline } from "./Blob";

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-paper">
      {/* hide band to close the loop, washed light */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/hide-taupe.jpg')" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto flex max-w-7xl justify-center px-5 py-24 sm:px-8 sm:py-32">
        <Reveal className="relative w-[min(92vw,46rem)]">
          <div className="relative blob-bob">
            <BlobFill shape="pebble" className="h-auto w-full text-rust" />
            <BlobOutline
              shape="bell"
              className="absolute inset-0 h-full w-full scale-[1.14] text-cream"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center px-[15%] text-center">
              <p className="text-[0.6rem] font-bold tracking-[0.34em] text-sand uppercase sm:text-xs">
                Ready when you are
              </p>
              <h2 className="display-voice mt-2 text-[clamp(1.9rem,6vw,3.6rem)] text-cream">
                Let&rsquo;s get
                <br />
                you seen
              </h2>
              <p className="blob-voice mt-4 max-w-[30ch] text-[0.62rem] text-cream/90 sm:text-[0.78rem]">
                Tell us about your brand and we&rsquo;ll show you what fresh,
                intentional content can do for it
              </p>
              <a
                href="mailto:hello@studioborne.co"
                className="display-voice mt-5 rounded-full bg-cream px-5 py-2.5 text-[0.56rem] tracking-[0.1em] text-rust transition-colors hover:bg-paper sm:mt-6 sm:px-6 sm:py-3 sm:text-xs sm:tracking-[0.16em]"
              >
                hello@studioborne.co
              </a>
              <div className="mt-4 flex gap-4 sm:mt-5 sm:gap-6">
                {["Instagram", "TikTok", "LinkedIn"].map((s) => (
                  <a
                    key={s}
                    href="#contact"
                    className="text-[0.5rem] font-bold tracking-[0.14em] text-cream/80 uppercase transition-colors hover:text-sand sm:text-[0.64rem] sm:tracking-[0.24em]"
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
