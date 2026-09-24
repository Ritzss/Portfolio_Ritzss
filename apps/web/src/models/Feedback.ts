import mongoose, { Schema, type Model } from "mongoose";

export interface FeedbackDocument extends mongoose.Document {
  name: string;
  email: string;
  type: "feedback" | "project" | "job" | "collaboration" | "other";
  message: string;
  rating?: number;
  status: "new" | "read" | "resolved";
  ipHash: string;
  createdAt: Date;
  updatedAt: Date;
}

const feedbackSchema = new Schema<FeedbackDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 200,
    },

    type: {
      type: String,
      enum: ["feedback", "project", "job", "collaboration", "other"],
      required: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },

    rating: {
      type: Number,
      min: 1,
      max: 5,
    },

    status: {
      type: String,
      enum: ["new", "read", "resolved"],
      default: "new",
    },

    ipHash: {
      type: String,
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

const Feedback: Model<FeedbackDocument> =
  mongoose.models.Feedback ||
  mongoose.model<FeedbackDocument>("Feedback", feedbackSchema);

export default Feedback;
