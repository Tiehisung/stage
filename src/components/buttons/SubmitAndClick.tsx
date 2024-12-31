import { MouseEventHandler } from "react";
import { VscLoading } from "react-icons/vsc";

interface ButtonProps {
  primaryText?: string;
  waiting?: boolean;
  waitingText?: string;
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  type?: "submit" | "button" | "reset";
}

export default function FormSubmitBtn({
  primaryText,
  waiting,
  waitingText,
  className = "primary__btn px-2",
  disabled = true,
  type = "submit",
}: ButtonProps) {
  return (
    <button
      disabled={waiting || disabled}
      className={`   ${className} ${waiting && "cursor-wait"}`}
      type={type}
    >
      {waiting ? (
        <span
          className={`flex items-center gap-2 w-fit min-w-max justify-between whitespace-nowrap  overflow-hidden`}
        >
          <VscLoading className={` loading-icon `} />
          {waitingText}
        </span>
      ) : (
        primaryText
      )}
    </button>
  );
}

interface ClickButtonProps extends ButtonProps {
  handleClickEvent?: MouseEventHandler<HTMLButtonElement>
  title?: string;
}

export function Button({
  primaryText,
  waiting = false,
  waitingText = "Processing...",
  className = "primary__btn flex items-baseline gap-1",
  disabled = false,
  type = "button",
  handleClickEvent,
  children,
  title = "",
}: ClickButtonProps) {
  return (
    <button
      disabled={waiting || disabled}
      className={` ${className} ${waiting && "cursor-wait"}`}
      type={type}
      onClick={handleClickEvent}
      title={title}
    >
      {children}
      {waiting ? (
        <span
          className={`flex items-center gap-2 w-fit min-w-max justify-between whitespace-nowrap  overflow-hidden`}
        >
          <VscLoading className={` loading-icon `} />
          {waitingText}
        </span>
      ) : (
        <span>{primaryText}</span>
      )}
    </button>
  );
}
