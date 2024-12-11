export const InputBox = ({ placeholder, reference }) => {
  return (
    <input
      placeholder={placeholder}
      className="border border-text-primary px-2 py-1  rounded-md "
      ref={reference}
    ></input>
  );
};
