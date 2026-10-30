import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { newsStories } from "../../../data/newsStories.js";

const EASE = [0.22, 1, 0.36, 1];

function StoryCard({ story, index, reduce }) {
  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.1, ease: EASE }}
      className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-neutral-200 bg-white shadow-[0_18px_45px_-18px_rgba(23,23,25,0.35)] transition-all duration-500 hover:-translate-y-1.5 hover:border-[#EC1F36]/30 hover:shadow-[0_32px_65px_-20px_rgba(236,31,54,0.35)]"
    >
      <div className="aspect-[16/10] w-full overflow-hidden bg-[#FBF8F7] p-4">
        <img
          src={story.image}
          alt={story.title}
          loading="lazy"
          className="h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <span className="inline-flex w-fit items-center rounded-full bg-[#FBE8E9] px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-[#EC1F36]">
          {story.category}
        </span>

        <div className="mt-4 flex items-center gap-2 text-sm text-neutral-500">
          <Calendar className="h-4 w-4" aria-hidden="true" />
          <time>{story.date}</time>
        </div>

        <h3 className="mt-3 font-seasons text-xl font-medium leading-snug tracking-tight text-[#171719]">
          {story.title}
        </h3>

        <p className="mt-3 text-[15px] leading-6 text-neutral-500">
          {story.description}
        </p>

        <div className="mt-5 flex items-center justify-between border-t border-neutral-100 pt-4">
          <span className="text-sm text-neutral-500">{story.readingTime}</span>

          <Link
            to={`/news/${story.id}`}
            className="group/link inline-flex items-center gap-1.5 text-sm font-semibold text-[#EC1F36] transition-colors hover:text-[#171719] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EC1F36]"
          >
            Read More
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export default function LatestStories() {
  const reduce = useReducedMotion();

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

          <Link
            to="/about"
            className="group inline-flex w-fit items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-[#171719] transition-colors hover:text-[#EC1F36]"
          >
            View All Stories
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1">
              <path d="M5 12h14" />
              <path d="m13 6 6 6-6 6" />
            </svg>
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {newsStories.map((story, index) => (
            <StoryCard key={story.id} story={story} index={index} reduce={reduce} />
          ))}
        </div>
      </div>

    </section>
  );
}
