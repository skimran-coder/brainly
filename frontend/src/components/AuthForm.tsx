import { useRef } from "react";
import { InputBox } from "../config/config";
import Button from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import validator from "validator";

interface authFormPropsType {
  isSignUpPage: boolean;
  switchTab: () => void;
}

const AuthForm = ({ isSignUpPage, switchTab }: authFormPropsType) => {
  const navigate = useNavigate();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  async function signUpUser(usernameRef, emailRef, passwordRef) {
    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const result = await axios.post(
      "http://localhost:7777/api/v1/auth/signup",
      {
        username,
        email,
        password,
      }
    );

    if (result.data.success) {
      switchTab();
    }
  }

  async function signInUser(usernameRef, passwordRef) {
    // validator.isEmail(usernameRef.current.value);

    const usernameOrEmail = usernameRef.current.value;
    const password = passwordRef.current.value;

    const result = await axios.post(
      "http://localhost:7777/api/v1/auth/signin",
      {
        username: usernameOrEmail,
        email: usernameOrEmail,
        password,
      }
    );

    if (result.data.success) {
      navigate("/dashboard");
    }
  }

  return (
    <div className="bg-white w-full max-w-[450px] px-8 sm:w-3/4 md:w-2/4 lg:w-1/4 p-8 rounded-md shadow-md flex flex-col justify-evenly">
      <div className="pb-4">
        {isSignUpPage ? (
          <div>
            <h1 className="text-2xl font-semibold">Sign up</h1>
            <p className="text-sm pt-1">
              Create an account or{" "}
              <span
                className="text-text-secondaryBtn underline cursor-pointer opacity-80 hover:opacity-100 transition-opacity "
                onClick={switchTab}
              >
                sign in
              </span>
            </p>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-semibold">Sign in</h1>
            <p className="text-sm pt-1">
              Already an existing user or {""}
              <span
                className="text-text-secondaryBtn underline cursor-pointer opacity-80 hover:opacity-100 transition-opacity "
                onClick={switchTab}
              >
                sign up
              </span>
            </p>
          </div>
        )}
      </div>

      <div className=" w-full  flex flex-col gap-4">
        <InputBox
          placeholder={`${isSignUpPage ? "Username" : "Username or Email"}`}
          reference={usernameRef}
        />

        {isSignUpPage && (
          <InputBox placeholder={"Email"} reference={emailRef} />
        )}

        <InputBox placeholder={"Password"} reference={passwordRef} />

        <Button
          name={isSignUpPage ? "Sign Up" : "Sign In"}
          onClickHandler={
            isSignUpPage
              ? () => signUpUser(usernameRef, emailRef, passwordRef)
              : () => signInUser(usernameRef, passwordRef)
          }
        />
      </div>
    </div>
  );
};

export default AuthForm;
