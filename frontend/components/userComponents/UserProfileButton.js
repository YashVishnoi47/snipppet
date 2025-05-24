import React from "react";
// import Link1 from "./utilityComponents/Link1";
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
          className="rounded-full p-1 focus transition duration-150"
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
            <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium text-white">
              {userInitial}
            </div>
          )}
        </PopoverTrigger>

        <PopoverContent className="w-60 p-2 bg-white border rounded-lg shadow-xl z-50">
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

          <Separator className="my-3" />

          <div className="px-1">
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
    className="flex items-center gap-3 px-4 py-2 rounded-md text-sm hover:bg-gray-100 transition-colors duration-200 ease-in-out"
  >
    {icon}
    <span>{label}</span>
  </Link>
);

export default UserProfileButton;
