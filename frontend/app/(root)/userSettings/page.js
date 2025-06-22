"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { ShieldAlert } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const UserSettingsComponent = dynamic(() =>
  import("@/components/userComponents/UserSettingsComponent")
);

const UserSettings = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState();
  const router = useRouter();
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
            console.log("Error fetching user data:", error);
            router.push("/");
            toast.error("Error Fetching User, Try again!");
          }
        }
      } catch (error) {
        console.log("Error fetching user data:", error);
        router.push("/");
        toast.error("Error Fetching User, Try again!");
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
      <div className="w-full min-h-screen flex items-center justify-center bg-black text-[#E0E0E0] px-4">
        <div className="max-w-md w-full flex flex-col items-center text-center gap-6 border border-[#2A2A2A] bg-[#111111] rounded-2xl p-8 shadow-xl">
          <ShieldAlert className="text-red-500 w-12 h-12" />
          <h1 className="text-2xl font-bold text-[#F5F5F5]">Access Denied</h1>
          <p className="text-sm text-gray-400">
            You are not allowed to access this page. Please log in to continue.
          </p>
          <Link href="/sign-in">
            <Button className="bg-[#7C3AED] cursor-pointer hover:bg-[#7C3AED]/30 hover:border-[#7C3AED] border border-black transition-all duration-300 ease-in-out w-full">
              Go to Sign In
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full bg-black">
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, type: "spring" }}
        className="w-full min-h-screen flex flex-col justify-start items-center bg-black py-10 px-4"
      >
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
      </motion.div>
    </div>
  );
};

export default UserSettings;
