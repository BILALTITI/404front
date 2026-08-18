import { ImageResponse } from "next/og";

export const runtime = "nodejs";

export const alt = "Watad — your idea, built to hold";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social share card (applies to all routes): navy field, cyan monoline mark,
 *  two-tone wordmark, "Built to hold" tagline. Generated at request time —
 *  replace with a designed public/og-image.png when brand assets land. */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0C2740",
          gap: 28,
        }}
      >
        <svg width="180" height="180" viewBox="0 0 32 32" aria-hidden="true">
          <polyline
            points="7,7 12,20 16,10 20,20 25,7"
            fill="none"
            stroke="#22B8DE"
            strokeWidth="2.6"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
          <rect x="6" y="24" width="20" height="2.6" fill="#1A1A1A" stroke="#1B6491" strokeWidth="0.4" />
        </svg>
        <div
          style={{
            display: "flex",
            fontSize: 96,
            fontWeight: 700,
            letterSpacing: "0.06em",
          }}
        >
          <span style={{ color: "#E8EDF1" }}>WAT</span>
          <span style={{ color: "#22B8DE" }}>AD</span>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 18,
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "#22B8DE",
          }}
        >
          Built to hold
        </div>
      </div>
    ),
    { ...size },
  );
}
