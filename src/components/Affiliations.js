import Image from "next/image";
import Reveal from "./Reveal";

const LOGOS = "/images/affiliations";

const groups = [
  {
    title: "Accreditations",
    width: "xl:w-[26.6rem]",
    logos: [
      {
        src: "affiliations_4.png",
        alt: "AIRC - American International Recruitment Council, certified through 2030",
        width: 250,
        height: 250,
        size: "w-[42%] max-w-[11.5rem]",
      },
      {
        src: "affiliations_3.png",
        alt: "ICEF Accredited trusted agency #2660",
        width: 650,
        height: 762,
        size: "w-[36%] max-w-[9.8rem]",
      },
    ],
  },
  {
    title: "Professional Certifications",
    width: "xl:w-[18.9rem]",
    logos: [
      {
        src: "affiliations_5.png",
        alt: "QEAC #12934",
        width: 420,
        height: 650,
        size: "w-[40%] max-w-[7.5rem]",
      },
    ],
  },
  {
    title: "Professional Membership",
    width: "xl:w-[26.5rem]",
    logos: [
      {
        src: "affiliations_2.png",
        alt: "Member of Migration Institute of Australia",
        width: 772,
        height: 731,
        size: "w-[44%] max-w-[11.5rem]",
      },
      {
        src: "affiliations_1.png",
        alt: "IEAA - International Education Association of Australia",
        width: 281,
        height: 101,
        size: "w-[42%] max-w-[11rem]",
      },
    ],
  },
];

export default function Affiliations() {
  return (
    <section className="relative overflow-hidden bg-white font-poppins">
      {/* Decorations */}
      <div className="absolute left-5 top-3 hidden h-[7.2rem] w-24 bg-[radial-gradient(#d3cff2_32%,transparent_34%)] bg-[size:1.2rem_1.2rem] lg:block" />
      <div className="absolute left-[9.6rem] top-[12.8rem] hidden h-[10.5rem] w-[7rem] -rotate-[35deg] xl:block">
        <div className="absolute inset-0 translate-x-1 translate-y-2 rounded-full bg-[#fde9a6]" />
        <div className="absolute inset-0 rounded-full border-2 border-[#1e2340]" />
      </div>
      <Image
        src="/images/net_img_1.png"
        alt=""
        width={360}
        height={360}
        className="absolute -bottom-20 -right-24 hidden h-auto w-[34rem] -rotate-[28deg] opacity-10 lg:block"
      />

      <div className="relative mx-auto max-w-[105rem] px-4 py-12 sm:px-8 lg:px-12 xl:pb-[5.4rem] xl:pt-[4.3rem]">
        <h2 className="text-center text-2xl leading-snug text-neutral-900 sm:text-3xl xl:text-[2.45rem]">
          <span className="font-bold text-brand">Our Affiliations</span> &amp;
          Recognition
        </h2>
        <p className="mt-3 text-center text-base text-neutral-600 xl:mt-4 xl:text-xl">
          Prestigious recognitions that speak volumes about the quality of our
          service.
        </p>

        <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:mt-7 xl:flex xl:justify-center xl:gap-8">
          {groups.map(({ title, width, logos }, i) => (
            <Reveal
              as="li"
              key={title}
              y={32}
              delay={0.12 * i}
              className={`md:max-lg:last:col-span-2 ${width}`}
            >
              <div
                className={`group flex h-full flex-col items-center transition duration-300 ease-out hover:-translate-y-2 hover:border-brand hover:shadow-[0_16px_32px_rgba(16,6,148,0.16)] rounded-br-[1.75rem] rounded-tl-[1.75rem] border border-neutral-300 bg-[#fcfcfc] px-5 pb-6 pt-5 shadow-[0_2px_6px_rgba(0,0,0,0.08)] xl:h-[17rem]`}
              >
                <h3 className="text-lg text-neutral-900 xl:text-xl">{title}</h3>
                <div className="mt-3 flex w-full flex-1 items-center justify-center gap-[5%]">
                  {logos.map(({ src, alt, width, height, size }) => (
                    <Image
                      key={src}
                      src={`${LOGOS}/${src}`}
                      alt={alt}
                      width={width}
                      height={height}
                      className={`h-auto transition-transform duration-300 ease-out group-hover:scale-105 ${size}`}
                    />
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
