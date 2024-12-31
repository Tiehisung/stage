"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import { baseUrl } from "@/lib/configs";
import { Button } from "./buttons/SubmitAndClick";
// import { baseUrl } from "@/helpers/configs";

interface UserLogButtonsProps {
  loginStyles: string;
  logoutStyles: string;
}

export default function UserLogButtons({
  loginStyles,
  logoutStyles,
}: UserLogButtonsProps) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const isDisabled = status === "loading" ? true : false;

  function handleLogin() {
    router.replace(baseUrl() + "/api/auth/signin?callbackUrl=/");
  }
  function handleLogout() {
    router.replace(baseUrl() + "/api/auth/signout?callbackUrl=/");
  }
  if (status == "loading") return null;
  if (session)
    return (
      <Button
        disabled={isDisabled}
        handleClickEvent={handleLogout}
        primaryText="Logout"
        className={`${logoutStyles}`}
      >
        <BiLogOut />
      </Button>
    );
  return (
    <Button
      disabled={isDisabled}
      handleClickEvent={handleLogin}
      primaryText="Login"
      className={` ${loginStyles}`}
    >
      <BiLogIn />
    </Button>
  );
}
