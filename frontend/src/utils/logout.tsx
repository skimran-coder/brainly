import axios from "axios";
import { NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";
import { removeUser } from "../config/redux/userSlice";

async function logout(navigate: NavigateFunction, dispatch) {
  const result = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/auth/logout`
  );

  if (result.data.success) {
    toast.info("Logged out successfully");
    dispatch(removeUser());
    localStorage.removeItem("isLoggedIn");
    navigate("/auth");
  }
}

export default logout;