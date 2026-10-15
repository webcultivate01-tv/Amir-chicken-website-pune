
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, useReducedMotion } from "framer-motion";

export default function FinalCTA() {
  const headingRef = useRef(null);

  const isInView = useInView(headingRef, {
    once: true,
    amount: 0.5,
  });

  const reduceMotion = useReducedMotion();
  const [typedText, setTypedText] = useState("");

  const headline = "Good food starts with";
  const accent = "a better partnership.";

  useEffect(() => {
    if (!isInView) return;

    if (reduceMotion) {
      setTypedText(headline);
      return;
    }

    let index = 0;

    const timer = window.setInterval(() => {
      index += 1;
      setTypedText(headline.slice(0, index));

      if (index >= headline.length) {
        window.clearInterval(timer);
      }
    }, 55);

    return () => window.clearInterval(timer);
  }, [isInView, reduceMotion]);

  return (
    <section className="overflow-hidden px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-7xl text-center">
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#EC1F36] sm:text-xs"
        >
          LET'S BUILD SOMETHING FRESH
        </motion.p>

        <h2
          ref={headingRef}
          aria-label={`${headline} ${accent}`}
          className="mx-auto max-w-5xl font-serif text-4xl font-semibold leading-[1.12] tracking-[-0.045em] text-[#211719] sm:text-5xl lg:text-7xl"
        >
          <span>{typedText}</span>
          {!reduceMotion && typedText.length < headline.length && (
            <span
              aria-hidden="true"
              className="ml-1 inline-block h-[0.8em] w-[2px] animate-pulse bg-[#801821]"
            />
          )}

          <br />

          <motion.span
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={
              isInView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 18 }
            }
            transition={{ duration: 0.65, delay: 0.25 }}
            className="mt-2 inline-block text-[#EC1F36]"
          >
            {accent}
          </motion.span>
        </h2>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.35 }}
          className="mt-9 flex justify-center"
        >
          <Link
            to="/contact"
            className="group relative inline-flex min-h-[60px] items-center justify-center gap-5 overflow-hidden rounded-full bg-[#801821] px-8 py-4 text-base font-semibold text-white shadow-[0_10px_30px_rgba(128,24,33,0.18)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#211719] hover:shadow-[0_16px_36px_rgba(128,24,33,0.24)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#801821] focus-visible:ring-offset-4 sm:min-h-[66px] sm:px-10 sm:text-lg"
          >
            <span>Let's talk business</span>

            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#801821] transition-transform duration-300 group-hover:rotate-[-45deg]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="h-4 w-4"
              >
                <path d="M5 12h14" />
                <path d="m13 6 6 6-6 6" />
              </svg>
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
