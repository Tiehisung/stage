"use client";

import FormSubmitBtn from "@/components/buttons/SubmitAndClick";
import { getErrorMessage } from "@/lib";
import { baseUrl } from "@/lib/configs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function PlayerActivation({ playerId,isActive }:{playerId:string, isActive:boolean}) {
  const [waiting, setWaiting] = useState(false);
  const router = useRouter();
  const [reason, setReason] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setWaiting(true);
      const response = await fetch(
        baseUrl() + "/api/players/" + playerId + "/activation",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          cache: "no-cache",
          body: JSON.stringify({
            reason,
          }),
        }
      );
      const result = await response.json();
      toast(result.message, { type: result.success ? "success" : "error" });
      router.refresh();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setWaiting(false);
    }
  }
  return (
    <form
      onSubmit={handleSubmit}
      className=" grid md:grid-cols-2 gap-2 items-center border-4 border-orange-600 p-[2vw] bg-arsh text-xl text-blue-800"
    >
      <div className=" border">
        <p>Reason</p>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="basic__input w-full bg-slate-300 min-h-36 max-h-64 m-0"
        />
      </div>
      <FormSubmitBtn
        primaryText={isActive ? "Deactive" : "Activate"}
        waiting={waiting}
        waitingText={
          isActive ? "Deactivating, please wait..." : "Reactivating..."
        }
        disabled={waiting || !reason}
        className="delete__btn w-fit h-20 px-5 rounded shadow"
      />
    </form>
  );
}
