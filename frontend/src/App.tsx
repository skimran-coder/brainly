import Button from "./components/Button";
import { Card } from "./components/Card";
import Plus from "./Icons/Plus";
import Share from "./Icons/Share";

const App = () => {
  return (
    <div>
      <div className="flex gap-2 p-4">
        <Button
          type="secondary"
          name="Share Brain"
          size="lg"
          beforeIcon={<Share />}
        />
        <Button
          type="primary"
          name="Add Content"
          size="lg"
          beforeIcon={<Plus />}
        />
      </div>

      <div className="bg-bg-main flex gap-4 p-4">
        <Card title={"Oye Hoye"} type={"YouTube"} />
        <Card title={"Oye Hoye"} type={"Twitter/X"} />
      </div>
    </div>
  );
};

export default App;
