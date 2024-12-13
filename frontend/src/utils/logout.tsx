import axios from "axios";
import { NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";

async function logout(navigate: NavigateFunction) {
  const result = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/auth/logout`
  );

  if (result.data.success) {
    toast.info("Logged out successfully");
    navigate("/auth");
  }
}

export default logout;
