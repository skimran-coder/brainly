import React from "react";
import Button from "./Button";
import Close from "../Icons/Close";

interface AddContentModalProps {
  isModalOpen: boolean;
  onClose: () => void;
}

const InputBox = ({ placeholder }) => {
  return (
    <input
      placeholder={placeholder}
      className="border border-text-primary px-2 py-1  rounded-md "
    ></input>
  );
};

const AddContentModal = ({ isModalOpen, onClose }: AddContentModalProps) => {
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
              <InputBox placeholder={"title of the content..."} />
              <InputBox placeholder={"link of the content..."} />
              <Button name="Submit" size="md" type="primary"></Button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default AddContentModal;
