import { Schema } from "mongoose";

export var userSchema: Schema = new Schema({
  createdAt: Date,
  email: String,
  userName: String,
  nickName: String
});
userSchema.pre("save", (next) => {
  if (!this.createdAt) {
    this.createdAt = new Date();
  }
  next();
});