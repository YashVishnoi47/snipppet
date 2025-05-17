import React from "react";
import { TbLogout2 } from "react-icons/tb";
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
import Link from "next/link";
import { FaUserPlus } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";
import { MdOutlinePersonRemove } from "react-icons/md";
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

const CodeNavbar = ({ Room, activeUsers }) => {
  return (
    <div className="w-[full] items-center justify-center bg-[#252526] flex h-[8%] border-2 border-black">
      <div className="h-full flex justify-between w-[90%] ">
        {/* Left*/}
        <div className="h-full flex gap-4 justify-start items-center w-[25%] border-2 border-white ">
          {/* Leave Room */}
          {/* Add room details and more */}
          <AlertDialog>
            <AlertDialogTrigger className="border-none outline-none">
              <TbLogout2
                className="text-3xl cursor-pointer text-white"
                title="Leave This room"
              />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to leave this room?
                </AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel
                  className={
                    "hover:bg-gray-100 border-2   transition-all  duration-300 ease-in-out"
                  }
                >
                  No!
                </AlertDialogCancel>
                <Link href={"/userProfile"}>
                  <AlertDialogAction
                    className={
                      "flex gap-2 justify-center items-center cursor-pointer"
                    }
                  >
                    <TbLogout2
                      className="text-3xl cursor-pointer"
                      title="Leave This room"
                    />
                    Leave
                  </AlertDialogAction>
                </Link>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <h1 className="font-semibold text-lg text-white">{Room.roomName}</h1>
        </div>

        <div className="h-full flex gap-4 justify-center items-center w-[25%] -2 border-white">
          <Popover>
            <PopoverTrigger
              className="flex items-center gap-2 cursor-pointer px-4 py-2 rounded-lg border border-white text-white font-mono text-base transition-all duration-200 hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Invite People"
            >
              <FaUserPlus size={18} />
              <span>Invite</span>
            </PopoverTrigger>

            <PopoverContent
              className={
                "p-0 min-h-64 w-80 border-2 border-[#252526] bg-zinc-900"
              }
            >
              <div className="w-full h-full text-white">
                {/* Invite People Section */}
                <section className="w-full flex flex-col gap-4 px-4 py-5 bg-zinc-900 rounded-xl">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    {/* <FaUserPlus /> */}
                    Invite People
                  </h2>

                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <input
                      type="text"
                      value="https://your-link.com"
                      readOnly
                      className="w-full sm:w-3/4 rounded-full border border-gray-600 bg-zinc-800 py-2 px-4 text-sm text-white focus:outline-none"
                      placeholder="Link"
                    />
                    <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 transition-colors text-white rounded-full px-4 py-2 text-sm font-medium">
                      Copy
                    </button>
                  </div>
                </section>

                <Separator className="my-4" />

                {/* Active Users Section */}
                <section className="w-full px-4 py-3 bg-zinc-900 rounded-xl">
                  <h3 className="text-lg font-semibold mb-3">
                    👤 Active Users
                  </h3>
                  <div className="flex flex-col gap-3">
                    {activeUsers.length > 0 ? (
                      activeUsers.map((user) => (
                        <div
                          key={user.socketId}
                          className="border border-gray-700 bg-zinc-800 px-4 py-3 rounded-xl flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-green-400">●</span>
                            <p className="text-sm font-medium">{user.name}</p>
                          </div>
                          <button
                            className="text-red-400 hover:text-red-500 transition"
                            title="Remove User"
                            onClick={() => handleRemoveUser(user.socketId)} // Optional: You can define this function
                          >
                            <MdOutlinePersonRemove size={20} />
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
              </div>
            </PopoverContent>
          </Popover>

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
        </div>
      </div>
    </div>
  );
};

export default CodeNavbar;
