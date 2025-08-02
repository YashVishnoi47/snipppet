import React, { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { AlertCircle, ArrowUpNarrowWide, SettingsIcon } from "lucide-react";
import { ThemeConfig } from "@/config/ThemeConfig";
import Image from "next/image";
import { FaUserPlus } from "react-icons/fa";
import { MdOutlinePersonRemove } from "react-icons/md";
import { toast } from "sonner";

const Taskbar = ({
  room,
  session,
  hasUnsavedChanges,

  setTheme,
  theme,
  cursorPosition,
  updateTime,
  live,
  handleRoomStatus,
  setFontSize,
  fontSize,

  activeUsers,
  RemoveUserFromRoom,
}) => {
  const isLive = room.isPublic;
  // For collabration pop up

  const handleFontChange = (value) => {
    setFontSize(value[0]);
  };

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
    <motion.div
      initial={{ y: 50 }}
      animate={{ y: 0 }}
      transition={{
        type: "spring",
        stiffness: 80,
        damping: 15,
        duration: 1,
        bounce: 0.25,
        delay: 1,
      }}
      className={`flex items-center w-full min-h-full text-white overflow-hidden`}
    >
      {/* Theme changer and Font size changer */}
      <div className="h-full w-[40%] flex items-center">
        {/* Theme */}
        <div className="px-3 py-2.5 items-center gap-2 flex justify-end hover:bg-[#7C3AED]/20 text-[#E0E0E0] hover:text-white transition-all duration-200 ease-in-out cursor-default select-none">
          <Popover>
            {/* Button that opens the popover */}
            <PopoverTrigger asChild>
              <button className="text-sm capitalize">Theme - {theme}</button>
            </PopoverTrigger>

            {/* Popover content container */}
            <PopoverContent
              align="center"
              className="w-[90vw] max-w-sm bg-[#121212] text-white border border-gray-800 rounded-xl shadow-xl"
            >
              {/* Popover title */}
              <h3 className="text-sm font-medium">Theme - {theme}</h3>

              {/* Subtext description */}
              <p className="text-muted-foreground text-xs">
                Select your preferred theme from the list below.
              </p>

              {/* Dropdown section */}
              <div className="space-y-2 mt-4">
                <Label className="text-sm font-medium">Choose Theme</Label>
                <Select defaultValue={theme} onValueChange={setTheme}>
                  <SelectTrigger className="w-full bg-[#1E1E1E] text-white border border-gray-700">
                    <SelectValue placeholder="Select Theme" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1E1E1E] text-white border border-gray-700">
                    {Object.entries(ThemeConfig).map(([key, { name }]) => (
                      <SelectItem key={key} value={key}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Font size slider */}
        <div className="z-50 w-[300px] rounded-xl px-4 py-1 flex items-center justify-between gap-3">
          {/* Label */}
          <span className="text-sm text-white whitespace-nowrap">
            Font Size:
          </span>

          {/* Slider */}
          <Slider
            min={10}
            max={32}
            step={1}
            defaultValue={[fontSize]}
            value={[fontSize]}
            onValueChange={handleFontChange}
            className="w-full"
          />

          {/* Size Indicator */}
          <span className="text-sm text-white font-mono w-[40px] text-right">
            {fontSize}px
          </span>
        </div>
      </div>

      {/* Right Side of the TaskBar*/}
      <div className="h-full w-[60%] gap-1 items-center flex justify-end">
        {/* Room Status and status update button */}
        {session?.user._id === room.createdBy ? (
          <>
            <div
              onClick={handleRoomStatus}
              className="flex justify-between items-center px- py-2 hover:bg-[#7C3AED]/20 transition-all duration-200 ease-in-out cursor-default select-none text-sm font-medium text-[#E0E0E0] hover:text-white h-[95%] mr-1"
            >
              <div className="flex items-center gap-2">
                {/* Label text */}
                <p className="capitalize">Collaboration</p>

                {/* Status chip */}
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/10">
                  {/* Status dot */}
                  <div
                    className={`w-2 h-2 rounded-full ${
                      live === "public" ? "bg-green-500" : "bg-red-500"
                    }`}
                  />
                  {/* Status text */}
                  <p
                    className={`capitalize font-semibold ${
                      live === "public" ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {live === "public" ? "Live" : "Off"}
                  </p>
                </div>
              </div>
            </div>

            {live === "public" && (
              <Popover>
                <PopoverTrigger
                  className="w-10 border-white flex justify-center items-center hover:bg-[#7C3AED]/20 transition-all duration-200 cursor-pointer"
                >
                  <Image
                    className={`transition-all duration-200 ease-in-out`}
                    src="/up arrow.svg"
                    alt="Arrow"
                    width={35}
                    height={35}
                  />
                </PopoverTrigger>
                <PopoverContent className="mr-8 mb-4 h-100 bg-black shadow shadow-black border-white/20">
                  <div className="w-full h-full flex justify-start items-center py-2 flex-col">
                    {/* Invite People */}
                    <div className="w-full h-fit rounded-md shadow-lg">
                      <section className="flex flex-col gap-4">
                        <h2 className="text-base font-semibold text-white flex items-center gap-2">
                          <FaUserPlus size={16} />
                          Invite People
                        </h2>

                        {/* Parent wrapper with relative positioning for absolute button */}
                        <div className="relative w-full sm:max-w-md">
                          {/* Input box for Room ID */}
                          <input
                            type="text"
                            value={room._id}
                            readOnly
                            className="w-full rounded-full border border-zinc-700 bg-zinc-800 py-3 pr-24 pl-4 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
                            placeholder="Room Link"
                          />

                          {/* Copy Button fused inside the input on right side */}
                          <button
                            onClick={handleCopyText}
                            className="absolute right-2 top-1/2 -translate-y-1/2 py-2 px-4 text-sm font-medium text-white bg-[#7C3AED] hover:bg-[#6B21A8] rounded-full transition-all duration-200"
                          >
                            Copy
                          </button>
                        </div>

                        <p className="text-gray-300 text-sm ml-2 w-full">
                          Share this room code with others to invite them
                          instantly.
                        </p>
                      </section>
                    </div>

                    <div className="w-full h-0.5 bg-white/20 mt-3 mb-3" />

                    {/* Active Users */}
                    <div className="w-full z-50 overflow-y-auto scroll-smooth scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-transparent">
                      <section>
                        <h3 className="text-white text-base font-semibold mb-3">
                          👤 Active Users
                        </h3>
                        <div className="flex flex-col gap-3 max-h-64 overflow-y-auto pr-2 scroll-smooth scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-transparent">
                          {activeUsers.length > 0 ? (
                            activeUsers.map((user) => (
                              <div
                                key={user.socketId}
                                className="flex items-center justify-between px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 transition"
                              >
                                <div className="flex items-center gap-2 text-white">
                                  <span className="text-green-400 text-sm">
                                    ●
                                  </span>
                                  <p className="text-sm font-medium">
                                    {user.name}
                                  </p>
                                </div>

                                {/* Remove user button, only visible if current user is the creator */}
                                {session?.user._id === room.createdBy && (
                                  <button
                                    onClick={() => RemoveUserFromRoom(user)}
                                    title="Remove User"
                                    className="text-red-400 hover:text-red-500 transition-colors duration-150"
                                  >
                                    <MdOutlinePersonRemove size={18} />
                                  </button>
                                )}
                              </div>
                            ))
                          ) : (
                            // Show when there are no users
                            <p className="text-sm text-gray-400">
                              No active users right now.
                            </p>
                          )}
                        </div>
                      </section>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </>
        ) : (
          <div className="flex justify-bestween items-center px- py-2 hover:bg-[#7C3AED]/20 transition-all duration-200 ease-in-out cursor-default select-none text-sm font-medium text-[#E0E0E0] hover:text-white h-[95%] mr-1">
            <div className="flex items-center gap-2">
              {/* Label text */}
              <p className="capitalize">Collaboration</p>

              {/* Status chip */}
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/10">
                {/* Status dot */}
                <div
                  className={`w-2 h-2 rounded-full ${
                    live === "public" ? "bg-green-500" : "bg-red-500"
                  }`}
                />
                {/* Status text */}
                <p
                  className={`capitalize font-semibold ${
                    live === "public" ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {live === "public" ? "Live" : "Off"}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Coding Lang */}
        <div className="px-3 py-2.5 items-center gap-2 flex justify-end hover:bg-[#7C3AED]/20 text-[#E0E0E0] hover:text-white transition-all font-medium duration-200 ease-in-out cursor-default select-none border-l-1">
          <p className="text-sm capitalize flex gap-2 justify-center items-center ">
            {room.codingLang}
            <SettingsIcon className="w-4 h-4" />
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Taskbar;
