import React, { useRef, useState } from "react";
import Close from "../Icons/Close";
import { contentTypes, InputBox, selectType } from "../../config/config";
import Button from "./Button";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateContent } from "../../config/redux/contentSlice";

axios.defaults.withCredentials = true;

function editContent(
  titleRef,
  linkRef,
  isSelected,
  tagRef,
  closeEditModal,
  contentId,
  dispatch
) {
  const inputTitle = titleRef.current.value;
  const inputLink = linkRef.current.value;
  const tags = tagRef.current.value;
  const tagsArr = tags
    .trim()
    .split(",")
    .filter((tag) => tag);
  const contentType = Object.keys(isSelected).find(
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
    inputTitle,
    inputLink,
    contentType,
    tagsArr,
    closeEditModal,
    contentId,
    dispatch
  ) {
    const result = await axios.put(
      `http://localhost:7777/api/v1/content/${contentId}`,
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
      closeEditModal();
      toast.success("content updated successfully!", {
        autoClose: 3000, // 3 seconds
      });
    }
  }
}

const EditContentModal = ({
  isEditModalOpen,
  closeEditModal,
  title,
  link,
  type,
  tags,
  contentId,
}) => {
  const titleRef = useRef();
  const linkRef = useRef();
  const tagRef = useRef();
  const dispatch = useDispatch();

  const [currTitle, setCurrTitle] = useState(title);
  const [currLink, setCurrLink] = useState(link);
  const [currTags, setCurrTags] = useState(tags);

  function changeTitle(e) {
    setCurrTitle(e.target.value);
  }

  function changeLink(e) {
    setCurrLink(e.target.value);
  }
  function cahngeTags(e) {
    setCurrTags(e.target.value);
  }

  const [isSelected, setIsSelected] = useState({
    YouTube: type === "YouTube",
    "Twitter/X": type === "Twitter/X",
    Document: type === "Document",
  });

  return (
    isEditModalOpen && (
      <div className=" fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-60 overflow-y-hidden">
        <div className="flex w-full h-full justify-center items-center">
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
                    onClickHandler={(e) => selectType(e, setIsSelected)}
                    key={name}
                  />
                ))}
              </div>
              <InputBox
                placeholder="tags"
                reference={tagRef}
                val={currTags}
                onChangeHandler={cahngeTags}
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
