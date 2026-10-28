import { ImageResponse } from "next/og";

export const alt = "Addis Eats Ethiopian food discovery";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", background: "#fff3dc", color: "#78350f" }}>
      <div style={{ fontSize: 44, letterSpacing: 8 }}>ADDIS EATS</div>
      <div style={{ fontSize: 76, fontWeight: 700, marginTop: 30 }}>Ethiopian Food Discovery</div>
      <div style={{ fontSize: 30, marginTop: 30 }}>Discover your next favorite dish</div>
    </div>,
    size
  );
}
