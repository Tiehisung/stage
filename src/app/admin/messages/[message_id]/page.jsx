import MessageViewer, { MsgActionBtns } from "../MessageViewer";
import { GetMessages } from "../page";
import { MarkMessageAsRead } from "../unread/page";
import { MessageSwitch } from "./MessageSwitch";

export default async function AnyMessage({ params }) {
  //Fetch current message from db by messageId
  const messages = await GetMessages();
  const currentMessage = messages.find((msg) => msg._id === params.message_id);

  //Automatic read status
  if (!currentMessage?.read) await MarkMessageAsRead(params.message_id);

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

      <div className="flex justify-between items-center p-2 gap-4 overflow-x-auto hidden__scrollbar">
        <MessageSwitch messageIds={messages.map((msg) => msg._id)} />

        {/*Star Delete Trash Archive */}
        <MsgActionBtns message={currentMessage} />
      </div>

      <MessageViewer message={currentMessage} />
    </section>
  );
}
