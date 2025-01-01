"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiHome, BiMailSend, BiTable } from "react-icons/bi";
import { useState } from "react";
import { GiSoccerBall } from "react-icons/gi";
import { TbTableRow } from "react-icons/tb";
import { RiAdminLine, RiFundsFill } from "react-icons/ri";
import { BsStarFill } from "react-icons/bs";
import UserLogButtons from "./UserLogger";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import HideOnClickOutside from "./HideOnClickOutside";

export default function HeaderCp() {
  const pathname=usePathname()
  if(pathname.startsWith('/admin'))return 
  return (
    <div className="fixed left-0 right-0 top-0 flex justify-between items-center border-hidden w-full h-[8vh] md:h-[10vh] p-4  bg-gradient-to-b from-blue-400 to-blue-600 shadow-sm shadow-stone-500  z-40">
      <button className="spin-logo">
        <GiSoccerBall size={55} />
      </button>

      <h1 className="flex text-yellow-200 font-semibold text-2xl md:text-3xl lg:text-5xl ">
        <span className="text-white">Konjiehi</span> FC
      </h1>

      <NavBar />
    </div>
  );
}

export function NavBar() {
  const pathname = usePathname();
  const navLinks = [
    { title: "home", href: "/" },
    { title: "sponsors", href: "/sponsorship" },
    { title: "matches", href: "/matches" },
    { title: "players", href: "/players" },
    { title: "Contact us", href: "/contact-us" },
  ];
  return (
    <div className=" container ml-auto flex justify-end items-center  text-white">
      <ul className="hidden md:flex items-center font-semibold cursor-auto text-sm ">
        {pathname !== "/" && (
          <li className="border border-gray-300 bg-[#e1299e] flex flex-col ">
            <Link
              href={"/"}
              className="group flex flex-col grow justify-center items-center pt-1 px-2"
            >
              <span>Home</span>
              <hr className=" w-0 group-hover:w-full h-1 bg-green-500 transition-all duration-300 delay-100" />
            </Link>
          </li>
        )}
        {navLinks.slice(1).map((lk, index) => (
          <li
            key={index}
            style={{ background: bgcolors[index] }}
            className={`border border-gray-300 flex flex-col font-semibold capitalize`}
          >
            <Link
              href={lk.href}
              className="group flex flex-col grow justify-center items-center pt-1 px-2"
            >
              <span>{lk.title}</span>
              <hr className=" w-0 group-hover:w-full h-1 bg-green-500 transition-all duration-300 delay-100" />
            </Link>
          </li>
        ))}

        <li className="ml-3">
          <UserLogButtons
            loginStyles={
              "bg-transparent border rounded flex items-center gap-1 text-sm justify-center w-fit py-1 px-2"
            }
            logoutStyles="delete__btn border rounded flex items-center gap-1 text-sm justify-center w-fit py-1 px-2"
          />
        </li>
      </ul>

      <MobilieNavCp navLinks={navLinks} />
    </div>
  );
}

interface MobilieNavCpProps {
  navLinks: { title: string; href: string }[];
}

export function MobilieNavCp({  }: MobilieNavCpProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <HideOnClickOutside
      setIsVisible={setIsOpen}
      className="relative md:hidden "
    >
      <button onClick={() => setIsOpen(true)} className="p-2 ">
        <AiOutlineMenuUnfold />
      </button>

      <div
        className={` fixed top-[8vh] right-0 w-3/4 bg-gradient-to-b from-blue-500 to-blue-600 transform transition-all duration-300 text-white shadow-md ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <ul className="items-center w-full text-base text-green-100 cursor-pointer shadow-md">
          {pathname !== "/" && (
            <li
              className="hover:bg-blue-400  flex"
              onClick={() => setIsOpen(false)}
            >
              <Link href={"/"} className="flex gap-1 w-full items-center">
                <BiHome className="p-2 w-12 h-12" />
                Home
              </Link>
            </li>
          )}
          <li
            className="hover:bg-blue-400 flex"
            onClick={() => setIsOpen(false)}
          >
            <Link
              href={"/contact-us"}
              className="flex gap-1 w-full items-center"
            >
              <BiMailSend className="p-2 w-12 h-12" />
              Contact us
            </Link>
          </li>
          <li
            className="hover:bg-blue-400 flex"
            onClick={() => setIsOpen(false)}
          >
            <Link
              href={"/sponsorship"}
              className="flex gap-1 w-full items-center"
            >
              <RiFundsFill className="p-2 w-12 h-12" />
              Sponsors
            </Link>
          </li>
          <li
            className="hover:bg-blue-400 flex"
            onClick={() => setIsOpen(false)}
          >
            <Link href={"/fixtures"} className="flex gap-1 w-full items-center">
              <TbTableRow className="p-2 w-12 h-12" />
              fixtures
            </Link>
          </li>
          <li
            className="hover:bg-blue-400 flex"
            onClick={() => setIsOpen(false)}
          >
            <Link
              href={"/match-results"}
              className="flex gap-1 w-full items-center"
            >
              <BiTable className="p-2 w-12 h-12" />
              Match results
            </Link>
          </li>
          <li
            className="hover:bg-blue-400 flex"
            onClick={() => setIsOpen(false)}
          >
            <Link href={"/players"} className="flex gap-1 w-full items-center">
              <BsStarFill className="p-2 w-12 h-12" />
              Players
            </Link>
          </li>

          <li
            className="hover:bg-blue-400 py-1 h-14 flex"
            onClick={() => setIsOpen(false)}
          >
            <Link href={"/admin"} className="flex gap-1 w-full items-center">
              <RiAdminLine className="p-2 w-12 h-12" /> Admin
            </Link>
          </li>
        </ul>
      </div>
    </HideOnClickOutside>
  );
}

const bgcolors = [
  "#901161",
  "#202ae6",
  "#9ab0a3",
  "#4B4B4B",
  "#f44949",
  "#b09a9a",
  "#a8c10a",
  "white",
];
