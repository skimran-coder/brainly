import { Link } from "react-router-dom";
import errorImg from "../assets/404.jpg";

const NotFound = () => {
  return (
    <div className="h-screen  flex flex-col justify-center items-center text-center">
      <img src={errorImg} className="w-96"></img>
      {/* <h1 className="text-6xl font-bold text-text-primary mb-4 py-4">404</h1> */}
      <p className="text-lg text-text-secondary  mb-6">
        The page you're looking for doesn't exist.
      </p>
      <Link to="/">
        <button className="bg-bg-primaryBtn text-text-primaryBtn px-6 py-3 rounded-lg shadow-md hover:bg-indigo-600 transition">
          Go Back to Dashboard
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
