import React from "react";
import { Link } from "react-router-dom";

const stats = [
  { value: "10+", label: "Years of experience" },
  { value: "500+", label: "Happy customers" },
  { value: "100%", label: "Fresh, never stale" },
  { value: "7 days", label: "Open every week" },
];

const values = [
  { title: "Quality first", text: "Every batch is inspected before it reaches your kitchen." },
  { title: "Hygiene always", text: "Strict cleanliness and cold-chain standards at every step." },
  { title: "Honest service", text: "Fair weights, fair prices and no surprises." },
];

const AboutPage = () => (
  <>
    <section className="bg-gradient-to-br from-red-50 to-amber-50">
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-extrabold">
          About <span className="text-red-700">Amir Chicken</span>
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          A family-run chicken business built on one simple promise: fresh, clean and fairly priced chicken, every single day.
        </p>
      </div>
    </section>

    <section className="max-w-4xl mx-auto px-4 py-14">
      <h2 className="text-2xl font-extrabold">Our story</h2>
      <p className="mt-4 text-slate-600 leading-relaxed">
        Amir Chicken started as a small neighbourhood shop with a focus on freshness. Over the years we have grown to supply
        households, restaurants, caterers and retailers across the city — but our approach has not changed. We source from
        trusted farms, process in hygienic conditions and deliver quickly so you get chicken at its best.
      </p>
      <p className="mt-4 text-slate-600 leading-relaxed">
        Whether you need a kilo of curry cut for dinner or a weekly bulk supply for your restaurant, we cut, pack and deliver
        to your requirements.
      </p>
    </section>

    <section className="bg-mist">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {stats.map((s) => (
          <div key={s.label}>
            <p className="text-3xl font-extrabold text-red-700">{s.value}</p>
            <p className="text-sm text-slate-600 mt-1">{s.label}</p>
          </div>
        ))}
      </div>
    </section>

    <section className="max-w-6xl mx-auto px-4 py-14">
      <h2 className="text-2xl font-extrabold text-center">What we stand for</h2>
      <div className="mt-8 grid md:grid-cols-3 gap-6">
        {values.map((v) => (
          <div key={v.title} className="border border-mist-line rounded-2xl p-6">
            <h3 className="font-bold">{v.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{v.text}</p>
          </div>
        ))}
      </div>
      <div className="text-center mt-10">
        <Link to="/contact" className="bg-red-700 hover:bg-red-800 text-white font-semibold px-6 py-3 rounded-lg">
          Get in touch
        </Link>
      </div>
    </section>
  </>
);

export default AboutPage;
