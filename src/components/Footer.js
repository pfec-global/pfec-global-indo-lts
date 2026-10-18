"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const footerContent = {
  EN: {
    description:
      "Study abroad with complete expert guidance, from your first conversation to departure.",

    servicesTitle: "Services",
    companyTitle: "Company",
    visitTitle: "Visit us in Jakarta",

    serviceLinks: [
      { label: "Study Destinations", href: "#destinations" },
      { label: "Popular Courses", href: "#courses" },
      { label: "Our Services", href: "#services" },
      { label: "Student Stories", href: "#testimonials" },
    ],

    companyLinks: [
      { label: "For parents", href: "#services" },
      { label: "About PFEC Global", href: "#about" },
      { label: "FAQ", href: "#faq" },
      { label: "Book a Free Consultation", href: "#consultation" },
    ],

    address:
      "Pondok Indah Plaza 5, Block A No. 10 Jl. Margaguna Raya, Kebayoran Baru Jakarta Selatan 12140",

    copyright:
      "© 2026 PFEC Global. All Rights Reserved",

    legalLinks: [
      {
        label: "Terms & Conditions",
        href: "#",
      },
      {
        label: "Privacy Policy",
        href: "#",
      },
      {
        label: "Cookie Policy",
        href: "#",
      },
    ],

    followUs: "Follow Us",
  },

  ID: {
    description:
      "Kuliah di luar negeri dengan bimbingan ahli lengkap, mulai dari percakapan pertama hingga keberangkatan.",

    servicesTitle: "Layanan",
    companyTitle: "Company",
    visitTitle: "Kunjungi kami di Jakarta",

    serviceLinks: [
      { label: "Destinasi Studi", href: "#destinations" },
      { label: "Program Studi Populer", href: "#courses" },
      { label: "Layanan Kami", href: "#services" },
      { label: "Kisah Mahasiswa", href: "#testimonials" },
    ],

    companyLinks: [
      { label: "For parents", href: "#services" },
      { label: "About PFEC Global", href: "#about" },
      { label: "FAQ", href: "#faq" },
      { label: "Pesan Konsultasi Gratis", href: "#consultation" },
    ],

    address:
      "Pondok Indah Plaza 5, Block A No. 10 Jl. Margaguna Raya, Kebayoran Baru Jakarta Selatan 12140",

    copyright:
      "© 2026 PFEC Global. Hak Cipta Dilindungi Undang-Undang",

    legalLinks: [
      {
        label: "Syarat & Ketentuan",
        href: "#",
      },
      {
        label: "Kebijakan Privasi",
        href: "#",
      },
      {
        label: "Kebijakan Cookie",
        href: "#",
      },
    ],

    followUs: "Ikuti Kami",
  },
};

// Hidden for now: set to true to show social icons.
const SHOW_SOCIALS = false;

const socials = [
  {
    name: "LinkedIn",
    color: "bg-[#1d9bd1]",
    icon: (
      <path d="M6.94 8.5H4V20h2.94V8.5zM5.47 4a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4zM20 13.2c0-3-1.6-4.9-4.2-4.9-1.3 0-2.3.6-2.9 1.5V8.5H10V20h2.9v-6c0-1.6.8-2.6 2.1-2.6s2 .9 2 2.6v6H20v-6.8z" />
    ),
  },
  {
    name: "YouTube",
    color: "bg-[#e8402a]",
    icon: (
      <path
        fillRule="evenodd"
        d="M7 5.5h10a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-7a3 3 0 0 1 3-3zm3.2 3.7v5.6l5-2.8-5-2.8z"
      />
    ),
  },
  {
    name: "Facebook",
    color: "bg-[#1f3f8f]",
    icon: (
      <path d="M13.5 21v-7.5H16l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.4H8.1v3h2.5V21h2.9z" />
    ),
  },
  {
    name: "Instagram",
    color:
      "bg-[linear-gradient(45deg,#f9ce34,#ee2a7b_50%,#6228d7)]",
    icon: (
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        d="M8 4.5h8A3.5 3.5 0 0 1 19.5 8v8a3.5 3.5 0 0 1-3.5 3.5H8A3.5 3.5 0 0 1 4.5 16V8A3.5 3.5 0 0 1 8 4.5zm4 4a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm4.6-1.3v.01"
      />
    ),
  },
];

export default function Footer() {
  const { language } = useLanguage();

  const text =
    footerContent[language] ||
    footerContent.EN;

  return (
    <footer className="bg-[#100B36] font-jakarta text-white">
      <div className="mx-auto max-w-[1440px] px-5 pb-8 pt-12 sm:px-8 lg:px-[9.1%] lg:pb-8 lg:pt-[58px]">

        {/* TOP FOOTER */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr_1.15fr] lg:gap-12">

          {/* LOGO + DESCRIPTION */}
          <div>
            <Image
              src="/images/pfec_footer_logo.webp"
              alt="PFEC Global - Study Abroad | Visa"
              width={304}
              height={106}
              className="h-auto w-[135px]"
            />

            <p className="mt-5 max-w-[280px] font-jakarta text-[12px] leading-[1.6] text-white/75 sm:text-[13px]">
              {text.description}
            </p>

            {/* SOCIAL ICONS */}
            {SHOW_SOCIALS && (
              <>
                <h3 className="mt-6 font-jakarta text-[14px] font-bold text-white">
                  {text.followUs}
                </h3>

                <ul className="mt-3 flex gap-3">
                  {socials.map(
                    ({ name, color, icon }) => (
                      <li key={name}>
                        <a
                          href="#"
                          aria-label={name}
                          className={`flex h-9 w-9 items-center justify-center rounded-md text-white transition-opacity hover:opacity-80 ${color}`}
                        >
                          <svg
                            viewBox="0 0 24 24"
                            className="h-6 w-6"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            {icon}
                          </svg>
                        </a>
                      </li>
                    )
                  )}
                </ul>
              </>
            )}
          </div>

          {/* SERVICES */}
          <div>
            <h3 className="mb-4 font-jakarta text-[14px] font-bold text-white sm:text-[15px]">
              {text.servicesTitle}
            </h3>

            <ul className="space-y-3">
              {text.serviceLinks.map(
                ({ label, href }) => (
                  <li key={href}>
                    <a
                      href={href}
                      className="font-jakarta text-[12px] text-white/70 transition-colors hover:text-[#FBCB20] sm:text-[13px]"
                    >
                      {label}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="mb-4 font-jakarta text-[14px] font-bold text-white sm:text-[15px]">
              {text.companyTitle}
            </h3>

            <ul className="space-y-3">
              {text.companyLinks.map(
                ({ label, href }) => (
                  <li key={`${href}-${label}`}>
                    <a
                      href={href}
                      className="font-jakarta text-[12px] text-white/70 transition-colors hover:text-[#FBCB20] sm:text-[13px]"
                    >
                      {label}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* VISIT US */}
          <div>
            <h3 className="mb-4 font-jakarta text-[14px] font-bold text-white sm:text-[15px]">
              {text.visitTitle}
            </h3>

            <address className="not-italic">
              <p className="max-w-[250px] font-jakarta text-[12px] leading-[1.55] text-white/70 sm:text-[13px]">
                {text.address}
              </p>

              <a
                href="tel:+628212820300"
                className="mt-4 inline-block font-jakarta text-[13px] font-bold text-[#FBCB20] transition-colors hover:text-white sm:text-[14px]"
              >
                +62 821 282 0300
              </a>
            </address>
          </div>
        </div>

        {/* BOTTOM FOOTER */}
        <div className="mt-12 flex flex-col gap-4 border-t border-white/15 pt-7 sm:flex-row sm:items-center sm:justify-between">

          {/* Copyright */}
          <p className="font-jakarta text-[11px] text-white/65 sm:text-[12px]">
            {text.copyright}
          </p>

          {/* Legal links */}
          <ul className="flex flex-wrap gap-x-6 gap-y-2 lg:gap-x-8">
            {text.legalLinks.map(
              ({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="font-jakarta text-[11px] text-white/65 underline decoration-white/40 underline-offset-2 transition-colors hover:text-[#FBCB20] sm:text-[12px]"
                  >
                    {label}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </footer>
  );
}