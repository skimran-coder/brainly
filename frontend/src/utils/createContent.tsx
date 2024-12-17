import axios from "axios";
import { toast } from "react-toastify";
import { addContent } from "../config/redux/contentSlice";
import { AppDispatch } from "../config/redux/store";

async function createContent(
  inputTitle: string,
  inputLink: string,
  contentType: string,
  tagsArr: string[],
  onModalClose: () => void,
  dispatch: AppDispatch
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
      // @ts-expect-error "need to make a globals.d.ts"
      if (window.twttr && window.twttr.widgets) {
        console.log("re run script");
        // @ts-expect-error "need to make a globals.d.ts"
        window.twttr.widgets.load();
      }
      onModalClose();
      toast.success("content added successfully!", {
        autoClose: 3000, // 3 seconds
      });
    }
  } catch (error) {
    toast.error((error as Error).message || "Error creating content");
    console.error(error);
  }
}

export default createContent;
