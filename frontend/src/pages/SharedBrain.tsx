import useContent from "../hooks/useContent";
import { Card } from "../components/ui/Card";
import { useParams } from "react-router-dom";

const SharedBrain = () => {
  const { hash } = useParams();

  const data = useContent(`/brain/share/${hash}`);

  return (
    <div className="min-h-screen bg-bg-main grid grid-cols-4 gap-4 p-4 ">
      {" "}
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
  );
};

export default SharedBrain;
