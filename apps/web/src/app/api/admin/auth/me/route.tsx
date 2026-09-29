import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
// import { connectDB } from "@/lib/db/mongodb";
import { Admin } from "@/lib/auth/admin";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET() {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 },
      );
    }

    await connectToDatabase();

    const admin = await Admin.findById(session.adminId)
      .select("_id username")
      .lean();

    if (!admin) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 },
      );
    }

    return NextResponse.json({
      authenticated: true,
      admin: {
        id: admin._id.toString(),
        username: admin.username,
      },
    });
  } catch {
    return NextResponse.json(
      { authenticated: false },
      { status: 401 },
    );
  }
}