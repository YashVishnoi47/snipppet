import { formatDateForCode, getRelativeTime } from "@/lib/utils";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import { FaRegSave } from "react-icons/fa";

const Taskbar = ({
  room,
  session,
  hasUnsavedChanges,
  SaveCodeToDatabase,
  termialfunc,

  theme,
  cursorPosition,
  terminal,
  updateTime,
  live,
  handleRoomStatus,
}) => {
  const isLive = room.isPublic;
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
      className="flex items-center px-2 w-full h-full text-white"
    >
      {/* Code Save info */}
      <div className="h-full w-[40%] flex gap-2 items-center">
        <Tooltip delayDuration={1000}>
          <TooltipTrigger>
            {" "}
            <p className="text-[#E0E0E0] text-sm capitalize px-3 py-1 hover:bg-[#7C3AED]/20 hover:text-white transition-all duration-200 ease-in-out rounded-lg">
              Last Saved - {getRelativeTime(updateTime)}
            </p>
          </TooltipTrigger>
          <TooltipContent>
            <p>{formatDateForCode(updateTime)}</p>
          </TooltipContent>
        </Tooltip>

        {session?.user._id === room.createdBy && (
          <button
            disabled={!hasUnsavedChanges()}
            onClick={SaveCodeToDatabase}
            type="button"
            aria-label="Save"
            className={`items-center justify-center rounded-lg py-1 px-2 text-white border border-black transition-all duration-300 ease-in-out bg-[#7C3AED]/20  hover:bg-[#7C3AED] hover:text-black ${
              !hasUnsavedChanges() ? "cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            {!hasUnsavedChanges() ? (
              <p className="text-[#E0E0E0] text-xs">Already Saved</p>
            ) : (
              <p className="text-[#E0E0E0] text-xs">Save Code</p>
            )}
          </button>
        )}
      </div>

      {/* Right Side of the TaskBar*/}
      <div className="h-full w-[60%] gap-1 items-center flex justify-end">
        {/* Terminal*/}
        <button
          onClick={termialfunc}
          className={`px-3 py-1 items-center gap-2 flex justify-end hover:text-white transition-all text-sm duration-200 ease-in-out rounded-md cursor-default select-none ${
            terminal
              ? " hover:bg-[#7C3AED]/20 text-green-600"
              : "hover:bg-[#7C3AED]/20 text-red-600"
          }`}
        >
          Terminal
        </button>

        {/* Line and column */}
        <div className="px-3 py-1 items-center gap-2 flex justify-end hover:bg-[#7C3AED]/20 hover:text-white transition-all duration-200 ease-in-out rounded-md cursor-default select-none">
          <div className="text-[#E0E0E0] flex gap-1 text-sm capitalize">
            <p className="text-sm text-[#E0E0E0]">Ln</p>
            <p className="text-sm text-[#E0E0E0]">{cursorPosition.line},</p>
          </div>
          <div className="text-[#E0E0E0] flex gap-1 text-sm capitalize">
            <p className="text-sm text-[#E0E0E0]">Col</p>
            <p className="text-sm text-[#E0E0E0]">{cursorPosition.column}</p>
          </div>
        </div>

        {/* Theme */}
        <div className="px-3 py-1 items-center gap-2 flex justify-end hover:bg-[#7C3AED]/20 text-[#E0E0E0] hover:text-white transition-all duration-200 ease-in-out rounded-md cursor-default select-none">
          <Tooltip delayDuration={100}>
            <TooltipTrigger>
              {" "}
              <p className="text-sm capitalize">Theme - {theme}</p>
            </TooltipTrigger>
            <TooltipContent>
              <p>Go to Room settings to change the Theme</p>
            </TooltipContent>
          </Tooltip>
        </div>
        
        {/* Room Status */}
        {session?.user._id === room.createdBy ? (
          <div className="px-3 py-1 items-center gap-2 flex justify-end hover:bg-[#7C3AED]/20 text-[#E0E0E0] hover:text-white transition-all font-medium duration-200 ease-in-out rounded-md cursor-default select-none">
            {live === "public" ? (
              <Tooltip delayDuration={500}>
                <TooltipTrigger onClick={handleRoomStatus}>
                  {" "}
                  <p className="text-sm capitalize text-green-500">Live</p>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Your room is live</p>
                </TooltipContent>
              </Tooltip>
            ) : (
              <Tooltip delayDuration={500}>
                <TooltipTrigger onClick={handleRoomStatus}>
                  {" "}
                  <p className="text-sm capitalize text-red-500 ">Offline</p>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Your room is offline</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        ) : (
          <div className="px-3 py-1 items-center gap-2 flex justify-end hover:bg-[#7C3AED]/20 text-[#E0E0E0] hover:text-white transition-all font-medium duration-200 ease-in-out rounded-md cursor-default select-none">
            {live === "public" ? (
              <Tooltip delayDuration={500}>
                <TooltipTrigger>
                  {" "}
                  <p className="text-sm capitalize text-green-500">Live</p>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Your room is live</p>
                </TooltipContent>
              </Tooltip>
            ) : (
              <Tooltip delayDuration={500}>
                <TooltipTrigger>
                  {" "}
                  <p className="text-sm capitalize text-red-500 ">Offline</p>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Your room is offline</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        )}

        {/* Coding Lang */}
        <div className="px-3 py-1 items-center gap-2 flex justify-end hover:bg-[#7C3AED]/20 text-[#E0E0E0] hover:text-white transition-all font-medium duration-200 ease-in-out rounded-md cursor-default select-none">
          <p className="text-sm capitalize ">{room.codingLang}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Taskbar;
