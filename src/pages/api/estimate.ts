import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import {
  computeEstimate,
  PROJECT_TYPES,
  SCALES,
  FEATURES,
  DESIGNS,
  TIMELINES,
  type EstimateInput,
  type FeatureKey,
} from "../../lib/estimate";
import { sendInquiryEmail, escapeHtml } from "../../lib/email";

const ESTIMATES_FILE = path.join(process.cwd(), "data", "estimates.json");

interface ContactInfo {
  name: string;
  phone: string;
  email?: string | null;
  company?: string | null;
  message?: string | null;
}

function ensureDataFile() {
  const dir = path.dirname(ESTIMATES_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(ESTIMATES_FILE)) fs.writeFileSync(ESTIMATES_FILE, "[]", "utf-8");
}

function readEstimates(): unknown[] {
  ensureDataFile();
  try {
    return JSON.parse(fs.readFileSync(ESTIMATES_FILE, "utf-8"));
  } catch {
    return [];
  }
}

function writeEstimates(data: unknown[]) {
  ensureDataFile();
  fs.writeFileSync(ESTIMATES_FILE, JSON.stringify(data, null, 2), "utf-8");
}

const label = <T extends { key: string; label: string }>(arr: T[], key: string): string =>
  arr.find((o) => o.key === key)?.label ?? key;

function isValidInput(input: Partial<EstimateInput> | undefined): input is EstimateInput {
  if (!input) return false;
  const typeOk = PROJECT_TYPES.some((o) => o.key === input.projectType);
  const scaleOk = SCALES.some((o) => o.key === input.scale);
  const designOk = DESIGNS.some((o) => o.key === input.design);
  const timeOk = TIMELINES.some((o) => o.key === input.timeline);
  const featuresOk =
    input.features === undefined ||
    (Array.isArray(input.features) && input.features.every((f) => FEATURES.some((o) => o.key === f)));
  return typeOk && scaleOk && designOk && timeOk && featuresOk;
}

function buildSummary(input: EstimateInput, contact: ContactInfo, rangeLabel: string, weeksLabel: string): string {
  const featureLabels = (input.features ?? []).map((f) => label(FEATURES, f)).join(", ") || "없음";
  return [
    `[NQ 견적 상담]`,
    `유형: ${label(PROJECT_TYPES, input.projectType)}`,
    `규모: ${label(SCALES, input.scale)}`,
    `기능: ${featureLabels}`,
    `디자인: ${label(DESIGNS, input.design)}`,
    `일정: ${label(TIMELINES, input.timeline)}`,
    `예상 견적: ${rangeLabel} / ${weeksLabel}`,
    `이름: ${contact.name}`,
    `연락처: ${contact.phone}`,
    contact.email ? `이메일: ${contact.email}` : null,
    contact.company ? `회사: ${contact.company}` : null,
    contact.message ? `메모: ${contact.message}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}

async function forwardToPluug(payload: Record<string, unknown>): Promise<"sent" | "skipped" | "failed"> {
  const url = process.env.PLUUG_WEBHOOK_URL;
  if (!url) return "skipped";
  try {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (process.env.PLUUG_WEBHOOK_SECRET) headers["X-Webhook-Secret"] = process.env.PLUUG_WEBHOOK_SECRET;
    const res = await fetch(url, { method: "POST", headers, body: JSON.stringify(payload) });
    return res.ok ? "sent" : "failed";
  } catch (e) {
    console.error("[estimate] pluug webhook error:", e);
    return "failed";
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return res.status(200).json(readEstimates());
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST", "GET"]);
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = req.body as { input?: EstimateInput; contact?: ContactInfo };
    const input = body.input;
    const contact = body.contact;

    if (!isValidInput(input)) {
      return res.status(400).json({ error: "견적 입력값이 올바르지 않습니다." });
    }
    if (!contact?.name || !contact?.phone) {
      return res.status(400).json({ error: "이름과 연락처는 필수입니다." });
    }

    // 서버에서 견적 재계산 (무결성 — 클라이언트 값 신뢰하지 않음)
    const estimate = computeEstimate(input);

    const record = {
      id: Date.now(),
      createdAt: new Date().toISOString(),
      status: "new" as const,
      input,
      inputLabels: {
        projectType: label(PROJECT_TYPES, input.projectType),
        scale: label(SCALES, input.scale),
        features: (input.features ?? []).map((f: FeatureKey) => label(FEATURES, f)),
        design: label(DESIGNS, input.design),
        timeline: label(TIMELINES, input.timeline),
      },
      contact: {
        name: contact.name,
        phone: contact.phone,
        email: contact.email || null,
        company: contact.company || null,
        message: contact.message || null,
      },
      estimate: { min: estimate.min, max: estimate.max, rangeLabel: estimate.rangeLabel, weeksLabel: estimate.weeksLabel },
    };

    const list = readEstimates();
    list.unshift(record);
    writeEstimates(list);

    const summaryText = buildSummary(input, contact, estimate.rangeLabel, estimate.weeksLabel);
    console.log(`[NEW ESTIMATE] ${contact.name} / ${contact.phone} / ${estimate.rangeLabel}`);

    const pluugStatus = await forwardToPluug({
      source: "nqsolution.kr/estimate",
      createdAt: record.createdAt,
      contact: record.contact,
      input: record.input,
      inputLabels: record.inputLabels,
      estimate: record.estimate,
      summaryText,
    });

    // 담당자(dwkim@nqsolution.kr)에게 견적 요약 이메일 발송
    const c = record.contact;
    const il = record.inputLabels;
    const row = (k: string, v: string) =>
      `<tr><td style="padding:6px 12px;color:#78716c;white-space:nowrap;vertical-align:top">${k}</td><td style="padding:6px 12px;color:#1c1917">${v}</td></tr>`;
    const emailHtml = `
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Pretendard',sans-serif;max-width:560px;margin:0 auto;color:#1c1917">
        <div style="border-bottom:3px solid #3D7A80;padding-bottom:12px;margin-bottom:16px">
          <h2 style="margin:0;font-size:20px">새 견적 상담 신청</h2>
          <p style="margin:4px 0 0;color:#78716c;font-size:13px">nqsolution.kr · 견적 계산기</p>
        </div>
        <div style="background:#f5f5f4;border-radius:8px;padding:16px;margin-bottom:16px">
          <div style="font-size:13px;color:#3D7A80;margin-bottom:4px">예상 견적</div>
          <div style="font-size:22px;font-weight:600">${estimate.rangeLabel}</div>
          <div style="font-size:13px;color:#78716c">${estimate.weeksLabel}</div>
        </div>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          ${row("유형", il.projectType)}
          ${row("규모", il.scale)}
          ${row("기능", il.features.length ? il.features.join(", ") : "없음")}
          ${row("디자인", il.design)}
          ${row("일정", il.timeline)}
          <tr><td colspan="2" style="border-top:1px solid #e7e5e4;padding-top:6px"></td></tr>
          ${row("이름", escapeHtml(c.name))}
          ${row("연락처", escapeHtml(c.phone))}
          ${c.email ? row("이메일", escapeHtml(c.email)) : ""}
          ${c.company ? row("회사", escapeHtml(c.company)) : ""}
          ${c.message ? row("메모", escapeHtml(c.message).replace(/\n/g, "<br/>")) : ""}
        </table>
        <p style="color:#a8a29e;font-size:12px;margin-top:20px">접수: ${record.createdAt}</p>
      </div>`;
    const emailStatus = await sendInquiryEmail({
      subject: `[NQ 견적문의] ${c.name} · ${estimate.rangeLabel}`,
      html: emailHtml,
      text: summaryText,
      replyTo: c.email || undefined,
    });

    // 고객 확인(자동 회신) 메일 — 고객이 이메일을 남긴 경우
    let customerEmailStatus: "sent" | "skipped" | "failed" = "skipped";
    if (c.email) {
      const customerHtml = `
        <div style="font-family:-apple-system,BlinkMacSystemFont,'Pretendard',sans-serif;max-width:560px;margin:0 auto;color:#1c1917">
          <div style="border-bottom:3px solid #3D7A80;padding-bottom:14px;margin-bottom:18px">
            <h2 style="margin:0;font-size:20px">견적 상담 신청이 접수되었습니다</h2>
            <p style="margin:6px 0 0;color:#78716c;font-size:13px">NQ Solution · 엔큐솔루션</p>
          </div>
          <p style="font-size:15px;line-height:1.7;margin:0 0 16px">
            ${escapeHtml(c.name)}님, 안녕하세요. NQ Solution(엔큐솔루션)입니다.<br/>
            견적 상담 신청이 정상적으로 접수되었습니다. 담당자가 영업일 기준 1~2일 내에 연락드리겠습니다.
          </p>
          <div style="background:#f5f5f4;border-radius:8px;padding:16px;margin-bottom:16px">
            <div style="font-size:13px;color:#3D7A80;margin-bottom:4px">예상 견적</div>
            <div style="font-size:22px;font-weight:600">${estimate.rangeLabel}</div>
            <div style="font-size:13px;color:#78716c">${estimate.weeksLabel}</div>
          </div>
          <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:16px">
            ${row("유형", il.projectType)}
            ${row("규모", il.scale)}
            ${row("기능", il.features.length ? il.features.join(", ") : "없음")}
            ${row("디자인", il.design)}
            ${row("일정", il.timeline)}
          </table>
          <p style="font-size:12px;color:#a8a29e;line-height:1.6;margin:0 0 16px">
            ※ 본 금액은 입력하신 정보 기반의 예상 범위이며, 정확한 견적은 상담 후 요구사항 확정 시 결정됩니다.
          </p>
          <div style="border-top:1px solid #e7e5e4;padding-top:14px;font-size:13px;color:#57534e;line-height:1.7">
            문의: 전화 <a href="tel:+821033681594" style="color:#3D7A80">010-3368-1594</a>
            · 카카오톡 <a href="https://pf.kakao.com/_iTLzX" style="color:#3D7A80">채널 상담</a><br/>
            NQ Solution(엔큐솔루션) · 평택 기반 전국 웹·앱·시스템 개발
          </div>
        </div>`;
      customerEmailStatus = await sendInquiryEmail({
        to: c.email,
        subject: "[NQ Solution] 견적 상담 신청이 접수되었습니다",
        html: customerHtml,
        text: `${c.name}님, 견적 상담 신청이 접수되었습니다. 예상 견적: ${estimate.rangeLabel} (${estimate.weeksLabel}). 담당자가 영업일 기준 1~2일 내 연락드리겠습니다. 문의: 010-3368-1594`,
        replyTo: "dwkim@nqsolution.kr",
      });
    }

    return res
      .status(201)
      .json({ success: true, id: record.id, estimate, pluug: pluugStatus, email: emailStatus, customerEmail: customerEmailStatus });
  } catch (error) {
    console.error("Estimate submission error:", error);
    return res.status(500).json({ error: "견적 접수 중 오류가 발생했습니다." });
  }
}
