"use client";
import Link from "next/link";
import React from "react";
import LogoutButton from "./LogoutButton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Button3 from "./utilityComponents/Button3";
import Link1 from "./utilityComponents/Link1";
import { IoMdArrowDown } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className="flex justify-center items-center bg-white w-full h-16">
      {/* Logo and Navigation Links */}
      <div className="w-[40%] -2 h-full gap-8 flex justify-start items-center">
        {/* Logo */}
        <h1
          onClick={() => router.push("/")}
          className="text-4xl cursor-pointer font-bold"
        >
          LOGO
        </h1>
        {/* <Link1 link={"/"} text={"About"}></Link1> */}
        {/* <Link1 link={"userProfile"} text={"Dasboard"}></Link1> */}
      </div>

      <div className="w-[40%] -2 px-2 h-full gap-8 flex justify-end items-center">
        {session ? (
          <div>
            {/* <LogoutButton text={"Login"} /> */}
            <Popover>
              <PopoverTrigger className="border-2 rounded-xl w-24 py-1 px-4 cursor-pointer hover:bg-gray-200 transition-all duration-300 ease-in-out">
                <div className="flex w-full h-full items-center justify-between">
                  <h1>
                    {" "}
                    {/* Welcome!{" "} */}
                    <span className="text-lg font-normal capitalize">
                      {session.user.userName}
                    </span>
                  </h1>

                  <IoMdArrowDown />
                </div>
              </PopoverTrigger>
              {/* Links */}
              <PopoverContent className={"p-0"}>
                {/* Profile */}
                <div className="flex flex-col gap-1">
                  <Link
                    href={"/userProfile"}
                    className="flex w-full  items-center px-4 py-4 justify-start gap-4 cursor-pointer hover:bg-gray-200 transition-all duration-300 ease-in-out"
                  >
                    <MdDashboard className="text-xl" />
                    <h1>Dashboard</h1>
                  </Link>
                </div>
                {/* Settings */}
                <div className="flex flex-col gap-1">
                  <Link
                    href={"/userProfile"}
                    className="flex w-full  items-center px-4 py-4 justify-start gap-4 cursor-pointer hover:bg-gray-200 transition-all duration-300 ease-in-out"
                  >
                    <IoSettingsOutline className="text-xl" />
                    <h1>Settings</h1>
                  </Link>
                </div>
                {/* Settings more */}
                <div className="flex flex-col gap-1">
                  <Link
                    href={"/userProfile"}
                    className="flex w-full  items-center px-4 py-4 justify-start gap-4 cursor-pointer hover:bg-gray-200 transition-all duration-300 ease-in-out"
                  >
                    <IoSettingsOutline className="text-xl" />
                    <h1>Settings</h1>
                  </Link>
                </div>

                <Separator className={"mt-3 mb-3"} />
                {/* Logout */}
                <div className="flex flex-col gap-1 mb-3">
                  <LogoutButton text={"Login"} />
                </div>
              </PopoverContent>
            </Popover>
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
  );
};

export default Navbar;
