import axios from "axios";
import { toast } from "react-toastify";
import validator from "validator";
import { addUser } from "../config/redux/userSlice";

async function signInUser(
  usernameRef,
  passwordRef,
  setInputErrorMsg,
  navigate,
  dispatch
) {
  const usernameOrEmail = usernameRef.current.value;
  const password = passwordRef.current.value;

  if (!validator.isStrongPassword(password)) {
    setInputErrorMsg("password must be strong.");
    return;
  }

  try {
    const result = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/auth/signin`,
      {
        username: usernameOrEmail,
        email: usernameOrEmail,
        password,
      }
    );

    if (result.data.success) {
      console.log(result.data.data);
      dispatch(addUser(result.data.data));
      localStorage.setItem("isLoggedIn", result.data.data.email);
      navigate("/dashboard");
    }
  } catch (error) {
    console.error(error);
    setInputErrorMsg(error.response.data.message);
    toast.error(error.response.data.message);
  }
}

export default signInUser;
