import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Code, Smartphone, Palette, LineChart, CheckCircle } from "lucide-react";

const servicesData = [
    {
        id: "web",
        number: "01",
        icon: Code,
        title: "웹 개발",
        subtitle: "Web Development",
        description: "사용자 경험을 최우선으로 하는 반응형 웹사이트를 구축합니다. 최신 기술 스택을 활용하여 빠르고 안정적인 서비스를 제공합니다.",
        longDescription: `웹 개발은 단순히 코드를 작성하는 것이 아닙니다. 사용자의 니즈를 이해하고, 비즈니스 목표를 달성할 수 있는 최적의 솔루션을 설계하는 것입니다.

NQ Solution은 React, Next.js 등 최신 프레임워크를 활용하여 빠르고 안정적인 웹 애플리케이션을 개발합니다. SEO 최적화, 성능 최적화, 접근성까지 고려한 완성도 높은 결과물을 제공합니다.

프로젝트의 규모와 요구사항에 맞춰 최적의 기술 스택을 선택하고, 확장 가능한 아키텍처를 설계합니다.`,
        details: [
            "React / Next.js 기반 모던 웹 애플리케이션",
            "서버사이드 렌더링 & 정적 사이트 생성",
            "RESTful API & GraphQL 백엔드 개발",
            "성능 최적화 & SEO 최적화",
            "반응형 웹 디자인",
            "Progressive Web App (PWA) 개발"
        ],
        tech: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "MongoDB", "AWS"],
        process: [
            { step: "요구사항 분석", desc: "비즈니스 목표와 사용자 니즈 파악" },
            { step: "설계 & 프로토타입", desc: "와이어프레임 및 기술 아키텍처 설계" },
            { step: "개발", desc: "프론트엔드 & 백엔드 개발" },
            { step: "테스트 & QA", desc: "기능, 성능, 보안 테스트" },
            { step: "배포 & 유지보수", desc: "서비스 런칭 및 지속적 개선" }
        ]
    },
    {
        id: "app",
        number: "02",
        icon: Smartphone,
        title: "앱 개발",
        subtitle: "App Development",
        description: "iOS와 Android를 위한 네이티브 품질의 크로스플랫폼 앱을 개발합니다. 효율적인 개발과 유지보수가 가능합니다.",
        longDescription: `모바일 앱은 사용자와 가장 가까운 접점입니다. 직관적인 UX와 네이티브 수준의 성능으로 사용자에게 최고의 경험을 제공합니다.

Flutter를 활용한 크로스플랫폼 개발로 iOS와 Android 앱을 동시에 개발하여 개발 기간과 비용을 절감합니다. 단일 코드베이스로 두 플랫폼 모두에서 일관된 사용자 경험을 제공합니다.

App Store와 Play Store 배포부터 지속적인 업데이트까지, 앱의 전체 라이프사이클을 지원합니다.`,
        details: [
            "Flutter 기반 크로스플랫폼 앱",
            "네이티브 수준의 성능과 UX",
            "App Store & Play Store 배포 지원",
            "푸시 알림 & 실시간 기능",
            "오프라인 지원 & 로컬 데이터 저장",
            "지속적인 업데이트 및 유지보수"
        ],
        tech: ["Flutter", "Dart", "Firebase", "REST API", "SQLite", "GraphQL"],
        process: [
            { step: "기획 & 리서치", desc: "타겟 사용자 분석 및 기능 정의" },
            { step: "UI/UX 디자인", desc: "프로토타입 제작 및 사용자 테스트" },
            { step: "앱 개발", desc: "Flutter 기반 크로스플랫폼 개발" },
            { step: "QA & 베타 테스트", desc: "다양한 기기에서 테스트" },
            { step: "스토어 배포", desc: "App Store & Play Store 출시" }
        ]
    },
    {
        id: "design",
        number: "03",
        icon: Palette,
        title: "UI/UX 디자인",
        subtitle: "UI/UX Design",
        description: "사용자 중심의 디자인으로 직관적이고 아름다운 인터페이스를 만듭니다. 브랜드 아이덴티티를 강화하는 디자인을 추구합니다.",
        longDescription: `좋은 디자인은 보이지 않습니다. 사용자가 자연스럽게 목표를 달성할 수 있도록 돕는 것이 진정한 UI/UX 디자인입니다.

사용자 리서치를 통해 실제 니즈를 파악하고, 데이터 기반의 의사결정으로 효과적인 디자인 솔루션을 제안합니다. 브랜드의 가치를 시각적으로 표현하면서도 사용성을 해치지 않는 균형 잡힌 디자인을 추구합니다.

디자인 시스템 구축으로 일관된 사용자 경험을 제공하고, 개발팀과의 효율적인 협업을 지원합니다.`,
        details: [
            "사용자 리서치 & 페르소나 설계",
            "와이어프레임 & 프로토타입 제작",
            "디자인 시스템 구축",
            "인터랙션 디자인 & 모션 그래픽",
            "사용성 테스트 & 개선",
            "브랜드 아이덴티티 디자인"
        ],
        tech: ["Figma", "Framer", "After Effects", "Principle", "Zeplin", "Adobe XD"],
        process: [
            { step: "리서치", desc: "사용자 인터뷰 및 경쟁사 분석" },
            { step: "정보 구조 설계", desc: "사이트맵 및 유저 플로우 설계" },
            { step: "와이어프레임", desc: "저충실도 프로토타입 제작" },
            { step: "비주얼 디자인", desc: "고충실도 UI 디자인" },
            { step: "프로토타입 & 핸드오프", desc: "인터랙티브 프로토타입 및 개발 전달" }
        ]
    },
    {
        id: "consulting",
        number: "04",
        icon: LineChart,
        title: "컨설팅",
        subtitle: "Consulting",
        description: "비즈니스 목표에 맞는 디지털 전략을 수립합니다. 데이터 기반의 의사결정을 통해 성장을 가속화합니다.",
        longDescription: `디지털 전환은 기술만의 문제가 아닙니다. 비즈니스 전략, 조직 문화, 프로세스 혁신이 함께 이루어져야 성공할 수 있습니다.

NQ Solution은 다양한 산업 분야의 경험을 바탕으로 귀사에 맞는 디지털 전략을 수립합니다. 현재 상태를 진단하고, 실행 가능한 로드맵을 제시합니다.

기술 선택부터 팀 구성, 프로젝트 관리까지 디지털 프로젝트의 전 과정을 지원합니다.`,
        details: [
            "디지털 전환 전략 수립",
            "시장 조사 & 경쟁사 분석",
            "그로스 해킹 & 마케팅 전략",
            "기술 자문 & 아키텍처 설계",
            "프로젝트 매니지먼트",
            "팀 빌딩 & 교육"
        ],
        tech: ["Analytics", "A/B Testing", "Data Studio", "SEO/SEM", "Growth Hacking", "Agile/Scrum"],
        process: [
            { step: "현황 진단", desc: "현재 상태 분석 및 문제점 파악" },
            { step: "전략 수립", desc: "목표 설정 및 실행 전략 설계" },
            { step: "로드맵 작성", desc: "단계별 실행 계획 수립" },
            { step: "실행 지원", desc: "전략 실행 및 모니터링" },
            { step: "성과 분석", desc: "KPI 측정 및 개선점 도출" }
        ]
    }
];

export default function ServiceDetail() {
    const router = useRouter();
    const { id } = router.query;

    const service = servicesData.find(s => s.id === id);
    const currentIndex = servicesData.findIndex(s => s.id === id);
    const prevService = currentIndex > 0 ? servicesData[currentIndex - 1] : null;
    const nextService = currentIndex < servicesData.length - 1 ? servicesData[currentIndex + 1] : null;

    if (!service) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-lg text-[var(--color-text-secondary)]">
                        서비스를 찾을 수 없습니다.
                    </p>
                    <Link href="/services" className="mt-4 inline-block text-[var(--color-accent)] hover:underline">
                        서비스 목록으로 돌아가기
                    </Link>
                </div>
            </div>
        );
    }

    const IconComponent = service.icon;

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="pt-32 pb-20">
                <div className="container-custom">
                    <Link
                        href="/services"
                        className="inline-flex items-center gap-2 text-sm mb-8 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        모든 서비스 보기
                    </Link>

                    <div className="grid grid-cols-12 gap-12 items-start">
                        <div className="col-span-12 lg:col-span-8">
                            <div className="flex items-center gap-4 mb-6">
                                <span className="text-[var(--color-accent)] text-sm font-medium">{service.number}</span>
                                <span className="text-sm text-[var(--color-text-tertiary)]">{service.subtitle}</span>
                            </div>
                            <h1 className="text-5xl md:text-6xl font-normal tracking-tight mb-8 text-[var(--color-text-primary)]">
                                {service.title}
                            </h1>
                            <p className="text-xl leading-relaxed text-[var(--color-text-secondary)]">
                                {service.description}
                            </p>
                        </div>
                        <div className="col-span-12 lg:col-span-4 flex justify-center lg:justify-end">
                            <div className="w-32 h-32 flex items-center justify-center bg-[var(--color-accent-subtle)]">
                                <IconComponent className="w-16 h-16 text-[var(--color-accent)]" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Long Description */}
            <section className="py-20 bg-[var(--color-bg-secondary)]">
                <div className="container-custom">
                    <div className="max-w-3xl">
                        <h2 className="text-2xl font-medium mb-8 text-[var(--color-text-primary)]">
                            Overview
                        </h2>
                        <div className="text-lg leading-relaxed whitespace-pre-line text-[var(--color-text-secondary)]">
                            {service.longDescription}
                        </div>
                    </div>
                </div>
            </section>

            {/* Details */}
            <section className="py-20">
                <div className="container-custom">
                    <div className="grid grid-cols-12 gap-12">
                        <div className="col-span-12 lg:col-span-6">
                            <h2 className="text-2xl font-medium mb-8 text-[var(--color-text-primary)]">
                                What We Offer
                            </h2>
                            <ul className="space-y-4">
                                {service.details.map((detail, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-[var(--color-accent)] mt-0.5 shrink-0" />
                                        <span className="text-[var(--color-text-secondary)]">{detail}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="col-span-12 lg:col-span-6">
                            <h2 className="text-2xl font-medium mb-8 text-[var(--color-text-primary)]">
                                Tech Stack
                            </h2>
                            <div className="flex flex-wrap gap-3">
                                {service.tech.map((tech, i) => (
                                    <span
                                        key={i}
                                        className="px-4 py-2 rounded-full text-sm bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] border border-[var(--color-border)]"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Process */}
            <section className="py-20 bg-[var(--color-bg-secondary)]">
                <div className="container-custom">
                    <h2 className="text-2xl font-medium mb-12 text-[var(--color-text-primary)]">
                        Process
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                        {service.process.map((item, i) => (
                            <div key={i} className="relative">
                                <div className="card p-6 h-full">
                                    <span className="text-[var(--color-accent)] text-sm font-medium mb-3 block">
                                        Step {String(i + 1).padStart(2, '0')}
                                    </span>
                                    <h3 className="text-lg font-medium mb-2 text-[var(--color-text-primary)]">
                                        {item.step}
                                    </h3>
                                    <p className="text-sm text-[var(--color-text-secondary)]">
                                        {item.desc}
                                    </p>
                                </div>
                                {i < service.process.length - 1 && (
                                    <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                                        <ArrowRight className="w-5 h-5 text-[var(--color-text-tertiary)]" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20">
                <div className="container-custom">
                    <div className="p-12 bg-[var(--color-accent-subtle)] border border-[var(--color-border)] text-center">
                        <h2 className="text-3xl font-normal mb-4 text-[var(--color-text-primary)]">
                            {service.title} 프로젝트를 시작하세요
                        </h2>
                        <p className="mb-8 text-[var(--color-text-secondary)]">
                            전문 팀이 귀사의 프로젝트를 함께합니다.
                        </p>
                        <Link
                            href="/contact"
                            className="btn-primary inline-flex items-center gap-2"
                        >
                            프로젝트 문의하기
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Navigation */}
            <section className="py-12 border-t border-[var(--color-border)]">
                <div className="container-custom">
                    <div className="flex justify-between items-center">
                        {prevService ? (
                            <Link
                                href={`/services/${prevService.id}`}
                                className="flex items-center gap-3 group text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                                <div>
                                    <p className="text-xs uppercase tracking-wider mb-1">이전 서비스</p>
                                    <p className="font-medium">{prevService.title}</p>
                                </div>
                            </Link>
                        ) : <div />}
                        {nextService ? (
                            <Link
                                href={`/services/${nextService.id}`}
                                className="flex items-center gap-3 text-right group text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                            >
                                <div>
                                    <p className="text-xs uppercase tracking-wider mb-1">다음 서비스</p>
                                    <p className="font-medium">{nextService.title}</p>
                                </div>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        ) : <div />}
                    </div>
                </div>
            </section>
        </div>
    );
}
