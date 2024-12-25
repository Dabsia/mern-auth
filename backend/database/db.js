import mongoose from "mongoose";

export const connectToDatabase = async () => {
  try {
    const connection = await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log(`mongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.log(`err: ${error.message}`);
  }
};
