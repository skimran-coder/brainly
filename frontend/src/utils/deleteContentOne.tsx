import axios from "axios";
import { toast } from "react-toastify";

async function deleteContentOne(_id: string, closeModal: () => void) {
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
      toast.error("content deleted successfully!");
      closeModal();
    }
  } catch (error) {
    toast.error(error.response.data.message);
    console.error(error);
  }
}

export default deleteContentOne;
