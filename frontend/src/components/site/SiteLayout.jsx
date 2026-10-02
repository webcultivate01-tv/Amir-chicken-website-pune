import React, { useState, useEffect } from "react";
import { NavLink, Link, Outlet, useLocation } from "react-router-dom";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About" },
  { to: "/catalog", label: "Catalog" },
  { to: "/contact", label: "Contact" },
];

const SiteLayout = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
    window.scrollTo(0, 0);
  }, [pathname]);

  const linkClass = ({ isActive }) =>
    `text-sm font-semibold transition ${isActive ? "text-red-700" : "text-slate-700 hover:text-red-700"}`;

  return (
    <div className="min-h-screen flex flex-col bg-white text-ink">
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-mist-line">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-extrabold text-lg">
            <span className="text-2xl">🍗</span>
            <span>
              Amir <span className="text-red-700">Chicken</span>
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>
                {l.label}
              </NavLink>
            ))}
            <Link to="/contact" className="bg-red-700 hover:bg-red-800 text-white text-sm font-semibold px-4 py-2 rounded-lg">
              Get a Quote
            </Link>
          </nav>
          <button
            className="md:hidden p-2 rounded-lg border border-mist-line"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        {open && (
          <nav className="md:hidden border-t border-mist-line px-4 py-3 flex flex-col gap-3 bg-white">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>
                {l.label}
              </NavLink>
            ))}
          </nav>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-slate-900 text-slate-300">
        <div className="max-w-6xl mx-auto px-4 py-10 grid gap-8 md:grid-cols-3">
          <div>
            <p className="font-extrabold text-white text-lg">🍗 Amir Chicken</p>
            <p className="text-sm mt-3 text-slate-400">
              Fresh, hygienic and honestly priced chicken — delivered to homes, restaurants and retailers.
            </p>
          </div>
          <div>
            <p className="font-semibold text-white mb-3">Quick links</p>
            <ul className="space-y-2 text-sm">
              {links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-semibold text-white mb-3">Contact</p>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>📍 Main Market Road, Your City</li>
              <li>📞 +91 98765 43210</li>
              <li>✉️ hello@amirchicken.com</li>
              <li>🕖 Daily 7:00 AM – 10:00 PM</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 py-4 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Amir Chicken. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default SiteLayout;
