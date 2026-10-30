import { NextResponse } from "next/server";
import { COOKIE_NAME } from "@/lib/session";

export async function POST() {
  const response = NextResponse.json({
    message: "Signed out successfully.",
  });

  response.cookies.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return response;
}