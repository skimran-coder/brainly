import { useEffect, useState } from "react";
import AddContentModal from "../components/AddContentModal";
import Button from "../components/Button";
import { Card } from "../components/Card";
import Sidebar from "../components/Sidebar";
import Plus from "../Icons/Plus";
import Share from "../Icons/Share";
import { useContent } from "../hooks/useContent";
import Bars from "../Icons/Bars";
import { ToastContainer } from "react-toastify";

const Dashboard = () => {
  const data = useContent();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filterContent, setFilterContent] = useState("Dashboard");

  function switchFilter(filter: string) {
    setFilterContent(filter);
    setIsSidebarOpen((curr) => curr && false);
  }

  console.log(filterContent);

  function onModalClose() {
    setIsModalOpen((curr) => !curr);
  }

  console.log(data);

  const [dataToRender, setDataToRender] = useState(data);

  console.log(dataToRender);

  function filterData(filter, data) {
    if (filter === "Dashboard") {
      setDataToRender(data);
    }
    if (filter === "Videos") {
      const filteredData = data.filter((d) => d.type === "YouTube");
      setDataToRender(filteredData);
    }
    if (filter === "Tweets") {
      const filteredData = data.filter((d) => d.type === "Twitter/X");
      setDataToRender(filteredData);
    }
    if (filter === "Documents") {
      const filteredData = data.filter((d) => d.type === "Document");
      setDataToRender(filteredData);
    }
  }

  useEffect(() => filterData(filterContent, data), [filterContent, data]);

  return (
    <div className="flex w-screen">
      <AddContentModal isModalOpen={isModalOpen} onModalClose={onModalClose} />

      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        filterContent={filterContent}
        switchFilter={switchFilter}
      />

      <div className="bg-bg-main w-full">
        <div className="flex items-center justify-between mr-4">
          <div
            className="pl-2 md:hidden"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Bars />
          </div>
          <div className="pl-8">
            <h2 className="text-2xl font-semibold">All Notes</h2>
          </div>
          <div className="flex flex-col-reverse sm:flex-row gap-2 p-4">
            <Button
              type="secondary"
              name="Share Brain"
              size="lg"
              beforeIcon={<Share />}
            />
            <div onClick={() => setIsModalOpen(true)}>
              <Button
                type="primary"
                name="Add Content"
                size="lg"
                beforeIcon={<Plus />}
              />
            </div>
          </div>
        </div>
        {console.log(dataToRender)}

        <div className="bg-bg-main flex flex-wrap gap-4 p-4">
          {dataToRender &&
            dataToRender.map(({ title, link, type, _id, createdAt }) => (
              <Card
                title={title}
                link={link}
                type={type}
                tags={["video", "youtube", "learn"]}
                createdAt={createdAt}
                _id={_id}
                key={_id}
              />
            ))}
        </div>
      </div>

      <ToastContainer autoClose={5000} closeOnClick position="bottom-right" />
    </div>
  );
};

export default Dashboard;
