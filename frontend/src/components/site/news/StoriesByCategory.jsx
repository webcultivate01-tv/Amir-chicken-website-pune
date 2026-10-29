import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import rawChickenPlate from "../../../../images/raw-chicken-plate.png";
import rawMuttonPlate from "../../../../images/raw-mutton-plate.png";
import freshFishPlate from "../../../../images/fresh-fish-plate.png";
import freshEggsPlate from "../../../../images/fresh-eggs-plate.png";

const categories = [
  {
    number: "01",
    name: "Chicken",
    slug: "chicken",
    image: rawChickenPlate,
    text: "Fresh chicken, cleaned and cut daily for curries, grills and everyday meals.",
  },
  {
    number: "02",
    name: "Mutton",
    slug: "mutton",
    image: rawMuttonPlate,
    text: "Tender, bone-in and boneless mutton cuts, selected for freshness and consistency.",
  },
  {
    number: "03",
    name: "Fish",
    slug: "fish",
    image: freshFishPlate,
    text: "Fresh fish and seafood, handled with care from selection to your table.",
  },
  {
    number: "04",
    name: "Eggs",
    slug: "eggs",
    image: freshEggsPlate,
    text: "Farm-fresh eggs, a daily essential in every Amir household.",
  },
];

const EASE = [0.22, 1, 0.36, 1];

export default function StoriesByCategory() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const current = categories[active];

  return (
    <section className="bg-[#FBF8F7] px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1480px]">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#EC1F36]">
            Stories by Category
          </p>
          <h2 className="mt-3 font-seasons text-4xl font-medium leading-[1.05] tracking-[-0.03em] text-[#171719] sm:text-5xl">
            More Than Just Meat
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,360px)_1fr] lg:gap-16">
          <ul className="border-t border-neutral-200">
            {categories.map((category, index) => {
              const isActive = index === active;
              return (
                <li key={category.slug} className="border-b border-neutral-200">
                  <button
                    type="button"
                    onMouseEnter={() => setActive(index)}
                    onFocus={() => setActive(index)}
                    onClick={() => setActive(index)}
                    className="group flex w-full items-center gap-5 py-4 text-left"
                  >
                    <span className={`text-sm font-semibold tracking-[0.2em] transition ${isActive ? "text-[#EC1F36]" : "text-neutral-400"}`}>
                      {category.number}
                    </span>
                    <span className={`flex-1 text-xl font-semibold tracking-tight transition-all duration-300 group-hover:text-[#EC1F36] ${isActive ? "translate-x-2 text-[#171719]" : "text-neutral-400"}`}>
                      {category.name}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="relative overflow-hidden rounded-[28px] bg-white shadow-[0_20px_60px_-30px_rgba(23,23,25,0.25)]">
            <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#801821]/[0.06] blur-3xl" />

            <div key={current.slug} className="relative flex flex-col sm:flex-row sm:items-center">
              <div className="flex aspect-[4/3] w-full items-center justify-center p-6 sm:w-1/2 sm:aspect-square">
                <img
                  src={current.image}
                  alt={`Fresh ${current.name.toLowerCase()} from Amir`}
                  loading="lazy"
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="flex flex-1 flex-col p-6 sm:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#801821]">
                  {current.number} / Fresh Cut
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-[#171719] sm:text-3xl">
                  {current.name}
                </h3>
                <p className="mt-3 max-w-sm text-base leading-7 text-neutral-500">
                  {current.text}
                </p>

                <Link
                  to={`/catalog?category=${current.slug}`}
                  className="group mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-[#EC1F36] px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#171719]"
                >
                  Explore products
                  <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </div>

            <div className="relative flex gap-1.5 px-6 pb-6 sm:px-10">
              {categories.map((category, index) => (
                <span
                  key={category.slug}
                  className={`h-1 rounded-full transition-all duration-300 ${index === active ? "w-8 bg-[#EC1F36]" : "w-3 bg-neutral-200"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
