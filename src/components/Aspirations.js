import Image from "next/image";
import Reveal from "./Reveal";

const ART = "/images/aspirations";

// `position` only applies on desktop, where the cards float around the artwork.
const steps = [
  {
    title: ["Expert Profile Assessment", "& Mentorship Session"],
    text: "A personalized one-on-one session to understand your academic background, goals, budget, and future plans. Get expert insights and a clear direction for your study abroad journey.",
    position: "xl:left-0 xl:top-0",
  },
  {
    title: ["Shortlisting Countries,", "Universities & Courses"],
    text: "Discover options that genuinely match your profile and ambitions. We help you shortlist the right countries, universities, and courses based on your goals and preferences.",
    position: "xl:left-[5.2rem] xl:top-[17rem]",
  },
  {
    title: ["Applications & Other", "Documentation Process"],
    text: "From applications to SOPs and supporting documents, we guide you through every requirement carefully to help you submit with confidence and accuracy.",
    position: "xl:right-0 xl:top-0",
  },
  {
    title: ["Visa Assistance &", "Pre Departure Guidance"],
    text: "Get step-by-step support for your visa process along with practical guidance to prepare for life abroad before you take off.",
    position: "xl:right-[5.2rem] xl:top-[17rem]",
  },
];

export default function Aspirations() {
  return (
    <section className="bg-gradient-to-b from-[#fdfdfd] to-[#fff0bc] font-poppins">
      <div className="mx-auto max-w-[107.25rem] px-4 py-12 sm:px-8 lg:px-12 xl:pb-16 xl:pt-[4.25rem]">
        <h2 className="text-center text-2xl leading-snug text-neutral-900 sm:text-3xl xl:text-[2.625rem]">
          <span className="font-bold text-brand">
            Your Goals. Your Aspirations
          </span>{" "}
          - At the Center
        </h2>
        <p className="mt-3 text-center text-base text-neutral-600 xl:mt-5 xl:text-[1.3rem]">
          We are only here to Assist you. (Not to Change your Plans)
        </p>

        <div className="mt-8 xl:relative xl:mt-[3.4rem] xl:h-[44.6rem]">
          {/* Artwork: circles, shapes and graduate sized in % of one square */}
          <div className="relative mx-auto aspect-[42.35/35.5] w-full max-w-[26rem] overflow-hidden xl:absolute xl:-top-2 xl:left-1/2 xl:w-[42.35rem] xl:max-w-none xl:-translate-x-1/2">
            <div className="absolute left-0 top-[6.5%] aspect-square w-full">
              <Image
                src={`${ART}/Ellipse 4.png`}
                alt=""
                width={1410}
                height={1410}
                style={{ animationDelay: "-2.6s" }}
                className="absolute inset-0 h-full w-full motion-safe:animate-ring"
              />
              <Image
                src={`${ART}/Ellipse 5.png`}
                alt=""
                width={1222}
                height={1222}
                style={{ animationDelay: "-1.3s" }}
                className="absolute inset-0 m-auto h-[86.7%] w-[86.7%] motion-safe:animate-ring"
              />
              <Image
                src={`${ART}/Ellipse 6.png`}
                alt=""
                width={1018}
                height={1018}
                className="absolute inset-0 m-auto h-[72.2%] w-[72.2%] motion-safe:animate-ring"
              />
              <Image
                src={`${ART}/Vector.png`}
                alt=""
                width={812}
                height={970}
                className="absolute left-[47%] top-[6.7%] h-auto w-[46.7%]"
              />
              <Image
                src={`${ART}/Vector-1.png`}
                alt=""
                width={328}
                height={328}
                className="absolute left-[7.7%] top-[1%] h-auto w-[23.7%] motion-safe:animate-[spin_18s_linear_infinite]"
              />
              <Image
                src={`${ART}/Indonesian graduate 1.png`}
                alt="Smiling graduate holding a diploma"
                width={988}
                height={1158}
                sizes="(min-width: 1280px) 30vw, 26rem"
                className="absolute -top-[5.2%] left-[13.5%] h-auto w-[70%] origin-bottom motion-safe:animate-breathe"
              />
            </div>
          </div>

          <ol className="relative z-10 grid gap-5 sm:grid-cols-2 xl:static xl:block">
            {steps.map(({ title, text, position }, i) => (
              <Reveal
                as="li"
                key={title[0]}
                x={i < 2 ? -40 : 40}
                y={0}
                delay={0.12 * (i % 2)}
                className={`hover:z-20 xl:absolute xl:w-[28.1rem] ${position}`}
              >
                <div
                  className={`flex h-full flex-col rounded-br-[1.5rem] rounded-tl-[1.5rem] border-b-4 border-transparent bg-white px-6 py-5 shadow-[0_2px_12px_rgba(0,0,0,0.08)] transition duration-300 ease-out hover:-translate-y-2 hover:border-accent hover:shadow-[0_16px_32px_rgba(16,6,148,0.18)] ${position}`}
                >
                  <span className="text-[1.9rem] font-light leading-none text-accent">
                    0{i + 1}
                  </span>
                  <h3 className="mt-2 text-xl font-bold leading-tight text-brand xl:text-2xl xl:leading-7">
                    {title[0]} <br className="hidden xl:block" />
                    {title[1]}
                  </h3>
                  <p className="mt-2 text-base leading-snug text-neutral-900 xl:text-base xl:leading-[1.35rem]">
                    {text}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>

          <div className="relative z-10 mt-5 flex flex-col items-center gap-5 rounded-br-[1.5rem] rounded-tl-[1.5rem] bg-[#fafafa] px-4 py-6 text-center sm:px-6 sm:py-7 shadow-[0_2px_12px_rgba(0,0,0,0.08)] lg:flex-row lg:justify-between lg:text-left xl:absolute xl:left-1/2 xl:top-[34.2rem] xl:mt-0 xl:h-[10.4rem] xl:w-[53.9rem] xl:-translate-x-1/2 xl:px-12">
            <p className="text-[min(5.4vw,1.25rem)] font-semibold leading-tight text-black sm:text-2xl xl:text-[1.75rem] xl:leading-[2.1rem]">
              Ready to Turn your Study
              <br />
              Abroad Dreams into Reality?
            </p>
            <div className="w-full text-center sm:w-auto pop-up">
              <a
                href="#"
                className="block whitespace-nowrap rounded-xl bg-accent px-4 py-3.5 text-base font-semibold sm:inline-block sm:px-10 sm:py-4 sm:text-lg text-white hover:opacity-90 xl:text-xl"
              >
                Book Free Appointment
              </a>
              <p className="mt-2.5 whitespace-nowrap text-[min(3.9vw,1rem)] text-black xl:text-lg">
                ✨ No Fluff. Quick Expert Guidance ✨
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
