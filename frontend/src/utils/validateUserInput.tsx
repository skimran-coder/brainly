import validator from "validator";

const validateUserInput = (
  username: string,
  email: string,
  password: string
) => {
  let errorMsg = "";

  if (!validator.isAlphanumeric(username)) {
    errorMsg =
      "username must contain only letters and numbers (a-z, A-Z, 0-9).";
    return errorMsg;
  }
  if (!validator.isEmail(email)) {
    errorMsg = "use a valid email";
    return errorMsg;
  }
  if (!validator.isStrongPassword(password)) {
    errorMsg = "password must be strong.";
    return errorMsg;
  }

  return errorMsg;
};

export default validateUserInput;
