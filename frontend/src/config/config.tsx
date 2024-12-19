import { ChangeEvent } from "react";
import Eye from "../components/Icons/Eye";
import EyeSlash from "../components/Icons/EyeSlash";

interface inputBoxPropsType {
  placeholder: string;
  isHidden?: boolean;
  switchIsHidden?: () => void;
  isPassInput?: true;
  reference?: React.RefObject<HTMLInputElement>;
  val?: string | string[];
  onChangeHandler?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const InputBox = ({
  placeholder,
  isHidden,
  switchIsHidden,
  isPassInput,
  reference,
  val,
  onChangeHandler,
}: inputBoxPropsType) => {
  return (
    <div className="relative">
      <input
        placeholder={placeholder}
        type={isHidden ? "password" : "text"}
        className="border border-text-primary px-2 py-1 rounded-md w-full  cursor-text"
        ref={reference}
        value={val && val}
        onChange={onChangeHandler}
      ></input>
      {isPassInput && (
        <div
          className="absolute top-1 right-4 cursor-pointer text-text-primary"
          onClick={switchIsHidden}
        >
          {isHidden ? <Eye /> : <EyeSlash />}
        </div>
      )}
    </div>
  );
};

export const shareModalText = `Share your entire collection of notes, documents, tweets, and
              videos with others. They'll be able to import your content into
              their own Second Brain.`;

export const deleteModalText = `Are You Sure To Delete?`;

export const shareModalTitle = `Share Your Second Brain`;

export const deleteModalTitle = `Delete Content`;
