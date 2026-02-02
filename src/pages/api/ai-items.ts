import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if (req.method === "GET") {
            const { lang } = req.query;
            const items = await prisma.aiItem.findMany({
                where: lang ? { lang: String(lang) } : undefined,
                orderBy: { order: "asc" },
            });
            return res.status(200).json(items);
        }

        if (req.method === "POST") {
            const item = await prisma.aiItem.create({
                data: req.body,
            });
            return res.status(201).json(item);
        }

        if (req.method === "PUT") {
            const { id, ...data } = req.body;
            const item = await prisma.aiItem.update({
                where: { id: Number(id) },
                data,
            });
            return res.status(200).json(item);
        }

        if (req.method === "DELETE") {
            const { id } = req.query;
            await prisma.aiItem.delete({
                where: { id: Number(id) },
            });
            return res.status(204).end();
        }

        return res.status(405).json({ error: "Method not allowed" });
    } catch (error) {
        console.error("AI Items API error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
