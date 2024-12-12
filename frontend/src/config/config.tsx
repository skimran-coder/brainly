import Document from "../Icons/Document";
import Twitter from "../Icons/Twitter";
import YouTube from "../Icons/YouTube";

interface inputBoxPropsType {
  placeholder: string;
  reference?: any;
  val?: string;
  onChangeHandler?: () => void;
}

export const InputBox = ({
  placeholder,
  reference,
  val,
  onChangeHandler,
}: inputBoxPropsType) => {
  return (
    <input
      placeholder={placeholder}
      className="border border-text-primary px-2 py-1 rounded-md "
      ref={reference}
      value={val && val}
      onChange={onChangeHandler}
    ></input>
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
