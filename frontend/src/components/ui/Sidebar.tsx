import AllContent from "../Icons/AllContent";
import Close from "../Icons/Close";
import Document from "../Icons/Document";
import Logout from "../Icons/Logout";
import Twitter from "../Icons/Twitter";
import YouTube from "../Icons/YouTube";
import { useNavigate } from "react-router-dom";
import AppTitle from "./AppTitle";
import { Dispatch, SetStateAction, useState } from "react";
import logout from "../../utils/logout";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../config/redux/store";
import Profile from "../Icons/Profile";
import Home from "../Icons/Home";
import ArrowDown from "../Icons/ArrowDown";
import ArrowUp from "../Icons/ArrowUp";

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
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const content = useSelector((state: RootState) => state.content.content);
  const username = content[0]?.userId.username;

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

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
      className={` ${
        isSidebarOpen &&
        "block bg-black bg-opacity-60 w-screen h-screen  fixed z-30 transition-all"
      }`}
      onClick={(e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target !== e.currentTarget) return;
        setIsSidebarOpen(false);
      }}
    >
      <div
        className={`lg:w-1/6 md:w-1/4 sm:w-1/3 min-h-screen border border-text-secondary border-opacity-20 md:flex flex-col pl-4 transition-all bg-white fixed  ${
          isSidebarOpen ? "flex fixed z-50 bg-white overflow-hidden" : "hidden"
        }`}
        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
          if (e.target !== e.currentTarget) return;
          setIsProfileOpen(false);
        }}
      >
        <div className="pt-4 pl-1 lg:pl-6 sm:pl-4 flex items-center justify-between gap-2 pb-8 md:pb-16">
          <AppTitle />
          {isSidebarOpen && (
            <div className="" onClick={() => setIsSidebarOpen(false)}>
              <Close />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4 sm:pl-4 md:pl-0 lg:pl-6  mb-20">
          {sideItems.map(({ name, icon }) => (
            <ul
              key={name}
              className={`flex gap-2 items-center text-lg cursor-pointer hover:bg-bg-tag px-2 py-1 transition-all rounded-l-lg ${
                filterContent === name && "bg-bg-tag"
              }`}
              onClick={() => switchFilter(name)}
            >
              <div>{icon}</div> <p className="text-base">{name}</p>
            </ul>
          ))}
        </div>

        <div className="flex flex-col gap-6 sm:pl-4 md:pl-0 lg:pl-6 relative pb-24">
          <ul
            className="flex gap-2 items-start text-lg cursor-pointer hover:bg-bg-tag py-1 px-2 transition-all rounded-l-lg "
            onClick={toggleProfile}
          >
            <Profile />
            <div className="flex flex-col items-start">
              {username ? (
                <p className="text-base"> {username}</p>
              ) : (
                <p className="text-base">Profile</p>
              )}
              {!isProfileOpen ? <ArrowDown /> : <ArrowUp />}
            </div>
          </ul>
          {isProfileOpen && (
            <ul className="absolute flex flex-col  top-10 ml-4  bg-bg-main shadow-md rounded-lg ">
              <li
                className="flex items-center gap-1 cursor-pointer hover:bg-bg-tag p-2"
                onClick={() => navigate("/")}
              >
                <Home />
                <p className="text-sm">Home</p>
              </li>
              <li
                className="flex items-center gap-1 cursor-pointer hover:bg-bg-tag p-2"
                onClick={() => logout(navigate, dispatch)}
              >
                <Logout />
                <p className="text-sm">Logout</p>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
