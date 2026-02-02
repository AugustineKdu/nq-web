import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        // Track page view
        if (req.method === "POST") {
            const { path } = req.body;
            if (!path) {
                return res.status(400).json({ error: "Path is required" });
            }

            const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

            // Upsert page view count
            const pageView = await prisma.pageView.upsert({
                where: {
                    path_date: { path, date: today }
                },
                update: {
                    count: { increment: 1 }
                },
                create: {
                    path,
                    date: today,
                    count: 1
                }
            });

            return res.status(200).json({ success: true, pageView });
        }

        // Get analytics data
        if (req.method === "GET") {
            const { days = "7" } = req.query;
            const daysNum = parseInt(String(days), 10);

            // Calculate date range
            const endDate = new Date();
            const startDate = new Date();
            startDate.setDate(startDate.getDate() - daysNum);

            const startDateStr = startDate.toISOString().split("T")[0];
            const endDateStr = endDate.toISOString().split("T")[0];

            // Get page views for date range
            const pageViews = await prisma.pageView.findMany({
                where: {
                    date: {
                        gte: startDateStr,
                        lte: endDateStr
                    }
                },
                orderBy: { date: "asc" }
            });

            // Aggregate by date
            const dailyViews: Record<string, number> = {};
            const pageStats: Record<string, number> = {};

            pageViews.forEach(pv => {
                // Daily totals
                dailyViews[pv.date] = (dailyViews[pv.date] || 0) + pv.count;
                // Page totals
                pageStats[pv.path] = (pageStats[pv.path] || 0) + pv.count;
            });

            // Fill in missing dates with 0
            const filledDailyViews: { date: string; count: number }[] = [];
            const currentDate = new Date(startDate);
            while (currentDate <= endDate) {
                const dateStr = currentDate.toISOString().split("T")[0];
                filledDailyViews.push({
                    date: dateStr,
                    count: dailyViews[dateStr] || 0
                });
                currentDate.setDate(currentDate.getDate() + 1);
            }

            // Calculate totals
            const totalViews = Object.values(dailyViews).reduce((a, b) => a + b, 0);
            const todayViews = dailyViews[endDateStr] || 0;

            // Sort pages by views
            const topPages = Object.entries(pageStats)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 10)
                .map(([path, count]) => ({ path, count }));

            return res.status(200).json({
                totalViews,
                todayViews,
                dailyViews: filledDailyViews,
                topPages,
                dateRange: { start: startDateStr, end: endDateStr }
            });
        }

        return res.status(405).json({ error: "Method not allowed" });
    } catch (error) {
        console.error("Analytics API error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
