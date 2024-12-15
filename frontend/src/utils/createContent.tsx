import axios from "axios";
import { ta } from "date-fns/locale";
import { toast } from "react-toastify";

async function createContent(
  inputTitle,
  inputLink,
  contentType,
  tagsArr,
  onModalClose
) {
  try {
    const result = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/content`,
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
      onModalClose();
      toast.success("content added successfully!", {
        autoClose: 3000, // 3 seconds
      });
    }
  } catch (error) {
    toast.error(error.response.data.message);
    console.error(error);
  }
}

export default createContent;
