import { getDishById } from "../../../../lib/data";

export async function GET(request, { params }) {
  const { id } = await params;
  const dish = getDishById(id);

  if (!dish) {
    return Response.json(
      { error: "Dish not found." },
      { status: 404 }
    );
  }

  return Response.json({ dish });
}