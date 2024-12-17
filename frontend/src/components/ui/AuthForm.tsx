import { useRef, useState } from "react";
import { InputBox } from "../../config/config";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import signUpUser from "../../utils/signUpUser";
import signInUser from "../../utils/signInUser";
import { useDispatch } from "react-redux";

interface authFormPropsType {
  isSignUpPage: boolean;
  switchTab: () => void;
}

const AuthForm = ({ isSignUpPage, switchTab }: authFormPropsType) => {
  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [isHidden, setIsHidden] = useState(true);
  const [inputErrorMsg, setInputErrorMsg] = useState<string>("");
  const dispatch = useDispatch();

  function switchIsHidden() {
    setIsHidden((curr) => !curr);
  }

  return (
    <div className="bg-white w-full max-w-[600px] px-8 sm:w-3/4 md:w-5/12 lg:w-4/12 p-8 rounded-md shadow-lg flex flex-col justify-evenly">
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
                    navigate,
                    dispatch
                  )
          }
        />
      </div>
    </div>
  );
};

export default AuthForm;
