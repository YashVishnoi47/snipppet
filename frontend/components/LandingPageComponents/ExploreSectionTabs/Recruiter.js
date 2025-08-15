"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import TabsText from "./TabsText";

const Recruiter = () => {
  return (
    <AnimatePresence>
      <motion.div
        transition={{ duration: 0.5 }}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        className="w-full h-full border-yellow-400 flex lg:flex-row flex-col justify-center items-center px-4 gap-4"
      >
        <div className="h-[90%] lg:py-6 min-w-[60%] border border-white/10 rounded-2xl bg-[#7C3AED]/10 flex justify-center  items-center">
          <Image
            src="/Explore Images/interviewsvg.svg"
            alt="student"
            width={450}
            height={500}
            className="object-contain rounded-2xl"
          />
        </div>
        <div className="h-[90%] lg:w-[40%] w-full flex flex-col justify-center items-start px-6 py-8 gap-12 border border-white/10 rounded-2xl bg-[#7C3AED]/10 backdrop-blur-sm">
          <TabsText
            text={
              "Conduct live coding interviews with candidates, observing their problem-solving skills in real time without delays or technical barriers."
            }
          />

          <TabsText
            text={
              "Share coding challenges instantly via a secure link, removing the need for lengthy setup processes or complicated instructions."
            }
          />

          <TabsText
            text={
              "Review candidate submissions as they code, giving immediate feedback and making faster, more informed hiring decisions."
            }
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Recruiter;
