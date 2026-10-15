
import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./PlateShowcase.css";

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    name: "Fresh Chicken",
    caption: "FRESHNESS, EVERY DAY",
    description:
      "Fresh chicken, carefully handled with quality and hygiene in mind.",
    image: "/images/raw-chicken-plate.png",
  },
  {
    name: "Tender Mutton",
    caption: "QUALITY YOU CAN TRUST",
    description:
      "Quality mutton selected with care for freshness and consistency.",
    image: "/images/raw-mutton-plate.png",
  },
  {
    name: "Fresh Fish",
    caption: "FRESH FROM THE WATER",
    description:
      "Fresh fish and seafood, handled with care from selection to your table.",
    image: "/images/fresh-fish-plate.png",
  },
  {
    name: "Farm Fresh Eggs",
    caption: "A DAILY ESSENTIAL",
    description:
      "Fresh eggs for everyday meals and family favourites.",
    image: "/images/fresh-eggs-plate.png",
  },
];

export default function PlateShowcase() {
  const sectionRef = useRef(null);
  const plateRef = useRef(null);
  const imageRefs = useRef([]);
  const textRefs = useRef([]);
  const progressRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const plate = plateRef.current;

    if (!section || !plate) return;

    const ctx = gsap.context(() => {
      const images = imageRefs.current;
      const texts = textRefs.current;

      if (
        images.some((image) => !image) ||
        texts.some((text) => !text)
      ) {
        return;
      }

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      gsap.set(images, { autoAlpha: 0 });
      gsap.set(images[0], { autoAlpha: 1 });

      gsap.set(texts, { autoAlpha: 0, y: 14 });
      gsap.set(texts[0], { autoAlpha: 1, y: 0 });

      gsap.set(plate, {
        scale: 1.1,
        rotation: 0,
        transformOrigin: "50% 50%",
      });

      if (progressRef.current) {
        gsap.set(progressRef.current, { scaleX: 0 });
      }

      if (reduceMotion) {
        gsap.set(plate, { clearProps: "transform" });
        gsap.set(images, { autoAlpha: 0 });
        gsap.set(images[0], { autoAlpha: 1 });
        gsap.set(texts, { autoAlpha: 1, y: 0 });
        gsap.set(progressRef.current, { scaleX: 1 });
        return;
      }

      const mm = gsap.matchMedia();

      mm.add("(min-width: 761px)", () => {
        const timeline = gsap.timeline({
          defaults: {
            ease: "power2.inOut",
          },
          scrollTrigger: {
            trigger: section,
            start: "top top+=74",
            end: "+=3600",
            pin: true,
            scrub: 0.7,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Cross-fade the product images and text during scrolling.
        products.slice(1).forEach((product, index) => {
          const previous = index;
          const next = index + 1;
          const at = 1.1 + index * 1.15;

          timeline.to(
            images[previous],
            {
              autoAlpha: 0,
              duration: 0.35,
            },
            at
          );

          timeline.to(
            images[next],
            {
              autoAlpha: 1,
              duration: 0.4,
            },
            at + 0.15
          );

          timeline.to(
            texts[previous],
            {
              autoAlpha: 0,
              y: -12,
              duration: 0.25,
            },
            at
          );

          timeline.fromTo(
            texts[next],
            {
              autoAlpha: 0,
              y: 14,
            },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.4,
            },
            at + 0.15
          );
        });

        // Measure the product sequence before adding the plate's
        // continuous rotation and scale animation.
        const sequenceDuration = timeline.duration();

        // One complete clockwise rotation during the pinned scroll.
        // The plate also grows as the visitor scrolls.
        timeline.to(
          plate,
          {
            rotation: 180,
            scale: 1.25,
            duration: sequenceDuration,
            ease: "none",
          },
          0
        );

        // Progress bar follows the same scroll sequence.
        if (progressRef.current) {
          timeline.to(
            progressRef.current,
            {
              scaleX: 1,
              duration: sequenceDuration,
              ease: "none",
            },
            0
          );
        }

        return () => timeline.kill();
      });

      // On mobile, show all products in a normal scrolling layout.
      mm.add("(max-width: 760px)", () => {
        gsap.set(plate, { clearProps: "transform" });
        gsap.set(images, { autoAlpha: 1 });
        gsap.set(texts, { clearProps: "all" });
        gsap.set(progressRef.current, { scaleX: 1 });
      });

      return () => mm.revert();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="plate-showcase"
      aria-label="Fresh protein products"
    >
      <div className="plate-showcase__inner">
        <div className="plate-showcase__layout">
          <div className="plate-showcase__visual">
            <div
              className="plate-showcase__plate"
              ref={plateRef}
            >
              {products.map((product, index) => (
                <img
                  key={product.name}
                  ref={(element) => {
                    imageRefs.current[index] = element;
                  }}
                  className="plate-showcase__plate-image"
                  src={product.image}
                  alt={product.name}
                  loading={index === 0 ? "eager" : "lazy"}
                />
              ))}
            </div>
          </div>

          <div
            className="plate-showcase__details"
            aria-live="polite"
            aria-atomic="true"
          >
            {products.map((product, index) => (
              <article
                key={product.name}
                ref={(element) => {
                  textRefs.current[index] = element;
                }}
                className="plate-showcase__product"
              >
                <span className="plate-showcase__caption">
                  {product.caption}
                </span>

                <h3>{product.name}</h3>

                <p>{product.description}</p>

                <Link
                  to="/catalog"
                  className="plate-showcase__link"
                >
                  Explore products{" "}
                  <span aria-hidden="true">↗</span>
                </Link>
              </article>
            ))}
          </div>
        </div>

        <footer className="plate-showcase__footer">
          <div className="plate-showcase__progress-track">
            <span
              ref={progressRef}
              className="plate-showcase__progress"
            />
          </div>
        </footer>

        <div className="plate-showcase__mobile-list">
          {products.map((product) => (
            <article key={product.name}>
              <img
                src={product.image}
                alt={product.name}
                loading="lazy"
              />

              <span className="plate-showcase__caption">
                {product.caption}
              </span>

              <h3>{product.name}</h3>
              <p>{product.description}</p>

              <Link
                to="/catalog"
                className="plate-showcase__link"
              >
                Explore products ↗
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
