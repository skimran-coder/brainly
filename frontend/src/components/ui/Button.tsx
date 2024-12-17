import { ReactElement } from "react";

interface buttonProps {
  name: string;
  type?: "primary" | "secondary";
  size?: "lg" | "md" | "sm";
  beforeIcon?: ReactElement;
  isSelected?: {
    YouTube?: boolean;
    "Twitter/X"?: boolean;
    Document?: boolean;
  };
  onClickHandler?: (e: React.MouseEvent<HTMLButtonElement>) => void;
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
    lg: "lg:px-6 lg:py-2 lg:text-lg md:px-4 md:py-2 md:text-base px-3 py-1 text-base",
  };

  const styleType = {
    primary: "bg-bg-primaryBtn text-white",
    secondary: "bg-bg-secondaryBtn text-text-secondaryBtn",
  };

  return (
    <button
      className={`${
        // @ts-expect-error "will fix the type issue"
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
