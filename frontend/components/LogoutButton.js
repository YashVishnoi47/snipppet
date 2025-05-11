"use client";
import { signOut, useSession } from "next-auth/react";
import Button2 from "./utilityComponents/Button2";
import { MdLogout } from "react-icons/md";

const LogoutButton = () => {
  const { data: session } = useSession();

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  return (
    <button
      title="Logout"
      className="flex w-full items-center px-4 py-3 justify-start gap-4 cursor-pointer hover:bg-red-200 transition-all duration-300 ease-in-out"
      onClick={handleLogout}
    >
      <MdLogout className="text-2xl" />
      <h1 className="text-lg font-normal capitalize">Logout</h1>
    </button>
  );
};

export default LogoutButton;
