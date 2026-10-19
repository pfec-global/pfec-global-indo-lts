"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

const AUTOPLAY_MS = 4000;

const testimonials = [
  {
    photo: "Abdul-Deriya.png",
    quote:
      "My name is Abdul Deriya, and I recently received my Dubai student visa. I would like to give special thanks to PFEC Global for supporting me throughout the entire process, from counselling to visa approval. I visited many local consultancies, but I did not receive the proper guidance I was looking for. I am very satisfied with the support and professionalism of the PFEC counsellor team.",
    name: "Abdul Deriya",
    role: "Manipal Academy of Higher Education - Dubai Campus",
  },
  {
    photo: "Giash-Uddin.png",
    quote:
      "I had a great experience with Azman Salid from PFEC Global during my Australian student visa process. They carefully guided me through every step, ensured all documents were accurate, and handled the process with great attention to detail. Their patience, dedication, and consistent support made everything much easier and stress-free. I highly recommend PFEC Global.",
    name: "Giash Uddin",
    role: "RMIT University - Bachelor of Engineering (Mechanical)",
  },
  {
    photo: "SACHINI.png",
    quote:
      "I had a very positive experience with PFEC Global Sri Lanka during my Australian student visa process. They handled my application with great professionalism and dedication from start to finish. My counselor guided me step by step, explained every detail clearly, and was always available whenever I had questions. The whole process was smooth and completely stress-free.",
    name: "Sachini Thishadi Weerasinghe & Spouse",
    role: "Murdoch University - Master of Engineering (Practice)",
  },
];

const content = {
  EN: {
    eyebrow: "Student Stories",
    heading: "Honest advice. Real outcomes.",
    description:
      "Personal guidance based on your goals, virtual or in person.",
    previous: "Previous testimonials",
    next: "Next testimonials",
    slideLabel: "Go to testimonial slide",
  },

  ID: {
    eyebrow: "Kisah Mahasiswa",
    heading: "Informasi yang jujur. Hasil yang nyata.",
    description:
      "Bimbingan personal sesuai tujuan Anda, secara virtual maupun tatap muka.",
    previous: "Testimoni sebelumnya",
    next: "Testimoni berikutnya",
    slideLabel: "Buka slide testimoni",
  },
};

function Arrow({ direction = "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-5 w-5 ${
        direction === "left" ? "rotate-180" : ""
      }`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

export default function Testimonials() {
  const { language } = useLanguage();
  const text = content[language] || content.EN;

  const [active, setActive] = useState(0);
  const [visibleCards, setVisibleCards] = useState(2);

  const maxIndex = Math.max(
    0,
    testimonials.length - visibleCards
  );

  // Responsive carousel
  useEffect(() => {
    const updateCards = () => {
      setVisibleCards(window.innerWidth < 768 ? 1 : 2);
    };

    updateCards();

    window.addEventListener("resize", updateCards);

    return () => {
      window.removeEventListener("resize", updateCards);
    };
  }, []);

  // Keep active index within available slides
  useEffect(() => {
    setActive((current) => Math.min(current, maxIndex));
  }, [maxIndex]);

  // Automatic slide movement
  useEffect(() => {
    const timer = setInterval(() => {
      setActive((current) =>
        current >= maxIndex ? 0 : current + 1
      );
    }, AUTOPLAY_MS);

    return () => clearInterval(timer);
  }, [maxIndex]);

  const prev = () => {
    setActive((current) =>
      current <= 0 ? maxIndex : current - 1
    );
  };

  const next = () => {
    setActive((current) =>
      current >= maxIndex ? 0 : current + 1
    );
  };

  return (
    <section className="overflow-hidden bg-[#100B36] font-jakarta text-white">
      <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 lg:px-[7.3%] lg:py-[72px]">

        {/* SECTION HEADING */}
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end lg:mb-7">
          <div>
            <p className="mb-3 font-jakarta text-[11px] font-semibold uppercase leading-none text-[#FBCB20] sm:text-base">
              {text.eyebrow}
            </p>

            <h2 className="font-jakarta text-[26px] font-bold leading-tight tracking-[-0.5px] sm:text-[26px]">
              {text.heading}
            </h2>
          </div>

          <p className="pb-1 font-jakarta text-[12px] leading-5 text-white/85 sm:text-[13px]">
            {text.description}
          </p>
        </div>

        {/* TESTIMONIAL CAROUSEL */}
        <div className="overflow-hidden">
          <div
            className="flex items-stretch gap-[30px] transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(calc(${active} * (-100% - 30px) / ${visibleCards}))`,
            }}
          >
            {testimonials.map((item) => (
              <article
                key={item.name}
                className="group flex min-h-[282px] w-full shrink-0 flex-col gap-5 rounded-[16px] border border-white/15 bg-[#261F57] p-[18px] transition-colors duration-300 hover:border-[#FBCB20]/60 sm:p-[18px] md:flex-row md:items-stretch md:gap-[18px]"
                style={{
                  width: `calc((100% - ${
                    (visibleCards - 1) * 30
                  }px) / ${visibleCards})`,
                }}
              >
                {/* STUDENT PHOTO */}
                <div className="relative h-[210px] w-full shrink-0 overflow-hidden rounded-[10px] bg-[#FBCB20] md:h-auto md:w-[42%]">
                  <Image
                    src={`/images/testimonial/${item.photo}`}
                    alt={item.name}
                    fill
                    sizes="(max-width: 767px) 90vw, 22vw"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>

                {/* TESTIMONIAL CONTENT */}
                <div className="flex min-w-0 flex-1 flex-col justify-center py-1 md:py-2">

                  {/* Student review */}
                  <p className="font-jakarta text-[13px] leading-[1.4rem] text-white/90">
                    {item.quote}
                  </p>

                  {/* Student details */}
                  <div className="mt-4">
                    <h3 className="font-jakarta text-[13px] font-medium uppercase leading-5 text-[#FBCB20]">
                      {item.name}
                    </h3>

                    <p className="mt-1 font-jakarta text-[10px] leading-[1.1rem] text-white/60 sm:text-[11px]">
                      {item.role}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* CAROUSEL CONTROLS */}
        <div className="mt-6 flex items-center justify-between md:mt-7">

          {/* Slide indicators */}
          <div className="flex items-center gap-2">
            {Array.from({
              length: maxIndex + 1,
            }).map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`${text.slideLabel} ${
                  index + 1
                }`}
                aria-current={active === index}
                onClick={() => setActive(index)}
                className={`h-[7px] rounded-full transition-all duration-300 ${
                  active === index
                    ? "w-7 bg-[#FBCB20]"
                    : "w-[7px] bg-white/35 hover:bg-white/70"
                }`}
              />
            ))}
          </div>

          {/* Previous / Next buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label={text.previous}
              onClick={prev}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 text-white transition hover:border-[#FBCB20] hover:text-[#FBCB20]"
            >
              <Arrow direction="left" />
            </button>

            <button
              type="button"
              aria-label={text.next}
              onClick={next}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 text-white transition hover:border-[#FBCB20] hover:text-[#FBCB20]"
            >
              <Arrow />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
