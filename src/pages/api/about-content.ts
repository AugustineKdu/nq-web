import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    const lang = (req.query.lang as string) || "ko";

    try {
        switch (method) {
            case "GET":
                const content = await prisma.aboutContent.findUnique({
                    where: { id_lang: { id: "main", lang } }
                });

                if (!content) {
                    return res.status(200).json({
                        id: "main",
                        lang,
                        headline: "NQ Solution",
                        intro: lang === "ko"
                            ? "기획, 웹개발, 디자인을 중심으로\n디지털 솔루션을 제공합니다."
                            : "We provide digital solutions\nfocused on planning, web development, and design.",
                        description: lang === "ko"
                            ? "기존 웹사이트 리뉴얼, 신규 서비스 구축, AI 도입까지. 고객이 필요한 것을 파악하고 적합한 방법을 찾아 실행합니다."
                            : "From website renewal to new service development and AI integration. We identify what clients need and execute the best solutions.",
                        futureDescription: lang === "ko"
                            ? "현재 법인 설립을 준비하고 있으며, 자체 앱과 서비스 개발을 통한 꾸준한 성장을 목표로 하고 있습니다."
                            : "We are preparing to establish a corporation and aim for steady growth through developing our own apps and services.",
                        futureSubtext: lang === "ko"
                            ? "의뢰 프로젝트에서 쌓은 경험을 바탕으로, 자체 서비스를 통해 더 많은 분들께 가치를 전달하고자 합니다."
                            : "Based on experience from client projects, we aim to deliver value to more people through our own services.",
                        ctaSubtext: lang === "ko" ? "어떤 서비스가 필요하신지 편하게 문의해주세요." : "Feel free to contact us about your needs."
                    });
                }

                return res.status(200).json(content);

            case "PUT":
                const data = req.body;
                const updateLang = data.lang || "ko";

                const updated = await prisma.aboutContent.upsert({
                    where: { id_lang: { id: "main", lang: updateLang } },
                    update: {
                        headline: data.headline,
                        intro: data.intro,
                        description: data.description,
                        futureDescription: data.futureDescription,
                        futureSubtext: data.futureSubtext,
                        ctaSubtext: data.ctaSubtext
                    },
                    create: {
                        id: "main",
                        lang: updateLang,
                        headline: data.headline,
                        intro: data.intro,
                        description: data.description,
                        futureDescription: data.futureDescription,
                        futureSubtext: data.futureSubtext,
                        ctaSubtext: data.ctaSubtext
                    }
                });

                return res.status(200).json(updated);

            default:
                res.setHeader("Allow", ["GET", "PUT"]);
                return res.status(405).end(`Method ${method} Not Allowed`);
        }
    } catch (error) {
        console.error("About content API error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
