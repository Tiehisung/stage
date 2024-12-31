"use client";

import { ClickButton } from "@/components/buttons/formBtn";
import { baseUrl } from "@/lib/configs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function NewsActionsCp({ newsItem }) {
  const router = useRouter();
  const [waiting, setWaiting] = useState("");
  async function handleTrend() {
    try {
      setWaiting("trend");
      const response = await fetch(baseUrl() + "/api/news/" + newsItem._id, {
        cache: "no-cache",
        headers: { "Content-Type": "application/json" },
        method: "PUT",
        body: JSON.stringify({
          fieldName: "stats.isTrending",
          fieldValue: !newsItem.stats?.isTrending,
        }),
      });
      const result = await response.json();
      // console.log("result", result);
      toast(result.message, { type: result.success ? "success" : "error" });
    } catch (error) {
      toast.error(error.message);
    } finally {
      router.refresh();
      setWaiting("");
    }
  }
  async function handleLatest() {
    try {
      setWaiting("latest");
      const response = await fetch(baseUrl() + "/api/news/" + newsItem._id, {
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
        method: "PUT",
        body: JSON.stringify({
          fieldName: "stats.isLatest",
          fieldValue: !newsItem.stats?.isLatest,
        }),
      });
      const result = await response.json();
      // console.log("result", result);
      toast(result.message, { type: result.success ? "success" : "error" });
    } catch (error) {
      toast.error(error.message);
    } finally {
      router.refresh();
      setWaiting("");
    }
  }
  async function handleArchive() {
    try {
      setWaiting("archive");
      const response = await fetch(
        baseUrl() + "/api/news/" + newsItem._id + "/archive",
        {
          cache: "no-store",
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify(newsItem),
        }
      );
      const result = await response.json();
      console.log("result", result);
      toast(result.message, { type: result.success ? "success" : "error" });
    } catch (error) {
      toast.error(error.message);
    } finally {
      router.refresh();
      setWaiting("");
    }
  }
  async function handleDelete() {
    try {
      setWaiting("delete");
      const response = await fetch(baseUrl() + "/api/news/" + newsItem._id, {
        cache: "no-cache",
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      const result = await response.json();
      console.log("result", result);
      toast(result.message, { type: result.success ? "success" : "error" });
    } catch (error) {
      toast.error(error.message);
    } finally {
      router.refresh();
      setWaiting("");
    }
  }
  return (
    <div className="w-full justify-end items-baseline gap-7 hidden group-hover:flex">
      <ClickButton
        handleClickEvent={handleTrend}
        primaryText={"Trend"}
        styles="secondary__btn px-2 rounded flex items-center"
        disabled={waiting}
        waiting={waiting == "trend"}
        waitingText="Processing trend..."
      >
        <span
          className={`h-3 w-3 rounded-full bg-green-600 ${
            !newsItem.stats?.isTrending && "hidden"
          }`}
        ></span>
      </ClickButton>

      <ClickButton
        handleClickEvent={handleLatest}
        primaryText={"Latest"}
        styles="secondary__btn px-2 rounded flex items-center"
        disabled={waiting}
        waiting={waiting == "latest"}
        waitingText="Processing latest..."
      >
        <span
          className={`h-3 w-3 rounded-full bg-yellow-600 ${
            !newsItem.stats?.isLatest && "hidden"
          }`}
        ></span>
      </ClickButton>

      <ClickButton
        handleClickEvent={handleArchive}
        primaryText={"Archive"}
        styles={`secondary__btn px-2 rounded  `}
        disabled={waiting}
        waiting={waiting == "archive"}
        waitingText="Archiving..."
      />

      <ClickButton
        handleClickEvent={handleDelete}
        primaryText={"Delete"}
        disabled={waiting}
        styles="secondary__btn px-2 rounded"
        waiting={waiting == "delete"}
        waitingText="Deleting..."
      />
    </div>
  );
}
