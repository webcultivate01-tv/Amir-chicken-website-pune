
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";

// Seconds the video plays on its own before the text glides in
const TEXT_DELAY = 2;

export default function HeroSection() {
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const reduceMotion = useReducedMotion();

  // Phones get a smaller file (~0.5 MB) so the hero starts playing quickly
  const [videoSrc] = useState(() =>
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 768px)").matches
      ? "/hero-mobile.mp4"
      : "/hero.mp4"
  );

  // Pause the background video while it is off-screen so scrolling stays smooth
  useEffect(() => {
    const section = heroRef.current;
    const video = videoRef.current;
    if (!section || !video) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const p = video.play();
        if (p && p.catch) p.catch(() => {});
      } else {
        video.pause();
      }
    });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const entrance = reduceMotion
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: 24 };

  const lineVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      ref={heroRef}
      aria-labelledby="amir-hero-title"
      className="relative isolate flex h-[77svh] max-h-[900px] sm:min-h-[620px] sm:h-[calc(100svh-82px)] items-center justify-start overflow-hidden bg-[#271719] text-white"
    >
      {/* Full-screen food photograph */}
      <motion.div
        className="absolute inset-0 -z-20"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <motion.video
          ref={videoRef}
          src={videoSrc}
          poster="/hero-poster.webp"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          className="h-full w-full object-cover object-center"
        />
      </motion.div>

      {/* Image contrast overlays */}
      <div className="absolute inset-0 -z-10 bg-black/20" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/35 via-black/10 to-black/55" />

      {/* Bottom-left legibility gradient, fades in with the text */}
      <motion.div
        aria-hidden="true"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: TEXT_DELAY }}
        className="absolute inset-0 -z-10 bg-gradient-to-r from-black/65 via-black/20 to-transparent"
      />

      <div className="w-full max-w-[1440px] px-5 pb-20 pt-6 text-left sm:px-10 sm:py-16 lg:px-16">
        {/* Brand eyebrow */}
        <motion.div
          initial={reduceMotion ? false : entrance}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: TEXT_DELAY, ease: [0.22, 1, 0.36, 1] }}
          className="mb-3 flex items-center justify-start gap-3 sm:mb-6"
        >
          <span className="h-px w-8 bg-[#EC1F36]" />

          <p className="text-[13px] font-semibold uppercase tracking-[0.22em] sm:text-sm">
            Amir's Fresh Cut
          </p>

          <span className="h-px w-8 bg-[#EC1F36]" />
        </motion.div>

        {/* Centered headline */}
        <motion.h1
          id="amir-hero-title"
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.18,
                delayChildren: TEXT_DELAY + 0.15,
              },
            },
          }}
          className="font-seasons [font-size:min(12.5vw,3.25rem)] font-medium leading-[1.15] sm:whitespace-nowrap tracking-tight sm:text-[3.25rem] md:text-[4rem] lg:text-[72px]"
        >
          <span className="block overflow-hidden pb-3">
            <motion.span
              variants={lineVariants}
              className="block"
            >
              Freshness in <br className="sm:hidden" />every{" "}
              <span className="italic text-[#EC1F36]">cut</span>
            </motion.span>
          </span>
        </motion.h1>

        {/* Concise supporting copy */}
        <motion.p
          initial={reduceMotion ? false : entrance}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: TEXT_DELAY + 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 max-w-[36ch] text-base leading-[1.6] text-white/90 sm:mt-5 sm:max-w-lg sm:leading-7"
        >
          Chicken, mutton, fish, seafood, frozen foods and eggs — fresh cuts,
          100% Halal practices, accurate weight and fair pricing, all under
          one trusted brand.
        </motion.p>

        {/* Calls to action */}
        <motion.div
          initial={reduceMotion ? false : entrance}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: TEXT_DELAY + 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 flex flex-nowrap items-center justify-start gap-2 sm:mt-8 sm:gap-3"
        >
          <Link
            to="/catalog"
            className="group inline-flex min-h-12 items-center gap-2 whitespace-nowrap rounded-full bg-[#EC1F36] px-5 py-3 text-[15px] sm:gap-3 sm:px-7 sm:text-base font-semibold text-white transition-colors duration-300 hover:bg-[#B9101F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Explore Products
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>

          <Link
            to="/contact"
            className="inline-flex min-h-12 items-center gap-2 whitespace-nowrap rounded-full border border-white/70 bg-black/10 px-5 py-3 text-[15px] sm:gap-3 sm:px-7 sm:text-base font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-[#271719] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Contact Now
            <span aria-hidden="true">↗</span>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
