import { useEffect, useRef } from "react";

export default function BrandStatement() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const words = section.querySelectorAll(".brand-word");

    const lit = new Array(words.length).fill(false);
    let ticking = false;
    let visible = true;

    const updateHighlight = () => {
      ticking = false;
      const rect = section.getBoundingClientRect();
      const progress = Math.max(
        0,
        Math.min(1, (window.innerHeight * 0.8 - rect.top) / rect.height)
      );

      words.forEach((word, index) => {
        const on = progress >= (index + 1) / words.length;
        if (on !== lit[index]) {
          lit[index] = on;
          word.style.color = on ? "#171717" : "#C7C7C7";
        }
      });
    };

    const onScroll = () => {
      if (ticking || !visible) return;
      ticking = true;
      requestAnimationFrame(updateHighlight);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) onScroll();
      },
      { rootMargin: "100% 0px 100% 0px" }
    );
    observer.observe(section);

    window.addEventListener("scroll", onScroll, { passive: true });

    updateHighlight();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const statement =
    "A growing network built around freshness, fair trade and entrepreneurship.";

  return (
    <section
      ref={sectionRef}
      className="bg-white px-6 py-20 sm:px-10 lg:px-16 lg:py-28"
    >
      <div className="mx-auto grid max-w-[1480px] gap-10 lg:grid-cols-[0.55fr_1.45fr] lg:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#EC1F36]">
            The Amir Story
          </p>
          <div className="mt-5 h-px w-16 bg-[#EC1F36]" />
        </div>

        <h2 className="max-w-6xl font-seasons text-4xl font-semibold leading-[1.08] tracking-[-0.045em] sm:text-5xl lg:text-7xl">
          First store in 1991.{" "}
          {statement.split(/\s+/).map((word, index) => (
            <span
              key={index}
              className="brand-word"
              style={{
                color: "#C7C7C7",
                transition: "color 0.4s ease",
              }}
            >
              {word}{" "}
            </span>
          ))}
        </h2>
      </div>
    </section>
  );
}