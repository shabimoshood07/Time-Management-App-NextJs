import mongoose, { model, models } from "mongoose";
import * as bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "please provide email"],
    match: [
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      "Invalid Email",
    ],
    unique: true,
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
    default: "user",
  },
  password: {
    type: String,
  },
  preferredWorkingHours: [],
});

userSchema.pre("save", async function (this: any) {
  if (this.password) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  return;
});

const User = models.User || mongoose.model("User", userSchema);

export default User;
