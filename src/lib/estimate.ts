/**
 * 견적 산출 로직 (규칙 기반, LLM 미사용) — 한/영 다국어 지원.
 * 클라이언트(즉시 미리보기)와 서버 API(검증·저장) 양쪽에서 공용으로 사용한다.
 *
 * 금액 내부 단위는 "만원"(10,000 KRW). 예) 250 = 250만원.
 * 결과는 항상 "범위(min~max)"로 제공한다 — 최종 금액은 상담 후 요구사항 확정 시 결정.
 */

export type Lang = "ko" | "en";

export type ProjectTypeKey =
  | "landing"
  | "branding"
  | "shop"
  | "webapp"
  | "mobile"
  | "system";

export type ScaleKey = "xs" | "s" | "m" | "l";
export type DesignKey = "template" | "custom" | "premium";
export type TimelineKey = "urgent" | "normal" | "flexible";
export type FeatureKey =
  | "auth"
  | "payment"
  | "booking"
  | "community"
  | "admin"
  | "cms"
  | "multilang"
  | "map"
  | "chat"
  | "ai"
  | "api"
  | "analytics";

interface Range {
  min: number;
  max: number;
}

interface Option<K extends string> {
  key: K;
  label: string;
  labelEn: string;
  desc?: string;
  descEn?: string;
}

interface ProjectTypeOption extends Option<ProjectTypeKey> {
  base: Range;
  /** 기준 작업 주차 범위 */
  weeks: Range;
}

interface ScaleOption extends Option<ScaleKey> {
  mult: number;
  weekMult: number;
}

interface DesignOption extends Option<DesignKey> {
  mult: number;
}

interface TimelineOption extends Option<TimelineKey> {
  /** 비용 배수 (급할수록 인력 집중 → 비용↑) */
  mult: number;
  /** 기간 배수 (급할수록 기간↓) */
  weekMult: number;
}

interface FeatureOption extends Option<FeatureKey> {
  add: Range;
  /** 기능 추가에 따른 가산 주차 */
  weeks: number;
}

// 기준 단가는 국내 에이전시 외주 시장가(2025~2026)를 참고해 보정.
export const PROJECT_TYPES: ProjectTypeOption[] = [
  { key: "landing", label: "랜딩페이지", labelEn: "Landing page", desc: "단일 페이지 · 캠페인/이벤트", descEn: "Single page · campaign / event", base: { min: 50, max: 180 }, weeks: { min: 1, max: 3 } },
  { key: "branding", label: "브랜드/회사소개 홈페이지", labelEn: "Brand / company website", desc: "기업 사이트 · 다중 페이지", descEn: "Corporate site · multiple pages", base: { min: 250, max: 500 }, weeks: { min: 3, max: 6 } },
  { key: "shop", label: "쇼핑몰 · 커머스", labelEn: "E-commerce / shop", desc: "상품/주문/결제", descEn: "Products / orders / payments", base: { min: 500, max: 1300 }, weeks: { min: 6, max: 12 } },
  { key: "webapp", label: "웹앱 · 플랫폼 (SaaS)", labelEn: "Web app / platform (SaaS)", desc: "회원 기반 서비스/플랫폼", descEn: "Membership-based service or platform", base: { min: 700, max: 2000 }, weeks: { min: 8, max: 16 } },
  { key: "mobile", label: "모바일 앱", labelEn: "Mobile app", desc: "iOS/Android 앱", descEn: "iOS / Android app", base: { min: 800, max: 2500 }, weeks: { min: 8, max: 18 } },
  { key: "system", label: "업무시스템 · 자동화", labelEn: "Business system / automation", desc: "내부 관리/ERP/자동화", descEn: "Internal tools / ERP / automation", base: { min: 600, max: 1800 }, weeks: { min: 6, max: 14 } },
];

export const SCALES: ScaleOption[] = [
  { key: "xs", label: "1 ~ 5 페이지", labelEn: "1 – 5 pages", mult: 1.0, weekMult: 1.0 },
  { key: "s", label: "6 ~ 10 페이지", labelEn: "6 – 10 pages", mult: 1.25, weekMult: 1.25 },
  { key: "m", label: "11 ~ 20 페이지", labelEn: "11 – 20 pages", mult: 1.6, weekMult: 1.5 },
  { key: "l", label: "20 페이지 이상", labelEn: "20+ pages", mult: 2.1, weekMult: 1.9 },
];

export const FEATURES: FeatureOption[] = [
  { key: "auth", label: "회원가입 · 로그인", labelEn: "Sign up · Login", add: { min: 50, max: 120 }, weeks: 1 },
  { key: "payment", label: "결제 연동", labelEn: "Payment integration", add: { min: 80, max: 200 }, weeks: 1 },
  { key: "booking", label: "예약 · 스케줄", labelEn: "Booking · Scheduling", add: { min: 60, max: 150 }, weeks: 1 },
  { key: "community", label: "게시판 · 커뮤니티", labelEn: "Board · Community", add: { min: 50, max: 120 }, weeks: 1 },
  { key: "admin", label: "관리자 페이지", labelEn: "Admin panel", add: { min: 80, max: 200 }, weeks: 1 },
  { key: "cms", label: "콘텐츠 관리(CMS)", labelEn: "Content management (CMS)", add: { min: 60, max: 150 }, weeks: 1 },
  { key: "multilang", label: "다국어 지원", labelEn: "Multilingual", add: { min: 40, max: 100 }, weeks: 1 },
  { key: "map", label: "지도 · 위치", labelEn: "Map · Location", add: { min: 20, max: 60 }, weeks: 1 },
  { key: "chat", label: "실시간 채팅", labelEn: "Live chat", add: { min: 80, max: 180 }, weeks: 1 },
  { key: "ai", label: "AI 기능 연동", labelEn: "AI features", add: { min: 100, max: 300 }, weeks: 2 },
  { key: "api", label: "외부 API 연동", labelEn: "External API integration", add: { min: 50, max: 150 }, weeks: 1 },
  { key: "analytics", label: "통계 · 대시보드", labelEn: "Analytics · Dashboard", add: { min: 60, max: 160 }, weeks: 1 },
];

// 시장가 기준 디자인 수준별 폭(템플릿 ↔ 풀커스텀 약 2배)을 반영해 배수 확대.
export const DESIGNS: DesignOption[] = [
  { key: "template", label: "템플릿 기반", labelEn: "Template-based", desc: "검증된 레이아웃 · 합리적 비용", descEn: "Proven layout · cost-effective", mult: 0.75 },
  { key: "custom", label: "세미 커스텀", labelEn: "Semi-custom", desc: "메인 맞춤 + 서브 템플릿", descEn: "Custom main + template sub-pages", mult: 1.0 },
  { key: "premium", label: "풀 커스텀 · 브랜딩 포함", labelEn: "Full custom · branding", desc: "전체 맞춤 디자인 · 모션", descEn: "Fully bespoke design · motion", mult: 1.5 },
];

export const TIMELINES: TimelineOption[] = [
  { key: "urgent", label: "급함 (1개월 내)", labelEn: "Urgent (within 1 month)", mult: 1.25, weekMult: 0.7 },
  { key: "normal", label: "보통 (2 ~ 3개월)", labelEn: "Standard (2 – 3 months)", mult: 1.0, weekMult: 1.0 },
  { key: "flexible", label: "여유 (협의)", labelEn: "Flexible (TBD)", mult: 0.95, weekMult: 1.1 },
];

export interface EstimateInput {
  projectType: ProjectTypeKey;
  scale: ScaleKey;
  features: FeatureKey[];
  design: DesignKey;
  timeline: TimelineKey;
}

export interface EstimateBreakdownItem {
  label: string;
  amount: string;
}

export interface EstimateResult {
  min: number; // 만원
  max: number; // 만원
  rangeLabel: string;
  weeksLabel: string;
  breakdown: EstimateBreakdownItem[];
  maintenanceLabel: string;
  note: string;
}

const find = <T extends { key: string }>(arr: T[], key: string): T | undefined =>
  arr.find((o) => o.key === key);

/** 10만 단위로 반올림 */
const round10 = (v: number): number => Math.max(0, Math.round(v / 10) * 10);

/** 라벨/설명 다국어 헬퍼 */
export function labelOf<T extends { label: string; labelEn: string }>(o: T, lang: Lang): string {
  return lang === "en" ? o.labelEn : o.label;
}
export function descOf<T extends { desc?: string; descEn?: string }>(o: T, lang: Lang): string | undefined {
  return lang === "en" ? o.descEn : o.desc;
}

/** 한국어 금액 표기: 350만 / 1억 2000만 */
export function formatManwon(v: number): string {
  if (v >= 10000) {
    const eok = Math.floor(v / 10000);
    const rest = v % 10000;
    return rest > 0 ? `${eok}억 ${rest}만` : `${eok}억`;
  }
  return `${v}만`;
}

/** 영어 금액 표기: ₩3,500,000 (만원 → KRW) */
export function formatKRWen(manwon: number): string {
  return `₩${(manwon * 10000).toLocaleString("en-US")}`;
}

export function computeEstimate(input: EstimateInput, lang: Lang = "ko"): EstimateResult {
  const type = find(PROJECT_TYPES, input.projectType) ?? PROJECT_TYPES[1];
  const scale = find(SCALES, input.scale) ?? SCALES[0];
  const design = find(DESIGNS, input.design) ?? DESIGNS[1];
  const timeline = find(TIMELINES, input.timeline) ?? TIMELINES[1];
  const selectedFeatures = (input.features ?? [])
    .map((k) => find(FEATURES, k))
    .filter((f): f is FeatureOption => Boolean(f));

  // 1) 기본 + 규모
  let min = type.base.min * scale.mult;
  let max = type.base.max * scale.mult;

  // 2) 기능 가산
  for (const f of selectedFeatures) {
    min += f.add.min;
    max += f.add.max;
  }

  // 3) 디자인 · 일정 배수
  const factor = design.mult * timeline.mult;
  min = round10(min * factor);
  max = round10(max * factor);

  // 4) 기간(주차)
  let wMin = type.weeks.min * scale.weekMult;
  let wMax = type.weeks.max * scale.weekMult;
  const featureWeeks = selectedFeatures.reduce((s, f) => s + f.weeks, 0);
  wMin = Math.max(1, Math.round((wMin + featureWeeks * 0.5) * timeline.weekMult));
  wMax = Math.max(wMin + 1, Math.round((wMax + featureWeeks * 0.7) * timeline.weekMult));

  // 유지보수 (별도)
  const maintMin = round10(Math.max(10, min * 0.03));
  const maintMax = round10(Math.max(20, max * 0.05));

  const baseMin = round10(type.base.min * scale.mult);
  const baseMax = round10(type.base.max * scale.mult);

  if (lang === "en") {
    const range = (a: number, b: number) => `${formatKRWen(a)} ~ ${formatKRWen(b)}`;
    const breakdown: EstimateBreakdownItem[] = [
      { label: `${type.labelEn} (base · ${scale.labelEn})`, amount: range(baseMin, baseMax) },
      ...selectedFeatures.map((f) => ({ label: `+ ${f.labelEn}`, amount: range(f.add.min, f.add.max) })),
      { label: `Design: ${design.labelEn}`, amount: `×${design.mult}` },
      { label: `Timeline: ${timeline.labelEn}`, amount: `×${timeline.mult}` },
    ];
    return {
      min,
      max,
      rangeLabel: range(min, max),
      weeksLabel: `Est. ${wMin} – ${wMax} weeks`,
      breakdown,
      maintenanceLabel: `Monthly maintenance ${range(maintMin, maintMax)} (optional)`,
      note: "This is an estimated range based on your selections. The final quote is confirmed after consultation.",
    };
  }

  const breakdown: EstimateBreakdownItem[] = [
    { label: `${type.label} (기본 · ${scale.label})`, amount: `${formatManwon(baseMin)} ~ ${formatManwon(baseMax)}원` },
    ...selectedFeatures.map((f) => ({
      label: `+ ${f.label}`,
      amount: `${formatManwon(f.add.min)} ~ ${formatManwon(f.add.max)}원`,
    })),
    { label: `디자인: ${design.label}`, amount: `×${design.mult}` },
    { label: `일정: ${timeline.label}`, amount: `×${timeline.mult}` },
  ];

  return {
    min,
    max,
    rangeLabel: `${formatManwon(min)} ~ ${formatManwon(max)}원`,
    weeksLabel: `예상 ${wMin} ~ ${wMax}주`,
    breakdown,
    maintenanceLabel: `월 유지보수 ${formatManwon(maintMin)} ~ ${formatManwon(maintMax)}원 (선택)`,
    note: "본 금액은 입력 정보 기반 예상 범위입니다. 정확한 견적은 상담 후 요구사항 확정 시 확정됩니다.",
  };
}
