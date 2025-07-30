"use client";
import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const HeroArea = () => {
  const router = useRouter();
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="h-full min-w-[80%] flex flex-col justify-center items-center gap-6 p-8">
        {/* Heading One */}
        <div className="w-full md:w-[80%] text-center mb-2 mt-8">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              delay: 0.8,
              ease: "easeOut",
            }}
            className="text-4xl md:text-6xl lg:text-7xl xl:text-7xl font-extrabold tracking-tight"
          >
            Seamless <span className="text-[#7C3AED]">Real-Time</span> Code
            Collaboration.
          </motion.h1>
        </div>

        {/* Heading Two (Subheading) */}
        <div className="w-full md:w-[75%] text-center mb-4">
          <motion.h4
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              delay: 2,
              ease: "easeOut",
            }}
            className="text-lg md:text-xl lg:text-2xl mt-2 xl:text-xl font-medium tracking-tight leading-relaxed text-gray-500"
          >
            A professional-grade environment merging live editing, instant
            messaging, and voice/video features—focus on coding together without
            distractions.
          </motion.h4>
        </div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.9,
            delay: 2.4,
            ease: "easeOut",
          }}
          className="w-full md:w-[75%] flex justify-center gap-6"
        >
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              router.push("/sign-in");
            }}
            className="px-8 py-4 bg-[#7C3AED] text-[#E0E0E0] border border-[#3C3C4D] rounded-lg font-medium transition-all duration-200 ease-in-out hover:bg-[#7C3AED]/20 hover:border-[#7C3AED] hover:text-white cursor-pointer"
          >
            Get Started
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-transparent text-[#E0E0E0] border border-[#3C3C4D] rounded-lg font-medium transition-all duration-200 ease-in-out hover:bg-[#7C3AED]/20 hover:border-[#7C3AED] hover:text-white cursor-pointer"
          >
            Learn more
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroArea;
