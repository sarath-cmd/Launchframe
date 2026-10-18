import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** iOS home-screen icon: the brand mark on a white tile. */
export default async function AppleIcon() {
  const mark = await readFile(join(process.cwd(), "public/brand/launchframe-mark.svg"));
  const src = `data:image/svg+xml;base64,${mark.toString("base64")}`;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#ffffff" }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- rendered by ImageResponse, not the browser */}
        <img src={src} width={104} height={120} alt="" />
      </div>
    ),
    size,
  );
}
