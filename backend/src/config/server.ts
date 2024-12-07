import app from "../app";
import connectDB from "./db";

const startServer = async () => {
  try {
    await connectDB();
    app.listen(process.env.PORT, () =>
      console.log("Server started at port no. " + process.env.PORT)
    );
  } catch (error) {
    console.error(error);
  }
};

export default startServer;
