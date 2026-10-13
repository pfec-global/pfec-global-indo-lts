"use client";

import Image from "next/image";
import useLoopSlider from "./useLoopSlider";

const AUTOPLAY_MS = 3000;

// Add `logo: "/images/awards/<file>"` to show a university logo instead of its name.
const awards = [
  {
    lines: [
      {
        title: "Partner of the Year Award",
        sub: "Diamond Category",
        year: "(2024 & 2023)",
      },
    ],
    university: "Adelaide University",
    cricos: "04249J",
  },
  {
    lines: [{ title: "Best Newcomer", sub: "Gold", year: "(2024)" }],
    university: "The University of Western Australia",
    cricos: "04249J",
  },
  {
    lines: [
      { title: "Double Platinum Eagle", year: "(2023)" },
      { title: "Most Engaged Agency", year: "(2024)" },
    ],
    university: "La Trobe University",
    cricos: "00115M",
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
  },
];

function Laurel({ className }) {
  return (
    <svg
      viewBox="0 0 40 90"
      className={`absolute top-[12%] h-[45%] w-auto text-[#5a2a12] transition-transform duration-300 group-hover:scale-y-110 ${className}`}
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        d="M31 88C12 70 8 40 20 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <ellipse cx="22" cy="8" rx="3" ry="7" transform="rotate(20 22 8)" />
      <ellipse cx="11" cy="20" rx="3" ry="7" transform="rotate(-35 11 20)" />
      <ellipse cx="24" cy="22" rx="3" ry="7" transform="rotate(50 24 22)" />
      <ellipse cx="7" cy="36" rx="3" ry="7" transform="rotate(-50 7 36)" />
      <ellipse cx="22" cy="38" rx="3" ry="7" transform="rotate(55 22 38)" />
      <ellipse cx="8" cy="53" rx="3" ry="7" transform="rotate(-65 8 53)" />
      <ellipse cx="24" cy="54" rx="3" ry="7" transform="rotate(50 24 54)" />
      <ellipse cx="14" cy="69" rx="3" ry="7" transform="rotate(-75 14 69)" />
      <ellipse cx="30" cy="70" rx="3" ry="7" transform="rotate(40 30 70)" />
    </svg>
  );
}

function ArrowButton({ label, onClick, flip }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white text-accent transition-opacity hover:opacity-85 xl:h-[3.35rem] xl:w-[3.35rem]"
    >
      <svg
        viewBox="0 0 24 24"
        className={`h-3/5 w-3/5 ${flip ? "rotate-180" : ""}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M15 4l-8 8 8 8" />
      </svg>
    </button>
  );
}

export default function Awards() {
  const count = awards.length;
  // The list is rendered twice so the track can loop without a visible jump.
  const {
    animate,
    trackStyle,
    dragProps,
    next,
    prev,
    handleTransitionEnd,
    setPaused,
  } = useLoopSlider(count, AUTOPLAY_MS);

  return (
    <section className="relative overflow-hidden bg-brand font-poppins">
      {/* Fade the cards into the background at both screen edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-6 bg-gradient-to-r from-brand to-transparent sm:w-12 xl:w-[9.5rem]" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-6 bg-gradient-to-l from-brand to-transparent sm:w-12 xl:w-[9.5rem]" />
      <div className="mx-auto flex max-w-[105rem] flex-col px-4 py-12 sm:px-8 lg:px-12 xl:pb-20 xl:pt-[5.2rem]">
        {/* On phones this wrapper dissolves so the buttons can sit below the cards */}
        <div className="contents sm:flex sm:flex-wrap sm:items-center sm:justify-between sm:gap-4">
          <h2 className="text-2xl text-white sm:text-3xl xl:text-[2.45rem]">
            <span className="font-bold">Awards</span> &amp; Achievements
          </h2>
          <div className="order-3 mt-6 flex items-center justify-center gap-3 sm:order-none sm:mt-0 xl:gap-4">
            <ArrowButton label="Previous award" onClick={prev} />
            <ArrowButton label="Next award" onClick={next} flip />
          </div>
        </div>

        <ul
          onTransitionEnd={handleTransitionEnd}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          {...dragProps}
          style={trackStyle}
          className={`order-2 mt-6 flex cursor-grab touch-pan-y select-none gap-4 active:cursor-grabbing [--step:19rem] sm:order-none sm:mt-8 xl:mt-9 xl:gap-[1.95rem] xl:[--step:28.15rem] ${
            animate ? "transition-transform duration-700 ease-out" : ""
          }`}
        >
          {[...awards, ...awards].map(
            ({ lines, university, cricos, logo }, i) => (
              <li
                key={i}
                aria-hidden={i >= count}
                className="group relative flex h-[12.5rem] w-[18rem] shrink-0 flex-col transition duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_16px_36px_rgba(0,0,0,0.45)] hover:brightness-105 items-center justify-center rounded-br-[1.5rem] rounded-tl-[1.5rem] bg-gradient-to-r from-[#ffeeaa] via-[#ffdc45] to-[#ffd62e] px-12 py-3 text-center text-[#4a1414] xl:h-[14.8rem] xl:w-[26.2rem] xl:px-16"
              >
                <Laurel className="left-[5%]" />
                <Laurel className="right-[5%] -scale-x-100" />

                {lines.map(({ title, sub, year }) => (
                  <p key={title} className="leading-tight">
                    <span className="block text-base font-bold xl:text-[1.35rem] xl:leading-[1.6rem]">
                      {title}
                    </span>
                    {sub && (
                      <span className="block text-base xl:text-[1.35rem] xl:leading-[1.6rem]">
                        {sub}
                      </span>
                    )}
                    <span
                      className={`block text-xs xl:text-[0.95rem] ${
                        lines.length > 1 ? "mb-1" : "mt-2"
                      }`}
                    >
                      {year}
                    </span>
                  </p>
                ))}

                <p className="mt-1.5 text-[0.6rem] opacity-80">Recognized by</p>
                {logo ? (
                  <Image
                    src={logo}
                    alt={university}
                    width={240}
                    height={64}
                    className="mt-1 h-9 w-auto object-contain xl:h-12"
                  />
                ) : (
                  <p className="mt-0.5 text-sm font-bold leading-tight text-brand xl:text-lg">
                    {university}
                  </p>
                )}
                <p className="mt-1 text-[0.55rem]">CRICOS: {cricos}</p>
              </li>
            ),
          )}
        </ul>
      </div>
    </section>
  );
}
