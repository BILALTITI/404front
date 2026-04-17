import { ImageResponse } from "next/og";
import { get404ImageDataUri } from "@/lib/faviconSource";

export const runtime = "nodejs";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const src = await get404ImageDataUri();

  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#141414",
          borderRadius: "50%",
          overflow: "hidden",
        }}
      >
        <img
          alt=""
          src={src}
          width={180}
          height={180}
          style={{
            width: 180,
            height: 180,
            objectFit: "cover",
            borderRadius: "50%",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
