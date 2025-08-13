"use client";
import React from "react";
import { motion } from "framer-motion";

const SectionHeading = ({ text }) => {
  return (
    <motion.h4
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
      viewport={{ once: true }}
      className="text-4xl md:text-6xl lg:text-7xl xl:text-7xl text-center font-bold bg-gradient-to-r from-[#7C3AED] via-purple-500 to-pink-500 bg-clip-text text-transparent w-[70%]"
    >
      {/* What Makes Us Awesome */}
      {text}
    </motion.h4>
  );
};

export default SectionHeading;
