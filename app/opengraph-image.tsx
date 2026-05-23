import { ImageResponse } from "next/og";
import { bio } from "@/data/bio";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0b0f17",
          color: "#e6edf6",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ color: "#7dd3fc", fontSize: 28, fontFamily: "monospace" }}>
          {bio.name.toLowerCase().replace(/\s/g, "")}.com
        </div>
        <div style={{ fontSize: 96, fontWeight: 700, marginTop: 24 }}>
          {bio.name}
        </div>
        <div style={{ fontSize: 48, color: "#8b95a7", marginTop: 8 }}>
          {bio.role}
        </div>
      </div>
    ),
    { ...size },
  );
}
