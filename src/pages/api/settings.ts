import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if (req.method === "GET") {
            // Get settings
            let settings = await prisma.siteSettings.findUnique({
                where: { id: "main" },
            });

            // Create default settings if not exists
            if (!settings) {
                settings = await prisma.siteSettings.create({
                    data: { id: "main" },
                });
            }

            return res.status(200).json(settings);
        }

        if (req.method === "PUT") {
            // Update settings
            const settings = await prisma.siteSettings.upsert({
                where: { id: "main" },
                update: req.body,
                create: { id: "main", ...req.body },
            });

            return res.status(200).json(settings);
        }

        return res.status(405).json({ error: "Method not allowed" });
    } catch (error) {
        console.error("Settings API error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
