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
          background: "#0c1018",
          color: "#f1f4fb",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-200px",
            left: "-200px",
            width: "700px",
            height: "700px",
            background:
              "radial-gradient(circle, rgba(125,222,250,0.35), transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-200px",
            right: "-200px",
            width: "700px",
            height: "700px",
            background:
              "radial-gradient(circle, rgba(196,132,252,0.30), transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          style={{
            display: "flex",
            color: "#8b9eff",
            fontSize: 30,
            fontFamily: "monospace",
            position: "relative",
          }}
        >
          isaactillema.com
        </div>
        <div
          style={{
            display: "flex",
            background:
              "linear-gradient(135deg, #67e8f9, #818cf8, #c084fc)",
            backgroundClip: "text",
            color: "transparent",
            fontSize: 110,
            fontWeight: 700,
            marginTop: 28,
            letterSpacing: "-0.02em",
            position: "relative",
          }}
        >
          {bio.name}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 44,
            color: "#a8b1c4",
            marginTop: 8,
            position: "relative",
          }}
        >
          {bio.role}
        </div>
      </div>
    ),
    { ...size },
  );
}
