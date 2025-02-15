import React from "react";
import { IToggleButton } from "./types";

const ToggleButton: React.FC<IToggleButton> = ({
  id,
  checked,
  onCheckedChange,
}) => {
  return (
    <label htmlFor={id} className="flex items-center cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          id={id}
          className="sr-only"
          checked={checked}
          onChange={() => onCheckedChange(!checked)}
        />
        <div
          className={`block w-14 h-8 rounded-full transition-colors duration-300 ease-in-out ${
            checked ? "bg-[#10B881]" : "bg-gray-400"
          }`}
        ></div>
        <div
          className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 ease-in-out ${
            checked ? "transform translate-x-6" : ""
          }`}
        ></div>
      </div>
    </label>
  );
};

export default ToggleButton;
