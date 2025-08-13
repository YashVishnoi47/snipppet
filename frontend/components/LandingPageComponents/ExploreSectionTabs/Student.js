"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import TabsText from "./TabsText";

const Student = () => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        transition={{ duration: 0.5 }}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        className="w-full h-full border-yellow-400 flex lg:flex-row flex-col  justify-center items-center px-4 gap-4"
      >
        <div className="h-[90%] lg:py-6 min-w-[60%] border border-white/10 rounded-2xl bg-[#7C3AED]/10  flex justify-center  items-center">
          <Image
            src="/Explore Images/students.png"
            alt="student"
            width={450}
            height={500}
            className="object-contain rounded-2xl"
          />
        </div>
        <div className="h-[90%] lg:w-[40%] w-full flex flex-col justify-center items-start px-6 py-8 gap-12 border border-white/10 rounded-2xl bg-[#7C3AED]/10 backdrop-blur-sm">
          <TabsText
            text={
              "Collaborate seamlessly on assignments with your peers, making real-time edits and contributions without ever worrying about version conflicts."
            }
          />

          <TabsText
            text={
              "Share your code instantly with classmates through a simple link, eliminating the need for complex file transfers or confusing email threads."
            }
          />

          <TabsText
            text={
              "Receive feedback from teachers and teammates as you work, allowing you to refine your projects without waiting for long review cycles."
            }
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Student;
