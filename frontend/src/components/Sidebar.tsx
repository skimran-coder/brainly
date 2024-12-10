import Brain from "../Icons/Brain";
import Document from "../Icons/Document";
import Twitter from "../Icons/Twitter";
import YouTube from "../Icons/YouTube";

const Sidebar = () => {
  const sideItems = [
    {
      Name: "Tweets",
      Icon: <Twitter />,
    },
    {
      Name: "Videos",
      Icon: <YouTube />,
    },
    {
      Name: "Documents",
      Icon: <Document />,
    },
  ];

  return (
    <div className="lg:w-1/5 min-h-screen border border-text-secondary border-opacity-20 flex flex-col gap-16">
      <div className="pt-4 pl-8 flex items-center gap-2 ">
        <div className="h-8 w-8">
          <Brain />
        </div>
        <h1 className="text-text-primary font-semibold text-2xl">Brainly</h1>
      </div>

      <div className="flex flex-col gap-6 pl-8">
        {sideItems.map((item) => (
          <ul className="flex gap-1 items-center text-lg cursor-pointer hover:bg-bg-tag px-2 py-1 transition-all rounded-l-lg">
            <div>{item.Icon}</div> <p className="">{item.Name}</p>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
