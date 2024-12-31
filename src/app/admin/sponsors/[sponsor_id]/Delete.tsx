"use client";

import { Button } from "@/components/buttons/SubmitAndClick";
import { baseUrl } from "@/lib/configs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

interface DeleteSponsorProps {
  sponsorId: string;
}

export default function DeleteSponsor({ sponsorId }: DeleteSponsorProps) {
  const [waiting, setWaiting] = useState(false);
  const router = useRouter();
  const handleDelete = async () => {
    setWaiting(true);
    const response = await fetch(baseUrl() + "/api/sponsors", {
      cache: "no-cache",
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sponsorId }),
    });
    const result = await response.json();
    toast(result.message, { type: result.success ? "success" : "error" });

    router.refresh();
    if (result.success) router.back();
  };
  return (
    <Button
      primaryText="Delete sponsor"
      className={"delete__btn px-4 py-2 ml-6 rounded shadow"}
      waiting={waiting}
      disabled={waiting}
      handleClickEvent={handleDelete}
    />
  );
}
