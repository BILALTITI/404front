import { ImageResponse } from "next/og";
import { getWatadLogoDataUri } from "@/lib/faviconSource";

export const runtime = "nodejs";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Apple touch icon: the Watad logo mark, cropped from the wide lockup
 *  (1408×768, mark on the left) into the square. */
export default async function AppleIcon() {
  const src = await getWatadLogoDataUri();

  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          display: "flex",
          position: "relative",
          background: "#ffffff",
          overflow: "hidden",
        }}
      >
        <img
          alt=""
          src={src}
          width={399}
          height={218}
          style={{
            position: "absolute",
            width: 399,
            height: 218,
            left: 8,
            top: -19,
          }}
        />
        {/* Mask the wordmark that sits right of the mark in the lockup. */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            width: 20,
            height: 180,
            background: "#ffffff",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
