import { Card } from "./Card";

const ContentSection = ({ dataToRender }) => (
  <div className="bg-bg-main grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 pr-8">
    {dataToRender &&
      dataToRender.map(({ title, link, type, _id, createdAt, tags }) => (
        <Card
          key={_id}
          title={title}
          link={link}
          type={type}
          tags={tags}
          createdAt={createdAt}
          _id={_id}
        />
      ))}
  </div>
);

export default ContentSection;
