import AllContent from "../Icons/AllContent";
import Brain from "../Icons/Brain";
import Close from "../Icons/Close";
import Document from "../Icons/Document";
import Twitter from "../Icons/Twitter";
import YouTube from "../Icons/YouTube";

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

  return (
    <div
      className={`lg:w-1/5 md:w-1/4 sm:w-1/3 min-h-screen border border-text-secondary border-opacity-20 md:flex flex-col pl-4 transition-all ${
        isSidebarOpen
          ? "flex absolute z-10  bg-white overflow-hidden"
          : "hidden"
      }`}
    >
      <div className="pt-4 pl-1 lg:pl-8 sm:pl-4 flex items-center justify-between gap-2 pb-8 md:pb-16">
        <div className="flex items-center gap-2">
          <Brain />
          <h1 className="text-text-primary font-semibold text-2xl">Brainly</h1>
        </div>
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
    </div>
  );
};

export default Sidebar;
