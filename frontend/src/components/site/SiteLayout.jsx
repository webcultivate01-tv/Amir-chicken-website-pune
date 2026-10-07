import React, { useState, useEffect } from "react";
import { NavLink, Link, Outlet, useLocation } from "react-router-dom";

import amirNavbarLogo from "../../../images/amir-seal-of-trust.png";
import amirFooterLogo from "../../../images/amir-wordmark-white.png";

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

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#271719]">

      {/* ==============================
          HEADER / NAVBAR
      =============================== */}

      <header className="sticky top-0 z-50 bg-white border-b border-[#271719]/10 shadow-sm">

        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

          <div className="h-[82px] grid grid-cols-3 items-center">

            {/* =========================
                LEFT - LOGO
            ========================== */}

            <div className="flex items-center justify-start">

              <Link
                to="/"
                className="flex items-center"
                aria-label="Amir 2.0 Home"
              >
                <img
                  src={amirNavbarLogo}
                  alt="Amir 2.0"
                  className="h-[50px] sm:h-[60px] w-auto object-contain"
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
                  className={({ isActive }) =>
                    `text-[15px] font-semibold tracking-wide transition-colors duration-200 ${
                      isActive
                        ? "text-[#EC1F36]"
                        : "text-[#271719] hover:text-[#EC1F36]"
                    }`
                  }
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
                to="/get-a-quote"
                className="
                  inline-flex
                  items-center
                  justify-center
                  px-6
                  py-3
                  rounded-md
                  bg-[#EC1F36]
                  text-white
                  text-sm
                  font-semibold
                  tracking-wide
                  transition-all
                  duration-200
                  hover:bg-[#271719]
                  hover:text-white
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
                  border-[#271719]/20
                  text-[#271719]
                  hover:border-[#EC1F36]
                  hover:text-[#EC1F36]
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
                    `px-4 py-3 rounded-md text-sm font-semibold transition ${
                      isActive
                        ? "bg-[#EC1F36]/10 text-[#EC1F36]"
                        : "text-[#271719] hover:bg-[#EC1F36]/5 hover:text-[#EC1F36]"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}


              {/* MOBILE GET A QUOTE */}

              <Link
                to="/get-a-quote"
                className="
                  mt-3
                  w-full
                  text-center
                  px-5
                  py-3
                  rounded-md
                  bg-[#EC1F36]
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

        {/* ==============================
            MAIN FOOTER
        =============================== */}

        <div className="max-w-[1480px] mx-auto px-14 lg:px-16 py-10 lg:py-11">

          <div className="grid grid-cols-1 md:grid-cols-[1.9fr_0.6fr_0.6fr_1.9fr] gap-10 lg:gap-12">


            {/* =========================
                BRAND
            ========================== */}

            <div>

              <Link
                to="/"
                className="inline-flex items-center"
                aria-label="Amir's Fresh Cut Home"
              >
                <img
                  src={amirFooterLogo}
                  alt="Amir's Fresh Cut"
                  className="h-[84px] w-auto object-contain"
                />
              </Link>

              <p className="mt-3 max-w-[350px] text-[13px] leading-5.5 text-[#F5EFE6]/65">
                AMIR Chicken | Fresh Protein Market.
                India's Trusted Chicken Retailer since 1991.
                600+ outlets serving Chicken, Eggs, Mutton and Fish.
              </p>


              {/* SOCIAL ICONS */}

              <div className="mt-5 flex items-center gap-3">

                {/* Facebook */}

                <a
                  href="https://www.facebook.com/amirchicken.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Amir Chicken Facebook"
                  className="
                    w-10 h-10
                    rounded-full
                    bg-[#7F1722]/35
                    border border-[#F5EFE6]/10
                    flex items-center justify-center
                    text-[#F5EFE6]
                    hover:bg-[#7F1722]
                    transition-all duration-200
                  "
                >
                  <svg
                    className="w-[15px] h-[15px]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14 8h3V4h-3c-3.31 0-5 1.69-5 5v3H6v4h3v8h4v-8h3l1-4h-4V9c0-.67.33-1 1-1z" />
                  </svg>
                </a>


                {/* Instagram */}

                <a
                  href="https://www.instagram.com/amirchicken.in/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Amir Chicken Instagram"
                  className="
                    w-10 h-10
                    rounded-full
                    bg-[#7F1722]/35
                    border border-[#F5EFE6]/10
                    flex items-center justify-center
                    text-[#F5EFE6]
                    hover:bg-[#7F1722]
                    transition-all duration-200
                  "
                >
                  <svg
                    className="w-[15px] h-[15px]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    viewBox="0 0 24 24"
                  >
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="5"
                    />

                    <circle
                      cx="12"
                      cy="12"
                      r="4"
                    />

                    <circle
                      cx="17.5"
                      cy="6.5"
                      r="1"
                      fill="currentColor"
                      stroke="none"
                    />
                  </svg>
                </a>


                {/* Email */}

                <a
                  href="mailto:amirchicken.info@gmail.com"
                  aria-label="Email Amir Chicken"
                  className="
                    w-10 h-10
                    rounded-full
                    bg-[#7F1722]/35
                    border border-[#F5EFE6]/10
                    flex items-center justify-center
                    text-[#F5EFE6]
                    hover:bg-[#7F1722]
                    transition-all duration-200
                  "
                >
                  <svg
                    className="w-[15px] h-[15px]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    viewBox="0 0 24 24"
                  >
                    <rect
                      x="3"
                      y="5"
                      width="18"
                      height="14"
                      rx="2"
                    />

                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 7l9 6 9-6"
                    />
                  </svg>
                </a>

              </div>

            </div>


            {/* =========================
                QUICK LINKS
            ========================== */}

            <div>

              <h3 className="text-[16px] font-semibold text-white">
                Quick Links
              </h3>

              <div className="mt-2.5 w-9 h-[2px] bg-[#F5EFE6]/70"></div>

              <ul className="mt-6 space-y-3">

                {links.map((link) => (
                  <li key={link.to}>

                    <Link
                      to={link.to}
                      className="
                        flex items-center gap-2
                        text-[13px]
                        text-[#F5EFE6]/65
                        hover:text-[#F5EFE6]
                        transition-colors duration-200
                      "
                    >
                      <span className="text-[#F5EFE6]/40">
                        &gt;
                      </span>

                      {link.label}

                    </Link>

                  </li>
                ))}

              </ul>

            </div>


            {/* =========================
                OUR RANGE
            ========================== */}

            <div>

              <h3 className="text-[16px] font-semibold text-white">
                Our Range
              </h3>

              <div className="mt-2.5 w-9 h-[2px] bg-[#F5EFE6]/80"></div>

              <ul className="mt-6 space-y-3">

                <li>
                  <Link
                    to="/catalog"
                    className="flex items-center gap-2 text-[13px] text-[#F5EFE6]/65 hover:text-[#F5EFE6] transition-colors duration-200"
                  >
                    <span className="text-[#F5EFE6]/40">
                      &gt;
                    </span>
                    Chicken
                  </Link>
                </li>

                <li>
                  <Link
                    to="/catalog"
                    className="flex items-center gap-2 text-[13px] text-[#F5EFE6]/65 hover:text-[#F5EFE6] transition-colors duration-200"
                  >
                    <span className="text-[#F5EFE6]/40">
                      &gt;
                    </span>
                    Eggs
                  </Link>
                </li>

                <li>
                  <Link
                    to="/catalog"
                    className="flex items-center gap-2 text-[13px] text-[#F5EFE6]/65 hover:text-[#F5EFE6] transition-colors duration-200"
                  >
                    <span className="text-[#F5EFE6]/40">
                      &gt;
                    </span>
                    Mutton
                  </Link>
                </li>

                <li>
                  <Link
                    to="/catalog"
                    className="flex items-center gap-2 text-[13px] text-[#F5EFE6]/65 hover:text-[#F5EFE6] transition-colors duration-200"
                  >
                    <span className="text-[#F5EFE6]/40">
                      &gt;
                    </span>
                    Fish
                  </Link>
                </li>

              </ul>

            </div>


            {/* =========================
                CONTACT
            ========================== */}

            <div>

              <h3 className="text-[16px] font-semibold text-white">
                Contact Us
              </h3>

              <div className="mt-2.5 w-9 h-[2px] bg-[#F5EFE6]/80"></div>


              <div className="mt-5 space-y-3.5">

                {/* ADDRESS */}

                <div className="flex items-start gap-3">

                  <div
                    className="
                      w-8 h-8 shrink-0
                      rounded-full
                      bg-[#7F1722]/35
                      border border-[#F5EFE6]/10
                      flex items-center justify-center
                      text-[#F5EFE6]
                    "
                  >
                    <svg
                      className="w-[14px] h-[14px]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 21s7-5.5 7-11a7 7 0 10-14 0c0 5 7 11 7 11z"
                      />

                      <circle
                        cx="12"
                        cy="10"
                        r="2.2"
                      />
                    </svg>
                  </div>

                  <div>

                    <p className="text-[13px] font-semibold text-white">
                      Address
                    </p>

                    <p className="mt-0.5 text-[12px] leading-5 text-[#F5EFE6]/60">
                      K-507, Mega Center, Hadapsar,
                      Pune, Maharashtra, India
                    </p>

                  </div>

                </div>


                {/* PHONE */}

                <div className="flex items-start gap-3">

                  <div
                    className="
                      w-8 h-8 shrink-0
                      rounded-full
                      bg-[#7F1722]/35
                      border border-[#F5EFE6]/10
                      flex items-center justify-center
                      text-[#F5EFE6]
                    "
                  >
                    <svg
                      className="w-[14px] h-[14px]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M22 16.92v3a2 2 0 01-2.18 2
                        19.79 19.79 0 01-8.63-3.07
                        19.5 19.5 0 01-6-6
                        19.79 19.79 0 01-3.07-8.67
                        A2 2 0 014.11 2h3
                        a2 2 0 012 1.72
                        12.84 12.84 0 00.7 2.81
                        2 2 0 01-.45 2.11L8.09 9.91
                        a16 16 0 006 6l1.27-1.27
                        a2 2 0 012.11-.45
                        12.84 12.84 0 002.81.7
                        A2 2 0 0122 16.92z"
                      />
                    </svg>
                  </div>

                  <div>

                    <p className="text-[13px] font-semibold text-white">
                      Phone
                    </p>

                    <a
                      href="tel:09527982525"
                      className="
                        mt-0.5 block
                        text-[12px]
                        text-[#F5EFE6]/60
                        hover:text-[#F5EFE6]
                        transition
                      "
                    >
                      +91 95279 82525
                    </a>

                  </div>

                </div>


                {/* EMAIL */}

                <div className="flex items-start gap-3">

                  <div
                    className="
                      w-8 h-8 shrink-0
                      rounded-full
                      bg-[#7F1722]/35
                      border border-[#F5EFE6]/10
                      flex items-center justify-center
                      text-[#F5EFE6]
                    "
                  >
                    <svg
                      className="w-[14px] h-[14px]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      viewBox="0 0 24 24"
                    >
                      <rect
                        x="3"
                        y="5"
                        width="18"
                        height="14"
                        rx="2"
                      />

                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 7l9 6 9-6"
                      />
                    </svg>
                  </div>

                  <div>

                    <p className="text-[13px] font-semibold text-white">
                      Email
                    </p>

                    <a
                      href="mailto:amirchicken.info@gmail.com"
                      className="
                        mt-0.5 block
                        text-[12px]
                        text-[#F5EFE6]/60
                        hover:text-[#F5EFE6]
                        transition
                      "
                    >
                      amirchicken.info@gmail.com
                    </a>

                  </div>

                </div>

              </div>


              {/* NEWSLETTER */}

              <div className="mt-6">

                <p className="text-[13px] font-semibold text-white">
                  Subscribe to our newsletter
                </p>

                <form className="mt-3 flex w-full max-w-[600px]">

                  <input
                    type="email"
                    placeholder="Your email"
                    className="
                      flex-1
                      min-w-0
                      h-9
                      rounded-md
                      bg-[#F5EFE6]/10
                      border border-[#F5EFE6]/10
                      px-3
                      text-[12px]
                      text-white
                      placeholder:text-[#F5EFE6]/40
                      outline-none
                      focus:border-[#7F1722]
                    "
                  />

                  <button
                    type="submit"
                    className="
                      ml-2
                      h-9
                      rounded-md
                      bg-[#F5EFE6]
                      px-4
                      text-[12px]
                      font-semibold
                      text-[#271719]
                      hover:bg-[#E8DED2]
                      transition
                    "
                  >
                    Subscribe
                  </button>

                </form>

              </div>

            </div>

          </div>

        </div>


        {/* ==============================
            BOTTOM BAR
        =============================== */}

        <div>

          <div
            className="
              max-w-[1300px]
              mx-auto
              px-8 lg:px-10
              border-t border-[#F5EFE6]/10
              py-3.5
              flex
              flex-col
              md:flex-row
              items-center
              justify-between
              gap-3
            "
          >

            {/* LEFT */}

            <div className="flex items-center gap-3">

              <Link
                to="/"
                aria-label="Amir's Fresh Cut Home"
                className="shrink-0"
              >
                <img
                  src={amirFooterLogo}
                  alt="Amir's Fresh Cut"
                  className="h-[40px] w-auto object-contain"
                />
              </Link>

              <p className="text-[12px] text-[#F5EFE6]/60">
                © {new Date().getFullYear()} Amir Chicken. All rights reserved.
              </p>

            </div>


            {/* RIGHT */}

            <div
              className="
                flex
                flex-wrap
                items-center
                justify-center
                gap-3
                text-[12px]
                text-[#F5EFE6]/60
              "
            >

              <span>
                Designed and Developed by{" "}
                <span className="text-[#1D4ED8] font-semibold">
                  Webcultivate
                </span>
              </span>

              <span>|</span>

              <Link
                to="/privacy-policy"
                className="hover:text-[#F5EFE6] transition"
              >
                Privacy Policy
              </Link>

              <span>|</span>

              <Link
                to="/terms"
                className="hover:text-[#F5EFE6] transition"
              >
                Terms & Conditions
              </Link>

            </div>

          </div>

        </div>

      </footer>

    </div>
  );
};

export default SiteLayout;