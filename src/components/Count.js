
"use client";

import CountUp from "./CountUp";

const stats = [
  {
    value: 22000,
    suffix: "+",
    label: "students helped abroad",
  },
  {
    value: 19,
    suffix: "+ years",
    label: "of Expertise",
  },
  {
    value: 17,
    suffix: " Offices",
    label: "Across 4 Countries",
  },
  {
    value: null,
    suffix: "",
    label: "Expert Guidance",
    heading: "End to End",
  },
];

export default function Count() {
  return (
    <section className="w-full bg-[#24139b]">
      <div className="mx-auto grid min-h-[112px] w-full max-w-[1440px] grid-cols-2 items-center gap-y-6 px-6 py-7 sm:grid-cols-4 sm:gap-y-0 sm:px-8 lg:px-12 lg:py-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
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
