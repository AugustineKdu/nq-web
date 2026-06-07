import React, { useMemo, useState } from "react";
import Head from "next/head";
import type { GetServerSideProps } from "next";
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
  type ProjectTypeKey,
  type ScaleKey,
  type DesignKey,
  type TimelineKey,
  type FeatureKey,
} from "../lib/estimate";

type StepId = "projectType" | "scale" | "features" | "design" | "timeline" | "contact";

const STEPS: { id: StepId; label: string; helper: string }[] = [
  { id: "projectType", label: "어떤 프로젝트인가요?", helper: "만들고 싶은 결과물을 골라주세요." },
  { id: "scale", label: "규모는 어느 정도일까요?", helper: "대략적인 페이지/화면 수예요." },
  { id: "features", label: "필요한 기능을 골라주세요", helper: "여러 개 선택할 수 있어요. 없으면 건너뛰어도 됩니다." },
  { id: "design", label: "디자인 수준은?", helper: "원하는 완성도를 골라주세요." },
  { id: "timeline", label: "희망 일정은?", helper: "급할수록 인력이 집중되어 비용이 올라갑니다." },
  { id: "contact", label: "예상 견적을 확인하세요", helper: "연락처를 남기시면 정식 상담으로 이어집니다." },
];

interface ContactState {
  name: string;
  phone: string;
  email: string;
  company: string;
  message: string;
}

export default function EstimatePage() {
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

  const step = STEPS[stepIndex];
  const progress = Math.round(((stepIndex + 1) / STEPS.length) * 100);

  const estimate = useMemo(() => {
    if (!projectType || !scale || !design || !timeline) return null;
    return computeEstimate({ projectType, scale, features, design, timeline });
  }, [projectType, scale, features, design, timeline]);

  const next = () => setStepIndex((i) => Math.min(i + 1, STEPS.length - 1));
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
        body: JSON.stringify({
          input: { projectType, scale, features, design, timeline },
          contact,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "접수 중 오류가 발생했습니다.");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "접수 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
      <Head>
        <title>예상 견적 계산기 | NQ Solution (개발용)</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="description" content="내가 원하는 홈페이지·앱, 얼마일까? 1분 만에 예상 견적을 확인하고 바로 상담을 신청하세요." />
      </Head>

      <div className="min-h-screen">
        {/* Hero */}
        <section className="pt-32 md:pt-40 pb-10">
          <div className="container-custom">
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-12 lg:col-span-2">
                <span className="text-xs tracking-[0.3em] uppercase text-[var(--color-accent)] inline-flex items-center gap-2">
                  <Calculator className="w-3.5 h-3.5" /> Estimate
                </span>
              </div>
              <div className="col-span-12 lg:col-span-10">
                <h1 className="text-display-sm md:text-display-lg font-serif mb-5 leading-tight">
                  내가 원하는 홈페이지,
                  <br />
                  <span className="text-[var(--color-accent)]">얼마일까?</span>
                </h1>
                <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl">
                  몇 가지만 선택하면 1분 만에 예상 견적을 알려드립니다. 마음에 드시면 그대로 상담을 신청하세요.
                </p>
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
                  <SuccessCard estimate={estimate?.rangeLabel} email={contact.email} onReset={reset} />
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                    {/* Question column */}
                    <div className="lg:col-span-2">
                      {/* Progress */}
                      <div className="mb-10">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs tracking-widest uppercase text-[var(--color-text-tertiary)]">
                            STEP {stepIndex + 1} / {STEPS.length}
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
                              options={PROJECT_TYPES}
                              selected={projectType}
                              onSelect={(k) => {
                                setProjectType(k as ProjectTypeKey);
                                setTimeout(next, 180);
                              }}
                            />
                          )}

                          {step.id === "scale" && (
                            <OptionGrid
                              options={SCALES}
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
                                      <span className="text-sm font-medium">{f.label}</span>
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
                              options={DESIGNS}
                              selected={design}
                              onSelect={(k) => {
                                setDesign(k as DesignKey);
                                setTimeout(next, 180);
                              }}
                            />
                          )}

                          {step.id === "timeline" && (
                            <OptionGrid
                              options={TIMELINES}
                              selected={timeline}
                              onSelect={(k) => {
                                setTimeline(k as TimelineKey);
                                setTimeout(next, 180);
                              }}
                            />
                          )}

                          {step.id === "contact" && (
                            <ContactForm
                              contact={contact}
                              setContact={setContact}
                              status={status}
                              errorMsg={errorMsg}
                              onSubmit={submit}
                            />
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
                            <ArrowLeft className="w-4 h-4" /> 이전
                          </button>
                        )}
                        {step.id !== "contact" && step.id !== "features" && (
                          <span className="text-xs text-[var(--color-text-tertiary)]">선택하면 자동으로 넘어갑니다</span>
                        )}
                        {step.id === "features" && (
                          <button
                            type="button"
                            onClick={next}
                            className="btn-primary inline-flex"
                          >
                            다음 <ArrowRight className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Live estimate column */}
                    <div className="lg:col-span-1">
                      <div className="lg:sticky lg:top-28">
                        <EstimatePanel
                          estimate={estimate}
                          summary={{
                            projectType: PROJECT_TYPES.find((o) => o.key === projectType)?.label,
                            scale: SCALES.find((o) => o.key === scale)?.label,
                            features: features.map((k) => FEATURES.find((o) => o.key === k)?.label || k),
                            design: DESIGNS.find((o) => o.key === design)?.label,
                            timeline: TIMELINES.find((o) => o.key === timeline)?.label,
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

        {/* 투명성 */}
        <section className="section-padding-sm bg-[var(--color-bg-secondary)] border-t border-[var(--color-border)]">
          <div className="container-custom">
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-12 lg:col-span-2">
                <span className="text-xs tracking-[0.3em] uppercase text-[var(--color-accent)]">Transparency</span>
              </div>
              <div className="col-span-12 lg:col-span-10">
                <h2 className="text-display-sm font-serif mb-5">가격을 숨기지 않습니다</h2>
                <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mb-12">
                  견적이 부풀려졌는지, 무엇에 돈이 드는지 — 고객이 알 수 없으면 그건 좋은 거래가 아닙니다.
                  NQ Solution은 비용과 산출 기준을 처음부터 투명하게 공개합니다.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {TRANSPARENCY.map((item) => (
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

        {/* CMS 기반 제작 */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid grid-cols-12 gap-8 mb-12">
              <div className="col-span-12 lg:col-span-2">
                <span className="text-xs tracking-[0.3em] uppercase text-[var(--color-accent)]">CMS</span>
              </div>
              <div className="col-span-12 lg:col-span-10">
                <h2 className="text-display-sm font-serif mb-5">만들고 끝이 아니라, 직접 운영하세요</h2>
                <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl">
                  NQ의 모든 사이트는 <strong className="text-[var(--color-text-primary)] font-medium">CMS(콘텐츠 관리 시스템)</strong> 기반입니다.
                  코드를 몰라도 관리자 페이지에서 글·이미지·메뉴를 직접 바꿀 수 있어, 오픈 이후에도 스스로 운영합니다.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-8">
              <div className="hidden lg:block lg:col-span-2" />
              <div className="col-span-12 lg:col-span-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--color-border)] border border-[var(--color-border)]">
                  {CMS_CARDS.map((c) => (
                    <div key={c.n} className="bg-[var(--color-bg-primary)] p-8">
                      <div className="text-xs font-mono text-[var(--color-accent)] mb-3">{c.n}</div>
                      <h3 className="text-lg font-serif mb-2">{c.t}</h3>
                      <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{c.d}</p>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-[var(--color-text-tertiary)] mt-6">
                  오픈 이후 유지비를 줄이고, 필요한 순간 바로 업데이트하세요. 콘텐츠 변경은 추가 비용 없이 직접 처리합니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 참고 단가표 */}
        <PricingReference open={showRef} onToggle={() => setShowRef((v) => !v)} />
      </div>
    </>
  );
}

/* ---------- 참고: 일반적인 제작 비용대 (업계 시장가 기준) ---------- */

const TYPE_PRICES: { type: string; pages: string; price: string }[] = [
  { type: "랜딩페이지", pages: "1 ~ 3p", price: "50 ~ 200만원" },
  { type: "회사소개 홈페이지", pages: "5 ~ 10p", price: "150 ~ 800만원" },
  { type: "반응형 기업 웹사이트", pages: "10 ~ 20p", price: "500 ~ 1,500만원" },
  { type: "쇼핑몰 (소 ~ 중형)", pages: "—", price: "500 ~ 3,000만원" },
  { type: "웹앱 · 플랫폼", pages: "—", price: "700만원 ~" },
];

const DESIGN_PRICES: { level: string; price: string }[] = [
  { level: "템플릿 기반", price: "150 ~ 300만원" },
  { level: "세미 커스텀", price: "300 ~ 500만원" },
  { level: "풀 커스텀 · 브랜딩", price: "500 ~ 800만원" },
];

const RECURRING_PRICES: { item: string; price: string }[] = [
  { item: "도메인", price: "연 1 ~ 3만원" },
  { item: "호스팅 · 서버", price: "월 1 ~ 5만원" },
  { item: "SSL 인증서", price: "무료 ~ 연 10만원" },
  { item: "유지보수", price: "월 5 ~ 30만원 / 건당 5 ~ 20만원" },
];

const TRANSPARENCY: { t: string; d: string }[] = [
  { t: "시장 단가를 공개합니다", d: "업계 평균가를 그대로 보여드립니다. 아래 단가표에서 직접 확인하세요." },
  { t: "산출 기준을 공개합니다", d: "이 계산기처럼 어떤 항목에 얼마가 드는지 항목별로 보여드립니다." },
  { t: "숨은 비용을 미리 알려드립니다", d: "도메인·호스팅·유지보수까지 계약 전에 모두 안내합니다." },
];

const CMS_CARDS: { n: string; t: string; d: string }[] = [
  { n: "01", t: "관리자 페이지 기본 제공", d: "코드를 몰라도 텍스트·이미지·포트폴리오·FAQ를 직접 수정합니다." },
  { n: "02", t: "콘텐츠 수정 무제한", d: "글자 하나 바꾸려고 개발사에 연락하거나 추가비를 낼 필요가 없습니다." },
  { n: "03", t: "우리도 이렇게 운영합니다", d: "지금 보고 계신 이 사이트도 동일한 CMS로 직접 관리됩니다." },
  { n: "04", t: "다국어·공지·설정까지", d: "번역, 공지, 노출 설정까지 직접 컨트롤할 수 있습니다." },
];

function PriceTable({ head, rows }: { head: [string, string]; rows: { l: string; r: string }[] }) {
  return (
    <div className="card overflow-hidden">
      <div className="grid grid-cols-2 px-5 py-3 text-xs tracking-widest uppercase text-[var(--color-text-tertiary)] border-b border-[var(--color-border)]">
        <span>{head[0]}</span>
        <span className="text-right">{head[1]}</span>
      </div>
      {rows.map((r, i) => (
        <div
          key={i}
          className="grid grid-cols-2 px-5 py-3.5 text-sm border-b border-[var(--color-border)] last:border-0"
        >
          <span className="text-[var(--color-text-secondary)]">{r.l}</span>
          <span className="text-right text-[var(--color-text-primary)]">{r.r}</span>
        </div>
      ))}
    </div>
  );
}

function PricingReference({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  return (
    <section className="pb-28 border-t border-[var(--color-border)] pt-16">
      <div className="container-custom">
        <div className="grid grid-cols-12 gap-8">
          <div className="hidden lg:block lg:col-span-2" />
          <div className="col-span-12 lg:col-span-10">
            <button
              type="button"
              onClick={onToggle}
              className="w-full flex items-center justify-between text-left group"
              aria-expanded={open}
            >
              <div>
                <span className="text-xs tracking-[0.3em] uppercase text-[var(--color-accent)] block mb-2">
                  Reference
                </span>
                <h2 className="text-2xl md:text-3xl font-serif group-hover:text-[var(--color-accent)] transition-colors">
                  일반적인 제작 비용대
                </h2>
              </div>
              <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
                <ChevronDown className="w-6 h-6 text-[var(--color-accent)]" />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="overflow-hidden"
                >
                  <p className="text-sm text-[var(--color-text-tertiary)] leading-relaxed mt-6 mb-8 max-w-2xl">
                    아래는 국내 에이전시 외주 기준의 <strong className="text-[var(--color-text-secondary)]">일반적인 시장 단가</strong> 참고치입니다.
                    2025년 평균 제작비는 약 430만원, 유형·기능·디자인에 따라 30만원부터 2,000만원 이상까지 분포합니다.
                    실제 금액은 요구사항에 따라 달라지며, NQ Solution은 상담 후 맞춤 견적을 드립니다.
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h3 className="text-xs tracking-widest uppercase text-[var(--color-text-tertiary)] mb-3">유형별</h3>
                      <PriceTable head={["유형 (페이지)", "가격대"]} rows={TYPE_PRICES.map((t) => ({ l: `${t.type}${t.pages !== "—" ? ` · ${t.pages}` : ""}`, r: t.price }))} />
                    </div>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xs tracking-widest uppercase text-[var(--color-text-tertiary)] mb-3">디자인 수준별 (회사소개 기준)</h3>
                        <PriceTable head={["디자인", "가격대"]} rows={DESIGN_PRICES.map((d) => ({ l: d.level, r: d.price }))} />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs tracking-widest uppercase text-[var(--color-text-tertiary)] mb-3">정기 · 부대 비용</h3>
                    <PriceTable head={["항목", "비용"]} rows={RECURRING_PRICES.map((r) => ({ l: r.item, r: r.price }))} />
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
                <div className="text-base font-medium group-hover:text-[var(--color-accent)] transition-colors">
                  {o.label}
                </div>
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
  estimate,
  summary,
}: {
  estimate: ReturnType<typeof computeEstimate> | null;
  summary: {
    projectType?: string;
    scale?: string;
    features: string[];
    design?: string;
    timeline?: string;
  };
}) {
  return (
    <div className="card p-7">
      <div className="flex items-center gap-2 text-xs tracking-widest uppercase text-[var(--color-accent)] mb-5">
        <Sparkles className="w-3.5 h-3.5" /> 예상 견적
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
          <div className="text-4xl font-serif text-[var(--color-text-tertiary)] mb-2">— 만원</div>
          <p className="text-sm text-[var(--color-text-tertiary)]">
            선택을 진행하면
            <br />
            예상 견적이 실시간으로 계산됩니다.
          </p>
          {summary.projectType && (
            <div className="mt-6 text-left space-y-1 text-sm">
              <SummaryRow label="유형" value={summary.projectType} />
              <SummaryRow label="규모" value={summary.scale} />
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
  contact,
  setContact,
  status,
  errorMsg,
  onSubmit,
}: {
  contact: ContactState;
  setContact: React.Dispatch<React.SetStateAction<ContactState>>;
  status: "idle" | "sending" | "success" | "error";
  errorMsg: string;
  onSubmit: () => void;
}) {
  const inputCls =
    "w-full bg-transparent border-b border-[var(--color-border)] py-3 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] focus:border-[var(--color-accent)] transition-colors outline-none";
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
          <label className="text-xs tracking-widest uppercase text-[var(--color-accent)] block mb-3">이름 *</label>
          <input
            type="text"
            required
            value={contact.name}
            onChange={(e) => setContact((c) => ({ ...c, name: e.target.value }))}
            placeholder="홍길동"
            className={inputCls}
          />
        </div>
        <div>
          <label className="text-xs tracking-widest uppercase text-[var(--color-accent)] block mb-3">연락처 *</label>
          <input
            type="tel"
            required
            value={contact.phone}
            onChange={(e) => setContact((c) => ({ ...c, phone: e.target.value }))}
            placeholder="010-1234-5678"
            className={inputCls}
          />
        </div>
        <div>
          <label className="text-xs tracking-widest uppercase text-[var(--color-accent)] block mb-3">이메일</label>
          <input
            type="email"
            value={contact.email}
            onChange={(e) => setContact((c) => ({ ...c, email: e.target.value }))}
            placeholder="email@example.com"
            className={inputCls}
          />
          <p className="text-xs text-[var(--color-text-tertiary)] mt-2 flex items-center gap-1.5">
            <Mail className="w-3 h-3 text-[var(--color-accent)]" />
            입력하시면 접수 확인 메일을 보내드려요.
          </p>
        </div>
        <div>
          <label className="text-xs tracking-widest uppercase text-[var(--color-accent)] block mb-3">회사 / 브랜드</label>
          <input
            type="text"
            value={contact.company}
            onChange={(e) => setContact((c) => ({ ...c, company: e.target.value }))}
            placeholder="(선택)"
            className={inputCls}
          />
        </div>
      </div>
      <div>
        <label className="text-xs tracking-widest uppercase text-[var(--color-accent)] block mb-3">추가로 전하고 싶은 내용</label>
        <textarea
          rows={3}
          value={contact.message}
          onChange={(e) => setContact((c) => ({ ...c, message: e.target.value }))}
          placeholder="참고 사이트, 원하는 분위기, 특이사항 등 자유롭게 적어주세요."
          className={`${inputCls} resize-none`}
        />
      </div>

      {status === "error" && <p className="text-red-500 text-sm">{errorMsg}</p>}

      <motion.button
        type="submit"
        disabled={status === "sending"}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="btn-primary inline-flex disabled:opacity-60"
      >
        {status === "sending" ? (
          "접수 중..."
        ) : (
          <>
            이 견적으로 상담 신청 <Send className="w-4 h-4" />
          </>
        )}
      </motion.button>
    </form>
  );
}

function SuccessCard({ estimate, email, onReset }: { estimate?: string; email?: string; onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="card p-12 md:p-16 text-center max-w-2xl mx-auto"
    >
      <CheckCircle2 className="w-14 h-14 text-[var(--color-accent)] mx-auto mb-6" />
      <h2 className="text-2xl md:text-3xl font-serif mb-3">상담 신청이 접수되었습니다</h2>
      <p className="text-[var(--color-text-secondary)] mb-2">
        남겨주신 연락처로 담당자가 영업일 기준 1~2일 내에 연락드리겠습니다.
      </p>
      {email && (
        <p className="text-sm text-[var(--color-text-secondary)] mb-2">
          <span className="text-[var(--color-accent)]">{email}</span> 으로 확인 메일을 보내드렸어요.
        </p>
      )}
      {estimate && (
        <p className="text-sm text-[var(--color-text-tertiary)] mb-8">
          예상 견적: <span className="text-[var(--color-accent)]">{estimate}</span>
        </p>
      )}
      <button onClick={onReset} className="btn-outline inline-flex items-center gap-2">
        <RefreshCw className="w-4 h-4" /> 새 견적 계산
      </button>
    </motion.div>
  );
}

/* dev-server / flag 전용 — 프로덕션에서는 직접 접근 시 404 */
export const getServerSideProps: GetServerSideProps = async () => {
  const enabled =
    process.env.NODE_ENV !== "production" || process.env.NEXT_PUBLIC_ENABLE_ESTIMATE === "true";
  if (!enabled) return { notFound: true };
  return { props: {} };
};
