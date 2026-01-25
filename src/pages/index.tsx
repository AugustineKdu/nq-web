import React, { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import Link from 'next/link';

export default function Home() {

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
      {/* Grid Background */}
      <div className="fixed inset-0 opacity-[0.02] dark:opacity-[0.05]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Hero Section - Typography Focus */}
      <section className="relative min-h-screen flex items-center justify-center px-8">
        <div className="max-w-6xl mx-auto w-full">
          {/* Small Label */}
          <div className="mb-8">
            <p className="text-sm tracking-[0.3em] text-neutral-500 dark:text-neutral-100 uppercase">
              New & Quick Solution
            </p>
          </div>

          {/* Main Typography */}
          <div className="mb-16">
            <h1 className="text-[clamp(3rem,10vw,8rem)] font-light leading-[0.9] tracking-tighter">
              <span className="block text-neutral-900 dark:text-neutral-50">NQ</span>
              <span className="block text-neutral-400 dark:text-neutral-200">SOLUTION</span>
            </h1>
          </div>

          {/* Divider Line */}
          <div className="w-full h-px bg-neutral-900 dark:bg-neutral-100 mb-8" />

          {/* Description */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div>
              <p className="text-lg font-light leading-relaxed text-neutral-900 dark:text-neutral-50">
                혁신적인 아이디어를 빠르게 실현하는<br />
                디지털 솔루션 파트너
              </p>
            </div>
            <div className="md:text-right">
              <p className="text-sm text-neutral-800 dark:text-neutral-100">
                웹 개발 / 앱 개발 / UI·UX 디자인<br />
                2025 서울, 대한민국
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="flex items-center gap-8">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-4 text-lg"
            >
              <span className="relative text-neutral-900 dark:text-neutral-50">
                프로젝트 시작하기
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-neutral-900 dark:bg-neutral-100 group-hover:w-full transition-all duration-500" />
              </span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          {/* Corner Numbers */}
          <div className="absolute top-20 right-8 text-sm text-neutral-400 dark:text-neutral-200">
            <p>01</p>
          </div>
        </div>
      </section>

      {/* Services Section - Minimal Grid */}
      <section className="py-32 px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-sm text-neutral-400 dark:text-neutral-500">02</span>
              <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-800" />
            </div>
            <h2 className="text-6xl font-light tracking-tight text-neutral-900 dark:text-neutral-50">Services</h2>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "웹 개발",
                desc: "React, Next.js를 활용한 모던 웹사이트",
                tags: ["Frontend", "Backend", "Full-stack"]
              },
              {
                title: "앱 개발",
                desc: "Flutter 기반 크로스플랫폼 앱",
                tags: ["iOS", "Android", "Cross-platform"]
              },
              {
                title: "UI/UX 디자인",
                desc: "사용자 중심의 인터페이스 설계",
                tags: ["Research", "Design", "Prototype"]
              },
              {
                title: "컨설팅",
                desc: "디지털 전환 전략 수립",
                tags: ["Strategy", "Growth", "Analysis"]
              }
            ].map((service, i) => (
              <div
                key={i}
                className="group relative p-12 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-850 hover:shadow-lg dark:hover:shadow-2xl transition-all"
              >
                <h3 className="text-3xl font-light mb-4 text-neutral-900 dark:text-neutral-50">{service.title}</h3>
                <p className="text-neutral-600 dark:text-neutral-300 mb-8">
                  {service.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag, j) => (
                    <span key={j} className="text-xs px-3 py-1 border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                {/* Hover Indicator */}
                <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-5 h-5 text-neutral-600 dark:text-neutral-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section - Typography Layout */}
      <section className="py-32 px-8 bg-white dark:bg-neutral-900">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-sm text-neutral-400 dark:text-neutral-500">03</span>
              <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-800" />
            </div>
            <h2 className="text-6xl font-light tracking-tight text-neutral-900 dark:text-neutral-50">About</h2>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="md:col-span-2">
              <p className="text-2xl font-light leading-relaxed mb-8 text-neutral-900 dark:text-neutral-50">
                우리는 단순함 속에서 혁신을 찾습니다.
                복잡한 문제를 간결하고 우아하게 해결하며,
                모든 프로젝트에 깊이와 의미를 담습니다.
              </p>
              <p className="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
                2023년 설립 이후, 50개 이상의 프로젝트를 성공적으로 완료했으며,
                클라이언트의 비즈니스 성장을 위한 최적의 솔루션을 제공하고 있습니다.
              </p>
            </div>
            <div>
              <div className="space-y-8">
                <div>
                  <p className="text-4xl font-light mb-2 text-neutral-900 dark:text-neutral-50">50+</p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">완료된 프로젝트</p>
                </div>
                <div>
                  <p className="text-4xl font-light mb-2 text-neutral-900 dark:text-neutral-50">100%</p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">고객 만족도</p>
                </div>
                <div>
                  <p className="text-4xl font-light mb-2 text-neutral-900 dark:text-neutral-50">2년</p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">전문 경험</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section - Linear Design */}
      <section className="py-32 px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-sm text-neutral-400 dark:text-neutral-500">04</span>
              <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-800" />
            </div>
            <h2 className="text-6xl font-light tracking-tight text-neutral-900 dark:text-neutral-50">Process</h2>
          </div>

          {/* Process Steps */}
          <div className="space-y-px">
            {[
              { step: "01", title: "Research", desc: "문제 정의와 시장 조사" },
              { step: "02", title: "Planning", desc: "전략 수립과 설계" },
              { step: "03", title: "Design", desc: "비주얼 디자인과 프로토타입" },
              { step: "04", title: "Development", desc: "개발과 테스트" },
              { step: "05", title: "Launch", desc: "배포와 최적화" }
            ].map((process, i) => (
              <div
                key={i}
                className="group flex items-center gap-8 p-8 border-b border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
              >
                <span className="text-sm text-neutral-400 dark:text-neutral-300">{process.step}</span>
                <h3 className="text-2xl font-light flex-1 text-neutral-900 dark:text-neutral-50">{process.title}</h3>
                <p className="text-neutral-600 dark:text-neutral-100">{process.desc}</p>
                <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-neutral-600 dark:text-neutral-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - Minimal CTA */}
      <section className="py-32 px-8 bg-neutral-900 dark:bg-black text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-end">
            <div>
              <h2 className="text-6xl font-light tracking-tight mb-8 text-white">
                Let&apos;s work<br />together
              </h2>
              <p className="text-lg text-white/80 mb-8">
                프로젝트에 대해 이야기해보세요.<br />
                24시간 내에 답변드립니다.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-4 text-lg group"
              >
                <span className="relative text-white">
                  프로젝트 문의하기
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-500" />
                </span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform text-white" />
              </Link>
            </div>
            <div className="text-right">
              <p className="text-sm text-white/60">
                hello@nqsolution.com<br />
                +82 10-1234-5678<br />
                Seoul, South Korea
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}