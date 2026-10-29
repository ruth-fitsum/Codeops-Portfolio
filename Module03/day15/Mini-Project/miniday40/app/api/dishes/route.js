import { dishes } from "../../../lib/data";

export async function GET() {
  return Response.json({
    dishes,
    count: dishes.length,
  });
}