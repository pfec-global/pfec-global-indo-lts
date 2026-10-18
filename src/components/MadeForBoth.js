"use client";

import { useLanguage } from "@/context/LanguageContext";

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[17px] w-[17px] shrink-0"
      aria-hidden="true"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function ParentIcon({ type }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "h-[17px] w-[17px] shrink-0",
    "aria-hidden": true,
  };

  if (type === "shield") {
    return (
      <svg {...common}>
        <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    );
  }

  if (type === "wallet") {
    return (
      <svg {...common}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 9h18M7 15h.01" />
      </svg>
    );
  }

  if (type === "location") {
    return (
      <svg {...common}>
        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="10" cy="7" r="4" />
      <path d="M20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

const content = {
  EN: {
    eyebrow: "Made for both of you",

    heading1: "Studying abroad is a family decision.",
    heading2: "We talk to both of you.",

    studentLabel: "For students",
    studentHeading: "Find a course and a city that feel like you.",

    studentPoints: [
      "A shortlist matched to your grades, interests and budget",
      "Help finding and applying for scholarships",
      "Applications, visa and pre-departure, made easy",
      "Ask anything on WhatsApp, no question is too small",
    ],

    studentCTA: "Book Free Consultation",

    parentLabel: "For parents",
    parentHeading:
      "Honest guidance you can check, and people you can meet.",

    parentPoints: [
      "Accredited by AIRC and ICEF; Certified counsellors",
      "Options planned around your budget in Rupiah",
      "Visit us at Pondok Indah Plaza 5, Jakarta Selatan",
      "Join every session with your child, online or in person",
    ],

    parentCTA: "Book a family consultation",
  },

  ID: {
    eyebrow: "Dibuat untuk Anda berdua",

    heading1: "Kuliah di luar negeri adalah keputusan keluarga.",
    heading2: "Kami berbicara dengan Anda berdua.",

    studentLabel: "Untuk mahasiswa",
    studentHeading: "Temukan program studi dan kota yang sesuai untuk Anda.",

    studentPoints: [
      "Daftar pilihan kampus yang disesuaikan dengan nilai akademik, minat, dan anggaran Anda",
      "Bantuan mencari dan mendaftar beasiswa",
      "Pendaftaran visa, dan persiapan keberangkatan jadi lebih mudah",
      "Tanyakan apa saja via WhatsApp, tidak ada pertanyaan yang tidak kami tanggapi",
    ],

    studentCTA: "Pesan Konsultasi Gratis",

    parentLabel: "Untuk orang tua",
    parentHeading:
      "Bimbingan yang bisa Anda pelajari, dari konselor kami yang bisa anda temui.",

    parentPoints: [
      "Terakreditasi AIRC dan ICEF. Konselor bersertifikat",
      "Pilihan bisa disesuaikan dengan kemampuan finansial",
      "Kunjungi kami di Ruko Pondok Indah Plaza 5, Jakarta Selatan",
      "Ikuti setiap sesi bersama anak Anda, online maupun tatap muka langsung di kantor kami",
    ],

    parentCTA: "Pesan konsultasi keluarga",
  },
};

export default function MadeForBoth() {
  const { language } = useLanguage();

  const text = content[language] || content.EN;

  return (
    <section className="w-full bg-[#f7f6fc] py-16 font-jakarta sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8">

        {/* SECTION HEADING */}
        <div className="mb-8 sm:mb-9">
          <span className="font-jakarta text-sm font-bold uppercase tracking-wide text-[#24139b]">
            {text.eyebrow}
          </span>

          <h2 className="mt-3 font-jakarta text-2xl font-extrabold leading-[1.15] text-[#100B36] sm:text-[26px]">
            {text.heading1}
            <br className="hidden sm:block" /> {text.heading2}
          </h2>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-[18px]">

          {/* FIRST BOX - STUDENTS */}
          <article className="group rounded-[22px] border border-transparent bg-[#100B36] p-6 text-white transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-[#ded9ed] hover:bg-white hover:shadow-[0_15px_35px_rgba(16,11,54,0.14)] sm:p-[30px]">

            {/* Student Label */}
            <span className="inline-flex rounded-full bg-[#ffd43b] px-3 py-1.5 font-jakarta text-[10px] font-bold text-[#100B36] transition-colors duration-300 group-hover:bg-[#e9e4ff]">
              {text.studentLabel}
            </span>

            {/* Student Heading */}
            <h3 className="mt-4 max-w-[390px] font-jakarta text-base font-extrabold leading-[1.12] text-white transition-colors duration-300 group-hover:text-[#100B36] sm:text-[25px]">
              {text.studentHeading}
            </h3>

            {/* Student Benefits */}
            <ul className="mt-4 space-y-2.5">
              {text.studentPoints.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-2.5 font-jakarta text-[12px] leading-[1.5] text-white/85 transition-colors duration-300 group-hover:text-[#514b70]"
                >
                  <span className="mt-0.5 shrink-0 text-[#ffd43b] transition-colors duration-300 group-hover:text-[#100B36]">
                    <CheckIcon />
                  </span>

                  <span>{point}</span>
                </li>
              ))}
            </ul>

            {/* Student CTA */}
            <a
              href="#consultation"
              className="pop-up mt-5 inline-flex items-center justify-center rounded-full bg-[#ffd43b] px-4 py-3 font-jakarta text-[12px] font-bold text-[#100B36] transition-all duration-300 hover:scale-[1.03] hover:bg-[#100B36] hover:text-white"
            >
              {text.studentCTA}
            </a>
          </article>

          {/* SECOND BOX - PARENTS */}
          <article className="group rounded-[22px] border border-[#ded9ed] bg-white p-6 text-[#100B36] transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-[#100B36] hover:bg-[#100B36] hover:shadow-[0_15px_35px_rgba(16,11,54,0.14)] sm:p-[30px]">

            {/* Parent Label */}
            <span className="inline-flex rounded-full bg-[#e9e4ff] px-3 py-1.5 font-jakarta text-[10px] font-bold text-[#100B36] transition-colors duration-300 group-hover:bg-[#ffd43b]">
              {text.parentLabel}
            </span>

            {/* Parent Heading */}
            <h3 className="mt-4 max-w-[410px] font-jakarta text-[23px] font-extrabold leading-[1.12] text-[#100B36] transition-colors duration-300 group-hover:text-white sm:text-[25px]">
              {text.parentHeading}
            </h3>

            {/* Parent Benefits */}
            <ul className="mt-4 space-y-2.5">
              {text.parentPoints.map((point, index) => (
                <li
                  key={point}
                  className="flex items-start gap-2.5 font-jakarta text-[12px] leading-[1.5] text-[#514b70] transition-colors duration-300 group-hover:text-white"
                >
                  <span className="mt-0.5 shrink-0 text-[#24139b] transition-colors duration-300 group-hover:text-white">
                    <ParentIcon
                      type={
                        [
                          "shield",
                          "wallet",
                          "location",
                          "people",
                        ][index]
                      }
                    />
                  </span>

                  <span>{point}</span>
                </li>
              ))}
            </ul>

            {/* Parent CTA */}
            <a
              href="#consultation"
              className="pop-up mt-5 inline-flex items-center justify-center rounded-full bg-[#24139b] px-4 py-3 font-jakarta text-[12px] font-bold text-white transition-all duration-300 hover:scale-[1.03] hover:bg-[#ffd43b] hover:text-[#100B36]"
            >
              {text.parentCTA}
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}