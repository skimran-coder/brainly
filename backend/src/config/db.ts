import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionUrl = process.env.MONGODB_CONNECTION_URL;
    if (!connectionUrl) {
      throw new Error(
        "MONGODB_CONNECTION_URL is not defined in the environment variables."
      );
    }
    await mongoose.connect(connectionUrl);
    console.log("DB connected successfully!");
  } catch (error) {
    console.error(error);
  }
};

export default connectDB;
