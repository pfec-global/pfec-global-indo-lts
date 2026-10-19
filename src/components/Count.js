"use client";

import CountUp from "./CountUp";
import { useLanguage } from "@/context/LanguageContext";

const countContent = {
  EN: [
    {
      value: 22000,
      suffix: "+",
      heading: null,
      label: "students helped abroad",
    },
    {
      value: 19,
      suffix: "+ years",
      heading: null,
      label: "of Expertise",
    },
    {
      value: 17,
      suffix: " Offices",
      heading: null,
      label: "Across 4 Countries",
    },
    {
      value: null,
      suffix: "",
      heading: "End to End",
      label: "Expert Guidance",
    },
  ],

  ID: [
    {
      value: 22000,
      suffix: "+",
      heading: null,
      label: "mahasiswa dibantu kuliah di luar negeri",
    },
    {
      value: 19,
      suffix: "+ tahun",
      heading: null,
      label: "pengalaman",
    },
    {
      value: 17,
      suffix: " Kantor",
      heading: null,
      label: "di 5 negara",
    },
    {
      value: null,
      suffix: "",
      heading: "Dari Awal hingga Akhir",
      label: "dibimbing oleh Konselor berpengalaman",
    },
  ],
};

export default function Count() {
  const { language } = useLanguage();

  const stats = countContent[language] || countContent.EN;

  return (
    <section className="w-full bg-[#24139b]">
      <div className="mx-auto grid min-h-[112px] w-full max-w-[1440px] grid-cols-2 items-center gap-y-6 px-6 py-7 sm:grid-cols-4 sm:gap-y-0 sm:px-8 lg:px-12 lg:py-8">
        {stats.map((stat) => (
          <div
            key={`${stat.heading || stat.value}-${stat.label}`}
            className="min-w-0 sm:border-l sm:border-white/15 sm:pl-5 lg:pl-10 first:sm:border-l-0 first:sm:pl-0"
          >
            <h2 className="whitespace-nowrap font-poppins text-[22px] font-extrabold leading-tight tabular-nums text-[#ffd43b] sm:text-[24px] lg:text-[30px]">
              {stat.value !== null ? (
                <CountUp
                  end={stat.value}
                  suffix={stat.suffix}
                />
              ) : (
                stat.heading
              )}
            </h2>

            <p className="mt-1.5 text-[11px] font-medium leading-5 text-white sm:text-base">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
