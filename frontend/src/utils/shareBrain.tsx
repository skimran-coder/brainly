import axios from "axios";
import { Location } from "react-router-dom";
import { toast } from "react-toastify";

interface shareBrainProps {
  share: boolean;
  closeModal: () => void;
  location?: Location;
}

async function shareBrain({ share, closeModal, location }: shareBrainProps) {
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
    if (!location?.pathname) {
      return;
    }
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
