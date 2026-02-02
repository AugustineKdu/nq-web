import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if (req.method === "GET") {
            const projects = await prisma.project.findMany({
                orderBy: [{ order: "asc" }, { id: "desc" }],
            });
            return res.status(200).json(projects);
        }

        if (req.method === "POST") {
            const project = await prisma.project.create({
                data: req.body,
            });
            return res.status(201).json(project);
        }

        if (req.method === "PUT") {
            const { id, ...data } = req.body;
            const project = await prisma.project.update({
                where: { id: Number(id) },
                data,
            });
            return res.status(200).json(project);
        }

        if (req.method === "DELETE") {
            const { id } = req.query;
            await prisma.project.delete({
                where: { id: Number(id) },
            });
            return res.status(204).end();
        }

        if (req.method === "PATCH") {
            // Bulk update order
            const { orders } = req.body; // [{ id: 1, order: 0 }, { id: 2, order: 1 }, ...]
            if (Array.isArray(orders)) {
                await Promise.all(
                    orders.map((item: { id: number; order: number }) =>
                        prisma.project.update({
                            where: { id: item.id },
                            data: { order: item.order },
                        })
                    )
                );
                return res.status(200).json({ success: true });
            }
            return res.status(400).json({ error: "Invalid orders data" });
        }

        return res.status(405).json({ error: "Method not allowed" });
    } catch (error) {
        console.error("Projects API error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
