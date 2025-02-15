import React from "react";
import { IProgressBar } from "./types";

const ProgressBar: React.FC<IProgressBar> = ({ title, value }) => {
  const clampedvalue = Math.min(100, Math.max(0, value));

  return (
    <div className="w-full max-w-xl mx-auto p-2">
      <div className="relative pt-1">
        {/* Title and value */}
        <div className="flex mb-2 items-center justify-between">
          <span className="text-lg font-semibold text-gray-700">{title}</span>
          <span className="text-sm font-semibold text-gray-700">
            {clampedvalue}%
          </span>
        </div>

        {/* Progress bar */}
        <div className="flex h-2 mb-4 relative w-full bg-gray-200 rounded-full">
          <div
            className="absolute top-0 left-0 h-full bg-[#10B881] rounded-full"
            style={{ width: `${clampedvalue}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
