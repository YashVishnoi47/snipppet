import React from "react";
import CountUp from "./CountUp";

const CountUpStats = () => {
  return (
    <div className="w-full h-[350px] flex justify-center items-center">
      <div className="h-full w-[80%] flex justify-center gap-16 items-center rounded-2xl bg-[#7C3AED]/10 backdrop-blur-md">
        {[
          { name: "Latency", from: 0, to: 10, direction: "down" },
          {
            name: "Language Support",
            from: 0,
            suffix: "+",
            to: 20,
            direction: "up",
          },
          {
            name: "Code Editor Theme",
            from: 0,
            suffix: "+",
            to: 15,
            direction: "up",
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="h-[75%] w-[25%] border border-white/20 rounded-2xl bg- flex flex-col justify-center items-center p-6 gap-3 transition-all duration-300"
          >
            <div className="flex gap-1 items-end text-7xl font-bold">
              <CountUp
                from={item.from}
                to={item.to}
                separator=","
                direction={item.direction}
                duration={1}
                className="bg-gradient-to-r from-purple-400 to-purple-600 text-transparent bg-clip-text "
              />
              {item.suffix && (
                <p className="text-[#E0E0E0] text-4xl font-medium">
                  {item.suffix}
                </p>
              )}
              {item.name === "Latency" && (
                <p className="text-2xl font-medium text-[#E0E0E0]">ms</p>
              )}
            </div>

            <p className="text-2xl font-medium text-[#E0E0E0] tracking-wide text-center">
              {item.name}
            </p>
          </div>
        ))}
      </div>
      {/* <CountUp
        from={0}
        to={10}
        separator=","
        direction="down"
        duration={1}
        className="count-up-text"
      /> */}
    </div>
  );
};

// Zero latency
// x + themes
//

export default CountUpStats;
