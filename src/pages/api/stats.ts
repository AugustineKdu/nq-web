import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if (req.method === "GET") {
            let stats = await prisma.siteStats.findUnique({
                where: { id: "main" },
            });

            if (!stats) {
                stats = await prisma.siteStats.create({
                    data: { id: "main" },
                });
            }

            return res.status(200).json(stats);
        }

        if (req.method === "PUT") {
            const stats = await prisma.siteStats.upsert({
                where: { id: "main" },
                update: req.body,
                create: { id: "main", ...req.body },
            });

            return res.status(200).json(stats);
        }

        return res.status(405).json({ error: "Method not allowed" });
    } catch (error) {
        console.error("Stats API error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
