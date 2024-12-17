import AllContent from "../Icons/AllContent";
import Close from "../Icons/Close";
import Document from "../Icons/Document";
import Logout from "../Icons/Logout";
import Twitter from "../Icons/Twitter";
import YouTube from "../Icons/YouTube";
import { useNavigate } from "react-router-dom";
import AppTitle from "./AppTitle";
import { Dispatch, SetStateAction } from "react";
import logout from "../../utils/logout";
import { useDispatch } from "react-redux";

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
  switchFilter: (filter: string) => void;
  filterContent: string;
}

const Sidebar = ({
  isSidebarOpen,
  setIsSidebarOpen,
  switchFilter,
  filterContent,
}: SidebarProps) => {
  const sideItems = [
    {
      name: "My Brain",
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
  const dispatch = useDispatch();

  return (
    <div
      className={`lg:w-1/6 md:w-1/4 sm:w-1/3 min-h-screen border border-text-secondary border-opacity-20 md:flex flex-col pl-4 transition-all bg-white fixed ${
        isSidebarOpen
          ? "flex fixed z-50 bg-white overflow-hidden"
          : "hidden"
      }`}
    >
      <div className="pt-4 pl-1 lg:pl-6 sm:pl-4 flex items-center justify-between gap-2 pb-8 md:pb-16">
        <AppTitle />
        {isSidebarOpen && (
          <div className="" onClick={() => setIsSidebarOpen(false)}>
            <Close />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-6 sm:pl-4 md:pl-0 lg:pl-6">
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
          onClick={() => logout(navigate, dispatch)}
        >
          <Logout />
          <p>Logout</p>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
