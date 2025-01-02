"use client";

import FormSubmitBtn from "@/components/buttons/SubmitAndClick";
import { GeneralSelector } from "@/components/Selectors";
import { baseUrl } from "@/lib/configs";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";

export default function DeletePlayer({ playerId }:{playerId:string}) {
  const router = useRouter();
  const [waiting, setWaiting] = useState(false);
  const [formData, setFormData] = useState({ reason: "", detail: "" });
  async function handleSubmit(e:FormEvent<HTMLFormElement>) {
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
    <form
      onSubmit={handleSubmit}
      className=" grid md:grid-cols-2 gap-2 items-center border-4 border-red-700 p-[2vw] bg-arsh text-xl text-blue-800 "
    >
      <div className="border">
        <p>Reason</p>
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
        />
      </div>
      <div className=" border">
        <p>Detail</p>
        <textarea
          value={formData.detail}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, detail: e.target.value }))
          }
          className="basic__input w-full bg-slate-300 min-h-16 max-h-64 m-0"
        />
      </div>
      <FormSubmitBtn
        primaryText={"Delete player"}
        waitingText={"Deleting player"}
        className="delete__btn w-fit px-5 rounded shadow"
        waiting={waiting}
        disabled={waiting || !formData.detail || !formData.reason}
      />
    </form>
  );
}
