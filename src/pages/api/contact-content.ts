import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    const lang = (req.query.lang as string) || "ko";

    try {
        switch (method) {
            case "GET":
                const content = await prisma.contactContent.findUnique({
                    where: { id_lang: { id: "main", lang } }
                });

                if (!content) {
                    return res.status(200).json({
                        id: "main",
                        lang,
                        heroIntro: lang === "ko"
                            ? "프로젝트에 대해\n편하게 문의해 주세요."
                            : "Feel free to contact us\nabout your project.",
                        heroDescription: lang === "ko"
                            ? "어떤 서비스가 필요하신지 알려주시면, 적합한 솔루션을 안내해 드립니다."
                            : "Let us know what services you need, and we'll guide you to the right solution.",
                        formDescription: lang === "ko"
                            ? "아래 내용을 포함해 문의해 주시면 더 정확한 상담이 가능합니다."
                            : "Including the following information will help us provide more accurate consultation.",
                        formButton: lang === "ko" ? "프로젝트 상담 신청" : "Request Consultation",
                        ctaSubtext: lang === "ko" ? "어떤 서비스가 필요하신지 편하게 문의해주세요." : "Feel free to contact us about your needs."
                    });
                }

                return res.status(200).json(content);

            case "PUT":
                const data = req.body;
                const updateLang = data.lang || "ko";

                const updated = await prisma.contactContent.upsert({
                    where: { id_lang: { id: "main", lang: updateLang } },
                    update: {
                        heroIntro: data.heroIntro,
                        heroDescription: data.heroDescription,
                        formDescription: data.formDescription,
                        formButton: data.formButton,
                        ctaSubtext: data.ctaSubtext
                    },
                    create: {
                        id: "main",
                        lang: updateLang,
                        heroIntro: data.heroIntro,
                        heroDescription: data.heroDescription,
                        formDescription: data.formDescription,
                        formButton: data.formButton,
                        ctaSubtext: data.ctaSubtext
                    }
                });

                return res.status(200).json(updated);

            default:
                res.setHeader("Allow", ["GET", "PUT"]);
                return res.status(405).end(`Method ${method} Not Allowed`);
        }
    } catch (error) {
        console.error("Contact content API error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
