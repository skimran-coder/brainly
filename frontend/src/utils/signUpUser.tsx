import axios from "axios";
import validateUserInput from "./validateUserInput";
import { toast } from "react-toastify";

async function signUpUser(
  usernameRef,
  emailRef,
  passwordRef,
  setInputErrorMsg,
  switchTab
) {
  const username = usernameRef.current.value;
  const email = emailRef.current.value;
  const password = passwordRef.current.value;

  const errorMsg = validateUserInput(username, email, password);

  if (errorMsg) {
    setInputErrorMsg(errorMsg);
    return;
  }

  try {
    const result = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/auth/signup`,
      {
        username,
        email,
        password,
      }
    );

    if (result.data.success) {
      switchTab();
    }
  } catch (error) {
    setInputErrorMsg(error.response.data.message);
    toast.error(error.response.data.message);
    console.error(error);
  }
}

export default signUpUser;
