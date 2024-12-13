import { useState } from "react";
import AuthForm from "../components/ui/AuthForm";
import Button from "../components/ui/Button";
import AppTitle from "../components/ui/AppTitle";
import { ToastContainer } from "react-toastify";

const Auth = () => {
  const [isSignUpPage, setIsSignUpPage] = useState(true);

  function switchTab() {
    setIsSignUpPage((curr) => !curr);
  }

  return (
    <div className="bg-bg-main h-screen">
      <div className="w-full flex justify-between py-4 px-8">
        <AppTitle />
        <Button
          name={isSignUpPage ? "Signin" : "Signup"}
          type="primary"
          size="lg"
          onClickHandler={switchTab}
        />
      </div>

      <div className="h-3/4 w-screen flex justify-center items-center">
        <AuthForm isSignUpPage={isSignUpPage} switchTab={switchTab} />
      </div>
      <ToastContainer autoClose={5000} closeOnClick position="bottom-right" />
    </div>
  );
};

export default Auth;
