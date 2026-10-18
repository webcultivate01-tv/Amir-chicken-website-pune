import React, { useEffect, useRef, useState } from "react";

const chapters = [
  {
    title: "Modern Brand Identity",
    text: "A stronger and more recognizable AMIR retail identity.",
  },
  {
    title: "Hygienic Store Formats",
    text: "More consistent and customer-focused retail environments.",
  },
  {
    title: "Standard Operating Practices",
    text: "Structured processes designed to create consistency across the network.",
  },
  {
    title: "Centralised Procurement",
    text: "A more organized approach to sourcing and supply.",
  },
  {
    title: "Franchise Training",
    text: "Supporting partners with practical operational knowledge.",
  },
  {
    title: "Marketing Support",
    text: "Helping franchise partners build visibility and customer recall.",
  },
  {
    title: "Consistent Customer Experience",
    text: "Bringing a familiar AMIR experience across the network.",
  },
];

const pad = (n) => String(n).padStart(2, "0");

export default function TransformationSection() {
  const [active, setActive] = useState(0);
  const rowRefs = useRef([]);

  // Highlight whichever row sits in the middle band of the viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(Number(entry.target.dataset.index));
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    rowRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const progress = ((active + 1) / chapters.length) * 100;

  return (
    <section className="bg-white px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-[1480px]">
        <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          {/* STICKY INTRO */}
          <div className="lg:sticky lg:top-32 lg:h-fit">
            <div className="inline-flex items-center gap-3">
              <span className="h-[2px] w-10 bg-[#EC1F36]" />
              <p className="font-poppins text-[11px] font-semibold uppercase tracking-[0.22em] text-[#171719]/60">
                A Transformation · 2016
              </p>
            </div>

            <h2 className="mt-7 font-seasons text-[48px] leading-[0.98] tracking-[-0.03em] text-[#171719] sm:text-[64px] lg:text-[76px]">
              A new chapter
              <br />
              for <span className="italic text-[#EC1F36]">AMIR.</span>
            </h2>

            <p className="mt-7 max-w-sm font-poppins text-[13px] leading-[1.9] text-[#171719]/60">
              The 2016 transformation introduced a more structured,
              recognizable and scalable approach to the AMIR network.
            </p>

            {/* progress */}
            <div className="mt-12 hidden max-w-sm lg:block">
              <div className="flex items-baseline gap-3 font-seasons text-[#171719]">
                <span className="text-6xl leading-none tracking-tight">
                  {pad(active + 1)}
                </span>
                <span className="text-lg text-[#171719]/30">
                  / {pad(chapters.length)}
                </span>
              </div>

              <div className="mt-5 h-px w-full bg-[#171719]/10">
                <div
                  className="h-px bg-[#EC1F36] transition-[width] duration-700 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* CHAPTERS */}
          <ol className="border-t border-[#171719]/10">
            {chapters.map((item, index) => {
              const isActive = index === active;
              return (
                <li
                  key={item.title}
                  ref={(el) => (rowRefs.current[index] = el)}
                  data-index={index}
                  className="grid grid-cols-[48px_1fr] gap-4 border-b border-[#171719]/10 py-10 sm:grid-cols-[88px_1fr] lg:min-h-[168px] lg:items-center lg:py-12"
                >
                  <span
                    className={`pt-1 font-poppins text-[12px] font-semibold tracking-[0.2em] transition-colors duration-500 ${
                      isActive ? "text-[#EC1F36]" : "text-[#171719]/30"
                    }`}
                  >
                    {pad(index + 1)}
                  </span>

                  <div
                    className={`transition-all duration-500 ${
                      isActive
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-1 opacity-35"
                    }`}
                  >
                    <h3 className="font-seasons text-[28px] leading-[1.1] tracking-[-0.02em] text-[#171719] sm:text-[36px] lg:text-[40px]">
                      {item.title}
                    </h3>

                    <p className="mt-3 max-w-md font-poppins text-[13px] leading-[1.8] text-[#171719]/60">
                      {item.text}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
