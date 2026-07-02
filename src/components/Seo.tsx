import Head from "next/head";
import { siteConfig } from "../config";

export interface SeoProps {
    title: string;
    description: string;
    /** Site-relative path starting with "/", e.g. "/", "/about", "/en/contact" */
    path: string;
    /** English-mirror path (from a ko page) or null when no /en counterpart exists */
    enPath?: string | null;
    /** meta keywords — 네이버 타깃 유지용 (선택) */
    keywords?: string;
    ogImage?: string;
    noindex?: boolean;
    jsonLd?: object | object[];
}

const SITE_URL = siteConfig.meta.url;
const SITE_NAME = "NQ Solution (엔큐솔루션)";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;
const DEFAULT_OG_IMAGE_ALT = "NQ Solution 엔큐솔루션 - 웹개발·앱개발·시스템개발 · 평택 기반 전국 IT 개발 파트너";

export default function Seo({
    title,
    description,
    path,
    enPath = null,
    keywords,
    ogImage,
    noindex = false,
    jsonLd,
}: SeoProps) {
    const isEnPage = path === "/en" || path.startsWith("/en/");
    const selfUrl = `${SITE_URL}${path}`;

    // ko path is either this page itself (ko pages) or derived by stripping
    // the "/en" prefix (en pages) — the site mirrors ko <-> /en 1:1.
    const koPath = isEnPage ? (path === "/en" ? "/" : path.slice(3)) : path;
    const koUrl = `${SITE_URL}${koPath}`;
    const enUrl = isEnPage ? selfUrl : enPath ? `${SITE_URL}${enPath}` : null;
    const xDefaultUrl = koUrl;

    const image = ogImage || DEFAULT_OG_IMAGE;
    const jsonLdList = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            {keywords && <meta name="keywords" content={keywords} />}
            {noindex && <meta name="robots" content="noindex, nofollow" />}
            {!noindex && <link rel="canonical" href={selfUrl} />}

            {/* hreflang — bidirectional self-referencing (noindex 페이지는 모순 신호라 생략) */}
            {!noindex && <link rel="alternate" hrefLang="ko" href={koUrl} />}
            {!noindex && enUrl && <link rel="alternate" hrefLang="en" href={enUrl} />}
            {!noindex && <link rel="alternate" hrefLang="x-default" href={xDefaultUrl} />}

            {/* Open Graph */}
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={selfUrl} />
            <meta property="og:locale" content={isEnPage ? "en_US" : "ko_KR"} />
            <meta property="og:locale:alternate" content={isEnPage ? "ko_KR" : "en_US"} />
            <meta property="og:image" content={image} />
            <meta property="og:image:secure_url" content={image} />
            <meta property="og:image:type" content="image/png" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt" content={DEFAULT_OG_IMAGE_ALT} />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
            <meta name="twitter:image:alt" content={DEFAULT_OG_IMAGE_ALT} />

            {jsonLdList.map((schema, i) => (
                <script
                    key={i}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
                    }}
                />
            ))}
        </Head>
    );
}
