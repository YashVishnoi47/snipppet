"use client";
import React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useSession } from "next-auth/react";
import LogoutButton from "../utilityComponents/LogoutButton";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";

const FloatNav = () => {
  const { data: session } = useSession();

  return (
    <div className="w-full h-[110px] max-w-screen bg-transparent flex justify-center items-center z-50">
      <motion.div
        initial={{ y: -100, opacity: 0, scale: 0.8 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 80,
          damping: 15,
          duration: 1.4,
          bounce: 0.25,
          delay: 1.6,
        }}
        className="w-[70%] max-w-[1400px] h-[90%] rounded-2xl bg-black/10 flex px-4 backdrop-blur-md"
      >
        {/* left */}
        <div className="w-[60%] h-full flex justify-start items-center">
          <h1 className="text-3xl text-white cursor-pointer font-bold">
            Snipppet
          </h1>
          {/* Other Links */}
          <div className="p-4  h-full w-full ml-1 lg:flex hidden justify-start items-center">
            {[
              {
                title: "Home",
                link: "#home",
              },
              {
                title: "Features",
                link: "#features",
              },
              {
                title: "Explore",
                link: "#Built for Everyone",
              },
              {
                title: "How it works",
                link: "#How to use",
              },
            ].map((item, idx) => (
              <a key={idx} href={item.link}>
                <button className="px-4 py-3 rounded-lg text-[#E0E0E0] hover:bg-[#7C3AED]/10 hover:text-white transition-all duration-200 ease-in-out cursor-pointer text-md">
                  {item.title}
                </button>
              </a>
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="w-[40%] h-full flex gap-4 justify-end items-center">
          {session ? (
            <div className="w-full lg:flex hidden h-full gap-3 justify-end items-center">
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
            <div className="gap-4 lg:flex hidden">
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

          {/* Mobile DropDown */}
          <div className="lg:hidden flex">
            <Popover>
              <PopoverTrigger>
                <Image src={"/menu.svg"} height={20} width={20} alt="Icon" />
              </PopoverTrigger>
              <PopoverContent
                className={
                  "h-56 w-44 flex flex-col justify-start items-center p-0 bg-transparent backdrop-blu2xl text-white rounded-xl mt-6 border-none"
                }
              >
                {/* Dashboard and log-in Sign-up */}
                {session ? (
                  <div className="w-full h-1/2 flex flex-col justify-start gap-2 items-center py-2">
                    {[
                      {
                        title: "Home",
                        link: "#home",
                      },
                      {
                        title: "Features",
                        link: "#features",
                      },
                      {
                        title: "Explore",
                        link: "#Built for Everyone",
                      },
                      {
                        title: "How it works",
                        link: "#How to use",
                      },
                      {
                        title: "Dashboard",
                        link: "/userProfile",
                      },
                    ].map((item, idx) => (
                      <motion.a
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: idx * 0.1 }}
                        key={idx}
                        href={item.link}
                        className="w-full flex-col flex justify-center items-center"
                      >
                        <button className="px-4 py-3 w-[90%] bg-black/50 backdrop-blur-2xl rounded-lg text-[#E0E0E0] hover:bg-[#7C3AED]/10 hover:text-white transition-all duration-200 ease-in-out cursor-pointer text-md">
                          {item.title}
                        </button>
                      </motion.a>
                    ))}
                  </div>
                ) : (
                  <div className="w-full h-1/2 flex flex-col justify-start gap-2 items-center py-2">
                    {[
                      {
                        title: "Home",
                        link: "#home",
                      },
                      {
                        title: "Features",
                        link: "#features",
                      },
                      {
                        title: "Explore",
                        link: "#Built for Everyone",
                      },
                      {
                        title: "How it works",
                        link: "#How to use",
                      },
                    ].map((item, idx) => (
                      <motion.a
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: idx * 0.1 }}
                        key={idx}
                        href={item.link}
                        className="w-full flex-col flex justify-center items-center"
                      >
                        <button className="px-4 py-3 w-[90%] bg-black/50 backdrop-blur-2xl rounded-lg text-[#E0E0E0] hover:bg-[#7C3AED]/10 hover:text-white transition-all duration-200 ease-in-out cursor-pointer text-md">
                          {item.title}
                        </button>
                      </motion.a>
                    ))}
                  </div>
                )}
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FloatNav;
