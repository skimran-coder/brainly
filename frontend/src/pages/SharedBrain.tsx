import useContent from "../hooks/useContent";
import { Card } from "../components/ui/Card";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import Macy from "macy";
import { RootState } from "../config/redux/store";

interface MacyInstance {
  recalculate: (waitForImages?: boolean) => void;
  runOnImageLoad: (callback: () => void, waitForImages?: boolean) => void;
  remove: () => void;
}

const SharedBrain = () => {
  const { hash } = useParams();

  useContent(`/brain/share/${hash}`);

  const data = useSelector((state: RootState) => state.content.content);

  const containerRef = useRef<HTMLDivElement>(null);
  const macyInstanceRef = useRef<MacyInstance | null>(null);

  useEffect(() => {
    // Initialize Macy only once
    if (containerRef.current && !macyInstanceRef.current) {
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

      if (!macyInstanceRef.current) {
        return;
      }

      // Run recalculation after images load
      macyInstanceRef.current.runOnImageLoad(function () {
        if (!macyInstanceRef.current) {
          return;
        }
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
  }, [data]);

  return (
    data.length > 0 && (
      <div>
        <div className="w-full text-center my-8 text-2xl font-semibold text-text-primary">
          <span className="font-bold text-2xl">
            {data[0].userId.username}'s
          </span>{" "}
          Shared Collection
        </div>
        <div
          ref={containerRef}
          className="bg-bg-main my-4 ml-4 mr-8 gap-4 p-16 pr-8"
        >
          {data.map(({ title, link, type, _id, createdAt, tags }) => (
            <Card
              key={_id}
              title={title}
              link={link}
              type={type}
              tags={tags}
              createdAt={createdAt}
              _id={_id}
              isSharedBrain={true}
            />
          ))}
        </div>
      </div>
    )
  );
};

export default SharedBrain;
