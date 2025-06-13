"use client";
import Link from "next/link";
import Image from "next/image";
import UserProfileButton from "./userComponents/UserProfileButton";
import { FaUserPlus } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";
import { MdOutlinePersonRemove } from "react-icons/md";
import { FaPython } from "react-icons/fa";
import { Switch } from "@/components/ui/switch";
import { IoMdSettings } from "react-icons/io";
import { ImExit } from "react-icons/im";
import { FaRegSave } from "react-icons/fa";
import { editorConfigs } from "@/config/EditorConfig";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
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
import { toast } from "sonner";
import { AlertCircle } from "lucide-react";

const CodeNavbar = ({
  RemoveUserFromRoom,
  session,
  room,
  CompileCode,
  compileing,
  setFontSize,
  fontSize,
  setTheme,
  theme,
  activeUsers,
  live,
}) => {
  const increaseFont = () => setFontSize((prev) => Math.min(prev + 2, 32));
  const decreaseFont = () => setFontSize((prev) => Math.max(prev - 2, 10));
  // The Language config/
  const config = Object.values(editorConfigs).find(
    (c) => c.language === room.codingLang
  );

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

  // Themes
  const themes = {
    light: {
      name: "Light",
      value: "light",
    },
    dark: {
      name: "Dark",
      value: "oneDark",
    },
    dracula: {
      name: "Dracula",
      value: "dracula",
    },
    material: {
      name: "Material",
      value: "mracula",
    },
    sublime: {
      name: "Sublime",
      value: "sublime",
    },
  };

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{
        type: "spring",
        stiffness: 80,
        damping: 15,
        duration: 1.4,
        bounce: 0.25,
        delay: 0.5,
      }}
      className="w-[full] cursor-text items-center justify-center bg-[#000] flex h-[10%] border-2 border-black"
    >
      <div className="h-full flex justify-between w-[90%] ">
        {/* Left*/}
        <div className="h-full flex gap-6 justify-start items-center w-[25%] ">
          <Popover>
            <PopoverTrigger
              className="flex items-center gap-2 px-4 py-2 cursor-pointer rounded-sm bg-transparent text-white hover:bg-[#7C3AED] hover:border-[#7C3AED] hover:text-white transition duration-300 ease-in-out focus:outline-none"
              aria-label="Open room options"
            >
              {config && (
                <Image
                  src={config.icon}
                  height={20}
                  width={20}
                  alt={config.name}
                />
              )}
              {room.codingLang === "python" && <FaPython className="text-xl" />}
              <span className="capitalize text-sm font-medium truncate">
                {room.roomName}
              </span>
            </PopoverTrigger>

            <PopoverContent className="w-64 p-2 bg-zinc-900 border border-zinc-700 rounded-lg shadow-lg z-50">
              <div className="flex flex-col gap-1 text-white">
                {/* Dark Mode Toggle */}
                <div className="flex items-center justify-between px-3 py-3 rounded-md hover:bg-zinc-800 transition">
                  <span className="text-sm font-medium">Dark Mode</span>
                  <Switch />
                </div>

                {/* room Settings */}
                <button
                  className="flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-md hover:bg-zinc-800 transition w-full"
                  onClick={() => {
                    // handle room settings open
                  }}
                >
                  <IoMdSettings className="text-xl" />
                  <span>room Settings</span>
                </button>

                {/* Divider */}
                <Separator className="border-t border-zinc-700 my-1" />

                {/* Leave room */}
                <Link
                  href={"/userProfile"}
                  className="flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-md hover:bg-zinc-800 transition w-full"
                >
                  <ImExit className="text-xl text-red-400" />
                  <span>Leave room</span>
                </Link>
              </div>
            </PopoverContent>
          </Popover>

          <button
            onClick={CompileCode}
            disabled={compileing}
            aria-label={compileing ? "Compiling..." : "Compile Code"}
            className={`relative flex items-center justify-center h-10 w-10 rounded-full border text-sm font-medium transition-all duration-200 ${
              compileing
                ? "bg-[#7C3AED] text-white border-[#3C3C4D] cursor-not-allowed"
                : "bg-[#1E1E2E] hover:bg-[#7C3AED]/20 text-white border-[#3C3C4D] hover:border-[#7C3AED] cursor-pointer"
            } `}
          >
            <Image
              src={compileing ? "/gaerSpinner.svg" : "/play.svg"}
              height={20}
              width={20}
              alt={compileing ? "Compiling..." : "Compile Icon"}
              // className={compileing ? "" : ""}
            />
          </button>
        </div>

        {/* Middle  */}
        <div className="h-full flex gap-4 justify-center items-center w-[25%]">
          {/* Invite People */}
          {session?.user._id === room.createdBy && (
            <Popover>
              <PopoverTrigger
                className="flex items-center gap-2 px-4 py-2 rounded-md border-2 bg-[#7C3AED]/20 text-[#E0E0E0] font-mono text-sm transition-all duration-200 hover:bg-[#7C3AED] border-[#3C3C4D] hover:text-white hover:border-[#7C3AED] focus:outline-none cursor-pointer"
                aria-label="Invite People"
              >
                <FaUserPlus size={16} />
                <span>Invite</span>
              </PopoverTrigger>
              {live === "public" ? (
                <PopoverContent className="w-80 p-4 bg-zinc-900 border border-zinc-700 rounded-md shadow-lg">
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
              className="flex items-center gap-2 px-4 py-2 rounded-md border bg-[#7C3AED]/20 border-[#3C3C4D] text-[#E0E0E0] font-mono text-sm hover:bg-[#7C3AED] hover:text-white transition-all duration-200 focus:outline-none   cursor-pointer"
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
        </div>

        {/* Right */}
        <div className="h-full flex gap-8 justify-end items-center w-[25%]">
          <Popover>
            <PopoverTrigger className="flex items-center gap-2 px-8 py-2 rounded-md border border-[#3C3C4D] text-[#E0E0E0] font-mono text-sm transition bg-[#7C3AED]/20 hover:bg-[#7C3AED] hover:text-white cursor-pointer">
              Change
            </PopoverTrigger>

            <PopoverContent className="w-[90vw] max-w-sm p-4 space-y-6 bg-[#121212] text-white border border-gray-800 rounded-xl shadow-xl">
              {/* Font Size Control */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Font Size</Label>
                <div className="flex items-center justify-between gap-2">
                  <Button
                    variant="outline"
                    onClick={decreaseFont}
                    disabled={fontSize <= 10}
                    className="w-10 border-gray-600 text-black text-xl flex justify-center items-center"
                  >
                    -
                  </Button>
                  <span className="text-sm font-mono">{fontSize}px</span>
                  <Button
                    variant="outline"
                    onClick={increaseFont}
                    disabled={fontSize >= 32}
                    className="w-10 border-gray-600 text-black text-xl flex justify-center items-center"
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* Theme Selector */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Theme</Label>
                <Select
                  defaultValue={theme}
                  onValueChange={(value) => setTheme(value)}
                >
                  <SelectTrigger className="w-full bg-[#1E1E1E] text-white border border-gray-700">
                    <SelectValue placeholder="Select Theme" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1E1E1E] text-white border border-gray-700">
                    {Object.entries(themes).map(([key, { name }]) => (
                      <SelectItem key={key} value={key}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </PopoverContent>
          </Popover>
          <UserProfileButton session={session} />
        </div>
      </div>
    </motion.div>
  );
};

export default CodeNavbar;
