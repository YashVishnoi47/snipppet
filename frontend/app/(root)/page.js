import FloatNav from "@/components/LandingPageComponents/FloatNav";
import HeroArea from "@/components/LandingPageComponents/HeroArea";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex w-full bg-black selection:bg-[#7C3AED] selection:text-black flex-col items-center  text-white justify-start ">
      <div className="relative z-10">
        <FloatNav />
        <section className="flex w-full border-2 relative flex-col items-center text-white justify-start h-screen bg-transparent ">
          <HeroArea />
        </section>
        <section className="flex w-full border-2 flex-col items-center bg-[#] text-white justify-start h-screen">

          
        </section>
      </div>
    </div>
  );
}
