import { Dot, Flower } from "lucide-react";
import React from "react";

const TabsText = ({ text }) => {
  return (
    <p className="text-white text-left text-md font-medium flex items-start gap-2 leading-relaxed flex-wrap">
      <Flower size={30} className="text-purple-400" />
      {text}
    </p>
  );
};

export default TabsText;
