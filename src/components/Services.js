import Image from "next/image";
import Reveal from "./Reveal";

const services = [
  {
    icon: "icon_1.png",
    title: "Profile Assessment & Counselling",
    text: "Understand your options based on your academic profile, goals and preferences.",
  },
  {
    icon: "icon_2.png",
    title: "University & Course Selection",
    text: "Find courses and universities that align with your ambitions and plans.",
  },
  {
    icon: "icon_3.png",
    title: "Application Assistance",
    text: "Get support with applications, documentation and the details that matter.",
  },
  {
    icon: "icon_4.png",
    title: "Scholarship Guidance",
    text: "Explore scholarship opportunities and understand eligibility and requirements.",
  },
  {
    icon: "icon_5.png",
    title: "Visa Assistance",
    text: "Navigate visa requirements and documentation with expert guidance.",
  },
  {
    icon: "icon_6.png",
    title: "Pre-Departure Support",
    text: "Get prepared for life abroad with practical guidance before you leave.",
  },
];

export default function Services() {
  return (
    <section className="bg-[#3c33b6] font-poppins">
      <div className="mx-auto grid max-w-[105rem] gap-10 px-4 py-12 sm:px-8 lg:px-12 xl:grid-cols-[1fr_59.8rem] xl:gap-8 xl:py-16">
        <Reveal x={-40} y={0} className="xl:pt-[3.75rem]">
          <span className="inline-block bg-sun px-6 py-3 text-xl font-bold text-neutral-900 xl:text-2xl">
            Our Services
          </span>

          <h2 className="mt-7 text-3xl leading-tight text-white sm:text-4xl xl:text-[2.625rem] xl:leading-[3rem]">
            <span className="font-bold">Everything you need</span>
            <br />
            to Study Abroad.
          </h2>

          <p className="mt-6 max-w-[24rem] text-base leading-relaxed text-white sm:text-lg xl:mt-14 xl:text-xl xl:leading-[1.875rem]">
            From your first conversation to your departure, get expert support
            across your study abroad journey.
          </p>

          <Image
            src="/images/square_dotted.png"
            alt=""
            width={540}
            height={535}
            className="mt-12 hidden h-auto w-[11.25rem] xl:block"
          />
        </Reveal>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6">
          {services.map(({ icon, title, text }, i) => (
            <Reveal as="li" y={32} delay={0.08 * i} key={title}>
              <div className="group flex h-full flex-col justify-center rounded-br-[1.5rem] rounded-tl-[1.5rem] border-b-4 border-transparent bg-white p-6 transition duration-300 ease-out hover:-translate-y-2 hover:border-sun hover:shadow-[0_18px_36px_rgba(0,0,0,0.35)] xl:min-h-[20.125rem]">
                <Image
                  src={`/images/icon/${icon}`}
                  alt=""
                  width={128}
                  height={148}
                  className="h-auto w-[3.9rem] transition-transform duration-300 ease-out group-hover:scale-110"
                />
                <h3 className="mt-8 max-w-[15rem] text-xl font-bold leading-tight text-brand xl:text-2xl xl:leading-7">
                  {title}
                </h3>
                <p className="mt-2.5 text-base leading-6 text-neutral-500">
                  {text}
                </p>
                <a
                  href="#"
                  className="mt-2.5 inline-flex items-center gap-1.5 text-accent hover:underline"
                >
                  Get Started
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    &rsaquo;
                  </span>
                </a>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
