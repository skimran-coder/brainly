// Dashboard Component
import { useEffect, useState } from "react";
import AddContentModal from "../components/ui/AddContentModal";
import Sidebar from "../components/ui/Sidebar";
import useContent from "../hooks/useContent";
import { ToastContainer } from "react-toastify";
import PopUpModal from "../components/ui/PopUpModal";
import { shareModalText, shareModalTitle } from "../config/config";
import Header from "../components/ui/Header";
import ContentSection from "../components/ui/ContentSection";
import filterData from "../utils/filterData";
import { useSelector } from "react-redux";

const Dashboard = () => {
  // State Management
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filterContent, setFilterContent] = useState("My Brain");
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Fetch content using custom hook
  useContent("/content");

  // Get content from Redux store
  const content = useSelector((state) => state.content.content);

  // Filtered content for rendering
  const [dataToRender, setDataToRender] = useState(content);

  useEffect(() => {
    setDataToRender(content); // Update UI state when Redux content changes
  }, [content]);

  // Modal Handlers
  const toggleAddContentModal = () => setIsModalOpen((prev) => !prev);
  const toggleShareModal = () => setIsShareModalOpen((prev) => !prev);

  // Sidebar Filter
  const switchFilter = (filter: string) => {
    setFilterContent(filter);
    setIsSidebarOpen(false);
  };

  useEffect(
    () => filterData(filterContent, content, setDataToRender),
    [filterContent, content]
  );

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
