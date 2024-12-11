import React, { useState } from "react";

const Auth = () => {
  const [isSignUpPage, setIsSignUpPage] = useState(false);

  return (
    <div>
      <h1>
        {isSignUpPage ? "Signup for new user" : "Signin for existing user"}
      </h1>
    </div>
  );
};

export default Auth;
