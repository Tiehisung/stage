"use client";

import { ClickButton } from "@/components/buttons/formBtn";
import { baseUrl } from "@/lib/configs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function NewsArchiveActionsAdm({ newsItem }) {
  const router = useRouter();
  const [waiting, setWaiting] = useState(false);

  async function handleRestore() {
    try {
      setWaiting(true);
      const response = await fetch(baseUrl() + "/api/unarchive", {
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({
          category: "archived_news",
          restoreCollection: "news",
          targetData: newsItem,
        }),
      });
      const result = await response.json();

      toast(result.message, { type: result.success ? "success" : "error" });
    } catch (error) {
      toast.error(error.message);
    } finally {
      router.refresh();
      setWaiting(false);
    }
  }
  return (
    <div>
      <ClickButton
        handleClickEvent={handleRestore}
        primaryText={"Unarchive"}
        styles={`secondary__btn px-2 rounded text-sm`}
        disabled={waiting}
        waiting={waiting}
        waitingText="Restoring..."
      />
    </div>
  );
}
