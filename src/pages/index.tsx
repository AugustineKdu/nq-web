import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';


const HomePage: NextPage = () => {



  return (
    <>
      <Head>
        <title>홈 - NQ Solution</title>
      </Head>

      {/* Hero Section */}
      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <span className="badge bg-blue-100 text-blue-800">디지털 혁신의 파트너</span>
              <h1>
                당신의 아이디어를<br />
                <span className="gradient-text">현실로 만들어 드립니다</span>
              </h1>
              <p className="text-xl text-gray-600">
                웹사이트, 모바일 앱, UI/UX 디자인까지<br />
                디지털 경험의 모든 것을 지원합니다.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="/contact" className="btn btn-primary">프로젝트 상담받기</a>
                <a href="/portfolio" className="btn btn-secondary">포트폴리오 보기</a>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl"></div>
              <div className="relative aspect-square gradient-bg rounded-2xl flex items-center justify-center">
                <span className="text-7xl">✨</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NQ Solution 소개 섹션 */}
      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="badge">About Us</span>
              <h2>
                기술과 창의성이 만나는 곳,<br />
                <span className="gradient-text">NQ Solution</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                우리는 단순한 개발 회사가 아닙니다. 고객의 비즈니스 목표를 깊이 이해하고,
                최신 기술과 창의적인 아이디어를 결합하여 최적의 디지털 솔루션을 제공합니다.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-4xl font-bold gradient-text mb-2">50+</h3>
                  <p className="text-gray-600 dark:text-gray-400">완료된 프로젝트</p>
                </div>
                <div>
                  <h3 className="text-4xl font-bold gradient-text mb-2">98%</h3>
                  <p className="text-gray-600 dark:text-gray-400">고객 만족도</p>
                </div>
                <div>
                  <h3 className="text-4xl font-bold gradient-text mb-2">24/7</h3>
                  <p className="text-gray-600 dark:text-gray-400">지속적인 지원</p>
                </div>
                <div>
                  <h3 className="text-4xl font-bold gradient-text mb-2">5년+</h3>
                  <p className="text-gray-600 dark:text-gray-400">업계 경험</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#2563eb]/20 to-[#9333ea]/20 blur-3xl"></div>
              <div className="relative card p-8 space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 gradient-bg rounded-lg flex items-center justify-center text-white font-bold">
                    NQ
                  </div>
                  <div>
                    <h4 className="font-semibold">Next Query</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">다음 질문에 대한 해답</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  "고객의 다음 질문은 무엇일까?"를 항상 고민하며, 한 발 앞선 솔루션을 제공합니다.
                  우리는 현재의 문제 해결을 넘어 미래의 가능성을 함께 탐색합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 서비스 섹션 */}
      <section className="section-padding bg-gray-50 dark:bg-gray-950">
        <div className="container">
          <div className="text-center mb-12">
            <span className="badge">Services</span>
            <h2 className="mt-4 mb-4">우리가 제공하는 서비스</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              전문성과 경험을 바탕으로 다양한 디지털 솔루션을 제공합니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card p-6 group hover:-translate-y-1">
              <div className="w-14 h-14 gradient-bg rounded-lg flex items-center justify-center text-white text-2xl mb-4 group-hover:scale-110 transition-transform">
                💻
              </div>
              <h3 className="text-xl mb-3">웹 개발</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                반응형 웹사이트부터 복잡한 웹 애플리케이션까지, 모든 규모의 프로젝트를 다룹니다.
              </p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-center gap-2">
                  <span className="text-[#22c55e]">✓</span> 기업 웹사이트
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#22c55e]">✓</span> 이커머스 플랫폼
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#22c55e]">✓</span> 웹 애플리케이션
                </li>
              </ul>
            </div>

            <div className="card p-6 group hover:-translate-y-1">
              <div className="w-14 h-14 gradient-bg rounded-lg flex items-center justify-center text-white text-2xl mb-4 group-hover:scale-110 transition-transform">
                📱
              </div>
              <h3 className="text-xl mb-3">앱 개발</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                iOS와 Android 플랫폼을 위한 네이티브 및 크로스 플랫폼 앱을 개발합니다.
              </p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-center gap-2">
                  <span className="text-[#22c55e]">✓</span> iOS/Android 앱
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#22c55e]">✓</span> 크로스 플랫폼
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#22c55e]">✓</span> 앱 유지보수
                </li>
              </ul>
            </div>

            <div className="card p-6 group hover:-translate-y-1">
              <div className="w-14 h-14 gradient-bg rounded-lg flex items-center justify-center text-white text-2xl mb-4 group-hover:scale-110 transition-transform">
                🎨
              </div>
              <h3 className="text-xl mb-3">UI/UX 디자인</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                사용자 중심의 디자인으로 직관적이고 매력적인 디지털 경험을 만듭니다.
              </p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-center gap-2">
                  <span className="text-[#22c55e]">✓</span> 사용자 리서치
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#22c55e]">✓</span> 와이어프레임
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#22c55e]">✓</span> 프로토타입
                </li>
              </ul>
            </div>

            <div className="card p-6 group hover:-translate-y-1">
              <div className="w-14 h-14 gradient-bg rounded-lg flex items-center justify-center text-white text-2xl mb-4 group-hover:scale-110 transition-transform">
                ⚡
              </div>
              <h3 className="text-xl mb-3">기술 컨설팅</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                비즈니스 목표에 맞는 최적의 기술 전략과 솔루션을 제시합니다.
              </p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-center gap-2">
                  <span className="text-[#22c55e]">✓</span> 기술 스택 선정
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#22c55e]">✓</span> 시스템 아키텍처
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#22c55e]">✓</span> 성능 최적화
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 외주 제작 과정 섹션 */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-12">
            <span className="badge">Process</span>
            <h2 className="mt-4 mb-4 text-4xl md:text-5xl">프로젝트 진행 과정</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              체계적인 프로세스를 통해 프로젝트의 성공을 보장합니다
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="relative">
              {/* 연결선 (데스크톱) */}
              <div className="hidden md:block absolute top-[60px] left-[10%] right-[10%] h-1 bg-gradient-to-r from-[#2563eb] via-[#9333ea] to-[#22c55e] rounded-full"></div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
                {/* Step 1 */}
                <div className="text-center relative">
                  <div className="relative z-10">
                    <div className="w-[120px] h-[120px] mx-auto mb-6 rounded-full bg-gradient-to-br from-[#2563eb] to-[#3b82f6] flex items-center justify-center text-white">
                      <span className="text-5xl font-bold">1</span>
                    </div>
                  </div>
                  <h4 className="font-bold text-lg mb-3">상담 및 분석</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    프로젝트 요구사항과 목표를 파악하고 상세한 분석을 진행합니다.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="text-center relative">
                  <div className="relative z-10">
                    <div className="w-[120px] h-[120px] mx-auto mb-6 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#6366f1] flex items-center justify-center text-white">
                      <span className="text-5xl font-bold">2</span>
                    </div>
                  </div>
                  <h4 className="font-bold text-lg mb-3">기획 및 설계</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    와이어프레임과 프로토타입을 제작하여 구체적인 계획을 수립합니다.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="text-center relative">
                  <div className="relative z-10">
                    <div className="w-[120px] h-[120px] mx-auto mb-6 rounded-full bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center text-white">
                      <span className="text-5xl font-bold">3</span>
                    </div>
                  </div>
                  <h4 className="font-bold text-lg mb-3">디자인</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    시각적 아이덴티티를 구축하고 사용자 경험을 최적화합니다.
                  </p>
                </div>

                {/* Step 4 */}
                <div className="text-center relative">
                  <div className="relative z-10">
                    <div className="w-[120px] h-[120px] mx-auto mb-6 rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#9333ea] flex items-center justify-center text-white">
                      <span className="text-5xl font-bold">4</span>
                    </div>
                  </div>
                  <h4 className="font-bold text-lg mb-3">개발 및 테스트</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    최신 기술로 개발하고 철저한 테스트를 통해 품질을 보장합니다.
                  </p>
                </div>

                {/* Step 5 */}
                <div className="text-center relative">
                  <div className="relative z-10">
                    <div className="w-[120px] h-[120px] mx-auto mb-6 rounded-full bg-gradient-to-br from-[#10b981] to-[#22c55e] flex items-center justify-center text-white">
                      <span className="text-5xl font-bold">5</span>
                    </div>
                  </div>
                  <h4 className="font-bold text-lg mb-3">런칭 및 지원</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    성공적인 런칭과 지속적인 유지보수로 프로젝트를 완성합니다.
                  </p>
                </div>
              </div>
            </div>

            {/* 추가 정보 카드 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-bold text-lg mb-2">신속한 진행</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  평균 4-8주 내 프로젝트 완료
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h4 className="font-bold text-lg mb-2">실시간 소통</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  매주 진행 상황 리포트 제공
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h4 className="font-bold text-lg mb-2">품질 보증</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  1개월 무료 유지보수 지원
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="section-padding">
        <div className="container">
          <div className="gradient-bg rounded-3xl p-12 md:p-16 text-center text-white">
            <h2 className="text-white mb-6">함께 시작해보세요</h2>
            <p className="text-xl mb-8 opacity-90">
              아이디어가 있으신가요? 지금 바로 상담을 통해<br />
              어떻게 현실로 만들 수 있는지 알아보세요.
            </p>
            <a href="/contact" className="btn bg-white text-blue-600 hover:bg-gray-100">
              무료 상담 신청하기
            </a>
          </div>
        </div>
      </section>

    </>
  );
};

export default HomePage;