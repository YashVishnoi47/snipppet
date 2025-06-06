"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Button3 from "./utilityComponents/Button3";
import UserProfileButton from "./userComponents/UserProfileButton";
import Button2 from "./utilityComponents/Button2";

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className="flex justify-center items-center bg-[#000] text-[#EDEDED] w-full h-16">
      {/* Logo and Navigation Links */}
      <div className="w-[40%]  h-full gap-8 flex justify-start items-center">
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
