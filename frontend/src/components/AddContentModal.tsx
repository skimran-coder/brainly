import Button from "./Button";
import Close from "../Icons/Close";
import YouTube from "../Icons/YouTube";
import Twitter from "../Icons/Twitter";
import Document from "../Icons/Document";
import { useRef, useState } from "react";
import axios from "axios";
import { InputBox } from "../config/config";
import { ToastContainer, toast } from "react-toastify";

axios.defaults.withCredentials = true;

interface AddContentModalProps {
  isModalOpen: boolean;
  onClose: () => void;
}

const contentTypes = [
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

function addContent(titleRef, linkRef, isSelected, onClose) {
  const inputTitle = titleRef.current.value;
  const inputLink = linkRef.current.value;
  const contentType = Object.keys(isSelected).find(
    (key) => isSelected[key] === true
  );

  if (inputTitle && inputLink && contentType) {
    createContent(inputTitle, inputLink, contentType, onClose);
  }

  async function createContent(inputTitle, inputLink, contentType, onClose) {
    const result = await axios.post(
      `http://localhost:7777/api/v1/content/`,
      {
        title: inputTitle,
        link: inputLink,
        type: contentType,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    if (result.data.success) {
      onClose();
      toast.success("content added successfully!", {
        autoClose: 3000, // 3 seconds
      });
    }
  }
}

const AddContentModal = ({ isModalOpen, onClose }: AddContentModalProps) => {
  const titleRef = useRef();
  const linkRef = useRef();

  const [isSelected, setIsSelected] = useState({
    YouTube: true,
    "Twitter/X": false,
    Document: false,
  });

  function selectType(e) {
    const selected = e.target.innerText; // The key that should be set to true

    setIsSelected((curr) => {
      // Update state to set the selected key to true, and others to false
      return Object.keys(curr).reduce((newState, key) => {
        newState[key] = key === selected; // True for selected, false for others
        return newState;
      }, {});
    });
  }

  return (
    isModalOpen && (
      <div className=" fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-60 overflow-y-hidden">
        <div className="flex w-full h-full justify-center items-center">
          <div className="w-96 bg-white  flex flex-col rounded-md">
            <div className="p-4 flex justify-between items-center">
              <h3 className="text-lg">Add Content</h3>
              <div onClick={onClose}>
                <Close />
              </div>
            </div>
            <div className="flex flex-col gap-6 px-4 pt-2 pb-8">
              <InputBox
                placeholder={"title of the content..."}
                reference={titleRef}
              />
              <InputBox
                placeholder={"link of the content..."}
                reference={linkRef}
              />
              <div className="flex gap-2">
                {contentTypes.map(({ icon, name }) => (
                  <Button
                    name={name}
                    type="secondary"
                    size="sm"
                    beforeIcon={icon}
                    isSelected={isSelected}
                    onClickHandler={selectType}
                    key={name}
                  />
                ))}
              </div>
              <Button
                name="Submit"
                size="md"
                type="primary"
                onClickHandler={() =>
                  addContent(titleRef, linkRef, isSelected, onClose)
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
