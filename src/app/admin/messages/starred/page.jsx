import MessageViewer, { MessageNavBtns, MsgActionBtns } from "../MessageViewer";
import { baseUrl } from "@/lib/configs";
import { GetMessages } from "../page";
import { redirect } from "next/navigation";

export const GetStarredMessages = async () => {
  const response = await fetch(baseUrl() + "/api/messages/starred", {
    cache: "no-store",
  });
  const messages = await response.json();
  return messages;
};

export const StarUpMessage = async (messageId, starred) => {
  const response = await fetch(baseUrl() + "/api/messages/starred", {
    cache: "no-cache",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messageId, starred }),
    method: "PUT",
  });
  const result = await response.json();
  return result;
};

export default async function StarredMessagesPage({ searchParams }) {
  const starredMessages = await GetStarredMessages();

  const currentMessage = await GetMessages(searchParams.messageId);
  if (!currentMessage) return redirect(baseUrl() + "/messages", "replace");
  return (
    <section className="relative ">
      <div>
        <h1>
          Message:{" "}
          <span className="italic text-sm"> {currentMessage?._id}</span>
        </h1>
        <h1>
          From:
          <span className="italic text-sm"> {currentMessage?.email}</span>
        </h1>
      </div>

      <div className="flex justify-between items-center p-2 gap-2 overflow-x-auto hidden__scrollbar">
        <MessageNavBtns messageIds={starredMessages.map((msg) => msg._id)} />
        {/*Star Delete Trash Archive */}
        <MsgActionBtns message={currentMessage} />
      </div>

      <MessageViewer message={currentMessage} />
    </section>
  );
}
