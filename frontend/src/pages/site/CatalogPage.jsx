import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

const categories = [
  { name: "All Cuts", image: "/images/amir-protein-hero.png" },
  { name: "Chicken", image: "/images/raw-chicken-plate.png" },
  { name: "Mutton", image: "/images/raw-mutton-plate.png" },
  { name: "Fish & Seafood", image: "/images/fresh-fish-plate.png" },
  { name: "Farm Eggs", image: "/images/fresh-eggs-plate.png" },
];

const products = {
  Chicken: [
    {
      name: "Chicken Curry Cut",
      text: "Fresh everyday cuts for classic Indian cooking.",
      image:
        "https://images.pexels.com/photos/6107734/pexels-photo-6107734.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      name: "Chicken Breast",
      text: "Tender and versatile boneless cuts.",
      image:
        "https://images.pexels.com/photos/13422437/pexels-photo-13422437.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      name: "Chicken Pieces",
      text: "Freshly prepared cuts for everyday meals.",
      image:
        "https://images.pexels.com/photos/6281484/pexels-photo-6281484.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      name: "Fresh Chicken",
      text: "Quality chicken prepared with care.",
      image:
        "https://images.pexels.com/photos/5769380/pexels-photo-5769380.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      name: "Whole Chicken",
      text: "Fresh whole chicken ready for your kitchen.",
      image:
        "https://images.pexels.com/photos/10842246/pexels-photo-10842246.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      name: "Chicken Meat",
      text: "Fresh cuts selected for everyday cooking.",
      image:
        "https://images.pexels.com/photos/6107755/pexels-photo-6107755.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
  ],

  Mutton: [
    {
      name: "Mutton Curry Cut",
      text: "Fresh cuts prepared for rich Indian curries.",
      image:
        "https://images.pexels.com/photos/6281509/pexels-photo-6281509.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      name: "Mutton Chops",
      text: "Tender chops with rich natural flavour.",
      image:
        "https://images.pexels.com/photos/4411696/pexels-photo-4411696.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      name: "Fresh Lamb Cut",
      text: "Fresh meat prepared for everyday meals.",
      image:
        "https://images.pexels.com/photos/31732110/pexels-photo-31732110.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      name: "Premium Mutton",
      text: "Carefully selected cuts for your kitchen.",
      image:
        "https://images.pexels.com/photos/31732115/pexels-photo-31732115.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      name: "Mutton Cuts",
      text: "Fresh cuts with naturally rich flavour.",
      image:
        "https://images.pexels.com/photos/36691281/pexels-photo-36691281.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      name: "Fresh Meat",
      text: "Quality cuts prepared with care.",
      image:
        "https://images.pexels.com/photos/36691295/pexels-photo-36691295.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
  ],

  "Fish & Seafood": [
    {
      name: "Fresh Sea Fish",
      text: "Fresh fish selected for everyday cooking.",
      image:
        "https://images.pexels.com/photos/37092459/pexels-photo-37092459.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      name: "Fresh Fish",
      text: "Freshly sourced fish with natural flavour.",
      image:
        "https://images.pexels.com/photos/3650159/pexels-photo-3650159.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      name: "Seafood Selection",
      text: "A selection of fresh seafood cuts.",
      image:
        "https://images.pexels.com/photos/3903587/pexels-photo-3903587.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      name: "Fresh Fish Market Cut",
      text: "Carefully selected fish prepared fresh.",
      image:
        "https://images.pexels.com/photos/36122229/pexels-photo-36122229.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      name: "Fresh Seafood",
      text: "Quality seafood for your favourite recipes.",
      image:
        "https://images.pexels.com/photos/10727383/pexels-photo-10727383.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      name: "Fish on Ice",
      text: "Fresh fish ready for your kitchen.",
      image:
        "https://images.pexels.com/photos/27553354/pexels-photo-27553354.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
  ],

  "Farm Eggs": [
    {
      name: "Farm Fresh Eggs",
      text: "Fresh eggs selected for everyday meals.",
      image:
        "https://images.pexels.com/photos/30805254/pexels-photo-30805254.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      name: "Country Eggs",
      text: "Fresh eggs with naturally rich yolks.",
      image:
        "https://images.pexels.com/photos/15428991/pexels-photo-15428991.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      name: "Brown Farm Eggs",
      text: "Fresh brown eggs from trusted farms.",
      image:
        "https://images.pexels.com/photos/29802845/pexels-photo-29802845.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      name: "Fresh Egg Selection",
      text: "Naturally fresh eggs for everyday cooking.",
      image:
        "https://images.pexels.com/photos/22764388/pexels-photo-22764388.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      name: "Farm Egg Collection",
      text: "Fresh eggs carefully selected for quality.",
      image:
        "https://images.pexels.com/photos/30805251/pexels-photo-30805251.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      name: "Fresh Eggs",
      text: "Farm-fresh eggs for your everyday kitchen.",
      image:
        "https://images.pexels.com/photos/30805259/pexels-photo-30805259.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
  ],
};

export default function CatalogPage() {
  const [active, setActive] = useState("All Cuts");
  const reduce = useReducedMotion();

  const reveal = (delay = 0, y = 32) => ({
    initial: reduce ? false : { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.8, delay, ease: EASE },
  });

  const visibleProducts =
    active === "All Cuts"
      ? Object.values(products)
          .flat()
          .slice(0, 6)
      : products[active];

  return (
    <main className="min-h-screen bg-white text-[#171719]">

      {/* ================= HEADER ================= */}
      <section className="px-6 pb-10 pt-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-[1320px]">

          <motion.p {...reveal(0, 16)} className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#EC1F36]">
            Fresh Protein Range
          </motion.p>

          <motion.h1 {...reveal(0.1)} className="max-w-3xl text-4xl font-semibold tracking-tight lg:text-6xl">
            Our Farm-Fresh Cuts
          </motion.h1>

          <motion.p {...reveal(0.2, 20)} className="mt-4 max-w-xl text-base leading-7 text-neutral-500">
            Carefully selected cuts, prepared fresh for everyday cooking.
          </motion.p>

        </div>
      </section>


      {/* ================= PROMO + CATEGORIES ================= */}
      <section className="px-6 pb-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-[1320px] gap-5 lg:grid-cols-[0.7fr_1.8fr]">

          {/* PROMO */}
          <motion.div {...reveal(0, 40)} className="flex min-h-[170px] flex-col justify-between rounded-[24px] bg-[#EC1F36] p-6 text-white lg:p-7">

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                Legacy of Freshness
              </p>

              <h2 className="mt-3 max-w-xs text-2xl font-semibold leading-tight">
                Fresh cuts, honest quality every day.
              </h2>
            </div>

            <Link
  to="/get-a-quote"
  className="mt-5 inline-flex w-fit items-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#EC1F36] transition hover:bg-neutral-100"
>
  Contact Now →
</Link>

          </motion.div>


          {/* CATEGORIES */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">

            {categories.map((category, i) => {
              return (
                <motion.button
                  key={category.name}
                  {...reveal(0.1 + i * 0.08, 40)}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setActive(category.name)}
                  className="group flex min-h-[210px] flex-col items-center justify-center rounded-[26px] border border-neutral-200 bg-[#FAFAFA] p-4 text-center transition-all duration-300 hover:border-[#EC1F36] hover:bg-[#FFF4F5] hover:shadow-lg hover:shadow-[#EC1F36]/10"
                >
                  <div className="mb-4 h-28 w-28 overflow-hidden rounded-full bg-white ring-2 ring-transparent ring-offset-2 transition-all duration-500 group-hover:scale-105 group-hover:ring-[#EC1F36]"
                  >
                    <img
                      src={category.image}
                      alt={category.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <span className="max-w-[120px] text-sm font-semibold leading-5 text-[#171719] transition-colors duration-300 group-hover:text-[#EC1F36]">
                    {category.name}
                  </span>
                </motion.button>
              );
            })}

          </div>
        </div>
      </section>


      {/* ================= PRODUCTS ================= */}
      <section className="px-6 pb-24 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-[1320px]">

          {/* SECTION TITLE */}
          <motion.div {...reveal()} className="mx-auto mb-8 max-w-[1320px]">

            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-400">
              {active}
            </p>

            <h2 className="mt-2 text-3xl font-semibold tracking-tight lg:text-4xl">
              Freshly <span className="text-[#EC1F36]">prepared</span>
            </h2>

          </motion.div>


          {/* PRODUCT GRID */}
          <div key={active} className="mx-auto grid max-w-[1320px] gap-x-6 gap-y-9 md:grid-cols-2 lg:grid-cols-3">

            {visibleProducts.map((product, i) => (
              <motion.article
                key={product.name}
                {...reveal((i % 3) * 0.1, 48)}
                className="group"
              >
                <div className="relative aspect-[16/11] overflow-hidden rounded-[22px] bg-neutral-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-neutral-700 backdrop-blur">
                    Fresh
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 px-1 pt-4">
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold tracking-tight">
                      {product.name}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-neutral-500">
                      {product.text}
                    </p>
                  </div>

                  <Link
                    to="/get-a-quote"
                    aria-label={`Order ${product.name}`}
                    className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#EC1F36] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#c9172d]"
                  >
                    Order Now
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </motion.article>
            ))}

          </div>

        </div>
      </section>

    </main>
  );
}