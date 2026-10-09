
"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Is the consultation really free?",
    answer:
      "Yes. Your profile assessment and consultation cost nothing, and there is no obligation to continue with us.",
  },
  {
    question: "Can my parents join the sessions?",
    answer:
      "Absolutely! Your parents or guardians are welcome to join the consultation so they can understand your study options, costs, and application process.",
  },
  {
    question: "I haven't chosen a country yet. Can you still help?",
    answer:
      "Of course. Our counsellors will understand your academic background, budget, and career goals to help you explore the most suitable study destinations.",
  },
  {
    question: "Do you help with scholarships?",
    answer:
      "Yes. We can guide you through available scholarship opportunities, university requirements, eligibility criteria, and application deadlines.",
  },
  {
    question: "How much budget do we need?",
    answer:
      "Your budget depends on your chosen country, university, course, tuition fees, and living expenses. Our counsellors can help you estimate the costs based on your plans.",
  },
  {
    question: "Do I need IELTS or PTE before I apply?",
    answer:
      "Not always. English language requirements vary by university and course. Our team can help you understand the requirements and available alternatives.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="border-t-2 border-[#24139B] bg-[#F7F6FC] font-jakarta">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-[9.1%] lg:py-[58px]">

        {/* ===================================== */}
        {/* LEFT CONTENT */}
        {/* ===================================== */}

        <div className="max-w-[380px]">

          {/* Section Label */}
          <p className="mb-4 font-jakarta text-[10px] font-semibold uppercase text-[#24139B] sm:text-base">
            Frequently Asked Questions
          </p>

          {/* Main Heading */}
          <h2 className="font-jakarta text-[25px] font-bold leading-[1.12] tracking-[-0.4px] text-[#100B36] sm:text-[30px]">
            Things students and
            <br />
            parents ask us first.
          </h2>

          {/* Description */}
          <p className="mt-4 max-w-[280px] font-jakarta text-[12px] leading-[1.65] text-[#57536D] sm:text-[13px]">
            Still unsure? Message a counsellor on WhatsApp and get a real
            answer.
          </p>

          {/* Consultation Button */}
          <a
            href="#"
            className="pop-up mt-4 inline-flex min-h-[39px] items-center gap-4 rounded-full bg-[#FFCC36] px-4 py-2 font-jakarta text-lg font-semibold text-[#100B36] transition-colors hover:bg-[#FBC21C] sm:text-base"
          >
            Book a free consultation

            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </a>

          {/* WhatsApp Button */}
          <a
            href="https://wa.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex min-h-[39px] items-center gap-3 rounded-full border border-[#B8DCCB] bg-white px-4 py-2 font-jakarta text-[11px] font-semibold text-[#18794E] transition-colors hover:bg-[#EFFAF4] sm:text-base"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M20 11.5a8.3 8.3 0 0 1-12.3 7.2L4 20l1.3-3.5A8.3 8.3 0 1 1 20 11.5Z" />
              <path d="M8.5 8.2c.3-.5.6-.5.9-.5h.4c.2 0 .4.1.5.4l.7 1.6c.1.2.1.4-.1.6l-.6.7c-.2.2-.2.4 0 .6.4.7 1 1.3 1.7 1.7.2.1.4.1.6-.1l.7-.8c.2-.2.4-.2.6-.1l1.5.7c.3.1.4.3.4.5 0 .3-.2 1.1-.7 1.4-.5.4-1.1.5-1.8.3-.7-.2-1.6-.5-2.7-1.5-1.4-1.2-2.3-2.8-2.5-3.6-.2-.7 0-1.4.4-1.9Z" />
            </svg>

            Register on WhatsApp
          </a>
        </div>

        {/* ===================================== */}
        {/* RIGHT FAQ ACCORDION */}
        {/* ===================================== */}

        <div className="flex flex-col gap-2">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className={`overflow-hidden rounded-[14px] border bg-white transition-colors duration-300 ${
                  isOpen
                    ? "border-[#E7E3F1]"
                    : "border-[#E9E6F0] hover:border-[#CFC8E8]"
                }`}
              >

                {/* Accordion Question */}
                <button
                  type="button"
                  onClick={() =>
                    setOpenIndex(isOpen ? -1 : index)
                  }
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  className="flex min-h-[44px] w-full items-center justify-between gap-4 px-4 py-3 text-left sm:min-h-[44px] sm:px-[14px]"
                >
                  <span className="font-jakarta text-[11px] font-semibold leading-5 text-[#100B36] sm:text-[12px]">
                    {faq.question}
                  </span>

                  {/* Arrow Icon */}
                  <svg
                    viewBox="0 0 24 24"
                    className={`h-4 w-4 shrink-0 text-[#24139B] transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m7 10 5 5 5-5" />
                  </svg>
                </button>

                {/* Accordion Answer */}
                <div
                  id={`faq-answer-${index}`}
                  aria-hidden={!isOpen}
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-4 pb-3 font-jakarta text-[11px] leading-[1.55] text-[#57536D] sm:px-[14px] sm:text-[12px]">
                      {faq.answer}
                    </p>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
