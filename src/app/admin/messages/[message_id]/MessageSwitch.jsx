"use client";

import { NextBtn, PreviousBtn } from "@/components/buttons/prevOrNext";
import { useRouter } from "next/navigation";

export function MessageSwitch({ messageIds }) {
  const router = useRouter();
  const searchParams = new URLSearchParams(
    typeof window !== "undefined" && window.location.search
  );
  const messageId = searchParams.get("messageId");
  const messageIndex = messageIds.indexOf(messageId);
  const handleNextMessage = () => {
    if (messageIds.length == 0) {
      return null;
    }
    const nextId = messageIds[messageIndex + 1];
    searchParams.set("messageId", nextId);
    const newPathname = `/admin/messages/${nextId}?${searchParams.toString()}`;
    router.replace(newPathname);
    router.refresh();
  };
  const handlePreviousMessage = () => {
    if (messageIds.length == 0) {
      return null;
    }
    const previousId = messageIds[messageIndex - 1];
    searchParams.set("messageId", previousId);
    const newPathname = `/admin/messages/${previousId}?${searchParams.toString()}`;
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
          styles={" text-2xl font-light"}
        />
        <NextBtn
          label=""
          styles={" text-2xl"}
          title="Next message"
          handleClick={handleNextMessage}
          disabled={messageIndex === messageIds.length - 1}
        />
      </span>
    </div>
  );
}
