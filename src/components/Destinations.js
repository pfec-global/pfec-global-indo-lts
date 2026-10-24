"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const content = {
  EN: {
    eyebrow: "Countries",
    heading1: "Explore & Apply to 11 Global",
    heading2: "Study Destinations",
    description:
      "Pick a country to see universities, courses and visa steps, or let a counsellor help you compare.",
    previous: "Previous countries",
    next: "Next countries",
    ariaLabel: "Study destinations",

    destinations: [
      {
        name: "Australia",
        slug: "australia",
        image: "au.jpg",
        description: "Study in Australia",
      },
      {
        name: "United Kingdom",
        slug: "united-kingdom",
        image: "uk.jpg",
        description: "Study in the UK",
      },
      {
        name: "Canada",
        slug: "canada",
        image: "ca.jpg",
        description: "Study in Canada",
      },
      {
        name: "New Zealand",
        slug: "new-zealand",
        image: "nz.jpg",
        description: "Study in New Zealand",
      },
      {
        name: "USA",
        slug: "usa",
        image: "usa.jpg",
        description: "Study in the USA",
      },
      {
        name: "Ireland",
        slug: "ireland",
        image: "airland.jpg",
        description: "Study in Ireland",
      },
      {
        name: "Germany",
        slug: "germany",
        image: "germany.jpg",
        description: "Study in Germany",
      },
      {
        name: "Europe",
        slug: "europe",
        image: "europ.jpg",
        description: "Study in Europe",
      },
      {
        name: "Malaysia",
        slug: "malaysia",
        image: "malaysia.jpg",
        description: "Study in Malaysia",
      },
      {
        name: "Dubai",
        slug: "dubai",
        image: "dubai.jpg",
        description: "Study in Dubai",
      },
      {
        name: "Japan",
        slug: "japan",
        image: "japan.jpg",
        description: "Study in Japan",
      },
    ],
  },

  ID: {
    eyebrow: "Negara",
    heading1: "Jelajahi & Daftar ke 11",
    heading2: "Destinasi Studi Global",
    description:
      "Pilih negara untuk melihat universitas, program studi, dan tahapan visa, atau biarkan konselor kami membantu Anda.",
    previous: "Negara sebelumnya",
    next: "Negara berikutnya",
    ariaLabel: "Destinasi studi",

    destinations: [
      {
        name: "Australia",
        slug: "australia",
        image: "au.jpg",
        description: "Kuliah di Australia",
      },
      {
        name: "Inggris",
        slug: "united-kingdom",
        image: "uk.jpg",
        description: "Kuliah di Inggris",
      },
      {
        name: "Kanada",
        slug: "canada",
        image: "ca.jpg",
        description: "Kuliah di Kanada",
      },
      {
        name: "Selandia Baru",
        slug: "new-zealand",
        image: "nz.jpg",
        description: "Kuliah di Selandia Baru",
      },
      {
        name: "Amerika Serikat",
        slug: "usa",
        image: "usa.jpg",
        description: "Kuliah di Amerika Serikat",
      },
      {
        name: "Irlandia",
        slug: "ireland",
        image: "airland.jpg",
        description: "Kuliah di Irlandia",
      },
      {
        name: "Jerman",
        slug: "germany",
        image: "germany.jpg",
        description: "Kuliah di Jerman",
      },
      {
        name: "Eropa",
        slug: "europe",
        image: "europ.jpg",
        description: "Kuliah di Eropa",
      },
      {
        name: "Malaysia",
        slug: "malaysia",
        image: "malaysia.jpg",
        description: "Kuliah di Malaysia",
      },
      {
        name: "Dubai",
        slug: "dubai",
        image: "dubai.jpg",
        description: "Kuliah di Dubai",
      },
      {
        name: "Jepang",
        slug: "japan",
        image: "japan.jpg",
        description: "Kuliah di Jepang",
      },
    ],
  },
};

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

const AUTOPLAY_MS = 3000;
const DRAG_THRESHOLD = 5;

// Scroll the carousel by one card in the given direction.
function scrollByCard(carousel, direction) {
  const firstCard = carousel.querySelector("[data-country-card]");

  const cardWidth = firstCard
    ? firstCard.getBoundingClientRect().width
    : 210;

  const gap = 16;

  carousel.scrollBy({
    left: direction * (cardWidth + gap),
    behavior: "smooth",
  });
}

// Smoothly scroll to the card nearest the current position, then call `done`.
function settleOnNearestCard(carousel, done) {
  const carouselLeft = carousel.getBoundingClientRect().left;
  const maxScroll = carousel.scrollWidth - carousel.clientWidth;

  const positions = [
    ...carousel.querySelectorAll("[data-country-card]"),
  ].map((card) =>
    Math.min(
      card.getBoundingClientRect().left - carouselLeft + carousel.scrollLeft,
      maxScroll
    )
  );

  const target = positions.reduce(
    (nearest, position) =>
      Math.abs(position - carousel.scrollLeft) <
      Math.abs(nearest - carousel.scrollLeft)
        ? position
        : nearest,
    carousel.scrollLeft
  );

  let finished = false;

  const finish = () => {
    if (finished) return;
    finished = true;
    carousel.removeEventListener("scrollend", finish);
    done();
  };

  carousel.addEventListener("scrollend", finish);
  setTimeout(finish, 600);

  carousel.scrollTo({ left: target, behavior: "smooth" });
}

export default function Countries() {
  const carouselRef = useRef(null);
  const [paused, setPaused] = useState(false);

  // Mouse drag state: start position and whether it moved past the threshold.
  const drag = useRef(null);
  const suppressClick = useRef(false);

  const { language } = useLanguage();

  const text = content[language] || content.EN;
  const destinations = text.destinations;

  const scrollCarousel = (direction) => {
    const carousel = carouselRef.current;

    if (!carousel) return;

    scrollByCard(carousel, direction);
  };

  // Mouse drag to scroll (touch already scrolls natively).
  const onPointerDown = (event) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;

    drag.current = {
      startX: event.clientX,
      scrollLeft: event.currentTarget.scrollLeft,
      moved: false,
    };
  };

  const onPointerMove = (event) => {
    if (!drag.current) return;

    const carousel = event.currentTarget;
    const dx = event.clientX - drag.current.startX;

    if (!drag.current.moved) {
      if (Math.abs(dx) < DRAG_THRESHOLD) return;

      drag.current.moved = true;
      carousel.setPointerCapture(event.pointerId);
      carousel.classList.add("is-dragging");
    }

    carousel.scrollLeft = drag.current.scrollLeft - dx;
  };

  const endDrag = (event) => {
    if (!drag.current) return;

    const { moved } = drag.current;
    drag.current = null;

    if (!moved) return;

    const carousel = event.currentTarget;

    // Swallow the click that follows a drag so cards don't open.
    suppressClick.current = true;
    setTimeout(() => {
      suppressClick.current = false;
    }, 0);

    carousel.classList.remove("is-dragging");
    carousel.classList.add("is-settling");

    settleOnNearestCard(carousel, () =>
      carousel.classList.remove("is-settling")
    );
  };

  const onClickCapture = (event) => {
    if (!suppressClick.current) return;

    event.preventDefault();
    event.stopPropagation();
    suppressClick.current = false;
  };

  // Autoplay: advance one card, then return to the start after the last one.
  useEffect(() => {
    if (paused) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const timer = setInterval(() => {
      const carousel = carouselRef.current;

      if (!carousel || document.hidden) return;

      const atEnd =
        carousel.scrollLeft + carousel.clientWidth >=
        carousel.scrollWidth - 4;

      if (atEnd) {
        carousel.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollByCard(carousel, 1);
      }
    }, AUTOPLAY_MS);

    return () => clearInterval(timer);
  }, [paused]);

  return (
    <section
      id="destinations"
      className="w-full overflow-hidden bg-[#f7f6fc] py-14 font-jakarta sm:py-16 lg:py-[72px]"
    >
      <div className="mx-auto max-w-[1440px]">

        {/* SECTION HEADING AND CAROUSEL CONTROLS */}
        <div className="mb-7 flex flex-col justify-between gap-5 px-5 sm:mb-8 sm:px-8 lg:flex-row lg:items-end lg:px-12">

          {/* Left heading */}
          <div className="max-w-[550px]">
            <span className="font-jakarta text-sm font-bold uppercase tracking-wide text-[#24139b]">
              {text.eyebrow}
            </span>

            <h2 className="mt-3 font-jakarta text-[27px] font-extrabold leading-[1.12] text-[#100B36] sm:text-[26px]">
              {text.heading1}
              <br className="hidden sm:block" /> {text.heading2}
            </h2>
          </div>

          {/* Right description and arrows */}
          <div className="flex items-end justify-between gap-5 lg:max-w-[360px]">

            <p className="max-w-[300px] font-jakarta text-[12px] leading-[1.65] text-[#514b70] sm:text-[13px] lg:text-right">
              {text.description}
            </p>

            {/* Carousel controls */}
            <div className="flex shrink-0 gap-2">
              <ArrowButton
                direction="left"
                label={text.previous}
                onClick={() => scrollCarousel(-1)}
              />

              <ArrowButton
                direction="right"
                label={text.next}
                onClick={() => scrollCarousel(1)}
              />
            </div>
          </div>
        </div>

        {/* HORIZONTAL COUNTRY CAROUSEL */}
        <div
          ref={carouselRef}
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setPaused(false);
            }
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onClickCapture={onClickCapture}
          onDragStart={(event) => event.preventDefault()}
          className="country-carousel flex gap-4 overflow-x-auto px-5 pb-2 sm:px-8 lg:px-12"
          aria-label={text.ariaLabel}
        >
          {destinations.map((country) => (
            <a
              key={country.slug}
              data-country-card
              href={`#${country.slug}`}
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

                {/* Country subtitle */}
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

      {/* CAROUSEL STYLES */}
      <style jsx>{`
        .country-carousel {
          scroll-snap-type: x mandatory;
          scrollbar-width: none;
          -ms-overflow-style: none;
          overscroll-behavior-x: contain;
          -webkit-overflow-scrolling: touch;
          cursor: grab;
        }

        .country-carousel.is-dragging,
        .country-carousel.is-settling {
          scroll-snap-type: none;
        }

        .country-carousel.is-dragging {
          cursor: grabbing;
          user-select: none;
        }

        .country-carousel.is-dragging :global(a) {
          cursor: grabbing;
        }

        .country-carousel::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
