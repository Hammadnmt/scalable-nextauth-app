import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  // uname: {
  //   type: String,
  //   required: true,
  //   unique: true,
  // },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  // provider: {
  //   type: String,
  //   default: "local",
  //   enum: ["local", "google", "github"],
  // },
});

export const User = models.User || model("User", userSchema);
