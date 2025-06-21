"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";

const UserSettingsComponent = dynamic(() =>
  import("@/components/userComponents/UserSettingsComponent")
);

const UserSettings = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState();
  const [activeComponent, setActiveComponent] = useState(
    "UserSettingsComponent"
  );

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user/getuser", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.ok) {
          const data = await res.json();
          if (data.user) {
            setUser(data.user);
          } else {
            console.error("User not found");
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUser();
  }, []);

  const SidebarBtns = [
    { name: "Account", component: "UserSettingsComponent" },
    // Future: Add more tabs here
  ];

  if (!session) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center bg-[black] text-[#E0E0E0]">
        Not allowed. Please login first.
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full">
      <Navbar />
      <div className="w-full min-h-screen flex flex-col justify-start items-center bg-black py-10 px-4">
        <div className="w-full max-w-6xl flex flex-col md:flex-row bg-[#0A0A0A] rounded-2xl shadow-lg overflow-hidden border border-[#1A1A1A]">
          {/* Sidebar */}
          <aside className="w-full md:w-1/4 border-b md:border-b-0 md:border-r border-[#1F1F1F] p-6 bg-[#18181B]">
            <div className="flex items-center justify-center mb-6">
              <h1 className="text-xl font-semibold text-white tracking-wide">
                User Settings
              </h1>
            </div>
            <nav className="space-y-3">
              {SidebarBtns.map((btn, index) => (
                <button
                  key={index}
                  onClick={() => setActiveComponent(btn.component)}
                  className={`
                  w-full
                  text-left
                  px-4
                  py-3
                  rounded-lg
                  transition
                  duration-200
                  font-medium
                  text-white
                  ${
                    activeComponent === btn.component
                      ? "bg-[#7C3AED] text-white"
                      : "bg-[#1C1C1C] hover:bg-[#2C2C2C]"
                  }
                `}
                >
                  {btn.name}
                </button>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="w-full md:w-3/4 p-6 bg-[#7C3AED]/5 backdrop-blur-lg text-white">
            {activeComponent === "UserSettingsComponent" && (
              <UserSettingsComponent user={user} />
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;
