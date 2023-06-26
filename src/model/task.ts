import mongoose, { model, models } from "mongoose"

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: [true, "please provide email"]
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
})


const Task = models.Task || mongoose.model('Task', taskSchema);

export default Task