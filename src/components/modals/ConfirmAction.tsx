"use client";

import React from "react";
import PrimaryModal from "./Modals";
import { Button } from "../buttons/SubmitAndClick";
interface IConfirmActionProps {
  title: string;
  message: string;
  onConfirm: Function;
  onCancel: (arg: boolean) => void;
  primaryText: string;
  waitingText: string;
  isOpen: boolean;
}
const ConfirmActionModal = ({
  title,
  message,
  primaryText,
  waitingText,
  onCancel,
  isOpen,
  onConfirm,
}: IConfirmActionProps) => {
  const [waiting, setWaiting] = React.useState(false);
  const handleAction = async () => {
    try {
      setWaiting(true);
      onConfirm();
    } catch (error) {
    } finally {
      setWaiting(false);
    }
  };
  return (
    <PrimaryModal open={isOpen} setOpen={(open: boolean) => onCancel(open)}>
      <div className="card bg-neutral text-neutral-content w-96">
        <div className="card-body items-center text-center">
          <h2 className="card-title">{title ?? "Detete item"}</h2>
          <p>{message ?? "You are about to delete this item"}.</p>
          <div className="card-actions justify-end">
            <Button
              primaryText={primaryText ?? "Accept"}
              waitingText={waitingText ?? "Deny"}
              handleClickEvent={handleAction}
              waiting={waiting}
              disabled={waiting}
            />
            <button className="btn btn-ghost" onClick={() => onCancel(false)}>
              {waitingText ?? "Return"}
            </button>
          </div>
        </div>
      </div>
    </PrimaryModal>
  );
};

export default ConfirmActionModal;
