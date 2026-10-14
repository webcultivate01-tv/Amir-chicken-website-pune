import { motion, useReducedMotion } from "framer-motion";

const stats = [
  {
    number: "35+",
    label: "Years of Experience",
    description: "A legacy of commitment built since 1991.",
  },
  {
    number: "600+",
    label: "Retail Stores",
    description: "An expanding network serving customers.",
  },
  {
    number: "2,500+",
    label: "People Engaged",
    description: "People connected through the AMIR journey.",
  },
];

export default function AmirNumbers() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-[#F5F3F0] px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1480px]">

        {/* Section heading */}
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#EC1F36]">
              AMIR in Numbers
            </p>

            <h2 className="mt-4 max-w-2xl font-seasons text-4xl font-medium leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
              A legacy built on{" "}
              <span className="text-[#EC1F36]">trust.</span>
            </h2>
          </div>

          <p className="max-w-md text-sm leading-7 text-neutral-500 lg:justify-self-end">
            Decades of experience, a growing retail network and
            thousands of people connected through the AMIR journey.
          </p>
        </div>

        {/* Three equal-sized cards */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((item, index) => (
            <motion.article
              key={item.label}
              initial={
                reduceMotion ? false : { opacity: 0, y: 24 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: reduceMotion ? 0 : 0.6,
                delay: reduceMotion ? 0 : index * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={reduceMotion ? undefined : { y: -4 }}
              className="group relative flex min-h-[260px] flex-col overflow-hidden rounded-2xl border border-neutral-200/80 bg-white p-7 shadow-sm transition-shadow duration-300 hover:shadow-lg sm:p-8"
            >
              <div className="flex items-center justify-between">
                <span className="h-1 w-10 rounded-full bg-[#EC1F36]" />

                <span className="text-xs font-semibold tracking-[0.15em] text-neutral-300">
                  0{index + 1}
                </span>
              </div>

              <p className="mt-10 font-seasons text-5xl font-medium tracking-[-0.05em] text-[#281719] sm:text-6xl">
                {item.number}
              </p>

              <h3 className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#8F1525]">
                {item.label}
              </h3>

              <p className="mt-3 text-sm leading-6 text-neutral-500">
                {item.description}
              </p>

              <div className="pointer-events-none absolute -bottom-10 -right-10 h-28 w-28 rounded-full border border-[#EC1F36]/10 transition-transform duration-500 group-hover:scale-125" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}