import { readFile } from "node:fs/promises";
import { join } from "node:path";

let cached: string | null = null;

/** Data URI for `public/404image.jpeg` (cached for icon + apple-icon generation). */
export async function get404ImageDataUri(): Promise<string> {
  if (cached) return cached;
  const buf = await readFile(join(process.cwd(), "public/404image.jpeg"));
  cached = `data:image/jpeg;base64,${buf.toString("base64")}`;
  return cached;
}
