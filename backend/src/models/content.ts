import { Document, Schema, model } from "mongoose";

interface Content extends Document {
  link: string;
  title: string;
  description: string;
  tags: Schema.Types.ObjectId[];
  type: string;
  userId: Schema.Types.ObjectId;
  metadata: {
    image: string;
    author: string;
    source: string;
  };
}

const contentSchema = new Schema<Content>(
  {
    link: String,
    title: String,
    description: { type: String, maxlength: 500 },
    tags: [{ type: String }],
    type: {
      type: String,
      enum: [
        "image",
        "video",
        "article",
        "YouTube",
        "Twitter/X",
        "instagram",
        "Document",
      ],
      default: "other",
    },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    metadata: {
      image: { type: String },
      author: { type: String },
      source: { type: String },
    },
  },
  { timestamps: true }
);

const ContentModel = model("Content", contentSchema);

export default ContentModel;
