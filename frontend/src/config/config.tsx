interface inputBoxPropsType {
  placeholder: string;
  reference?: any;
}

export const InputBox = ({ placeholder, reference }: inputBoxPropsType) => {
  return (
    <input
      placeholder={placeholder}
      className="border border-text-primary px-2 py-1 rounded-md "
      ref={reference}
    ></input>
  );
};
