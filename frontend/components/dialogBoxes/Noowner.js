import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

const Noowner = ({ joindenied, setJoindenied, handleJoinReq }) => {
  const { router } = useRouter();
  return (
    <div>
      {joindenied === true && (
        <Dialog
          open={true}
          onOpenChange={(open) => !open && setJoindenied(false)}
        >
          <DialogContent className="bg-[#18181B] text-white border border-[#2A2A3B] animate-fadeIn scale-95 sm:scale-100 sm:animate-zoomIn sm:max-w-md w-full rounded-xl shadow-xl transition-all duration-300">
            <DialogHeader className="flex flex-row items-start gap-4">
              <div className="text-red-500 text-2xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <DialogTitle className="text-white text-lg font-semibold">
                  Access Denied
                </DialogTitle>
                <p className="text-sm text-zinc-400 mt-1">
                  The room owner is not present. Please wait for the owner to
                  join or try again later.
                </p>
              </div>
            </DialogHeader>

            <DialogFooter className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => {
                  router.push("/");
                }}
                className="px-4 py-2 bg-[#7C3AED] hover:bg-[#6B21A8] transition-colors duration-300 rounded-lg text-white text-sm shadow-md"
              >
                Okay
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Noowner;
