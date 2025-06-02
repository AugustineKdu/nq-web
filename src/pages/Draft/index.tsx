import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import type { NextPage } from 'next';

// 모든 페이지 텍스트를 이 파일에서 관리
const pageTexts = {
  current: {
    pageTitle: "NQ Solution | 아이디어를 현실로 만드는 기술 파트너",
    hero: {
      titleLine1: "아이디어, 코드가 되다.",
      titleLine2: "NQ Solution.",
      subtitle: "우리는 기술을 통해 당신의 비전을 현실로 만들고, 비즈니스의 성장을 가속화합니다.",
      typedText: [
        "문제를_정의하고",
        "솔루션을_설계하고",
        "미래를_코딩합니다.",
        "당신의_성공을_위해."
      ],
      ctaButton: "프로젝트 문의하기"
    },
    nqDifference: {
      title: "단순한 개발을 넘어, 성공적인 솔루션을 만듭니다.",
      subtitle: "NQ Solution은 다음의 가치를 통해 고객에게 실질적인 비즈니스 성과를 제공합니다.",
      points: [
        { icon: "🔍", title: "본질을 파고드는 분석", desc: "표면적인 요구사항 너머, 고객 비즈니스의 핵심 문제를 정확히 진단하고 정의합니다." },
        { icon: "💡", title: "미래를 설계하는 기술", desc: "최신 기술 트렌드를 선도하며, 현재뿐 아니라 미래에도 지속 가능한 확장형 솔루션을 구축합니다." },
        { icon: "🚀", title: "가치를 창출하는 솔루션", desc: "단순 기능 구현이 아닌, 측정 가능한 비즈니스 가치와 사용자 경험 향상에 집중합니다." },
        { icon: "🤝", title: "신뢰 기반의 파트너십", desc: "모든 과정을 투명하게 공유하고, 긴밀한 소통을 통해 단순 개발사를 넘어선 성공 파트너가 됩니다." }
      ]
    },
    // --- 서비스 섹션 텍스트 추가 ---
    services: {
      title: "우리의 핵심 서비스",
      subtitle: "비즈니스 성장을 위한 최적의 기술 솔루션을 제공합니다.",
      items: [
        { icon: "🌐", name: "웹 개발", desc: "사용자 중심의 반응형 웹사이트 및 복잡한 웹 애플리케이션을 구축합니다." },
        { icon: "📱", name: "모바일 앱 개발", desc: "iOS와 Android를 위한 네이티브 및 크로스플랫폼 앱을 개발합니다." },
        { icon: "🧠", name: "AI 및 컨설팅", desc: "AI를 활용한 비즈니스 자동화 및 전문 기술 컨설팅을 제공합니다." }
      ],
      ctaButton: "모든 서비스 보기"
    },
    ourPhilosophy: {
      title: "N.Q.S. - 우리의 약속입니다.",
      items: [
        { letter: "N", term: "Next Thinking", desc: "변화하는 시장과 기술에 한발 앞서 대응합니다. 우리는 오늘을 위한 솔루션뿐 아니라, 내일의 기회를 포착할 수 있는 미래 지향적인 시스템을 설계합니다." },
        { letter: "Q", term: "Quality & Query", desc: "최고 수준의 품질은 타협할 수 없는 원칙입니다. 이를 위해 우리는 끊임없이 질문합니다. '이것이 최선인가?', '더 나은 방법은 없는가?'" },
        { letter: "S", term: "Synergy & Solution", desc: "진정한 솔루션은 고객과의 긴밀한 협력을 통해 탄생합니다. 우리는 기술 전문성과 고객의 비즈니스 통찰력을 결합하여 최적의 결과를 도출합니다." }
      ]
    },
    howWeWork: {
      title: "당신의 비전을 현실로 만드는 여정",
      subtitle: "NQ Solution은 체계적이고 협력적인 프로세스를 통해 아이디어를 성공적인 디지털 프로덕트로 전환합니다.",
      steps: [
        { id: "01", name: "이해와 공감", desc: "당신의 비즈니스, 목표, 그리고 사용자를 깊이 이해하는 것에서부터 시작합니다." },
        { id: "02", name: "맞춤 전략 설계", desc: "수집된 통찰력을 바탕으로, 명확한 목표와 로드맵, 최적의 기술 아키텍처를 설계합니다." },
        { id: "03", name: "투명한 개발과 협업", desc: "애자일 방법론을 기반으로, 정기적인 스프린트와 투명한 커뮤니케이션을 통해 함께 만들어갑니다." },
        { id: "04", name: "성공적인 런칭과 진화", desc: "안정적으로 솔루션을 배포하고, 데이터 기반 분석과 지속적인 개선을 통해 함께 성장합니다." }
      ]
    },
    // --- 포트폴리오 섹션 텍스트 추가 ---
    portfolio: {
      title: "우리의 성공 사례",
      subtitle: "혁신적인 아이디어들이 어떻게 현실이 되었는지 곧 공개됩니다.",
      ctaButton: "포트폴리오 미리보기"
    },
    letsBuild: {
      title: "당신의 위대한 도전을 NQ Solution과 함께 시작하세요.",
      subtitle: "아이디어가 있다면, 주저하지 말고 지금 바로 전문가와 상담하세요.",
      ctaButton: "무료 상담 신청하기",
      contactEmail: "contact@nqsolution.com"
    }
  }
};

const T = pageTexts.current;

const useScrollAnimation = () => {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const observerRefs = React.useRef<Map<string, IntersectionObserver | null>>(new Map());

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setVisibleSections(prev => new Set(prev).add(entry.target.id));
      }
    });
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('[data-animate-section]');
    sections.forEach(section => {
      const observer = new IntersectionObserver(handleIntersection, {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
      });
      observer.observe(section);
      observerRefs.current.set(section.id, observer);
    });

    return () => {
      observerRefs.current.forEach(observer => observer?.disconnect());
    };
  }, [handleIntersection]);

  return visibleSections;
};

const HomePage: NextPage = () => {
  const visibleSections = useScrollAnimation();

  const [typedText, setTypedText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const wordsToType = T.hero.typedText;

  useEffect(() => {
    const currentWord = wordsToType[wordIndex];
    const typeSpeed = isDeleting ? 75 : 150;

    const handleTyping = () => {
      if (isDeleting) {
        setTypedText(currentWord.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else {
        setTypedText(currentWord.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }

      if (!isDeleting && charIndex === currentWord.length) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setWordIndex((prevWordIndex) => (prevWordIndex + 1) % wordsToType.length);
      }
    };

    const timer = setTimeout(handleTyping, typeSpeed);
    return () => clearTimeout(timer);
  }, [charIndex, wordIndex, isDeleting, wordsToType]);


  const sectionBaseClass = "py-20 md:py-28 transition-all duration-1000 ease-out";
  const sectionVisibleClass = "opacity-100 translate-y-0";
  const sectionHiddenClass = "opacity-0 translate-y-12";

  const cardAnimateClass = (id: string, baseDelay: number = 0, itemIndex: number = 0) =>
    `transform transition-all duration-700 ease-out ${visibleSections.has(id) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    }` + ` style="transition-delay: ${baseDelay + itemIndex * 150}ms"`;


  return (
    <>
      <Head>
        <title>{T.pageTitle}</title>
        <meta name="description" content={T.hero.subtitle} />
      </Head>

      <div className="bg-primaryBg text-primaryText antialiased">

        {/* 1. Hero Section */}
        <section
          id="hero"
          data-animate-section
          className={`relative min-h-[90vh] md:min-h-screen flex items-center justify-center text-center overflow-hidden
                                bg-primaryBg
                                ${sectionBaseClass} ${visibleSections.has('hero') ? sectionVisibleClass : sectionHiddenClass}`}
        >
          <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10"></div>
          <div className="relative z-10 container mx-auto px-6 space-y-8 md:space-y-10">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-tight text-primaryText">
              <span className="block">{T.hero.titleLine1}</span>
              <span className="block bg-gradient-to-r from-blue-600 via-teal-500 to-emerald-600 dark:from-blue-400 dark:via-teal-400 dark:to-emerald-500 bg-clip-text text-transparent">
                {T.hero.titleLine2}
              </span>
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-primaryText max-w-3xl mx-auto font-light">
              {T.hero.subtitle}
            </p>
            <div className="font-mono text-lg md:text-xl lg:text-2xl text-teal-600 dark:text-teal-400 h-10 md:h-12">
              <span>{typedText}</span>
              <span className="animate-pulse">_</span>
            </div>
            <Link href="/contact" legacyBehavior>
              <a className="inline-block px-10 py-4 bg-gradient-to-r from-blue-500 to-teal-600 hover:from-blue-600 hover:to-teal-700 text-white rounded-lg font-semibold text-lg md:text-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                {T.hero.ctaButton}
              </a>
            </Link>
          </div>
        </section>

        {/* 2. NQ Difference Section (대비 배경) */}
        <section
          id="nq-difference"
          data-animate-section
          className={`${sectionBaseClass} bg-primaryBg`}
        >
          <div className="container mx-auto px-6">
            <div className={`text-center mb-16 md:mb-20 ${cardAnimateClass('nq-difference')}`}>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primaryText">{T.nqDifference.title}</h2>
              <p className="text-lg md:text-xl text-primaryText max-w-3xl mx-auto">{T.nqDifference.subtitle}</p>
              <div className="mt-6 w-24 h-1.5 bg-gradient-to-r from-blue-500 to-teal-500 mx-auto rounded-full"></div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {T.nqDifference.points.map((point, index) => (
                <div
                  key={point.title}
                  className={`p-6 md:p-8 bg-light-surface dark:bg-dark-surface rounded-xl shadow-lg hover:shadow-2xl border border-gray-100 dark:border-slate-700/50 hover:border-blue-500/50 dark:hover:border-blue-400/50 ${cardAnimateClass('nq-difference', 200, index)}`}
                >
                  <div className="text-4xl mb-5 text-blue-500 dark:text-blue-400">{point.icon}</div>
                  <h3 className="text-xl md:text-2xl font-semibold mb-3 text-primaryText">{point.title}</h3>
                  <p className="text-primaryText leading-relaxed">{point.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Services Section (기본 배경) - 신규 추가 */}
        <section
          id="services"
          data-animate-section
          className={`${sectionBaseClass} bg-primaryBg`}
        >
          <div className="container mx-auto px-6 lg:px-8">
            <div className={`text-center mb-16 ${cardAnimateClass('services')}`}>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primaryText">{T.services.title}</h2>
              <p className="text-lg md:text-xl text-primaryText max-w-2xl mx-auto">{T.services.subtitle}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {T.services.items.map((item, index) => (
                <div
                  key={index}
                  className={`p-6 md:p-8 bg-light-surface dark:bg-dark-surface rounded-lg shadow-sm hover:shadow-md transform hover:-translate-y-1 transition-all duration-300 border border-gray-200 dark:border-gray-600 ${cardAnimateClass('services', 200, index)}`}>
                  <div className="text-4xl mb-4 text-blue-500 dark:text-blue-400">{item.icon}</div>
                  <h3 className="text-xl font-semibold mb-3 text-primaryText">{item.name}</h3>
                  <p className="text-primaryText">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className={`text-center mt-16 ${cardAnimateClass('services', 400)}`}>
              <Link href="/service" legacyBehavior>
                <a className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300">
                  {T.services.ctaButton}
                </a>
              </Link>
            </div>
          </div>
        </section>

        {/* 4. Our Philosophy Section (대비 배경) */}
        <section
          id="our-philosophy"
          data-animate-section
          className={`${sectionBaseClass} bg-primaryBg`}
        >
          <div className="container mx-auto px-6">
            <div className={`text-center mb-16 md:mb-20 ${cardAnimateClass('our-philosophy')}`}>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primaryText">{T.ourPhilosophy.title}</h2>
              <div className="mt-6 w-24 h-1.5 bg-gradient-to-r from-teal-500 to-emerald-500 mx-auto rounded-full"></div>
            </div>
            <div className="grid lg:grid-cols-3 gap-10 md:gap-12">
              {T.ourPhilosophy.items.map((item, index) => (
                <div
                  key={item.letter}
                  className={`relative p-8 md:p-10 bg-light-surface dark:bg-dark-surface rounded-xl shadow-lg hover:shadow-xl border border-gray-100 dark:border-slate-700/50 ${cardAnimateClass('our-philosophy', 200, index)}`}
                >
                  <div className="absolute -top-6 -left-2">
                    <span className={`text-7xl md:text-8xl font-black opacity-10 dark:opacity-15
                                            ${item.letter === 'N' ? 'text-blue-500' : item.letter === 'Q' ? 'text-teal-500' : 'text-emerald-500'}`}>
                      {item.letter}
                    </span>
                  </div>
                  <h3 className={`text-2xl md:text-3xl font-bold text-primaryText mb-4 relative`}>
                    {item.term}
                  </h3>
                  <p className="text-primaryText leading-relaxed text-lg">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. How We Work Section (기본 배경) */}
        <section
          id="how-we-work"
          data-animate-section
          className={`${sectionBaseClass} bg-primaryBg`}
        >
          <div className="container mx-auto px-6">
            <div className={`text-center mb-16 md:mb-20 ${cardAnimateClass('how-we-work')}`}>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primaryText">{T.howWeWork.title}</h2>
              <p className="text-lg md:text-xl text-primaryText max-w-3xl mx-auto">{T.howWeWork.subtitle}</p>
              <div className="mt-6 w-24 h-1.5 bg-gradient-to-r from-emerald-500 to-purple-500 mx-auto rounded-full"></div>
            </div>
            <div className="max-w-3xl mx-auto space-y-8">
              {T.howWeWork.steps.map((step, index) => (
                <div key={index} className={`flex items-start space-x-6 p-6 bg-light-surface dark:bg-dark-surface rounded-xl border border-gray-100 dark:border-slate-700 ${cardAnimateClass('how-we-work', 200, index)}`}>
                  <div className="text-2xl font-bold text-blue-500 dark:text-blue-400">
                    {step.id}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-primaryText">
                      {step.name}
                    </h3>
                    <p className="mt-1 text-primaryText">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Portfolio Section (대비 배경) - 신규 추가 */}
        <section
          id="portfolio-preview"
          data-animate-section
          className={`${sectionBaseClass} bg-primaryBg`}
        >
          <div className="container mx-auto px-6 text-center">
            <div className={`max-w-2xl mx-auto ${cardAnimateClass('portfolio-preview')}`}>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primaryText">{T.portfolio.title}</h2>
              <p className="text-lg md:text-xl text-primaryText mb-8">{T.portfolio.subtitle}</p>
              <div className="text-5xl mb-8">🚀</div>
              <Link href="/portfolio" legacyBehavior>
                <a className="inline-block px-8 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-white rounded-lg font-semibold transition-colors duration-300">
                  {T.portfolio.ctaButton}
                </a>
              </Link>
            </div>
          </div>
        </section>


        {/* 7. Final CTA Section (Accent) */}
        <section
          id="lets-build"
          data-animate-section
          className={`py-20 md:py-32 text-center
                                bg-gradient-to-br from-blue-600 via-teal-600 to-emerald-700
                                dark:from-blue-800 dark:via-teal-800 dark:to-emerald-900
                                ${visibleSections.has('lets-build') ? sectionVisibleClass : sectionHiddenClass}`}
        >
          <div className="container mx-auto px-6 space-y-8 text-white">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              {T.letsBuild.title}
            </h2>
            <p className="text-xl md:text-2xl text-blue-50 dark:text-blue-200 max-w-2xl mx-auto font-light">
              {T.letsBuild.subtitle}
            </p>
            <div className="pt-4">
              <Link href="/contact" legacyBehavior>
                <a className="inline-block px-12 py-5 bg-white text-blue-600 hover:bg-slate-100 
                                            dark:bg-blue-500 dark:text-white dark:hover:bg-blue-600
                                            rounded-lg font-bold text-lg md:text-xl shadow-2xl hover:shadow-none transform hover:scale-95 transition-all duration-300">
                  {T.letsBuild.ctaButton}
                </a>
              </Link>
            </div>
            <p className="text-blue-100 dark:text-blue-300">
              또는 <a href={`mailto:${T.letsBuild.contactEmail}`} className="font-semibold hover:underline">{T.letsBuild.contactEmail}</a>로 문의해주세요.
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;