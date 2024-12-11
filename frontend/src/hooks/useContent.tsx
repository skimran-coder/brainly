import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
axios.defaults.withCredentials = true;

export const useContent = () => {
  const [content, setContent] = useState();

  async function getContent() {
    const result = await axios.get(`http://localhost:7777/api/v1/content/`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    if (result.data.success) {
      setContent(result.data.data);
      toast.success("content fetched successfully");
    } else {
      toast.warning("Add atleast one content!");
    }
  }

  useEffect(() => {
    getContent();
  }, []);
  return content;
};
