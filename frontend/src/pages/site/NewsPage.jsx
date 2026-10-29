import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";

import NewsHero from "../../components/site/news/NewsHero";
import StoryArt from "../../components/site/news/StoryArt";
import StoryModal from "../../components/site/news/StoryModal";
import { Arrow, SectionLabel } from "../../components/site/news/Ornaments";
import {
  categories,
  storyById,
  stories,
} from "../../components/site/news/newsData";
import "../../components/site/news/news.css";

/* Image card with inset keyline and label chip (as on the About page) */
const StoryImage = ({ story, className = "" }) => (
  <div className={`group relative overflow-hidden ${className}`}>
    <StoryArt art={story.art} />
    <div className="pointer-events-none absolute inset-3 border border-white/30" />
    <div className="absolute left-6 top-6 bg-white px-3 py-1.5">
      <p className="font-poppins text-[9px] uppercase tracking-[0.15em] text-[#EC1F36]">
        {story.category}
      </p>
    </div>
  </div>
);

const EASE = [0.22, 1, 0.36, 1];

const NewsPage = () => {
  const reduce = useReducedMotion();

  /* CTA entrance: hidden -> shown, staggered by delay; instant if reduced motion */
  const ctaItem = (from, delay) => ({
    hidden: reduce ? { opacity: 1, y: 0, scaleX: 1 } : from,
    show: {
      opacity: 1,
      y: 0,
      scaleX: 1,
      transition: reduce ? { duration: 0 } : { duration: 0.8, ease: EASE, delay },
    },
  });
  const [activeId, setActiveId] = useState(null);
  const [filter, setFilter] = useState("all");

  const openStory = useCallback((id) => {
    if (storyById[id]) setActiveId(id);
  }, []);
  const closeStory = useCallback(() => setActiveId(null), []);

  const visible =
    filter === "all" ? stories : stories.filter((s) => s.category === filter);

  const lead = storyById.network;

  return (
    <div className="bg-white text-[#EC1F36]">
      {/* =====================================================
          01 — HERO CAROUSEL + LATEST NEWS
      ====================================================== */}
      <NewsHero />

      {/* Everything below scrolls up and covers the pinned hero */}
      <div className="relative z-10 bg-white shadow-[0_-24px_60px_-20px_rgba(0,0,0,0.25)]">
      {/* =====================================================
          02 — TOP STORIES
      ====================================================== */}
      <section
        aria-labelledby="top-stories-title"
        className="bg-white px-6 pb-12 pt-24 sm:px-10 lg:px-16 lg:pb-14 lg:pt-32"
      >
        <div className="flex flex-col justify-between gap-14 lg:flex-row lg:gap-0">
          <div className="lg:w-[38%] lg:pr-14">
            <SectionLabel>Top Story</SectionLabel>

            <h2
              id="top-stories-title"
              className="mt-6 font-seasons text-[40px] leading-[1.02] tracking-[-0.02em] text-[#171719] lg:text-[52px]"
            >
              {lead.title}
            </h2>

            <div className="mt-8 h-[3px] w-10 bg-[#EC1F36]" />

            <p className="mt-8 max-w-[430px] font-poppins text-[16px] leading-[1.75] text-[#171719]/70 lg:text-[17px]">
              {lead.excerpt}
            </p>

            <button
              type="button"
              onClick={() => openStory(lead.id)}
              className="group mt-10 inline-flex h-14 items-center gap-3 rounded-lg bg-[#EC1F36] px-8 font-poppins text-[13px] font-bold uppercase tracking-[0.12em] text-white transition-colors duration-300 hover:bg-[#c8172d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#EC1F36]"
            >
              Read full story
              <Arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

          <div className="lg:w-[55%]">
            <button
              type="button"
              tabIndex={-1}
              aria-hidden="true"
              onClick={() => openStory(lead.id)}
              className="block w-full"
            >
              <StoryImage
                story={lead}
                className="aspect-[4/3] w-full lg:aspect-[16/11]"
              />
            </button>

            <div className="mt-4 flex items-center justify-between">
              <p className="font-poppins text-[10px] uppercase tracking-[0.14em] text-[#EC1F36]/55">
                {lead.place}
              </p>
              <span className="hidden h-px w-28 bg-[#EC1F36]/20 lg:block" />
            </div>
          </div>
        </div>

      </section>

      {/* =====================================================
          03 — ALL STORIES
      ====================================================== */}
      <section
        id="stories"
        aria-labelledby="all-stories-title"
        className="scroll-mt-[82px] border-b border-[#EC1F36]/15 bg-white px-6 pb-24 pt-12 sm:px-10 lg:px-16 lg:pb-32 lg:pt-14"
      >
        <div className="mx-auto max-w-[760px] text-center">
          <div className="flex justify-center">
            <SectionLabel>Archive</SectionLabel>
          </div>
          <h2
            id="all-stories-title"
            className="mt-5 font-seasons text-[40px] leading-[0.98] tracking-[-0.02em] text-[#171719] lg:text-[60px]"
          >
            Stories from <span className="italic text-[#EC1F36]">AMIR.</span>
          </h2>
          <div className="mx-auto mt-7 h-[3px] w-10 bg-[#EC1F36]" />
        </div>

        {/* Category selector */}
        <div className="mt-12 lg:mt-14">
          <div
            role="group"
            aria-label="Filter stories by category"
            className="-mx-6 flex snap-x gap-3 overflow-x-auto px-6 pb-3 [scrollbar-width:none] sm:-mx-10 sm:px-10 lg:mx-0 lg:flex-wrap lg:justify-center lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden"
          >
            {categories.map((cat, i) => {
              const on = filter === cat.id;
              const count =
                cat.id === "all"
                  ? stories.length
                  : stories.filter((s) => s.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setFilter(cat.id)}
                  className={`group relative flex shrink-0 snap-start items-center gap-3 rounded-full border py-2.5 pl-3 pr-5 font-poppins transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EC1F36] ${
                    on
                      ? "border-[#EC1F36] bg-[#EC1F36] text-white shadow-[0_10px_24px_-10px_rgba(236,31,54,0.65)]"
                      : "border-[#EC1F36]/20 bg-white text-[#171719] hover:-translate-y-0.5 hover:border-[#EC1F36]/60 hover:shadow-[0_10px_24px_-14px_rgba(236,31,54,0.5)]"
                  }`}
                >
                  <span
                    className={`flex h-7 min-w-7 items-center justify-center rounded-full px-1.5 text-[10px] font-semibold tabular-nums transition-colors duration-300 ${
                      on
                        ? "bg-white text-[#EC1F36]"
                        : "bg-[#EC1F36]/10 text-[#EC1F36] group-hover:bg-[#EC1F36]/15"
                    }`}
                  >
                    {String(count).padStart(2, "0")}
                  </span>
                  <span className="whitespace-nowrap text-[12px] font-semibold uppercase tracking-[0.1em]">
                    {cat.label}
                  </span>
                </button>
              );
            })}
          </div>

          <p
            aria-live="polite"
            className="mt-6 text-center font-poppins text-[14px] leading-[1.7] text-[#171719]/60"
          >
            {categories.find((c) => c.id === filter)?.blurb}
            <span className="ml-2 text-[10px] uppercase tracking-[0.14em] text-[#EC1F36]/60">
              · {visible.length} {visible.length === 1 ? "story" : "stories"}
            </span>
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-[1320px] gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-10">
          {visible.map((story, i) => {
            return (
              <article
                key={`${filter}-${story.id}`}
                className="news-card-in"
                style={{ animationDelay: `${i * 70}ms` }}
              >
                {/* One real button: "Read more" is stretched over the whole card */}
                <div
                  className={`group relative flex h-full flex-col overflow-hidden rounded-[26px] border border-[#EC1F36]/12 bg-white p-3 shadow-[0_1px_2px_rgba(23,23,25,0.04)] transition-all duration-500 hover:-translate-y-2 hover:border-[#EC1F36]/45 hover:shadow-[0_30px_60px_-28px_rgba(236,31,54,0.45)] has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-4 has-[:focus-visible]:outline-[#EC1F36] motion-reduce:transition-none motion-reduce:hover:translate-y-0`}
                >
                  <div
                    className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-[18px]"
                  >
                    <StoryArt art={story.art} />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
                    <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/25 blur-3xl" />

                    <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3.5 py-1.5 font-poppins text-[9px] font-semibold uppercase tracking-[0.14em] text-[#EC1F36] backdrop-blur">
                      {story.category}
                    </span>

                    <span className="absolute bottom-3 right-5 font-seasons text-[40px] leading-none text-white">
                      {String(stories.indexOf(story) + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col px-3 pb-3 pt-5">
                    <div className="flex items-center gap-3 font-poppins text-[10px] uppercase tracking-[0.14em] text-[#171719]/50">
                      <span>{story.place}</span>
                      <span className="h-1 w-1 rounded-full bg-[#EC1F36]/50" />
                      <span>{story.read}</span>
                    </div>

                    <h3 className="mt-3 font-seasons text-[24px] leading-[1.15] tracking-[-0.01em] text-[#171719] transition-colors duration-300 group-hover:text-[#EC1F36]">
                      {story.title}
                    </h3>

                    <div className="mt-4 h-[3px] w-8 bg-[#EC1F36] transition-all duration-500 group-hover:w-16" />

                    <p className="mt-4 line-clamp-2 font-poppins text-[14px] leading-[1.7] text-[#171719]/65">
                      {story.excerpt}
                    </p>

                    <div className="mt-auto pt-5">
                      <button
                        type="button"
                        onClick={() => openStory(story.id)}
                        className="inline-flex h-11 items-center gap-2.5 rounded-full bg-[#EC1F36] px-6 font-poppins text-[12px] font-bold uppercase tracking-[0.12em] text-white transition-colors duration-300 after:absolute after:inset-0 after:content-[''] group-hover:bg-[#c8172d] focus-visible:outline-none"
                      >
                        Read more
                        <Arrow className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>

                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-[#EC1F36] transition-transform duration-500 group-hover:scale-x-100 motion-reduce:transition-none"
                  />
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* =====================================================
          06 — FINAL CTA (same as Home)
      ====================================================== */}
      <section className="relative overflow-hidden bg-[#EC1F36] px-6 py-16 text-center text-white sm:px-10 lg:px-16 lg:py-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, white 0, transparent 45%), radial-gradient(circle at 80% 80%, white 0, transparent 45%)",
          }}
        />

        <motion.div
          className="relative mx-auto max-w-[900px]"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            variants={ctaItem({ opacity: 0, y: 16 }, 0)}
            className="mb-6 inline-flex items-center gap-3"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            <p className="font-poppins text-[12px] uppercase tracking-[0.2em] text-white/75">
              Work With AMIR
            </p>
            <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
          </motion.div>

          <h2 className="font-seasons text-[36px] leading-[1.05] tracking-[-0.025em] text-white sm:text-[48px] lg:text-[60px]">
            <motion.span
              variants={ctaItem({ opacity: 0, y: 28 }, 0.12)}
              className="block"
            >
              Looking for a fresh,
            </motion.span>{" "}
            <motion.span
              variants={ctaItem({ opacity: 0, y: 28 }, 0.27)}
              className="block italic"
            >
              reliable protein partner?
            </motion.span>
          </h2>

          <motion.p
            variants={ctaItem({ opacity: 0, y: 16 }, 0.38)}
            className="mx-auto mt-5 max-w-xl font-poppins text-[15px] leading-7 text-white/80"
          >
            Fresh cuts, accurate weight and fair pricing, backed by 35+ years
            of trust and a network of 580+ stores across Maharashtra.
          </motion.p>

          <motion.div
            variants={ctaItem({ opacity: 1, scaleX: 0 }, 0.45)}
            className="mx-auto mt-6 h-[3px] w-10 bg-white/70"
          />

          <div className="mt-8 flex flex-wrap justify-center gap-5">
            <motion.div variants={ctaItem({ opacity: 0, y: 20 }, 0.6)}>
            <Link
              to="/contact"
              className="inline-flex h-14 items-center justify-center gap-3 rounded-lg border border-white bg-white px-10 font-poppins text-[14px] font-bold uppercase tracking-[0.14em] text-[#EC1F36] transition-all duration-300 hover:bg-[#171719] hover:text-white"
            >
              Contact Now
              <Arrow className="h-4 w-4" />
            </Link>
            </motion.div>

            <motion.div variants={ctaItem({ opacity: 0, y: 20 }, 0.72)}>
            <Link
              to="/catalog"
              className="inline-flex h-14 items-center justify-center rounded-lg border border-white/60 px-10 font-poppins text-[14px] font-bold uppercase tracking-[0.14em] text-white transition-all duration-300 hover:bg-white hover:text-[#EC1F36]"
            >
              Explore Products
            </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>
      </div>

      {activeId && (
        <StoryModal story={storyById[activeId]} onClose={closeStory} />
      )}
    </div>
  );
};

export default NewsPage;
