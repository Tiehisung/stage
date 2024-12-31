"use client";

import BackBtn from "@/components/buttons/BackBtn";
import { ScrollToPointBtn } from "@/components/ScrollToPoint";
import { BiBadgeCheck } from "react-icons/bi";
import { FaDonate } from "react-icons/fa";
import { RiDeleteBin2Line, RiEditLine } from "react-icons/ri";

export default function SponsorActionsBar() {
  return (
    <div className="flex items-baseline h-7 bg-slate-50 max-md:gap-2 sticky top-1 z-[4]">
      <BackBtn className={"bg-transparent mr-auto"} />
      <ScrollToPointBtn
        sectionId={"sponsor-badges"}
        className="flex items-baseline gap-2 px-2 hover:bg-slate-100 transition-all duration-200 text-[#000000b6] hover:text-[black]"
        title="Badge"
      >
        <BiBadgeCheck /> <span className="max-md:hidden pb-1">Badge</span>
      </ScrollToPointBtn>
      <ScrollToPointBtn
        sectionId={"edit-sponsor"}
        className="flex items-baseline gap-2 px-2 hover:bg-slate-100 transition-all duration-200 text-[#000000b6] hover:text-[black]"
        title="Edit"
      >
        <RiEditLine /> <span className="max-md:hidden pb-1">Edit</span>
      </ScrollToPointBtn>
      <ScrollToPointBtn
        sectionId={"support-sponsor"}
        className="flex items-baseline gap-2 px-2 hover:bg-slate-100 transition-all duration-200 text-[#000000b6] hover:text-[black]"
        title="Support"
      >
        <FaDonate /> <span className="max-md:hidden pb-1">Support</span>
      </ScrollToPointBtn>
      <ScrollToPointBtn
        sectionId={"delete-sponsor"}
        className="flex items-baseline gap-2 px-2 hover:bg-slate-100 transition-all duration-200 text-[#000000b6] hover:text-[black]"
        title="Delete"
      >
        <RiDeleteBin2Line /> <span className="max-md:hidden pb-1">Delete</span>
      </ScrollToPointBtn>
    </div>
  );
}
