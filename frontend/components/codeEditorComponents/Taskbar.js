import { formatDateForCode, getRelativeTime } from "@/lib/utils";
import React from "react";
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
import { SettingsIcon } from "lucide-react";
import { ThemeConfig } from "@/config/ThemeConfig";

const Taskbar = ({
  room,
  session,
  hasUnsavedChanges,
  SaveCodeToDatabase,

  setTheme,
  theme,
  cursorPosition,
  updateTime,
  live,
  handleRoomStatus,
  setFontSize,
  fontSize,
}) => {
  const isLive = room.isPublic;

  const handleFontChange = (value) => {
    setFontSize(value[0]);
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
      className="flex items-center w-full min-h-full text-white"
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
        {/* Code save info and button */}
        <Tooltip delayDuration={200}>
          <TooltipTrigger>
            {" "}
            <p className="text-[#E0E0E0] text-sm capitalize px-3 py-1 transition-all duration-200 ease-in-out rounded-lg">
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
            className={`items-center justify-center rounded py-1 px-2 text-white border border-black transition-all duration-300 ease-in-out bg-[#7C3AED]/20  hover:bg-[#7C3AED] hover:text-black mr-1 ${
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

        {/* Room Status and status update button */}
        {session?.user._id === room.createdBy ? (
          <>
            <div
              onClick={handleRoomStatus}
              className="flex justify-between items-center px-3 py-2 hover:bg-[#7C3AED]/20 transition-all duration-200 ease-in-out cursor-default select-none text-sm font-medium text-[#E0E0E0] hover:text-white h-[95%] mr-1"
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
          </>
        ) : (
          <div className="px-3 py-1 items-center gap-2 flex justify-end hover:bg-[#7C3AED]/20 text-[#E0E0E0] hover:text-white transition-all font-medium duration-200 ease-in-out cursor-default select-none mr-4">
            <Tooltip delayDuration={100}>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-2 px-3 py-1 rounded-md border border-white/20 bg-white/5 hover:bg-white/10 transition-all cursor-default">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      live === "public" ? "bg-green-500" : "bg-red-500"
                    }`}
                  />
                  <p
                    className={`text-sm capitalize font-medium ${
                      live === "public" ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {live === "public" ? "Live" : "Offline"}
                  </p>
                </div>
              </TooltipTrigger>
              <TooltipContent className="text-xs">
                <p>
                  {live === "public"
                    ? "Your room is live and ready for collaboration"
                    : "Your room is offline. Click to go live"}
                </p>
              </TooltipContent>
            </Tooltip>
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
