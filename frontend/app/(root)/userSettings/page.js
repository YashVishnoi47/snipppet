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
    { name: "Security", component: "" },
    { name: "Notifications", component: "" },
    { name: "Privacy", component: "" },
  ];

  if (!session) {
    return <div className="">Not allowed Login First</div>;
  }

  return (
    <div className="w-full min-h-[91vh] flex justify-center items-center bg-gray-100">
      <div className="w-[80%] h-[95%] flex justify-between rounded-xl bg-white">
        {/* side Bar */}
        <div className="min-h-[91vh] w-[20%] border-r-2 border-black flex flex-col">
          <div className="h-[70px] border-b-2 border-black flex items-center justify-center">
            <h1 className="text-2xl font-bold">User Settings</h1>
          </div>

          <div className="h-[90%] flex flex-col items-center justify-start">
            {SidebarBtns.map((btn, index) => (
              <div
                key={index}
                onClick={() => {
                  setActiveComponent(btn.component);
                }}
                className="w-full h-[60px] flex items-center justify-center cursor-pointer hover:bg-gray-200"
              >
                <h1 className="text-xl font-semibold">{btn.name}</h1>
              </div>
            ))}
          </div>
        </div>
        {activeComponent === "UserSettingsComponent" && (
          <UserSettingsComponent user={user} />
        )}
      </div>
    </div>
  );
};

export default UserSettings;
