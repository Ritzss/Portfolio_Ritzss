import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Feedback from "@/models/Feedback";
import { getSession } from "@/lib/auth/session";

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 },
      );
    }

    await connectToDatabase();

    const status = request.nextUrl.searchParams.get("status");

    const filter: { status?: "new" | "read" | "resolved" } =
      status === "new" ||
      status === "read" ||
      status === "resolved"
        ? { status }
        : {};

    const [feedback, total, newCount, readCount, resolvedCount] =
      await Promise.all([
        Feedback.find(filter)
          .select("-ipHash")
          .sort({ createdAt: -1 })
          .lean(),

        Feedback.countDocuments(),

        Feedback.countDocuments({
          status: "new",
        }),

        Feedback.countDocuments({
          status: "read",
        }),

        Feedback.countDocuments({
          status: "resolved",
        }),
      ]);

    return NextResponse.json({
      success: true,
      feedback,
      counts: {
        total,
        new: newCount,
        read: readCount,
        resolved: resolvedCount,
      },
    });
  } catch (error) {
    console.error("Admin feedback error:", error);

    return NextResponse.json(
      { error: "Failed to fetch feedback" },
      { status: 500 },
    );
  }
}