import React, { useState, useEffect } from "react";
import { NavLink, Link, Outlet, useLocation } from "react-router-dom";
import amirLogo from "../../../images/amir-logo.png";

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
    `text-[15px] font-semibold tracking-wide transition-colors duration-200 ${
      isActive
        ? "text-[#7F1722]"
        : "text-[#271719] hover:text-[#7F1722]"
    }`;

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#271719]">

      {/* ==============================
          HEADER / NAVBAR
      =============================== */}
      <header className="sticky top-0 z-50 bg-white border-b border-[#271719]/10">

        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

          <div className="h-[78px] grid grid-cols-3 items-center">

            {/* =========================
                LEFT - LOGO
            ========================== */}
            <div className="flex items-center justify-start">

              <Link
                to="/"
                className="flex items-center"
                aria-label="Amir Chicken Home"
              >
                <img
                  src={amirLogo}
                  alt="Amir Chicken"
                  className="h-[62px] w-[62px] object-contain"
                />
              </Link>

            </div>


            {/* =========================
                CENTER - NAVIGATION
            ========================== */}
            <nav className="hidden md:flex items-center justify-center gap-9">

              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  className={linkClass}
                >
                  {link.label}
                </NavLink>
              ))}

            </nav>


            {/* =========================
                RIGHT - CTA
            ========================== */}
            <div className="hidden md:flex items-center justify-end">

              <Link
                to="/contact"
                className="
                  inline-flex
                  items-center
                  justify-center
                  px-6
                  py-3
                  rounded-md
                  bg-[#7F1722]
                  text-white
                  text-sm
                  font-semibold
                  tracking-wide
                  transition-all
                  duration-200
                  hover:bg-[#271719]
                  hover:shadow-md
                "
              >
                Get a Quote
              </Link>

            </div>


            {/* =========================
                MOBILE MENU BUTTON
            ========================== */}
            <div className="md:hidden flex items-center justify-end col-span-2">

              <button
                className="
                  flex
                  items-center
                  justify-center
                  w-10
                  h-10
                  rounded-md
                  border
                  border-[#271719]/15
                  text-[#271719]
                  hover:border-[#7F1722]
                  hover:text-[#7F1722]
                  transition
                "
                onClick={() => setOpen((o) => !o)}
                aria-label="Toggle navigation menu"
                aria-expanded={open}
              >

                {open ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 6l12 12M18 6L6 18"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}

              </button>

            </div>

          </div>

        </div>


        {/* ==============================
            MOBILE NAVIGATION
        =============================== */}
        {open && (
          <div className="md:hidden border-t border-[#271719]/10 bg-white">

            <nav className="max-w-7xl mx-auto px-5 py-5 flex flex-col gap-1">

              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    `
                    px-4
                    py-3
                    rounded-md
                    text-sm
                    font-semibold
                    transition
                    ${
                      isActive
                        ? "bg-[#F5EFE6] text-[#7F1722]"
                        : "text-[#271719] hover:bg-[#F5EFE6] hover:text-[#7F1722]"
                    }
                    `
                  }
                >
                  {link.label}
                </NavLink>
              ))}


              <Link
                to="/contact"
                className="
                  mt-3
                  w-full
                  text-center
                  px-5
                  py-3
                  rounded-md
                  bg-[#7F1722]
                  text-white
                  text-sm
                  font-semibold
                  hover:bg-[#271719]
                  transition
                "
              >
                Get a Quote
              </Link>

            </nav>

          </div>
        )}

      </header>


      {/* ==============================
          MAIN CONTENT
      =============================== */}
      <main className="flex-1">
        <Outlet />
      </main>


      {/* ==============================
          FOOTER
      =============================== */}
      <footer className="bg-[#271719] text-[#F5EFE6]">

        {/* Main Footer */}
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-14">

          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">


            {/* =========================
                BRAND
            ========================== */}
            <div className="lg:col-span-2">

              <Link
                to="/"
                className="inline-flex items-center"
              >
                <img
                  src={amirLogo}
                  alt="Amir Chicken"
                  className="h-20 w-20 object-contain"
                />
              </Link>


              <p className="mt-5 max-w-md text-sm leading-7 text-[#F5EFE6]/70">
                Quality chicken products with a focus on freshness,
                hygiene and reliable service for homes, restaurants
                and businesses.
              </p>


              {/* Gold Accent */}
              <div className="mt-6 flex items-center gap-2">

                <span className="w-8 h-[3px] bg-[#FFBA00] rounded-full"></span>

                <span className="w-2 h-2 rounded-full bg-[#FFBA00]"></span>

              </div>

            </div>


            {/* =========================
                QUICK LINKS
            ========================== */}
            <div>

              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                Quick Links
              </h3>

              <ul className="mt-5 space-y-3">

                {links.map((link) => (
                  <li key={link.to}>

                    <Link
                      to={link.to}
                      className="
                        text-sm
                        text-[#F5EFE6]/70
                        hover:text-[#FFBA00]
                        transition-colors
                      "
                    >
                      {link.label}
                    </Link>

                  </li>
                ))}

              </ul>

            </div>


            {/* =========================
                CONTACT
            ========================== */}
            <div>

              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                Contact
              </h3>

              <div className="mt-5 space-y-4 text-sm text-[#F5EFE6]/70">

                {/* Replace these with actual details */}

                <p>
                  Address: Add business address
                </p>

                <p>
                  Phone: Add phone number
                </p>

                <p>
                  Email: Add email address
                </p>

              </div>

            </div>

          </div>

        </div>


        {/* ==============================
            GOLD ACCENT
        =============================== */}
        <div className="h-[3px] bg-[#FFBA00]"></div>


        {/* ==============================
            COPYRIGHT
        =============================== */}
        <div className="bg-[#211516]">

          <div
            className="
              max-w-7xl
              mx-auto
              px-5
              sm:px-6
              lg:px-8
              py-5
              flex
              flex-col
              sm:flex-row
              items-center
              justify-between
              gap-3
            "
          >

            <p className="text-xs text-[#F5EFE6]/50">
              © {new Date().getFullYear()} Amir Chicken. All rights reserved.
            </p>

            <p className="text-xs text-[#F5EFE6]/50">
              Freshness. Quality. Trust.
            </p>

          </div>

        </div>

      </footer>

    </div>
  );
};

export default SiteLayout;