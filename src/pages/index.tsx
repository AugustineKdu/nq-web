import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Layout from '../components/Layout';

const HomePage: NextPage = () => {
  const services = [
    {
      icon: '🖥️',
      title: '웹 개발',
      description: '반응형 웹사이트, 웹 애플리케이션, e-커머스 솔루션'
    },
    {
      icon: '📱',
      title: '앱 개발',
      description: 'iOS/Android 앱, 크로스 플랫폼 앱, 하이브리드 앱'
    },
    {
      icon: '🎨',
      title: 'UI/UX 디자인',
      description: '사용자 경험 중심의 디자인, 프로토타입, 와이어프레임'
    },
    {
      icon: '⚙️',
      title: '기술 컨설팅',
      description: '기술 전략, 시스템 아키텍처, 디지털 트랜스포메이션'
    }
  ];

  const projects = [
    {
      title: '혁신적 스타트업 웹사이트',
      category: '웹 개발',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=500'
    },
    {
      title: '패션 브랜드 앱',
      category: '앱 개발',
      image: 'https://images.unsplash.com/photo-1508599589920-14cfa1c1fe4d?auto=format&fit=crop&q=80&w=500'
    },
    {
      title: '금융 대시보드 UI 디자인',
      category: 'UI/UX 디자인',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=500'
    }
  ];

  return (
    <Layout title="홈 - NQ Solution">
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

      {/* Services Section */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <span className="badge bg-blue-100 text-blue-800">서비스</span>
            <h2 className="mt-4 mb-4">제공하는 서비스</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              아이디어 단계부터 완성까지, 디지털 여정의 모든 단계를 함께합니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div key={index} className="card p-6 text-center hover:-translate-y-1">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
                <a href="/services" className="inline-block mt-4 text-blue-600 hover:text-blue-800">
                  자세히 보기 →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-12">
            <span className="badge bg-purple-100 text-purple-800">포트폴리오</span>
            <h2 className="mt-4 mb-4">주요 프로젝트</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              최근에 완료한 프로젝트들을 확인해보세요
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <a href="/portfolio" key={index} className="group block">
                <div className="relative aspect-video overflow-hidden rounded-xl">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                    <span className="badge bg-white/20 text-white mb-2">{project.category}</span>
                    <h3 className="text-white text-xl">{project.title}</h3>
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div className="text-center mt-12">
            <a href="/portfolio" className="btn btn-secondary">모든 프로젝트 보기</a>
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
    </Layout>
  );
};

export default HomePage;