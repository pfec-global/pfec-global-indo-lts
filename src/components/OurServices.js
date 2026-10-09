
"use client";

const services = [
  {
    title: "Profile Review",
    secondLine: "& Counselling",
    icon: "checklist",
  },
  {
    title: "University &",
    secondLine: "Course Selection",
    icon: "university",
  },
  {
    title: "Application",
    secondLine: "Assistance",
    icon: "application",
  },
  {
    title: "Scholarship",
    secondLine: "Guidance",
    icon: "scholarship",
  },
  {
    title: "Visa",
    secondLine: "Assistance",
    icon: "plane",
  },
  {
    title: "Pre-Departure",
    secondLine: "Support",
    icon: "support",
  },
];

function ServiceIcon({ type }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "h-7 w-7",
    "aria-hidden": true,
  };

  switch (type) {
    case "checklist":
      return (
        <svg {...common}>
          <path d="m3 5 2 2 3-3M11 5h10" />
          <path d="m3 12 2 2 3-3M11 12h10" />
          <path d="m3 19 2 2 3-3M11 19h10" />
        </svg>
      );

    case "university":
      return (
        <svg {...common}>
          <path d="m2 9 10-6 10 6H2Z" />
          <path d="M4 10v8M8 10v8M16 10v8M20 10v8M2 20h20M3 18h18" />
        </svg>
      );

    case "application":
      return (
        <svg {...common}>
          <path d="M5 3 19 6v15L5 18V3Z" />
          <path d="M5 3 2 5v15l14 2M9 8l6 1M9 12l6 1M9 16l4 1" />
        </svg>
      );

    case "scholarship":
      return (
        <svg {...common}>
          <path d="M6 5V3h12v2M4 7h16l2 4H2l2-4Z" />
          <path d="M4 11v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
          <path d="M12 14v5M14 15.5c-.5-1-4-1-4 0s4 1 4 2-3.5 1-4 0" />
        </svg>
      );

    case "plane":
      return (
        <svg {...common}>
          <path d="m21 3-7 18-4-8-8-4 19-6Z" />
          <path d="m10 13 5-5M7 17l-3 4M4 14l-1 4" />
        </svg>
      );

    default:
      return (
        <svg {...common}>
          <path d="M8 11 10 9a3 3 0 0 1 4 0l1 1" />
          <path d="m7 12-2-2a2 2 0 0 0-3 3l6 6a3 3 0 0 0 4 0l1-1" />
          <path d="m14 10 2-2a2 2 0 0 1 3 0l3 3a2 2 0 0 1-3 3" />
          <path d="m11 16 3 3a2 2 0 0 0 3-3l-3-3" />
          <path d="m15 13 3 3a2 2 0 0 0 3-3l-4-4" />
        </svg>
      );
  }
}

export default function OurServices() {
  return (
    <section
      id="services"
      className="w-full bg-[#24139b] py-16 sm:py-20 lg:py-[72px]"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Section heading */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:mb-9 sm:flex-row sm:items-end">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wide text-white">
              Our Services
            </span>

            <h2 className="mt-3 font-neue-reman text-[27px] font-bold leading-[1.12] text-white sm:text-[32px]">
              Everything you need to Study
              <br className="hidden sm:block" /> Abroad, in One Place.
            </h2>
          </div>

          <p className="max-w-[340px] text-[12px] leading-[1.7] text-white/90 sm:text-[13px] sm:text-right">
            From your first conversation to your departure, get expert support
            across your study abroad journey.
          </p>
        </div>

        {/* Service cards */}
        <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <a
              key={service.title}
              href="#consultation"
              className="group flex min-h-[105px] items-center gap-[18px] rounded-[15px] border border-transparent bg-white px-[18px] py-4 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-[#FBCB20] hover:bg-[#FBCB20] hover:shadow-[0_10px_24px_rgba(0,0,0,0.16)] sm:px-[18px]"
            >
              {/* Icon container */}
              <span className="flex h-[49px] w-[49px] shrink-0 items-center justify-center rounded-[11px] bg-[#eeedf0] text-[#24139b] transition-colors duration-300 group-hover:bg-white group-hover:text-[#100B36]">
                <ServiceIcon type={service.icon} />
              </span>

              {/* Text */}
              <span className="flex min-w-0 flex-col">
                <span className="font-neue-reman text-[17px] font-extrabold leading-[1.2] text-[#171717] transition-colors duration-300 group-hover:text-[#100B36] sm:text-[18px]">
                  {service.title}
                  <br />
                  {service.secondLine}
                </span>

                <span className="mt-2 inline-flex items-center gap-1 text-[12px] text-[#737373] transition-colors duration-300 group-hover:text-[#100B36]">
                  Get Started
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    ›
                  </span>
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
