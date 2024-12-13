import React from "react";
import Brain from "../Icons/Brain";

const AppTitle = () => {
  return (
    <div className="flex items-center gap-2">
      <Brain />
      <h1 className="text-text-primary font-semibold text-2xl">Brainly</h1>
    </div>
  );
};

export default AppTitle;
