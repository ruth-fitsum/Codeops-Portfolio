import { NextResponse } from "next/server";
import {
  createSession,
  COOKIE_NAME,
} from "@/lib/session";
import { verifyCredentials } from "@/lib/users";

export async function POST(request) {
  try {
    const body = await request.json();

    const email =
      typeof body.email === "string" ? body.email.trim() : "";

    const password =
      typeof body.password === "string" ? body.password : "";

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required." },
        { status: 400 }
      );
    }

    const user = await verifyCredentials(email, password);

    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password." },
        { status: 401 }
      );
    }

    const token = await createSession(user);

    const response = NextResponse.json({
      message: "Signed in successfully.",
    });

    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch {
    return NextResponse.json(
      { message: "Unable to sign in." },
      { status: 500 }
    );
  }
}