import mongoose from "mongoose"

export async function connectDB  () {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Database connected");
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
}

