import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LayoutGrid,
  Drumstick,
  Beef,
  Fish,
  Egg,
} from "lucide-react";

const categories = [
  { name: "All Cuts", icon: LayoutGrid },
  { name: "Chicken", icon: Drumstick },
  { name: "Mutton", icon: Beef },
  { name: "Fish & Seafood", icon: Fish },
  { name: "Farm Eggs", icon: Egg },
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

  const visibleProducts =
    active === "All Cuts"
      ? Object.values(products)
          .flat()
          .slice(0, 6)
      : products[active];

  return (
    <main className="min-h-screen bg-white text-[#171719]">

      {/* ================= HEADER ================= */}
      <section className="px-6 pb-10 pt-20 lg:px-12">
        <div className="mx-auto max-w-[1450px]">

          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#EC1F36]">
            Fresh Protein Range
          </p>

          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight lg:text-6xl">
            Our Farm-Fresh Cuts
          </h1>

          <p className="mt-4 max-w-xl text-base leading-7 text-neutral-500">
            Carefully selected cuts, prepared fresh for everyday cooking.
          </p>

        </div>
      </section>


      {/* ================= PROMO + CATEGORIES ================= */}
      <section className="px-6 pb-16 lg:px-12">
        <div className="mx-auto grid max-w-[1450px] gap-5 lg:grid-cols-[0.75fr_1.8fr]">

          {/* PROMO */}
          <div className="flex min-h-[210px] flex-col justify-between rounded-[28px] bg-[#EC1F36] p-8 text-white lg:p-9">

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                Legacy of Freshness
              </p>

              <h2 className="mt-4 max-w-sm text-3xl font-semibold leading-tight">
                Fresh cuts, honest quality every day.
              </h2>
            </div>

            <Link
  to="/get-a-quote"
  className="mt-7 inline-flex w-fit items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#EC1F36] transition hover:bg-neutral-100"
>
  Get a Quote →
</Link>

          </div>


          {/* CATEGORIES */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">

            {categories.map((category) => {
              const Icon = category.icon;
              const selected = active === category.name;

              return (
                <button
                  key={category.name}
                  onClick={() => setActive(category.name)}
                  className={`group flex min-h-[210px] flex-col items-center justify-center rounded-[26px] border p-4 text-center transition-all duration-300 ${
                    selected
                      ? "border-[#EC1F36] bg-[#FFF4F5]"
                      : "border-neutral-200 bg-[#FAFAFA] hover:border-[#EC1F36]/40 hover:bg-[#FFF8F8]"
                  }`}
                >

                  {/* CATEGORY ICON */}
                  <div
                    className={`mb-5 flex h-20 w-20 items-center justify-center rounded-full transition-all duration-300 ${
                      selected
                        ? "bg-[#EC1F36] text-white shadow-md shadow-[#EC1F36]/20"
                        : "bg-[#F3E8E9] text-[#EC1F36] group-hover:bg-[#EC1F36] group-hover:text-white"
                    }`}
                  >
                    <Icon
                      strokeWidth={1.7}
                      className="h-8 w-8"
                    />
                  </div>

                  <span className="max-w-[120px] text-sm font-semibold leading-5">
                    {category.name}
                  </span>

                </button>
              );
            })}

          </div>
        </div>
      </section>


      {/* ================= PRODUCTS ================= */}
      <section className="px-6 pb-24 lg:px-12">
        <div className="mx-auto max-w-[1450px]">

          {/* SECTION TITLE */}
          <div className="mb-8">

            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#EC1F36]">
              {active}
            </p>

            <h2 className="mt-2 text-3xl font-semibold tracking-tight lg:text-4xl">
              Freshly prepared
            </h2>

          </div>


          {/* PRODUCT GRID */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {visibleProducts.map((product) => (
              <article
                key={product.name}
                className="group overflow-hidden rounded-[28px] border border-neutral-200 bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
              >

                {/* IMAGE */}
                <div className="aspect-[4/3] overflow-hidden bg-neutral-100">

                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />

                </div>


                {/* CONTENT */}
                <div className="p-6">

                  <h3 className="text-xl font-semibold">
                    {product.name}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-neutral-500">
                    {product.text}
                  </p>

                </div>

              </article>
            ))}

          </div>

        </div>
      </section>

    </main>
  );
}