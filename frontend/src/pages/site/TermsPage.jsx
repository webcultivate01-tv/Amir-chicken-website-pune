import React from "react";

const sections = [
  {
    title: "1. Acceptance of These Terms",
    content: (
      <p>
        By accessing or using the AMIR Chicken website, you agree to use the
        website in accordance with these Terms and Conditions. If you do not
        agree with these terms, please discontinue use of the website.
      </p>
    ),
  },
  {
    title: "2. Website Information",
    content: (
      <p>
        We make reasonable efforts to keep information on this website useful
        and current. However, product descriptions, availability, images,
        specifications, and other information may change without prior notice.
      </p>
    ),
  },
  {
    title: "3. Product Enquiries",
    content: (
      <p>
        Information submitted through quote or enquiry forms is treated as a
        request for information or contact. Submission of an enquiry does not
        by itself constitute a confirmed order, purchase agreement, or
        guarantee of product availability.
      </p>
    ),
  },
  {
    title: "4. Orders and Requirements",
    content: (
      <p>
        Any order, supply arrangement, quotation, or commercial engagement may
        be subject to separate terms agreed between AMIR Chicken and the
        customer.
      </p>
    ),
  },
  {
    title: "5. Website Use",
    content: (
      <p>
        You agree not to misuse the website, attempt to gain unauthorized
        access to its systems, interfere with its operation, or use the
        website for unlawful purposes.
      </p>
    ),
  },
  {
    title: "6. Intellectual Property",
    content: (
      <p>
        Unless otherwise stated, the content, branding, graphics, text,
        imagery, logos, and other materials appearing on this website belong
        to AMIR Chicken or are used with appropriate permission. They may not
        be reproduced or commercially used without authorization.
      </p>
    ),
  },
  {
    title: "7. Third-Party Links",
    content: (
      <p>
        The website may contain links to third-party websites or services.
        AMIR Chicken is not responsible for the content, availability, or
        practices of external websites.
      </p>
    ),
  },
  {
    title: "8. Limitation of Liability",
    content: (
      <p>
        To the extent permitted by applicable law, AMIR Chicken shall not be
        responsible for losses arising from interruptions, technical issues,
        inaccuracies, or reliance on information available through the
        website.
      </p>
    ),
  },
  {
    title: "9. Changes to These Terms",
    content: (
      <p>
        These Terms and Conditions may be updated from time to time. Updated
        terms will be published on this page and will apply from the date they
        are posted.
      </p>
    ),
  },
  {
    title: "10. Contact",
    content: (
      <p>
        For questions regarding these Terms and Conditions, please contact AMIR
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

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white text-[#171719]">

      {/* HEADER */}
      <section className="bg-[#281719] px-6 py-20 text-white lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1200px]">

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FFB800]">
            AMIR Chicken
          </p>

          <h1 className="mt-5 max-w-4xl text-5xl font-semibold tracking-[-0.04em] sm:text-6xl lg:text-7xl">
            Terms & Conditions
            <span className="text-[#EC1F36]">.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-white/65">
            Please read these terms carefully before using the AMIR Chicken
            website.
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
              These Terms and Conditions govern your use of the AMIR Chicken
              website and its online enquiry experiences.
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

                    <div className="mt-5 text-[15px] leading-7 text-neutral-600">
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