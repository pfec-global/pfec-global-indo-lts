import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Count from "@/components/Count";

import Destinations from "@/components/Destinations";
import MadeForBoth from "@/components/MadeForBoth";
import HowItWorks from "@/components/HowItWorks";
import OurServices from "@/components/OurServices";
import FindCourse from "@/components/FindCourse";
import CourseFinder from "@/components/CourseFinder";
import AwardsAndAffiliations from "@/components/AwardsAndAffiliations";
import AboutPFEC from "@/components/AboutPFEC";
import FAQ from "@/components/FAQ";
import ObligationForm from "@/components/ObligationForm";
import Testimonials from "@/components/Testimonials";
import ConsultationPopup from "@/components/ConsultationPopup";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import Reveal from "@/components/Reveal";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 overflow-x-clip bg-gradient-to-b from-[#fdfdfb] to-[#fffbe8]">
        <Reveal>
          <Hero />
        </Reveal>
        <Reveal delay={0.15}>
          <Count />
        </Reveal>
        <Reveal id="services">
          <MadeForBoth />
        </Reveal>
        <Reveal>
          <HowItWorks />
        </Reveal>
        <Reveal id="destinations">
          <Destinations />
        </Reveal>
        <Reveal>
          <OurServices />
        </Reveal>
        <Reveal id="courses">
          <FindCourse />
        </Reveal>
        <Reveal>
          <CourseFinder />
          </Reveal>

        <Reveal id="testimonials">
          <Testimonials />
        </Reveal>

        <Reveal id="awards">
          <AwardsAndAffiliations />
        </Reveal>
        <Reveal id="about">
          <AboutPFEC />
        </Reveal>
        <Reveal id="faq">
          <FAQ />
        </Reveal>
        <Reveal>
          <ObligationForm />
        </Reveal>
      </main>
      <ConsultationPopup />
      <Reveal>
        <Footer />
      </Reveal>
      <BackToTop />
    </>
  );
}
