import mongoose, { model, models } from "mongoose";
import * as bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: [true, "please provide email"],
    match:
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
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
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = models.User || mongoose.model("User", userSchema);

export default User;
