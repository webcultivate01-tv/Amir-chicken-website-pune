
import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const growthImages = [
  {
    id: 1,
    title: "Billing & POS",
    image: "/images/technology-billing.jpg",
  },
  {
    id: 2,
    title: "Digital Ordering",
    image: "/images/technology-ordering.jpg",
  },
  {
    id: 3,
    title: "Inventory Management",
    image: "/images/technology-inventory.jpg",
  },
  {
    id: 4,
    title: "Logistics",
    image: "/images/technology-logistics.jpg",
  },
  {
    id: 5,
    title: "Customer Support",
    image: "/images/technology-support.jpg",
  },
];

const introContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.08,
    },
  },
};

const introItem = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function ArrowIcon({ direction = "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-5 w-5 ${
        direction === "left" ? "rotate-180" : ""
      }`}
      aria-hidden="true"
    >
      <path d="M4 12h16" />
      <path d="m13 5 7 7-7 7" />
    </svg>
  );
}

export default function TechnologyGrowthSection() {
  const [activeIndex, setActiveIndex] = useState(2);
  const touchStartX = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const changeSlide = (direction) => {
    setActiveIndex((current) => {
      return (
        current + direction + growthImages.length
      ) % growthImages.length;
    });
  };

  const getRelativePosition = (index) => {
    const total = growthImages.length;
    let position = index - activeIndex;

    if (position > total / 2) position -= total;
    if (position < -total / 2) position += total;

    return position;
  };

  return (
    <section className="overflow-hidden bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">

      <div className="mx-auto max-w-[1480px]">

        {/* ANIMATED SECTION INTRODUCTION */}

        <motion.header
          variants={introContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.3,
          }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.p
            variants={introItem}
            className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#EC1F36] sm:text-xs"
          >
            Technology-Led Growth
          </motion.p>

          <motion.h2
            variants={introItem}
            className="mt-5 font-serif text-5xl font-medium leading-[0.96] tracking-[-0.045em] text-[#281719] sm:text-6xl lg:text-7xl"
          >
            Growing
            <br />
            <span className="italic text-[#EC1F36]">
              smarter.
            </span>
          </motion.h2>

          <motion.div
            variants={introItem}
            className="mx-auto mt-6 h-px w-12 bg-[#EC1F36]"
          />

          <motion.p
            variants={introItem}
            className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-neutral-500 sm:text-base sm:leading-8"
          >
            AMIR's next phase brings technology into the everyday
            operations of the business — from billing and ordering to
            logistics and customer support.
          </motion.p>
        </motion.header>

        {/* ANIMATED OVERLAPPING IMAGE CAROUSEL */}

        <motion.div
          initial={
            shouldReduceMotion
              ? false
              : { opacity: 0, y: 35 }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.12,
          }}
          transition={{
            duration: 0.9,
            delay: shouldReduceMotion ? 0 : 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto mt-10 max-w-[1100px] sm:mt-14 lg:mt-16"
        >
          <div
            className="relative mx-auto flex h-[340px] w-full items-center justify-center sm:h-[440px] lg:h-[510px]"
            onTouchStart={(event) => {
              touchStartX.current =
                event.touches[0].clientX;
            }}
            onTouchEnd={(event) => {
              if (touchStartX.current === null) return;

              const difference =
                event.changedTouches[0].clientX -
                touchStartX.current;

              if (Math.abs(difference) > 45) {
                changeSlide(difference < 0 ? 1 : -1);
              }

              touchStartX.current = null;
            }}
          >
            {growthImages.map((item, index) => {
              const position = getRelativePosition(index);
              const isActive = position === 0;
              const isVisible = Math.abs(position) <= 2;

              return (
                <motion.button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`View ${item.title}`}
                  aria-pressed={isActive}
                  tabIndex={isVisible ? 0 : -1}
                  className="absolute left-1/2 top-1/2 block overflow-hidden rounded-2xl bg-neutral-100 shadow-[0_18px_50px_rgba(20,20,20,0.13)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EC1F36] focus-visible:ring-offset-4"
                  animate={{
                    x: `${position * 65}%`,
                    y: "-50%",
                    scale: isActive ? 1 : 0.88,
                    opacity: isVisible
                      ? isActive
                        ? 1
                        : 0.76
                      : 0,
                  }}
                  initial={false}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.65,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    top: "50%",
                    width: isActive
                      ? "min(68%, 340px)"
                      : "min(52%, 270px)",
                    height: isActive
                      ? "min(390px, 82%)"
                      : "min(320px, 68%)",
                    marginLeft: isActive
                      ? "-170px"
                      : "-135px",
                    zIndex: 10 - Math.abs(position),
                    pointerEvents: isVisible ? "auto" : "none",
                    visibility: isVisible ? "visible" : "hidden",
                  }}
                >
                  <motion.img
                    src={item.image}
                    alt={item.title}
                    loading={
                      Math.abs(position) <= 1
                        ? "eager"
                        : "lazy"
                    }
                    draggable="false"
                    className="h-full w-full object-cover"
                    whileHover={
                      shouldReduceMotion
                        ? {}
                        : { scale: 1.045 }
                    }
                    transition={{
                      duration: 0.5,
                      ease: "easeOut",
                    }}
                  />

                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent px-4 pb-5 pt-16 text-left text-sm font-medium tracking-wide text-white sm:text-base">
                    {item.title}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* CAROUSEL NAVIGATION */}

          <div className="mt-5 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => changeSlide(-1)}
              aria-label="Previous technology image"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 text-[#281719] transition-colors duration-200 hover:border-[#281719] hover:bg-[#281719] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EC1F36]"
            >
              <ArrowIcon direction="left" />
            </button>

            <button
              type="button"
              onClick={() => changeSlide(1)}
              aria-label="Next technology image"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 text-[#281719] transition-colors duration-200 hover:border-[#281719] hover:bg-[#281719] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EC1F36]"
            >
              <ArrowIcon />
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
