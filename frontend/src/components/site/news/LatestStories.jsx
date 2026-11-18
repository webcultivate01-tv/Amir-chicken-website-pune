import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { pressClippings } from "../../../data/pressClippings.js";
import Lightbox from "./Lightbox.jsx";

const EASE = [0.22, 1, 0.36, 1];

function StoryCard({ item, index, reduce, onOpen, priority }) {
  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: (index % 4) * 0.1, ease: EASE }}
      className="group mx-auto flex h-full w-full max-w-[340px] sm:max-w-none flex-col overflow-hidden rounded-[18px] border border-neutral-200 bg-white shadow-[0_18px_45px_-18px_rgba(23,23,25,0.35)] transition-all duration-500 hover:-translate-y-1.5 hover:border-[#EC1F36]/30 hover:shadow-[0_32px_65px_-20px_rgba(236,31,54,0.35)]"
    >
      <button
        type="button"
        onClick={() => onOpen(item)}
        aria-label={`View ${item.title} in full size`}
        className="aspect-[4/5] w-full cursor-zoom-in overflow-hidden bg-[#FBF8F7] p-3 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#EC1F36]"
      >
        <img
          src={item.thumb}
          alt={item.title}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className="h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </button>
    </motion.article>
  );
}

export default function LatestStories() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(null);

  return (
    <section id="latest-stories" className="scroll-mt-24 bg-white px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1480px]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#EC1F36]">
              Latest Stories
            </p>
            <h2 className="mt-3 font-seasons text-4xl font-medium leading-[1.05] tracking-[-0.03em] text-[#171719] sm:text-5xl">
              In the News
            </h2>
          </motion.div>
        </div>

        <div className="mx-auto mt-10 grid max-w-[1240px] grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {pressClippings.map((item, index) => (
            <StoryCard key={item.id} item={item} index={index} reduce={reduce} onOpen={setActive} priority={index < 4} />
          ))}
        </div>
      </div>

      <Lightbox item={active} onClose={() => setActive(null)} />
    </section>
  );
}
