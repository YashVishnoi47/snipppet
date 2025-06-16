"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import LogoutButton from "../LogoutButton";

const FloatNav = () => {
  const { data: session } = useSession();
  return (
    <div className="fixed top-0 left-0 w-full h-[100px] bg-transparent flex justify-center items-center z-50">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 80,
          damping: 15,
          duration: 1.4,
          bounce: 0.25,
          delay: 1.6,
        }}
        className="min-w-[70%] h-[70%] rounded-2xl flex px-4 bg-[#fff]/10 backdrop-blur-md"
      >
        {/* left */}
        <div className="w-1/2 h-full flex justify-start items-center">
          <h1 className="text-3xl cursor-pointer font-bold">Snippet</h1>
          {/* Other Links */}
          <div className="p-4 h-full w-full ml-1 flex justify-start items-center">
            <Link href={"/"}>
              <button className="px-4  py-3 rounded-lg text-[#E0E0E0] hover:bg-[#7C3AED]/20 hover:text-white transition-all duration-200 ease-in-out cursor-pointer text-sm">
                Features
              </button>
            </Link>
            <Link href={"/"}>
              <button className="px-4 rounded-lg py-3 text-[#E0E0E0] hover:bg-[#7C3AED]/20 hover:text-white transition-all duration-200 ease-in-out cursor-pointer text-sm">
                Pricing
              </button>
            </Link>
            <Link href={"/"}>
              <button className="px-4 rounded-lg py-3 text-[#E0E0E0] hover:bg-[#7C3AED]/20 hover:text-white transition-all duration-200 ease-in-out cursor-pointer text-sm">
                Contact
              </button>
            </Link>
          </div>
        </div>

        {/* Right */}
        <div className="w-1/2 h-full flex gap-4 justify-end items-center">
          {session ? (
            <div className="w-full h-full flex gap-3 justify-end items-center">
              <Link href={"/userProfile"}>
                <button className="cursor-pointer px-6 py-2 text-[#E0E0E0] border bg-[#7C3AED] border-[#3C3C4D] rounded-lg font-medium transition-all duration-200 ease-in-out hover:bg-[#7C3AED]/20 hover:border-[#7C3AED] hover:text-white">
                  Dashboard
                </button>
              </Link>

              <LogoutButton
                className={
                  "flex items-center justify-center px-4 py-3 rounded-lg text-sm font-medium text-[#E0E0E0] bg-[#7C3AED] hover:bg-[#7C3AED]/20 border border-[#3C3C4D] hover:border-[#7C3AED] transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
                }
              />
            </div>
          ) : (
            <div className="gap-4 flex">
              <Link href={"/sign-in"}>
                <button className="cursor-pointer px-6 py-2 bg-transparent text-[#E0E0E0] border border-[#3C3C4D] rounded-lg font-medium transition-all duration-200 ease-in-out hover:bg-[#7C3AED]/20 hover:border-[#7C3AED] hover:text-white">
                  Log in
                </button>
              </Link>

              <Link href={"/sign-up"}>
                <button className="cursor-pointer px-6 py-2 text-[#E0E0E0] border bg-[#7C3AED] border-[#3C3C4D] rounded-lg font-medium transition-all duration-200 ease-in-out hover:bg-[#7C3AED]/20 hover:border-[#7C3AED] hover:text-white">
                  Sign up
                </button>
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default FloatNav;
