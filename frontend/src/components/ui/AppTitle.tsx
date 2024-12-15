
import Brain from "../Icons/Brain";
import { useNavigate } from "react-router-dom";

const AppTitle = () => {
  const navigate = useNavigate();

  return (
    <div
      className="flex items-center gap-2 cursor-pointer"
      onClick={() => navigate("/")}
    >
      <Brain />
      <h1 className="text-text-primary font-semibold text-2xl">Brainly</h1>
    </div>
  );
};

export default AppTitle;
