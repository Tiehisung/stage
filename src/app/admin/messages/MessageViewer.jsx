"use client";

import { NextBtn, PreviousBtn } from "@/components/buttons/prevOrNext";
import { BsStar, BsStarFill } from "react-icons/bs";
import { RiSpamLine } from "react-icons/ri";
import { BiArchive, BiReply, BiTrash } from "react-icons/bi";
import FormSubmitBtn, { ClickButton } from "@/components/buttons/formBtn";
import { useState } from "react";
import { CgClose } from "react-icons/cg";
import { useRouter } from "next/navigation";
import { StarUpMessage } from "./starred/page";
import { ArchiveMessage, TrashMessage } from "./page";

export default function MessageViewer({ message }) {
  const [toggleReply, setToggleReply] = useState(false);
  return (
    <section className="relative ">
      <div>
        <h1>
          From:
          <span className="italic text-sm"> {message?.email}</span>
        </h1>
      </div>

      <p>{message?.text}</p>

      <br />
      <button
        onClick={() => setToggleReply((p) => !p)}
        className="flex items-center gap-2 ml-auto mr-3 hover:font-semibold mb-1"
      >
        {toggleReply ? <CgClose /> : <BiReply />}
        {toggleReply ? "Close reply" : "Reply"}
      </button>
      <hr />
      <form
        className={`${
          toggleReply ? "grid" : "hidden"
        } gap-2 bg-slate-100 p-2 shadow`}
      >
        <p>
          To <span className="text-sm text-purple-800">{message?.email}</span>{" "}
        </p>
        <textarea
          name="reply"
          className="border p-1 outline-1 outline-blue-700 max-h-24 min-h-[40px]"
          placeholder="Reply text"
        ></textarea>
        <FormSubmitBtn
          primaryText={"Send reply"}
          styles="px-4 w-fit py-1 secondary__btn"
        />
      </form>
    </section>
  );
}

export function MsgActionBtns({ message }) {
  const [activity, setActivity] = useState("");
  const router = useRouter();

  //Starring
  const handleStarMessage = async () => {
    setActivity("star");
    await StarUpMessage(message?._id, message?.starred);
    setActivity("");
    router.refresh();
  };

  //Archiving
  const handleArchiveMessage = async () => {
    setActivity("archive");
    await ArchiveMessage(message?._id);
    router.back();
    setActivity("");
  };

  //Trashing
  const handleTrashMessage = async () => {
    setActivity("trash");
    await TrashMessage(message?._id);
    setActivity("");
    router.back();
  };
  return (
    <div className="flex justify-between p-2 gap-4">
      <span className=" flex items-center gap-2 grow justify-around p-1 border ">
        <ClickButton
          primaryText={message?.starred ? "Starred" : "Star"}
          waiting={activity == "star"}
          waitingText="Starring..."
          handleClickEvent={handleStarMessage}
          styles="flex items-center gap-1"
          title="Star"
        >
          {message?.starred ? (
            <BsStarFill className=" text-yellow-400" />
          ) : (
            <BsStar />
          )}
          {/* <span className="max-md:hidden">
            {message?.starred ? "Starred" : "Star"}
          </span> */}
        </ClickButton>

        <ClickButton
          primaryText={"Archive"}
          waiting={activity == "archive"}
          waitingText="Archiving..."
          handleClickEvent={handleArchiveMessage}
          styles="flex items-center gap-1"
          title="Archive"
        >
          <BiArchive />
        </ClickButton>
        <ClickButton
          primaryText={"Trash"}
          waiting={activity == "trash"}
          waitingText="Trashing..."
          handleClickEvent={handleTrashMessage}
          styles="flex items-center gap-1"
          title="Trash"
        >
          <BiTrash />
        </ClickButton>
      </span>
    </div>
  );
}
export function MessageNavBtns({ messageIds }) {
  const router = useRouter();
  const searchParams = new URLSearchParams(
    typeof window !== "undefined" && window.location.search
  );
  const messageId = searchParams.get("messageId");
  const messageIndex = messageIds.indexOf(messageId);
  console.log("ids", messageIds);
  const handleNextMessage = () => {
    if (messageIds.length == 0) {
      return null;
    }
    const nextId = messageIds[messageIndex + 1];
    searchParams.set("messageId", nextId);
    const newPathname = `${
      window.location.pathname
    }?${searchParams.toString()}`;
    router.replace(newPathname);
    router.refresh();
  };
  const handlePreviousMessage = () => {
    if (messageIds.length == 0) {
      return null;
    }
    const previousId = messageIds[messageIndex - 1];
    searchParams.set("messageId", previousId);
    const newPathname = `${
      window.location.pathname
    }?${searchParams.toString()}`;
    router.replace(newPathname);
    router.refresh();
  };

  return (
    <div>
      <span className="flex gap-2 items-center">
        <PreviousBtn
          label=""
          title="Previous message"
          handleClick={handlePreviousMessage}
          disabled={messageIndex === 0}
        />
        <NextBtn
          label=""
          title="Next message"
          handleClick={handleNextMessage}
          disabled={messageIndex === messageIds.length - 1}
        />
      </span>
    </div>
  );
}
