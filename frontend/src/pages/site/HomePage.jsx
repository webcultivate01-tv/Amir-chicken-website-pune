import React from "react";
import { Link } from "react-router-dom";
import { PRODUCTS } from "./products";

const features = [
  { icon: "🌿", title: "Farm Fresh", text: "Sourced daily from trusted local farms — never frozen for long." },
  { icon: "🧼", title: "Hygienic Processing", text: "Cleaned and packed in a clean, temperature-controlled facility." },
  { icon: "🚚", title: "Fast Delivery", text: "Same-day delivery for homes, restaurants and retail partners." },
  { icon: "💰", title: "Fair Prices", text: "Honest pricing with special rates on bulk and wholesale orders." },
];

const HomePage = () => (
  <>
    <section className="bg-gradient-to-br from-red-50 via-white to-amber-50">
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <span className="inline-block text-xs font-bold uppercase tracking-wider text-red-700 bg-red-100 px-3 py-1 rounded-full">
            Fresh every morning
          </span>
          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold leading-tight">
            Premium quality chicken, <span className="text-red-700">delivered fresh.</span>
          </h1>
          <p className="mt-4 text-slate-600 text-lg">
            Amir Chicken supplies fresh, hygienic chicken to families, restaurants and retailers — cut exactly the way you need it.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/catalog" className="bg-red-700 hover:bg-red-800 text-white font-semibold px-6 py-3 rounded-lg">
              Browse Catalog
            </Link>
            <Link
              to="/contact"
              className="border border-slate-300 hover:border-red-700 hover:text-red-700 font-semibold px-6 py-3 rounded-lg"
            >
              Contact Us
            </Link>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-red-100 to-amber-100 flex items-center justify-center text-8xl md:text-9xl shadow-inner">
            🍗
          </div>
        </div>
      </div>
    </section>

    <section className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-extrabold text-center">Why choose Amir Chicken</h2>
      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f) => (
          <div key={f.title} className="border border-mist-line rounded-2xl p-6 hover:shadow-md transition">
            <div className="text-3xl">{f.icon}</div>
            <h3 className="mt-3 font-bold">{f.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{f.text}</p>
          </div>
        ))}
      </div>
    </section>

    <section className="bg-mist">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex items-end justify-between">
          <h2 className="text-3xl font-extrabold">Popular products</h2>
          <Link to="/catalog" className="text-sm font-semibold text-red-700 hover:underline">
            View all →
          </Link>
        </div>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.slice(0, 4).map((p) => (
            <div key={p.id} className="bg-white rounded-2xl p-5 border border-mist-line">
              <div className="h-28 rounded-xl bg-red-50 flex items-center justify-center text-5xl">{p.emoji}</div>
              <h3 className="mt-4 font-bold">{p.name}</h3>
              <p className="text-sm text-slate-600 mt-1">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="max-w-6xl mx-auto px-4 py-16 text-center">
      <h2 className="text-3xl font-extrabold">Need chicken in bulk?</h2>
      <p className="mt-3 text-slate-600">
        Restaurants, caterers and retailers — get special wholesale pricing and regular supply.
      </p>
      <Link to="/contact" className="inline-block mt-6 bg-red-700 hover:bg-red-800 text-white font-semibold px-6 py-3 rounded-lg">
        Request a Quote
      </Link>
    </section>
  </>
);

export default HomePage;
