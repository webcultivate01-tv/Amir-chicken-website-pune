import React from "react";
import { Link } from "react-router-dom";

import founderPhoto from "../../../images/founder-vijay-more.png";
import sealLogo from "../../../images/amir-seal-of-trust.png";

/* =========================================================
   TEMPORARY IMAGES
   Replace these with actual AMIR images later.
========================================================= */

const tempImages = {
  facility:
    "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1400&q=85",

  operations:
    "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1200&q=85",

  cutting:
    "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=1200&q=85",

  team:
    "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85",

  retail:
    "https://images.pexels.com/photos/33167531/pexels-photo-33167531.jpeg",

  freshness:
    "https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=1400&q=85",

  
};


/* =========================================================
   FRESHNESS POINTS
========================================================= */

const freshnessPoints = [
  {
    number: "01",
    title: "Freshness First",
    description:
      "Fresh protein handled with care from sourcing through to the customer.",
  },
  {
    number: "02",
    title: "Careful Handling",
    description:
      "A consistent focus on cleanliness, handling and quality at every stage.",
  },
  {
    number: "03",
    title: "Everyday Trust",
    description:
      "A promise built around honest service and dependable quality since 1991.",
  },
];


/* =========================================================
   BRAND JOURNEY
========================================================= */

const journey = [
  {
    year: "1991",
    title: "First Amir store opens at Gadital, Hadapsar.",
    location: "Gadital, Hadapsar",
  },
  {
    year: "2005",
    title:
      "The business evolves from proprietorship to a private limited company.",
  },
  {
    year: "2015",
    title: "Trademark, ISO and Halal registrations secured.",
  },
  {
    year: "2016",
    title: "Franchising and brand transformation begin.",
  },
  {
    year: "2019",
    title: "Record monthly broiler sales of 6,85,000 kg.",
  },
  {
    year: "Today",
    title: "580+ stores | 2,500+ livelihoods",
    text: "Presence in Pune, Nashik & Ahilyanagar.",
  },
];


/* =========================================================
   PEOPLE / IMAGE CARDS
========================================================= */

const peopleCards = [
  {
    number: "01",
    label: "Operations",
    location: "Pune",
    title: "The people behind the process.",
    image: tempImages.operations,
  },
  {
    number: "02",
    label: "Sourcing & Training",
    location: "Maharashtra",
    title: "Built around care and consistency.",
    image: tempImages.cutting,
  },
  {
    number: "03",
    label: "Retail Family",
    location: "AMIR Network",
    title: "A growing network built on trust.",
    image: tempImages.retail,
  },
];


/* =========================================================
   SECTION LABEL
========================================================= */

const SectionLabel = ({ children }) => (
  <div className="flex items-center gap-3">
    <span className="block w-7 h-px bg-[#EC1F36]" />

    <p className="font-poppins text-[11px] font-medium tracking-[0.18em] uppercase text-[#EC1F36]">
      {children}
    </p>
  </div>
);


/* =========================================================
   IMAGE CARD
========================================================= */

const ImageCard = ({
  image,
  number,
  label,
  location,
  className = "",
}) => (
  <div
    className={`
      relative
      overflow-hidden
      bg-[#EC1F36]
      ${className}
    `}
  >
    <img
      src={image}
      alt={label}
      className="
        absolute
        inset-0
        w-full
        h-full
        object-cover
        transition-transform
        duration-700
        hover:scale-105
      "
    />

    <div className="absolute inset-0 bg-[#EC1F36]/10" />

    <div
      className="
        absolute
        inset-3
        border
        border-white/30
        pointer-events-none
      "
    />

    <div
      className="
        absolute
        top-6
        left-6
        bg-white
        px-3
        py-1.5
      "
    >
      <p
        className="
          font-poppins
          text-[9px]
          tracking-[0.15em]
          uppercase
          text-[#EC1F36]
        "
      >
        {label}
      </p>
    </div>

    <div
      className="
        absolute
        bottom-6
        left-6
        right-6
        flex
        items-end
        justify-between
        gap-4
      "
    >
      <p
        className="
          font-poppins
          text-[9px]
          tracking-[0.14em]
          uppercase
          text-white
        "
      >
        {location}
      </p>

      <span className="font-seasons text-xl text-white">
        {number}
      </span>
    </div>
  </div>
);


/* =========================================================
   ABOUT PAGE
========================================================= */

const AboutPage = () => {
  return (
    <main className="bg-white text-[#EC1F36] overflow-hidden">

      {/* =====================================================
          01 — FOUNDER HERO
      ====================================================== */}

      <section className="bg-white">

        <div
          className="
            max-w-[1680px]
            mx-auto
            flex
            flex-col
            lg:flex-row
            min-h-[calc(100vh-78px)]
          "
        >

          {/* FOUNDER IMAGE */}

          <div
            className="
              relative
              lg:w-[46%]
              w-full
              bg-[#EC1F36]
              overflow-hidden
              min-h-[560px]
              lg:min-h-[820px]
            "
          >

            <img
              src={founderPhoto}
              alt="Mr. Vijay More, Founder of Amir's Fresh Cut"
              className="
                absolute
                inset-0
                w-full
                h-full
                object-cover
                object-top
              "
            />

            <div className="absolute inset-0 bg-[#EC1F36]/10" />

            <div
              className="
                hidden
                lg:block
                absolute
                left-6
                top-1/2
                -translate-y-1/2
                -rotate-90
                origin-left
              "
            >
              <p
                className="
                  font-poppins
                  text-[10px]
                  tracking-[0.28em]
                  uppercase
                  text-white
                  whitespace-nowrap
                "
              >
                EST. 1991 — AHMEDNAGAR — FAMILY OWNED
              </p>
            </div>

            <div
              className="
                absolute
                bottom-8
                right-8
                w-10
                h-10
                rounded-full
                bg-white
                flex
                items-center
                justify-center
              "
            >
              <span
                className="
                  w-1.5
                  h-1.5
                  rounded-full
                  bg-[#EC1F36]
                "
              />
            </div>

            <div
              className="
                absolute
                inset-4
                lg:inset-5
                border
                border-white/30
                pointer-events-none
              "
            />

          </div>


          {/* FOUNDER CONTENT */}

          <div
            className="
              lg:w-[54%]
              w-full
              bg-white
              px-7
              sm:px-10
              lg:px-20
              xl:px-24
              py-16
              lg:py-20
              flex
              items-center
            "
          >

            <div className="max-w-[560px]">

              <SectionLabel>
                The AMIR Family
              </SectionLabel>

              <h1
                className="
                  mt-7
                  font-seasons
                  text-[52px]
                  sm:text-[62px]
                  lg:text-[78px]
                  leading-[0.9]
                  tracking-[-0.025em]
                  text-[#EC1F36]
                "
              >
                The Story
                <br />
                <span className="italic">
                  Behind AMIR
                </span>
              </h1>

              <div className="mt-8 w-10 h-[3px] bg-[#EC1F36]" />

              <div className="mt-9 flex items-center gap-4">

                <p className="font-seasons text-xl text-[#EC1F36]">
                  Mr. Vijay More
                </p>

                <span className="w-px h-4 bg-[#EC1F36]/30" />

                <p
                  className="
                    font-poppins
                    text-[10px]
                    tracking-[0.14em]
                    uppercase
                    text-[#EC1F36]/60
                  "
                >
                  Founder, AMIR
                </p>

              </div>

              <div className="mt-9 space-y-6">

                <p
                  className="
                    font-poppins
                    text-[16px]
                    lg:text-[18px]
                    leading-[1.75]
                    text-[#EC1F36]/85
                    max-w-[440px]
                  "
                >
                  Born in Maharashtra's drought-affected Ahmednagar
                  region, Mr. Vijay More understood the challenges
                  faced by educated rural youth.
                </p>

                <div
                  className="
                    relative
                    max-w-[470px]
                    border
                    border-[#EC1F36]/20
                    bg-white
                    p-7
                    lg:p-8
                  "
                >

                  <div
                    className="
                      absolute
                      top-0
                      left-0
                      w-full
                      h-[3px]
                      bg-[#EC1F36]
                    "
                  />

                  <p
                    className="
                      font-seasons
                      text-[20px]
                      lg:text-[22px]
                      leading-[1.45]
                      text-[#EC1F36]
                    "
                  >
                    In 1991, he founded Amir with two ambitions:
                    organise meat retail and create sustainable
                    livelihoods.
                  </p>

                  <p
                    className="
                      mt-4
                      font-poppins
                      text-[9px]
                      tracking-[0.16em]
                      uppercase
                      text-[#EC1F36]/60
                    "
                  >
                    Founding Note — Ahmednagar
                  </p>

                </div>

              </div>

              <div className="mt-12 flex items-center gap-5">

                <div className="h-px w-14 bg-[#EC1F36]/30" />

                <p
                  className="
                    font-poppins
                    text-[10px]
                    tracking-[0.16em]
                    uppercase
                    text-[#EC1F36]/50
                  "
                >
                  Family-owned since 1991
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          02 — OUR STORY
      ====================================================== */}

      <section
        className="
          bg-white
          border-y
          border-[#EC1F36]/15
          py-24
          lg:py-32
        "
      >

        <div
          className="
            max-w-[1680px]
            mx-auto
            px-7
            lg:px-12
          "
        >

          <div
            className="
              flex
              flex-col
              lg:flex-row
              gap-14
              lg:gap-0
              justify-between
            "
          >

            <div className="lg:w-[38%] lg:pr-14">

              <SectionLabel>
                1991 — Present
              </SectionLabel>

              <h2
                className="
                  mt-6
                  font-seasons
                  text-[46px]
                  lg:text-[60px]
                  leading-[0.92]
                  text-[#EC1F36]
                "
              >
                Our Story
              </h2>

              <div className="mt-8 max-w-[430px]">

                <p
                  className="
                    font-poppins
                    text-[16px]
                    lg:text-[17px]
                    leading-[1.75]
                    text-[#EC1F36]/80
                  "
                >
                  AMIR began in 1991 with a simple belief:
                  fresh protein should be organised, trustworthy
                  and accessible.
                </p>

                <p
                  className="
                    mt-5
                    font-poppins
                    text-[16px]
                    lg:text-[17px]
                    leading-[1.75]
                    text-[#EC1F36]/80
                  "
                >
                  From a single outlet to a growing retail network,
                  the same founding vision continues to shape
                  the brand.
                </p>

                <div
                  className="
                    mt-10
                    flex
                    gap-8
                    border-t
                    border-[#EC1F36]/15
                    pt-6
                  "
                >

                  <div>

                    <p
                      className="
                        font-seasons
                        text-[32px]
                        leading-none
                        text-[#EC1F36]
                      "
                    >
                      580+
                    </p>

                    <p
                      className="
                        mt-2
                        font-poppins
                        text-[9px]
                        tracking-[0.14em]
                        uppercase
                        text-[#EC1F36]/60
                      "
                    >
                      Stores
                    </p>

                  </div>

                  <div className="w-px bg-[#EC1F36]/15" />

                  <div>

                    <p
                      className="
                        font-seasons
                        text-[32px]
                        leading-none
                        text-[#EC1F36]
                      "
                    >
                      1991
                    </p>

                    <p
                      className="
                        mt-2
                        font-poppins
                        text-[9px]
                        tracking-[0.14em]
                        uppercase
                        text-[#EC1F36]/60
                      "
                    >
                      Founded
                    </p>

                  </div>

                </div>

              </div>

            </div>


            <div className="lg:w-[55%] relative">

              <div
                className="
                  relative
                  aspect-[4/3]
                  lg:aspect-[16/11]
                  overflow-hidden
                "
              >

                <img
  src="https://images.pexels.com/photos/13524831/pexels-photo-13524831.jpeg"
  alt="AMIR story"
  className="absolute inset-0 w-full h-full object-cover"
/>

                <div className="absolute inset-0 bg-[#EC1F36]/10" />

                <div
                  className="
                    absolute
                    inset-3
                    border
                    border-white/30
                  "
                />

                <div
                  className="
                    absolute
                    top-6
                    left-6
                    bg-white
                    px-3
                    py-1.5
                  "
                >
                  <p
                    className="
                      font-poppins
                      text-[9px]
                      tracking-[0.18em]
                      uppercase
                      text-[#EC1F36]
                    "
                  >
                    Archive — AMIR
                  </p>
                </div>

              </div>

              <div className="mt-4 flex justify-between items-center">

                <p
                  className="
                    font-poppins
                    text-[10px]
                    tracking-[0.14em]
                    uppercase
                    text-[#EC1F36]/55
                  "
                >
                  Ahmednagar, Maharashtra — 1991
                </p>

                <span
                  className="
                    hidden
                    lg:block
                    w-28
                    h-px
                    bg-[#EC1F36]/20
                  "
                />

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          03 — INSIDE AMIR
      ====================================================== */}

      <section
        className="
          bg-white
          py-24
          lg:py-32
          border-b
          border-[#EC1F36]/15
        "
      >

        <div
          className="
            max-w-[1680px]
            mx-auto
            px-7
            lg:px-12
          "
        >

          <div
            className="
              flex
              flex-col
              lg:flex-row
              justify-between
              gap-8
              mb-14
            "
          >

            <div>

              <SectionLabel>
                Inside AMIR
              </SectionLabel>

              <h2
                className="
                  mt-5
                  font-seasons
                  text-[38px]
                  lg:text-[52px]
                  leading-[0.94]
                  max-w-[550px]
                  text-[#EC1F36]
                "
              >
                Built for freshness.
                <br />
                <span className="italic">
                  Designed for trust.
                </span>
              </h2>

            </div>

            <p
              className="
                lg:text-right
                max-w-[330px]
                font-poppins
                text-[13px]
                leading-[1.7]
                text-[#EC1F36]/65
              "
            >
              The people, operations and processes behind
              the AMIR experience.
            </p>

          </div>


          <div className="flex flex-col lg:flex-row gap-1">

            <ImageCard
              image={tempImages.facility}
              number="01"
              label="Facility"
              location="AMIR Operations"
              className="
                lg:w-[65%]
                h-[420px]
                lg:h-[620px]
              "
            />

            <div
              className="
                lg:w-[35%]
                flex
                flex-col
                gap-1
              "
            >

              <ImageCard
                image={tempImages.operations}
                number="02"
                label="Operations"
                location="AMIR Network"
                className="
                  h-[300px]
                  lg:h-[320px]
                "
              />

              <div
                className="
                  bg-white
                  border
                  border-[#EC1F36]/15
                  p-8
                  lg:p-10
                  flex
                  flex-col
                  justify-between
                  min-h-[300px]
                "
              >

                <div className="w-px h-10 bg-[#EC1F36]" />

                <div>

                  <h3
                    className="
                      font-seasons
                      text-[24px]
                      lg:text-[28px]
                      leading-[1.2]
                      text-[#EC1F36]
                      max-w-[300px]
                    "
                  >
                    Every cut, every process,
                    every detail matters.
                  </h3>

                  <p
                    className="
                      mt-5
                      font-poppins
                      text-[13px]
                      leading-[1.7]
                      text-[#EC1F36]/65
                      max-w-[300px]
                    "
                  >
                    The people and processes behind
                    the AMIR standard.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          04 — PEOPLE BEHIND THE BRAND
      ====================================================== */}

      <section
        className="
          bg-white
          py-24
          lg:py-32
          border-b
          border-[#EC1F36]/15
        "
      >

        <div
          className="
            max-w-[1680px]
            mx-auto
            px-7
            lg:px-12
          "
        >

          <div
            className="
              flex
              flex-col
              lg:flex-row
              justify-between
              gap-10
              mb-16
            "
          >

            <div>

              <SectionLabel>
                The AMIR Family
              </SectionLabel>

              <h2
                className="
                  mt-5
                  font-seasons
                  text-[38px]
                  lg:text-[48px]
                  leading-[0.94]
                  text-[#EC1F36]
                "
              >
                People behind
                <br />
                the brand.
              </h2>

            </div>

            <p
              className="
                max-w-[360px]
                font-poppins
                text-[13px]
                leading-[1.7]
                text-[#EC1F36]/65
              "
            >
              The AMIR family extends beyond the counter —
              sourcing, training, cutting and serving with
              the same care since 1991.
            </p>

          </div>


          <div
            className="
              flex
              flex-col
              lg:flex-row
              gap-6
              lg:gap-8
              items-start
            "
          >

            {peopleCards.map((card) => (
              <article
                key={card.number}
                className={`
                  w-full
                  ${
                    card.number === "01"
                      ? "lg:w-[42%]"
                      : card.number === "02"
                      ? "lg:w-[28%] lg:mt-16"
                      : "lg:w-[24%]"
                  }
                `}
              >

                <ImageCard
                  image={card.image}
                  number={card.number}
                  label={card.label}
                  location={card.location}
                  className={
                    card.number === "01"
                      ? "h-[430px] lg:h-[520px]"
                      : card.number === "02"
                      ? "h-[380px]"
                      : "h-[440px]"
                  }
                />

                <div className="mt-4 flex justify-between gap-4">

                  <div>

                    <p
                      className="
                        font-poppins
                        text-[10px]
                        tracking-[0.12em]
                        uppercase
                        text-[#EC1F36]/55
                      "
                    >
                      {card.label}
                    </p>

                    <p
                      className="
                        mt-2
                        font-seasons
                        text-lg
                        text-[#EC1F36]
                      "
                    >
                      {card.title}
                    </p>

                  </div>

                  <span
                    className="
                      font-poppins
                      text-[10px]
                      text-[#EC1F36]/35
                    "
                  >
                    {card.number}
                  </span>

                </div>

              </article>
            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          05 — FRESHNESS PROMISE
      ====================================================== */}

      <section className="bg-[#EC1F36] text-white py-24 lg:py-32">

        <div
          className="
            max-w-[1680px]
            mx-auto
            px-7
            lg:px-12
          "
        >

          <div className="flex flex-col lg:flex-row gap-16 lg:gap-0">

            {/* IMAGE */}

            <div className="lg:w-1/2 relative">

              <div
                className="
                  relative
                  h-[480px]
                  lg:h-[640px]
                  overflow-hidden
                "
              >

                <img
                  src={tempImages.freshness}
                  alt="AMIR freshness"
                  className="
                    absolute
                    inset-0
                    w-full
                    h-full
                    object-cover
                    opacity=100
                  "
                />

                <div className="absolute inset-0 bg-[#EC1F36]/35" />

                <div
                  className="
                    absolute
                    inset-3
                    border
                    border-white/30
                  "
                />

                <img
                  src={sealLogo}
                  alt="Amir Seal of Trust"
                  className="
                    absolute
                    left-1/2
                    top-1/2
                    -translate-x-1/2
                    -translate-y-1/2
                    w-[42%]
                    opacity-80
                  "
                />

              </div>

            </div>


            {/* CONTENT */}

            <div
              className="
                lg:w-1/2
                lg:pl-20
                xl:pl-28
                flex
                flex-col
                justify-center
              "
            >

              <p
                className="
                  font-poppins
                  text-[10px]
                  tracking-[0.2em]
                  uppercase
                  text-white/70
                "
              >
                Our Freshness Promise
              </p>

              <h2
                className="
                  mt-5
                  font-seasons
                  text-[42px]
                  lg:text-[56px]
                  leading-[0.94]
                  text-white
                "
              >
                A promise kept
                <br />
                <span className="italic text-white/70">
                  daily.
                </span>
              </h2>

              <div className="mt-14 border-t border-white/25">

                {freshnessPoints.map((item) => (
                  <article
                    key={item.number}
                    className="
                      flex
                      gap-6
                      lg:gap-10
                      py-8
                      border-b
                      border-white/25
                    "
                  >

                    <div
                      className="
                        flex
                        items-start
                        gap-3
                        shrink-0
                      "
                    >

                      <span
                        className="
                          mt-2
                          w-1
                          h-1
                          rounded-full
                          bg-white
                        "
                      />

                      <span
                        className="
                          font-seasons
                          text-sm
                          text-white/60
                        "
                      >
                        {item.number}
                      </span>

                    </div>

                    <div>

                      <h3
                        className="
                          font-seasons
                          text-[21px]
                          lg:text-[23px]
                          leading-[1.1]
                          text-white
                        "
                      >
                        {item.title}
                      </h3>

                      <p
                        className="
                          mt-3
                          font-poppins
                          text-[12px]
                          leading-[1.65]
                          text-white/70
                          max-w-[330px]
                        "
                      >
                        {item.description}
                      </p>

                    </div>

                  </article>
                ))}

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          06 — BRAND JOURNEY
      ====================================================== */}

      <section
        className="
          bg-white
          py-24
          lg:py-32
          border-b
          border-[#EC1F36]/15
        "
      >

        <div
          className="
            max-w-[1200px]
            mx-auto
            px-7
            lg:px-12
          "
        >

          {/* HEADING */}

          <div className="text-center mb-20">

            <div className="flex justify-center">
              <SectionLabel>
                Archive
              </SectionLabel>
            </div>

            <h2
              className="
                mt-5
                font-seasons
                text-[44px]
                lg:text-[56px]
                leading-[0.9]
                text-[#EC1F36]
              "
            >
              Brand Journey
              <br />
              <span className="italic">
                Since 1991
              </span>
            </h2>

            <div className="mx-auto mt-7 w-10 h-[3px] bg-[#EC1F36]" />

            <p
              className="
                mt-6
                font-poppins
                text-[12px]
                tracking-[0.08em]
                text-[#EC1F36]/60
              "
            >
              From one store to a retail network
            </p>

          </div>


          {/* TIMELINE */}

          <div className="relative">

            {/* Desktop line */}

            <div
              className="
                hidden
                lg:block
                absolute
                left-1/2
                top-0
                bottom-0
                w-px
                bg-[#EC1F36]/20
                -translate-x-1/2
              "
            />

            {/* Mobile line */}

            <div
              className="
                lg:hidden
                absolute
                left-2
                top-0
                bottom-0
                w-px
                bg-[#EC1F36]/20
              "
            />

            <div className="space-y-16 lg:space-y-24">

              {journey.map((item, index) => {

                const isLeft = index % 2 === 0;

                return (
                  <article
                    key={item.year}
                    className="
                      relative
                      flex
                      flex-col
                      lg:flex-row
                      items-start
                    "
                  >

                    {/* LEFT */}

                    {isLeft ? (
                      <div
                        className="
                          lg:w-1/2
                          lg:pr-20
                          lg:text-right
                          pl-8
                          lg:pl-0
                        "
                      >

                        <p
                          className="
                            font-seasons
                            text-[58px]
                            lg:text-[78px]
                            leading-none
                            text-[#EC1F36]/15
                          "
                        >
                          {item.year}
                        </p>

                        <h3
                          className="
                            mt-[-10px]
                            font-seasons
                            text-[24px]
                            lg:text-[27px]
                            leading-[1.1]
                            text-[#EC1F36]
                          "
                        >
                          {item.title}
                        </h3>

                        {item.text && (
                          <p
                            className="
                              mt-3
                              font-poppins
                              text-[13px]
                              leading-[1.7]
                              text-[#EC1F36]/60
                              max-w-[360px]
                              ml-auto
                            "
                          >
                            {item.text}
                          </p>
                        )}

                        {item.location && (
                          <div
                            className="
                              mt-5
                              inline-flex
                              items-center
                              gap-2
                              border
                              border-[#EC1F36]/20
                              px-3
                              py-1.5
                            "
                          >

                            <span
                              className="
                                w-1.5
                                h-1.5
                                rounded-full
                                bg-[#EC1F36]
                              "
                            />

                            <span
                              className="
                                font-poppins
                                text-[9px]
                                tracking-[0.12em]
                                uppercase
                                text-[#EC1F36]/65
                              "
                            >
                              {item.location}
                            </span>

                          </div>
                        )}

                      </div>
                    ) : (
                      <div className="hidden lg:block lg:w-1/2" />
                    )}


                    {/* DOT */}

                    <div
                      className="
                        absolute
                        left-[4px]
                        lg:left-1/2
                        top-3
                        lg:top-14
                        w-3
                        h-3
                        rounded-full
                        bg-[#EC1F36]
                        border-2
                        border-white
                        -translate-x-1/2
                        z-10
                      "
                    />


                    {/* RIGHT */}

                    {!isLeft ? (
                      <div
                        className="
                          lg:w-1/2
                          lg:pl-20
                          pl-8
                        "
                      >

                        <p
                          className="
                            font-seasons
                            text-[58px]
                            lg:text-[78px]
                            leading-none
                            text-[#EC1F36]/15
                          "
                        >
                          {item.year}
                        </p>

                        <h3
                          className="
                            mt-[-10px]
                            font-seasons
                            text-[24px]
                            lg:text-[27px]
                            leading-[1.1]
                            text-[#EC1F36]
                          "
                        >
                          {item.title}
                        </h3>

                        {item.text && (
                          <p
                            className="
                              mt-3
                              font-poppins
                              text-[13px]
                              leading-[1.7]
                              text-[#EC1F36]/60
                              max-w-[360px]
                            "
                          >
                            {item.text}
                          </p>
                        )}

                      </div>
                    ) : (
                      <div className="hidden lg:block lg:w-1/2" />
                    )}

                  </article>
                );
              })}

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          07 — FINAL CTA
      ====================================================== */}

      <section
        className="
          bg-[#EC1F36]
          text-white
          py-28
          lg:py-40
          text-center
        "
      >

        <div className="max-w-[960px] mx-auto px-7">

          <div
            className="
              inline-flex
              items-center
              gap-3
              mb-10
            "
          >

            <span className="w-1.5 h-1.5 rounded-full bg-white" />

            <p
              className="
                font-poppins
                text-[10px]
                tracking-[0.2em]
                uppercase
                text-white/75
              "
            >
              Since 1991
            </p>

            <span className="w-1.5 h-1.5 rounded-full bg-white/50" />

          </div>


          <h2
            className="
              font-seasons
              text-[58px]
              sm:text-[68px]
              lg:text-[92px]
              leading-[0.88]
              tracking-[-0.025em]
              text-white
            "
          >
            Freshness you
            <br />
            <span className="italic">
              can trust.
            </span>
          </h2>


          <p
            className="
              mt-8
              font-poppins
              text-[12px]
              lg:text-[13px]
              tracking-[0.12em]
              uppercase
              text-white/75
              max-w-[430px]
              mx-auto
              leading-[1.7]
            "
          >
            From one store to a growing retail network.
            Same family. Same standard.
          </p>


          <div
            className="
              mt-10
              flex
              flex-wrap
              justify-center
              gap-4
            "
          >

            <Link
              to="/catalog"
              className="
                inline-flex
                items-center
                justify-center
                bg-white
                text-[#EC1F36]
                px-8
                h-14
                font-poppins
                text-[11px]
                tracking-[0.14em]
                uppercase
                font-semibold
                transition-all
                duration-300
                hover:bg-[#EC1F36]
                hover:text-white
                border
                border-white
              "
            >
              Explore Range
            </Link>


            <Link
              to="/contact"
              className="
                inline-flex
                items-center
                justify-center
                border
                border-white/60
                text-white
                px-8
                h-14
                font-poppins
                text-[11px]
                tracking-[0.14em]
                uppercase
                font-semibold
                transition-all
                duration-300
                hover:bg-white
                hover:text-[#EC1F36]
              "
            >
              Get a Quote
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
};

export default AboutPage;