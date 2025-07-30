"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ImExit } from "react-icons/im";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FaUserPlus } from "react-icons/fa";
import { AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { MdOutlinePersonRemove } from "react-icons/md";

const CodeMenu = ({
  codeMenuOpen,
  session,
  room,
  live,
  activeUsers,
  RemoveUserFromRoom,
}) => {
  // Function to handle copying text
  const handleCopyText = () => {
    navigator.clipboard
      .writeText(room._id)
      .then(() => {
        toast.success("room Id copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <AnimatePresence>
      {codeMenuOpen && (
        <motion.div
          initial={{ top: -100 }}
          animate={{ top: 30 }}
          exit={{ top: -100 }}
          transition={{
            type: "spring",
            stiffness: 80,
            damping: 15,
            duration: 1.4,
            bounce: 0.25,
            delay: 0.1,
          }}
          className="min-w-[27%] flex justify-between items-center min-h-[8.5%] absolute z-20 top-8 right-26 rounded-xl border bg-black backdrop-blur-2xl border-white/20 select-none px-2 gap-1"
        >
          {/* Invite People */}
          {session?.user._id === room.createdBy && (
            <Popover>
              <PopoverTrigger
                className="min-w-24 h-11 px-4 rounded-sm flex gap-2 justify-center items-center cursor-pointer hover:bg-[#7C3AED]/20  transition-all duration-200 active:scale-95 text-white"
                aria-label="Invite People"
              >
                <Image src={"./invite.svg"} height={22} width={22} alt="Info" />
                <span>Invite Users</span>
              </PopoverTrigger>
              {live === "public" ? (
                <PopoverContent className="w-80 p-4 mt-5 bg-zinc-900 border border-zinc-700 rounded-md shadow-lg">
                  <section className="flex flex-col gap-4">
                    <h2 className="text-base font-semibold text-white flex items-center gap-2">
                      <FaUserPlus size={16} />
                      Invite People
                    </h2>

                    <div className="flex flex-col sm:flex-row items-start gap-3">
                      <div className="flex flex-col justify-center items-center">
                        <input
                          type="text"
                          value={room._id}
                          readOnly
                          className="w-full sm:flex-1 rounded-full border border-zinc-700 bg-zinc-800 py-2 px-4 text-sm text-white focus:outline-none"
                          placeholder="Link"
                        />
                      </div>
                      <button
                        onClick={handleCopyText}
                        className="w-full sm:w-auto px-4 py-2 text-sm border border-black font-medium text-white bg-[#7C3AED] rounded-lg hover:bg-[#7C3AED]/20 hover:border-[#7C3AED] cursor-pointer transition-all duration-200"
                      >
                        Copy
                      </button>
                    </div>
                    <p className="text-gray-300 text-sm ml-2 w-full">
                      Share this Code to invite others to the room.
                    </p>
                  </section>
                </PopoverContent>
              ) : (
                <PopoverContent className="w-80 p-5 bg-zinc-900 border border-zinc-700 rounded-2xl shadow-xl">
                  <section className="flex items-start gap-4 text-white">
                    <AlertCircle className="text-red-500 w-6 h-6 mt-1" />
                    <div className="flex flex-col">
                      <h3 className="text-lg font-semibold">Room Offline</h3>
                      <p className="text-sm text-zinc-400 mt-1">
                        Live session is currently disabled. Please enable Live
                        Mode to continue.
                      </p>
                    </div>
                  </section>
                </PopoverContent>
              )}
            </Popover>
          )}

          {/* Active User */}
          <Popover>
            <PopoverTrigger
              className="min-w-24 h-11 px-4 rounded-sm flex gap-2 justify-center items-center cursor-pointer hover:bg-[#7C3AED]/20  transition-all duration-200 active:scale-95 text-white"
              aria-label="Show active users"
            >
              <Image src={"./group.svg"} height={22} width={22} alt="Info" />
              Active Users
            </PopoverTrigger>

            <PopoverContent className="w-80 p-4 mt-5 bg-zinc-900 border border-zinc-700 rounded-md shadow-lg z-50">
              <section>
                <h3 className="text-white text-base font-semibold mb-3">
                  👤 Active Users
                </h3>
                <div className="flex flex-col gap-3 max-h-64 overflow-y-auto">
                  {activeUsers.length > 0 ? (
                    activeUsers.map((user) => (
                      <div
                        key={user.socketId}
                        className="flex items-center justify-between px-4 py-2 rounded-md bg-zinc-800 border border-zinc-700"
                      >
                        <div className="flex items-center gap-2 text-white">
                          <span className="text-green-400 text-sm">●</span>
                          <p className="text-sm font-medium">{user.name}</p>
                        </div>
                        <button
                          onClick={() => RemoveUserFromRoom(user)}
                          title="Remove User"
                          className="text-red-400 hover:text-red-500 transition-colors duration-150"
                        >
                          {session?.user._id === room.createdBy && (
                            <MdOutlinePersonRemove size={18} />
                          )}
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-400">
                      No active users right now.
                    </p>
                  )}
                </div>
              </section>
            </PopoverContent>
          </Popover>

          {/* Leave Room */}
          <Link
            href={"/userProfile"}
            className="w-24 h-11 rounded-sm flex gap-2 justify-center items-center cursor-pointer hover:bg-red-500/20  transition-all duration-200 active:scale-95 active:bg-red-500/5"
          >
            <Image src={"./exit.svg"} height={22} width={22} alt="Info" />
            <p className="text-white text-sm">Leave</p>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CodeMenu;
