
"use client";

import Image from "next/image";
import Reveal from "./Reveal";
import { useLanguage } from "@/context/LanguageContext";

const courseIcons = {
  engineering: (
    <path d="M4 15a8 8 0 0 1 16 0M3 15h18v3H3zM10 7.3V11M14 7.3V11" />
  ),
  business: (
    <>
      <rect x="3" y="8" width="18" height="12" rx="1" />
      <path d="M8 8V5h8v3M3 12h18M10 12v3h4v-3" />
    </>
  ),
  informationTechnology: (
    <>
      <rect x="3" y="4" width="18" height="13" rx="1" />
      <path d="M8 21h8M12 17v4M9 8l-2 2 2 2M15 8l2 2-2 2" />
    </>
  ),
  environmentalSciences: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3c4 4 4 14 0 18M3 12h18M5 6l4 3-1 4 4 2 1 4" />
    </>
  ),
  architecture: (
    <path d="M5 5h14M6 5v2.5h12V5M8 7.5V18M12 7.5V18M16 7.5V18M5 19h14" />
  ),
  computerScience: (
    <path d="M3 5h18v14H3zM10 10l-2 2 2 2M14 10l2 2-2 2" />
  ),
  commercialPilot: (
    <path d="M21 3 3 10l7 3 3 7zM10 13l5-4" />
  ),
  publicHealth: (
    <path d="M12 20s-8-5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 9c0 6-8 11-8 11zM7 12h3l1.5-3 2 5 1-2h2.5" />
  ),
  tourism: (
    <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c3.5 3 3.5 15 0 18M12 3c-3.5 3-3.5 15 0 18" />
  ),
  nursing: (
    <path d="M5 16V9.5c4-3 10-3 14 0V16zM3 16h18M12 9.5v4M10 11.5h4" />
  ),
  stem: (
    <>
      <circle cx="12" cy="12" r="1.2" />
      <ellipse cx="12" cy="12" rx="9" ry="3.8" />
      <ellipse
        cx="12"
        cy="12"
        rx="9"
        ry="3.8"
        transform="rotate(60 12 12)"
      />
      <ellipse
        cx="12"
        cy="12"
        rx="9"
        ry="3.8"
        transform="rotate(120 12 12)"
      />
    </>
  ),
  jurisDoctor: (
    <path d="M12 4v16M7 20h10M5 7h14M5 7l-3 7a3 3 0 0 0 6 0zM19 7l-3 7a3 3 0 0 0 6 0z" />
  ),
};

const courseKeys = [
  "engineering",
  "business",
  "informationTechnology",
  "environmentalSciences",
  "architecture",
  "computerScience",
  "commercialPilot",
  "publicHealth",
  "tourism",
  "nursing",
  "stem",
  "jurisDoctor",
];

const content = {
  EN: {
    eyebrow: "Popular Courses",
    heading: "What do you want to become?",
    description:
      "Start with what you enjoy. We'll show you where it's taught best and what it leads to.",
    cta: "Get a free course match",

    courses: [
      "Engineering",
      "Business and Management",
      "Information Technology",
      "Environmental Sciences",
      "Architecture & Construction",
      "Computer Science",
      "Commercial Pilot",
      "Public Health",
      "Tourism and Hospitality",
      "Nursing",
      "STEM Courses",
      "Juris Doctor",
    ],
  },

  ID: {
    eyebrow: "Program Studi Populer",
    heading: "Anda ingin menjadi apa?",
    description:
      "Mulailah dari apa yang Anda sukai. Kami akan menunjukkan di mana bidang itu diajarkan paling baik dan ke mana arah kariernya.",
    cta: "Dapatkan rekomendasi program studi gratis",

    courses: [
      "Teknik",
      "Bisnis dan Manajemen",
      "Teknologi Informasi",
      "Ilmu Lingkungan",
      "Arsitektur & Konstruksi",
      "Ilmu Komputer",
      "Pilot Komersial",
      "Kesehatan Masyarakat",
      "Pariwisata dan Perhotelan",
      "Keperawatan",
      "Program STEM",
      "Juris Doctor",
    ],
  },
};

export default function FindCourse() {
  const { language } = useLanguage();

  const text = content[language] || content.EN;

  const courses = text.courses.map((name, index) => ({
    name,
    icon: courseIcons[courseKeys[index]],
  }));

  // Opens the same popup used by the existing
  // "Get a free course match" button.
  // The site's popup script must listen for .pop-up clicks.
  const handlePopupClick = (event) => {
    event.preventDefault();
  };

  return (
    <section
      id="courses"
      className="pop-up w-full overflow-hidden bg-[#f7f6fc] font-jakarta"
    >
      <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 lg:px-12 lg:py-20">

        {/* LEFT: POPULAR COURSES */}
        <div className="relative z-10">

          {/* Section Label */}
          <span className="font-jakarta text-sm font-bold uppercase tracking-wide text-[#24139b]">
            {text.eyebrow}
          </span>

          {/* Section Heading */}
          <h2 className="mt-4 font-jakarta text-[27px] font-extrabold leading-[1.15] text-[#100B36] sm:text-[26px]">
            {text.heading}
          </h2>

          {/* Description */}
          <p className="mt-4 max-w-[390px] font-jakarta text-[13px] leading-[1.7] text-[#514b70]">
            {text.description}
          </p>

          {/* COURSE CARDS */}
          <ul className="mt-5 flex flex-wrap gap-2.5 sm:gap-3">
            {courses.map(({ name, icon }, index) => (
              <Reveal
                as="li"
                key={courseKeys[index]}
                y={12}
                delay={0.035 * index}
              >
                <a
                  href="#"
                  onClick={handlePopupClick}
                  className="pop-up group flex min-h-[41px] items-center gap-2.5 rounded-[7px] border border-[#ded9ed] bg-white px-2.5 py-2 font-jakarta text-[12px] text-[#514b70] shadow-[0_1px_3px_rgba(16,11,54,0.12)] transition-all duration-300 hover:-translate-y-1 hover:border-[#24139b] hover:bg-[#24139b] hover:text-white hover:shadow-md sm:px-3 sm:text-[13px]"
                  aria-label={`Enquire about ${name}`}
                >

                  {/* Course Icon */}
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5 shrink-0 text-[#24139b] transition-all duration-300 group-hover:scale-110 group-hover:text-[#ffd43b]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    {icon}
                  </svg>

                  {/* Course Name */}
                  <span className="font-jakarta">
                    {name}
                  </span>

                </a>
              </Reveal>
            ))}
          </ul>

          {/* CONSULTATION CTA */}
          <a
            href="#"
            onClick={handlePopupClick}
            className="pop-up mt-6 inline-flex items-center justify-center rounded-full bg-[#24139b] px-5 py-3 font-jakarta text-[12px] font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#100B36] hover:shadow-lg"
          >
            {text.cta}

            <span className="ml-2">
              →
            </span>
          </a>

        </div>

        {/* RIGHT: FULL ARTWORK IMAGE */}
        <div className="relative mx-auto w-full max-w-[450px] lg:max-w-none">
          <div className="relative mx-auto aspect-[440/440] w-full max-w-[440px]">

            <Image
              src="/images/Group 58 (1).png"
              alt="Graduate holding a diploma"
              width={776}
              height={970}
              priority
              sizes="(min-width: 1024px) 35vw, 80vw"
              className="h-full w-full object-contain"
            />

          </div>
        </div>

      </div>
    </section>
  );
}
