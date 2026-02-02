import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log("Seeding database...");

    // Site Settings
    await prisma.siteSettings.upsert({
        where: { id: "main" },
        update: {},
        create: {
            id: "main",
            email: "hello@nqsolution.com",
            phone: "+82 10-1234-5678",
            location: "Seoul, South Korea",
            locationKo: "서울, 대한민국",
            contactFormUrl: "https://forms.google.com",
            ceoName: "홍길동",
            companyName: "NQ Solution",
            companyNameKo: "엔큐솔루션",
        },
    });

    // Site Stats
    await prisma.siteStats.upsert({
        where: { id: "main" },
        update: {},
        create: {
            id: "main",
            projectCount: "50+",
            clientCount: "30+",
            satisfaction: "100%",
            since: "2023",
        },
    });

    // Projects
    const projects = [
        {
            title: "E-Commerce Platform",
            titleKo: "이커머스 플랫폼",
            client: "Fashion Brand",
            category: "Digital Product",
            year: "2024",
            description: "Mobile-first shopping platform",
            descriptionKo: "모바일 퍼스트 쇼핑몰 플랫폼 구축",
            tags: ["Next.js", "TypeScript", "PostgreSQL"],
            featured: true,
            isActive: true,
            order: 1,
        },
        {
            title: "Fitness App",
            titleKo: "피트니스 앱",
            client: "Health Startup",
            category: "Mobile App",
            year: "2024",
            description: "Workout tracking & social features",
            descriptionKo: "운동 트래킹 및 소셜 기능 앱",
            tags: ["Flutter", "Firebase", "AI"],
            featured: true,
            isActive: true,
            order: 2,
        },
        {
            title: "Corporate Website",
            titleKo: "기업 웹사이트",
            client: "Tech Company",
            category: "Web",
            year: "2023",
            description: "Corporate branding website",
            descriptionKo: "기업 브랜딩 및 홍보 웹사이트",
            tags: ["React", "Framer Motion", "CMS"],
            featured: false,
            isActive: true,
            order: 3,
        },
        {
            title: "Dashboard System",
            titleKo: "대시보드 시스템",
            client: "Fintech",
            category: "Design",
            year: "2023",
            description: "Financial data visualization",
            descriptionKo: "금융 데이터 시각화 대시보드",
            tags: ["Figma", "D3.js", "React"],
            featured: false,
            isActive: true,
            order: 4,
        },
    ];

    for (const project of projects) {
        await prisma.project.upsert({
            where: { id: project.order },
            update: project,
            create: project,
        });
    }

    // Service Items (Home Page)
    const homeServices = [
        { number: "01", title: "기획", subtitle: "Planning", description: "서비스 컨셉부터 상세 기획까지", order: 1, pageType: "home", lang: "ko" },
        { number: "02", title: "디자인", subtitle: "Design", description: "UI/UX, 디자인 시스템", order: 2, pageType: "home", lang: "ko" },
        { number: "03", title: "개발", subtitle: "Development", description: "웹사이트, 웹앱 구축", order: 3, pageType: "home", lang: "ko" },
        { number: "04", title: "AI", subtitle: "AI Solutions", description: "AI 서비스 구축 및 연동", order: 4, pageType: "home", lang: "ko" },
    ];

    for (const service of homeServices) {
        await prisma.serviceItem.upsert({
            where: { id: service.order },
            update: service,
            create: service,
        });
    }

    // Process Steps
    const processSteps = [
        { num: "01", title: "상담", desc: "요구사항을 파악하고 방향을 설정합니다", order: 1, pageType: "home", lang: "ko" },
        { num: "02", title: "기획", desc: "구조를 설계하고 범위를 확정합니다", order: 2, pageType: "home", lang: "ko" },
        { num: "03", title: "제작", desc: "디자인과 개발을 진행합니다", order: 3, pageType: "home", lang: "ko" },
        { num: "04", title: "오픈", desc: "테스트 후 배포하고 인수합니다", order: 4, pageType: "home", lang: "ko" },
    ];

    for (const step of processSteps) {
        await prisma.processStep.upsert({
            where: { id: step.order },
            update: step,
            create: step,
        });
    }

    // AI Items
    const aiItems = [
        { content: "AI 챗봇 / 고객 응대", order: 1, lang: "ko" },
        { content: "문서 작성 자동화", order: 2, lang: "ko" },
        { content: "기존 시스템 AI 연동", order: 3, lang: "ko" },
    ];

    for (const item of aiItems) {
        await prisma.aiItem.upsert({
            where: { id: item.order },
            update: item,
            create: item,
        });
    }

    // FAQ Items
    const faqItems = [
        {
            question: "프로젝트 진행 기간은 어떻게 되나요?",
            answer: "프로젝트 규모에 따라 다릅니다. 간단한 랜딩페이지는 1-2주, 일반 웹사이트는 4-6주, 복잡한 웹앱은 8주 이상 소요됩니다. 상담 시 예상 기간을 안내해 드립니다.",
            order: 1,
            lang: "ko",
        },
        {
            question: "비용은 어떻게 산정되나요?",
            answer: "기능 범위, 디자인 복잡도, 개발 난이도 등을 종합적으로 고려하여 산정합니다. 정확한 견적은 요구사항 파악 후 안내해 드리며, 예산에 맞춰 범위를 조정하는 것도 가능합니다.",
            order: 2,
            lang: "ko",
        },
        {
            question: "진행 중 수정이 가능한가요?",
            answer: "기획 확정 전까지는 자유롭게 수정 가능합니다. 개발 단계에서의 큰 범위 변경은 추가 비용이 발생할 수 있으며, 사전에 협의 후 진행합니다.",
            order: 3,
            lang: "ko",
        },
        {
            question: "완료 후 유지보수는 어떻게 되나요?",
            answer: "프로젝트 완료 후 1개월간 무상 유지보수를 제공합니다. 이후에는 별도 유지보수 계약을 통해 지속적인 관리를 받으실 수 있습니다.",
            order: 4,
            lang: "ko",
        },
    ];

    for (const faq of faqItems) {
        await prisma.faqItem.upsert({
            where: { id: faq.order },
            update: faq,
            create: faq,
        });
    }

    console.log("Seeding completed!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
