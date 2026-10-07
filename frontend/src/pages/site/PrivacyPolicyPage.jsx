import React from "react";

const sections = [
  {
    title: "1. Information We Collect",
    content: (
      <>
        <p>
          When you interact with the AMIR Chicken website, we may receive
          information that you voluntarily provide to us, such as your name,
          phone number, email address, and details submitted through enquiry or
          quote forms.
        </p>

        <p>
          We may also receive basic technical information about your visit,
          such as browser type, device information, and website usage data.
        </p>
      </>
    ),
  },
  {
    title: "2. How We Use Your Information",
    content: (
      <>
        <p>
          Information submitted through this website may be used to respond to
          enquiries, process requests, provide information about our products
          and services, and communicate with you regarding your enquiry.
        </p>

        <p>
          We may also use information to improve our website, services, and
          overall customer experience.
        </p>
      </>
    ),
  },
  {
    title: "3. Sharing of Information",
    content: (
      <p>
        AMIR Chicken does not use your submitted information for purposes
        unrelated to your interaction with us. Information may be shared with
        service providers or other parties where reasonably necessary to
        operate the website, respond to enquiries, or provide requested
        services.
      </p>
    ),
  },
  {
    title: "4. Cookies and Website Technologies",
    content: (
      <p>
        Our website may use cookies or similar technologies to support website
        functionality, understand website usage, and improve your experience.
        You can manage cookie preferences through your browser settings.
      </p>
    ),
  },
  {
    title: "5. Data Security",
    content: (
      <p>
        We take reasonable measures to protect information submitted through
        our website. However, no method of transmission or electronic storage
        can be guaranteed to be completely secure.
      </p>
    ),
  },
  {
    title: "6. Your Choices",
    content: (
      <p>
        If you have questions about information you have submitted to AMIR
        Chicken, or would like to request clarification regarding its use,
        please contact us using the details provided below.
      </p>
    ),
  },
  {
    title: "7. Changes to This Policy",
    content: (
      <p>
        We may update this Privacy Policy from time to time to reflect changes
        to our website, services, or practices. Any updated version will be
        published on this page.
      </p>
    ),
  },
  {
    title: "8. Contact Us",
    content: (
      <p>
        If you have questions about this Privacy Policy, you can contact AMIR
        Chicken at{" "}
        <a
          href="mailto:amirchicken.info@gmail.com"
          className="font-medium text-[#EC1F36] hover:underline"
        >
          amirchicken.info@gmail.com
        </a>
        .
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white text-[#171719]">

      {/* HEADER */}
      <section className="bg-[#281719] px-6 py-20 text-white lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1200px]">

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FFB800]">
            AMIR Chicken
          </p>

          <h1 className="mt-5 max-w-4xl text-5xl font-semibold tracking-[-0.04em] sm:text-6xl lg:text-7xl">
            Privacy Policy
            <span className="text-[#EC1F36]">.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-white/65">
            Your privacy matters to us. This page explains how information
            provided through the AMIR Chicken website may be collected and
            used.
          </p>

        </div>
      </section>


      {/* CONTENT */}
      <section className="px-6 py-16 lg:px-12 lg:py-24">
        <div className="mx-auto grid max-w-[1200px] gap-14 lg:grid-cols-[240px_1fr]">

          {/* SIDEBAR */}
          <aside className="hidden lg:block">
            <div className="sticky top-10">

              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-400">
                On this page
              </p>

              <nav className="mt-5 space-y-3">
                {sections.map((section) => (
                  <a
                    key={section.title}
                    href={`#${section.title
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, "-")}`}
                    className="block text-sm text-neutral-500 transition hover:text-[#EC1F36]"
                  >
                    {section.title.replace(/^\d+\.\s/, "")}
                  </a>
                ))}
              </nav>

            </div>
          </aside>


          {/* ARTICLE */}
          <article className="max-w-3xl">

            <p className="mb-12 text-sm leading-7 text-neutral-500">
              This Privacy Policy applies to information collected through the
              AMIR Chicken website and related online enquiry experiences.
            </p>

            <div className="space-y-12">

              {sections.map((section) => {
                const id = section.title
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-");

                return (
                  <section
                    key={section.title}
                    id={id}
                    className="scroll-mt-10 border-b border-neutral-200 pb-10"
                  >
                    <h2 className="text-2xl font-semibold tracking-tight">
                      {section.title}
                    </h2>

                    <div className="mt-5 space-y-4 text-[15px] leading-7 text-neutral-600">
                      {section.content}
                    </div>
                  </section>
                );
              })}

            </div>

          </article>

        </div>
      </section>

    </main>
  );
}