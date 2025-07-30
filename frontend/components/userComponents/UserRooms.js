"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/utils";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Button } from "../ui/button";
import { editorConfigs } from "@/config/EditorConfig";
import Image from "next/image";
import { toast } from "sonner";
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
import { Loader2, LogIn } from "lucide-react";
import { motion } from "framer-motion";

const UserRooms = ({ room, index, FetchUserRooms, loading, setLoading }) => {
  const router = useRouter();
  const config = Object.values(editorConfigs).find(
    (c) => c.language === room.codingLang
  );

  const handleClick = () => {
    router.push(`${room._id}`);
  };

  const handleDelete = async () => {
    setLoading(true);
    const res = await fetch("/api/room/deleteRoom", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ roomId: room._id }),
    });

    if (res.ok) {
      setLoading(false);
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
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: 0.9,
        // ease: [0.22, 1, 0.36, 1], // easeOutCubic (more natural than "anticipate")
      }}
      className="max-w-sm w-full hover:scale-[1.02] active:scale-[0.98] rounded-3xl border border-[#1B1B2F] bg-[#111114] shadow-md hover:shadow-[#7C3AED]/50 transition-all duration-300 ease-in-out cursor-default overflow-hidden flex sm:flex-row flex-col"
    >
      {/* Image Section */}
      <div className="sm:w-[35%] w-full h-[150px] sm:h-auto flex items-center justify-center bg-[#18181B] sm:rounded-l-3xl rounded-t-3xl sm:rounded-t-none p-4">
        <Image
          src={config.icon}
          width={80}
          height={80}
          alt={config.name}
          className="object-contain"
        />
      </div>

      {/* Content Section */}
      <div className="sm:w-[65%] w-full flex-col justify-between p-4 text-[#E0E0E0]">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold truncate">
            {room?.roomName || "No Name"}
          </h2>
          <p className="text-[#7C3AED] text-sm capitalize mt-1 truncate">
            {room?.codingLang || "Language"}
          </p>
          <p className="text-sm text-[#6E6E7E] mt-0.5 truncate">
            {formatDate(room?.createdAt) || "Created At"}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2 mt-4">
          {/* Delete Button */}
          <AlertDialog>
            <AlertDialogTrigger className="flex items-center gap-2 bg-[#18181B] text-[#E0E0E0] border border-[#2A2A3B] hover:bg-[#1F1F29] hover:border-red-600 hover:text-white rounded-full px-4 py-2 transition-all duration-300 ease-in-out cursor-pointer">
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <RiDeleteBin6Line className="text-lg" />
              )}
            </AlertDialogTrigger>

            <AlertDialogContent className="bg-[#0F0F11] border border-[#2A2A3B] text-[#E0E0E0] shadow-2xl rounded-xl max-w-md">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-white font-semibold text-xl">
                  Delete this room?
                </AlertDialogTitle>
                <AlertDialogDescription className="text-sm text-[#A1A1AA] mt-2 leading-relaxed">
                  This action is{" "}
                  <span className="text-red-500 font-medium">permanent</span>.
                  {`All associated data will be lost forever, and you won't be
                  able to recover it. Please make sure this is what you really
                  want to do.`}
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter className="mt-6">
                <AlertDialogCancel className="bg-[#1F1F29] border border-[#2A2A3B] text-[#E0E0E0] hover:bg-[#2A2A3B] hover:text-white rounded-md transition-all duration-200 px-4 py-2">
                  No, keep it
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-red-600 text-white hover:bg-red-600/10 hover:border-red-600 border border-black rounded-md transition-all duration-300 px-4 py-2 cursor-pointer"
                >
                  Yes, delete it
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Button
            className="bg-[#18181B] text-[#E0E0E0] border border-[#2A2A3B] hover:bg-[#1F1F29] hover:border-[#7C3AED] hover:text-white rounded-full px-4 py-1 transition-all duration-300 ease-in-out cursor-pointer"
            onClick={handleClick}
          >
            Join Room
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default UserRooms;
