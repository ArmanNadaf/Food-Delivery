import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://armannadaf05:56185618@cluster0.znjmkdz.mongodb.net/food-del').then(() => {
        console.log("DB Connected");
    })
}