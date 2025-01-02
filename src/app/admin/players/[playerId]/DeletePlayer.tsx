"use client";

import FormSubmitBtn from "@/components/buttons/SubmitAndClick";
import { TextArea } from "@/components/input/Inputs";
import { GeneralSelector } from "@/components/Selectors";
import { baseUrl } from "@/lib/configs";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";

export default function DeletePlayer({
  playerId,
  name,
}: {
  playerId: string;
  name: string;
}) {
  const router = useRouter();
  const [waiting, setWaiting] = useState(false);
  const [formData, setFormData] = useState({ reason: "", detail: "" });
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setWaiting(true);
    const response = await fetch(baseUrl() + "/api/players/" + playerId + "", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      cache: "no-cache",
      body: JSON.stringify({
        reason: formData.reason,
        detail: formData.detail,
      }),
    });
    const result = await response.json();
    toast(result.message, { type: result.success ? "success" : "error" });
    if (result.success) router.back();
    router.refresh();
    setWaiting(false);
  }
  return (
    <div
      id="delete-player"
      className="bg-white rounded-xl p-4 shadow-md max-w-md grow"
    >
      <h1 className="font-light text-lg text-red-500 ">Delete {name}</h1>
      <form
        onSubmit={handleSubmit}
        className=" space-y-6 border border-background rounded-xl h-fit p-4 pt-0"
      >
        <div className="w-full">
          <p className="_label">Reason</p>
          <GeneralSelector
            data={[
              "Contract expired",
              "Contract terminated",
              "Demise",
              "Misconduct",
              "Health issues",
            ]}
            handleOnChange={(e) =>
              setFormData((prev) => ({ ...prev, reason: e.target.value }))
            }
            selectedValue={formData.reason}
            className="grow w-full"
          />
        </div>

        <TextArea
          label="Detail"
          labelStyles="_label"
          name="deleteDetails"
          value={formData.detail}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, detail: e.target.value }))
          }
        />

        <FormSubmitBtn
          primaryText={"Delete player"}
          waitingText={"Deleting player"}
          className="delete__btn w-fit px-5 rounded shadow"
          waiting={waiting}
          disabled={waiting || !formData.detail || !formData.reason}
        />
      </form>
    </div>
  );
}
