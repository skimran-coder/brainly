import axios from "axios";
import { toast } from "react-toastify";
import validator from "validator";
import { addUser } from "../config/redux/userSlice";
import { AppDispatch } from "../config/redux/store";
import { NavigateFunction } from "react-router-dom";

async function signInUser(
  usernameRef: React.RefObject<HTMLInputElement>,
  passwordRef: React.RefObject<HTMLInputElement>,
  setInputErrorMsg: React.Dispatch<React.SetStateAction<string>>,
  navigate: NavigateFunction,
  dispatch: AppDispatch
) {
  const usernameOrEmail = usernameRef.current?.value ?? "";
  const password = passwordRef.current?.value ?? "";

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
    // @ts-expect-error "need to figure out type"
    setInputErrorMsg(error.response.data.message);
    toast.error((error as Error).message || "Error signing in");
  }
}

export default signInUser;
