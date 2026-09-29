import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/db/mongodb";
import { Admin } from "@/lib/auth/admin";
import { hashPassword } from "@/lib/auth/password";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(request: Request) {
  try {
    const setupSecret = process.env.ADMIN_SETUP_SECRET;

    if (!setupSecret) {
      return NextResponse.json(
        { error: "Admin setup is disabled" },
        { status: 503 },
      );
    }

    const providedSecret = request.headers.get("x-admin-setup-secret");

    if (!providedSecret || providedSecret !== setupSecret) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 },
      );
    }

    const username = process.env.ADMIN_USERNAME;
    const password = process.env.ADMIN_PASSWORD;

    if (!username || !password) {
      return NextResponse.json(
        { error: "Admin credentials are not configured" },
        { status: 500 },
      );
    }

    await connectToDatabase();

    const existingAdmin = await Admin.findOne({
      username: username.toLowerCase(),
    });

    if (existingAdmin) {
      return NextResponse.json(
        { error: "Admin account already exists" },
        { status: 409 },
      );
    }

    const passwordHash = await hashPassword(password);

    await Admin.create({
      username: username.toLowerCase(),
      passwordHash,
    });

    return NextResponse.json({
      success: true,
      message: "Admin account created",
    });
  } catch (error) {
    console.error("Admin setup error:", error);

    return NextResponse.json(
      { error: "Failed to create admin account" },
      { status: 500 },
    );
  }
}