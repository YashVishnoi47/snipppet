import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const ConformationBox = ({ handleResponse, joinRequest, setJoinRequest }) => {
  return (
    <div>
      {joinRequest && (
        <Dialog
          open={true}
          onOpenChange={(open) => !open && setJoinRequest(null)}
        >
          <DialogContent className="bg-[#18181B] text-white border border-[#2A2A3B] animate-fadeIn scale-95 sm:scale-100 sm:animate-zoomIn sm:max-w-md w-full rounded-xl shadow-xl transition-all duration-300">
            <DialogHeader className="flex flex-row items-start gap-4">
              <div className="text-[#7C3AED] text-2xl">
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
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </div>
              <div>
                <DialogTitle className="text-white text-lg font-semibold">
                  Join Request
                </DialogTitle>
                <p className="text-sm text-zinc-400 mt-1">
                  <span className="text-[#7C3AED] font-medium capitalize">
                    {joinRequest.user.name}
                  </span>{" "}
                  is requesting to join your room. Would you like to allow
                  access?
                </p>
              </div>
            </DialogHeader>

            <DialogFooter className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => handleResponse(false)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 transition-colors duration-300 rounded-lg text-white text-sm shadow-sm"
              >
                Reject
              </button>
              <button
                onClick={() => handleResponse(true)}
                className="px-4 py-2 bg-[#7C3AED] hover:bg-[#6B21A8] transition-colors duration-300 rounded-lg text-white text-sm shadow-sm"
              >
                Accept
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ConformationBox;
