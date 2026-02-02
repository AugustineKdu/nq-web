import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if (req.method === "GET") {
            const links = await prisma.externalLink.findMany({
                orderBy: { order: "asc" },
            });
            return res.status(200).json(links);
        }

        if (req.method === "POST") {
            const link = await prisma.externalLink.create({
                data: req.body,
            });
            return res.status(201).json(link);
        }

        if (req.method === "PUT") {
            const { id, ...data } = req.body;
            const link = await prisma.externalLink.update({
                where: { id: Number(id) },
                data,
            });
            return res.status(200).json(link);
        }

        if (req.method === "DELETE") {
            const { id } = req.query;
            await prisma.externalLink.delete({
                where: { id: Number(id) },
            });
            return res.status(204).end();
        }

        return res.status(405).json({ error: "Method not allowed" });
    } catch (error) {
        console.error("External Links API error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
