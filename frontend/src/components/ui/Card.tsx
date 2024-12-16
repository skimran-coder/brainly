import React, { useState } from "react";
import Share from "../Icons/Share";
import Delete from "../Icons/Delete";
import YouTube from "../Icons/YouTube";
import Twitter from "../Icons/Twitter";
import Document from "../Icons/Document";
import axios from "axios";
import { formatDistance } from "date-fns";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Edit from "../Icons/Edit";
import EditContentModal from "./EditContentModal";
import PopUpModal from "./PopUpModal";
import { deleteModalText, deleteModalTitle } from "../../config/config";

axios.defaults.withCredentials = true;

interface cardProps {
  title: string;
  link: string;
  type: "YouTube" | "Twitter/X" | "Document";
  tags?: string[];
  createdAt: string;
  _id: string;
}

async function shareUrl(title, link) {
  try {
    await navigator.share({
      text: title,
      url: link,
    });
  } catch (error) {
    toast.error(error.message || "Error sharing content");
    console.error(error);
  }
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

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  function closeDeleteModal() {
    setIsDeleteModalOpen(false);
  }

  function closeEditModal() {
    setIsEditModalOpen(false);
  }

  function convertDate(dateStr) {
    const str = formatDistance(new Date(dateStr), new Date());
    return str;
  }

  const dateCreated = convertDate(createdAt);

  return (
    <div className={` p-8 bg-white  shadow-md border rounded-md`}>
      <EditContentModal
        isEditModalOpen={isEditModalOpen}
        closeEditModal={closeEditModal}
        title={title}
        link={link}
        type={type}
        tags={tags}
        contentId={_id}
      />

      {isDeleteModalOpen && (
        <PopUpModal
          isDeleteModal={isDeleteModalOpen}
          closeModal={closeDeleteModal}
          text={deleteModalText}
          title={deleteModalTitle}
          contentId={_id}
        />
      )}

      <div className="flex justify-between items-center gap-6">
        <div className="flex gap-2 items-center justify-center text-text-secondary">
          <div className="min-w-fit">
            <a href={link}>{icon[type]}</a>
          </div>
        </div>
        <div className="flex  min-w-fit gap-4 items-center text-text-secondary">
          <div
            className="cursor-pointer"
            onClick={() => setIsEditModalOpen(true)}
          >
            <Edit />
          </div>
          <div
            className="cursor-pointer"
            onClick={() => setIsDeleteModalOpen(true)}
          >
            <Delete />
          </div>
          <div className="cursor-pointer" onClick={() => shareUrl(title, link)}>
            <Share />
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-text-primary pt-4">{title}</h2>
      </div>
      <div className="pt-4">
        {type === "YouTube" ? (
          <iframe
            className="w-full aspect-video rounded-md"
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

      <div className=" flex flex-wrap py-4">
        {tags?.map((t) => (
          <span
            key={t + Math.random()}
            className="m-1 px-3 py-1 rounded-full bg-bg-tag text-text-secondaryBtn"
          >
            #{t}
          </span>
        ))}
      </div>

      <div className="pt-6 text-text-secondary text-sm">
        <p>Added {dateCreated} ago</p>
      </div>
    </div>
  );
};
