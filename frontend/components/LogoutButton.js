"use client";

import { signOut, useSession } from "next-auth/react";
import { MdLogout } from "react-icons/md";

const LogoutButton = ({ className, text }) => {
  const { data: session } = useSession();

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  return (
    <button onClick={handleLogout} title="Logout" className={` ${className} `}>
      <MdLogout className="text-xl text-red-400" />
      {text && <span className="text-base">{text}</span>}
    </button>
  );
};

export default LogoutButton;
