"use client";

import FormSubmitBtn from "@/components/buttons/formBtn";
import { baseUrl } from "@/lib/configs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Performance({ playerId }) {
  const router = useRouter();
  const [waiting, setWaiting] = useState(false);
  const [formData, setFormData] = useState({ ...formModel });
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: parseFloat(value) }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setWaiting(true);
    const response = await fetch(
      baseUrl() + "/api/players/" + playerId + "/performance",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-cache",
        body: JSON.stringify({
          playerId: playerId,
          ...formData,
        }),
      }
    );
    const result = await response.json();
    toast(result.message, { type: result.success ? "success" : "error" });
    if (result.success) setFormData(formModel);
    setWaiting(false);
    router.refresh();
  }
  return (
    <form
      onSubmit={handleSubmit}
      className=" grid md:grid-cols-2 gap-2 justify-center items-center border p-[2vw] bg-arshTrans text-xl text-blue-800"
    >
      <div>
        <p>Goals</p>
        <input
          value={formData.goals}
          name="goals"
          type="number"
          min={0}
          onChange={handleOnChange}
          className="w-60 h-16 bg-blue-200 font-semibold text-center pl-2 text-4xl"
        />
      </div>
      <div>
        <p>Red cards</p>
        <input
          value={formData.redCards}
          name="redCards"
          type="number"
          min={0}
          onChange={handleOnChange}
          className="w-60 h-16 bg-blue-200 font-semibold text-center pl-2 text-4xl"
        />
      </div>
      <div>
        <p>Yellow cards</p>
        <input
          value={formData.yellowCards}
          name="yellowCards"
          type="number"
          min={0}
          onChange={handleOnChange}
          className="w-60 h-16 bg-blue-200 font-semibold text-center pl-2 text-4xl"
        />
      </div>
      <div>
        <p>Assists</p>
        <input
          value={formData.assists}
          name="assists"
          type="number"
          min={0}
          onChange={handleOnChange}
          className="w-60 h-16 bg-blue-200 font-semibold text-center pl-2 text-4xl"
        />
      </div>
      <div>
        <p>Penalties won</p>
        <input
          value={formData.penaltiesWon}
          name="penaltiesWon"
          type="number"
          min={0}
          onChange={handleOnChange}
          className="w-60 h-16 bg-blue-200 font-semibold text-center pl-2 text-4xl"
        />
      </div>
      <div>
        <p>MVP/MoTM won</p>
        <input
          value={formData.motm}
          name="motm"
          type="number"
          min={0}
          onChange={handleOnChange}
          className="w-60 h-16 bg-blue-200 font-semibold text-center pl-2 text-4xl"
        />
      </div>
      <div>
        <p>Penalties committed</p>
        <input
          value={formData.penaltiesCommitted}
          name="penaltiesCommitted"
          type="number"
          min={0}
          onChange={handleOnChange}
          className="w-60 h-16 bg-blue-200 font-semibold text-center pl-2 text-4xl"
        />
      </div>
      <FormSubmitBtn
        primaryText={"Update"}
        waitingText={"Updating, wait..."}
        waiting={waiting}
        disabled={waiting}
        styles="default__btn w-60 h-16 px-5 rounded shadow mt-6"
      />
    </form>
  );
}

const formModel = {
  yellowCards: 0,
  redCards: 0,
  goals: 0,
  penaltiesWon: 0,
  penaltiesCommitted: 0,
  motm: 0,
  assists: 0,
};
