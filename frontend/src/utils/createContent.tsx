import axios from "axios";
import { toast } from "react-toastify";
import { addContent } from "../config/redux/contentSlice";

async function createContent(
  inputTitle,
  inputLink,
  contentType,
  tagsArr,
  onModalClose,
  dispatch
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
      dispatch(addContent(result.data.data));
      if (window.twttr && window.twttr.widgets) {
        console.log("re run script")
        window.twttr.widgets.load();
      }
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
