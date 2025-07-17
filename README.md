# nq-web

## 프로젝트 디자인/구현 방향 (요구사항 정리)

- 전체적으로 Pinterest, 실리콘밸리 감성의 트렌디하고 감각적인 UI/UX
- "내 포트폴리오" 느낌이 강하게 드러나도록 구성 (외주 개발 + 자체 서비스 회사)
- 모든 페이지는 심플하지만 임팩트 있게, bold한 타이포와 여백, 컬러 포인트, 선(border) 적극 활용
- 다크모드가 기본, 라이트모드는 분위기 있는 화이트+회색 계열
- 네브바는 홈(로고) 버튼 포함, 각 페이지(About, Services, Contact, Portfolio)로 이동 가능
- 각 페이지/섹션은 영어 위주, 포인트만 한글로 강조
- 홈페이지는 Hero(임팩트) + 최소 3개 섹션(About, What We Do, Why Us)로 구성
- 각 섹션은 카드/그리드/애니메이션/마이크로 인터랙션 등 Pinterest 스타일 적극 반영
- 외주 개발(클라이언트 프로젝트) + 자체 서비스(프로덕트) 모두 강조
- 정보 전달력과 신뢰감, 크리에이티브/프로페셔널/글로벌 마인드 강조
- 모바일/반응형 디자인 기본
- 가격 등은 노출하지 않고, 회사의 가치/강점/비전/팀/연락 위주로 구성
- 포트폴리오 페이지는 추후 별도 관리

---

# (아래는 기본 Next.js/Tailwind 안내 등 기존 내용)

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.
