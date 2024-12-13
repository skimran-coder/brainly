import Document from "../components/Icons/Document";
import Eye from "../components/Icons/Eye";
import EyeSlash from "../components/Icons/EyeSlash";
import Twitter from "../components/Icons/Twitter";
import YouTube from "../components/Icons/YouTube";

interface inputBoxPropsType {
  placeholder: string;
  isHidden?: boolean;
  switchIsHidden?: () => void;
  isPassInput?: true;
  reference?: any;
  val?: string;
  onChangeHandler?: () => void;
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
        className="border border-text-primary px-2 py-1 rounded-md w-full"
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

export const contentTypes = [
  {
    name: "YouTube",
    icon: <YouTube />,
  },
  {
    name: "Twitter/X",
    icon: <Twitter />,
  },
  {
    name: "Document",
    icon: <Document />,
  },
];

export function selectType(e, setIsSelected) {
  const selected = e.target.innerText; // The key that should be set to true

  setIsSelected((curr) => {
    // Update state to set the selected key to true, and others to false
    return Object.keys(curr).reduce((newState, key) => {
      newState[key] = key === selected; // True for selected, false for others
      return newState;
    }, {});
  });
}

export const shareModalText = `Share your entire collection of notes, documents, tweets, and
              videos with others. They'll be able to import your content into
              their own Second Brain.`;

export const deleteModalText = `Are You Sure To Delete?`;

export const shareModalTitle = `Share Your Second Brain`;

export const deleteModalTitle = `Delete Content`;
