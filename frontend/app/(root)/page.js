import FloatNav from "@/components/LandingPageComponents/FloatNav";
import HeroArea from "@/components/LandingPageComponents/HeroArea";
import Features from "@/components/LandingPageComponents/FeaturesSection";
import ExploreSection from "@/components/LandingPageComponents/ExploreSection";
import CenterText from "@/components/LandingPageComponents/Section 4 Components/CenterText";
import HowToUseSection from "@/components/LandingPageComponents/HowToUseSection";

export default function Home() {
  return (
    <div className="flex w-full bg-black selection:bg-[#7C3AED] selection:text-black flex-col items-center text-white justify-start relative">
      <div className="relative z-10">
        {/* Hero Section */}
        <section
          id="hero"
          className="flex w-full relative flex-col items-center text-white justify-start h-screen bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.3)_0%,rgba(0,0,0,1)_100%)]"
        >
          <FloatNav />
          <HeroArea />
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="flex w-full flex-col items-center text-white justify-end py-4 h-fit mt-32"
        >
          <Features />
        </section>

        {/* Explore Section */}
        <section
          id="Built for Everyone"
          className="flex w-full flex-col items-center text-white justify-center h-fit py-4 mt-64"
        >
          <ExploreSection />
        </section>

        {/* Center Text Section */}
        {/* <section
          id="Built for Everyone"
          className="flex w-full flex-col items-center text-white justify-center h-screen py-4 mt-64 bg-[#0b0715] bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,0.25)_0%,transparent_40%),radial-gradient(circle_at_bottom_right,rgba(124,58,237,0.25)_0%,transparent_40%)] border"
        >
          <CenterText />
        </section> */}

        {/* Section - 5 */}
        <section
          id="How to use"
          className="flex w-full flex-col items-center text-white justify-center h-fit py-4 mt-8"
        >
          <HowToUseSection />
        </section>
      </div>
    </div>
  );
}
