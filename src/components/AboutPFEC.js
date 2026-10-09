"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const stats = [
  {
    value: 22000,
    suffix: "+",
    label: "Students",
    description: "Assisted",
  },
  {
    value: 550,
    suffix: "+",
    label: "Institutions across",
    description: "11 Countries",
  },
  {
    value: 19,
    suffix: "+",
    label: "Years of",
    description: "Experience",
  },
  {
    value: 17,
    suffix: "",
    label: "Offices across",
    description: "the Globe",
  },
];

// Update these paths to match your actual image filenames.
const mapImages = [
  {
    src: "/images/about/Group 67.png",
    alt: "PFEC Global Bangladesh office",
  },
  {
    src: "/images/about/Group 68.png",
    alt: "PFEC Global Australia office",
  },
  {
    src: "/images/about/Group 69.png",
    alt: "PFEC Global India offices",
  },
  {
    src: "/images/about/Group 70.png",
    alt: "PFEC Global Sri Lanka office",
  },
  {
    src: "/images/about/Group 71.png",
    alt: "PFEC Global Indonesia office",
  },
];

function AnimatedCounter({ value, suffix, start }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let frameId;
    let startTime;

    const duration = 1800;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;

      const progress = Math.min(
        (timestamp - startTime) / duration,
        1
      );

      const easedProgress = 1 - Math.pow(1 - progress, 4);

      setCount(Math.floor(easedProgress * value));

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, [value, start]);

  return (
    <>
      {count.toLocaleString("en-IN")}
      {suffix}
    </>
  );
}

export default function AboutPFEC() {
  const sectionRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [visibleMaps, setVisibleMaps] = useState(false);

  // Start the animations when the section enters the viewport.
  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          setVisibleMaps(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden bg-[#24139B] font-poppins text-white"
    >
      <div className="mx-auto max-w-[1440px] px-5 pb-12 pt-12 sm:px-8 md:pb-16 md:pt-16 lg:px-[9.1%] lg:pb-[70px] lg:pt-[65px]">
        {/* Introduction and statistics */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.5fr_0.9fr] lg:items-start lg:gap-12">
          {/* About content */}
          <div className="max-w-[550px]">
            <p className="mb-4 text-[11px] font-semibold uppercase text-[#FBCB20] sm:text-base">
              About PFEC Global
            </p>

            <h2 className="font-neue-reman text-[27px] font-bold leading-[1.12] tracking-[-0.5px] sm:text-[32px]">
              Your study abroad journey starts
              <br className="hidden sm:block" /> with one conversation.
            </h2>

            <p className="mt-4 max-w-[500px] text-[12px] leading-[1.65] text-white/90 sm:text-[13px]">
              Beginning in 2006, PFEC Global&apos;s expertise in student
              migration consultancy evolved from a single Melbourne office
              to a multinational presence, spanning Australia, Bangladesh,
              Sri Lanka, and India. We now proudly represent international
              educational institutions, consistently turning students&apos;
              dreams into their reality.
            </p>
          </div>

          {/* Animated statistic cards */}
          <div className="grid grid-cols-2 gap-4 lg:ml-auto lg:w-full lg:max-w-[340px]">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex min-h-[65px] flex-col justify-center rounded-[10px] bg-[#261F57] px-3 py-2.5 transition-transform duration-300 hover:-translate-y-1 sm:px-4"
              >
                <p className="text-[18px] font-bold leading-tight text-[#FBCB20] sm:text-[20px]">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    start={started}
                  />
                </p>

                <p className="mt-0.5 text-[11px] leading-[1.3] text-white/75 sm:text-[12px]">
                  {stat.label}
                  <br />
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Five map images with staggered fade-in animation */}
        <div className="mt-8 grid grid-cols-2 items-center gap-4 sm:mt-10 sm:grid-cols-3 lg:mt-7 lg:grid-cols-5 lg:gap-3">
          {mapImages.map((map, index) => (
            <div
              key={map.src}
              className={`transform transition-all duration-700 ease-out ${
                visibleMaps
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
              style={{
                transitionDelay: visibleMaps
                  ? `${index * 350}ms`
                  : "0ms",
              }}
            >
              <Image
                src={map.src}
                alt={map.alt}
                width={300}
                height={220}
                className="h-auto w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
