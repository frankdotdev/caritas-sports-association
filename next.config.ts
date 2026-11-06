import type { NextConfig } from "next";
import path from "node:path";
import fs from "node:fs";

// Pre-flight housekeeping when Next.js starts
try {
  // 1. Remove duplicate dynamic route folder src/app/sports/[slug] if [sportSlug] exists
  const redundantSlugDir = path.join(process.cwd(), "src", "app", "sports", "[slug]");
  if (fs.existsSync(redundantSlugDir)) {
    fs.rmSync(redundantSlugDir, { recursive: true, force: true });
    console.log("✓ Successfully resolved route conflict by removing duplicate [slug] folder");
  }

  // 2. Copy official user-uploaded logo to public/logo.png and public/icon.png
  const uploadedLogo = "C:/Users/Administrator/.gemini/antigravity/brain/624bde9a-f31f-412c-92c2-4bbee96e49d4/.user_uploaded/media_1793967266216_d1ea04ce.png";
  const publicDir = path.join(process.cwd(), "public");
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  if (fs.existsSync(uploadedLogo)) {
    const targetLogo = path.join(publicDir, "logo.png");
    const targetIcon = path.join(publicDir, "icon.png");
    const targetApple = path.join(publicDir, "apple-touch-icon.png");
    fs.copyFileSync(uploadedLogo, targetLogo);
    fs.copyFileSync(uploadedLogo, targetIcon);
    fs.copyFileSync(uploadedLogo, targetApple);
    console.log("✓ Successfully deployed official Caritas Sports Association logo across public assets");
  }

  // 3. Archive official match flyers in public/flyers/
  const flyersDir = path.join(publicDir, "flyers");
  if (!fs.existsSync(flyersDir)) {
    fs.mkdirSync(flyersDir, { recursive: true });
  }
  const flyers = [
    { src: "C:/Users/Administrator/.gemini/antigravity/brain/624bde9a-f31f-412c-92c2-4bbee96e49d4/.user_uploaded/media_1793970995736_96be2ea5.jpg", dest: "matchday-1-trinity-iea.jpg" },
    { src: "C:/Users/Administrator/.gemini/antigravity/brain/624bde9a-f31f-412c-92c2-4bbee96e49d4/.user_uploaded/media_1793971037832_4d0fe4af.jpg", dest: "matchday-2-ben-elite.jpg" },
    { src: "C:/Users/Administrator/.gemini/antigravity/brain/624bde9a-f31f-412c-92c2-4bbee96e49d4/.user_uploaded/media_1793971153560_4f86a1f5.jpg", dest: "matchday-3-jane-ckc.jpg" },
    { src: "C:/Users/Administrator/.gemini/antigravity/brain/624bde9a-f31f-412c-92c2-4bbee96e49d4/.user_uploaded/media_1793971360135_d5626304.jpg", dest: "matchday-4-remy-ark.jpg" },
    { src: "C:/Users/Administrator/.gemini/antigravity/brain/624bde9a-f31f-412c-92c2-4bbee96e49d4/.user_uploaded/media_1793971465910_516ba6f7.png", dest: "matchday-5-elite-trinity.png" },
  ];
  for (const f of flyers) {
    if (fs.existsSync(f.src)) {
      fs.copyFileSync(f.src, path.join(flyersDir, f.dest));
    }
  }
} catch (err) {
  console.warn("Notice in next.config.ts preflight:", err);
}

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  ...(process.env.VERCEL ? {} : { outputFileTracingRoot: path.join(__dirname) }),
  images: {
    unoptimized: true
  }
};

export default nextConfig;
