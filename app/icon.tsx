import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: "#0B0B0F",
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontSize: 20,
            color: "#00C8FF",
            fontWeight: 900,
            lineHeight: 1,
          }}
        >
          ⚡
        </div>
      </div>
    ),
    { ...size }
  );
}
