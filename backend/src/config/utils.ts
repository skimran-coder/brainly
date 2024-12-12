export function genHash(len: number) {
  const allowedValue = "azxnvkfjasdfsloiewt1234567890rqopwruit";

  let hash = "";

  for (let i = 0; i < len; i++) {
    const element =
      allowedValue[Math.floor(Math.random() * allowedValue.length)];
    hash = hash + element;
  }

  return hash;
}
