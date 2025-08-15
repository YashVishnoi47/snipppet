"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import TabsText from "./TabsText";

const Educators = () => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        transition={{ duration: 0.5 }}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        className="w-full h-full flex lg:flex-row flex-col justify-center items-center px-4 gap-4"
      >
        <div className="h-[90%] lg:py-6 min-w-[60%] border border-white/10 rounded-2xl bg-[#7C3AED]/10  flex justify-center  items-center">
          <Image
            src="/Explore Images/teachersvg.svg"
            alt="student"
            width={450}
            height={500}
            className="object-contain rounded-2xl"
          />
        </div>

        {/* Text */}
        <div className="h-[90%] lg:w-[40%] w-full flex flex-col justify-center items-start px-6 py-8 gap-12 border border-white/10 rounded-2xl bg-[#7C3AED]/10 backdrop-blur-sm">
          <TabsText
            text={
              "Host interactive coding sessions with your students, guiding them in real time while monitoring their progress and understanding."
            }
          />

          <TabsText
            text={
              "Distribute coding exercises instantly to the whole class through a single link, ensuring everyone starts on the same page without delays."
            }
          />

          <TabsText
            text={
              "Provide feedback as students write their code, helping them correct mistakes and strengthen concepts during the learning process."
            }
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Educators;
