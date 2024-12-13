// Dashboard Component
import { useEffect, useState } from "react";
import AddContentModal from "../components/ui/AddContentModal";
import Button from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import Sidebar from "../components/ui/Sidebar";
import Plus from "../components/Icons/Plus";
import Share from "../components/Icons/Share";
import { useContent } from "../hooks/useContent";
import Bars from "../components/Icons/Bars";
import { ToastContainer } from "react-toastify";
import PopUpModal from "../components/ui/PopUpModal";
import { shareModalText, shareModalTitle } from "../config/config";
import Header from "../components/ui/Header";
import ContentSection from "../components/ui/ContentSection";

const Dashboard = () => {
  // State Management
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filterContent, setFilterContent] = useState("Dashboard");
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [dataToRender, setDataToRender] = useState([]);

  // Fetch Content
  const data = useContent("content/");

  // Modal Handlers
  const toggleAddContentModal = () => setIsModalOpen((prev) => !prev);
  const toggleShareModal = () => setIsShareModalOpen((prev) => !prev);

  // Sidebar Filter
  const switchFilter = (filter) => {
    setFilterContent(filter);
    setIsSidebarOpen(false);
  };

  // Filter Content Data
  function filterData(filter, data) {
    if (filter === "Dashboard" && data) {
      setDataToRender(data);
    }
    if (filter === "Videos" && data) {
      const filteredData = data.filter((d) => d.type === "YouTube");
      setDataToRender(filteredData);
    }
    if (filter === "Tweets" && data) {
      const filteredData = data.filter((d) => d.type === "Twitter/X");
      setDataToRender(filteredData);
    }
    if (filter === "Documents" && data) {
      const filteredData = data.filter((d) => d.type === "Document");
      setDataToRender(filteredData);
    }
  }

  useEffect(() => filterData(filterContent, data), [filterContent, data]);

  // JSX Render
  return (
    <div className="flex w-screen">
      {/* Modals */}

      <AddContentModal
        isModalOpen={isModalOpen}
        onModalClose={toggleAddContentModal}
      />

      {isShareModalOpen && (
        <PopUpModal
          isShareModal={isShareModalOpen}
          closeModal={toggleShareModal}
          text={shareModalText}
          title={shareModalTitle}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        filterContent={filterContent}
        switchFilter={switchFilter}
      />

      {/* Main Content */}
      <div className="bg-bg-main w-full">
        <Header
          onBarsClick={() => setIsSidebarOpen(true)}
          onAddContentClick={toggleAddContentModal}
          onShareBrainClick={toggleShareModal}
          filterContent={filterContent}
        />

        <ContentSection dataToRender={dataToRender} />
      </div>

      <ToastContainer autoClose={5000} closeOnClick position="bottom-right" />
    </div>
  );
};

export default Dashboard;
