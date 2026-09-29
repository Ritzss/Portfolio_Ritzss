import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";
import { connectToDatabase } from "@/lib/mongodb";
import Feedback from "@/models/Feedback";
import { getSession } from "@/lib/auth/session";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(
  _request: NextRequest,
  context: RouteContext,
) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 },
      );
    }

    const { id } = await context.params;

    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid feedback ID" },
        { status: 400 },
      );
    }

    await connectToDatabase();

    const feedback = await Feedback.findById(id)
      .select("-ipHash")
      .lean();

    if (!feedback) {
      return NextResponse.json(
        { error: "Feedback not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      feedback,
    });
  } catch (error) {
    console.error("Get feedback error:", error);

    return NextResponse.json(
      { error: "Failed to fetch feedback" },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: NextRequest,
  context: RouteContext,
) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 },
      );
    }

    const { id } = await context.params;

    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid feedback ID" },
        { status: 400 },
      );
    }

    const body = await request.json();

    if (
      body.status !== "new" &&
      body.status !== "read" &&
      body.status !== "resolved"
    ) {
      return NextResponse.json(
        { error: "Invalid status" },
        { status: 400 },
      );
    }

    await connectToDatabase();

    const feedback = await Feedback.findByIdAndUpdate(
      id,
      {
        status: body.status,
      },
      {
        new: true,
        runValidators: true,
      },
    )
      .select("-ipHash")
      .lean();

    if (!feedback) {
      return NextResponse.json(
        { error: "Feedback not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      feedback,
    });
  } catch (error) {
    console.error("Update feedback error:", error);

    return NextResponse.json(
      { error: "Failed to update feedback" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  context: RouteContext,
) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 },
      );
    }

    const { id } = await context.params;

    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid feedback ID" },
        { status: 400 },
      );
    }

    await connectToDatabase();

    const feedback = await Feedback.findByIdAndDelete(id);

    if (!feedback) {
      return NextResponse.json(
        { error: "Feedback not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Feedback deleted successfully",
    });
  } catch (error) {
    console.error("Delete feedback error:", error);

    return NextResponse.json(
      { error: "Failed to delete feedback" },
      { status: 500 },
    );
  }
}