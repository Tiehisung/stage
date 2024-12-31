import { BsTriangle } from "react-icons/bs";

export default function ToolTipA({ tip = "Tip", className = "" }) {
  <div
    className={`${className}bg-gray-900 text-white w-full p-1 rounded absolute top-full hidden hover:hidden peer-hover:block `}
  >
    <BsTriangle className="ml-[50%] text-white" />
    {tip}
  </div>;
  return;
}
//
