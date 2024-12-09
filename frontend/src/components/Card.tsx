import React from "react";
import Share from "../Icons/Share";
import Delete from "../Icons/Delete";
import YouTube from "../Icons/YouTube";
import Twitter from "../Icons/Twitter";
import File from "../Icons/File";

interface cardProps {
  title: string;
  type: "YouTube" | "Twitter/X" | "Other";
}

export const Card = ({ title, type }: cardProps) => {
  const icon = {
    YouTube: <YouTube />,
    "Twitter/X": <Twitter />,
    Other: <File />,
  };

  return (
    <div
      className={`min-h-72 h-fit w-96 p-8 bg-white border-pink-400 border rounded-md`}
    >
      <div className="flex justify-between items-center gap-6">
        <div className="flex gap-2 items-center justify-center text-text-secondary">
          {icon[type]}
          <h2 className="text-text-primary">{title}</h2>
        </div>
        <div className="flex gap-4 items-center text-text-secondary">
          <Share />
          <Delete />
        </div>
      </div>

      <div className="pt-4">
        {type === "YouTube" ? (
          <iframe
            className="w-full aspect-video rounded-md"
            src="https://www.youtube.com/embed/AjRoGrZXGPY?si=hwUFrxw7sOrKWzvq"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        ) : (
          <blockquote className="twitter-tweet">
            <a href="https://twitter.com/akshaymarch7/status/1866068912716284244"></a>
          </blockquote>
        )}
      </div>
    </div>
  );
};
