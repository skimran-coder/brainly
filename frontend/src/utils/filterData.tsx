import { Content } from "../config/redux/contentSlice";

// Filter Content Data
function filterData(
  filter: string,
  data: Content[],
  setDataToRender: React.Dispatch<React.SetStateAction<Content[]>>
) {
  if (filter === "My Brain" && data) {
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

export default filterData;
