import Button from "./Button";
import Close from "../Icons/Close";
import { RefObject, useRef, useState } from "react";
import axios from "axios";
import { InputBox } from "../../config/config";
import { contentTypes } from "../../config/contentTypes";
import CirclePlus from "../Icons/CirclePlus";
import createContent from "../../utils/createContent";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../config/redux/store";

axios.defaults.withCredentials = true;

interface AddContentModalProps {
  isModalOpen: boolean;
  onModalClose: () => void;
  addItem?: () => void;
}

function addContent(
  titleRef: RefObject<HTMLInputElement>,
  linkRef: RefObject<HTMLInputElement>,
  tagRef: RefObject<HTMLInputElement>,
  isSelected: Record<string, boolean>,
  onModalClose: () => void,
  dispatch: AppDispatch
) {
  const inputTitle = titleRef.current?.value ?? "";
  const inputLink = linkRef.current?.value ?? "";
  const tags = tagRef.current?.value ?? "";
  const tagsArr = tags
    .trim()
    .split(",")
    .filter((tag) => tag);
  const contentType = Object.keys(isSelected).find(
    (key) => isSelected[key] === true
  );

  if (inputTitle && contentType) {
    createContent(
      inputTitle,
      inputLink,
      contentType,
      tagsArr,
      onModalClose,
      dispatch
    );
  }
}

const AddContentModal = ({
  isModalOpen,
  onModalClose,
}: AddContentModalProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const tagRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  interface IsSelected {
    [key: string]: boolean;
  }

  const [isSelected, setIsSelected] = useState<IsSelected>({
    YouTube: true,
    "Twitter/X": false,
    Document: false,
  });

  function switchType(e: React.MouseEvent<HTMLButtonElement>) {
    const selected = e.currentTarget.innerText;
    setIsSelected((curr) => {
      // Update state to set the selected key to true, and others to false
      return Object.keys(curr).reduce((newState, key) => {
        newState[key] = key === selected; // True for selected, false for others
        return newState;
      }, {} as IsSelected);
    });
  }

  return (
    isModalOpen && (
      <div className=" fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-60 overflow-y-hidden z-50">
        <div
          className="flex w-full h-full justify-center items-center"
          onClick={(e: React.MouseEvent<HTMLDivElement>) => {
            if (e.target !== e.currentTarget) return;
            onModalClose();
          }}
        >
          <div className="w-96 bg-white  flex flex-col rounded-md">
            <div className="p-4 flex justify-between items-center text-text-primary">
              <h3 className="text-lg font-semibold">Add Content</h3>
              <div onClick={onModalClose}>
                <Close />
              </div>
            </div>
            <div className="flex flex-col gap-6 px-4 pt-2 pb-8">
              <InputBox
                placeholder={"Title of the content..."}
                reference={titleRef}
              />
              <InputBox
                placeholder={"URL of the content..."}
                reference={linkRef}
              />
              <div className="flex flex-wrap gap-2">
                {contentTypes.map(({ icon, name }) => (
                  <Button
                    name={name}
                    type="secondary"
                    size="sm"
                    beforeIcon={icon}
                    isSelected={isSelected}
                    onClickHandler={switchType}
                    key={name}
                  />
                ))}
              </div>
              <div>
                <InputBox
                  placeholder={"Tags (seperated by comma ',' )"}
                  reference={tagRef}
                />
              </div>
              <Button
                name="Add Content"
                size="md"
                type="primary"
                beforeIcon={<CirclePlus />}
                onClickHandler={() =>
                  addContent(
                    titleRef,
                    linkRef,
                    tagRef,
                    isSelected,
                    onModalClose,
                    dispatch
                  )
                }
              ></Button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default AddContentModal;
