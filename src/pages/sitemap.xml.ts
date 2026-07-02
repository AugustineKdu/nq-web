import type { GetServerSideProps } from "next";
import prisma from "@/lib/prisma";

// robots.txt·기존 정적 sitemap과 동일한 베이스 (siteConfig와 값 동일)
const BASE_URL = "https://nqsolution.kr";

interface SitemapEntry {
    loc: string;
    lastmod?: string;
    changefreq: "weekly" | "monthly";
    priority: string;
    // hreflang 대체 링크 (xhtml:link) — ko는 필수, en은 대응 페이지가 있을 때만
    alternates?: { ko: string; en?: string };
}

// 공개 정적 페이지 (admin·404·api 제외, /estimate는 robots Disallow 정책이라 미포함)
const STATIC_ENTRIES: SitemapEntry[] = [
    { loc: "/", changefreq: "weekly", priority: "1.0", alternates: { ko: "/", en: "/en" } },
    { loc: "/pyeongtaek-web-development", changefreq: "monthly", priority: "0.9", alternates: { ko: "/pyeongtaek-web-development" } },
    { loc: "/about", changefreq: "monthly", priority: "0.8", alternates: { ko: "/about", en: "/en/about" } },
    { loc: "/services", changefreq: "monthly", priority: "0.8", alternates: { ko: "/services", en: "/en/services" } },
    { loc: "/portfolio", changefreq: "weekly", priority: "0.9", alternates: { ko: "/portfolio", en: "/en/portfolio" } },
    { loc: "/contact", changefreq: "monthly", priority: "0.7", alternates: { ko: "/contact", en: "/en/contact" } },
    { loc: "/en", changefreq: "weekly", priority: "0.9", alternates: { ko: "/", en: "/en" } },
    { loc: "/en/about", changefreq: "monthly", priority: "0.7", alternates: { ko: "/about", en: "/en/about" } },
    { loc: "/en/services", changefreq: "monthly", priority: "0.7", alternates: { ko: "/services", en: "/en/services" } },
    { loc: "/en/portfolio", changefreq: "weekly", priority: "0.8", alternates: { ko: "/portfolio", en: "/en/portfolio" } },
    { loc: "/en/contact", changefreq: "monthly", priority: "0.6", alternates: { ko: "/contact", en: "/en/contact" } },
];

function toLastmod(date: Date): string {
    return date.toISOString().split("T")[0];
}

// /services/[id].tsx는 DB(ServiceItem)가 아닌 하드코딩된 servicesData 배열(id: web/app/design/consulting)로
// 라우팅되므로, 여기서도 고정 slug를 사용한다 — DB id를 쓰면 "서비스를 찾을 수 없습니다"로 연결되는 깨진 링크가 된다.
const SERVICE_DETAIL_SLUGS = ["web", "app", "design", "consulting"];

// DB 실패 시 정적 라우트만이라도 서빙 — 사이트맵이 500을 내면 안 된다
async function getDynamicEntries(): Promise<SitemapEntry[]> {
    const serviceEntries: SitemapEntry[] = SERVICE_DETAIL_SLUGS.map((slug) => ({
        loc: `/services/${slug}`,
        changefreq: "monthly",
        priority: "0.5",
        alternates: { ko: `/services/${slug}` },
    }));

    try {
        // api/projects.ts GET과 동일하게 공개 필터 없이 전체 조회.
        // isActive는 "서비스 운영중/종료" 배지 표시용일 뿐 공개 여부 필터가 아니므로 걸러내면 안 된다.
        const projects = await prisma.project.findMany({
            select: { id: true, updatedAt: true },
            orderBy: [{ order: "asc" }, { id: "desc" }],
        });

        const projectEntries = projects.flatMap((p): SitemapEntry[] => [
            {
                loc: `/portfolio/${p.id}`,
                lastmod: toLastmod(p.updatedAt),
                changefreq: "monthly",
                priority: "0.7",
                alternates: { ko: `/portfolio/${p.id}`, en: `/en/portfolio/${p.id}` },
            },
            {
                loc: `/en/portfolio/${p.id}`,
                lastmod: toLastmod(p.updatedAt),
                changefreq: "monthly",
                priority: "0.6",
                alternates: { ko: `/portfolio/${p.id}`, en: `/en/portfolio/${p.id}` },
            },
        ]);

        return [...projectEntries, ...serviceEntries];
    } catch (error) {
        console.error("[sitemap] project routes skipped (DB unavailable):", error);
        return serviceEntries;
    }
}

function renderEntry(entry: SitemapEntry): string {
    const lines = [`  <url>`, `    <loc>${BASE_URL}${entry.loc === "/" ? "/" : entry.loc}</loc>`];
    if (entry.alternates) {
        lines.push(
            `    <xhtml:link rel="alternate" hreflang="ko" href="${BASE_URL}${entry.alternates.ko === "/" ? "/" : entry.alternates.ko}" />`
        );
        if (entry.alternates.en) {
            lines.push(
                `    <xhtml:link rel="alternate" hreflang="en" href="${BASE_URL}${entry.alternates.en}" />`
            );
        }
    }
    if (entry.lastmod) lines.push(`    <lastmod>${entry.lastmod}</lastmod>`);
    lines.push(`    <changefreq>${entry.changefreq}</changefreq>`);
    lines.push(`    <priority>${entry.priority}</priority>`);
    lines.push(`  </url>`);
    return lines.join("\n");
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    const dynamicEntries = await getDynamicEntries();
    const entries = [...STATIC_ENTRIES, ...dynamicEntries];

    const xml = [
        `<?xml version="1.0" encoding="UTF-8"?>`,
        `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"`,
        `        xmlns:xhtml="http://www.w3.org/1999/xhtml">`,
        ...entries.map(renderEntry),
        `</urlset>`,
    ].join("\n");

    res.setHeader("Content-Type", "text/xml; charset=utf-8");
    res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
    res.write(xml);
    res.end();

    return { props: {} };
};

// XML은 getServerSideProps에서 직접 서빙 — 컴포넌트는 렌더하지 않음
export default function Sitemap(): null {
    return null;
}
