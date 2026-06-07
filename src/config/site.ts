/**
 * 사이트 전체 설정
 * Site-wide configuration
 *
 * 이 파일에서 연락처, 소셜 링크, 회사 정보 등을 수정할 수 있습니다.
 * Edit this file to change contact info, social links, company info, etc.
 */

export const siteConfig = {
    // 회사 정보 / Company Info
    company: {
        name: "NQ Solution",
        nameKo: "엔큐솔루션",
        tagline: "Digital Craftsmanship",
        taglineKo: "디지털 크래프트맨십",
        description: "Where innovation meets elegance",
        descriptionKo: "혁신과 우아함이 만나는 곳",
        foundedYear: 2023,
    },

    // 연락처 / Contact Info
    contact: {
        email: "dwkim@nqsolution.kr",
        phone: "010-3368-1594",
        location: "Pyeongtaek, Gyeonggi-do, South Korea",
        locationKo: "경기도 평택시",
    },

    // 문의 폼 URL / Contact Form URL
    contactFormUrl: "https://forms.google.com/your-form-url",

    // 소셜 링크 / Social Links
    social: {
        github: "https://github.com/nqsolution",
        linkedin: "https://linkedin.com/company/nqsolution",
        instagram: "",
        twitter: "",
    },

    // 메타 정보 / Meta Info (SEO)
    meta: {
        title: "NQ Solution | Digital Solution Partner",
        titleKo: "NQ Solution | 디지털 솔루션 파트너",
        description: "From planning to design and development. We deliver digital solutions for your business.",
        descriptionKo: "기획부터 디자인, 개발까지. 비즈니스에 필요한 디지털 솔루션을 제공합니다.",
        keywords: ["web development", "design", "AI", "digital solution", "웹개발", "디자인", "AI", "디지털 솔루션"],
        url: "https://nqsolution.kr",
    },
};

export type SiteConfig = typeof siteConfig;
