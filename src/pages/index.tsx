import React from "react";
import Head from "next/head";
import { ArrowRight } from "lucide-react";
import Link from 'next/link';
import Image from "next/image";

export default function Home() {

  return (
    <>
      <Head>
        <title>NQ Solution | 혁신적인 디지털 솔루션 파트너</title>
        <meta name="description" content="New idea를 더하고 Quick action으로 실행하는 디지털 솔루션 파트너. 웹 개발, 앱 개발, UI/UX 디자인 전문." />
        <meta name="keywords" content="웹개발, 앱개발, UI/UX디자인, Next.js, React, 디지털솔루션, NQ Solution" />

        {/* Open Graph */}
        <meta property="og:title" content="NQ Solution | 혁신적인 디지털 솔루션 파트너" />
        <meta property="og:description" content="New idea를 더하고 Quick action으로 실행하는 디지털 솔루션 파트너" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nqsolution.kr" />
        <meta property="og:image" content="https://nqsolution.kr/nq_textlogo.png" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="NQ Solution | 혁신적인 디지털 솔루션 파트너" />
        <meta name="twitter:description" content="New idea를 더하고 Quick action으로 실행하는 디지털 솔루션 파트너" />
        <meta name="twitter:image" content="https://nqsolution.kr/nq_textlogo.png" />
      </Head>

    (
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
            <p className="text-sm tracking-[0.3em] text-neutral-900 dark:text-white uppercase">
              New & Quick Solution
            </p>
          </div>


          {/* Main Typography */}
          <div className="mb-16">
            <Image
              src="/nq_textlogo.png"
              alt="NQ Solution"
              width={480}
              height={160}
              className="w-full max-w-md mx-auto md:mx-0 dark:invert"
              priority
            />
            <h1 className="text-[clamp(3rem,10vw,8rem)] font-light leading-[0.9] tracking-tighter">
              <span className="block text-neutral-900 dark:text-white">SOLUTION</span>
            </h1>
          </div>


          {/* Divider Line */}
          <div className="w-full h-px bg-neutral-900 dark:bg-neutral-100 mb-8" />

          {/* Description */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div>
              <p className="text-lg leading-relaxed text-neutral-900 dark:text-white font-medium">
                혁신적인 아이디어를 빠르게 실현하는<br />
                디지털 솔루션 파트너
              </p>
            </div>
            <div className="md:text-right">
              <p className="text-sm text-neutral-900 dark:text-white font-medium">
                웹 개발 / 앱 개발 / UI·UX 디자인<br />
                2024 평택, 대한민국
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="flex items-center gap-8">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-4 text-lg"
            >
              <span className="relative text-neutral-900 dark:text-white">
                프로젝트 시작하기
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-neutral-900 dark:bg-neutral-100 group-hover:w-full transition-all duration-500" />
              </span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          {/* Corner Numbers */}
          <div className="absolute top-20 right-8 text-sm text-neutral-900 dark:text-white">
            <p>01</p>
          </div>
        </div>
      </section >

      {/* Services Section - Minimal Grid */}
      < section className="py-32 px-8" >
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-sm text-neutral-900 dark:text-white">02</span>
              <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-800" />
            </div>
            <h2 className="text-6xl font-light tracking-tight text-neutral-900 dark:text-white">Services</h2>
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
                className="group relative p-12 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:shadow-lg dark:hover:shadow-2xl transition-all"
              >
                <h3 className="text-3xl font-light mb-4 text-neutral-900 dark:text-white">{service.title}</h3>
                <p className="text-neutral-900 dark:text-white mb-8 leading-relaxed">
                  {service.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag, j) => (
                    <span key={j} className="text-xs px-3 py-1 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                {/* Hover Indicator */}
                <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-5 h-5 text-neutral-900 dark:text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section >


      {/* About Section - Enhanced */}
      <section className="py-32 px-8 bg-white dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-sm text-neutral-900 dark:text-white">03</span>
              <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-800" />
            </div>
            <h2 className="text-7xl font-light tracking-tight text-neutral-900 dark:text-white mb-2">About</h2>
            <p className="text-xl text-neutral-900 dark:text-white font-medium">혁신과 열정으로 만들어가는 디지털 크래프트맨십</p>
          </div>

          {/* Main Content */}
          <div className="mb-32">
            <div className="max-w-4xl">
              <p className="text-3xl leading-relaxed text-neutral-900 dark:text-white mb-8 font-medium">
                우리는 단순함 속에서 <span className="text-neutral-900 dark:bg-gradient-to-r dark:from-blue-500 dark:to-cyan-500 dark:bg-clip-text dark:text-transparent font-semibold">혁신</span>을 찾습니다.
              </p>
              <p className="text-xl text-neutral-900 dark:text-white leading-relaxed font-medium">
                복잡한 문제를 본질에 집중하여 명확하게 풀어내며, 모든 프로젝트에 깊이와 의미를 담습니다.
                기술과 디자인의 경계에서 새로운 가능성을 탐구하고, 클라이언트의 비전을 현실로 만들어갑니다.
              </p>
            </div>
          </div>

          {/* Values Grid */}
          <div>
            <h3 className="text-2xl font-light mb-12 text-neutral-900 dark:text-white">Our Core Values</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group p-8 border border-neutral-200 dark:border-neutral-800 rounded-2xl hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                <h4 className="text-xl font-semibold mb-3 text-neutral-900 dark:text-white">Excellence</h4>
                <p className="text-neutral-900 dark:text-white">모든 작업에서 최고의 품질을 추구하며, 디테일에 집착합니다.</p>
              </div>
              <div className="group p-8 border border-neutral-200 dark:border-neutral-800 rounded-2xl hover:border-cyan-500 dark:hover:border-cyan-500 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                <h4 className="text-xl font-semibold mb-3 text-neutral-900 dark:text-white">Innovation</h4>
                <p className="text-neutral-900 dark:text-white">새로운 기술과 창의적인 접근으로 경계를 넘어섭니다.</p>
              </div>
              <div className="group p-8 border border-neutral-200 dark:border-neutral-800 rounded-2xl hover:border-purple-500 dark:hover:border-purple-500 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                <h4 className="text-xl font-semibold mb-3 text-neutral-900 dark:text-white">Partnership</h4>
                <p className="text-neutral-900 dark:text-white">클라이언트와 함께 성장하는 진정한 파트너가 됩니다.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Process Section - Linear Design */}
      < section className="py-32 px-8" >
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-sm text-neutral-900 dark:text-white">04</span>
              <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-800" />
            </div>
            <h2 className="text-6xl font-light tracking-tight text-neutral-900 dark:text-white">Process</h2>
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
                <span className="text-sm text-neutral-900 dark:text-white">{process.step}</span>
                <h3 className="text-2xl font-light flex-1 text-neutral-900 dark:text-white">{process.title}</h3>
                <p className="text-neutral-900 dark:text-white">{process.desc}</p>
                <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-neutral-900 dark:text-white" />
              </div>
            ))}
          </div>
        </div>
      </section >

      {/* Contact Section - Minimal CTA */}
      < section className="py-32 px-8 bg-neutral-900 dark:bg-black text-white" >
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
              {/* <p className="text-sm text-white/60">
                hello@nqsolution.com<br />
                +82 10-1234-5678<br />
                Seoul, South Korea
              </p> */}
            </div>
          </div>
        </div>
      </section >
    </div >
    </>
  );
}