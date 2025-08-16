"use client";
import React from "react";
import SpotlightCard from "./SpotlightCard ";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import Image from "next/image";

const FeaturesList = [
  {
    title: "Real-Time collabration",
    description:
      "Work together instantly—see every code change appear the moment it’s made. No delays, no refreshes—just seamless, in - sync collaboration from anywhere.",
    icon: "landing page icons/Features/real time collab.svg",
  },
  {
    title: "Multi-Language Support",
    description:
      "Work in your own language—switch between coding and communication instantly. No barriers, no confusion—just seamless collaboration in every language you prefer anywhere.",
    icon: "landing page icons/Features/multi lang.svg",
  },
  {
    title: "Real-Time Voice & Video Chat",
    description:
      "Speak with your team instantly—voice or video, the choice is yours. No switching apps, no delays—just natural conversations that keep everyone connected anywhere.",
    icon: "landing page icons/Features/voice and video.svg",
  },
];

const Features = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center gap-16 items-center">
      <SectionHeading text={"What Makes Us Awesome"} />

      <div className="lg:w-[80%] min-h-[500px] flex lg:justify-between justify-center items-center lg:gap-8 gap-4 lg:flex-nowrap flex-wrap cursor-default">
        {FeaturesList.map((feature, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
            key={idx}
            className="h-[500px] lg:w-[35%] w-[80%]  relative"
          >
            <SpotlightCard
              className="h-full w-full flex flex-col justify-center items-centerp-0  shrink-0"
              spotlightColor="rgba(124,58,237,0.2)"
            >
              {/* Icon */}
              <div className="w-full h-[50%] flex justify-center items-start">
                <Image
                  src={feature.icon}
                  alt=""
                  width={220}
                  height={220}
                  className=""
                />
              </div>

              {/* Text */}
              <div className="w-full h-[50%] flex flex-col justify-start items-start gap-4 relative p-4">
                <h4 className="text-2xl font-bold tracking-">
                  {feature.title}
                </h4>
                <p className="lg:text-md text-neutral-500 tracking-tight">
                  {feature.description}
                </p>
                <p className="absolute bottom-0 right-0 text-xs font-semibold py-1.5 px-4 rounded-lg bg-black/40 backdrop-blur-sm  border-white/10 shadow-lg text-transparent bg-clip-text  bg-gradient-to-tr from-[#7C3AED] via-fuchsia-500 to-[#FF6FD8] border transition-all duration-300 ease-out">
                  Awesomeness #{idx + 1}
                </p>
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Features;
