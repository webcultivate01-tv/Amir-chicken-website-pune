import React from "react";

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

const LocationIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-5 w-5"
  >
    <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

const PhoneIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-5 w-5"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92Z" />
  </svg>
);

const MailIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-5 w-5"
  >
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

const InstagramIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-[18px] w-[18px]"
  >
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
  </svg>
);

const FacebookIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-[18px] w-[18px]"
  >
    <path d="M14 8h3V4h-3c-3.31 0-5 1.69-5 5v3H6v4h3v4h4v-4h3l1-4h-4V9c0-.67.33-1 1-1Z" />
  </svg>
);

const contactInfo = [
  {
    label: "Visit us",
    value: "K-507, Mega Center, Hadapsar, Pune, Maharashtra, India",
    icon: <LocationIcon />,
  },
  {
    label: "Call us",
    value: "+91 95279 82525",
    icon: <PhoneIcon />,
  },
  {
    label: "Email us",
    value: "amirchicken.info@gmail.com",
    icon: <MailIcon />,
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white text-[#171719]">

      {/* ================= CONTACT SECTION ================= */}
      <section className="px-5 py-6 sm:px-8 lg:px-12 lg:py-8">
        <div className="mx-auto max-w-[1480px] overflow-hidden rounded-[30px] bg-[#F5F5F4]">

          <div className="grid gap-12 px-7 py-12 sm:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-20 lg:py-20">

            {/* ================= LEFT CONTENT ================= */}
            <div className="flex flex-col justify-center">

              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#EC1F36]">
                Contact AMIR
              </p>

              <h1 className="mt-5 max-w-lg text-5xl font-semibold leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
                Get in
                <br />
                touch with us
                <span className="text-[#EC1F36]">.</span>
              </h1>

              <p className="mt-7 max-w-md text-base leading-7 text-neutral-600">
                Have a question, product enquiry, bulk requirement or simply
                want to know more about AMIR? Send us a message and our team
                will get back to you.
              </p>

              {/* CONTACT INFORMATION */}
              <div className="mt-10 space-y-6">

                {contactInfo.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-start gap-4"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#EC1F36] shadow-sm">
                      {item.icon}
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-neutral-400">
                        {item.label}
                      </p>

                      <p className="mt-1 max-w-sm text-sm font-medium leading-6">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}

              </div>

              {/* SOCIAL LINKS */}
              <div className="mt-10">

                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-neutral-400">
                  Follow us
                </p>

                <div className="flex gap-2">

                  <a
                    href="https://www.instagram.com/amirchicken.in/?hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#171719] transition hover:bg-[#EC1F36] hover:text-white"
                  >
                    <InstagramIcon />
                  </a>

                  <a
                    href="https://www.facebook.com/amirchicken.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#171719] transition hover:bg-[#EC1F36] hover:text-white"
                  >
                    <FacebookIcon />
                  </a>

                </div>

              </div>

            </div>


            {/* ================= FORM ================= */}
            <div className="rounded-[28px] bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.05)] sm:p-8 lg:p-10">

              <div className="mb-8">

                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#EC1F36]">
                  Get in touch
                </p>

                <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                  Send us a message
                </h2>

                <p className="mt-2 text-sm leading-6 text-neutral-500">
                  Tell us about your requirement and we’ll take it from there.
                </p>

              </div>


              <form className="space-y-5">

                {/* FIRST + LAST NAME */}
                <div className="grid gap-5 sm:grid-cols-2">

                  <div>
                    <label
                      htmlFor="firstName"
                      className="mb-2 block text-xs font-medium"
                    >
                      First Name
                    </label>

                    <input
                      id="firstName"
                      type="text"
                      placeholder="Enter your first name"
                      className="h-12 w-full rounded-full border border-neutral-200 px-5 text-sm outline-none transition placeholder:text-neutral-400 focus:border-[#EC1F36]"
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
                      placeholder="Enter your last name"
                      className="h-12 w-full rounded-full border border-neutral-200 px-5 text-sm outline-none transition placeholder:text-neutral-400 focus:border-[#EC1F36]"
                    />
                  </div>

                </div>


                {/* EMAIL */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-xs font-medium"
                  >
                    Email
                  </label>

                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    className="h-12 w-full rounded-full border border-neutral-200 px-5 text-sm outline-none transition placeholder:text-neutral-400 focus:border-[#EC1F36]"
                  />
                </div>


                {/* PHONE */}
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-xs font-medium"
                  >
                    Phone Number
                  </label>

                  <input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    className="h-12 w-full rounded-full border border-neutral-200 px-5 text-sm outline-none transition placeholder:text-neutral-400 focus:border-[#EC1F36]"
                  />
                </div>


                {/* ENQUIRY */}
                <div>
                  <label
                    htmlFor="enquiry"
                    className="mb-2 block text-xs font-medium"
                  >
                    What can we help you with?
                  </label>

                  <select
                    id="enquiry"
                    defaultValue="General Enquiry"
                    className="h-12 w-full rounded-full border border-neutral-200 bg-white px-5 text-sm text-neutral-600 outline-none transition focus:border-[#EC1F36]"
                  >
                    <option>General Enquiry</option>
                    <option>Bulk / Institutional Order</option>
                    <option>Franchise Enquiry</option>
                    <option>Product Enquiry</option>
                    <option>Other</option>
                  </select>
                </div>


                {/* MESSAGE */}
                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-xs font-medium"
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    rows="5"
                    placeholder="Tell us a little about your requirement..."
                    className="w-full resize-none rounded-[22px] border border-neutral-200 px-5 py-4 text-sm outline-none transition placeholder:text-neutral-400 focus:border-[#EC1F36]"
                  />
                </div>


                {/* SUBMIT */}
                <button
                  type="submit"
                  className="group flex w-full items-center justify-between rounded-full bg-[#171719] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#EC1F36]"
                >
                  <span>Send Message</span>

                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#171719] transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowIcon />
                  </span>
                </button>

              </form>

            </div>

          </div>
        </div>
      </section>


      {/* ================= BOTTOM STATEMENT ================= */}
      <section className="px-6 py-20 sm:px-8 lg:px-12 lg:py-28">

        <div className="mx-auto max-w-[1480px]">

          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#EC1F36]">
            AMIR Chicken
          </p>

          <h2 className="mt-5 max-w-5xl text-4xl font-semibold leading-tight tracking-[-0.035em] sm:text-5xl lg:text-6xl">
            Have something to ask?
            <span className="text-neutral-400">
              {" "}We’re here to help.
            </span>
          </h2>

        </div>

      </section>

    </main>
  );
}