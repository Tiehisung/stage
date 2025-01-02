"use client";

import FormSubmitBtn from "@/components/buttons/SubmitAndClick";
import { TextArea } from "@/components/input/Inputs";
import { getErrorMessage } from "@/lib";
import { baseUrl } from "@/lib/configs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function PlayerActivation({
  playerId,
  isActive,
}: {
  playerId: string;
  isActive: boolean;
}) {
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
    <div
      id="activate-player"
      className="bg-white rounded-xl p-4 shadow-md max-w-md grow text-sm"
    >
      <h1 className=" font-light text-lg text-gray-600">Player activation</h1>
      <form
        onSubmit={handleSubmit}
        className=" space-y-6 border rounded-xl h-fit p-4"
      >
        <TextArea
          label="Reason"
          labelStyles="_label"
          name="activationReason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <FormSubmitBtn
          primaryText={isActive ? "Deactive" : "Activate"}
          waiting={waiting}
          waitingText={
            isActive ? "Deactivating, please wait..." : "Reactivating..."
          }
          disabled={waiting || !reason}
          className="delete__btn w-fit h-10 px-5 rounded shadow"
        />
      </form>
    </div>
  );
}
