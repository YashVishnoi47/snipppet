"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";

const UserSettingsComponent = dynamic(() =>
  import("@/components/userComponents/UserSettingsComponent")
);
const UserSettings = () => {
  const [user, setUser] = useState();
  const { data: session } = useSession();
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
    // { name: "Security", component: "" },
    // { name: "Notifications", component: "" },
    // { name: "Privacy", component: "" },
  ];

  if (!session) {
    return <div className="">Not allowed Login First</div>;
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-start bg-[#0F0F1A] py-10 px-4">
      <div className="w-full max-w-6xl flex flex-col md:flex-row bg-[#1C1C27] rounded-2xl shadow-lg overflow-hidden">
        {/* Sidebar */}
        <aside className="w-full md:w-1/4 border-b md:border-b-0 md:border-r border-[#2A2A3B] p-6 bg-[#15151F]">
          <div className="flex items-center justify-center mb-6">
            <h1 className="text-xl font-bold text-white tracking-wide">
              User Settings
            </h1>
          </div>
          <nav className="space-y-3">
            {SidebarBtns.map((btn, index) => (
              <button
                key={index}
                onClick={() => setActiveComponent(btn.component)}
                className={`w-full text-left px-4 py-3 rounded-lg transition duration-200 text-[#EDEDED] font-medium hover:bg-[#2A2A3B] ${
                  activeComponent === btn.component ? "bg-[#2A2A3B]" : ""
                }`}
              >
                {btn.name}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="w-full md:w-3/4 p-6">
          {activeComponent === "UserSettingsComponent" && (
            <UserSettingsComponent user={user} />
          )}
        </main>
      </div>
    </div>
  );
};

export default UserSettings;
