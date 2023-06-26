import mongoose, { model, models } from "mongoose"

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: [true, "please provide email"]
    },
    name: {
        type: String,
    },
    image: {
        type: String,
    },
    role: {
        type: String,
        enum: ["user", "admin", "manager"],
        default: "user"
    },
    preferredWorkingHours: []
})


const User = models.User || mongoose.model('User', userSchema);

export default User