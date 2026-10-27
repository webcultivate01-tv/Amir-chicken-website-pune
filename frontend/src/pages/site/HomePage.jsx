import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeroSection from "../../components/site/home/HeroSection";
import BrandStatement from "../../components/site/home/BrandStatement";
import AmirNumbers from "../../components/site/home/AmirNumbers";
import PlateShowcase from "../../components/site/home/PlateShowcase";
import FeaturedProducts from "../../components/site/home/FeaturedProducts";
import TransformationSection from "../../components/site/home/TransformationSection";
import oneAmir from "../../../images/oneAmir.png";
import techBilling from "../../../images/tech/billing.jpg";
import techEcommerce from "../../../images/tech/ecommerce.jpg";
import techTracking from "../../../images/tech/tracking.jpg";
import techMonitoring from "../../../images/tech/monitoring.jpg";
import techSupport from "../../../images/tech/support.jpg";
import techMobile from "../../../images/tech/mobile.jpg";
import techDelivery from "../../../images/tech/delivery.jpg";

/* =========================================================
   ICONS
========================================================= */

const Icon = ({ type }) => {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.7",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "h-6 w-6",
  };

  const icons = {
    experience: (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),

    stores: (
      <svg {...common}>
        <path d="M4 10h16v10H4z" />
        <path d="M3 10l2-6h14l2 6" />
        <path d="M8 14h3v6H8z" />
        <path d="M15 14h2" />
      </svg>
    ),

    people: (
      <svg {...common}>
        <circle cx="9" cy="8" r="3" />
        <circle cx="17" cy="9" r="2.5" />
        <path d="M3 19c0-3 2.5-5 6-5s6 2 6 5" />
        <path d="M15 14c3 0 5 1.7 5 4" />
      </svg>
    ),

    customers: (
      <svg {...common}>
        <circle cx="12" cy="8" r="3" />
        <path d="M5 20c.7-3.4 3-5 7-5s6.3 1.6 7 5" />
        <path d="M4 8h2M18 8h2M12 3v2" />
      </svg>
    ),

    money: (
      <svg {...common}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <circle cx="12" cy="12" r="3" />
        <path d="M7 9h.01M17 15h.01" />
      </svg>
    ),

    weight: (
      <svg {...common}>
        <path d="M7 7h10l2 13H5L7 7z" />
        <path d="M9 7a3 3 0 0 1 6 0" />
        <path d="M12 11v4" />
        <path d="M10 13h4" />
      </svg>
    ),

    eggs: (
      <svg {...common}>
        <path d="M12 3c-3 3-5 7-5 11a5 5 0 0 0 10 0c0-4-2-8-5-11z" />
      </svg>
    ),

    vehicle: (
      <svg {...common}>
        <path d="M3 7h11v9H3z" />
        <path d="M14 10h4l3 3v3h-7z" />
        <circle cx="7" cy="18" r="2" />
        <circle cx="18" cy="18" r="2" />
      </svg>
    ),

    employee: (
      <svg {...common}>
        <circle cx="12" cy="8" r="3" />
        <path d="M6 21v-2a6 6 0 0 1 12 0v2" />
        <path d="M9 3h6" />
      </svg>
    ),

    identity: (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="M8 12h8M12 8v8" />
      </svg>
    ),

    hygiene: (
      <svg {...common}>
        <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),

    procurement: (
      <svg {...common}>
        <path d="M4 5h16v14H4z" />
        <path d="M8 9h8M8 13h5" />
      </svg>
    ),

    training: (
      <svg {...common}>
        <path d="M4 5h16v12H4z" />
        <path d="M8 21h8" />
        <path d="M12 17v4" />
      </svg>
    ),

    marketing: (
      <svg {...common}>
        <path d="M4 11v2" />
        <path d="M7 9l10-4v14L7 15z" />
        <path d="M7 15l2 5h3l-2-5" />
      </svg>
    ),

    technology: (
      <svg {...common}>
        <rect x="4" y="5" width="16" height="12" rx="2" />
        <path d="M8 21h8M12 17v4" />
        <path d="M8 10h8M8 13h5" />
      </svg>
    ),

    ecommerce: (
      <svg {...common}>
        <path d="M4 5h2l2 10h9l2-7H7" />
        <circle cx="10" cy="19" r="1.5" />
        <circle cx="17" cy="19" r="1.5" />
      </svg>
    ),

    tracking: (
      <svg {...common}>
        <circle cx="12" cy="10" r="3" />
        <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0z" />
      </svg>
    ),

    support: (
      <svg {...common}>
        <path d="M4 13a8 8 0 0 1 16 0v4" />
        <path d="M4 16h3v4H4zM17 16h3v4h-3z" />
        <path d="M17 20h-4" />
      </svg>
    ),

    mobile: (
      <svg {...common}>
        <rect x="7" y="3" width="10" height="18" rx="2" />
        <path d="M10 6h4M11 18h2" />
      </svg>
    ),
  };

  return icons[type] || icons.technology;
};


/* =========================================================
   DATA
========================================================= */

const stats = [
  {
    number: "35+",
    label: "Years of Experience",
    icon: "experience",
  },
  {
    number: "580+",
    label: "Retail Stores",
    icon: "stores",
  },
  {
    number: "2500+",
    label: "People Engaged",
    icon: "people",
  },
  {
    number: "10L+",
    label: "Loyal Customers",
    icon: "customers",
  },
  {
    number: "₹75 Cr",
    label: "Annual Turnover",
    icon: "money",
  },
  {
    number: "6.85L kg",
    label: "Monthly Broiler Sales",
    icon: "weight",
  },
  {
    number: "22L",
    label: "White Eggs Sold Monthly",
    icon: "eggs",
  },
  {
    number: "120",
    label: "Company-Run Stores",
    icon: "stores",
  },
  {
    number: "35",
    label: "Company & Director-Owned Vehicles",
    icon: "vehicle",
  },
  {
    number: "95",
    label: "Skilled Core Employees",
    icon: "employee",
  },
];


const growthSystem = [
  {
    number: "01",
    image: techBilling,
    title: "Centralised Billing",
    icon: "money",
    text: "Smarter control across the retail network.",
  },
  {
    number: "02",
    image: techEcommerce,
    title: "E-Commerce",
    icon: "ecommerce",
    text: "Digital channels that bring AMIR closer to customers.",
  },
  {
    number: "03",
    image: techTracking,
    title: "Vehicle Tracking",
    icon: "tracking",
    text: "Better visibility across the delivery ecosystem.",
  },
  {
    number: "04",
    image: techMonitoring,
    title: "Franchise Monitoring",
    icon: "technology",
    text: "More connected operations across locations.",
  },
  {
    number: "05",
    image: techSupport,
    title: "Customer Support",
    icon: "support",
    text: "Systems designed around a better customer experience.",
  },
  {
    number: "06",
    image: techMobile,
    title: "Mobile Ordering",
    icon: "mobile",
    text: "Making ordering simpler and more accessible.",
  },
  {
    number: "07",
    image: techDelivery,
    title: "Rapid Home Delivery",
    icon: "tracking",
    text: "Connecting the retail network to modern customer expectations.",
  },
];


const proteinCategories = [
  {
    title: "Chicken",
    text: "Fresh cuts prepared for everyday meals.",
    image:
      "https://images.pexels.com/photos/6107735/pexels-photo-6107735.jpeg",
  },
  {
    title: "Mutton",
    text: "Quality cuts for rich, traditional cooking.",
    image:
      "https://images.pexels.com/photos/65175/pexels-photo-65175.jpeg?auto=compress&cs=tinysrgb&w=1000",
  },
  {
    title: "Fish & Seafood",
    text: "Fresh selections for every kind of table.",
    image:
      "https://images.pexels.com/photos/18072772/pexels-photo-18072772.jpeg",
  },
  {
    title: "Farm Eggs",
    text: "Everyday essentials from a trusted source.",
    image:
      "https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg?auto=compress&cs=tinysrgb&w=1000",
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


/* =========================================================
   HOME PAGE
========================================================= */

/* =========================================================
   TECHNOLOGY-LED GROWTH (interactive)
========================================================= */

function TechnologyGrowth() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return undefined;
    const id = setInterval(
      () => setActive((i) => (i + 1) % growthSystem.length),
      4000
    );
    return () => clearInterval(id);
  }, [paused]);

  const current = growthSystem[active];

  return (
    <section className="bg-white px-6 py-20 sm:px-12 lg:px-24 lg:py-24 xl:px-32">

      <div className="mx-auto max-w-[1480px]">

        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-16">

          <div>

            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#EC1F36]">
              Technology-Led Growth
            </p>

            <h2 className="mt-4 whitespace-nowrap text-5xl font-semibold leading-none tracking-[-0.05em] text-[#171719] sm:text-6xl lg:text-7xl">
              Growing smarter.
            </h2>

          </div>

          <p className="max-w-xl text-lg leading-8 text-neutral-500">
            AMIR's next phase brings technology into the everyday
            operations of the business — from billing and ordering to
            logistics and customer support.
          </p>

        </div>

        <div
          className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,480px)_500px] lg:justify-between lg:gap-10"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >

          {/* capability list */}
          <ul className="border-t border-neutral-200">

            {growthSystem.map((item, index) => {
              const isActive = index === active;
              return (
                <li key={item.title} className="border-b border-neutral-200">
                  <button
                    type="button"
                    onMouseEnter={() => setActive(index)}
                    onFocus={() => setActive(index)}
                    onClick={() => setActive(index)}
                    className="group flex w-full items-center gap-5 py-3.5 text-left"
                  >
                    <span className={`text-sm font-semibold tracking-[0.2em] transition ${isActive ? "text-[#EC1F36]" : "text-neutral-400"}`}>
                      {item.number}
                    </span>
                    <span className={`flex-1 text-lg font-semibold tracking-tight transition-all duration-300 group-hover:text-[#EC1F36] ${isActive ? "translate-x-2 text-[#171719]" : "text-neutral-400"}`}>
                      {item.title}
                    </span>
                  </button>
                </li>
              );
            })}

          </ul>

          {/* detail panel */}
          <div className="self-start">

            <div key={active} className="animate-[fadeUp_0.45s_ease-out]">

              <div className="relative h-64 overflow-hidden rounded-[24px] sm:h-80 lg:h-[330px]">

                <img
                  src={current.image}
                  alt={current.title}
                  className="h-full w-full object-cover"
                />

                <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#EC1F36] text-white shadow-lg">
                  <Icon type={current.icon} />
                </div>

              </div>

              <h3 className="mt-5 text-2xl font-semibold tracking-tight text-[#171719]">
                {current.title}
              </h3>

              <p className="mt-1.5 max-w-md text-base leading-7 text-neutral-500">
                {current.text}
              </p>

            </div>

            <div className="mt-4 flex gap-1.5">
              {growthSystem.map((item, index) => (
                <span
                  key={item.title}
                  className={`h-1 rounded-full transition-all duration-300 ${index === active ? "w-8 bg-[#EC1F36]" : "w-3 bg-neutral-200"}`}
                />
              ))}
            </div>

          </div>

        </div>

      </div>

      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}`}</style>

    </section>
  );
}


export default function HomePage() {
  return (
    <main className="bg-white text-[#171719]">

      <HeroSection />

      <BrandStatement />

      <PlateShowcase />

      <FeaturedProducts />

      <AmirNumbers />


      {/* =====================================================
          2016 TRANSFORMATION — REDESIGNED
      ====================================================== */}

      <TransformationSection />


      {/* =====================================================
          FRANCHISE NETWORK
      ====================================================== */}

      <section className="px-4 py-4 sm:px-8 lg:px-16">

        <div className="relative mx-auto max-w-[1480px] overflow-hidden rounded-[2rem] bg-[#EC1F36] px-6 py-16 text-white sm:px-12 lg:rounded-[2.5rem] lg:px-16 lg:py-24">

          {/* soft decorative glows */}
          <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-[#8F1525]/40 blur-3xl" />

          <div className="relative grid gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">

            <div>

              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">
                Franchise Network
              </p>

              <h2 className="mt-4 text-5xl font-semibold leading-[0.92] tracking-[-0.05em] sm:text-6xl">
                A system
                <br />
                built to grow.
              </h2>

              <p className="mt-6 max-w-md text-base leading-7 text-white/70">
                AMIR enables franchise partners through brand recognition,
                reliable procurement, tested retail formats and operational
                support.
              </p>

              <Link
                to="/get-a-quote"
                className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-base font-semibold text-[#EC1F36] transition hover:bg-[#281719] hover:text-white"
              >
                Enquire With Us
                <Arrow />
              </Link>

            </div>


            <div className="grid gap-3 sm:grid-cols-2">

              {[
                "Brand Recognition",
                "Reliable Procurement",
                "Tested Retail Formats",
                "Operational Guidance",
                "Product Diversity",
                "Marketing Support",
                "Established Customer Trust",
              ].map((point, index, list) => (
                <div
                  key={point}
                  className={`group flex items-center gap-4 rounded-2xl bg-white/[0.06] px-5 py-5 ring-1 ring-inset ring-white/25 transition duration-300 hover:bg-white/[0.06] hover:ring-2 hover:ring-white ${
                    index === list.length - 1 ? "sm:col-span-2" : ""
                  }`}
                >

                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-sm font-bold text-[#EC1F36]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="text-base font-semibold tracking-tight">
                    {point}
                  </span>

                </div>
              ))}

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          TECHNOLOGY-LED GROWTH — REDESIGNED
      ====================================================== */}

      <TechnologyGrowth />


      {/* =====================================================
          LEGACY / NEXT CHAPTER
      ====================================================== */}

      <section className="relative overflow-hidden bg-[#281719] text-white lg:h-[80vh] lg:min-h-[560px] lg:max-h-[820px]">

        {/* artwork pinned right at full section height, with the same side margin as the text on the left; both dark edges fade into the theme color */}
        <img
          src={oneAmir}
          alt="AMIR store and network across Maharashtra"
          className="block w-full lg:absolute lg:inset-y-0 lg:right-[max(4rem,calc((100%-1480px)/2+4rem))] lg:h-full lg:w-auto lg:max-w-none lg:[mask-image:linear-gradient(to_right,transparent,black_30%,black_94%,transparent)]"
        />

        <div className="relative mx-auto flex max-w-[1480px] items-center px-6 py-14 sm:px-10 lg:h-full lg:px-16 lg:py-0">

          <div className="max-w-xl">

            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#FFB800]">
              Legacy Ready for Its Next Chapter
            </p>

            <h2 className="mt-4 text-5xl font-semibold leading-[0.92] tracking-[-0.05em] sm:text-6xl">
              From one store
              <br />
              to a growing network.
            </h2>

            <p className="mt-7 max-w-md text-base leading-7 text-white/60">
              From one store in 1991 to a network supporting thousands of
              people, AMIR's journey has been built on freshness, fair trade
              and entrepreneurship.
            </p>

            <Link
              to="/about"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#EC1F36] px-7 py-3.5 text-base font-semibold text-white transition hover:bg-white hover:text-[#EC1F36]"
            >
              Discover Our Story
              <Arrow />
            </Link>

          </div>

        </div>

      </section>


      {/* =====================================================
          PROTEIN RANGE
      ====================================================== */}

      <section className="relative overflow-hidden bg-[#F5F3F0] px-6 py-20 text-[#171719] sm:px-10 lg:px-16 lg:py-28">

        <div className="relative mx-auto w-full max-w-[1480px]">

          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">

            <div>

              <div className="inline-flex items-center gap-3">
                <span className="h-[3px] w-10 bg-[#EC1F36]" />
                <p className="font-poppins text-[13px] font-semibold uppercase tracking-[0.22em] text-[#171719]/60">
                  Fresh Protein Range
                </p>
              </div>

              <h2 className="mt-6 font-seasons text-[48px] leading-[0.95] tracking-[-0.03em] sm:text-[72px] lg:text-[104px]">
                What's on <span className="italic text-[#EC1F36]">the table?</span>
              </h2>

            </div>

            <div className="max-w-[360px]">

              <p className="font-poppins text-[15px] leading-[1.8] text-[#171719]/65">
                Four categories. One standard. Sourced, handled and delivered
                with the same care since 1991.
              </p>

              <Link
                to="/catalog"
                className="mt-6 inline-flex h-14 items-center gap-3 rounded-lg bg-[#EC1F36] px-8 font-poppins text-[14px] font-bold uppercase tracking-[0.14em] text-white transition-all duration-300 hover:bg-white hover:text-[#EC1F36]"
              >
                View Full Range
                <Arrow />
              </Link>

            </div>

          </div>


          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">

            {proteinCategories.map((item, i) => (
              <Link
                key={item.title}
                to="/catalog"
                className="group block aspect-[4/5] [perspective:1200px] lg:aspect-auto lg:h-[420px]"
              >

                <div className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">

                  {/* FRONT */}
                  <div className="absolute inset-0 overflow-hidden rounded-xl bg-neutral-900 [backface-visibility:hidden]">

                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute inset-0 h-full w-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />

                    <span className="absolute left-6 top-6 font-seasons text-[44px] leading-none text-white/80">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <div className="absolute inset-x-0 bottom-0 p-6 lg:p-7">
                      <h3 className="font-seasons text-[32px] leading-[1.05] tracking-[-0.02em] text-white lg:text-[36px]">
                        {item.title}
                      </h3>
                    </div>

                  </div>

                  {/* BACK */}
                  <div className="absolute inset-0 overflow-hidden rounded-xl bg-neutral-900 [backface-visibility:hidden] [transform:rotateY(180deg)]">

                    <img
                      src={item.image}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover"
                    />

                    <div className="absolute inset-0 bg-black/75" />

                    <span className="absolute left-6 top-6 font-seasons text-[44px] leading-none text-white/80">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <div className="absolute inset-x-0 bottom-0 p-6 lg:p-7">

                      <h3 className="font-seasons text-[32px] leading-[1.05] tracking-[-0.02em] text-white lg:text-[36px]">
                        {item.title}
                      </h3>

                      <p className="mt-4 font-poppins text-[14px] leading-[1.7] text-white/80">
                        {item.text}
                      </p>

                      <span className="mt-5 inline-flex h-11 items-center gap-2 rounded-lg bg-[#EC1F36] px-6 font-poppins text-[13px] font-bold uppercase tracking-[0.16em] text-white transition-all duration-300 hover:bg-white hover:text-[#EC1F36]">
                        Explore
                        <Arrow />
                      </span>

                    </div>

                  </div>

                </div>

              </Link>
            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          FINAL CTA
      ====================================================== */}

      <section className="relative bg-[#EC1F36] text-white text-center px-6 sm:px-10 lg:px-16 py-16 lg:py-20 overflow-hidden">

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, white 0, transparent 45%), radial-gradient(circle at 80% 80%, white 0, transparent 45%)",
          }}
        />

        <div className="relative max-w-[900px] mx-auto">

          <div className="inline-flex items-center gap-3 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            <p className="font-poppins text-[12px] tracking-[0.2em] uppercase text-white/75">
              Work With AMIR
            </p>
            <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
          </div>

          <h2 className="font-seasons text-[36px] sm:text-[48px] lg:text-[60px] leading-[1.05] tracking-[-0.025em] text-white">
            Looking for a fresh,{" "}
            <span className="italic">reliable protein partner?</span>
          </h2>

          <div className="mx-auto mt-6 w-10 h-[3px] bg-white/70" />

          <div className="mt-8 flex flex-wrap justify-center gap-5">

            <Link
              to="/get-a-quote"
              className="inline-flex items-center justify-center gap-3 bg-white text-[#EC1F36] px-10 h-14 rounded-lg font-poppins text-[14px] tracking-[0.14em] uppercase font-bold transition-all duration-300 hover:bg-[#171719] hover:text-white border border-white"
            >
              Contact Now
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
                <path d="M5 12h14" />
                <path d="m13 6 6 6-6 6" />
              </svg>
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center justify-center border border-white/60 text-white px-10 h-14 rounded-lg font-poppins text-[14px] tracking-[0.14em] uppercase font-bold transition-all duration-300 hover:bg-white hover:text-[#EC1F36]"
            >
              Contact AMIR
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}