import mongoose, { Document, Schema, model } from "mongoose";

interface ShareBrain extends Document {
  hash: string;
  userId: Schema.Types.ObjectId;
}

const shareBrainSchema = new Schema<ShareBrain>(
  {
    hash: { type: String, unique: true, required: true },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      unique: true,
      required: true,
    },
  },
  { timestamps: true }
);

const ShareBrainModel = model("ShareBrain", shareBrainSchema);

export default ShareBrainModel;
