/**
 * 이메일 발송 헬퍼 (Resend HTTP API — 별도 SDK/의존성 없이 fetch 사용)
 *
 * 필요한 환경변수:
 *   RESEND_API_KEY   — Resend API 키 (없으면 발송 생략, "skipped" 반환)
 *   RESEND_FROM      — 보내는 사람. 예) "NQ Solution <noreply@nqsolution.kr>"
 *                      (도메인 미인증 시 테스트는 "onboarding@resend.dev" 사용)
 *   INQUIRY_TO_EMAIL — 받는 사람(담당자). 기본값 dwkim@nqsolution.kr
 */

export interface SendEmailParams {
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
  /** 수신 주소. 미지정 시 INQUIRY_TO_EMAIL(담당자)로 발송 */
  to?: string;
}

export type EmailStatus = "sent" | "skipped" | "failed";

export async function sendInquiryEmail(params: SendEmailParams): Promise<EmailStatus> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return "skipped";

  const to = params.to || process.env.INQUIRY_TO_EMAIL || "dwkim@nqsolution.kr";
  const from = process.env.RESEND_FROM || "NQ Solution <onboarding@resend.dev>";

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject: params.subject,
        html: params.html,
        text: params.text,
        reply_to: params.replyTo,
      }),
    });
    if (!res.ok) {
      console.error("[email] resend failed:", res.status, await res.text().catch(() => ""));
      return "failed";
    }
    return "sent";
  } catch (e) {
    console.error("[email] error:", e);
    return "failed";
  }
}

/** 간단한 HTML 이스케이프 (사용자 입력을 메일 본문에 넣을 때) */
export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
