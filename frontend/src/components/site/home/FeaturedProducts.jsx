import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";

// Bundled WebP product photos (images/products/<category>/<name>.webp)
const productImages = import.meta.glob("../../../../images/products/*/*.webp", {
  eager: true,
  import: "default",
});
const photo = (folder, file) =>
  productImages[`../../../../images/products/${folder}/${file}.webp`];

const EASE = [0.22, 1, 0.36, 1];

const featured = [
  {
    name: "Chicken Breast Boneless",
    category: "Chicken",
    text: "Lean, tender boneless breast for grills and curries.",
    image: photo("chicken", "Chicken Breast Boneless"),
    tint: "from-[#FFF1F2] to-[#FFE0E3]",
  },
  {
    name: "Chicken Lollipop",
    category: "Chicken",
    text: "Party-ready wings, cleaned and trimmed to perfection.",
    image: photo("chicken", "Chicken Lollipop"),
    tint: "from-[#FFF6EC] to-[#FFE6CC]",
  },
  {
    name: "Mutton Curry Cut",
    category: "Mutton",
    text: "Fresh bone-in pieces cut for slow, rich curries.",
    image: photo("mutton", "Mutton Curry Cut"),
    tint: "from-[#FDEFEF] to-[#F6D3D6]",
  },
  {
    name: "Whole Chicken Without Skin",
    category: "Chicken",
    text: "Fresh, skinless and ready for any family recipe.",
    image: photo("chicken", "Whole Chicken WithOut Skin"),
    tint: "from-[#F4F4F5] to-[#E7E7EA]",
  },
];

function ProductCard({ product, index, reduce }) {
  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay: index * 0.12, ease: EASE }}
      className="group"
    >
      <Link
        to="/contact"
        className="flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-neutral-200/80 bg-white transition-all duration-500 hover:-translate-y-2 hover:border-[#EC1F36]/30 hover:shadow-[0_28px_60px_-24px_rgba(236,31,54,0.35)]"
      >
        <div
          className={`relative aspect-[4/3.4] overflow-hidden bg-gradient-to-br ${product.tint}`}
        >
          <span className="absolute left-4 top-4 z-10 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#EC1F36] backdrop-blur">
            {product.category}
          </span>

          <div className="absolute -bottom-10 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-white/60 blur-2xl" />

          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="relative h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-rotate-1"
          />
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="text-xl font-semibold tracking-tight text-[#171719]">
            {product.name}
          </h3>

          <p className="mt-2 flex-1 text-[15px] leading-6 text-neutral-500">
            {product.text}
          </p>

          <span className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-[#EC1F36] px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-300 group-hover:bg-[#171719]">
            Order now
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-300 group-hover:translate-x-1.5"
            >
              →
            </span>
          </span>
        </div>
      </Link>
    </motion.article>
  );
}

export default function FeaturedProducts() {
  const reduce = useReducedMotion();

  return (
    <section
      aria-label="Featured products"
      className="relative overflow-hidden bg-[#FBF8F7] px-4 py-20 sm:px-8 lg:px-16 lg:py-28"
    >
      <div className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-[#EC1F36]/[0.06] blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-[#EC1F36]/[0.05] blur-3xl" />

      <div className="relative mx-auto max-w-[1480px]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#EC1F36]">
              Featured Products
            </p>

            <h2 className="mt-4 text-5xl font-semibold leading-[0.95] tracking-[-0.05em] text-[#171719] sm:text-6xl">
              Customer favourites,
              <br />
              <span className="text-[#EC1F36]">picked fresh.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
            className="max-w-md"
          >
            <p className="text-base leading-7 text-neutral-500">
              The cuts our customers reach for most, handled with care and
              delivered fresh from our stores.
            </p>

            <Link
              to="/catalog"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#171719] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#EC1F36]"
            >
              Shop all products <span aria-hidden="true">↗</span>
            </Link>
          </motion.div>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product, index) => (
            <ProductCard
              key={product.name}
              product={product}
              index={index}
              reduce={reduce}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
