/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "@/db/db";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("1234567890abcdef", 6);

export async function generateSlug(text: string, model: "school" | "stream") {
  const baseSlug = text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  let slug = baseSlug;

  // Check if slug exists
  const existing = await (db[model] as any).findUnique({
    where: { slug },
  });

  // If exists, add unique identifier
  if (existing) {
    slug = `${baseSlug}-${nanoid()}`;
  }

  return slug;
}
