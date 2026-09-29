import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Feedback from "@/models/Feedback";
import { getSession } from "@/lib/auth/session";

export async function GET() {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 },
      );
    }

    await connectToDatabase();

    const [total, newCount, readCount, resolvedCount, latestFeedback] =
      await Promise.all([
        Feedback.countDocuments(),
        Feedback.countDocuments({ status: "new" }),
        Feedback.countDocuments({ status: "read" }),
        Feedback.countDocuments({ status: "resolved" }),
        Feedback.findOne()
          .select("-ipHash")
          .sort({ createdAt: -1 })
          .lean(),
      ]);

    return NextResponse.json({
      success: true,
      stats: {
        total,
        new: newCount,
        read: readCount,
        resolved: resolvedCount,
      },
      latestFeedback,
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);

    return NextResponse.json(
      { error: "Failed to fetch dashboard statistics" },
      { status: 500 },
    );
  }
}