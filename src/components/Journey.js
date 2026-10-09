import Image from "next/image";
import Reveal from "./Reveal";
import CountUp from "./CountUp";

const stats = [
  { end: 22000, suffix: "+", label: ["Students", "Assisted"] },
  { end: 550, suffix: "+", label: ["Institutions across", "11 Countries"] },
  { end: 19, suffix: "+", label: ["Years of", "Experience"] },
  { end: 17, label: ["Offices across", "the Globe"] },
];

export default function Journey() {
  return (
    <section className="overflow-hidden bg-[#050768] text-white">
      <div className="mx-auto grid max-w-[105rem] items-center gap-10 px-4 py-12 sm:px-8 lg:px-12 xl:grid-cols-[1fr_55.4rem] xl:gap-6 xl:py-[3.1rem]">
        <Reveal x={-40} y={0}>
          <h2 className="mt-6 --font-sans text-3xl font-bold leading-tight sm:text-4xl xl:mt-8 xl:text-[2.5rem] xl:leading-[3rem]">
            Your study abroad journey
            <br className="hidden sm:block" /> starts with one conversation.
          </h2>
          <div className="mt-5 h-0.5 w-[12.8rem] bg-accent" />

          <p className="mt-6 max-w-[42rem] text-base leading-relaxed xl:text-[0.95rem] xl:leading-[1.35rem]">
            Beginning in 2006, PFEC Global&apos;s expertise in student migration
            consultancy evolved from a single Melbourne office to a
            multinational presence, spanning Australia, Bangladesh, Sri Lanka,
            and India. We now proudly represent international educational
            institutions, consistently turning students&apos; dreams into their
            reality.
          </p>

          <dl className="mt-8 grid max-w-[24rem] grid-cols-2 gap-x-6 gap-y-10 xl:mt-7 xl:max-w-none xl:grid-cols-[11.3rem_auto] xl:justify-start xl:gap-x-0 xl:gap-y-[3.2rem]">
            {stats.map(({ end, suffix, label }) => (
              <div key={end} className="flex flex-col-reverse">
                <dd className="mt-1.5 text-base font-light leading-snug xl:text-[0.95rem]">
                  {label[0]}
                  <br />
                  {label[1]}
                </dd>
                <dt className="font-poppins text-2xl font-bold xl:text-[1.4rem]">
                  <CountUp end={end} suffix={suffix} />
                </dt>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal x={40} y={0} delay={0.15}>
          <Image
            src="/images/world_map.png"
            alt="World map showing PFEC Global offices: Bangladesh (4), India (4), Sri Lanka (1), Indonesia (1) and Australia (6)"
            width={1791}
            height={1031}
            sizes="(min-width: 1280px) 47vw, 100vw"
            className="h-auto w-full"
          />
        </Reveal>
      </div>
    </section>
  );
}
