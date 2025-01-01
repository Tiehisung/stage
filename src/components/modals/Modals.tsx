import React, { ReactNode, useState } from "react";
import DiveUpwards from "../Animate/DiveUp";

const PrimaryModal = ({
  children,
  open = false,
  setOpen,
  className,
}: {
  children: ReactNode;
  open: boolean;
  setOpen: (arg: boolean) => void;
  className?: string;
}) => {
  if (!open) return null;
  return (
    <div
      onClick={() => setOpen(false)}
      className={` z-50 fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ${className}`}
    >
      <DiveUpwards>{open && children}</DiveUpwards>
    </div>
  );
};

export default PrimaryModal;

interface ISecondaryModalProps {
  children: React.ReactNode;
  trigger?: React.ReactNode;
  triggerClassName?: string;
}

export function SecondaryModal({
  children,
  trigger,
  triggerClassName,
}: ISecondaryModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsOpen((p) => !p)}
        className={" p-2 border rounded w-fit  " + triggerClassName}
        role="button"
      >
        {trigger ?? "Open modal"}
      </div>

      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-50 justify-center items-center transition-all duration-300 bg-modalTransparent p-5 overflow-y-auto ${
          isOpen
            ? "flex scale-100"
            : "invisible -top-[100%] scale-y-95 rounded-badge"
        }`}
      >
        <div onClick={(e) => e.stopPropagation()} className="container w-fit">
          {children}
        </div>
      </div>
    </>
  );
}
