"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const navContent = {
  EN: {
    announcement: "Free 1-on-1 counselling in Jakarta & online",
    consultation: "Free consultation",

    links: [
      { label: "Our Services", href: "#services" },
      { label: "Study Destinations", href: "#destinations" },
      { label: "Popular Courses", href: "#courses" },
      { label: "Awards", href: "#awards" },
      { label: "Testimonials", href: "#testimonials" },
      { label: "About PFEC", href: "#about" },
    ],
  },

  ID: {
    announcement: "Konseling 1-on-1 gratis di Jakarta & online",
    consultation: "Konsultasi gratis",

    links: [
      { label: "Layanan Kami", href: "#services" },
      { label: "Destinasi Studi", href: "#destinations" },
      { label: "Program Populer", href: "#courses" },
      { label: "Penghargaan", href: "#awards" },
      { label: "Testimoni", href: "#testimonials" },
      { label: "Tentang PFEC", href: "#about" },
    ],
  },
};

export default function Navbar() {
  const [active, setActive] = useState(null);

  // Global language state
  const { language, changeLanguage } = useLanguage();

  // Navbar content based on selected language
  const content = navContent[language] || navContent.EN;
  const navLinks = content.links;

  useEffect(() => {
    const sections = navLinks
      .map(({ href }) => document.querySelector(href))
      .filter(Boolean);

    const onScroll = () => {
      const line = window.innerHeight * 0.35;

      const current = sections.reduce((found, section) => {
        return section.getBoundingClientRect().top <= line
          ? section
          : found;
      }, null);

      const inside =
        current && current.getBoundingClientRect().bottom > line;

      setActive(inside ? `#${current.id}` : null);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [language]);

  const closeMenu = (event) => {
    event.currentTarget
      .closest("details")
      ?.removeAttribute("open");
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-[0_3px_12px_rgba(16,6,80,0.08)]">

      {/* TOP ANNOUNCEMENT BAR */}
      <div className="bg-[#100b35] text-white">
        <div className="mx-auto flex h-[36px] max-w-[1440px] items-center justify-between gap-3 px-4 sm:px-8 lg:px-12">

          {/* Announcement */}
          <p className="truncate text-[10px] font-normal tracking-wide sm:text-[11px]">
            {content.announcement}
          </p>

          <div className="flex shrink-0 items-center gap-3 sm:gap-6">

            {/* Phone */}
            <a
              href="tel:+628212820300"
              className="hidden text-[10px] transition-colors hover:text-[#ffd52a] sm:block sm:text-[11px]"
            >
              +62 821 282 0300
            </a>

            {/* LANGUAGE SWITCHER */}
            <div className="flex items-center gap-2">

              {/* EN */}
              <button
                type="button"
                onClick={() => changeLanguage("EN")}
                aria-pressed={language === "EN"}
                className={`rounded-full px-3 py-1 text-[10px] font-bold transition-colors ${
                  language === "EN"
                    ? "bg-[#ffd52a] text-[#100b35]"
                    : "bg-[#29234c] text-white hover:bg-[#413a6a]"
                }`}
              >
                EN
              </button>

              {/* ID */}
              <button
                type="button"
                onClick={() => changeLanguage("ID")}
                aria-pressed={language === "ID"}
                className={`rounded-full px-3 py-1 text-[10px] font-bold transition-colors ${
                  language === "ID"
                    ? "bg-[#ffd52a] text-[#100b35]"
                    : "bg-[#29234c] text-white hover:bg-[#413a6a]"
                }`}
              >
                ID
              </button>

            </div>
          </div>
        </div>
      </div>

      {/* MAIN NAVIGATION */}
      <div className="relative border-b border-[#eeeaf7] bg-white">
        <div className="mx-auto flex h-[64px] max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-8 lg:px-12">

          {/* LOGO */}
          <Link
            href="/"
            className="shrink-0"
            aria-label="PFEC Global home"
          >
            <Image
              src="/images/pfec_ indo_logo.webp"
              alt="PFEC Global - Study Abroad | Visa"
              width={500}
              height={201}
              priority
              className="h-9 w-auto object-contain sm:h-10"
            />
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden flex-1 items-center justify-center gap-5 xl:flex 2xl:gap-7">
            {navLinks.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                aria-current={
                  active === href ? "location" : undefined
                }
                className={`whitespace-nowrap text-[14px] transition-colors duration-200 2xl:text-[14px] ${
                  active === href
                    ? "font-semibold text-[#24139b]"
                    : "font-medium text-[#252333] hover:text-[#24139b]"
                }`}
              >
                {label}
              </a>
            ))}
          </nav>

          {/* DESKTOP CTA */}
          <a
            href="#consultation"
            className="hidden shrink-0 items-center justify-center rounded-full bg-[#24139b] px-6 py-3 text-[12px] font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#3523b8] sm:inline-flex"
          >
            {content.consultation}
          </a>

          {/* MOBILE MENU */}
          <details className="group relative xl:hidden">
            <summary
              aria-label="Toggle navigation menu"
              className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-lg text-[#24139b] hover:bg-[#f4f1ff] [&::-webkit-details-marker]:hidden"
            >
              {/* Hamburger */}
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6 group-open:hidden"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>

              {/* Close */}
              <svg
                viewBox="0 0 24 24"
                className="hidden h-6 w-6 group-open:block"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="m6 6 12 12M18 6 6 18" />
              </svg>
            </summary>

            {/* MOBILE DROPDOWN */}
            <nav className="absolute right-0 top-full mt-2 flex max-h-[75vh] w-[min(320px,calc(100vw-32px))] flex-col overflow-y-auto rounded-xl border border-[#eeeaf7] bg-white p-4 shadow-xl">

              {navLinks.map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  onClick={closeMenu}
                  className={`border-b border-[#f0edf6] py-3 text-sm transition-colors ${
                    active === href
                      ? "font-semibold text-[#24139b]"
                      : "text-[#252333] hover:text-[#24139b]"
                  }`}
                >
                  {label}
                </a>
              ))}

              <a
                href="#consultation"
                onClick={closeMenu}
                className="mt-4 rounded-full bg-[#24139b] px-5 py-3 text-center text-sm font-bold text-white transition-colors hover:bg-[#3523b8]"
              >
                {content.consultation}
              </a>

            </nav>
          </details>

        </div>
      </div>
    </header>
  );
}
