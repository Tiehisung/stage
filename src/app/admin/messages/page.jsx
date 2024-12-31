import Image from "next/image";
import playerImage from "@/public/images/breakfast2.jpg";

import FilteredListMsgView from "./ListMessages";
import { baseUrl } from "@/lib/configs";

export const GetMessages = async (msgId) => {
  if (msgId) {
    const response = await fetch(baseUrl() + "/api/messages/" + msgId, {
      cache: "no-store",
    });
    const message = await response.json();
    return message;
  }
  const response = await fetch(baseUrl() + "/api/messages", {
    cache: "no-store",
  });
  const messages = await response.json();
  return messages;
};
export const ArchiveMessage = async (msgId) => {
  const response = await fetch(baseUrl() + "/api/messages/archive", {
    cache: "no-cache",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(msgId),
    method: "POST",
  });
  const result = await response.json();
  return result;
};
export const TrashMessage = async (msgId) => {
  const response = await fetch(baseUrl() + "/api/messages", {
    cache: "no-cache",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(msgId),
    method: "DELETE",
  });
  const result = await response.json();
  return result;
};
export default async function AdminConversation() {
  const allMessages = await GetMessages();
  return (
    <div className="">
      <div>
        <Image
          src={playerImage}
          width={700}
          height={60}
          alt="desc image"
          className="w-full h-10"
        />
      </div>

      <h1 className="border-b p-1">Admin Conversation</h1>
      <FilteredListMsgView messages={allMessages} />
    </div>
  );
}

export const sampleText =
  "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit vero assumenda harum quod obcaecati expedita, error consectetur labore ab minus placeat, odio quia totam nihil magni explicabo doloremque. Facere, totam.";
