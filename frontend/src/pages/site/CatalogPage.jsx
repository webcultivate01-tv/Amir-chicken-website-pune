import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CATEGORIES, PRODUCTS } from "./products";

const CatalogPage = () => {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");

  const visible = PRODUCTS.filter(
    (p) =>
      (category === "All" || p.category === category) &&
      p.name.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold">
        Our <span className="text-red-700">Catalog</span>
      </h1>
      <p className="mt-2 text-slate-600">Fresh cuts, whole birds, marinated and bulk packs. Contact us for today's rates.</p>

      <div className="mt-8 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition ${
                category === c ? "bg-red-700 text-white border-red-700" : "border-mist-line hover:border-red-700"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products…"
          className="border border-mist-line rounded-lg px-4 py-2 text-sm w-full md:w-64 focus:outline-none focus:border-red-700"
        />
      </div>

      {visible.length === 0 ? (
        <p className="mt-12 text-center text-slate-500">No products match your search.</p>
      ) : (
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((p) => (
            <div key={p.id} className="border border-mist-line rounded-2xl p-5 flex flex-col hover:shadow-md transition">
              <div className="h-36 rounded-xl bg-red-50 flex items-center justify-center text-6xl">{p.emoji}</div>
              <span className="mt-4 text-xs font-bold uppercase tracking-wide text-red-700">{p.category}</span>
              <h3 className="font-bold text-lg">{p.name}</h3>
              <p className="text-sm text-slate-600 mt-1 flex-1">{p.desc}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-slate-500">Price {p.unit}: on request</span>
                <Link
                  to={`/contact?product=${encodeURIComponent(p.name)}`}
                  className="text-sm font-semibold bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-lg"
                >
                  Enquire
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default CatalogPage;
