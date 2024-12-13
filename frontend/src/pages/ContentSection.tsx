import { Card } from "../components/ui/Card";

const ContentSection = ({ dataToRender }) => (
  <div className="bg-bg-main flex flex-wrap gap-4 p-4">
    {dataToRender &&
      dataToRender.map(({ title, link, type, _id, createdAt }) => (
        <Card
          key={_id}
          title={title}
          link={link}
          type={type}
          tags={["video", "youtube", "learn"]}
          createdAt={createdAt}
          _id={_id}
        />
      ))}
  </div>
);

export default ContentSection;
