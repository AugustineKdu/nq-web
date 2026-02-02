/**
 * 포트폴리오 프로젝트 데이터
 * Portfolio Projects Data
 *
 * 포트폴리오 항목을 이 파일에서 수정할 수 있습니다.
 * Edit portfolio items in this file.
 */

export interface Project {
    id: number;
    title: string;
    titleKo?: string;
    client: string;
    category: "Web" | "Design" | "App";
    year: string;
    description: string;
    descriptionKo?: string;
    longDescription?: string;
    featured: boolean;
    // 추가 정보 (선택)
    image?: string;
    url?: string;
    tags?: string[];          // 관리자 페이지용
    technologies?: string[];  // 기존 config용 (deprecated)
    isActive?: boolean;
}

export const projects: Project[] = [
    {
        id: 1,
        title: "E-Commerce Platform",
        titleKo: "이커머스 플랫폼",
        client: "Fashion Brand",
        category: "Web",
        year: "2024",
        description: "Mobile-first shopping experience for a premium fashion brand",
        descriptionKo: "프리미엄 패션 브랜드를 위한 모바일 퍼스트 쇼핑 경험",
        featured: true,
        tags: ["Next.js", "TypeScript", "Tailwind CSS"],
        isActive: true,
    },
    {
        id: 2,
        title: "Fitness Application",
        titleKo: "피트니스 앱",
        client: "Health Startup",
        category: "App",
        year: "2024",
        description: "Wellness app with workout tracking and community features",
        descriptionKo: "운동 트래킹과 커뮤니티 기능을 갖춘 웰니스 앱",
        featured: true,
        tags: ["Flutter", "Firebase", "Node.js"],
        isActive: true,
    },
    {
        id: 3,
        title: "Corporate Website",
        titleKo: "기업 웹사이트",
        client: "Tech Company",
        category: "Web",
        year: "2023",
        description: "Website capturing a tech company's brand identity",
        descriptionKo: "기술 기업의 브랜드 아이덴티티를 담은 웹사이트",
        featured: false,
        tags: ["React", "Framer Motion", "Sanity CMS"],
        isActive: true,
    },
    {
        id: 4,
        title: "Dashboard System",
        titleKo: "대시보드 시스템",
        client: "Fintech",
        category: "Design",
        year: "2023",
        description: "Dashboard for financial data visualization and analysis",
        descriptionKo: "금융 데이터 시각화와 분석을 위한 대시보드",
        featured: false,
        tags: ["Figma", "D3.js", "React"],
        isActive: true,
    },
    {
        id: 5,
        title: "Social Platform",
        titleKo: "소셜 플랫폼",
        client: "Community",
        category: "App",
        year: "2024",
        description: "Real-time social networking platform",
        descriptionKo: "실시간 소셜 네트워킹 플랫폼",
        featured: false,
        tags: ["React Native", "Socket.io", "PostgreSQL"],
        isActive: true,
    },
    {
        id: 6,
        title: "Brand Identity",
        titleKo: "브랜드 아이덴티티",
        client: "Startup Studio",
        category: "Design",
        year: "2024",
        description: "Brand identity system for startups",
        descriptionKo: "스타트업을 위한 브랜드 아이덴티티 시스템",
        featured: false,
        tags: ["Figma", "Illustrator"],
        isActive: true,
    },
];

// 카테고리 목록 / Category list
export const categories = ["All", "Web", "Design", "App"] as const;
export type Category = typeof categories[number];
