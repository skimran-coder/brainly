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
import { RootState } from "../config/redux/store";
import { Content } from "../config/redux/contentSlice";
import Plus from "../components/Icons/Plus";

const Dashboard = () => {
  // State Management
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filterContent, setFilterContent] = useState("My Brain");
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Fetch content using custom hook
  useContent("/content");

  // Get content from Redux store
  const content = useSelector((state: RootState) => state.content.content);

  // Filtered content for rendering
  const [dataToRender, setDataToRender] = useState<Content[]>(content);

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
      <div className="bg-bg-main md:absolute md:right-0 md:w-3/4 lg:w-5/6 mx-auto w-full flex justify-end flex-col">
        <Header
          onBarsClick={() => setIsSidebarOpen(true)}
          onShareBrainClick={toggleShareModal}
          filterContent={filterContent}
        />

        <ContentSection dataToRender={dataToRender} />
      </div>

      <button
        className="fixed bottom-6 right-6 bg-bg-primaryBtn text-white p-2 md:p-4 rounded-md hover:bg-opacity-90 transition-all text-lg"
        onClick={toggleAddContentModal}
      >
        <Plus />
      </button>

      <ToastContainer autoClose={5000} closeOnClick position="top-center" />
    </div>
  );
};

export default Dashboard;
