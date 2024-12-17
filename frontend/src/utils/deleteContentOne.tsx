import axios from "axios";
import { toast } from "react-toastify";
import { removeContent } from "../config/redux/contentSlice";
import { AppDispatch } from "../config/redux/store";

async function deleteContentOne(
  _id: string,
  closeModal: () => void,
  dispatch: AppDispatch
) {
  try {
    const result = await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/content/${_id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (result.data.success) {
      dispatch(removeContent(_id));
      toast.error("content deleted successfully!");
      closeModal();
    }
  } catch (error) {
    toast.error((error as Error).message || "Error deleting content");
    console.error(error);
  }
}

export default deleteContentOne;
