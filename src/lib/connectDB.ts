import mongoose from "mongoose";

let connected = false
export const connectDB = async () => {

    try {

        if (connected) {
            return
        } else {
            await mongoose.connect(process.env.MONGO_URL as string, {
            }).then(() => {
                connected = true
                return
            }
            )
        }
    } catch (error) {
        console.log("mongodb connection error", error);

    }
}