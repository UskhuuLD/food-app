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
    // Amjilttai bolvol ondor holboltoo cache-d hadgalna; amjilgui bolbol
    // cache-g tsevershyulj daraagiin duudalt shine oroldlogo hiine —
    // esvel serverless container ni ondor buruu tsahim ashiglaad l bult.
    cached = mongoose.connect(URI).catch((err) => {
      cached = null;
      throw err;
    });
  }
  await cached;
};
