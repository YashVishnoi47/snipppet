import React from "react";
import Link from "next/link";
import { FaUserPlus } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";
import { MdOutlinePersonRemove } from "react-icons/md";
import { FaPython } from "react-icons/fa";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import UserProfileButton from "./userComponents/UserProfileButton";
import { Switch } from "@/components/ui/switch";
import { IoMdSettings } from "react-icons/io";
import { ImExit } from "react-icons/im";

const CodeNavbar = ({ Room, activeUsers, session }) => {
  return (
    <div className="w-[full] cursor-text items-center justify-center bg-[#252526] flex h-[8%] border-2 border-black">
      <div className="h-full flex justify-between w-[90%] ">
        {/* Left*/}
        <div className="h-full flex gap-4 justify-start items-center w-[25%]">
          <Popover>
            <PopoverTrigger
              className="flex items-center gap-2 px-4 py-2 cursor-pointer rounded-sm bg-transparent text-white hover:bg-white hover:text-black transition duration-300 ease-in-out focus:outline-none"
              aria-label="Open room options"
            >
              {Room.codingLang === "python" && <FaPython className="text-xl" />}
              <span className="capitalize text-sm font-medium truncate">
                {Room.roomName}
              </span>
            </PopoverTrigger>

            <PopoverContent className="w-64 p-2 bg-zinc-900 border border-zinc-700 rounded-lg shadow-lg z-50">
              <div className="flex flex-col gap-1 text-white">
                {/* Dark Mode Toggle */}
                <div className="flex items-center justify-between px-3 py-3 rounded-md hover:bg-zinc-800 transition">
                  <span className="text-sm font-medium">Dark Mode</span>
                  <Switch />
                </div>

                {/* Room Settings */}
                <button
                  className="flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-md hover:bg-zinc-800 transition w-full"
                  onClick={() => {
                    // handle room settings open
                  }}
                >
                  <IoMdSettings className="text-xl" />
                  <span>Room Settings</span>
                </button>

                {/* Divider */}
                <Separator className="border-t border-zinc-700 my-1" />

                {/* Leave Room */}
                <Link
                  href={"/userProfile"}
                  className="flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-md hover:bg-zinc-800 transition w-full"
                >
                  <ImExit className="text-xl" />
                  <span>Leave Room</span>
                </Link>
              </div>
            </PopoverContent>
          </Popover>

          {/* Here will be the database Status and code save status */}
        </div>

        {/* Middle  */}
        <div className="h-full flex gap-4 justify-center items-center w-[25%]">
          {/* Invite People */}
          <Popover>
            <PopoverTrigger
              className="flex items-center gap-2 px-4 py-2 rounded-md border border-white text-white font-mono text-sm transition-all duration-200 hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Invite People"
            >
              <FaUserPlus size={16} />
              <span>Invite</span>
            </PopoverTrigger>

            <PopoverContent className="w-80 p-4 bg-zinc-900 border border-zinc-700 rounded-md shadow-lg">
              <section className="flex flex-col gap-4">
                <h2 className="text-base font-semibold text-white flex items-center gap-2">
                  <FaUserPlus size={16} />
                  Invite People
                </h2>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <input
                    type="text"
                    value="https://your-link.com"
                    readOnly
                    className="w-full sm:flex-1 rounded-full border border-zinc-700 bg-zinc-800 py-2 px-4 text-sm text-white focus:outline-none"
                    placeholder="Link"
                  />
                  <button className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors">
                    Copy
                  </button>
                </div>
              </section>
            </PopoverContent>
          </Popover>

          {/* Active User */}
          <Popover>
            <PopoverTrigger
              className="flex items-center gap-2 px-4 py-2 rounded-md border border-white text-white font-mono text-sm hover:bg-white hover:text-black transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Show active users"
            >
              Active Users – {activeUsers.length}
            </PopoverTrigger>

            <PopoverContent className="w-80 p-4 bg-zinc-900 border border-zinc-700 rounded-md shadow-lg z-50">
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
                          onClick={() => handleRemoveUser?.(user.socketId)}
                          title="Remove User"
                          className="text-red-400 hover:text-red-500 transition-colors duration-150"
                        >
                          <MdOutlinePersonRemove size={18} />
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
        </div>

        {/* Right */}
        <div className="h-full flex gap-8 justify-end items-center w-[25%]">
          <Select defaultValue="private">
            <SelectTrigger
              className="w-[180px] px-4 py-2 rounded-lg border border-white text-white font-mono text-base transition-all duration-200 hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Select Room Type"
            >
              <SelectValue className={"text-white"} placeholder="Room Type" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 text-white border border-white rounded-lg">
              <SelectItem
                value="public"
                className="hover:bg-zinc-800 cursor-pointer px-4 py-2 rounded-md transition"
              >
                Public Room
              </SelectItem>
              <SelectItem
                value="private"
                className="hover:bg-zinc-800 cursor-pointer px-4 py-2 rounded-md transition"
              >
                Private Room
              </SelectItem>
            </SelectContent>
          </Select>
          <UserProfileButton session={session} />
        </div>
      </div>
    </div>
  );
};

export default CodeNavbar;
