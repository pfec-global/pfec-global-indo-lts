
"use client";

const steps = [
  {
    number: "1",
    title: "Free profile check",
    description:
      "A 1-on-1 session to understand your grades, interests, budget and goals.",
  },
  {
    number: "2",
    title: "Your shortlist",
    description:
      "Countries, universities and courses that fit you, plus scholarships worth trying for.",
  },
  {
    number: "3",
    title: "Apply with confidence",
    description:
      "We prepare and check your applications and documents with you.",
  },
  {
    number: "4",
    title: "Visa & take-off",
    description:
      "Visa assistance and a pre-departure briefing so you land ready.",
  },
];

export default function HowItWorks() {
  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[1100px] px-5 sm:px-8">
        {/* Section heading */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:mb-9 sm:flex-row sm:items-end">
          <div>
            <span className="font-jakarta text-base font-bold uppercase tracking-wide text-[#24139b]">
              How it works
            </span>

            <h2 className="mt-3 font-jakarta text-2xl font-extrabold leading-[1.15] text-[#100B36] sm:text-3xl">
              Your plan, your goals.
              <br />
              We just make it happen.
            </h2>
          </div>

          <p className="max-w-[330px] font-jakarta text-sm leading-relaxed text-[#514b70] sm:text-base">
            We’re here to assist you, not to change your plans.
            <br className="hidden sm:block" />
            Four steps from first chat to take-off.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const isDefaultActive = index === 3;

            return (
              <article
                key={step.number}
                className={`group min-h-[184px] rounded-[20px] border p-5 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-[#100B36] hover:bg-[#100B36] hover:shadow-[0_12px_28px_rgba(16,11,54,0.13)] sm:p-[21px] ${
                  isDefaultActive
                    ? "border-[#100B36] bg-[#100B36] text-white"
                    : "border-transparent bg-[#f7f6fc] text-[#100B36]"
                }`}
              >
                {/* Number badge */}
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-xl font-jakarta text-lg font-extrabold transition-colors duration-300 ${
                    isDefaultActive
                      ? "bg-[#ffd43b] text-[#100B36]"
                      : "bg-[#24139b] text-[#ffd43b] group-hover:bg-[#ffd43b] group-hover:text-[#100B36]"
                  }`}
                >
                  {step.number}
                </span>

                {/* Step title */}
                <h3
                  className={`mt-4 font-jakarta text-[16px] font-extrabold leading-snug transition-colors duration-300 ${
                    isDefaultActive
                      ? "text-white"
                      : "text-[#100B36] group-hover:text-white"
                  }`}
                >
                  {step.title}
                </h3>

                {/* Description */}
                <p
                  className={`mt-3 font-jakarta text-[12px] leading-[1.6] transition-colors duration-300 ${
                    isDefaultActive
                      ? "text-white/85"
                      : "text-[#514b70] group-hover:text-white/85"
                  }`}
                >
                  {step.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
