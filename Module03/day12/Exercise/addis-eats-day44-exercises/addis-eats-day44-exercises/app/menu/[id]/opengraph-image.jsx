import { ImageResponse } from "next/og";
import { getDish } from "../dishes";

export const runtime = "edge";
export const alt = "Addis Eats dish social preview";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage({ params }) {
  const { id } = await params;
  const dish = getDish(id);
  const name = dish?.name ?? "Ethiopian Food";
  const price = dish ? `${dish.price} ETB` : "Discover Addis Eats";

  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", background: "#fff3dc", color: "#78350f", padding: "60px" }}>
      <div style={{ fontSize: 34, letterSpacing: 8 }}>ADDIS EATS</div>
      <div style={{ fontSize: 76, fontWeight: 700, marginTop: 32, textAlign: "center" }}>{name}</div>
      <div style={{ fontSize: 38, marginTop: 28 }}>{price}</div>
      <div style={{ fontSize: 26, marginTop: 35 }}>Ethiopian food, made for sharing</div>
    </div>,
    size
  );
}
