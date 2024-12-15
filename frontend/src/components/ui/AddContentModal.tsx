import Button from "./Button";
import Close from "../Icons/Close";
import { useRef, useState } from "react";
import axios from "axios";
import { contentTypes, InputBox, selectType } from "../../config/config";
import CirclePlus from "../Icons/CirclePlus";
import createContent from "../../utils/createContent";
import { ta } from "date-fns/locale";

axios.defaults.withCredentials = true;

interface AddContentModalProps {
  isModalOpen: boolean;
  onModalClose: () => void;
}

function addContent(titleRef, linkRef, tagRef, isSelected, onModalClose) {
  const inputTitle = titleRef.current.value;
  const inputLink = linkRef.current.value;
  const tags = tagRef.current.value;
  const tagsArr = tags
    .trim()
    .split(",")
    .filter((tag) => tag);
  console.log(tagsArr);
  const contentType = Object.keys(isSelected).find(
    (key) => isSelected[key] === true
  );

  if (inputTitle && inputLink && contentType) {
    createContent(inputTitle, inputLink, contentType, tagsArr, onModalClose);
  }
}

const AddContentModal = ({
  isModalOpen,
  onModalClose,
}: AddContentModalProps) => {
  const titleRef = useRef();
  const linkRef = useRef();
  const tagRef = useRef();

  const [isSelected, setIsSelected] = useState({
    YouTube: true,
    "Twitter/X": false,
    Document: false,
  });

  return (
    isModalOpen && (
      <div className=" fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-60 overflow-y-hidden">
        <div className="flex w-full h-full justify-center items-center">
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
                    onClickHandler={(e) => selectType(e, setIsSelected)}
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
                    onModalClose
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
