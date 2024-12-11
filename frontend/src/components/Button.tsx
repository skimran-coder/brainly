import { ReactElement, useState } from "react";

interface buttonProps {
  name: "YouTube" | "Twitter/X" | "Document";
  type: "primary" | "secondary";
  size: "lg" | "md" | "sm";
  beforeIcon?: ReactElement;
  isSelected?: {
    YouTube: boolean;
    "Twitter/X": boolean;
    Document: boolean;
  };
  onClickHandler?: () => void;
}

const Button = ({
  type,
  name,
  size,
  beforeIcon,
  isSelected,
  onClickHandler,
}: buttonProps) => {
  const defaultStyles =
    "rounded-md flex gap-2 justify-center items-center hover:bg-opacity-80 transition-all";

  const styleSize = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2 text-md",
    lg: "px-6 py-3 text-lg",
  };

  const styleType = {
    primary: "bg-bg-primaryBtn text-white",
    secondary: "bg-bg-secondaryBtn text-text-secondaryBtn",
  };

  return (
    <button
      className={`${
        !isSelected?.[name]
          ? styleType[type || "primary"]
          : styleType["primary"]
      } ${styleSize[size || "md"]} ${defaultStyles}`}
      onClick={onClickHandler && onClickHandler}
    >
      {beforeIcon && beforeIcon}
      {name}
    </button>
  );
};

export default Button;
