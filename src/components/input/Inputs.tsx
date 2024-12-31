"use client";

import {
  ChangeEvent,
  HTMLInputTypeAttribute,
  useEffect,
  useState,
} from "react";
import { BiPhone } from "react-icons/bi";
import { CiText } from "react-icons/ci";
import { IoIosLink } from "react-icons/io";
import { MdAlternateEmail, MdDateRange, MdNumbers } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";

const inputIcons = [
  { type: "text", icon: <CiText /> },
  { type: "email", icon: <MdAlternateEmail /> },
  { type: "password", icon: <TbLockPassword /> },
  { type: "number", icon: <MdNumbers /> },
  { type: "tel", icon: <BiPhone /> },
  { type: "date", icon: <MdDateRange /> },
  { type: "url", icon: <IoIosLink /> },
];

export function TextArea({
  className = "",
  name,
  label = "",
  labelStyles = "",
  placeholder = "",
  onChange,
  value,
  dataTip = "",
  required = false,
  others,
}: ITextAreaProps) {
  const [isFocus, setIsFocus] = useState(false);
  useEffect(() => {
    setIsFocus(value ? true : false);
  }, [value]);
  return (
    <div className="tooltip w-full group" data-tip={dataTip}>
      <label
        htmlFor={name}
        className={`absolute left-4 transition-all duration-200 ease-linear delay-0 select-none bg-base-100 ${
          isFocus ? "-top-4 px-1 text-sm" : " top-3 text-gray-600 font-semibold"
        } ${labelStyles}`}
      >
        {label}
      </label>
      <textarea
        name={name}
        id={name}
        value={value}
        placeholder={
          placeholder?.length > 30
            ? placeholder.substring(0, 27) + "..."
            : placeholder
        }
        onChange={(e) => {
          onChange(e);
        }}
        className={`outline-none focus:ring-4 ring-blue-500/20 focus:border-blue-400 rounded p-2 text-primaryGrey dark:text-white w-full h-12 min-h-[48px] max-h-[40vh] border border-primaryGreen bg-base-100 ${className}`}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(value ? true : false)}
        {...others}
        required={required}
      />
    </div>
  );
}

interface IInput {
  className?: string;
  name: string;
  label?: string;
  labelStyles?: string;
  labelStylesFocus?: string;
  placeholder?: string;
  value?: string | number;
  setEvent?: boolean;
  dataTip?: string;
  others?: object;
  required?: boolean;
  wrapperStyles?: string;
}
interface ITextAreaProps extends IInput {
  type?: HTMLInputTypeAttribute;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

interface IInputProps extends IInput {
  type?: HTMLInputTypeAttribute;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Input({
  className = " bg-liteBlue/10",
  name,
  label = "",
  labelStyles = "",
  labelStylesFocus = "",
  placeholder = "",
  onChange,
  value,
  dataTip = "",
  type = "text",
  wrapperStyles = "",
  others,
  required = false,
}: IInputProps) {
  const [isFocus, setIsFocus] = useState(false);
  useEffect(() => {
    setIsFocus(value ? true : false);
  }, [value]);
  return (
    <div className={`grid relative ${wrapperStyles} `} data-tip={dataTip}>
      <label
        htmlFor={name}
        className={`absolute transition-all duration-200 ease-linear delay-0 select-none ${
          isFocus
            ? "-top-5 text-sm font-semibold " + labelStylesFocus
            : "ml-1 pl-4 top-1/4 text-gray-600"
        } ${labelStyles}`}
      >
        {label}
      </label>
      <input
        name={name}
        id={name}
        value={value}
        type={type}
        onChange={(e) => {
          onChange(e);
        }}
        placeholder={
          placeholder?.length > 30
            ? placeholder.substring(0, 27) + "..."
            : placeholder
        }
        className={`outline-none border border-gray-300 focus:border-Blue shadow-Blue/50 h-9 rounded px-2 text-primary w-full placeholder:line-clamp-1 slowTrans ${className}`}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(value ? true : false)}
        {...others}
        required={required}
      />
    </div>
  );
}

interface IDateInputProps extends IInput {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: "time" | "datetime-local" | "date";
}
export function DateTimeInput({
  className = "",
  name = "date-input",
  placeholder = "",
  onChange,
  value,
  dataTip = "",
  wrapperStyles = "",
  others,
  required = false,
  type,
}: IDateInputProps) {
  const handleIconClick = () => {
    const dateInput = document.getElementById(name) as HTMLInputElement;
    dateInput.showPicker();
  };

  return (
    <label
      className={`w-fit input input-bordered border-mediumGrey focus-within:outline-liteBlue flex items-center gap-2 bg-gray-50 ${wrapperStyles}`}
      title={dataTip}
      htmlFor={name}
    >
      <span
        onClick={handleIconClick}
        className={`text-xl text-Placeholder slowTrans`}
      >
        {inputIcons.find((item) => item.type === "date")?.icon}
      </span>
      <input
        name={name}
        id={name}
        value={value}
        type={type ?? "date"}
        onChange={(e) => {
          onChange(e);
        }}
        className={` bg-transparent ${className}`}
        placeholder={placeholder}
        {...others}
        required={required}
      />
    </label>
  );
}
export function IconInput({
  className = "",
  name,
  placeholder = "",
  onChange,
  value,
  dataTip = "",
  type = "",
  wrapperStyles = "",
  others,
  required = false,
}: IInputProps) {
  return (
    <label
      className={`input input-bordered border-mediumGrey focus-within:outline-liteBlue flex items-center gap-2 bg-gray-50 ${wrapperStyles}`}
      title={dataTip}
      htmlFor={name}
    >
      <span
        className={`text-xl text-Placeholder slowTrans`}
        hidden={!inputIcons.find((item) => item.type === type)}
      >
        {inputIcons.find((item) => item.type === type)?.icon}
      </span>
      <input
        name={name}
        id={name}
        value={value}
        type={type}
        onChange={(e) => {
          onChange(e);
        }}
        className={`grow bg-transparent ${className}`}
        placeholder={placeholder}
        {...others}
        required={required}
      />
    </label>
  );
}
export function InputZ({
  className = "",
  name,
  label = "",
  labelStyles = "",
  placeholder = "",
  onChange,
  value,
  dataTip = "",
  type = "text",
  wrapperStyles = "",
  others,
  required = false,
}: IInputProps) {
  const [isFocus, setIsFocus] = useState(false);
  useEffect(() => {
    setIsFocus(value ? true : false);
  }, [value]);
  return (
    <div className={`grid  ${wrapperStyles} `} title={dataTip}>
      <label
        htmlFor={name}
        className={`absolute transition-all duration-200 ease-linear delay-0 select-none bg-base-100 ${
          isFocus
            ? "-top-4 text-sm"
            : "ml-1 pl-4 top-3 text-gray-600 font-semibold"
        } ${labelStyles}`}
      >
        {label}
      </label>
      <input
        name={name}
        id={name}
        value={value}
        type={type}
        placeholder={
          placeholder?.length > 30
            ? placeholder.substring(0, 27) + "..."
            : placeholder
        }
        onChange={(e) => {
          onChange(e);
        }}
        className={`outline-none focus:ring-4 ring-blue-500/20 focus:border-blue-400 rounded p-2 text-primaryGrey dark:text-white w-full h-12 border border-primaryGreen bg-base-100 placeholder:line-clamp-1 ${className}`}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(value ? true : false)}
        {...others}
        required={required}
      />
    </div>
  );
}
