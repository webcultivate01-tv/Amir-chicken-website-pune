/* =========================================================
   NEWS & MEDIA HERO — floating product story cards.
   One card each for chicken, mutton, fish and eggs, using the
   site's own product photography. `date` and `content` feed the
   "Read Full Story" modal.
========================================================= */

import chickenImg from "../../images/products/chicken/Whole Chicken With Skin.webp";
import muttonImg from "../../images/products/mutton/Mutton Curry Cut.webp";
import fishImg from "../../images/products/fish&seafood/Fresh Fish.webp";
import eggsImg from "../../images/products/eggs/Farm Fresh Eggs.webp";

export const heroCards = [
  {
    id: "chicken",
    corner: "top-left",
    tag: "Chicken",
    title: "Fresh Chicken, Every Single Day",
    description: "Tender, hygienic cuts from trusted farm partners.",
    image: chickenImg,
    alt: "Fresh whole chicken",
    rotate: -8,
    date: "3 October 2026",
    content: [
      "Chicken is the heart of the Amir counter — whole birds, curry cuts, boneless breast and tandoor-ready pieces, all processed fresh every morning.",
      "Sourcing teams visit partner farms on a fixed weekly rotation, checking feed quality, housing conditions and transport handling, so nothing is left to chance between the farm gate and the store counter.",
      "The result is chicken that stays tender, cooks evenly and tastes the way it should — the standard Amir has held since 1991.",
    ],
  },
  {
    id: "mutton",
    corner: "top-right",
    tag: "Mutton",
    title: "Premium Mutton, Perfectly Cut",
    description: "Curry cuts, chops and boneless — cut to order.",
    image: muttonImg,
    alt: "Fresh mutton curry cut",
    rotate: 8,
    date: "21 August 2026",
    content: [
      "Amir's mutton range covers everything from classic curry cuts and chops to boneless, shoulder and leg, each prepared fresh and trimmed to the way families actually cook.",
      "Every batch goes through the same six-point quality routine as the rest of the catalogue, so the cut you buy on Sunday is as good as the one you bought last week.",
      "Whether it's a slow-cooked curry or a festive biryani, the aim is simple: rich flavour and consistent quality.",
    ],
  },
  {
    id: "fish",
    corner: "bottom-left",
    tag: "Fish & Seafood",
    title: "Fresh Catch, Straight to You",
    description: "Sea and river fish kept cold from catch to counter.",
    image: fishImg,
    alt: "Fresh fish on display",
    rotate: -6,
    date: "9 July 2026",
    content: [
      "Fish is one of the most delicate products to handle, which is why Amir keeps its fish and seafood on a tight cold chain from landing to store counter.",
      "The range includes everyday favourites and market-cut options, cleaned and ready for the pan, the tawa or the curry pot.",
      "Light, protein-rich and full of flavour — fresh fish is simple food that supports stronger tomorrows.",
    ],
  },
  {
    id: "eggs",
    corner: "bottom-right",
    tag: "Eggs",
    title: "Farm Fresh Eggs, Daily Goodness",
    description: "Wholesome, protein-packed and always fresh.",
    image: eggsImg,
    alt: "Farm fresh eggs",
    rotate: 8,
    date: "28 May 2026",
    content: [
      "From farm fresh white eggs to country eggs, Amir's egg range is a daily staple for breakfast tables and home kitchens across the network.",
      "Eggs are graded, handled carefully and stocked in quantities that keep turnover high, so freshness stays a given rather than a promise.",
      "Affordable, versatile and rich in protein — a small everyday ingredient that does a lot of work.",
    ],
  },
];
