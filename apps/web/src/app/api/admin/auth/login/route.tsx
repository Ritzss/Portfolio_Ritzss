import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/db/mongodb";
import { Admin } from "@/lib/auth/admin";
import { verifyPassword } from "@/lib/auth/password";
import { createSession } from "@/lib/auth/session";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const username =
      typeof body.username === "string"
        ? body.username.trim().toLowerCase()
        : "";

    const password =
      typeof body.password === "string"
        ? body.password
        : "";

    if (!username || !password) {
      return NextResponse.json(
        { error: "Credentials required" },
        { status: 400 },
      );
    }

    await connectToDatabase();

    const admin = await Admin.findOne({
      username,
    });

    if (!admin) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }

    const validPassword = await verifyPassword(
      password,
      admin.passwordHash,
    );

    if (!validPassword) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }

    await createSession(admin._id.toString());

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Admin login error:", error);

    return NextResponse.json(
      { error: "Unable to authenticate" },
      { status: 500 },
    );
  }
}