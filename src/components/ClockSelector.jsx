import React, { useState } from "react";
import Clock from "react-clock";
import "react-clock/dist/Clock.css";

const ClockSelector = ({ onTimeSelect }) => {
  const [value, setValue] = useState(new Date());

  const handleChange = (newValue) => {
    const rounded = new Date(newValue);
    rounded.setMinutes(0);
    rounded.setSeconds(0);
    setValue(rounded);
    onTimeSelect(rounded);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <Clock
        value={value}
        onChange={handleChange}
        renderNumbers
        hourHandLength={70}
        minuteHandLength={0} // hide minute hand
        className="scale-[1.5]"
      />
      <div className="text-lg font-semibold text-gray-700">
        Start Time: {value.toLocaleTimeString([], { hour: "2-digit", hour12: true })}
        <br />
        End Time:{" "}
        {new Date(value.getTime() + 60 * 60 * 1000).toLocaleTimeString([], {
          hour: "2-digit",
          hour12: true,
        })}
      </div>
    </div>
  );
};

export default ClockSelector;
