"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Button3 from "./utilityComponents/Button3";
import UserProfileButton from "./userComponents/UserProfileButton";
import Link from "next/link";
import LogoutButton from "./utilityComponents/LogoutButton";
import { motion } from "framer-motion";

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring" }}
      s
      className="flex justify-center items-start bg-[#000] text-[#EDEDED] w-full h-[100px]"
    >
      <div className="h-[70%] w-[80%] items-center mt-2 justify-between rounded-2xl flex px-4 bg-[#000] backdrop-blur-md z-50">
        {/* Logo and Navigation Links */}
        <div className="w-[40%]  h-full gap-8 flex justify-start items-center">
          {/* Logo */}
          <h1
            onClick={() => router.push("/")}
            className="text-3xl cursor-pointer font-bold"
          >
            Snipppet
          </h1>
        </div>

        <div className="w-[40%] h-full gap-8 flex justify-end items-center px-2">
          {session ? (
            <div className="w-full h-full flex  justify-end items-center">
              <Link href={"/userProfile"}>
                <button className="px-4 flex justify-center items-center gap-1 py-3 rounded-lg text-[#E0E0E0] hover:bg-[#7C3AED]/20 hover:text-white transition-all duration-200 ease-in-out cursor-pointer text-sm">
                  Dashboard
                </button>
              </Link>
              <Link href={"/userSettings"}>
                <button className="px-4  py-3 rounded-lg text-[#E0E0E0] hover:bg-[#7C3AED]/20 hover:text-white transition-all duration-200 ease-in-out cursor-pointer text-sm flex justify-center items-center gap-1">
                  Settings
                </button>
              </Link>

              {/* <UserProfileButton session={session} /> */}
              <LogoutButton
                className={
                  "flex items-center justify-center px-4 py-3 ml-5 rounded-lg text-sm font-medium text-[#E0E0E0] bg-[#7C3AED] hover:bg-[#7C3AED]/20 border border-[#3C3C4D] hover:border-[#7C3AED] transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
                }
              />
            </div>
          ) : (
            <div className="flex gap-4">
              <Button3
                onClick={() => {
                  router.push(".signup");
                }}
                text={"Sign Up"}
              />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;
