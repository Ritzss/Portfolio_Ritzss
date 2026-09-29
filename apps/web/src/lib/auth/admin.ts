import mongoose, { Schema, type Model } from "mongoose";

export interface IAdmin {
  username: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
}

const AdminSchema = new Schema<IAdmin>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Admin =
  (mongoose.models.Admin as Model<IAdmin> | undefined) ??
  mongoose.model<IAdmin>("Admin", AdminSchema);