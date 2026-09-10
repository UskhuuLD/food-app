import mongoose from "mongoose";

const URI = process.env.MONGODB_URI;

// Serverless orchind davhar holbolt uusgehgui bolgohын tuld cache hийнэ
let cached: Promise<typeof mongoose> | null = null;

export const connectDb = async () => {
  if (!URI) {
    console.log("URI BHGU");
    return;
  }
  if (mongoose.connection.readyState === 1) return;
  if (!cached) {
    cached = mongoose.connect(URI);
  }
  await cached;
};
