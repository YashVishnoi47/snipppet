"use client";
import React, { useState } from "react";
import SectionHeading from "./SectionHeading";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";

const Student = dynamic(() => import("./ExploreSectionTabs/Student"));
const Recruiter = dynamic(() => import("./ExploreSectionTabs/Recruiter"));
const Educator = dynamic(() => import("./ExploreSectionTabs/Educators"));

const ExploreSection = () => {
  const [active, setActive] = useState(0);

  return (
    <div className="w-full max-w-[1400px] flex flex-col gap-16 justify-center items-center">
      <SectionHeading text={"Built for Everyone Who Loves to Code Together"} />

      <div className="lg:w-[80%] w-full min-h-[700px] flex flex-col justify-center gap-4 items-center">
        {/* Top bar */}
        <div className="w-full min-h-[100px] flex justify-between items-center relative">
          {[
            {
              name: "Students",
              text: "Learn, build, and collaborate — all in one place.",
            },
            {
              name: "Recruiters",
              text: "Interview candidates without switching tools.",
            },
            {
              name: "Educators ",
              text: "Interview candidates without switching tools.",
            },
          ].map((item, idx) => (
            <motion.div
              onClick={() => setActive(idx)}
              key={idx}
              className={`w-[33%] h-[100px] flex flex-col justify-center items-center gap-2 rounded-2xl hover:bg-[#7C3AED]/10 backdrop-blur-md transition-all duration-500 cursor-pointer relative ${
                active === idx ? "bg-[#7C3AED]/10 backdrop-blur-md" : ""
              }`}
            >
              <h4 className="lg:text-4xl md:text-3xl sm:text-2xl text-xl font-bold">
                {item.name}
              </h4>
              <p className="lg:text-xs md:block hidden md:text-[10px] text-[8px] font-light text-center">
                {item.text}
              </p>

              {active === idx && (
                <motion.div
                  layoutId="underline"
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#7C3AED] via-purple-500 to-pink-500"
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                  }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Tabs*/}
        <div className="w-full min-h-[600px]">
          <AnimatePresence>{active === 0 && <Student />}</AnimatePresence>
          <AnimatePresence>{active === 1 && <Recruiter />}</AnimatePresence>
          {active === 2 && <Educator />}
        </div>
      </div>
    </div>
  );
};

export default ExploreSection;
