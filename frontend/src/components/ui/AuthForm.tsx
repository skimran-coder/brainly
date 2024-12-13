import { useRef, useState } from "react";
import { InputBox } from "../../config/config";
import Button from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import validateUserInput from "../../utils/validateUserInput";
import validator from "validator";
import { toast } from "react-toastify";
import signUpUser from "../../utils/signUpUser";
import signInUser from "../../utils/signInUser";

interface authFormPropsType {
  isSignUpPage: boolean;
  switchTab: () => void;
}

const AuthForm = ({ isSignUpPage, switchTab }: authFormPropsType) => {
  const navigate = useNavigate();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [isHidden, setIsHidden] = useState(true);
  const [inputErrorMsg, setInputErrorMsg] = useState("");

  function switchIsHidden() {
    setIsHidden((curr) => !curr);
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

        {inputErrorMsg.includes("username") && (
          <span className="text-sm text-red-400">{inputErrorMsg}</span>
        )}

        {isSignUpPage && (
          <InputBox placeholder={"Email"} reference={emailRef} />
        )}

        {inputErrorMsg.includes("email") && (
          <span className="text-sm text-red-400">{inputErrorMsg}</span>
        )}

        <InputBox
          placeholder={"Password"}
          reference={passwordRef}
          isPassInput={true}
          isHidden={isHidden}
          switchIsHidden={switchIsHidden}
        />

        {inputErrorMsg.includes("password") && (
          <span className="text-sm text-red-400">{inputErrorMsg}</span>
        )}

        <Button
          name={isSignUpPage ? "Sign Up" : "Sign In"}
          onClickHandler={
            isSignUpPage
              ? () =>
                  signUpUser(
                    usernameRef,
                    emailRef,
                    passwordRef,
                    setInputErrorMsg,
                    switchTab
                  )
              : () =>
                  signInUser(
                    usernameRef,
                    passwordRef,
                    setInputErrorMsg,
                    navigate
                  )
          }
        />
      </div>
    </div>
  );
};

export default AuthForm;
