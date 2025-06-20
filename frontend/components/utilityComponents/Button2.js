import React from "react";
import clsx from "clsx";

const Button2 = ({ text, width = "120px", createPrivateRoom, loading }) => {
  return (
    <button
      onClick={createPrivateRoom}
      disabled={loading}
      className={`h-10 rounded-md font-light border transition-all duration-200 transform
  bg-[#7C3AED]/20 text-[#e0e0e0] text-sm border-[#333348]
  hover:enabled:bg-[#7C3AED]/50 hover:enabled:border-[#7c3aed] hover:enabled:text-white
  disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer`}
      style={{ width }}
    >
      {loading ? "Loading..." : text}
    </button>
  );
};

export default Button2;
