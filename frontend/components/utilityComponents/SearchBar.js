"use client";
import React, { useState } from "react";

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="w-full max-w-[300px]">
      <input
        placeholder="Search..."
        onChange={(e) => onChange(e.target.value)}
        type="text"
        name="text"
        className="
      w-full
      h-[45px]
      text-white
      bg-[#2F2F38]
      placeholder-[#A3A3A3]
      px-5
      rounded-2xl
      border
      border-[#444459]
      outline-none
      transition-all
      duration-300
      ease-[cubic-bezier(0.19,1,0.22,1)]
      shadow-[0px_4px_10px_rgba(0,0,0,0.7)]
      hover:border-[#7C3AED]
      hover:shadow-[0px_0px_20px_-10px_rgba(124,58,237,0.4)]
      active:scale-[0.95]
      focus:border-[#7C3AED]
    "
      />
    </div>
  );
};

export default SearchBar;
