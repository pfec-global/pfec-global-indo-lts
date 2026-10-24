"use client";

import { useLanguage } from "@/context/LanguageContext";

const content = {
  EN: {
    eyebrow: "How it works",

    heading1: "Your plan, your goals.",
    heading2: "We just make it happen.",

    intro1: "We’re here to assist you, not to change your plans.",
    intro2: "Four steps from first chat to take-off.",

    steps: [
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
    ],
  },

  ID: {
    eyebrow: "Cara kerjanya",

    heading1: "Anda merencanakan",
    heading2: "Kami yang mewujudkannya.",

    intro1:
      "Kami hadir untuk membantu Anda, bukan mengubah rencana Anda.",
    intro2:
      "Empat langkah dari awal konseling sampai berangkat.",

    steps: [
      {
        number: "1",
        title: "Pemeriksaan profil gratis",
        description:
          "Sesi 1-on-1 untuk memahami nilai akademik, minat, financial, dan destinasi Anda.",
      },
      {
        number: "2",
        title: "Daftar pilihan Anda",
        description:
          "Negara, universitas, dan program studi yang cocok untuk Anda, plus beasiswa yang layak dicoba.",
      },
      {
        number: "3",
        title: "Daftar dengan percaya diri",
        description:
          "Kami menyiapkan dan memeriksa pendaftaran serta dokumen Anda bersama-sama.",
      },
      {
        number: "4",
        title: "Visa & Keberangkatan",
        description:
          "Bantuan visa dan pembekalan pra-keberangkatan agar Anda berhasil dan sukses.",
      },
    ],
  },
};


export default function HowItWorks() {
  const { language } = useLanguage();

  const text = content[language] || content.EN;
  const steps = text.steps;

  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">

        {/* Section heading */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:mb-9 sm:flex-row sm:items-end">
          <div>
            <span className="font-jakarta text-sm font-bold uppercase tracking-wide text-[#24139b]">
              {text.eyebrow}
            </span>

            <h2 className="mt-3 font-jakarta text-2xl font-extrabold leading-[1.15] text-[#100B36] sm:text-[26px]">
              {text.heading1}
              <br />
              {text.heading2}
            </h2>
          </div>

          <p className="max-w-[420px] font-jakarta text-sm leading-relaxed text-[#514b70] sm:text-base">
            {text.intro1}
            <br className="hidden sm:block" />
            {text.intro2}
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <article
              key={step.number}
              className="group min-h-[184px] rounded-[20px] border border-transparent bg-[#f7f6fc] p-5 text-[#100B36] transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-[#100B36] hover:bg-[#100B36] hover:shadow-[0_12px_28px_rgba(16,11,54,0.13)] sm:p-[21px]"
            >
              {/* Number badge */}
              <span
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#24139b] font-jakarta text-lg font-extrabold text-[#ffd43b] transition-colors duration-300 group-hover:bg-[#ffd43b] group-hover:text-[#100B36]"
              >
                {step.number}
              </span>

              {/* Step title */}
              <h3
                className="mt-4 font-jakarta text-[16px] font-extrabold leading-snug text-[#100B36] transition-colors duration-300 group-hover:text-white"
              >
                {step.title}
              </h3>

              {/* Description */}
              <p
                className="mt-3 font-jakarta text-[12px] leading-[1.6] text-[#514b70] transition-colors duration-300 group-hover:text-white/85"
              >
                {step.description}
              </p>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
