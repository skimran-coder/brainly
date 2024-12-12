import React from "react";
import Close from "../Icons/Close";
import Button from "./Button";
import Copy from "../Icons/Copy";
import Delete from "../Icons/Delete";
import axios from "axios";
import { toast } from "react-toastify";

async function deleteContentOne(_id: string, closeModal) {
  const result = await axios.delete(
    `http://localhost:7777/api/v1/content/${_id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );

  if (result.data.success) {
    toast.error("content deleted successfully!");
    closeModal();
  }
}

const PopUpModal = ({
  isShareModal,
  isDeleteModal,
  closeModal,
  text,
  title,
  contentId,
}) => {
  async function shareBrain(share: boolean) {
    const result = await axios.post(
      "http://localhost:7777/api/v1/brain/share",
      {
        share,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (share) {
      toast.success("Brain shared successfully!");

      const hash = result.data.data.hash;

      navigator.clipboard.writeText(
        `http://localhost:7777/api/v1/brain/share/${hash}`
      );

      toast.info("Copied to clipboard");
    } else {
      toast.error("Shared URL deleted successfully!");
    }

    closeModal();
  }

  return (
    <div className=" fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-60 overflow-y-hidden">
      <div className="flex  w-full h-full  justify-center items-center">
        <div
          className={`${
            isDeleteModal ? "w-72" : "w-96"
          } py-4 px-4 bg-white flex flex-col  rounded-md`}
        >
          <div className="pb-4 flex justify-between items-center">
            <h3 className="text-lg font-semibold">{title}</h3>
            <div onClick={closeModal}>
              <Close />
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <p className="text-sm">{text}</p>
            {isShareModal && (
              <div className="flex justify-around">
                <Button
                  name="Remove Brain"
                  size="md"
                  type="secondary"
                  beforeIcon={<Delete />}
                  onClickHandler={() => shareBrain(false)}
                />
                <Button
                  name="Share Brain"
                  size="md"
                  type="primary"
                  beforeIcon={<Copy />}
                  onClickHandler={() => shareBrain(true)}
                />
              </div>
            )}

            {isDeleteModal && (
              <Button
                name="Delete"
                type="primary"
                size="md"
                beforeIcon={<Delete />}
                onClickHandler={() => deleteContentOne(contentId, closeModal)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUpModal;
