"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BiSolidStar, BiStar } from "react-icons/bi";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { FaBoxOpen } from "react-icons/fa6";

export default function FilteredListMsgView({ messages }) {
  const router = useRouter();
  const [messagesToDisplay, setMessagesToDisplay] = useState(messages);
  const unread = messages?.filter((message) => message.read == false);
  const starred = messages?.filter((message) => message.starred == true);

  const [filterType, setFilterType] = useState("");

  return (
    <section className="flex max-md:flex-col border-4 border-blue-400">
      <div className="flex md:grid gap-2 h-fit font-semibold md:w-36 overflow-x-auto hidden__scrollbar">
        <button
          onClick={() => {
            setMessagesToDisplay(unread);
            setFilterType("unread");
          }}
          className={`text-left whitespace-nowrap p-1 ${
            filterType == "unread" &&
            " text-blue-600 border md:border-r-4 max-md:border-b-4 border-blue-500 "
          }`}
        >
          Not read({unread?.length || 0})
        </button>
        <button
          onClick={() => {
            setFilterType("starred");
            setMessagesToDisplay(starred);
          }}
          className={`text-left whitespace-nowrap p-1 ${
            filterType == "starred" &&
            " text-blue-600 border md:border-r-4 max-md:border-b-4 border-blue-500 "
          }`}
        >
          Starred({starred?.length || 0})
        </button>
        <button
          onClick={() => {
            setMessagesToDisplay(messages);
            setFilterType("");
          }}
          className={`text-left whitespace-nowrap p-1 ${
            filterType == "" &&
            " text-blue-600 border md:border-r-4 max-md:border-b-4 border-blue-500 "
          }`}
        >
          All messages({messagesToDisplay.length}) 
        </button>
      </div>
      <ListMessages
        messagesToDisplay={messagesToDisplay}
        filterType={filterType}
      />
    </section>
  );
}

export function ListMessages({ messagesToDisplay, filterType = "" }) {
  const router = useRouter();
  const path = (message) =>
    filterType == ""
      ? message._id
      : `${filterType}?messageId=${message._id}`;

  return (
    <div className="border-2 flex-1">
      <ul className="h-[70vh] overflow-y-auto">
        {messagesToDisplay?.map((message, mIndex) => (
          <li
            key={mIndex}
            className={` shadow border p-1 my-2 flex gap-2 group hover:bg-slate-100 cursor-pointer ${
              !message.read && "bg-blue-100"
            }`}
          >
            <Link href={`/admin/messages/${path(message)}`}>
              <div>
                <h2>{message.email.split("@")[0]}</h2>
                <h4 className="w-40 md:w-80 truncate text-teal-950 hover:underline text-sm ">
                  {message.text}
                </h4>
              </div>
            </Link>

            <BiSolidStar
              className={`${
                !message.starred && "hidden"
              } text-yellow-400 ml-auto`}
            />
            <span
              onClick={(e) => e.stopPropagation()}
              className="hidden items-center gap-2 ml-auto group-hover:flex shadow p-1 cursor-auto h-fit"
            >
              <button>Archive</button>
              <button>Spam</button>
              <button>
                <RiDeleteBin2Fill />
              </button>
            </span>
          </li>
        ))}
        <li
          className={`flex-col justify-center items-center mt-20 ${
            messagesToDisplay.length === 0 ? "flex" : "hidden"
          } `}
          key={"nope"}
        >
          <FaBoxOpen size={120} className="text-yellow-500" />
          <p> No {filterType} messages</p>
        </li>
      </ul>
    </div>
  );
}
