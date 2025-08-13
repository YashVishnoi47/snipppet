"use client";
import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { KeyboardIcon } from "lucide-react";
import { FaArrowRight } from "react-icons/fa";

const HeroArea = () => {
  const router = useRouter();
  return (
    <div className="w-full h-full flex justify-center items-center ">
      <div className="h-full min-w-[80%] flex flex-col justify-start items-center gap-[16px] p-8">
        <motion.span
          initial={{ opacity: 0, y: -10 }} // start slightly above and invisible
          animate={{ opacity: 1, y: 0 }} // fade in and slide down
          transition={{ duration: 0.6, ease: "easeOut", delay: 2.5 }} // smooth transition
          className="px-4 py-2 rounded-full text-xs font-medium text-[#fff] bg-white/10 backdrop-blur-md border border-white/10 shadow-lg flex items-center gap-2 mt-12"
        >
          <KeyboardIcon size={18} />
          Code. Collab. Repeat.
        </motion.span>

        {/* Heading One */}
        <div className="w-full md:w-[80%] text-center">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              delay: 0.8,
              ease: "easeOut",
            }}
            className="text-4xl md:text-6xl lg:text-7xl xl:text-7xl leading-[43px] md:leading-[72px] lg:leading-[86.4px] xl:leading-[86.4px] font-extrabold tracking-tighter mt-"
          >
            Seamless <span className="text-[#7C3AED]">Real-Time</span> Code
            Collaboration.
          </motion.h1>
        </div>

        {/* Heading Two (Subheading) */}
        <div className="w-full md:w-[75%] text-center">
          <motion.h4
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              delay: 2,
              ease: "easeOut",
            }}
            className="flex text-lg md:text-xl lg:text-2xl xl:text-xl leading-[27px] md:leading-[30px] lg:leading-[36px] xl:leading-[36px] tracking-tight font-normal text-gray-500"
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
          className="w-full md:w-[75%] flex justify-center gap-1 mt-[28px] flex-col items-center"
        >
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              router.push("/sign-in");
            }}
            className="px-16 py-4 bg-[#7C3AED] text-[#E0E0E0] border-[0.5px] border-[#3C3C4D] rounded-lg font-medium transition-all duration-200 ease-in-out hover:bg-[#7C3AED]/80 hover:border-[#fff]/50 hover:text-white cursor-pointer flex justify-center items-center gap-2"
          >
            {/* 🚀 Collaborate Now */}
            ⚡ Start Now
            <FaArrowRight />
          </motion.button>
          <p className="text-xs text-gray-400 mt-1 italic">
            No setup. No wait. Just code.
          </p>

          {/* <motion.button
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-transparent text-[#E0E0E0] border border-[#3C3C4D] rounded-lg font-medium transition-all duration-200 ease-in-out hover:bg-[#7C3AED]/20 hover:border-[#7C3AED] hover:text-white cursor-pointer"
          >
            Learn more
          </motion.button> */}
        </motion.div>
      </div>
    </div>
  );
};

export default HeroArea;
