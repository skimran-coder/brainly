import Bars from "../Icons/Bars";
import Share from "../Icons/Share";
import Button from "./Button";

interface HeaderProps {
  onBarsClick: () => void;
  onShareBrainClick: () => void;
  filterContent: string;
}

const Header = ({
  onBarsClick,
  onShareBrainClick,
  filterContent,
}: HeaderProps) => (
  <div className="flex items-center justify-between mr-4">
    <div className="pl-2 md:hidden" onClick={onBarsClick}>
      <Bars />
    </div>
    <div className="pl-8">
      <h2 className="text-2xl font-semibold">
        {filterContent === "My Brain" ? "All Notes" : filterContent}
      </h2>
    </div>
    <div className="flex flex-col-reverse sm:flex-row gap-2 p-4">
      <Button
        type="secondary"
        name="Share Brain"
        size="lg"
        beforeIcon={<Share />}
        onClickHandler={onShareBrainClick}
      />
      {/* <Button
        type="primary"
        name="Add Content"
        size="lg"
        beforeIcon={<Plus />}
        onClickHandler={onAddContentClick}
      /> */}
    </div>
  </div>
);

export default Header;
