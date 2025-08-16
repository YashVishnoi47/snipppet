"use client";
import React from "react";
import { LampContainer } from "../FooterLamp";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="min-h-[800px] w-full flex justify-center items-center relative bg-black overflow-hidden bg-[radial-gradient(circle,rgba(124,58,237,0.2)0%,rgba(0,0,0,0.7)100%)]">
        
      {/* Main content */}
      <div className="w-full h-[400px] flex flex-col justify-center items-center relative z-10">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 80, scale: 0.95 }} // start lower & slightly smaller
          whileInView={{ opacity: 1, y: 0, scale: 1 }} // fade in + move up + scale to normal
          transition={{
            duration: 0.6,
            delay: 0.2,
            ease: [0.25, 0.1, 0.25, 1], // smoother "easeOutCubic"
          }}
          className="text-4xl  md:text-6xl lg:text-7xl xl:text-7xl
             leading-[43px] md:leading-[72px] lg:leading-[86.4px] xl:leading-[86.4px]
             font-extrabold tracking-tighter w-[60%] text-center
             bg-gradient-to-r from-[#D4D4D8] to-[#7C3AED]
             bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(124,58,237,0.4)]"
        >
          Real-time collaboration for faster projects.
        </motion.h1>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: -40, y: 40 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-10 px-10 py-4 bg-[#7C3AED] text-white rounded-xl font-semibold text-lg shadow-lg shadow-[#7C3AED]/40 hover:bg-[#7C3AED]/90 transition-all flex items-center gap-2"
        >
          ⚡ Collaborate Now <FaArrowRight />
        </motion.button>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0, y: 20 }} // start hidden & slightly below
        animate={{ opacity: 1, y: 0 }} // fade in + slide up
        transition={{ duration: 0.8, delay: 1.5, ease: "easeOut" }}
        className="w-full absolute bottom-0 h-14 flex items-center justify-between px-6 
             bg-transparent border-t border-white/20 z-20"
      >
        {/* Left: Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 cursor-pointer"
        >
          <p className="text-3xl text-white font-bold">Snipppet</p>
        </motion.div>

        {/* Right: Rights */}
        <motion.p
          whileHover={{ scale: 1.02 }}
          className="text-sm text-white/70"
        >
          © 2025 YourBrand. All rights reserved.
        </motion.p>
      </motion.footer>
    </div>
  );
};

export default Footer;
