"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/utils";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Button } from "./ui/button";
import { editorConfigs } from "@/config/EditorConfig";
import Image from "next/image";
import { toast } from "sonner";

const UserRooms = ({ room, index, FetchUserRooms }) => {
  const router = useRouter();
  const config = Object.values(editorConfigs).find(
    (c) => c.language === room.codingLang
  );

  const handleClick = () => {
    router.push(`${room._id}`);
  };

  const handleDelete = async () => {
    const res = await fetch("/api/room/deleteRoom", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ roomId: room._id }),
    });

    if (res.ok) {
      FetchUserRooms();
      toast.success("Room Deleted", {
        description: "Your room was successfully removed.",
      });
    } else {
      toast.error("Error Deleting Room", {
        description: "Your room was successfully removed.",
      });
      // console.error("Error deleting room");
    }
  };

  return (
    <div className="max-w-sm w-full hover:scale-[1.02] active:scale-[0.98] rounded-3xl border border-[#2A2A3B] bg-[#1C1C27] shadow-md hover:shadow-[#D152EA]/40 transition-all duration-300 ease-in-out cursor-default overflow-hidden flex sm:flex-row flex-col">
      {/* Image Section */}
      <div className="sm:w-[35%] w-full h-[150px] sm:h-auto flex items-center justify-center bg-[#2A2A3B] sm:rounded-l-3xl rounded-t-3xl sm:rounded-t-none p-4">
        <Image
          src={config.icon}
          width={80}
          height={80}
          alt={config.name}
          className="object-contain"
        />
      </div>

      {/* Content Section */}
      <div className="sm:w-[65%] w-full flex flex-col justify-between p-4 text-[#EDEDED]">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold truncate">
            {room?.roomName || "No Name"}
          </h2>
          <p className="text-[#00F0B5] text-sm capitalize mt-1 truncate">
            {room?.codingLang || "Language"}
          </p>
          <p className="text-sm text-gray-400 mt-0.5 truncate">
            {formatDate(room?.createdAt) || "Created At"}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2 mt-4">
          <Button
            className="bg-white text-black hover:bg-black hover:text-white rounded-full px-4 py-1 transition-all duration-300 ease-in-out cursor-pointer"
            onClick={handleDelete}
          >
            <RiDeleteBin6Line />
          </Button>
          <Button
            className="bg-white text-black hover:bg-black hover:text-white rounded-full px-4 py-1 transition-all duration-300 ease-in-out cursor-pointer"
            onClick={handleClick}
          >
            Join Room
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserRooms;

{
  /* <RiDeleteBin6Line
          onClick={handleDelete}
          className="text-4xl hover:scale-110 transition-all border-white duration-300 ease-in-out absolute p-2 border-2 right-4 top-4 text-[#fff] bg-[#8B5CF6] hover:text[#8B5CF6AA] rounded-full"
        /> */
}
