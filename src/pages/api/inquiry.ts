import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

const INQUIRIES_FILE = path.join(process.cwd(), "data", "inquiries.json");

function ensureDataDir() {
    const dir = path.dirname(INQUIRIES_FILE);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(INQUIRIES_FILE)) {
        fs.writeFileSync(INQUIRIES_FILE, "[]", "utf-8");
    }
}

function readInquiries() {
    ensureDataDir();
    const raw = fs.readFileSync(INQUIRIES_FILE, "utf-8");
    return JSON.parse(raw);
}

function writeInquiries(data: unknown[]) {
    ensureDataDir();
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(data, null, 2), "utf-8");
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        try {
            const { name, phone, email, message } = req.body;

            if (!name || !phone || !message) {
                return res.status(400).json({ error: "이름, 연락처, 메시지는 필수입니다." });
            }

            const inquiries = readInquiries();
            const newInquiry = {
                id: Date.now(),
                name,
                phone,
                email: email || null,
                message,
                status: "new",
                createdAt: new Date().toISOString(),
            };
            inquiries.unshift(newInquiry);
            writeInquiries(inquiries);

            console.log(`[NEW INQUIRY] ${name} / ${phone} / ${message.substring(0, 50)}`);

            return res.status(201).json({ success: true, id: newInquiry.id });
        } catch (error) {
            console.error("Inquiry submission error:", error);
            return res.status(500).json({ error: "문의 접수 중 오류가 발생했습니다." });
        }
    }

    if (req.method === "GET") {
        try {
            const inquiries = readInquiries();
            return res.status(200).json(inquiries);
        } catch {
            return res.status(200).json([]);
        }
    }

    return res.status(405).json({ error: "Method not allowed" });
}
