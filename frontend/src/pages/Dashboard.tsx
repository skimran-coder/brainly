import { useState } from "react";
import AddContentModal from "../components/AddContentModal";
import Button from "../components/Button";
import { Card } from "../components/Card";
import Sidebar from "../components/Sidebar";
import Plus from "../Icons/Plus";
import Share from "../Icons/Share";
import { useContent } from "../hooks/useContent";

const Dashboard = () => {
  const data = useContent();

  const [isModalOpen, setIsModalOpen] = useState(false);

  function onClose() {
    setIsModalOpen(false);
  }

  return (
    <div className="flex w-screen">
      <AddContentModal isModalOpen={isModalOpen} onClose={onClose} />

      <Sidebar />

      <div className="bg-bg-main w-full">
        <div className="flex items-center justify-between mr-4">
          <div className="pl-8">
            <h2 className="text-2xl font-semibold">All Notes</h2>
          </div>
          <div className="flex gap-2 p-4">
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
            data.map(({ title, link, type, _id }) => (
              <Card
                title={title}
                link={link}
                type={type}
                tags={["video", "youtube", "learn"]}
                createdAt="10/12/2004"
                _id={_id}
                key={title}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
