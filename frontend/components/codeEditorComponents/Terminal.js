"use client";
import React, { useEffect, useState } from "react";
import {
  animate,
  motion,
  useDragControls,
  useMotionValue,
} from "framer-motion";
import { X } from "lucide-react";

const Terminal = ({
  compiledCode,
  room,
  termialfunc,
  dragBoundsRef,
  mode,
  setMode,
}) => {
  const isFloating = mode === "float";
  const dragControls = useDragControls();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Reset Terminal position when float mode exits
  useEffect(() => {
    if (!isFloating) {
      animate(x, 0, { duration: 0.3 });
      animate(y, 0, { duration: 0.3 });
    }
  }, [isFloating]);
  const dragProps = isFloating
    ? {
        drag: true,
        dragControls: dragControls,
        dragConstraints: dragBoundsRef,
        dragListener: false,
        dragElastic: 0.1,
        dragMomentum: false,
        style: { x, y },
      }
    : {};

  return (
    <motion.div
      {...dragProps}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className={`${
        mode === "split" ? "relative h-full" : "absolute h-[90%]"
      } right-0 top-0 w-full md:w-[60%] p-4 bg-[#18181B] text-white border-l border-zinc-700 shadow-lg flex flex-col rounded-tl-xl font-mono`}
    >
      {/* Terminal Header */}
      <div
        onPointerDown={(e) => dragControls.start(e)}
        className="h-8 px-3 flex items-center justify-between bg-[#1F1F23] rounded-tl-xl border-b border-zinc-700"
      >
        <span className="text-sm text-zinc-400">{room.roomName}/output</span>

        <div className="flex items-center gap-2">
          {/* Split / Float Toggle Buttons */}
          <button
            onClick={() => setMode("split")}
            className={`px-2 py-[2px] text-xs rounded-md transition-all duration-200 ${
              mode === "split"
                ? "bg-purple-600 text-white"
                : "bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
            }`}
          >
            Split
          </button>
          <button
            onClick={() => setMode("float")}
            className={`px-2 py-[2px] text-xs rounded-md transition-all duration-200 ${
              mode === "float"
                ? "bg-purple-600 text-white"
                : "bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
            }`}
          >
            Float
          </button>

          {/* Close Button */}
          <button
            onClick={termialfunc}
            className="ml-2 p-[2px] rounded-md hover:bg-zinc-700 transition-colors"
            aria-label="Close Terminal"
          >
            <X
              size={16}
              className="text-zinc-400 hover:text-red-500 transition"
            />
          </button>
        </div>
      </div>

      {/* Terminal Output Area */}
      <div className="flex-1 overflow-auto mt-2 p-3 text-sm bg-[#1A1A1E] rounded-b-xl border border-zinc-700">
        {compiledCode ? (
          <pre className="whitespace-pre-wrap break-words">{compiledCode}</pre>
        ) : (
          <span className="text-zinc-500">Compiled Code Output...</span>
        )}
      </div>
    </motion.div>
  );
};

export default Terminal;
