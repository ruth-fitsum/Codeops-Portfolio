import { NextResponse } from "next/server";
import { verifyCredentials } from "@/lib/users";
import {
  createSession,
  COOKIE_NAME,
  sessionCookieOptions,
} from "@/lib/session";

function isSafeRedirectPath(path) {
  return (
    typeof path === "string" &&
    path.startsWith("/") &&
    !path.startsWith("//") &&
    !path.includes("\\")
  );
}

export async function POST(request) {
  try {
    const body = await request.json();
    const email = body.email?.trim();
    const password = body.password;

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required." },
        { status: 400 }
      );
    }

    const user = verifyCredentials(email, password);

    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password." },
        { status: 401 }
      );
    }

    const token = await createSession(user);

    const response = NextResponse.json({
      message: "Signed in successfully.",
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
      },
    });

    response.cookies.set(
      COOKIE_NAME,
      token,
      sessionCookieOptions
    );

    return response;
  } catch {
    return NextResponse.json(
      { message: "Unable to process sign-in." },
      { status: 400 }
    );
  }
}