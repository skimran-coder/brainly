import axios from "axios";
import { toast } from "react-toastify";
import validator from "validator";

async function signInUser(
  usernameRef,
  passwordRef,
  setInputErrorMsg,
  navigate
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
      navigate("/dashboard");
    }
  } catch (error) {
    setInputErrorMsg(error.response.data.message);
    toast.error(error.response.data.message);
    console.error(error);
  }
}

export default signInUser;
