import MessageViewer, { MessageNavBtns, MsgActionBtns } from "../MessageViewer";
import { baseUrl } from "@/lib/configs";
import { GetMessages } from "../page";

export const GetUnreadMessages = async () => {
  const response = await fetch(baseUrl() + "/api/messages/unread", {
    cache: "no-store",
  });
  const messages = await response.json();
  return messages;
};

export const MarkMessageAsRead = async (msgId) => {
  const response = await fetch(baseUrl() + "/api/messages/unread", {
    cache: "no-cache",
    method: "PUT",
    body: JSON.stringify(msgId),
    headers: { "Content-Type": "application/json" },
  });
  const result = await response.json();
  console.log("markRead", result);
  return result;
};

export default async function UnreadMessages({ searchParams }) {
  const unreadMessages = await GetUnreadMessages();

  //Fetch current message from db by messageId
  const currentMessage = await GetMessages(searchParams.messageId);

  //Automatic read status
  await MarkMessageAsRead(currentMessage._id);
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

      <div className="flex justify-between p-2 gap-4">
        <MessageNavBtns messageIds={unreadMessages.map((msg) => msg._id)} />

        {/*Star Delete Trash Archive */}
        <MsgActionBtns message={currentMessage} />
      </div>

      <MessageViewer message={currentMessage} />
    </section>
  );
}
