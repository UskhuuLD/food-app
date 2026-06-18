import mongoose from "mongoose";

const URI = process.env.MONGODB_URI

export const connectDb = async()=>{
    if(!URI){
        console.log("URI BHGU")
        return
    }

    await mongoose.connect(URI)
}