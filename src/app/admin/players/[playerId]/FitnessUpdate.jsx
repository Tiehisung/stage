"use client";

import FormSubmitBtn from "@/components/buttons/formBtn";
import { baseUrl } from "@/lib/configs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function UpdatePlayerFitness({ playerId }) {
  const router = useRouter();
  const [waiting, setWaiting] = useState(false);
  const [fitnessState, setFitnessState] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setWaiting(true);
      const response = await fetch(
        baseUrl() +
          "/api/players/" +
          playerId +
          "/fitness?fitness=" +
          fitnessState
      );
      const result = await response.json();
      toast(result.message, { type: result.success ? "success" : "error" });
      if (result.success) setFitnessState("");
      router.refresh();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setWaiting(false);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-3 p-2 border rounded-md shadow-md bg-arsh text-white"
    >
      <div>
        <p>Update fitness</p>
        <textarea
          onChange={(e) => setFitnessState(e.target.value)}
          value={fitnessState}
          className="classic__input max-h-32 min-h-20 w-full bg-[#9595956b]"
        />
      </div>
      <FormSubmitBtn
        primaryText={"Update"}
        waiting={waiting}
        waitingText={"Updating, wait..."}
        disabled={waiting || !fitnessState}
        styles="primary__btn w-fit px-5 rounded shadow"
      />
    </form>
  );
}
