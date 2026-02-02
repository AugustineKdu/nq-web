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

        return res.status(405).json({ error: "Method not allowed" });
    } catch (error) {
        console.error("Projects API error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
