
import { motion } from "framer-motion";

const stats = [
  {
    id: "experience",
    eyebrow: "OUR JOURNEY",
    number: "35+",
    label: "Years of Experience",
    description:
      "Since 1991, Amir Chicken has built its journey around quality, freshness, and the trust of its customers.",
    image: "/images/years35exp.png",
    alt: "Amir Chicken heritage artwork",
    imageSide: "right",
    textAlign: "right",
  },
  {
    id: "stores",
    eyebrow: "OUR REACH",
    number: "600+",
    label: "Retail Stores",
    description:
      "A growing retail presence bringing fresh poultry and trusted service closer to the communities we serve.",
    image: "/images/amir-storefront.png",
    alt: "Amir Chicken retail storefront",
    imageSide: "left",
    textAlign: "left",
  },
  {
    id: "people",
    eyebrow: "OUR PEOPLE",
    number: "2,500+",
    label: "People Engaged",
    description:
      "Behind every store is a network of people whose work helps bring our products and service to customers.",
    image: "/images/amir-team.png",
    alt: "Amir Chicken team working together",
    imageSide: "right",
    textAlign: "right",
  },
];

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

function StatBlock({ stat, index }) {
  const image = (
    <motion.div
      variants={reveal}
      className="relative flex items-center justify-center overflow-hidden rounded-sm bg-white"
    >
      <img
        src={stat.image}
        alt={stat.alt}
        loading={index === 0 ? "eager" : "lazy"}
        className="h-auto w-full object-contain"
      />

      <span className="absolute bottom-4 left-4 bg-white/95 px-3 py-2 text-xs tracking-[0.2em] text-neutral-800">
        AMIR CHICKEN
      </span>
    </motion.div>
  );

  const content = (
    <motion.div
      variants={reveal}
      className={`flex flex-col justify-center py-4 lg:py-8 ${
        stat.textAlign === "right"
          ? "items-end text-right lg:pr-8"
          : "items-start text-left lg:pr-8"
      }`}
    >
      <p className="mb-5 text-xs font-medium tracking-[0.24em] text-[#EC1F36]">
        {stat.eyebrow}
      </p>

      <p className="font-serif text-5xl font-light leading-none tracking-tight text-neutral-950 sm:text-6xl lg:text-7xl">
        {stat.number}
      </p>

      <h3 className="mt-3 font-serif text-xl font-medium tracking-tight text-neutral-900 sm:text-2xl">
        {stat.label}
      </h3>

      <div className="my-5 h-px w-14 bg-[#EC1F36]" />

      <p className="max-w-md text-sm leading-7 text-neutral-600 sm:text-base sm:leading-8">
        {stat.description}
      </p>
    </motion.div>
  );

  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      className="grid grid-cols-1 items-center gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-8"
    >
      {stat.imageSide === "right" ? (
        <>
          {content}
          {image}
        </>
      ) : (
        <>
          {image}
          {content}
        </>
      )}
    </motion.article>
  );
}

export default function AmirNumbers() {
  return (
    <section
      id="our-story"
      className="bg-[#F7F4F0] px-5 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <motion.header
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          className="mb-14 max-w-4xl sm:mb-20 lg:mb-24"
        >
          <p className="mb-5 text-xs font-semibold tracking-[0.24em] text-[#EC1F36]">
            OUR STORY
          </p>

          <h2 className="font-serif text-4xl font-medium leading-[1.12] tracking-tight text-[#271719] sm:text-5xl lg:text-7xl">
            Quality built over
            <br />
            <span className="text-[#EC1F36]">
              generations.
            </span>
          </h2>
        </motion.header>

        <div className="space-y-16 sm:space-y-20 lg:space-y-28">
          {stats.map((stat, index) => (
            <StatBlock key={stat.id} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
