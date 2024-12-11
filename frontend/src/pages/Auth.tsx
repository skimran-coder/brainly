import React, { useState } from "react";
import AuthForm from "../components/AuthForm";

const Auth = () => {
  const [isSignUpPage, setIsSignUpPage] = useState(true);

  function switchTab() {
    setIsSignUpPage((curr) => !curr);
  }

  return (
    <div className="h-screen w-screen bg-bg-main flex justify-center items-center">
      <AuthForm isSignUpPage={isSignUpPage} switchTab={switchTab} />
    </div>
  );
};

export default Auth;
