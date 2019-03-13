import { Schema } from "mongoose";

export var groupSchema: Schema = new Schema({
  createdAt: Date,
  owner: String,
  groupName: String,
});
groupSchema.pre("save", (next) => {
  if (!this.createdAt) {
    this.createdAt = new Date();
  }
  next();
});