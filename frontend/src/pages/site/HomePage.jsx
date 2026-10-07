import React from "react";
import { Link } from "react-router-dom";

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


const transformation = [
  {
    number: "01",
    title: "Modern Brand Identity",
    icon: "identity",
    text: "A stronger and more recognizable AMIR retail identity.",
  },
  {
    number: "02",
    title: "Hygienic Store Formats",
    icon: "hygiene",
    text: "More consistent and customer-focused retail environments.",
  },
  {
    number: "03",
    title: "Standard Operating Practices",
    icon: "technology",
    text: "Structured processes designed to create consistency across the network.",
  },
  {
    number: "04",
    title: "Centralised Procurement",
    icon: "procurement",
    text: "A more organized approach to sourcing and supply.",
  },
  {
    number: "05",
    title: "Franchise Training",
    icon: "training",
    text: "Supporting partners with practical operational knowledge.",
  },
  {
    number: "06",
    title: "Marketing Support",
    icon: "marketing",
    text: "Helping franchise partners build visibility and customer recall.",
  },
  {
    number: "07",
    title: "Consistent Customer Experience",
    icon: "customers",
    text: "Bringing a familiar AMIR experience across the network.",
  },
];


const growthSystem = [
  {
    number: "01",
    title: "Centralised Billing",
    icon: "money",
    text: "Smarter control across the retail network.",
  },
  {
    number: "02",
    title: "E-Commerce",
    icon: "ecommerce",
    text: "Digital channels that bring AMIR closer to customers.",
  },
  {
    number: "03",
    title: "Vehicle Tracking",
    icon: "tracking",
    text: "Better visibility across the delivery ecosystem.",
  },
  {
    number: "04",
    title: "Franchise Monitoring",
    icon: "technology",
    text: "More connected operations across locations.",
  },
  {
    number: "05",
    title: "Customer Support",
    icon: "support",
    text: "Systems designed around a better customer experience.",
  },
  {
    number: "06",
    title: "Mobile Ordering",
    icon: "mobile",
    text: "Making ordering simpler and more accessible.",
  },
  {
    number: "07",
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

export default function HomePage() {
  return (
    <main className="bg-white text-[#171719]">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative min-h-[calc(100vh-82px)] overflow-hidden bg-[#281719]">

        <img
          src="/images/amir-protein-hero.png"
          alt="Fresh chicken, fish, meat and eggs"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#281719]/95 via-[#281719]/65 to-[#281719]/10" />

        <div className="absolute inset-0 bg-gradient-to-t from-[#281719]/70 via-transparent to-transparent" />


        <div className="relative mx-auto flex min-h-[calc(100vh-82px)] max-w-[1480px] items-end px-6 pb-14 sm:px-10 lg:px-16 lg:pb-20">

          <div className="max-w-3xl text-white">

            <div className="mb-6 flex items-center gap-3">

              <span className="h-px w-10 bg-[#FFB800]" />

              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#FFB800]">
                AMIR Chicken • Since 1991
              </span>

            </div>

            <h1 className="text-6xl font-semibold leading-[0.9] tracking-[-0.055em] sm:text-7xl lg:text-[100px]">
              Fresh protein.
              <br />
              Built on trust.
            </h1>

            <p className="mt-7 max-w-xl text-base leading-7 text-white/75 sm:text-lg">
              From a single store in 1991 to a growing retail network,
              AMIR continues to build its business around freshness,
              consistency and customer trust.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">

              <Link
                to="/catalog"
                className="inline-flex items-center gap-3 rounded-full bg-[#EC1F36] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white hover:text-[#EC1F36]"
              >
                Explore Our Range
                <Arrow />
              </Link>

              <Link
                to="/get-a-quote"
                className="inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white hover:text-[#171719]"
              >
                Get a Quote
                <Arrow />
              </Link>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          BRAND STATEMENT
      ====================================================== */}

      <section className="px-6 py-20 sm:px-10 lg:px-16 lg:py-28">

        <div className="mx-auto grid max-w-[1480px] gap-10 lg:grid-cols-[0.55fr_1.45fr] lg:items-end">

          <div>

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#EC1F36]">
              The AMIR Story
            </p>

            <div className="mt-5 h-px w-16 bg-[#EC1F36]" />

          </div>

          <h2 className="max-w-6xl text-4xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-5xl lg:text-7xl">
            One store in 1991.
            <span className="text-neutral-400">
              {" "}A growing network built around freshness, fair trade and
              entrepreneurship.
            </span>
          </h2>

        </div>

      </section>


      {/* =====================================================
          AMIR IN NUMBERS — REDESIGNED
      ====================================================== */}

      <section className="bg-[#F5F3F0] px-6 py-20 sm:px-10 lg:px-16 lg:py-28">

        <div className="mx-auto max-w-[1480px]">

          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">

            <div>

              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#EC1F36]">
                AMIR in Numbers
              </p>

              <h2 className="mt-4 max-w-lg text-5xl font-semibold leading-[0.95] tracking-[-0.045em] sm:text-6xl">
                A legacy you can measure.
              </h2>

            </div>

            <p className="max-w-xl text-sm leading-7 text-neutral-500 lg:justify-self-end">
              Behind every store, customer and delivery is a growing network
              of people, infrastructure and years of experience.
            </p>

          </div>


          {/* FEATURED NUMBERS */}

          <div className="mt-14 grid gap-4 md:grid-cols-3">

            {stats.slice(0, 3).map((item) => (
              <div
                key={item.label}
                className="group relative overflow-hidden rounded-[28px] bg-[#281719] p-7 text-white transition duration-300 hover:-translate-y-1"
              >

                <div className="flex items-start justify-between">

                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EC1F36]">
                    <Icon type={item.icon} />
                  </div>

                  <span className="text-xs font-semibold text-white/30">
                    0{stats.indexOf(item) + 1}
                  </span>

                </div>

                <p className="mt-10 text-5xl font-semibold tracking-[-0.05em]">
                  {item.number}
                </p>

                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-white/55">
                  {item.label}
                </p>

                <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full border border-white/5" />

              </div>
            ))}

          </div>


          {/* SECONDARY NUMBERS */}

          <div className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-[24px] bg-neutral-300 sm:grid-cols-3 lg:grid-cols-7">

            {stats.slice(3).map((item) => (
              <div
                key={item.label}
                className="bg-white p-5 transition hover:bg-[#281719] hover:text-white"
              >

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F5F3F0] text-[#8F1525]">
                  <Icon type={item.icon} />
                </div>

                <p className="mt-6 text-2xl font-semibold tracking-tight text-[#8F1525] group-hover:text-white">
                  {item.number}
                </p>

                <p className="mt-2 text-[10px] font-semibold uppercase leading-4 tracking-[0.08em] text-neutral-500">
                  {item.label}
                </p>

              </div>
            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          2016 TRANSFORMATION — REDESIGNED
      ====================================================== */}

      <section className="px-6 py-20 sm:px-10 lg:px-16 lg:py-28">

        <div className="mx-auto max-w-[1480px]">

          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">

            {/* INTRO */}

            <div className="lg:sticky lg:top-28 lg:h-fit">

              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#EC1F36]">
                A Transformation
              </p>

              <h2 className="mt-4 text-5xl font-semibold leading-[0.92] tracking-[-0.05em] sm:text-6xl">
                A new chapter
                <br />
                for AMIR.
              </h2>

              <p className="mt-6 max-w-sm text-sm leading-7 text-neutral-500">
                The 2016 transformation introduced a more structured,
                recognizable and scalable approach to the AMIR network.
              </p>

              <div className="mt-8 flex items-center gap-3">

                <span className="h-10 w-10 rounded-full bg-[#EC1F36]" />

                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-400">
                  From identity to experience
                </span>

              </div>

            </div>


            {/* TIMELINE */}

            <div className="relative">

              <div className="absolute left-[27px] top-4 hidden h-[calc(100%-30px)] w-px bg-neutral-200 md:block" />

              <div className="space-y-4">

                {transformation.map((item) => (
                  <div
                    key={item.number}
                    className="group relative grid gap-5 rounded-[24px] border border-neutral-200 bg-white p-5 transition duration-300 hover:border-[#EC1F36]/30 hover:shadow-[0_20px_60px_rgba(39,23,25,0.08)] md:grid-cols-[56px_56px_1fr] md:items-center"
                  >

                    <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-[#F5F3F0] text-[#8F1525] transition group-hover:bg-[#EC1F36] group-hover:text-white">
                      <Icon type={item.icon} />
                    </div>

                    <span className="hidden text-xs font-semibold text-neutral-300 md:block">
                      {item.number}
                    </span>

                    <div>

                      <div className="flex flex-wrap items-center gap-3">

                        <h3 className="text-lg font-semibold tracking-tight">
                          {item.title}
                        </h3>

                        <span className="rounded-full bg-[#F5F3F0] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.1em] text-[#8F1525]">
                          AMIR
                        </span>

                      </div>

                      <p className="mt-2 max-w-xl text-sm leading-6 text-neutral-500">
                        {item.text}
                      </p>

                    </div>

                  </div>
                ))}

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          FRANCHISE NETWORK
      ====================================================== */}

      <section className="bg-[#EC1F36] px-6 py-20 text-white sm:px-10 lg:px-16 lg:py-28">

        <div className="mx-auto max-w-[1480px]">

          <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr]">

            <div>

              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                Franchise Network
              </p>

              <h2 className="mt-4 text-5xl font-semibold leading-[0.92] tracking-[-0.05em] sm:text-6xl">
                A system
                <br />
                built to grow.
              </h2>

              <p className="mt-6 max-w-md text-sm leading-7 text-white/70">
                AMIR enables franchise partners through brand recognition,
                reliable procurement, tested retail formats and operational
                support.
              </p>

              <Link
                to="/get-a-quote"
                className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[#EC1F36] transition hover:bg-[#281719] hover:text-white"
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
              ].map((point, index) => (
                <div
                  key={point}
                  className="flex items-center gap-4 rounded-2xl border border-white/20 bg-white/5 p-5 backdrop-blur-sm"
                >

                  <span className="text-xs font-bold text-white/45">
                    0{index + 1}
                  </span>

                  <span className="text-sm font-medium">
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

      <section className="px-6 py-20 sm:px-10 lg:px-16 lg:py-28">

        <div className="mx-auto max-w-[1480px]">

          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">

            <div>

              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#EC1F36]">
                Technology-Led Growth
              </p>

              <h2 className="mt-4 max-w-xl text-5xl font-semibold leading-[0.92] tracking-[-0.05em] sm:text-6xl">
                Growing
                <br />
                smarter.
              </h2>

              <p className="mt-6 max-w-md text-sm leading-7 text-neutral-500">
                AMIR's next phase brings technology into the everyday
                operations of the business — from billing and ordering to
                logistics and customer support.
              </p>

            </div>


            {/* SYSTEM MAP */}

            <div className="relative">

              <div className="grid gap-3 sm:grid-cols-2">

                {growthSystem.map((item, index) => (
                  <div
                    key={item.title}
                    className={`
                      group
                      relative
                      overflow-hidden
                      rounded-[22px]
                      border
                      border-neutral-200
                      bg-[#F8F6F3]
                      p-6
                      transition
                      duration-300
                      hover:-translate-y-1
                      hover:border-[#EC1F36]/30
                      hover:bg-[#281719]
                      hover:text-white
                      ${
                        index === 0
                          ? "sm:col-span-2"
                          : ""
                      }
                    `}
                  >

                    <div className="flex items-start justify-between">

                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#8F1525] shadow-sm transition group-hover:bg-[#EC1F36] group-hover:text-white">
                        <Icon type={item.icon} />
                      </div>

                      <span className="text-xs font-bold text-neutral-300 group-hover:text-white/30">
                        {item.number}
                      </span>

                    </div>

                    <h3 className="mt-8 text-xl font-semibold tracking-tight">
                      {item.title}
                    </h3>

                    <p className="mt-2 max-w-sm text-sm leading-6 text-neutral-500 group-hover:text-white/60">
                      {item.text}
                    </p>

                  </div>
                ))}

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          LEGACY / NEXT CHAPTER
      ====================================================== */}

      <section className="overflow-hidden bg-[#281719] px-6 py-20 text-white sm:px-10 lg:px-16 lg:py-28">

        <div className="mx-auto grid max-w-[1480px] items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">

          <div>

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FFB800]">
              Legacy Ready for Its Next Chapter
            </p>

            <h2 className="mt-4 text-5xl font-semibold leading-[0.92] tracking-[-0.05em] sm:text-6xl">
              From one store
              <br />
              to a growing network.
            </h2>

            <p className="mt-7 max-w-md text-sm leading-7 text-white/60">
              From one store in 1991 to a network supporting thousands of
              people, AMIR's journey has been built on freshness, fair trade
              and entrepreneurship.
            </p>

            <Link
              to="/about"
              className="mt-8 inline-flex items-center gap-3 text-sm font-semibold text-white hover:text-[#FFB800]"
            >
              Discover Our Story
              <Arrow />
            </Link>

          </div>


          <div className="relative">

            <img
              src="https://images.pexels.com/photos/3184436/pexels-photo-3184436.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="AMIR business network"
              className="w-full rounded-[28px] object-cover"
            />

          </div>

        </div>

      </section>


      {/* =====================================================
          PROTEIN RANGE
      ====================================================== */}

      <section className="px-6 py-20 sm:px-10 lg:px-16 lg:py-28">

        <div className="mx-auto max-w-[1480px]">

          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

            <div>

              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#EC1F36]">
                Fresh Protein Range
              </p>

              <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                What's on the table?
              </h2>

            </div>

            <Link
              to="/catalog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#EC1F36]"
            >
              View Full Range
              <Arrow />
            </Link>

          </div>


          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {proteinCategories.map((item) => (
              <Link
                key={item.title}
                to="/catalog"
                className="group overflow-hidden rounded-[24px] bg-[#F4F2EF]"
              >

                <div className="aspect-[4/3] overflow-hidden">

                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />

                </div>

                <div className="p-5">

                  <h3 className="text-xl font-semibold">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-5 text-neutral-500">
                    {item.text}
                  </p>

                </div>

              </Link>
            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          FINAL CTA
      ====================================================== */}

      <section className="px-6 pb-24 sm:px-10 lg:px-16">

        <div className="mx-auto max-w-[1480px] rounded-[30px] bg-[#F5F3F0] px-7 py-14 text-center sm:px-12 lg:py-20">

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#EC1F36]">
            Work With AMIR
          </p>

          <h2 className="mx-auto mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.04em] sm:text-5xl lg:text-6xl">
            Looking for a fresh,
            <span className="text-neutral-400">
              {" "}reliable protein partner?
            </span>
          </h2>

          <div className="mt-8 flex flex-wrap justify-center gap-3">

            <Link
              to="/get-a-quote"
              className="inline-flex items-center gap-3 rounded-full bg-[#EC1F36] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#281719]"
            >
              Get a Quote
              <Arrow />
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center gap-3 rounded-full border border-neutral-300 bg-white px-6 py-3.5 text-sm font-semibold transition hover:border-[#EC1F36] hover:text-[#EC1F36]"
            >
              Contact AMIR
              <Arrow />
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}