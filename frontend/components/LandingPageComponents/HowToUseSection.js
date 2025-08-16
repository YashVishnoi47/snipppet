"use client";
import React from "react";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import Image from "next/image";

const HowToUseSection = () => {
  return (
    <div className="w-full flex flex-col justify-start min-h-[500px] items-center gap-32 py-8">
      <div className="w-full flex flex-col justify-center items-center gap-4">
        <SectionHeading text={"How it works"} />
        {/* <p className="text-lg text-neutral-300">Create a room, invite your team, and start coding together in seconds.</p> */}
      </div>

      <div className="w-full h-fit flex flex-col justify-center items-center gap-16">
        {[
          {
            ttile: "Create a Room",
            description:
              "Begin by creating a new room to start your collaboration journey.",
            link: "/HowToUseImages/step1.svg",
          },
          {
            ttile: "Share the Link",
            description: "Copy your room link and share it with your team.",
            link: "/HowToUseImages/step2.svg",
          },
          {
            ttile: "Collaborate in Real Time",
            description: "Code together, see changes live, and chat instantly.",
            link: "/HowToUseImages/step3.svg",
          },
        ].map((item, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
            key={idx}
            className="w-full lg:min-h-[600px] flex flex-col justify-between items-center gap-8"
          >
            {/* Text */}
            <div className="w-full flex flex-col gap-3 justify-center items-center py-4 text-center">
              <h4 className="lg:text-5xl md:text-4xl sm:text-3xl text-2xl font-bold text-white tracking-tight">
                {item.ttile}
              </h4>
              <p className="lg:text-lg md:text-md sm:text-sm text-xs text-neutral-300 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="lg:w-[80%] w-[90%] border-red-500 md:h-[500px] sm:h-[300px] h-[200px] flex flex-col justify-center items-start rounded-4xl bg-gradient-to-r from-[rgba(124,58,237,0.5)] via-[rgba(255,107,107,0.5)] to-[rgba(255,217,61,0.5)]">
              {/* Image */}
              <div className="w-full h-full flex flex-col gap-4 justify-end items-center">
                <Image
                  className="rounded-tr-4xl rounded-tl-4xl"
                  src={item.link}
                  alt={item.ttile}
                  width={1000}
                  height={1000}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HowToUseSection;
