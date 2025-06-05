import mongoose from "mongoose";

 export const connectDB  = async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/PROJECT_1').then(()=>console.log("DB Connected"));
}

// mongodb+srv://miken:miken@cluster0.mme8db1.mongodb.net/PROJECT_1