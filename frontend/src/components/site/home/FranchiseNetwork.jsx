import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

const svg = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "h-6 w-6",
};

const points = [
  {
    title: "Brand Recognition",
    text: "A name families have trusted since 1991.",
    icon: (
      <svg {...svg}>
        <circle cx="12" cy="9" r="5" />
        <path d="m9 13.5-1.5 7L12 18l4.5 2.5-1.5-7" />
      </svg>
    ),
  },
  {
    title: "Reliable Procurement",
    text: "Consistent supply through centralised sourcing.",
    icon: (
      <svg {...svg}>
        <path d="M3 7h11v9H3z" />
        <path d="M14 10h4l3 3v3h-7" />
        <circle cx="7" cy="18" r="1.8" />
        <circle cx="17.5" cy="18" r="1.8" />
      </svg>
    ),
  },
  {
    title: "Tested Retail Formats",
    text: "Hygienic store designs proven across the network.",
    icon: (
      <svg {...svg}>
        <path d="M4 10h16v10H4z" />
        <path d="m3 10 2-6h14l2 6" />
        <path d="M10 20v-5h4v5" />
      </svg>
    ),
  },
  {
    title: "Operational Guidance",
    text: "Standard practices and hands-on franchise training.",
    icon: (
      <svg {...svg}>
        <path d="M9 4h6l1 2h3v14H5V6h3z" />
        <path d="m9 13 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Product Diversity",
    text: "Chicken, eggs, mutton, fish, seafood and frozen foods.",
    icon: (
      <svg {...svg}>
        <path d="M12 3 3 8l9 5 9-5z" />
        <path d="m3 13 9 5 9-5" />
      </svg>
    ),
  },
  {
    title: "Marketing Support",
    text: "Visibility and recall built with every partner.",
    icon: (
      <svg {...svg}>
        <path d="M4 10v4" />
        <path d="m7 9 11-5v16L7 15z" />
        <path d="m8 15 1.5 5h3L11 15" />
      </svg>
    ),
  },
];

const Arrow = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-4 w-4"
  >
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </svg>
);

export default function FranchiseNetwork() {
  const reduce = useReducedMotion();

  const reveal = (delay = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 32 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.8, delay, ease: EASE },
  });

  return (
    <section
      aria-label="Franchise network"
      className="relative overflow-hidden border-t border-[#EC1F36]/15 bg-[#FBF8F7] px-6 py-12 sm:px-10 lg:px-16 lg:py-14"
    >
      <div className="pointer-events-none absolute -right-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-[#EC1F36]/[0.05] blur-3xl" />

      <div className="relative mx-auto grid max-w-[1480px] gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-center lg:gap-10">
        {/* LEFT — story + quote */}
        <div className="">
          <motion.div {...reveal(0)}>
            <div className="inline-flex items-center gap-3">
              <span className="h-px w-8 bg-[#EC1F36]" />
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#EC1F36]">
                Franchise Network
              </p>
            </div>

            <h2 className="mt-4 font-seasons text-5xl leading-[1.02] tracking-[-0.03em] text-[#171719] sm:text-6xl lg:text-[64px]">
              A system
              <br />
              <span className="italic text-[#EC1F36]">built to grow.</span>
            </h2>

            <p className="mt-4 max-w-md text-base leading-7 text-neutral-500">
              Amir enables franchise partners through brand recognition,
              reliable procurement, tested retail formats and operational
              support.
            </p>

            <Link
              to="/get-a-quote"
              className="mt-6 inline-flex items-center gap-3 rounded-full bg-[#171719] px-7 py-3.5 text-base font-semibold text-white transition hover:bg-[#EC1F36]"
            >
              Become a Franchise Partner
              <Arrow />
            </Link>
          </motion.div>

          <motion.figure
            {...reveal(0.15)}
            className="mt-8 max-w-md border-l-2 border-[#EC1F36] pl-6"
          >
            <blockquote className="font-seasons text-[19px] italic leading-[1.4] text-[#171719]">
              “Amir helped us enter an organised business with a trusted name
              and dependable support.”
            </blockquote>
            <figcaption className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#171719]/55">
              Sandeep Devkar · 30 Outlets, Nashik City
            </figcaption>
          </motion.figure>
        </div>

        {/* RIGHT — pillars */}
        <div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {points.map((point, index) => (
              <motion.article
                key={point.title}
                {...reveal(0.08 * index)}
                className="group relative overflow-hidden rounded-2xl border border-[#171719]/10 bg-white p-5 transition-all duration-500 hover:-translate-y-1.5 hover:border-[#EC1F36]/30 hover:shadow-[0_24px_50px_-28px_rgba(236,31,54,0.4)] "
              >
                <span className="absolute right-4 top-4 font-seasons text-lg italic text-[#171719]/20 transition-colors duration-500 group-hover:text-[#EC1F36]">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EC1F36]/[0.08] text-[#EC1F36] transition-colors duration-500 group-hover:bg-[#EC1F36] group-hover:text-white">
                  {point.icon}
                </span>

                <h3 className="mt-4 font-seasons text-[21px] leading-[1.1] tracking-[-0.01em] text-[#171719]">
                  {point.title}
                </h3>

                <p className="mt-1.5 text-[14px] leading-5 text-neutral-500">
                  {point.text}
                </p>
              </motion.article>
            ))}
          </div>

          {/* 7th pillar — full-width banner */}
          <motion.div
            {...reveal(0.5)}
            className="mt-3 flex items-center gap-4 rounded-2xl bg-[#281719] px-5 py-4 text-white"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-[#FFB800]">
              <svg {...svg}>
                <path d="M7 12 3 8l4-1 4 2 4-2 4 1-4 4" />
                <path d="m7 12 5 6 5-6" />
              </svg>
            </span>

            <div>
              <h3 className="font-seasons text-[21px] leading-[1.1]">
                Established Customer Trust
              </h3>
              <p className="mt-0.5 text-[14px] leading-5 text-white/60">
                10 Lakh+ loyal customers who already know the Amir name.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
