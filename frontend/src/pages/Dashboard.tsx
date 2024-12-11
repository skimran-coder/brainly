import { useState } from "react";
import AddContentModal from "../components/AddContentModal";
import Button from "../components/Button";
import { Card } from "../components/Card";
import Sidebar from "../components/Sidebar";
import Plus from "../Icons/Plus";
import Share from "../Icons/Share";
import { useContent } from "../hooks/useContent";
import Bars from "../Icons/Bars";
import Close from "../Icons/Close";
import { ToastContainer } from "react-toastify";

const Dashboard = () => {
  const data = useContent();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  function onClose() {
    setIsModalOpen(false);
  }

  return (
    <div className="flex w-screen">
      <AddContentModal isModalOpen={isModalOpen} onClose={onClose} />

      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
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

        <div className="bg-bg-main flex flex-wrap gap-4 p-4">
          {data &&
            data.map(({ title, link, type, _id, createdAt }) => (
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

      <ToastContainer autoClose={5000} closeOnClick position="bottom-right"/>
    </div>
  );
};

export default Dashboard;
