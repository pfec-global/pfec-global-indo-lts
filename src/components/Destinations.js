
"use client";

import { useRef } from "react";
import Image from "next/image";

const destinations = [
  {
    name: "Australia",
    image: "au.jpg",
    description: "Study in Australia",
  },
  {
    name: "United Kingdom",
    image: "uk.jpg",
    description: "Study in the UK",
  },
  {
    name: "Canada",
    image: "ca.jpg",
    description: "Study in Canada",
  },
  {
    name: "New Zealand",
    image: "nz.jpg",
    description: "Study in New Zealand",
  },
  {
    name: "USA",
    image: "usa.jpg",
    description: "Study in the USA",
  },
  {
    name: "Ireland",
    image: "airland.jpg",
    description: "Study in Ireland",
  },
  {
    name: "Germany",
    image: "germany.jpg",
    description: "Study in Germany",
  },
  {
    name: "Europe",
    image: "europ.jpg",
    description: "Study in Europe",
  },
  {
    name: "Malaysia",
    image: "malaysia.jpg",
    description: "Study in Malaysia",
  },
  {
    name: "Dubai",
    image: "dubai.jpg",
    description: "Study in Dubai",
  },
  {
    name: "Japan",
    image: "japan.jpg",
    description: "Study in Japan",
  },
];

function ArrowButton({ direction, onClick, label }) {
  const isLeft = direction === "left";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#24139b] text-white transition-all duration-300 hover:scale-110 hover:bg-[#100B36] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24139b] sm:h-10 sm:w-10"
    >
      <svg
        viewBox="0 0 24 24"
        className={`h-5 w-5 ${isLeft ? "" : "rotate-180"}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="m15 18-6-6 6-6" />
      </svg>
    </button>
  );
}

export default function Countries() {
  const carouselRef = useRef(null);

  const scrollCarousel = (direction) => {
    const carousel = carouselRef.current;

    if (!carousel) return;

    const firstCard = carousel.querySelector(
      "[data-country-card]"
    );

    const cardWidth = firstCard
      ? firstCard.getBoundingClientRect().width
      : 210;

    const gap = 16;

    carousel.scrollBy({
      left: direction * (cardWidth + gap),
      behavior: "smooth",
    });
  };

  return (
    <section
      id="destinations"
      className="w-full overflow-hidden bg-[#f7f6fc] py-14 font-jakarta sm:py-16 lg:py-[72px]"
    >
      <div className="mx-auto max-w-[1440px]">

        {/* ===================================== */}
        {/* SECTION HEADING AND CAROUSEL CONTROLS */}
        {/* ===================================== */}

        <div className="mb-7 flex flex-col justify-between gap-5 px-5 sm:mb-8 sm:px-8 lg:flex-row lg:items-end lg:px-12">

          {/* Left heading */}
          <div className="max-w-[550px]">
            <span className="font-jakarta text-base font-bold uppercase tracking-wide text-[#24139b]">
              Countries
            </span>

            <h2 className="mt-3 font-jakarta text-[27px] font-extrabold leading-[1.12] text-[#100B36] sm:text-[32px]">
              Explore &amp; Apply to 11 Global
              <br className="hidden sm:block" /> Study Destinations
            </h2>
          </div>

          {/* Right description and arrows */}
          <div className="flex items-end justify-between gap-5 lg:max-w-[360px]">

            <p className="max-w-[300px] font-jakarta text-[12px] leading-[1.65] text-[#514b70] sm:text-[13px] lg:text-right">
              Pick a country to see universities, courses and visa steps,
              or let a counsellor help you compare.
            </p>

            {/* Carousel controls */}
            <div className="flex shrink-0 gap-2">
              <ArrowButton
                direction="left"
                label="Previous countries"
                onClick={() => scrollCarousel(-1)}
              />

              <ArrowButton
                direction="right"
                label="Next countries"
                onClick={() => scrollCarousel(1)}
              />
            </div>
          </div>
        </div>

        {/* ===================================== */}
        {/* HORIZONTAL COUNTRY CAROUSEL */}
        {/* ===================================== */}

        <div
          ref={carouselRef}
          className="country-carousel flex gap-4 overflow-x-auto px-5 pb-2 sm:px-8 lg:px-12"
          aria-label="Study destinations"
        >
          {destinations.map((country) => (
            <a
              key={country.name}
              data-country-card
              href={`#${country.name
                .toLowerCase()
                .replaceAll(" ", "-")}`}
              className="group relative h-[245px] w-[195px] shrink-0 snap-start overflow-hidden rounded-[16px] bg-[#100B36] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:h-[264px] sm:w-[212px] lg:h-[264px] lg:w-[212px]"
              aria-label={country.description}
            >

              {/* COUNTRY IMAGE */}
              <Image
                src={`/images/county/${country.image}`}
                alt={`${country.name} study destination`}
                fill
                sizes="(max-width: 640px) 195px, 212px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* GRADIENT OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#100B36] via-[#100B36]/45 to-transparent opacity-95 transition-opacity duration-300 group-hover:opacity-100" />

              {/* COUNTRY INFORMATION */}
              <div className="absolute inset-x-0 bottom-0 p-3.5 text-white sm:p-[14px]">

                {/* Country title */}
                <h3 className="font-jakarta text-[16px] font-extrabold leading-tight sm:text-[17px]">
                  {country.name}
                </h3>

                {/* Country description */}
                <p className="mt-1 font-jakarta text-[10px] leading-relaxed text-white/90">
                  {country.description}{" "}

                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* ===================================== */}
      {/* CAROUSEL STYLES */}
      {/* ===================================== */}

      <style jsx>{`
        .country-carousel {
          scroll-snap-type: x mandatory;
          scrollbar-width: none;
          -ms-overflow-style: none;
          overscroll-behavior-x: contain;
          -webkit-overflow-scrolling: touch;
        }

        .country-carousel::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
