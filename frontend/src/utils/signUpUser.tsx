import axios from "axios";
import validateUserInput from "./validateUserInput";
import { toast } from "react-toastify";

async function signUpUser(
  usernameRef: React.RefObject<HTMLInputElement>,
  emailRef: React.RefObject<HTMLInputElement>,
  passwordRef: React.RefObject<HTMLInputElement>,
  setInputErrorMsg: React.Dispatch<React.SetStateAction<string>>,
  switchTab: () => void
) {
  const username = usernameRef.current?.value ?? "";
  const email = emailRef.current?.value ?? "";
  const password = passwordRef.current?.value ?? "";

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
    console.error(error);
    // @ts-expect-error "need to figure out type"
    setInputErrorMsg(error.response.data.message);
    toast.error((error as Error).message || "Error signing up");
  }
}

export default signUpUser;
