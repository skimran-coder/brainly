import React from "react";
import Share from "../Icons/Share";
import Delete from "../Icons/Delete";
import YouTube from "../Icons/YouTube";
import Twitter from "../Icons/Twitter";
import Document from "../Icons/Document";
import axios from "axios";
axios.defaults.withCredentials = true;

interface cardProps {
  title: string;
  link: string;
  type: "YouTube" | "Twitter/X" | "Document";
  tags?: string[];
  createdAt: string;
  _id: string;
}

async function deleteContentOne(_id: string) {
  console.log(_id);
  const result = await axios.delete(
    `http://localhost:7777/api/v1/content/${_id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );

  console.log(result.data);
}

export const Card = ({
  title,
  type,
  link,
  tags,
  createdAt,
  _id,
}: cardProps) => {
  const icon = {
    YouTube: <YouTube />,
    "Twitter/X": <Twitter />,
    Document: <Document />,
  };

  return (
    <div
      className={`min-h-72 h-fit w-96 p-8 bg-white  shadow-md border rounded-md`}
    >
      <div className="flex justify-between items-center gap-6">
        <div className="flex gap-2 items-center justify-center text-text-secondary">
          <div className="min-w-fit">{icon[type]}</div>
          <h2 className="text-text-primary">{title}</h2>
        </div>
        <div className="flex  min-w-fit gap-4 items-center text-text-secondary">
          <div className="cursor-pointer">
            <Share />
          </div>
          <div className="cursor-pointer" onClick={() => deleteContentOne(_id)}>
            <Delete />
          </div>
        </div>
      </div>

      <div className="pt-4">
        {type === "YouTube" ? (
          <iframe
            className="w-full aspect-video rounded-md"
            // https://www.youtube.com/4lb2pXWWXJI
            // https://www.youtube.com/embed/4lb2pXWWXJI?si=TQ88LO7dFkfLwAyh
            src={link.replace("watch?v=", "/embed/")}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        ) : (
          <blockquote className="twitter-tweet">
            <a href={link.replace("x.com", "twitter.com")}></a>
          </blockquote>
        )}
      </div>

      <div className="pt-4">
        {tags?.map((t) => (
          <span
            key={t}
            className="mx-1 px-3 py-1 rounded-full bg-bg-tag text-text-secondaryBtn"
          >
            #{t}
          </span>
        ))}
      </div>

      <div className="pt-6 text-text-secondary text-sm">
        <p>Added on {createdAt}</p>
      </div>
    </div>
  );
};
