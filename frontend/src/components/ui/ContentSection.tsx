import { useEffect, useRef } from "react";
import { Card } from "./Card";
import Macy from "macy";

const ContentSection = ({ dataToRender }) => {
  const containerRef = useRef();
  const macyInstanceRef = useRef(null);

  useEffect(() => {
    // Initialize Macy only once
    if (!macyInstanceRef.current) {
      macyInstanceRef.current = Macy({
        container: containerRef.current,
        trueOrder: false,
        waitForImages: false,
        margin: {
          x: 16,
          y: 16,
        },
        columns: 4,
        breakAt: {
          1280: 3,
          1024: 2,
          640: 1,
        },
      });

      // Run recalculation after images load
      macyInstanceRef.current.runOnImageLoad(function () {
        macyInstanceRef.current.recalculate(true);
      }, true);
    }

    // Recalculate Macy layout when data changes
    if (macyInstanceRef.current) {
      macyInstanceRef.current.recalculate(true);
    }

    // Cleanup Macy on unmount
    return () => {
      if (macyInstanceRef.current) {
        macyInstanceRef.current.remove();
        macyInstanceRef.current = null;
      }
    };
  }, [dataToRender]);

  return (
    <div ref={containerRef} className="bg-bg-main my-4  ml-4 mr-8 gap-4 p-4 pr-8">
      {dataToRender.length > 0 &&
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
};

export default ContentSection;
