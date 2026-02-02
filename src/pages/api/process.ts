import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if (req.method === "GET") {
            const { pageType, lang } = req.query;
            const steps = await prisma.processStep.findMany({
                where: {
                    ...(pageType && { pageType: String(pageType) }),
                    ...(lang && { lang: String(lang) }),
                },
                orderBy: { order: "asc" },
            });
            return res.status(200).json(steps);
        }

        if (req.method === "POST") {
            const step = await prisma.processStep.create({
                data: req.body,
            });
            return res.status(201).json(step);
        }

        if (req.method === "PUT") {
            const { id, ...data } = req.body;
            const step = await prisma.processStep.update({
                where: { id: Number(id) },
                data,
            });
            return res.status(200).json(step);
        }

        if (req.method === "DELETE") {
            const { id } = req.query;
            await prisma.processStep.delete({
                where: { id: Number(id) },
            });
            return res.status(204).end();
        }

        return res.status(405).json({ error: "Method not allowed" });
    } catch (error) {
        console.error("Process API error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
