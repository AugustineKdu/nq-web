import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if (req.method === "GET") {
            const { pageType, lang } = req.query;
            const services = await prisma.serviceItem.findMany({
                where: {
                    ...(pageType && { pageType: String(pageType) }),
                    ...(lang && { lang: String(lang) }),
                },
                orderBy: { order: "asc" },
            });
            return res.status(200).json(services);
        }

        if (req.method === "POST") {
            const service = await prisma.serviceItem.create({
                data: req.body,
            });
            return res.status(201).json(service);
        }

        if (req.method === "PUT") {
            const { id, ...data } = req.body;
            const service = await prisma.serviceItem.update({
                where: { id: Number(id) },
                data,
            });
            return res.status(200).json(service);
        }

        if (req.method === "DELETE") {
            const { id } = req.query;
            await prisma.serviceItem.delete({
                where: { id: Number(id) },
            });
            return res.status(204).end();
        }

        return res.status(405).json({ error: "Method not allowed" });
    } catch (error) {
        console.error("Services API error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
