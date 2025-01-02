"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { TbChevronCompactRight } from "react-icons/tb";
import { BiSolidMessageDetail } from "react-icons/bi";
import { GiAmericanFootballPlayer } from "react-icons/gi";
import { BiSolidDonateBlood } from "react-icons/bi";
import {
  CgDatabase,
  CgGames,
  CgPushChevronDownO,
  CgPushChevronLeftO,
} from "react-icons/cg";
import { GrTableAdd } from "react-icons/gr";
import { RiTeamFill } from "react-icons/ri";
import { BsNewspaper } from "react-icons/bs";
import { FaNewspaper } from "react-icons/fa";
import { FcManager } from "react-icons/fc";
import { useSession } from "next-auth/react";
import { ReactNode } from "react";
import { MdOutlineFeaturedPlayList } from "react-icons/md";
import { VscLiveShare } from "react-icons/vsc";

export default function Layout({ children }: { children: ReactNode }) {
  const [openSidebar, setOpenSidebar] = useState(false);
  const { data: session, status } = useSession({ required: true });
  return (
    <main className="md:flex relative">
      <LeftPane />
      <LeftPaneMobile isOpen={openSidebar} setIsOpen={setOpenSidebar} />

      <button
        onClick={() => setOpenSidebar((p) => !p)}
        className="secondary__btn hover:text-3xl hover:text-black text-gray-900 border text-xl absolute left-0 top-[50%] z-20 py-2 md:hidden"
      >
        <TbChevronCompactRight />
      </button>

      <section className="flex-1 h-screen overflow-y-auto bg-background">{children}</section>
    </main>
  );
}

export function LeftPane() {
  const pathname = usePathname();
  const activeLink = (linkname: string) =>
    pathname.startsWith(linkname) ? true : false;
  return (
    <div
      className={`max-md:hidden bg-[#faf9f9] w-[220px] max-h-screen overflow-y-auto`}
    >
      <ul className="grid gap-3 h-fit text-blue-500 ">
        <Link href={"/admin/features"}>
          <li
            className={`px-1 flex items-center gap-2 h-10  text-sm ${
              activeLink("/admin/features")
                ? "bg-blue-300 hover:bg-blue-300 text-white"
                : "hover:bg-slate-100"
            }`}
          >
            <MdOutlineFeaturedPlayList className="text-3xl " />
            Features
          </li>
        </Link>
        <Link href={"/admin/matches"}>
          <li
            className={`px-1 flex items-center gap-2 h-10  text-sm ${
              activeLink("/admin/matches")
                ? "bg-blue-300 hover:bg-blue-300 text-white"
                : "hover:bg-slate-100"
            }`}
          >
            <CgDatabase className="text-3xl " />
            Matches
          </li>
        </Link>

        <Link href={"/admin/players"}>
          <li
            className={`px-1 flex items-center gap-2 h-10  text-sm ${
              activeLink("/admin/players")
                ? "bg-blue-300 hover:bg-blue-300 text-white"
                : "hover:bg-slate-100"
            }`}
          >
            <RiTeamFill className="text-3xl " />
            Players
          </li>
        </Link>
        <Link href={"/admin/training"}>
          <li
            className={`px-1 flex items-center gap-2 h-10  text-sm ${
              activeLink("/admin/training")
                ? "bg-blue-300 hover:bg-blue-300 text-white"
                : "hover:bg-slate-100"
            }`}
          >
            <CgPushChevronLeftO className="text-3xl " />
            Training
          </li>
        </Link>

        <Link href={"/admin/sponsors"}>
          <li
            className={`px-1 flex items-center gap-2 h-10  text-sm ${
              activeLink("/admin/sponsors")
                ? "bg-blue-300 hover:bg-blue-300 text-white"
                : "hover:bg-slate-100"
            }`}
          >
            <BiSolidDonateBlood className="text-3xl " />
            Sponsors
          </li>
        </Link>

        <Link href={"/admin/results"}>
          <li
            className={`px-1 flex items-center gap-2 h-10  text-sm ${
              activeLink("/admin/results")
                ? "bg-blue-300 hover:bg-blue-300 text-white"
                : "hover:bg-slate-100"
            }`}
          >
            <GrTableAdd className="text-3xl " />
            Results
          </li>
        </Link>

        <Link href={"/admin/live-match"}>
          <li
            className={`px-1 flex items-center gap-2 h-10  text-sm ${
              activeLink("/admin/live-match")
                ? "bg-blue-300 hover:bg-blue-300 text-white"
                : "hover:bg-slate-100"
            }`}
          >
            <VscLiveShare className="text-3xl " />
            Live match
          </li>
        </Link>
        <Link href={"/admin/news"}>
          <li
            className={`px-1 flex items-center gap-2 h-10  text-sm ${
              activeLink("/admin/news")
                ? "bg-blue-300 hover:bg-blue-300 text-white"
                : "hover:bg-slate-100"
            }`}
          >
            <FaNewspaper className="text-3xl " />
            News
          </li>
        </Link>

        <Link href={"/admin/player-signing"}>
          <li
            className={` px-1 flex items-center gap-2 h-10  text-sm ${
              activeLink("/admin/player-signing")
                ? "   bg-blue-300 hover:bg-blue-300 text-white"
                : "hover:bg-slate-100"
            }`}
          >
            <GiAmericanFootballPlayer className="text-3xl " />
            Player signing
          </li>
        </Link>

        <Link href={"/admin/messages"}>
          <li
            className={`px-1 flex items-center gap-2 h-10  text-sm ${
              activeLink("/admin/messages")
                ? "bg-blue-300 hover:bg-blue-300 text-white"
                : "hover:bg-slate-100"
            }`}
          >
            <BiSolidMessageDetail className="text-3xl " />
            Massenger
          </li>
        </Link>
        <Link href={"/admin/leadership"}>
          <li
            className={`px-1 flex items-center gap-2 h-10  text-sm ${
              activeLink("/admin/leadership")
                ? "bg-blue-300 hover:bg-blue-300 text-white"
                : "hover:bg-slate-100"
            }`}
          >
            <FcManager className="text-3xl " />
            Leadership
          </li>
        </Link>
      </ul>
    </div>
  );
}
export function LeftPaneMobile({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const pathname = usePathname();
  const activeLink = (linkname: string) =>
    pathname.startsWith(linkname) ? true : false;
  return (
    <div
      className={`fixed top-0 bottom-0 z-10 w-full pt-[10vh] h-[100vh] overflow-y-auto bg-modalOverlay transition-transform duration-200 ${
        isOpen ? "left-0 transform duration-500" : "-left-full"
      }`}
      onClick={() => setIsOpen((p) => !p)}
    >
      <ul
        className="w-52 h-full bg-white text-blue-500 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <Link
          onClick={() => setIsOpen((p) => !p)}
          className="h-10 border "
          href={"/admin/features"}
        >
          <li
            className={`px-1 w-full h-10  flex gap-2 items-center  ${
              activeLink("/admin/features")
                ? "bg-blue-300 hover:bg-blue-300 text-white"
                : "hover:bg-slate-100"
            }`}
          >
            <MdOutlineFeaturedPlayList className="text-3xl " />
            Features
          </li>
        </Link>
        <Link
          onClick={() => setIsOpen((p) => !p)}
          className="h-10 border "
          href={"/admin/matches"}
        >
          <li
            className={`px-1 w-full h-10  flex gap-2 items-center  ${
              activeLink("/admin/matches")
                ? "bg-blue-300 hover:bg-blue-300 text-white"
                : "hover:bg-slate-100"
            }`}
          >
            <CgDatabase className="text-3xl " />
            Matches
          </li>
        </Link>

        <Link
          onClick={() => setIsOpen((p) => !p)}
          className="h-10 border "
          href={"/admin/players"}
        >
          <li
            className={`px-1 w-full h-10  flex gap-2 items-center  ${
              activeLink("/admin/players")
                ? "bg-blue-300 hover:bg-blue-300 text-white"
                : "hover:bg-slate-100"
            }`}
          >
            <RiTeamFill className="text-3xl " />
            Players
          </li>
        </Link>

        <Link
          onClick={() => setIsOpen((p) => !p)}
          className="h-10 border "
          href={"/admin/training"}
        >
          <li
            className={`px-1 w-full h-10  flex gap-2 items-center  ${
              activeLink("/admin/training")
                ? "bg-blue-300 hover:bg-blue-300 text-white"
                : "hover:bg-slate-100"
            }`}
          >
            <CgPushChevronDownO className="text-3xl " />
            Training
          </li>
        </Link>

        <Link
          onClick={() => setIsOpen((p) => !p)}
          className="h-10 border "
          href={"/admin/news"}
        >
          <li
            className={`px-1 w-full h-10  flex gap-2 items-center  ${
              activeLink("/admin/news")
                ? "bg-blue-300 hover:bg-blue-300 text-white"
                : "hover:bg-slate-100"
            }`}
          >
            <BsNewspaper className="text-3xl " />
            News
          </li>
        </Link>
        <Link
          onClick={() => setIsOpen((p) => !p)}
          className="h-10 border "
          href={"/admin/live-match"}
        >
          <li
            className={`px-1 w-full h-10  flex gap-2 items-center  ${
              activeLink("/admin/live-match")
                ? "bg-blue-300 hover:bg-blue-300 text-white"
                : "hover:bg-slate-100"
            }`}
          >
            <CgGames className="text-3xl " />
            Live match
          </li>
        </Link>

        <Link
          onClick={() => setIsOpen((p) => !p)}
          className="h-10 border "
          href={"/admin/sponsors"}
        >
          <li
            className={`px-1 w-full h-10  flex gap-2 items-center  ${
              activeLink("/admin/sponsors")
                ? "bg-blue-300 hover:bg-blue-300 text-white"
                : "hover:bg-slate-100"
            }`}
          >
            <BiSolidDonateBlood className="text-3xl " />
            Sponsors
          </li>
        </Link>

        <Link
          onClick={() => setIsOpen((p) => !p)}
          className="h-10 border "
          href={"/admin/results"}
        >
          <li
            className={`px-1 w-full h-10  flex gap-2 items-center  ${
              activeLink("/admin/results")
                ? "bg-blue-300 hover:bg-blue-300 text-white"
                : "hover:bg-slate-100"
            }`}
          >
            <GrTableAdd className="text-3xl " />
            Results
          </li>
        </Link>

        <Link
          onClick={() => setIsOpen((p) => !p)}
          className="h-10 border "
          href={"/admin/player-signing"}
        >
          <li
            className={` px-1 w-full h-10  flex gap-2 items-center  ${
              activeLink("/admin/player-signing")
                ? "   bg-blue-300 hover:bg-blue-300 text-white"
                : "hover:bg-slate-100"
            }`}
          >
            <GiAmericanFootballPlayer className="text-3xl " />
            Player signing
          </li>
        </Link>

        <Link
          onClick={() => setIsOpen((p) => !p)}
          className="h-10 border "
          href={"/admin/messages"}
        >
          <li
            className={`px-1 w-full h-10  flex gap-2 items-center  ${
              activeLink("/admin/messages")
                ? "bg-blue-300 hover:bg-blue-300 text-white"
                : "hover:bg-slate-100"
            }`}
          >
            <BiSolidMessageDetail className="text-3xl " />
            Massenger
          </li>
        </Link>
        <Link
          onClick={() => setIsOpen((p) => !p)}
          className="h-10 border "
          href={"/admin/leadership"}
        >
          <li
            className={`px-1 w-full h-10  flex gap-2 items-center  ${
              activeLink("/admin/leadership")
                ? "bg-blue-300 hover:bg-blue-300 text-white"
                : "hover:bg-slate-100"
            }`}
          >
            <FcManager className="text-3xl " />
            Leadership
          </li>
        </Link>
      </ul>
    </div>
  );
}
