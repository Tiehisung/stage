"use client";

import React, { FC, useEffect, useState } from "react";

interface RadioButtonsProps {
  values: string[];
  defaultValue: string;
  wrapperStyles?: string;
  className?: string;
  setSelectedValue: React.Dispatch<React.SetStateAction<string>>;
}

const RadioButtons: FC<RadioButtonsProps> = ({
  values,
  defaultValue,
  wrapperStyles,
  className,
  setSelectedValue,
}) => {
  const [selectedOption, setSelectedOption] = useState(defaultValue ?? "");
  useEffect(() => {
    if (typeof setSelectedValue !== "undefined") {
      setSelectedValue(selectedOption);
    }
  }, [selectedOption]);
  return (
    <ul className={`select-none ${wrapperStyles}`}>
      {values.map((val, i) => (
        <li
          key={i}
          className={`flex items-center gap-3 border cursor-pointer p-2 rounded-full hover:bg-slate-50 ${
            selectedOption == val && "border-blue-600/55"
          } ${className}`}
          onClick={() => setSelectedOption(val as string)}
        >
          <span
            className={`w-5 h-5 rounded-full border ${
              selectedOption == val && "bg-blue-600/75"
            }`}
          ></span>
          <span> {val}</span>
        </li>
      ))}
    </ul>
  );
};

export default RadioButtons;
