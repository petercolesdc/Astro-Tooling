import type { ImageMetadata } from "astro";

const modules = import.meta.glob("../assets/images/**/*", {
  eager: true,
});

const imageMap = Object.fromEntries(
  Object.entries(modules).map(([path, mod]) => {
    const key = path.split("/").pop() as string;
    return [key, (mod as any).default];
  })
) as Record<string, ImageMetadata>;

export function resolveImage(name?: string): ImageMetadata | undefined {
  if (!name) return undefined;

  const img = imageMap[name];

  if (!img) {
    console.warn(`Image not found: ${name}`);
  }

  return img;
}
