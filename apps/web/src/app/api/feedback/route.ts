import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Feedback from "@/models/Feedback";

const allowedTypes = [
  "feedback",
  "project",
  "job",
  "collaboration",
  "other",
] as const;

const MAX_FEEDBACK_PER_DAY = 5;
const RATE_LIMIT_WINDOW_MS = 24 * 60 * 60 * 1000;

function getClientIp(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  return request.headers.get("x-real-ip") || "unknown";
}

function hashIp(ip: string) {
  const secret = process.env.FEEDBACK_RATE_LIMIT_SECRET;

  if (!secret) {
    throw new Error("FEEDBACK_RATE_LIMIT_SECRET is not configured");
  }

  return crypto.createHash("sha256").update(`${secret}:${ip}`).digest("hex");
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { name, email, type, message, rating } = body;

    if (!name || !email || !type || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required.",
        },
        { status: 400 },
      );
    }

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof type !== "string" ||
      typeof message !== "string"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid form data.",
        },
        { status: 400 },
      );
    }

    if (!allowedTypes.includes(type as (typeof allowedTypes)[number])) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid feedback type.",
        },
        { status: 400 },
      );
    }

    const feedbackType = type as (typeof allowedTypes)[number];

    if (name.length > 100 || email.length > 200 || message.length > 2000) {
      return NextResponse.json(
        {
          success: false,
          message: "One or more fields are too long.",
        },
        { status: 400 },
      );
    }

    if (
      rating !== undefined &&
      rating !== null &&
      (!Number.isInteger(rating) || rating < 1 || rating > 5)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Rating must be between 1 and 5.",
        },
        { status: 400 },
      );
    }

    if (type === "feedback" && rating !== undefined && rating !== null) {
      if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
        return NextResponse.json(
          {
            success: false,
            message: "Rating must be between 1 and 5.",
          },
          { status: 400 },
        );
      }
    }

    await connectToDatabase();

    const ip = getClientIp(request);
    const ipHash = hashIp(ip);

    const since = new Date(Date.now() - RATE_LIMIT_WINDOW_MS);

    const recentFeedbackCount = await Feedback.countDocuments({
      ipHash,
      createdAt: {
        $gte: since,
      },
    });

    if (recentFeedbackCount >= MAX_FEEDBACK_PER_DAY) {
      return NextResponse.json(
        {
          success: false,
          message:
            "You've reached the daily feedback limit. Please try again tomorrow.",
        },
        { status: 429 },
      );
    }

    await Feedback.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      type: feedbackType,
      message: message.trim(),
      rating: type === "feedback" && rating ? rating : undefined,
      ipHash,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Feedback submitted successfully.",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Feedback submission error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again.",
      },
      { status: 500 },
    );
  }
}
