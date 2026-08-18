import { ImageResponse } from "next/og";
import { getWatadLogoDataUri } from "@/lib/faviconSource";

export const runtime = "nodejs";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Favicon: the Watad logo mark. The source is a wide lockup (1408×768, mark
 *  on the left), so we oversize the image and offset it to crop the mark into
 *  the square — keeps it readable at 16×16. */
export default async function Icon() {
  const src = await getWatadLogoDataUri();

  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          display: "flex",
          position: "relative",
          background: "#ffffff",
          overflow: "hidden",
          borderRadius: 6,
        }}
      >
        <img
          alt=""
          src={src}
          width={78}
          height={43}
          style={{
            position: "absolute",
            width: 78,
            height: 43,
            left: 0,
            top: -5,
          }}
        />
        {/* Mask the wordmark that sits right of the mark in the lockup. */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            width: 4,
            height: 32,
            background: "#ffffff",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
