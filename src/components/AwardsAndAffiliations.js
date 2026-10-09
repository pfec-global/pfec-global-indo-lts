"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const AUTOPLAY_MS = 3000;

const awards = [
  
  {
    lines: [
      { title: "Double Platinum Eagle", year: "(2023)" },
      { title: "Most Engaged Agency", year: "(2024)" },
    ],
    university: "La Trobe University",
    cricos: "00115M",
       logo: "/images/logo/image 482.png",

  },
  {
    lines: [
      {
        title: "Outstanding Partnership & Support for Sarawak Campus",
        year: "(2024)",
      },
    ],
    university: "Swinburne University of Technology",
    cricos: "00111D",
        logo: "/images/logo/image 358.png",

  },


  {
    lines: [
      { title: "Outstanding Achievement", year: "(2024)" },
      { title: "Rising Star Agent Award", year: "(2022)" },
    ],
    university: "La Trobe University",
    cricos: "00115M",
       logo: "/images/logo/image 436.png",

  },



  {
    lines: [
      {
        title: "Best Conversion and Best Emerging Partner Award",
        year: "(2024)",
      },
    ],
    university: "Swinburne University of Technology",
    cricos: "00111D",
        logo: "/images/logo/image 481.png",

  },



  {
    lines: [
      {
        title: "Gold Agent of the Year Top 3 Student recruiter of the Year - Bangladesh",
        year: "(2024)",
      },
    ],
    university: "Swinburne University of Technology",
    cricos: "00111D",
        logo: "/images/logo/image 661.png",

  },


   {
    lines: [
      {
        title: "Recognition of 4 Years of Service & Partnership",
        year: "(2024)",
      },
    ],
    university: "Swinburne University of Technology",
    cricos: "00111D",
        logo: "/images/logo/image 809.png",

  },

   {
    lines: [
      {
        title: "Valued Partner Appreciation Award",
        year: "(2023)",
      },
    ],
    university: "Swinburne University of Technology",
    cricos: "00111D",
        logo: "/images/logo/image 620.png",

  },


  // Add your remaining four award objects here to make eight unique cards.
];

const affiliations = [
  {
    src: "affiliations_4.png",
    alt: "AIRC Certified",
    width: 250,
    height: 250,
    className: "h-[82px] w-[82px] sm:h-[96px] sm:w-[96px]",
  },
  {
    src: "affiliations_3.png",
    alt: "ICEF Accredited Trusted Agency",
    width: 650,
    height: 762,
    className: "h-[82px] w-[72px] sm:h-[96px] sm:w-[84px]",
  },
  {
    src: "affiliations_5.png",
    alt: "QEAC Certification",
    width: 420,
    height: 650,
    className: "h-[78px] w-[58px] sm:h-[92px] sm:w-[70px]",
  },
  {
    src: "affiliations_2.png",
    alt: "Migration Institute of Australia",
    width: 772,
    height: 731,
    className: "h-[78px] w-[82px] sm:h-[92px] sm:w-[100px]",
  },
  {
    src: "affiliations_1.png",
    alt: "International Education Association of Australia",
    width: 281,
    height: 101,
    className: "h-auto w-[85px] sm:w-[110px]",
  },
];

function Laurel({ className = "" }) {
  return (
    <svg
      viewBox="0 0 40 90"
      className={`absolute top-5 h-[76px] w-8 text-[#252525] sm:h-[84px] sm:w-9 ${className}`}
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        d="M31 88C12 70 8 40 20 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <ellipse cx="22" cy="8" rx="2" ry="6" transform="rotate(20 22 8)" />
      <ellipse cx="11" cy="20" rx="2" ry="6" transform="rotate(-35 11 20)" />
      <ellipse cx="24" cy="22" rx="2" ry="6" transform="rotate(50 24 22)" />
      <ellipse cx="7" cy="36" rx="2" ry="6" transform="rotate(-50 7 36)" />
      <ellipse cx="22" cy="38" rx="2" ry="6" transform="rotate(55 22 38)" />
      <ellipse cx="8" cy="53" rx="2" ry="6" transform="rotate(-65 8 53)" />
      <ellipse cx="24" cy="54" rx="2" ry="6" transform="rotate(50 24 54)" />
      <ellipse cx="14" cy="69" rx="2" ry="6" transform="rotate(-75 14 69)" />
      <ellipse cx="30" cy="70" rx="2" ry="6" transform="rotate(40 30 70)" />
    </svg>
  );
}

function ArrowButton({ label, direction, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#24139B] text-white transition hover:bg-[#100B36] sm:h-9 sm:w-9"
    >
      <svg
        viewBox="0 0 24 24"
        className={`h-5 w-5 ${direction === "left" ? "rotate-180" : ""}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
    </button>
  );
}

function AwardCard({ award }) {
  return (
    <article className="group relative flex h-[183px] min-w-0 flex-col items-center justify-center overflow-hidden rounded-[15px] border border-[#e2dfeb] bg-gradient-to-br from-[#f5f5f5] to-[#e6e6e6] px-10 py-4 text-center transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:h-[183px] sm:px-12">
      <Laurel className="left-[12%]" />
      <Laurel className="right-[12%] -scale-x-100" />

      <div className="relative z-[1] flex w-full flex-col items-center">
        {award.lines.map((line) => (
          <div key={line.title} className="mb-1 leading-tight">
            <h3 className="text-[15px] font-semibold text-[#171717] sm:text-[17px]">
              {line.title}
            </h3>

            {line.sub && (
              <p className="mt-0.5 text-[15px] text-[#252525] sm:text-base">
                {line.sub}
              </p>
            )}

            <p className="mt-1 text-[12px] text-[#666]">{line.year}</p>
          </div>
        ))}

        <p className="mt-1 text-[8px] text-[#777]">Recognized by</p>

        {award.logo ? (
          <Image
            src={award.logo}
            alt={award.university}
            width={240}
            height={64}
            className="mt-1 h-[35px] max-w-[150px] object-contain"
          />
        ) : (
          <p className="mt-1 max-w-[170px] text-[12px] font-bold leading-tight text-[#183b8c] sm:text-[13px]">
            {award.university}
          </p>
        )}

        <p className="mt-1 text-[7px] text-[#555]">
          CRICOS: {award.cricos}
        </p>
      </div>
    </article>
  );
}

export default function AwardsAndAffiliations() {
  const [active, setActive] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const maxIndex = Math.max(0, awards.length - visibleCards);

  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };

    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);

    return () => window.removeEventListener("resize", updateVisibleCards);
  }, []);

  useEffect(() => {
    setActive((current) => Math.min(current, maxIndex));
  }, [maxIndex]);

  useEffect(() => {
    if (maxIndex === 0) return;

    const timer = setInterval(() => {
      setActive((current) => (current >= maxIndex ? 0 : current + 1));
    }, AUTOPLAY_MS);

    return () => clearInterval(timer);
  }, [maxIndex]);

  const prev = () => {
    setActive((current) => (current <= 0 ? maxIndex : current - 1));
  };

  const next = () => {
    setActive((current) => (current >= maxIndex ? 0 : current + 1));
  };

  return (
    <section className="overflow-hidden bg-white font-poppins">
      <div className="mx-auto max-w-[1440px] px-5 pb-12 pt-12 sm:px-8 lg:px-[9.2%] lg:pb-[72px] lg:pt-[72px]">
        {/* Header */}
        <div className="mb-7 flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div className="max-w-[480px]">
            <p className="mb-3 text-[11px] font-semibold uppercase text-[#24139B] sm:text-base">
              Why Trust PFEC
            </p>

            <h2 className="font-neue-reman text-[26px] font-bold leading-[1.15] tracking-[-0.4px] text-[#100B36] sm:text-[30px]">
              Recognised by universities.
              <br />
              Accredited by the industry.
            </h2>
          </div>

          <div className="flex flex-col items-start gap-3 md:items-end">
            <p className="max-w-[370px] text-left text-[12px] leading-[1.6] text-[#56516f] md:text-right sm:text-[13px]">
              Founded in Melbourne in 2006, now with offices in Australia,
              Bangladesh, India, Sri Lanka and Indonesia.
            </p>

            <div className="flex gap-1.5">
              <ArrowButton
                label="Previous award"
                direction="left"
                onClick={prev}
              />
              <ArrowButton
                label="Next award"
                direction="right"
                onClick={next}
              />
            </div>
          </div>
        </div>

        {/* Awards carousel */}
        <div className="overflow-hidden">
          <div
            className="flex gap-6 transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(calc(${active} * (-100% - 24px) / ${visibleCards}))`,
            }}
          >
            {awards.map((award) => (
              <div
                key={award.lines.map((line) => line.title).join("-")}
                className="min-w-0 shrink-0"
                style={{
                  width: `calc((100% - ${
                    (visibleCards - 1) * 24
                  }px) / ${visibleCards})`,
                }}
              >
                <AwardCard award={award} />
              </div>
            ))}
          </div>
        </div>

        {/* Affiliations panel */}
        <div className="mt-7 rounded-[17px] border border-[#e4e0ef] bg-white px-5 py-5 sm:px-6 lg:px-6 lg:py-4">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between lg:gap-7">
            <div className="shrink-0 lg:max-w-[335px]">
              <h3 className="text-[18px] font-semibold leading-snug text-[#171717] sm:text-[19px]">
                <span className="text-[#24139B]">Our Affiliations</span> &amp;
                Recognition
              </h3>

              <p className="mt-1 max-w-[320px] text-[12px] leading-[1.6] text-[#56516f] sm:text-[13px]">
                Prestigious recognitions that speak volumes about the quality
                of our service.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-4 sm:gap-x-5 lg:flex-1 lg:justify-end lg:gap-x-4">
              {affiliations.map((logo) => (
                <div
                  key={logo.src}
                  className="flex items-center justify-center"
                >
                  <Image
                    src={`/images/affiliations/${logo.src}`}
                    alt={logo.alt}
                    width={logo.width}
                    height={logo.height}
                    className={`${logo.className} object-contain`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}