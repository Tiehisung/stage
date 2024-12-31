"use client";

import { ClickButton } from "@/components/buttons/formBtn";
import { baseUrl } from "@/lib/configs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function CardAndFit({ player }) {
  const router = useRouter();

  const [waiting, setWaiting] = useState("");

  const handleToggleYellow = async (e) => {
    try {
      const { checked } = e.target;

      setWaiting("yellow");
      const response = await fetch(baseUrl() + "/api/players/" + player._id, {
        cache: "no-cache",
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fieldKey: "card",
          fieldValue: checked ? "yellow" : "",
        }),
      });
      const result = await response.json();

      toast(result.message, { type: result.success ? "success" : "error" });
      setWaiting("");
      router.refresh();
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleToggleRed = async (e) => {
    const { checked } = e.target;
    try {
      setWaiting("red");
      const response = await fetch(baseUrl() + "/api/players/" + player._id, {
        cache: "no-cache",
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fieldKey: "card",
          fieldValue: checked ? "red" : "",
        }),
      });
      const result = await response.json();

      toast(result.message, { type: result.success ? "success" : "error" });
      setWaiting("");
      router.refresh();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleToggleFitness = async (e) => {
    const { checked } = e.target;

    try {
      setWaiting("isFit");
      const response = await fetch(baseUrl() + "/api/players/" + player._id, {
        cache: "no-cache",
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fieldKey: "isFit",
          fieldValue: checked,
        }),
      });
      const result = await response.json();

      toast(result.message, { type: result.success ? "success" : "error" });
      setWaiting("");
      router.refresh();
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="grid grid-cols-3 items-center font-bold">
      <span>
        <h3 className="text-gray-800">💪Fit</h3>
        <ClickButton
          primaryText={""}
          waiting={waiting == "isFit"}
          waitingText=""
          styles=" flex items-center text-arsh text-2xl"
          disabled={waiting == "isFit"}
        >
          <input
            onChange={handleToggleFitness}
            type="checkbox"
            checked={player?.isFit}
            name="fitness"
            className="h-10 w-10 grayscale"
          />
        </ClickButton>
      </span>

      <span className="text-red-500">
        <h3>🟥Red card</h3>
        <ClickButton
          primaryText={""}
          waiting={waiting == "red"}
          waitingText=""
          styles=" flex items-center text-arsh text-2xl"
          disabled={waiting == "red"}
        >
          <input
            onChange={handleToggleRed}
            type="checkbox"
            checked={player?.card == "red"}
            name="red"
            className="h-10 w-10 grayscale"
          />
        </ClickButton>
      </span>

      <span className="text-yellow-500 ">
        <h3 className="whitespace-nowrap">🟨Yellow card</h3>
        <ClickButton
          primaryText={""}
          waiting={waiting == "yellow"}
          waitingText=""
          styles=" flex items-center text-arsh text-2xl"
          disabled={waiting == "yellow"}
        >
          <input
            onChange={handleToggleYellow}
            checked={player?.card == "yellow"}
            type="checkbox"
            name="yellow"
            className="h-10 w-10 grayscale"
          />
        </ClickButton>
      </span>
    </div>
  );
}
