import axios from "axios";
import AllContent from "../Icons/AllContent";
import Brain from "../Icons/Brain";
import Close from "../Icons/Close";
import Document from "../Icons/Document";
import Logout from "../Icons/Logout";
import Twitter from "../Icons/Twitter";
import YouTube from "../Icons/YouTube";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AppTitle from "./AppTitle";

const Sidebar = ({
  isSidebarOpen,
  setIsSidebarOpen,
  switchFilter,
  filterContent,
}) => {
  const sideItems = [
    {
      name: "Dashboard",
      icon: <AllContent />,
    },
    {
      name: "Tweets",
      icon: <Twitter />,
    },
    {
      name: "Videos",
      icon: <YouTube />,
    },
    {
      name: "Documents",
      icon: <Document />,
    },
  ];

  const navigate = useNavigate();

  async function logout() {
    const result = await axios.post("http://localhost:7777/api/v1/auth/logout");

    if (result.data.success) {
      toast.info("Logged out successfully");
      navigate("/auth");
    }
  }

  return (
    <div
      className={`lg:w-1/5 md:w-1/4 sm:w-1/3 min-h-screen border border-text-secondary border-opacity-20 md:flex flex-col pl-4 transition-all ${
        isSidebarOpen
          ? "flex absolute z-10  bg-white overflow-hidden"
          : "hidden"
      }`}
    >
      <div className="pt-4 pl-1 lg:pl-8 sm:pl-4 flex items-center justify-between gap-2 pb-8 md:pb-16">
        <AppTitle />
        {isSidebarOpen && (
          <div className="" onClick={() => setIsSidebarOpen(false)}>
            <Close />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-6 sm:pl-4 lg:pl-8">
        {sideItems.map(({ name, icon }) => (
          <ul
            key={name}
            className={`flex gap-2 items-center text-lg cursor-pointer hover:bg-bg-tag px-2 py-1 transition-all rounded-l-lg ${
              filterContent === name && "bg-bg-tag"
            }`}
            onClick={() => switchFilter(name)}
          >
            <div>{icon}</div> <p className="">{name}</p>
          </ul>
        ))}
      </div>

      <div className="flex flex-col gap-6 sm:pl-4 lg:pl-8">
        <ul
          className="flex gap-2 items-center text-lg cursor-pointer hover:bg-bg-tag px-2 mt-20 transition-all rounded-l-lg "
          onClick={() => logout()}
        >
          <Logout />
          <p>Logout</p>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
