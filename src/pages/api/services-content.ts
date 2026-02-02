import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    const lang = (req.query.lang as string) || "ko";

    try {
        switch (method) {
            case "GET":
                const content = await prisma.servicesContent.findUnique({
                    where: { id_lang: { id: "main", lang } }
                });

                if (!content) {
                    return res.status(200).json({
                        id: "main",
                        lang,
                        heroDescription: lang === "ko"
                            ? "웹사이트, 앱, AI 연동까지.\n필요한 디지털 솔루션을 맞춤형으로 제공합니다."
                            : "Websites, apps, and AI integration.\nWe provide customized digital solutions for your needs.",
                        pricingDescription: lang === "ko"
                            ? "프로젝트 특성에 따라 유연하게 견적을 산정합니다. 상담 시 범위와 요구사항을 파악한 후 정확한 견적을 안내해 드립니다."
                            : "We flexibly estimate quotes based on project characteristics. After understanding the scope and requirements during consultation, we provide accurate estimates.",
                        ctaSubtext: lang === "ko" ? "어떤 서비스가 필요하신지 편하게 문의해주세요." : "Feel free to contact us about your needs."
                    });
                }

                return res.status(200).json(content);

            case "PUT":
                const data = req.body;
                const updateLang = data.lang || "ko";

                const updated = await prisma.servicesContent.upsert({
                    where: { id_lang: { id: "main", lang: updateLang } },
                    update: {
                        heroDescription: data.heroDescription,
                        pricingDescription: data.pricingDescription,
                        ctaSubtext: data.ctaSubtext
                    },
                    create: {
                        id: "main",
                        lang: updateLang,
                        heroDescription: data.heroDescription,
                        pricingDescription: data.pricingDescription,
                        ctaSubtext: data.ctaSubtext
                    }
                });

                return res.status(200).json(updated);

            default:
                res.setHeader("Allow", ["GET", "PUT"]);
                return res.status(405).end(`Method ${method} Not Allowed`);
        }
    } catch (error) {
        console.error("Services content API error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
