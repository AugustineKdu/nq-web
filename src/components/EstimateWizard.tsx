import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Sparkles,
  Send,
  CheckCircle2,
  Calculator,
  RefreshCw,
  ChevronDown,
  Mail,
} from "lucide-react";
import {
  PROJECT_TYPES,
  SCALES,
  FEATURES,
  DESIGNS,
  TIMELINES,
  computeEstimate,
  labelOf,
  descOf,
  type Lang,
  type ProjectTypeKey,
  type ScaleKey,
  type DesignKey,
  type TimelineKey,
  type FeatureKey,
} from "../lib/estimate";

type StepId = "projectType" | "scale" | "features" | "design" | "timeline" | "contact";

interface StepDef {
  id: StepId;
  label: string;
  helper: string;
}

interface NamedRow {
  n: string;
  t: string;
  d: string;
}
interface QA {
  q: string;
  a: string;
}
interface PriceRow {
  l: string;
  r: string;
}

interface WizardContent {
  steps: StepDef[];
  hero: { eyebrow: string; titleTop: string; titleAccent: string; sub: string };
  ui: {
    step: string;
    autoAdvance: string;
    next: string;
    prev: string;
  };
  panel: { eyebrow: string; empty: string; emptyHint: string; sumType: string; sumScale: string };
  form: {
    name: string;
    namePh: string;
    phone: string;
    phonePh: string;
    email: string;
    emailPh: string;
    emailHint: string;
    company: string;
    companyPh: string;
    message: string;
    messagePh: string;
    submit: string;
    submitting: string;
    error: string;
  };
  success: { title: string; line1: string; emailLine: (e: string) => React.ReactNode; estimate: string; reset: string };
  how: { eyebrow: string; title: string; steps: NamedRow[] };
  transparency: { eyebrow: string; title: string; lead: string; items: { t: string; d: string }[] };
  cms: { eyebrow: string; title: string; lead: React.ReactNode; cards: NamedRow[]; foot: string };
  faq: { eyebrow: string; title: string; items: QA[] };
  ref: {
    eyebrow: string;
    title: string;
    intro: React.ReactNode;
    typeHead: [string, string];
    designHead: [string, string];
    recurringHead: [string, string];
    typeTitle: string;
    designTitle: string;
    recurringTitle: string;
    types: PriceRow[];
    designs: PriceRow[];
    recurring: PriceRow[];
  };
}

const CONTENT: Record<Lang, WizardContent> = {
  ko: {
    steps: [
      { id: "projectType", label: "어떤 프로젝트인가요?", helper: "만들고 싶은 결과물을 골라주세요." },
      { id: "scale", label: "규모는 어느 정도일까요?", helper: "대략적인 페이지/화면 수예요." },
      { id: "features", label: "필요한 기능을 골라주세요", helper: "여러 개 선택할 수 있어요. 없으면 건너뛰어도 됩니다." },
      { id: "design", label: "디자인 수준은?", helper: "원하는 완성도를 골라주세요." },
      { id: "timeline", label: "희망 일정은?", helper: "급할수록 인력이 집중되어 비용이 올라갑니다." },
      { id: "contact", label: "예상 견적을 확인하세요", helper: "연락처를 남기시면 정식 상담으로 이어집니다." },
    ],
    hero: { eyebrow: "Estimate", titleTop: "내가 원하는 홈페이지,", titleAccent: "얼마일까?", sub: "몇 가지만 선택하면 1분 만에 예상 견적을 알려드립니다. 마음에 드시면 그대로 상담을 신청하세요." },
    ui: { step: "STEP", autoAdvance: "선택하면 자동으로 넘어갑니다", next: "다음", prev: "이전" },
    panel: { eyebrow: "예상 견적", empty: "— 만원", emptyHint: "선택을 진행하면\n예상 견적이 실시간으로 계산됩니다.", sumType: "유형", sumScale: "규모" },
    form: {
      name: "이름 *", namePh: "홍길동",
      phone: "연락처 *", phonePh: "010-1234-5678",
      email: "이메일", emailPh: "email@example.com", emailHint: "입력하시면 접수 확인 메일을 보내드려요.",
      company: "회사 / 브랜드", companyPh: "(선택)",
      message: "추가로 전하고 싶은 내용", messagePh: "참고 사이트, 원하는 분위기, 특이사항 등 자유롭게 적어주세요.",
      submit: "이 견적으로 상담 신청", submitting: "접수 중...", error: "접수 중 오류가 발생했습니다.",
    },
    success: {
      title: "상담 신청이 접수되었습니다",
      line1: "남겨주신 연락처로 담당자가 영업일 기준 1~2일 내에 연락드리겠습니다.",
      emailLine: (e) => (<><span className="text-[var(--color-accent)]">{e}</span> 으로 확인 메일을 보내드렸어요.</>),
      estimate: "예상 견적",
      reset: "새 견적 계산",
    },
    how: {
      eyebrow: "How it works", title: "이렇게 진행돼요",
      steps: [
        { n: "01", t: "선택", d: "프로젝트 유형과 필요한 기능, 일정을 고릅니다." },
        { n: "02", t: "즉시 견적", d: "예상 비용과 기간이 실시간으로 계산됩니다." },
        { n: "03", t: "상담 신청", d: "마음에 들면 연락처를 남기고 신청하세요." },
        { n: "04", t: "맞춤 제안서", d: "영업일 기준 2~3일 내 정식 제안서를 드립니다." },
      ],
    },
    transparency: {
      eyebrow: "Transparency", title: "가격을 숨기지 않습니다",
      lead: "견적이 부풀려졌는지, 무엇에 돈이 드는지 — 고객이 알 수 없으면 그건 좋은 거래가 아닙니다. NQ Solution은 비용과 산출 기준을 처음부터 투명하게 공개합니다.",
      items: [
        { t: "시장 단가를 공개합니다", d: "업계 평균가를 그대로 보여드립니다. 아래 단가표에서 직접 확인하세요." },
        { t: "산출 기준을 공개합니다", d: "이 계산기처럼 어떤 항목에 얼마가 드는지 항목별로 보여드립니다." },
        { t: "숨은 비용을 미리 알려드립니다", d: "도메인·호스팅·유지보수까지 계약 전에 모두 안내합니다." },
      ],
    },
    cms: {
      eyebrow: "How we build", title: "한 가지 방식만 고집하지 않습니다",
      lead: (<>프로젝트 성격에 맞춰 <strong className="text-[var(--color-text-primary)] font-medium">제작 방식과 디자인 방식</strong>을 고릅니다. 빠르고 합리적인 웹빌더부터 풀커스텀 개발 + CMS까지, 디자인은 자사 인하우스 또는 전문 파트너 협업으로 진행합니다.</>),
      cards: [
        { n: "01", t: "웹빌더 기반 빠른 제작", d: "일반 홈페이지는 검증된 웹빌더로 합리적 비용·빠른 오픈도 가능합니다." },
        { n: "02", t: "풀개발 + CMS 직접 운영", d: "맞춤 기능·확장이 필요하면 직접 개발하고, 관리자(CMS)로 글·이미지를 직접 바꿉니다." },
        { n: "03", t: "디자인은 인하우스 또는 협업", d: "자사 디자인이 기본이며, 원하시면 부산 웹디자인 전문 파트너 ‘바로브랜딩’과 협업해 따로 진행합니다." },
        { n: "04", t: "오픈 이후에도 함께", d: "콘텐츠 수정·기능 추가·유지보수까지. 지금 이 사이트도 같은 방식으로 직접 운영합니다." },
      ],
      foot: "방식은 달라도 기준은 같습니다 — 필요 이상으로 비싸지 않게, 오픈 이후에도 스스로 운영할 수 있게.",
    },
    faq: {
      eyebrow: "FAQ", title: "견적, 자주 묻는 질문",
      items: [
        { q: "견적이 정확한가요?", a: "입력하신 정보를 기반으로 한 예상 범위입니다. 정확한 금액은 상담을 통해 요구사항을 확정한 뒤 결정됩니다." },
        { q: "견적을 받으면 비용이 드나요?", a: "아니요. 견적 확인과 상담은 모두 무료입니다. 부담 없이 받아보세요." },
        { q: "견적 후 금액이 달라질 수 있나요?", a: "요구사항이 추가·변경되면 조정될 수 있습니다. 최종 금액은 확정 견적서로 명확히 안내드립니다." },
        { q: "계약과 진행은 어떻게 되나요?", a: "상담 후 작업 범위·일정·비용을 계약서로 확정하고, 디자인 → 개발 → 검수 → 배포 순으로 단계별 진행합니다." },
        { q: "오픈 후 유지보수도 되나요?", a: "네. 수정·기능 추가·서버 운영까지 지원하며, 월 단위 또는 건당으로 진행할 수 있습니다." },
      ],
    },
    ref: {
      eyebrow: "Reference", title: "일반적인 제작 비용대",
      intro: (<>아래는 국내 에이전시 외주 기준의 <strong className="text-[var(--color-text-secondary)]">일반적인 시장 단가</strong> 참고치입니다. 2025년 평균 제작비는 약 430만원, 유형·기능·디자인에 따라 30만원부터 2,000만원 이상까지 분포합니다. 실제 금액은 요구사항에 따라 달라지며, NQ Solution은 상담 후 맞춤 견적을 드립니다.</>),
      typeHead: ["유형 (페이지)", "가격대"], designHead: ["디자인", "가격대"], recurringHead: ["항목", "비용"],
      typeTitle: "유형별", designTitle: "디자인 수준별 (회사소개 기준)", recurringTitle: "정기 · 부대 비용",
      types: [
        { l: "랜딩페이지 · 1 ~ 3p", r: "50 ~ 200만원" },
        { l: "회사소개 홈페이지 · 5 ~ 10p", r: "150 ~ 800만원" },
        { l: "반응형 기업 웹사이트 · 10 ~ 20p", r: "500 ~ 1,500만원" },
        { l: "쇼핑몰 (소 ~ 중형)", r: "500 ~ 3,000만원" },
        { l: "웹앱 · 플랫폼", r: "700만원 ~" },
      ],
      designs: [
        { l: "템플릿 기반", r: "150 ~ 300만원" },
        { l: "세미 커스텀", r: "300 ~ 500만원" },
        { l: "풀 커스텀 · 브랜딩", r: "500 ~ 800만원" },
        { l: "전문 브랜딩 (바로브랜딩 협업)", r: "별도 견적" },
      ],
      recurring: [
        { l: "도메인", r: "연 1 ~ 3만원" },
        { l: "호스팅 · 서버", r: "월 1 ~ 5만원" },
        { l: "SSL 인증서", r: "무료 ~ 연 10만원" },
        { l: "유지보수", r: "월 5 ~ 30만원 / 건당 5 ~ 20만원" },
      ],
    },
  },
  en: {
    steps: [
      { id: "projectType", label: "What are you building?", helper: "Pick the type of product you want." },
      { id: "scale", label: "How big is it?", helper: "Roughly how many pages / screens." },
      { id: "features", label: "Which features do you need?", helper: "Select any that apply, or skip if none." },
      { id: "design", label: "Design level?", helper: "Choose the finish you want." },
      { id: "timeline", label: "Preferred timeline?", helper: "Tighter deadlines concentrate the team and raise the cost." },
      { id: "contact", label: "Check your estimate", helper: "Leave your details and we'll follow up with a consultation." },
    ],
    hero: { eyebrow: "Estimate", titleTop: "The website you want —", titleAccent: "how much?", sub: "Answer a few questions and get an instant estimate in about a minute. Like it? Request a consultation right away." },
    ui: { step: "STEP", autoAdvance: "Selecting auto-advances", next: "Next", prev: "Back" },
    panel: { eyebrow: "Estimate", empty: "—", emptyHint: "Make your selections and\nthe estimate updates in real time.", sumType: "Type", sumScale: "Scale" },
    form: {
      name: "Name *", namePh: "Jane Doe",
      phone: "Phone *", phonePh: "+82 10-1234-5678",
      email: "Email", emailPh: "email@example.com", emailHint: "Enter it and we'll send a confirmation email.",
      company: "Company / Brand", companyPh: "(optional)",
      message: "Anything else?", messagePh: "Reference sites, desired tone, special requirements — anything.",
      submit: "Request consultation", submitting: "Sending...", error: "Something went wrong. Please try again.",
    },
    success: {
      title: "Your request has been received",
      line1: "Our team will reach out within 1–2 business days using the details you provided.",
      emailLine: (e) => (<>A confirmation email was sent to <span className="text-[var(--color-accent)]">{e}</span>.</>),
      estimate: "Estimate",
      reset: "New estimate",
    },
    how: {
      eyebrow: "How it works", title: "How it works",
      steps: [
        { n: "01", t: "Select", d: "Choose the project type, features and timeline." },
        { n: "02", t: "Instant estimate", d: "Cost and timeline are calculated in real time." },
        { n: "03", t: "Request", d: "Like it? Leave your details and submit." },
        { n: "04", t: "Proposal", d: "We send a tailored proposal within 2–3 business days." },
      ],
    },
    transparency: {
      eyebrow: "Transparency", title: "We don't hide prices",
      lead: "If you can't tell whether a quote is inflated or what you're paying for, it isn't a fair deal. NQ Solution discloses costs and how they're calculated from the very start.",
      items: [
        { t: "We publish market rates", d: "We show industry averages as-is — check the rate table below." },
        { t: "We show how it's calculated", d: "Like this calculator, we break down what each item costs." },
        { t: "We flag hidden costs upfront", d: "Domain, hosting and maintenance — all explained before you sign." },
      ],
    },
    cms: {
      eyebrow: "How we build", title: "We don't force a single method",
      lead: (<>We pick the <strong className="text-[var(--color-text-primary)] font-medium">build and design approach</strong> that fits your project — from fast, cost-effective web builders to full custom development with a CMS, with design handled in-house or with a specialist partner.</>),
      cards: [
        { n: "01", t: "Fast web-builder builds", d: "For general homepages, a proven web builder keeps cost down and launch quick." },
        { n: "02", t: "Full dev + CMS you run", d: "Need custom features or scale? We build it, and you edit text & images via an admin panel." },
        { n: "03", t: "Design in-house or partnered", d: "In-house design by default — or, if you prefer, a separate collaboration with our Busan web-design partner ‘BaroBranding’." },
        { n: "04", t: "With you after launch", d: "Edits, new features and maintenance. This very site runs the same way." },
      ],
      foot: "Different methods, same standard — never costlier than it needs to be, and yours to run after launch.",
    },
    faq: {
      eyebrow: "FAQ", title: "Estimate — FAQ",
      items: [
        { q: "Is the estimate accurate?", a: "It's an estimated range based on your input. The exact figure is set after we confirm requirements in a consultation." },
        { q: "Does getting an estimate cost anything?", a: "No. Estimates and consultations are completely free." },
        { q: "Can the price change after the estimate?", a: "It may be adjusted if requirements are added or changed. The final amount is confirmed in a formal quote." },
        { q: "How do contracts and delivery work?", a: "After consultation we lock scope, timeline and cost in a contract, then proceed: design → development → review → launch." },
        { q: "Do you offer maintenance after launch?", a: "Yes. We support fixes, new features and server operations — monthly or per-request." },
      ],
    },
    ref: {
      eyebrow: "Reference", title: "Typical build cost ranges",
      intro: (<>Below are <strong className="text-[var(--color-text-secondary)]">general market rates</strong> for agency outsourcing in Korea. The 2025 average build cost was about ₩4.3M, ranging from ₩300K to over ₩20M depending on type, features and design. Actual figures vary with requirements — NQ Solution provides a tailored quote after consultation.</>),
      typeHead: ["Type (pages)", "Range"], designHead: ["Design", "Range"], recurringHead: ["Item", "Cost"],
      typeTitle: "By type", designTitle: "By design level (company site)", recurringTitle: "Recurring · extra costs",
      types: [
        { l: "Landing page · 1 – 3p", r: "₩500K – ₩2M" },
        { l: "Company website · 5 – 10p", r: "₩1.5M – ₩8M" },
        { l: "Responsive corporate site · 10 – 20p", r: "₩5M – ₩15M" },
        { l: "E-commerce (small – mid)", r: "₩5M – ₩30M" },
        { l: "Web app · platform", r: "₩7M+" },
      ],
      designs: [
        { l: "Template-based", r: "₩1.5M – ₩3M" },
        { l: "Semi-custom", r: "₩3M – ₩5M" },
        { l: "Full custom · branding", r: "₩5M – ₩8M" },
        { l: "Pro branding (BaroBranding)", r: "Separate quote" },
      ],
      recurring: [
        { l: "Domain", r: "₩10K – ₩30K / yr" },
        { l: "Hosting · server", r: "₩10K – ₩50K / mo" },
        { l: "SSL certificate", r: "Free – ₩100K / yr" },
        { l: "Maintenance", r: "₩50K – ₩300K / mo · ₩50K – ₩200K / task" },
      ],
    },
  },
};

interface ContactState {
  name: string;
  phone: string;
  email: string;
  company: string;
  message: string;
}

export default function EstimateWizard({ lang }: { lang: Lang }) {
  const t = CONTENT[lang];
  const [stepIndex, setStepIndex] = useState(0);
  const [projectType, setProjectType] = useState<ProjectTypeKey | null>(null);
  const [scale, setScale] = useState<ScaleKey | null>(null);
  const [features, setFeatures] = useState<FeatureKey[]>([]);
  const [design, setDesign] = useState<DesignKey | null>(null);
  const [timeline, setTimeline] = useState<TimelineKey | null>(null);
  const [contact, setContact] = useState<ContactState>({ name: "", phone: "", email: "", company: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [showRef, setShowRef] = useState(false);

  const steps = t.steps;
  const step = steps[stepIndex];
  const progress = Math.round(((stepIndex + 1) / steps.length) * 100);

  const estimate = useMemo(() => {
    if (!projectType || !scale || !design || !timeline) return null;
    return computeEstimate({ projectType, scale, features, design, timeline }, lang);
  }, [projectType, scale, features, design, timeline, lang]);

  const next = () => setStepIndex((i) => Math.min(i + 1, steps.length - 1));
  const back = () => setStepIndex((i) => Math.max(i - 1, 0));

  const toggleFeature = (key: FeatureKey) =>
    setFeatures((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));

  const reset = () => {
    setStepIndex(0);
    setProjectType(null);
    setScale(null);
    setFeatures([]);
    setDesign(null);
    setTimeline(null);
    setContact({ name: "", phone: "", email: "", company: "", message: "" });
    setStatus("idle");
    setErrorMsg("");
  };

  const submit = async () => {
    if (!projectType || !scale || !design || !timeline) return;
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: { projectType, scale, features, design, timeline }, contact, lang }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || t.form.error);
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : t.form.error);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-10">
        <div className="container-custom">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-2">
              <span className="text-xs tracking-[0.3em] uppercase text-[var(--color-accent)] inline-flex items-center gap-2">
                <Calculator className="w-3.5 h-3.5" /> {t.hero.eyebrow}
              </span>
            </div>
            <div className="col-span-12 lg:col-span-10">
              <h1 className="text-display-sm md:text-display-lg font-serif mb-5 leading-tight">
                {t.hero.titleTop}
                <br />
                <span className="text-[var(--color-accent)]">{t.hero.titleAccent}</span>
              </h1>
              <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl">{t.hero.sub}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Wizard */}
      <section className="pb-32">
        <div className="container-custom">
          <div className="grid grid-cols-12 gap-8">
            <div className="hidden lg:block lg:col-span-2" />
            <div className="col-span-12 lg:col-span-10">
              {status === "success" ? (
                <SuccessCard t={t} estimate={estimate?.rangeLabel} email={contact.email} onReset={reset} />
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                  {/* Question column */}
                  <div className="lg:col-span-2">
                    {/* Progress */}
                    <div className="mb-10">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs tracking-widest uppercase text-[var(--color-text-tertiary)]">
                          {t.ui.step} {stepIndex + 1} / {steps.length}
                        </span>
                        <span className="text-xs tracking-widest text-[var(--color-accent)]">{progress}%</span>
                      </div>
                      <div className="h-[2px] bg-[var(--color-border)] overflow-hidden">
                        <motion.div
                          className="h-full bg-[var(--color-accent)]"
                          initial={false}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                        />
                      </div>
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={step.id}
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -24 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h2 className="text-2xl md:text-3xl font-serif mb-2">{step.label}</h2>
                        <p className="text-sm text-[var(--color-text-tertiary)] mb-8">{step.helper}</p>

                        {step.id === "projectType" && (
                          <OptionGrid
                            options={PROJECT_TYPES.map((o) => ({ key: o.key, label: labelOf(o, lang), desc: descOf(o, lang) }))}
                            selected={projectType}
                            onSelect={(k) => {
                              setProjectType(k as ProjectTypeKey);
                              setTimeout(next, 180);
                            }}
                          />
                        )}

                        {step.id === "scale" && (
                          <OptionGrid
                            options={SCALES.map((o) => ({ key: o.key, label: labelOf(o, lang) }))}
                            selected={scale}
                            cols={2}
                            onSelect={(k) => {
                              setScale(k as ScaleKey);
                              setTimeout(next, 180);
                            }}
                          />
                        )}

                        {step.id === "features" && (
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {FEATURES.map((f) => {
                              const on = features.includes(f.key);
                              return (
                                <button
                                  key={f.key}
                                  type="button"
                                  onClick={() => toggleFeature(f.key)}
                                  className={`text-left px-4 py-4 border transition-all duration-300 ${
                                    on
                                      ? "border-[var(--color-accent)] bg-[var(--color-accent-subtle)]"
                                      : "border-[var(--color-border)] hover:border-[var(--color-border-hover)]"
                                  }`}
                                >
                                  <span className="flex items-center justify-between gap-2">
                                    <span className="text-sm font-medium">{labelOf(f, lang)}</span>
                                    <span
                                      className={`w-4 h-4 shrink-0 border flex items-center justify-center ${
                                        on ? "bg-[var(--color-accent)] border-[var(--color-accent)]" : "border-[var(--color-border-hover)]"
                                      }`}
                                    >
                                      {on && <Check className="w-3 h-3 text-white" />}
                                    </span>
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        )}

                        {step.id === "design" && (
                          <OptionGrid
                            options={DESIGNS.map((o) => ({ key: o.key, label: labelOf(o, lang), desc: descOf(o, lang) }))}
                            selected={design}
                            onSelect={(k) => {
                              setDesign(k as DesignKey);
                              setTimeout(next, 180);
                            }}
                          />
                        )}

                        {step.id === "timeline" && (
                          <OptionGrid
                            options={TIMELINES.map((o) => ({ key: o.key, label: labelOf(o, lang) }))}
                            selected={timeline}
                            onSelect={(k) => {
                              setTimeline(k as TimelineKey);
                              setTimeout(next, 180);
                            }}
                          />
                        )}

                        {step.id === "contact" && (
                          <ContactForm t={t} contact={contact} setContact={setContact} status={status} errorMsg={errorMsg} onSubmit={submit} />
                        )}
                      </motion.div>
                    </AnimatePresence>

                    {/* Nav buttons */}
                    <div className="flex items-center gap-4 mt-10">
                      {stepIndex > 0 && (
                        <button
                          type="button"
                          onClick={back}
                          className="inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors"
                        >
                          <ArrowLeft className="w-4 h-4" /> {t.ui.prev}
                        </button>
                      )}
                      {step.id !== "contact" && step.id !== "features" && (
                        <span className="text-xs text-[var(--color-text-tertiary)]">{t.ui.autoAdvance}</span>
                      )}
                      {step.id === "features" && (
                        <button type="button" onClick={next} className="btn-primary inline-flex">
                          {t.ui.next} <ArrowRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Live estimate column */}
                  <div className="lg:col-span-1">
                    <div className="lg:sticky lg:top-28">
                      <EstimatePanel
                        t={t}
                        estimate={estimate}
                        summary={{
                          projectType: projectType ? labelOf(PROJECT_TYPES.find((o) => o.key === projectType)!, lang) : undefined,
                          scale: scale ? labelOf(SCALES.find((o) => o.key === scale)!, lang) : undefined,
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section-padding-sm border-t border-[var(--color-border)]">
        <div className="container-custom">
          <div className="grid grid-cols-12 gap-8 mb-12">
            <div className="col-span-12 lg:col-span-2">
              <span className="text-xs tracking-[0.3em] uppercase text-[var(--color-accent)]">{t.how.eyebrow}</span>
            </div>
            <div className="col-span-12 lg:col-span-10">
              <h2 className="text-display-sm font-serif">{t.how.title}</h2>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-8">
            <div className="hidden lg:block lg:col-span-2" />
            <div className="col-span-12 lg:col-span-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {t.how.steps.map((s) => (
                <div key={s.n} className="border-t border-[var(--color-accent)] pt-5">
                  <div className="text-xs font-mono text-[var(--color-accent)] mb-2">{s.n}</div>
                  <h3 className="text-base font-medium mb-2">{s.t}</h3>
                  <p className="text-sm text-[var(--color-text-tertiary)] leading-relaxed">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Transparency */}
      <section className="section-padding-sm bg-[var(--color-bg-secondary)] border-t border-[var(--color-border)]">
        <div className="container-custom">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-2">
              <span className="text-xs tracking-[0.3em] uppercase text-[var(--color-accent)]">{t.transparency.eyebrow}</span>
            </div>
            <div className="col-span-12 lg:col-span-10">
              <h2 className="text-display-sm font-serif mb-5">{t.transparency.title}</h2>
              <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mb-12">{t.transparency.lead}</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {t.transparency.items.map((item) => (
                  <div key={item.t}>
                    <Check className="w-5 h-5 text-[var(--color-accent)] mb-4" />
                    <h3 className="text-base font-medium mb-2">{item.t}</h3>
                    <p className="text-sm text-[var(--color-text-tertiary)] leading-relaxed">{item.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CMS */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-12 gap-8 mb-12">
            <div className="col-span-12 lg:col-span-2">
              <span className="text-xs tracking-[0.3em] uppercase text-[var(--color-accent)]">{t.cms.eyebrow}</span>
            </div>
            <div className="col-span-12 lg:col-span-10">
              <h2 className="text-display-sm font-serif mb-5">{t.cms.title}</h2>
              <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl">{t.cms.lead}</p>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-8">
            <div className="hidden lg:block lg:col-span-2" />
            <div className="col-span-12 lg:col-span-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--color-border)] border border-[var(--color-border)]">
                {t.cms.cards.map((c) => (
                  <div key={c.n} className="bg-[var(--color-bg-primary)] p-8">
                    <div className="text-xs font-mono text-[var(--color-accent)] mb-3">{c.n}</div>
                    <h3 className="text-lg font-serif mb-2">{c.t}</h3>
                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{c.d}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm text-[var(--color-text-tertiary)] mt-6">{t.cms.foot}</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding-sm border-t border-[var(--color-border)]">
        <div className="container-custom">
          <div className="grid grid-cols-12 gap-8 mb-12">
            <div className="col-span-12 lg:col-span-2">
              <span className="text-xs tracking-[0.3em] uppercase text-[var(--color-accent)]">{t.faq.eyebrow}</span>
            </div>
            <div className="col-span-12 lg:col-span-10">
              <h2 className="text-display-sm font-serif">{t.faq.title}</h2>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-8">
            <div className="hidden lg:block lg:col-span-2" />
            <div className="col-span-12 lg:col-span-8 space-y-8">
              {t.faq.items.map((f) => (
                <div key={f.q} className="border-t border-[var(--color-border)] pt-6">
                  <h3 className="text-lg font-serif mb-3 flex items-start gap-3">
                    <Check className="w-5 h-5 text-[var(--color-accent)] shrink-0 mt-1" />
                    {f.q}
                  </h3>
                  <p className="text-[var(--color-text-secondary)] leading-relaxed pl-8">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing reference */}
      <PricingReference t={t} open={showRef} onToggle={() => setShowRef((v) => !v)} />
    </div>
  );
}

/* ---------- sub components ---------- */

interface BaseOption {
  key: string;
  label: string;
  desc?: string;
}

function OptionGrid({
  options,
  selected,
  onSelect,
  cols = 1,
}: {
  options: BaseOption[];
  selected: string | null;
  onSelect: (key: string) => void;
  cols?: number;
}) {
  return (
    <div className={`grid gap-3 ${cols === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"}`}>
      {options.map((o) => {
        const on = selected === o.key;
        return (
          <button
            key={o.key}
            type="button"
            onClick={() => onSelect(o.key)}
            className={`text-left px-5 py-5 border transition-all duration-300 group ${
              on
                ? "border-[var(--color-accent)] bg-[var(--color-accent-subtle)]"
                : "border-[var(--color-border)] hover:border-[var(--color-border-hover)]"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-base font-medium group-hover:text-[var(--color-accent)] transition-colors">{o.label}</div>
                {o.desc && <div className="text-sm text-[var(--color-text-tertiary)] mt-1">{o.desc}</div>}
              </div>
              <span
                className={`w-5 h-5 rounded-full shrink-0 border flex items-center justify-center transition-colors ${
                  on ? "bg-[var(--color-accent)] border-[var(--color-accent)]" : "border-[var(--color-border-hover)]"
                }`}
              >
                {on && <Check className="w-3 h-3 text-white" />}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}

function EstimatePanel({
  t,
  estimate,
  summary,
}: {
  t: WizardContent;
  estimate: ReturnType<typeof computeEstimate> | null;
  summary: { projectType?: string; scale?: string };
}) {
  return (
    <div className="card p-7">
      <div className="flex items-center gap-2 text-xs tracking-widest uppercase text-[var(--color-accent)] mb-5">
        <Sparkles className="w-3.5 h-3.5" /> {t.panel.eyebrow}
      </div>

      {estimate ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={estimate.rangeLabel}>
          <div className="text-3xl font-serif text-[var(--color-text-primary)] mb-1">{estimate.rangeLabel}</div>
          <div className="text-sm text-[var(--color-accent)] mb-6">{estimate.weeksLabel}</div>

          <div className="space-y-2 mb-5">
            {estimate.breakdown.map((b, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <span className="text-[var(--color-text-secondary)] pr-3">{b.label}</span>
                <span className="text-[var(--color-text-tertiary)] whitespace-nowrap">{b.amount}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-[var(--color-border)] text-xs text-[var(--color-text-tertiary)] leading-relaxed">
            <p className="mb-2">{estimate.maintenanceLabel}</p>
            <p>{estimate.note}</p>
          </div>
        </motion.div>
      ) : (
        <div className="py-8 text-center">
          <div className="text-4xl font-serif text-[var(--color-text-tertiary)] mb-2">{t.panel.empty}</div>
          <p className="text-sm text-[var(--color-text-tertiary)] whitespace-pre-line">{t.panel.emptyHint}</p>
          {summary.projectType && (
            <div className="mt-6 text-left space-y-1 text-sm">
              <SummaryRow label={t.panel.sumType} value={summary.projectType} />
              <SummaryRow label={t.panel.sumScale} value={summary.scale} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="flex items-center justify-between">
      <span className="text-[var(--color-text-tertiary)]">{label}</span>
      <span className="text-[var(--color-text-secondary)]">{value}</span>
    </div>
  );
}

function ContactForm({
  t,
  contact,
  setContact,
  status,
  errorMsg,
  onSubmit,
}: {
  t: WizardContent;
  contact: ContactState;
  setContact: React.Dispatch<React.SetStateAction<ContactState>>;
  status: "idle" | "sending" | "success" | "error";
  errorMsg: string;
  onSubmit: () => void;
}) {
  const f = t.form;
  const inputCls =
    "w-full bg-transparent border-b border-[var(--color-border)] py-3 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] focus:border-[var(--color-accent)] transition-colors outline-none";
  const labelCls = "text-xs tracking-widest uppercase text-[var(--color-accent)] block mb-3";
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={labelCls}>{f.name}</label>
          <input type="text" required value={contact.name} onChange={(e) => setContact((c) => ({ ...c, name: e.target.value }))} placeholder={f.namePh} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>{f.phone}</label>
          <input type="tel" required value={contact.phone} onChange={(e) => setContact((c) => ({ ...c, phone: e.target.value }))} placeholder={f.phonePh} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>{f.email}</label>
          <input type="email" value={contact.email} onChange={(e) => setContact((c) => ({ ...c, email: e.target.value }))} placeholder={f.emailPh} className={inputCls} />
          <p className="text-xs text-[var(--color-text-tertiary)] mt-2 flex items-center gap-1.5">
            <Mail className="w-3 h-3 text-[var(--color-accent)]" />
            {f.emailHint}
          </p>
        </div>
        <div>
          <label className={labelCls}>{f.company}</label>
          <input type="text" value={contact.company} onChange={(e) => setContact((c) => ({ ...c, company: e.target.value }))} placeholder={f.companyPh} className={inputCls} />
        </div>
      </div>
      <div>
        <label className={labelCls}>{f.message}</label>
        <textarea rows={3} value={contact.message} onChange={(e) => setContact((c) => ({ ...c, message: e.target.value }))} placeholder={f.messagePh} className={`${inputCls} resize-none`} />
      </div>

      {status === "error" && <p className="text-red-500 text-sm">{errorMsg}</p>}

      <motion.button type="submit" disabled={status === "sending"} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="btn-primary inline-flex disabled:opacity-60">
        {status === "sending" ? (
          f.submitting
        ) : (
          <>
            {f.submit} <Send className="w-4 h-4" />
          </>
        )}
      </motion.button>
    </form>
  );
}

function SuccessCard({ t, estimate, email, onReset }: { t: WizardContent; estimate?: string; email?: string; onReset: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="card p-12 md:p-16 text-center max-w-2xl mx-auto">
      <CheckCircle2 className="w-14 h-14 text-[var(--color-accent)] mx-auto mb-6" />
      <h2 className="text-2xl md:text-3xl font-serif mb-3">{t.success.title}</h2>
      <p className="text-[var(--color-text-secondary)] mb-2">{t.success.line1}</p>
      {email && <p className="text-sm text-[var(--color-text-secondary)] mb-2">{t.success.emailLine(email)}</p>}
      {estimate && (
        <p className="text-sm text-[var(--color-text-tertiary)] mb-8">
          {t.success.estimate}: <span className="text-[var(--color-accent)]">{estimate}</span>
        </p>
      )}
      <button onClick={onReset} className="btn-outline inline-flex items-center gap-2">
        <RefreshCw className="w-4 h-4" /> {t.success.reset}
      </button>
    </motion.div>
  );
}

function PriceTable({ head, rows }: { head: [string, string]; rows: PriceRow[] }) {
  return (
    <div className="card overflow-hidden">
      <div className="grid grid-cols-2 px-5 py-3 text-xs tracking-widest uppercase text-[var(--color-text-tertiary)] border-b border-[var(--color-border)]">
        <span>{head[0]}</span>
        <span className="text-right">{head[1]}</span>
      </div>
      {rows.map((r, i) => (
        <div key={i} className="grid grid-cols-2 px-5 py-3.5 text-sm border-b border-[var(--color-border)] last:border-0">
          <span className="text-[var(--color-text-secondary)]">{r.l}</span>
          <span className="text-right text-[var(--color-text-primary)]">{r.r}</span>
        </div>
      ))}
    </div>
  );
}

function PricingReference({ t, open, onToggle }: { t: WizardContent; open: boolean; onToggle: () => void }) {
  const r = t.ref;
  return (
    <section className="pb-28 border-t border-[var(--color-border)] pt-16">
      <div className="container-custom">
        <div className="grid grid-cols-12 gap-8">
          <div className="hidden lg:block lg:col-span-2" />
          <div className="col-span-12 lg:col-span-10">
            <button type="button" onClick={onToggle} className="w-full flex items-center justify-between text-left group" aria-expanded={open}>
              <div>
                <span className="text-xs tracking-[0.3em] uppercase text-[var(--color-accent)] block mb-2">{r.eyebrow}</span>
                <h2 className="text-2xl md:text-3xl font-serif group-hover:text-[var(--color-accent)] transition-colors">{r.title}</h2>
              </div>
              <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
                <ChevronDown className="w-6 h-6 text-[var(--color-accent)]" />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {open && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35 }} className="overflow-hidden">
                  <p className="text-sm text-[var(--color-text-tertiary)] leading-relaxed mt-6 mb-8 max-w-2xl">{r.intro}</p>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h3 className="text-xs tracking-widest uppercase text-[var(--color-text-tertiary)] mb-3">{r.typeTitle}</h3>
                      <PriceTable head={r.typeHead} rows={r.types} />
                    </div>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xs tracking-widest uppercase text-[var(--color-text-tertiary)] mb-3">{r.designTitle}</h3>
                        <PriceTable head={r.designHead} rows={r.designs} />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs tracking-widest uppercase text-[var(--color-text-tertiary)] mb-3">{r.recurringTitle}</h3>
                    <PriceTable head={r.recurringHead} rows={r.recurring} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
