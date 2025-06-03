"use client";

import { signOut, useSession } from "next-auth/react";
import { MdLogout } from "react-icons/md";

const LogoutButton = () => {
  const { data: session } = useSession();

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  return (
    <button
      onClick={handleLogout}
      title="Logout"
      className="flex w-full items-center justify-start gap-3 px-4 py-2 rounded-lg text-sm font-medium text-[#EDEDED] hover:bg-[#2A2A3B] transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500"
    >
      <MdLogout className="text-xl text-red-400" />
      <span className="text-base">Logout</span>
    </button>
  );
};

export default LogoutButton;
