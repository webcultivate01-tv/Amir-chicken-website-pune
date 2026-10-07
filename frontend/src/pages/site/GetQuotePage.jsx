import React, { useState } from "react";

const ArrowIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="h-4 w-4"
  >
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </svg>
);

const CheckIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="h-4 w-4"
  >
    <path d="m5 12 4 4L19 6" />
  </svg>
);

const categories = ["Chicken", "Eggs", "Mutton", "Fish"];

export default function GetQuotePage() {
  const [category, setCategory] = useState("Chicken");

  return (
    <main className="min-h-screen bg-[#F7F7F6] text-[#171719]">

      {/* ================= HERO ================= */}
      <section className="px-5 pb-8 pt-6 sm:px-8 lg:px-12 lg:pt-8">
        <div className="mx-auto max-w-[1480px]">

          <div className="grid overflow-hidden rounded-[32px] bg-[#281719] lg:grid-cols-[0.95fr_1.05fr]">

            {/* ================= LEFT IMAGE ================= */}
            <div className="relative min-h-[560px] overflow-hidden lg:min-h-[720px]">

              <img
                src="https://images.pexels.com/photos/10886018/pexels-photo-10886018.jpeg"
                alt="Fresh chicken prepared for cooking"
                className="absolute inset-0 h-full w-full object-cover"
              />

              {/* IMAGE OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#281719] via-[#281719]/30 to-transparent" />

              {/* LEFT CONTENT */}
              <div className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-10 lg:p-14">

                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FFB800]">
                  AMIR • Direct Supply
                </p>

                <h1 className="mt-4 max-w-xl text-5xl font-semibold leading-[0.95] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
                  Let's build your
                  <br />
                  fresh supply.
                </h1>

                <p className="mt-6 max-w-md text-sm leading-6 text-white/70 sm:text-base">
                  Tell us what you need. From regular requirements to larger
                  supply enquiries, our team is ready to understand your
                  requirement.
                </p>

              </div>

            </div>


            {/* ================= RIGHT FORM ================= */}
            <div className="bg-white p-7 sm:p-10 lg:p-14">

              {/* FORM HEADER */}
              <div className="mb-9">

                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#EC1F36]">
                  Get a Quote
                </p>

                <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                  Tell us what you need.
                </h2>

                <p className="mt-3 max-w-md text-sm leading-6 text-neutral-500">
                  Share a few details about your requirement and our team can
                  understand your enquiry better.
                </p>

              </div>


              <form className="space-y-6">

                {/* ================= CATEGORY ================= */}
                <div>

                  <label className="mb-3 block text-xs font-semibold uppercase tracking-[0.1em]">
                    Select Protein Category
                  </label>

                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">

                    {categories.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setCategory(item)}
                        className={`rounded-xl border px-4 py-3 text-sm font-medium transition ${
                          category === item
                            ? "border-[#EC1F36] bg-[#EC1F36] text-white"
                            : "border-neutral-200 bg-white text-neutral-700 hover:border-[#EC1F36]/50"
                        }`}
                      >
                        {item}
                      </button>
                    ))}

                  </div>

                </div>


                {/* ================= NAME ================= */}
                <div className="grid gap-5 sm:grid-cols-2">

                  <div>
                    <label
                      htmlFor="firstName"
                      className="mb-2 block text-xs font-medium"
                    >
                      First Name *
                    </label>

                    <input
                      id="firstName"
                      type="text"
                      required
                      placeholder="Your first name"
                      className="h-12 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm outline-none transition placeholder:text-neutral-400 focus:border-[#EC1F36]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="lastName"
                      className="mb-2 block text-xs font-medium"
                    >
                      Last Name
                    </label>

                    <input
                      id="lastName"
                      type="text"
                      placeholder="Your last name"
                      className="h-12 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm outline-none transition placeholder:text-neutral-400 focus:border-[#EC1F36]"
                    />
                  </div>

                </div>


                {/* ================= PHONE + EMAIL ================= */}
                <div className="grid gap-5 sm:grid-cols-2">

                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-xs font-medium"
                    >
                      Phone Number *
                    </label>

                    <input
                      id="phone"
                      type="tel"
                      required
                      placeholder="+91 XXXXX XXXXX"
                      className="h-12 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm outline-none transition placeholder:text-neutral-400 focus:border-[#EC1F36]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-xs font-medium"
                    >
                      Email Address
                    </label>

                    <input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      className="h-12 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm outline-none transition placeholder:text-neutral-400 focus:border-[#EC1F36]"
                    />
                  </div>

                </div>


                {/* ================= REQUIREMENT ================= */}
                <div>

                  <label
                    htmlFor="requirement"
                    className="mb-2 block text-xs font-medium"
                  >
                    Requirement Type
                  </label>

                  <select
                    id="requirement"
                    defaultValue="Regular Supply"
                    className="h-12 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm text-neutral-700 outline-none transition focus:border-[#EC1F36]"
                  >
                    <option>Regular Supply</option>
                    <option>Bulk Order</option>
                    <option>Institutional Requirement</option>
                    <option>Business Enquiry</option>
                    <option>Other</option>
                  </select>

                </div>


                {/* ================= FREQUENCY ================= */}
                <div>

                  <label
                    htmlFor="frequency"
                    className="mb-2 block text-xs font-medium"
                  >
                    Estimated Volume / Frequency
                  </label>

                  <select
                    id="frequency"
                    defaultValue="Not sure yet"
                    className="h-12 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm text-neutral-700 outline-none transition focus:border-[#EC1F36]"
                  >
                    <option>Not sure yet</option>
                    <option>Occasional requirement</option>
                    <option>Weekly requirement</option>
                    <option>Daily requirement</option>
                    <option>Large / Bulk requirement</option>
                  </select>

                </div>


                {/* ================= MESSAGE ================= */}
                <div>

                  <label
                    htmlFor="message"
                    className="mb-2 block text-xs font-medium"
                  >
                    Requirement Details
                  </label>

                  <textarea
                    id="message"
                    rows="5"
                    placeholder={`Tell us about your ${category.toLowerCase()} requirement...`}
                    className="w-full resize-none rounded-[18px] border border-neutral-200 bg-white px-4 py-4 text-sm outline-none transition placeholder:text-neutral-400 focus:border-[#EC1F36]"
                  />

                </div>


                {/* ================= SUBMIT ================= */}
                <button
                  type="submit"
                  className="group flex w-full items-center justify-between rounded-full bg-[#EC1F36] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#c9182d]"
                >
                  <span>Submit Enquiry</span>

                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#EC1F36] transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowIcon />
                  </span>
                </button>


                {/* ================= NOTE ================= */}
                <p className="text-center text-xs leading-5 text-neutral-400">
                  By submitting this form, you are sharing your details with
                  AMIR Chicken for the purpose of responding to your enquiry.
                </p>

              </form>

            </div>

          </div>

        </div>
      </section>


      {/* ================= TRUST STRIP ================= */}
      <section className="px-6 py-16 sm:px-8 lg:px-12 lg:py-20">

        <div className="mx-auto max-w-[1200px]">

          <div className="grid gap-8 border-y border-neutral-200 py-10 sm:grid-cols-3">

            <div className="flex gap-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FFF0F1] text-[#EC1F36]">
                <CheckIcon />
              </div>

              <div>
                <h3 className="text-sm font-semibold">
                  Clear requirements
                </h3>

                <p className="mt-1 text-sm leading-5 text-neutral-500">
                  Tell us exactly what you are looking for.
                </p>
              </div>
            </div>


            <div className="flex gap-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FFF0F1] text-[#EC1F36]">
                <CheckIcon />
              </div>

              <div>
                <h3 className="text-sm font-semibold">
                  Multiple protein categories
                </h3>

                <p className="mt-1 text-sm leading-5 text-neutral-500">
                  Chicken, eggs, mutton and fish.
                </p>
              </div>
            </div>


            <div className="flex gap-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FFF0F1] text-[#EC1F36]">
                <CheckIcon />
              </div>

              <div>
                <h3 className="text-sm font-semibold">
                  Direct enquiry
                </h3>

                <p className="mt-1 text-sm leading-5 text-neutral-500">
                  Your requirement goes directly to AMIR.
                </p>
              </div>
            </div>

          </div>

        </div>

      </section>


      {/* ================= FINAL CTA ================= */}
      <section className="px-6 pb-24 sm:px-8 lg:px-12">

        <div className="mx-auto max-w-[1200px] text-center">

          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#EC1F36]">
            Need something else?
          </p>

          <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
            We’re always happy to hear from you.
          </h2>

          <a
            href="mailto:amirchicken.info@gmail.com"
            className="mt-7 inline-flex items-center gap-3 rounded-full bg-[#171719] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#EC1F36]"
          >
            Email AMIR
            <ArrowIcon />
          </a>

        </div>

      </section>

    </main>
  );
}