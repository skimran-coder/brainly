import Close from "../Icons/Close";
import Button from "./Button";
import Copy from "../Icons/Copy";
import Delete from "../Icons/Delete";
import deleteContentOne from "../../utils/deleteContentOne";
import shareBrain from "../../utils/shareBrain";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

interface PopUpModalProps {
  isShareModal?: boolean;
  isDeleteModal?: boolean;
  closeModal: () => void;
  text: string;
  title: string;
  contentId?: string;
}

const PopUpModal = ({
  isShareModal,
  isDeleteModal,
  closeModal,
  text,
  title,
  contentId,
}: PopUpModalProps) => {
  const location = useLocation();
  const dispatch = useDispatch();

  return (
    <div className=" fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-60 overflow-y-hidden z-50">
      <div
        className="flex  w-full h-full  justify-center items-center"
        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
          if (e.target !== e.currentTarget) return;
          closeModal();
        }}
      >
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
                  onClickHandler={() =>
                    shareBrain({
                      share: true,
                      closeModal,
                    })
                  }
                />
                <Button
                  name="Share Brain"
                  size="md"
                  type="primary"
                  beforeIcon={<Copy />}
                  onClickHandler={() =>
                    shareBrain({
                      share: true,
                      closeModal,
                      location,
                    })
                  }
                />
              </div>
            )}

            {isDeleteModal && (
              <Button
                name="Delete"
                type="primary"
                size="md"
                beforeIcon={<Delete />}
                onClickHandler={() =>
                  deleteContentOne(contentId!, closeModal, dispatch)
                }
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUpModal;
