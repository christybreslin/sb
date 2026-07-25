"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { BlobImage, BlobOutline, type BlobShape } from "./Blob";

const shots: {
  src: string;
  shape: BlobShape;
  client: string;
  tag: string;
  offset?: string;
}[] = [
  {
    src: "/aleksei-agafonov-V_HV-MzsI-0-unsplash.jpg",
    shape: "pebble",
    client: "Rooftop Sessions",
    tag: "Live & events",
  },
  {
    src: "/bilal-mansuri-UUnxaJyzqb4-unsplash.jpg",
    shape: "bell",
    client: "Arch & Linen",
    tag: "Interiors",
    offset: "sm:mt-16",
  },
  {
    src: "/julien-N02lIsLHCy0-unsplash.jpg",
    shape: "tri",
    client: "Late Service",
    tag: "Hospitality",
  },
  {
    src: "/land-o-lakes-inc-9cmbLTARQMA-unsplash.jpg",
    shape: "bell",
    client: "Under Glass",
    tag: "Sustainability",
    offset: "sm:-mt-12",
  },
  {
    src: "/liubov-novikova-gqIlftwIOtk-unsplash.jpg",
    shape: "pebble",
    client: "Green Courtyard",
    tag: "Travel & place",
    offset: "sm:mt-10",
  },
];

export default function Feed() {
  return (
    <section id="feed" className="relative overflow-hidden py-24 sm:py-32">
      <BlobOutline
        shape="pebble"
        className="absolute top-1/3 -left-56 h-[30rem] w-[30rem] text-rust/40"
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mb-14 text-center sm:mb-20">
          <p className="text-[0.62rem] font-bold tracking-[0.34em] text-taupe-deep uppercase">
            Content in the wild
          </p>
          <h2 className="display-voice mt-2 text-[clamp(2.6rem,8vw,5rem)] text-rust">
            The feed
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-8 lg:grid-cols-3">
          {shots.map((shot, i) => (
            <Reveal
              key={shot.src}
              delay={(i % 3) * 0.12}
              className={`group ${shot.offset ?? ""} ${
                i === shots.length - 1 ? "col-span-2 mx-auto w-2/3 sm:w-1/2 lg:col-span-1 lg:w-full" : ""
              }`}
            >
              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.04, rotate: -1.5 }}
                  transition={{ type: "spring", stiffness: 200, damping: 18 }}
                >
                  <BlobImage
                    shape={shot.shape}
                    src={shot.src}
                    alt={`${shot.client} — ${shot.tag}`}
                    className="h-auto w-full"
                  />
                </motion.div>
                <BlobOutline
                  shape={shot.shape === "tri" ? "pebble" : "tri"}
                  className="pointer-events-none absolute inset-0 h-full w-full scale-[1.1] text-sand transition-colors duration-500 group-hover:text-rust"
                />
              </div>
              <div className="mt-4 text-center">
                <p className="display-voice text-sm text-ink sm:text-base">
                  {shot.client}
                </p>
                <p className="mt-1 text-[0.58rem] font-bold tracking-[0.28em] text-rust uppercase">
                  {shot.tag}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
