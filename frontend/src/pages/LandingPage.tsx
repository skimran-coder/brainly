import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";

const LandingPage = () => {
  const navigate = useNavigate();

  const redirectToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="h-screen bg-bg-main flex flex-col items-center justify-center px-6">
      {/* App Title */}
      <h1 className="text-4xl sm:text-6xl font-extrabold text-text-primary text-center mb-6 py-4">
        Welcome to <span className="text-bg-primaryBtn">Brainly</span>
      </h1>

      {/* Subtitle */}
      <p className="text-lg sm:text-xl text-text-secondary text-center mb-8 max-w-2xl">
        Organize your ideas, save valuable content, and build your second brain.
        With Brainly, you can collect, categorize, and easily retrieve
        information—and even share your brain with anyone around the world!
      </p>

      {/* Call-to-Action Button */}
      <Button
        name="Get Started"
        type="primary"
        size="lg"
        onClickHandler={redirectToDashboard}
      />
    </div>
  );
};

export default LandingPage;
