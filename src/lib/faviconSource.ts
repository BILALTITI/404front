import { readFile } from "node:fs/promises";
import { join } from "node:path";

let cached: string | null = null;

/** Data URI for `public/watad-logo.png` (cached for icon + apple-icon generation). */
export async function getWatadLogoDataUri(): Promise<string> {
  if (cached) return cached;
  const buf = await readFile(join(process.cwd(), "public/watad-logo.png"));
  cached = `data:image/png;base64,${buf.toString("base64")}`;
  return cached;
}
