
"use client";

import Image from "next/image";
import { useState } from "react";
import Reveal from "./Reveal";

const HERO = "/images/hero_banner_imags";

const countryIcons = [
  { src: "australia.png", alt: "Australia" },
  { src: "united kingdom.png", alt: "United Kingdom" },
  { src: "canada.png", alt: "Canada" },
  { src: "new zealand.png", alt: "New Zealand" },
  { src: "european union.png", alt: "European Union" },
  { src: "united states.png", alt: "United States" },
  { src: "ireland.png", alt: "Ireland" },
  { src: "germany.png", alt: "Germany" },
  { src: "malaysia.png", alt: "Malaysia" },
  { src: "dubai.png", alt: "Dubai" },
];

// Checkmark icon
function CheckIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12.5L10 17L19 7" />
    </svg>
  );
}

// Checkmark background
function CheckBox() {
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#eaf7f0] text-[#287653] sm:h-11 sm:w-11">
      <CheckIcon />
    </span>
  );
}

// Assurance card
function AssuranceBadge({ title, subtitle }) {
  return (
    <div className="flex w-full min-w-0 items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[0_8px_24px_rgba(28,21,77,0.08)]">
      <CheckBox />

      <div className="min-w-0 flex-1">
        <strong className="block font-jakarta text-[12px] font-bold leading-[1.3] text-[#151034] sm:text-[13px] lg:text-[14px]">
          {title}
        </strong>

        <span className="mt-1 block font-jakarta text-[11px] leading-[1.3] text-[#696579] sm:text-[12px]">
          {subtitle}
        </span>
      </div>
    </div>
  );
}

// Partner card
function PartnerBadge() {
  return (
    <div className="flex w-full min-w-0 items-start gap-3 rounded-2xl bg-white px-4 py-3 shadow-[0_8px_24px_rgba(28,21,77,0.08)]">
      <CheckBox />

      <div className="min-w-0 flex-1">
        <strong className="block font-jakarta text-[12px] font-bold leading-tight text-[#151034] sm:text-[13px] lg:text-[14px]">
          550+ Partner Institutions
        </strong>

        <span className="mt-1 block font-jakarta text-[11px] leading-tight text-[#696579]">
          Across 11 Countries
        </span>

        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          {countryIcons.map((country) => (
            <Image
              key={country.src}
              src={`/images/country_icon/${country.src}`}
              alt={country.alt}
              title={country.alt}
              width={20}
              height={20}
              className="h-4 w-4 shrink-0 rounded-full object-cover sm:h-5 sm:w-5"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Arrow icon
function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

// WhatsApp icon
function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.6 0 .3 5.3.3 11.8c0 2.1.6 4.2 1.6 6L0 24l6.4-1.7a11.8 11.8 0 0 0 5.7 1.4h.1C18.7 23.7 24 18.4 24 11.9c0-3.2-1.2-6.1-3.5-8.4ZM12.1 21.7a9.8 9.8 0 0 1-5-1.4l-.4-.2-3.8 1 1-3.7-.3-.4a9.7 9.7 0 0 1-1.5-5.2 10 10 0 0 1 10-10 9.9 9.9 0 0 1 7.1 2.9 9.9 9.9 0 0 1 2.9 7.1 10 10 0 0 1-10 9.9Zm5.5-7.5c-.3-.1-1.8-.9-2.1-1s-.5-.1-.7.2-.8 1-1 1.2-.4.2-.7.1a8.2 8.2 0 0 1-2.4-1.5 9 9 0 0 1-1.7-2.1c-.2-.3 0-.5.1-.6l.5-.6.3-.5c.1-.2 0-.4 0-.6l-1-2.3c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.7s1.2 3.1 1.4 3.3c.1.2 2.3 3.6 5.6 4.9.8.3 1.4.5 1.9.6.8.3 1.5.2 2 .1.6-.1 1.8-.7 2.1-1.4.3-.7.3-1.3.2-1.4-.1-.1-.3-.2-.6-.4Z" />
    </svg>
  );
}

export default function Hero() {
  const [language, setLanguage] = useState("English");

  const isEnglish = language === "English";

  return (
    <section className="relative w-full overflow-hidden bg-[#f7f6ff] font-jakarta">
      <div className="mx-auto grid w-full max-w-[1440px] min-w-0 grid-cols-1 items-center gap-8 px-5 py-10 sm:px-8 lg:min-h-[540px] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:px-12 lg:py-12 xl:px-16">

        {/* LEFT CONTENT */}
        <div className="relative z-10 min-w-0">

          {/* Language selector */}
          <div className="mb-5 inline-flex rounded-full border border-[#ded9ee] bg-white p-1 shadow-sm">
            {["English", "Bahasa"].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setLanguage(item)}
                aria-pressed={language === item}
                className={`rounded-full px-4 py-2.5 font-jakarta text-sm font-semibold transition-all duration-300 sm:text-base ${
                  language === item
                    ? "bg-[#24139b] text-white shadow-sm"
                    : "text-[#4c4766] hover:bg-[#f2efff]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Main heading */}
          <h1 className="max-w-[610px] font-neue text-[32px] font-extrabold leading-[1.08] tracking-tight text-[#110b3c] sm:text-[36px] lg:text-[40px]">
            Your Study Abroad
            <br className="hidden sm:block" /> Dream Starts with
            <br />

            <span className="relative mt-1 inline-block max-w-full -rotate-1 rounded-xl bg-[#ffd43b] px-2 py-1">
              Free Expert Guidance!
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-[530px] font-jakarta text-sm leading-[1.65] text-black sm:text-lg">
            Each student&apos;s journey will be tailored according to
            their profile and aspirations. 1-on-1 Expert Mentorship
            from shortlisting to Visa.
          </p>

          {/* CTA buttons */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="#consultation"
              className="pop-up group inline-flex min-h-[46px] items-center gap-3 rounded-full bg-[#ffd43b] px-5 py-3 font-jakarta text-sm font-bold text-[#120d36] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              Book a free consultation
              <ArrowIcon />
            </a>

            <a
              href="#consultation"
              className="pop-up inline-flex min-h-[46px] items-center gap-2 rounded-full border border-[#b8dec6] bg-white px-4 py-3 font-jakarta text-sm font-semibold text-[#187647] transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#55bd67] text-white">
                <WhatsAppIcon />
              </span>

              Register on WhatsApp
            </a>
          </div>

          {/* Trust indicators */}
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 font-jakarta text-sm font-medium text-[#403b5b]">
            {[
              "No consultation fee",
              "Award Winning Consultant",
              "Online or in Jakarta",
            ].map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1.5"
              >
                <svg
                  viewBox="0 0 20 20"
                  className="h-3.5 w-3.5 shrink-0 text-[#24139b]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="m4 10 4 4 8-8" />
                </svg>

                {item}
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT HERO AREA */}
        <div className="relative z-0 min-w-0 w-full">

          {/* Student artwork */}
          <div className="relative mx-auto aspect-[560/455] w-full max-w-[560px]">

            {/* Purple vector */}
            <div className="purple-wiggle pointer-events-none absolute left-[24%] top-[3%] z-0 h-[92%] w-[49%]">
              <Image
                src={`${HERO}/Vector.png`}
                alt=""
                fill
                priority
                sizes="(min-width: 1024px) 30vw, 90vw"
                className="object-contain"
              />
            </div>

            {/* Yellow vector */}
            <div className="yellow-wiggle pointer-events-none absolute right-[9%] top-[18%] z-[1] h-[76%] w-[39%]">
              <Image
                src={`${HERO}/Vector (1).png`}
                alt=""
                fill
                priority
                sizes="(min-width: 1024px) 25vw, 80vw"
                className="object-contain"
              />
            </div>

            {/* Female student */}
            <Reveal
              as="div"
              className="absolute bottom-[2%] right-[5%] z-10 h-[76%] w-[51%]"
              y={30}
              duration={0.8}
            >
              <Image
                src={`${HERO}/indonesian Female 1.png`}
                alt="Student smiling and holding notebooks"
                fill
                priority
                sizes="(min-width: 1024px) 25vw, 80vw"
                className="object-contain object-bottom"
              />
            </Reveal>

            {/* Male student */}
            <Reveal
              as="div"
              className="absolute bottom-[1%] left-[2%] z-20 h-[81%] w-[59%]"
              y={30}
              delay={0.15}
              duration={0.8}
            >
              <Image
                src={`${HERO}/Indonesian Male 1.png`}
                alt="Student smiling and holding study books"
                fill
                priority
                sizes="(min-width: 1024px) 30vw, 85vw"
                className="object-contain object-bottom"
              />
            </Reveal>

            {/* DESKTOP FLOATING CARDS */}

            {/* Card 1 */}
            <div className="badge-float-one absolute left-[-1%] top-[12%] z-30 hidden w-[49%] max-w-[285px] lg:block">
              <AssuranceBadge
                title={
                  <>
                    From Shortlisting to
                    <br />
                    Visa Approval
                  </>
                }
                subtitle="We're Here to Help!"
              />
            </div>

            {/* Card 2 */}
            <div className="badge-float-two absolute right-[-2%] top-[52%] z-30 hidden w-[46%] max-w-[270px] lg:block">
              <AssuranceBadge
                title="Certified Counsellors"
                subtitle="Waiting to Assist You"
              />
            </div>

            {/* Card 3 */}
            <div className="badge-float-three absolute bottom-[1%] left-[19%] z-30 hidden w-[70%] max-w-[360px] lg:block">
              <PartnerBadge />
            </div>
          </div>

          {/* MOBILE AND TABLET CARDS */}
          <div className="relative z-30 mx-auto mt-5 grid w-full max-w-[560px] grid-cols-1 gap-3 sm:grid-cols-2 lg:hidden">

            {/* Mobile Card 1 */}
            <AssuranceBadge
              title="From Shortlisting to Visa Approval"
              subtitle="We're Here to Help!"
            />

            {/* Mobile Card 2 */}
            <AssuranceBadge
              title="Certified Counsellors"
              subtitle="Waiting to Assist You"
            />

            {/* Mobile Card 3 */}
            <div className="sm:col-span-2">
              <PartnerBadge />
            </div>
          </div>
        </div>
      </div>

      {/* ANIMATION CSS */}
      <style jsx global>{`
        .purple-wiggle {
          transform-origin: center;
          animation: purpleWiggle 8s ease-in-out infinite;
          will-change: transform;
        }

        .yellow-wiggle {
          transform-origin: center;
          animation: yellowWiggle 9s ease-in-out infinite;
          will-change: transform;
        }

        .badge-float-one {
          animation: badgeFloatOne 5.5s ease-in-out infinite;
          will-change: transform;
        }

        .badge-float-two {
          animation: badgeFloatTwo 6.2s ease-in-out infinite;
          will-change: transform;
        }

        .badge-float-three {
          animation: badgeFloatThree 6.8s ease-in-out infinite;
          will-change: transform;
        }

        @keyframes purpleWiggle {
          0%,
          100% {
            transform: translate3d(0, 0, 0) rotate(0deg);
          }

          50% {
            transform: translate3d(-4px, -6px, 0) rotate(-2deg);
          }
        }

        @keyframes yellowWiggle {
          0%,
          100% {
            transform: translate3d(0, 0, 0) rotate(0deg);
          }

          50% {
            transform: translate3d(5px, 5px, 0) rotate(2deg);
          }
        }

        @keyframes badgeFloatOne {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }

          50% {
            transform: translate3d(0, -5px, 0);
          }
        }

        @keyframes badgeFloatTwo {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }

          50% {
            transform: translate3d(0, 6px, 0);
          }
        }

        @keyframes badgeFloatThree {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }

          50% {
            transform: translate3d(0, -4px, 0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .purple-wiggle,
          .yellow-wiggle,
          .badge-float-one,
          .badge-float-two,
          .badge-float-three {
            animation: none !important;
            will-change: auto;
          }
        }
      `}</style>
    </section>
  );
}
