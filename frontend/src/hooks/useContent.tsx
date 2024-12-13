import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
axios.defaults.withCredentials = true;

const useContent = (path: string) => {
  const [content, setContent] = useState();

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
        setContent(result.data.data);
        toast.success("content fetched successfully");
      } else {
        toast.warning("Add atleast one content!");
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.error(error);
    }
  }

  useEffect(() => {
    getContent();
  }, []);
  return content;
};

export default useContent;
