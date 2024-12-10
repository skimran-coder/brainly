import { useState } from "react";
import AddContentModal from "./components/AddContentModal";
import Button from "./components/Button";
import { Card } from "./components/Card";
import Sidebar from "./components/Sidebar";
import Plus from "./Icons/Plus";
import Share from "./Icons/Share";

const App = () => {
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

        <div className="bg-bg-main flex gap-4 p-4">
          
          
            <Card
            title={"Oye Hoye"}
            type={"YouTube"}
            tags={["video", "youtube", "learn"]}
            createdAt="10/12/2004"
          />
          <Card
            title={"Oye Hoye"}
            type={"Twitter/X"}
            tags={["zyx", "mio"]}
            createdAt="10/12/2022"
          />
        </div>
      </div>
    </div>
  );
};

export default App;
