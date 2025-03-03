import { readdirSync } from "fs";
import { join } from "path";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const assetsDirectory = join(process.cwd(), "public/assets");
    const files = readdirSync(assetsDirectory)
      .filter((file) => /\.(png|jpe?g|gif)$/i.test(file))
      .map((file) => `/assets/${file}`);

    res.status(200).json(files);
  } catch (error) {
    console.error("Error reading assets directory:", error);
    res.status(500).json({ error: "Failed to read assets directory" });
  }
}
