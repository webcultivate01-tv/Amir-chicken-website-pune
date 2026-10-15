
import { useRef } from "react";
import "./TransformationSection.css";

const transformationStories = [
  {
    number: "01",
    category: "Brand identity",
    image: "/images/transformation-brand.jpg",
    imageAlt: "AMIR brand identity",
  },
  {
    number: "02",
    category: "Retail experience",
    image: "/images/transformation-stores.jpg",
    imageAlt: "AMIR retail store experience",
  },
  {
    number: "03",
    category: "Operations",
    image: "/images/transformation-operations.jpg",
    imageAlt: "AMIR retail operations",
  },
  {
    number: "04",
    category: "Centralised procurement",
    image: "/images/transformation-procurement.jpg",
    imageAlt: "AMIR centralised procurement",
  },
  {
    number: "05",
    category: "Franchise training",
    image: "/images/transformation-training.jpg",
    imageAlt: "AMIR franchise training",
  },
  {
    number: "06",
    category: "Marketing support",
    image: "/images/transformation-marketing.jpg",
    imageAlt: "AMIR marketing support",
  },
  {
    number: "07",
    category: "Customer experience",
    image: "/images/transformation-customer.jpg",
    imageAlt: "AMIR customer experience",
  },
];

function ArrowIcon({ direction = "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-5 w-5 ${
        direction === "left" ? "rotate-180" : ""
      }`}
      aria-hidden="true"
    >
      <path d="M4 12h16" />
      <path d="m13 5 7 7-7 7" />
    </svg>
  );
}

export default function TransformationSection() {
  const trackRef = useRef(null);

  const scrollCards = (direction) => {
    const track = trackRef.current;

    if (!track) return;

    const card = track.querySelector(
      "[data-transformation-card]"
    );

    if (!card) return;

    const cardWidth = card.getBoundingClientRect().width;
    const styles = window.getComputedStyle(track);
    const gap = parseFloat(styles.columnGap) || 16;

    track.scrollBy({
      left: direction * (cardWidth + gap),
      behavior: "smooth",
    });
  };

  return (
    <section
      aria-labelledby="transformation-heading"
      className="overflow-hidden bg-[#801821] py-12 sm:py-16 lg:py-20"
    >
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12 lg:px-12 xl:px-16">

        {/* LEFT CONTENT */}

        <div className="flex flex-col lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
          <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#F0B8B9] sm:text-xs">
            A Transformation
          </p>

          <h2
            id="transformation-heading"
            className="max-w-lg font-serif text-4xl font-medium leading-[1.08] tracking-[-0.035em] text-[#FFF9F5] sm:text-5xl xl:text-6xl"
          >
            A new chapter
            <br />
            for <span className="text-[#F0B8B9]">AMIR.</span>
          </h2>

          <p className="mt-5 max-w-sm text-xs leading-6 text-white/75 sm:text-sm sm:leading-7">
            In 2016, AMIR began shaping a more recognizable,
            structured and scalable retail experience.
          </p>

          {/* NAVIGATION */}

          <div className="mt-7 flex items-center gap-4">
            <button
              type="button"
              onClick={() => scrollCards(-1)}
              aria-label="Previous transformation image"
              className="flex h-9 w-9 items-center justify-center text-[#FFF9F5] transition-colors duration-200 hover:text-[#F0B8B9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <ArrowIcon direction="left" />
            </button>

            <button
              type="button"
              onClick={() => scrollCards(1)}
              aria-label="Next transformation image"
              className="flex h-9 w-9 items-center justify-center text-[#FFF9F5] transition-colors duration-200 hover:text-[#F0B8B9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <ArrowIcon />
            </button>

            <span className="ml-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/90">
              Explore the story
            </span>
          </div>
        </div>

        {/* RIGHT IMAGE CARDS */}

        <div className="min-w-0 lg:col-span-8">
          <div
            ref={trackRef}
            className="transformation-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 sm:gap-5"
            aria-label="AMIR transformation images"
          >
            {transformationStories.map((story) => (
              <article
                key={story.number}
                data-transformation-card
                className="group w-[82%] flex-none snap-start sm:w-[320px] lg:w-[340px]"
              >
                <div className="w-full overflow-hidden">
                  <img
                    src={story.image}
                    alt={story.imageAlt}
                    loading={
                      story.number === "01" ? "eager" : "lazy"
                    }
                    className="block h-auto w-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  />
                </div>

                <p className="mt-4 text-xs font-semibold capitalize tracking-wide text-[#FFF9F5] sm:text-sm">
                  {story.category}
                </p>
              </article>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
