import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setContentState } from "../config/redux/contentSlice";
axios.defaults.withCredentials = true;

const useContent = (path: string) => {
  const dispatch = useDispatch();

  async function getContent() {
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}${path}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (result.data.success) {
        dispatch(setContentState(result.data.data)); // Dispatch directly
        toast.success("Content fetched successfully");
      } else {
        toast.warning("Add at least one content!");
      }
    } catch (error) {
      toast.error((error as Error).message || "Error fetching content");
      console.error(error);
    }
  }

  useEffect(() => {
    getContent(); // Fetch content on mount
  }, [path]); // Only run when the `path` changes
};

export default useContent;
