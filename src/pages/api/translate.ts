import type { NextApiRequest, NextApiResponse } from "next";

// Translation API using external service
// You can replace this with your preferred translation API (Google, DeepL, etc.)
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        res.setHeader("Allow", ["POST"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    try {
        const { text, targetLang = "en" } = req.body;

        if (!text) {
            return res.status(400).json({ error: "Text is required" });
        }

        // Option 1: Use Google Translate API (free tier with limitations)
        // You need to set GOOGLE_TRANSLATE_API_KEY in .env
        const googleApiKey = process.env.GOOGLE_TRANSLATE_API_KEY;

        if (googleApiKey) {
            const response = await fetch(
                `https://translation.googleapis.com/language/translate/v2?key=${googleApiKey}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        q: text,
                        source: "ko",
                        target: targetLang,
                        format: "text"
                    })
                }
            );

            if (response.ok) {
                const data = await response.json();
                const translatedText = data.data.translations[0].translatedText;
                return res.status(200).json({ translatedText });
            }
        }

        // Option 2: Use DeepL API
        // You need to set DEEPL_API_KEY in .env
        const deeplApiKey = process.env.DEEPL_API_KEY;

        if (deeplApiKey) {
            const response = await fetch(
                "https://api-free.deepl.com/v2/translate",
                {
                    method: "POST",
                    headers: {
                        "Authorization": `DeepL-Auth-Key ${deeplApiKey}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        text: [text],
                        source_lang: "KO",
                        target_lang: targetLang.toUpperCase()
                    })
                }
            );

            if (response.ok) {
                const data = await response.json();
                const translatedText = data.translations[0].text;
                return res.status(200).json({ translatedText });
            }
        }

        // Option 3: Use LibreTranslate (self-hosted or free instance)
        // You can set LIBRE_TRANSLATE_URL in .env for custom instance
        const libreTranslateUrl = process.env.LIBRE_TRANSLATE_URL || "https://libretranslate.com/translate";

        try {
            const response = await fetch(libreTranslateUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    q: text,
                    source: "ko",
                    target: targetLang,
                    format: "text"
                })
            });

            if (response.ok) {
                const data = await response.json();
                return res.status(200).json({ translatedText: data.translatedText });
            }
        } catch {
            // LibreTranslate not available, use fallback
        }

        // Fallback: Simple placeholder (user should configure API key)
        // This just returns a message indicating translation is not configured
        return res.status(200).json({
            translatedText: text,
            warning: "Translation API not configured. Please set GOOGLE_TRANSLATE_API_KEY or DEEPL_API_KEY in .env"
        });

    } catch (error) {
        console.error("Translation API error:", error);
        return res.status(500).json({ error: "Translation failed" });
    }
}
