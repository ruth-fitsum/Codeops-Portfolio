import { NextResponse } from "next/server";
import { getDishes } from "@/lib/dishes";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const search = searchParams.get("search") || "";
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 6;

  const result = getDishes({
    search,
    page,
    limit,
  });

  return NextResponse.json(result);
}