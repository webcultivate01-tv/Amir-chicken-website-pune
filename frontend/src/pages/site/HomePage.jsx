import React from "react";
import { Link } from "react-router-dom";

import HeroSection from "../../components/site/home/HeroSection";
import BrandStatement from "../../components/site/home/BrandStatement";
import AmirNumbers from "../../components/site/home/AmirNumbers";
import TransformationSection from "../../components/site/home/TransformationSection";
import PlateShowcase from "../../components/site/home/PlateShowcase";
import TechnologyGrowthSection from "../../components/site/home/TechnologyGrowthSection";
import FinalCTA from "../../components/site/home/FinalCTA";

const Arrow = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-4 w-4"
    aria-hidden="true"
  >
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </svg>
);

export default function HomePage() {
  return (
    <main className="bg-white text-[#171719]">
      <HeroSection />

      <BrandStatement />

      <AmirNumbers />

      <TransformationSection />

      <PlateShowcase />

      <TechnologyGrowthSection />

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
              people, AMIR&apos;s journey has been built on freshness, fair trade
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
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <FinalCTA />
    </main>
  );
}