import React from "react";

import Hero from "../../components/site/news/magazine/Hero";
import QuickFive from "../../components/site/news/magazine/QuickFive";
import Foodverse from "../../components/site/news/magazine/Foodverse";
import CulinaryVoice from "../../components/site/news/magazine/CulinaryVoice";
import Poll from "../../components/site/news/magazine/Poll";
import Features from "../../components/site/news/magazine/Features";
import NewsTrends from "../../components/site/news/magazine/NewsTrends";
import Newsletter from "../../components/site/news/magazine/Newsletter";

const NewsPage = () => (
  <div className="bg-mag-offwhite text-mag-ink">
    <Hero />
    <QuickFive />
    <Foodverse />
    <CulinaryVoice />
    <Poll />
    <Features />
    <NewsTrends />
    <Newsletter />
  </div>
);

export default NewsPage;
