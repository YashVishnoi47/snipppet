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

const CodeNavbar = ({ Room }) => {
  return (
    <div className="w-[full] items-center justify-center bg-[#252526] flex h-[8%] border-2 border-black">
      <div className="h-full w-[90%] ">
        {/* Left*/}
        <div className="h-full flex gap-4 justify-start items-center w-[25%] ">
          {/* Leave Room */}
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
                <AlertDialogCancel>No!</AlertDialogCancel>
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

        <div className="h-full flex gap-4 justify-start items-center w-[25%] "></div>
      </div>
    </div>
  );
};

export default CodeNavbar;
