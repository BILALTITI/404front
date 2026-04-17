import { ImageResponse } from "next/og";
import { get404ImageDataUri } from "@/lib/faviconSource";

export const runtime = "nodejs";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
  const src = await get404ImageDataUri();

  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
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
          width={32}
          height={32}
          style={{
            width: 32,
            height: 32,
            objectFit: "cover",
            borderRadius: "50%",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
