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
import UserProfileButton from "./userComponents/UserProfileButton";

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className="flex justify-center items-center bg-[#0A0A0F] text-[#EDEDED] w-full h-16">
      {/* Logo and Navigation Links */}
      <div className="w-[40%] -2 h-full gap-8 flex justify-start items-center">
        {/* Logo */}
        <h1
          onClick={() => router.push("/")}
          className="text-4xl cursor-pointer font-bold"
        >
          LOGO
        </h1>
      </div>

      <div className="w-[40%] -2 px-2 h-full gap-8 flex justify-end items-center">
        {session ? (
          <div>
            <UserProfileButton session={session} />
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
