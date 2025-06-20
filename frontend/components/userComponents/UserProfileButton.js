import React from "react";
import Link from "next/link";
import Image from "next/image";

const UserProfileButton = ({ session }) => {
  const user = session?.user;
  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <Link
      href="/userProfile"
      aria-label="Go to profile"
      className="ml-5 rounded-full p-[2px] ring-offset-background focus:outline-none focus:ring-2 focus:ring-[#00F0B5] transition"
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
    </Link>
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
