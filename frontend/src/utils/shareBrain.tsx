import axios from "axios";
import { toast } from "react-toastify";

async function shareBrain(share: boolean, closeModal: () => void, location) {
  const result = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/brain/share`,
    {
      share,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );

  if (share) {
    toast.success("Brain shared successfully!");

    const Url = window.location.href;
    const { pathname } = location;
    const hash = result.data.data.hash;

    const publicUrl = Url.replace(pathname, "/brain/");

    navigator.clipboard.writeText(publicUrl + hash);

    toast.info("Copied to clipboard");
  } else {
    toast.error("Shared URL deleted successfully!");
  }

  closeModal();
}

export default shareBrain;
