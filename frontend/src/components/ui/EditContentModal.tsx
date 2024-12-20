import { RefObject, useRef, useState } from "react";
import Close from "../Icons/Close";
import { InputBox } from "../../config/config";
import { contentTypes } from "../../config/contentTypes";
import Button from "./Button";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateContent } from "../../config/redux/contentSlice";
import { AppDispatch } from "../../config/redux/store";

axios.defaults.withCredentials = true;

function editContent(
  titleRef: RefObject<HTMLInputElement>,
  linkRef: RefObject<HTMLInputElement>,
  isSelected: {
    YouTube: boolean;
    "Twitter/X": boolean;
    Document: boolean;
  },
  tagRef: RefObject<HTMLInputElement>,
  closeEditModal: () => void,
  contentId: string,
  dispatch: AppDispatch
) {
  const inputTitle: string = titleRef.current?.value ?? "";
  const inputLink: string = linkRef.current?.value ?? "";
  const tags = tagRef.current?.value ?? "";
  const tagsArr: string[] = tags
    .trim()
    .split(",")
    .filter((tag: string) => tag);
  const contentType = Object.keys(isSelected).find(
    // @ts-expect-error "will fix"
    (key) => isSelected[key] === true
  );

  if (inputTitle && inputLink && contentType) {
    createContent(
      inputTitle,
      inputLink,
      contentType,
      tagsArr,
      closeEditModal,
      contentId,
      dispatch
    );
  }

  async function createContent(
    inputTitle: string,
    inputLink: string,
    contentType: string,
    tagsArr: string[],
    closeEditModal: () => void,
    contentId: string,
    dispatch: AppDispatch
  ) {
    const result = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/content/${contentId}`,
      {
        title: inputTitle,
        link: inputLink,
        type: contentType,
        tags: tagsArr,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    if (result.data.success) {
      dispatch(updateContent(result.data.data));
      // @ts-expect-error "need to make a globals.d.ts"
      if (window.twttr && window.twttr.widgets) {
        // @ts-expect-error "need to make a globals.d.ts"
        window.twttr.widgets.load();
      }
      closeEditModal();
      toast.success("content updated successfully!", {
        autoClose: 3000, // 3 seconds
      });
    }
  }
}

interface editContentModalProps {
  isEditModalOpen: boolean;
  closeEditModal: () => void;
  title: string;
  link: string;
  type: string;
  tags: string[] | string | undefined;
  contentId: string;
}

const EditContentModal = ({
  isEditModalOpen,
  closeEditModal,
  title,
  link,
  type,
  tags,
  contentId,
}: editContentModalProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const tagRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const [currTitle, setCurrTitle] = useState(title);
  const [currLink, setCurrLink] = useState(link);
  const [currTags, setCurrTags] = useState(tags);

  function changeTitle(e: React.ChangeEvent<HTMLInputElement>) {
    setCurrTitle(e.target.value);
  }

  function changeLink(e: React.ChangeEvent<HTMLInputElement>) {
    setCurrLink(e.target.value);
  }
  function changeTags(e: React.ChangeEvent<HTMLInputElement>) {
    setCurrTags(e.target.value);
  }

  interface IsSelected {
    YouTube: boolean;
    "Twitter/X": boolean;
    Document: boolean;
  }

  const [isSelected, setIsSelected] = useState<IsSelected>({
    YouTube: type === "YouTube",
    "Twitter/X": type === "Twitter/X",
    Document: type === "Document",
  });

  function switchType(e: React.MouseEvent<HTMLButtonElement>) {
    const selected = e.currentTarget.innerText;
    setIsSelected((curr) => {
      // Update state to set the selected key to true, and others to false
      return Object.keys(curr).reduce((newState, key) => {
        newState[key as keyof IsSelected] = key === selected; // True for selected, false for others
        return newState;
      }, {} as IsSelected);
    });
  }

  return (
    isEditModalOpen && (
      <div className=" fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-60 overflow-y-hidden z-50">
        <div
          className="flex w-full h-full justify-center items-center"
          onClick={(e: React.MouseEvent<HTMLDivElement>) => {
            if (e.target !== e.currentTarget) return;
            closeEditModal();
          }}
        >
          <div className="w-96 bg-white  flex flex-col rounded-md">
            <div className="p-4 flex justify-between items-center">
              <h3 className="text-lg">Edit Content</h3>
              <div onClick={closeEditModal}>
                <Close />
              </div>
            </div>
            <div className="flex flex-col gap-6 px-4 pt-2 pb-8">
              <InputBox
                placeholder={"Title of the content..."}
                reference={titleRef}
                val={currTitle}
                onChangeHandler={changeTitle}
              />
              <InputBox
                placeholder={"URL of the content..."}
                reference={linkRef}
                val={currLink}
                onChangeHandler={changeLink}
              />
              <div className="flex gap-2">
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
              <InputBox
                placeholder="Tags (seperated by comma ',' )"
                reference={tagRef}
                val={currTags}
                onChangeHandler={changeTags}
              />
              <Button
                name="Update"
                size="md"
                type="primary"
                onClickHandler={() =>
                  editContent(
                    titleRef,
                    linkRef,
                    isSelected,
                    tagRef,
                    closeEditModal,
                    contentId,
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

export default EditContentModal;
