import axios from "axios";
import { useEffect, useState } from "react";
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
    setContent(result.data.data);
  }

  useEffect(() => {
    getContent();
  }, []);
  console.log(content);
  return content;
};
