"use client";
import React from "react";
import { motion } from "framer-motion";
import { Earth, EarthIcon } from "lucide-react";

const CenterText = () => {
  return (
    <div className="lg:w-[80%] w-full h-full text-center flex justify-center items-center flex-col gap-4 ">
      <motion.p
        className="lg:text-6xl md:text-5xl sm:text-4xl text-3xl font-bold leading-tight"
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 1.2,
          ease: [0.25, 0.8, 0.25, 1],
        }}
        viewport={{ once: true, amount: 0.6 }}
      >
        Code together in
        <span className="bg-gradient-to-r from-[#7C3AED] via-purple-500 to-pink-500 bg-clip-text text-transparent">
          {" "}
          Real Time
        </span>
        , from anywhere in the world, with every change appearing
        <span className="bg-gradient-to-r from-[#7C3AED] via-purple-500 to-pink-500 bg-clip-text text-transparent">
          {" "}
          Instantly
        </span>
        .
      </motion.p>
    </div>
  );
};

export default CenterText;
