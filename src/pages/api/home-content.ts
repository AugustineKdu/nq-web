import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    const lang = (req.query.lang as string) || "ko";

    try {
        switch (method) {
            case "GET":
                // Get home content for specific language
                const content = await prisma.homeContent.findUnique({
                    where: { id_lang: { id: "main", lang } }
                });

                if (!content) {
                    // Return default content if not found
                    return res.status(200).json({
                        id: "main",
                        lang,
                        heroEyebrow: lang === "ko" ? "Digital Solution Partner" : "Digital Solution Partner",
                        heroHeadline: lang === "ko" ? ["아이디어를", "현실로"] : ["Ideas into", "Reality"],
                        heroSubtext: lang === "ko"
                            ? "기획부터 디자인, 개발까지.\n비즈니스에 필요한 디지털 솔루션을 제공합니다."
                            : "From planning to design and development.\nWe provide digital solutions for your business.",
                        heroCta: lang === "ko" ? "프로젝트 문의" : "Start a Project",
                        servicesEyebrow: "Services",
                        servicesHeadline: lang === "ko" ? "무엇이 필요하신가요?" : "What do you need?",
                        servicesViewAll: lang === "ko" ? "전체 서비스 보기" : "View All Services",
                        processEyebrow: "Process",
                        processHeadline: lang === "ko" ? "진행 방식" : "How We Work",
                        aiEyebrow: "AI · Automation",
                        aiHeadline: lang === "ko" ? "AI 자동화로\n일하는 방식을 바꿉니다" : "AI automation that\nchanges how you work",
                        aiDescription: lang === "ko"
                            ? "반복 업무 자동화부터 자체 AI 서비스 개발, ChatGPT·Claude 등 외부 AI 연동까지 — AI를 실제 업무에 적용하는 것이 NQ의 메인 서비스입니다."
                            : "From automating repetitive work to building custom AI services and integrating external AI like ChatGPT and Claude — applying AI to real work is NQ's main service.",
                        ctaSubtext: lang === "ko" ? "어떤 서비스가 필요하신지 편하게 문의해주세요." : "Feel free to contact us about your needs.",
                        ctaButton: lang === "ko" ? "문의하기" : "Contact Us"
                    });
                }

                return res.status(200).json(content);

            case "PUT":
                // Update home content
                const data = req.body;
                const updateLang = data.lang || "ko";

                const updated = await prisma.homeContent.upsert({
                    where: { id_lang: { id: "main", lang: updateLang } },
                    update: {
                        heroEyebrow: data.heroEyebrow,
                        heroHeadline: data.heroHeadline,
                        heroSubtext: data.heroSubtext,
                        heroCta: data.heroCta,
                        servicesEyebrow: data.servicesEyebrow,
                        servicesHeadline: data.servicesHeadline,
                        servicesViewAll: data.servicesViewAll,
                        processEyebrow: data.processEyebrow,
                        processHeadline: data.processHeadline,
                        aiEyebrow: data.aiEyebrow,
                        aiHeadline: data.aiHeadline,
                        aiDescription: data.aiDescription,
                        ctaSubtext: data.ctaSubtext,
                        ctaButton: data.ctaButton
                    },
                    create: {
                        id: "main",
                        lang: updateLang,
                        heroEyebrow: data.heroEyebrow,
                        heroHeadline: data.heroHeadline,
                        heroSubtext: data.heroSubtext,
                        heroCta: data.heroCta,
                        servicesEyebrow: data.servicesEyebrow,
                        servicesHeadline: data.servicesHeadline,
                        servicesViewAll: data.servicesViewAll,
                        processEyebrow: data.processEyebrow,
                        processHeadline: data.processHeadline,
                        aiEyebrow: data.aiEyebrow,
                        aiHeadline: data.aiHeadline,
                        aiDescription: data.aiDescription,
                        ctaSubtext: data.ctaSubtext,
                        ctaButton: data.ctaButton
                    }
                });

                return res.status(200).json(updated);

            default:
                res.setHeader("Allow", ["GET", "PUT"]);
                return res.status(405).end(`Method ${method} Not Allowed`);
        }
    } catch (error) {
        console.error("Home content API error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
