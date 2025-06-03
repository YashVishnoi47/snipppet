import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MdDashboard } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import LogoutButton from "../LogoutButton";

const UserProfileButton = ({ session }) => {
  const user = session?.user;
  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <div className="relative">
      <Popover>
        <PopoverTrigger
          className="rounded-full p-[2px] ring-offset-background focus:outline-none focus:ring-2 focus:ring-[#00F0B5] transition"
          aria-label="Open user menu"
        >
          {user?.image ? (
            <Image
              src={user.image}
              alt="User avatar"
              width={36}
              height={36}
              className="rounded-full object-cover"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-[#2A2A3B] flex items-center justify-center text-sm font-medium text-white">
              {userInitial}
            </div>
          )}
        </PopoverTrigger>

        <PopoverContent className="w-60 p-4 bg-[#1C1C27] border border-[#2A2A3B] rounded-2xl shadow-xl z-50 text-[#EDEDED]">
          <div className="flex flex-col gap-2">
            {/* Navigation */}
            <nav className="flex flex-col gap-1">
              <MenuLink
                href="/userProfile"
                icon={<MdDashboard size={18} />}
                label="Dashboard"
              />
              <MenuLink
                href="/userSettings"
                icon={<IoSettingsOutline size={18} />}
                label="Settings"
              />
            </nav>

            <Separator className="my-3 bg-[#3A3A4D]" />

            {/* Logout */}
            <LogoutButton text="Logout" />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

const MenuLink = ({ href, icon, label }) => (
  <Link
    href={href}
    className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm hover:bg-[#2A2A3B] transition-colors duration-200 ease-in-out"
  >
    {icon}
    <span>{label}</span>
  </Link>
);

export default UserProfileButton;
