import React from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const DialogBox = ({ openDialog, setOpenDialog }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="flex flex-col items-center gap-4 rounded-2xl bg-[#18181B] px-6 py-8 shadow-xl border border-[#2A2A3B] max-w-sm w-[90%]"
      >
        <Loader2 className="animate-spin text-[#7C3AED] w-8 h-8" />
        <p className="text-sm text-[#E0E0E0] text-center">
          Loading Socket, please wait...
        </p>
      </motion.div>
    </div>
  );
};

export default DialogBox;
