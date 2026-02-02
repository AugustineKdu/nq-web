# NQ Solution Website Redesign Guide

## Project Overview
NQ Solution 웹사이트 전면 리디자인 프로젝트

**핵심 컨셉**: "주방 세제도 왜 향수처럼 만들면 안될까?"
- IT/개발 회사라도 프리미엄 럭셔리 브랜드처럼 표현
- 친환경 고급 세제가 향수 병 디자인을 차용해 성공한 사례처럼, 가장 먼 분야(럭셔리/향수/패션)에서 영감을 가져옴

---

## 1. Planning (기획)

### 1.1 브랜드 포지셔닝 변화
**기존**: 일반적인 IT 솔루션 회사
**새로운**: 디지털 크래프트맨십을 추구하는 프리미엄 스튜디오

### 1.2 새로운 브랜드 메시지
- **Tagline**: "Digital Craftsmanship" 또는 "Where Code Meets Couture"
- **Tone**: 고급스럽고 절제된, 자신감 있는
- **Voice**: 전문적이지만 친근하지 않음 (거리감 있는 프리미엄)

### 1.3 타겟 재정의
- 기존: 모든 기업 대상
- 새로운: 프리미엄 서비스를 원하는 클라이언트
  - 스타트업 중 투자 유치 완료 기업
  - 리브랜딩을 원하는 중견기업
  - 럭셔리 브랜드 디지털 전환

### 1.4 페이지 구조 재설계
```
Home
├── Hero (브랜드 스테이트먼트)
├── Philosophy (우리의 철학)
├── Selected Work (엄선된 작업물)
├── Approach (접근 방식)
└── Contact CTA

Services → Atelier (아틀리에)
├── Digital Products
├── Brand Experience
├── Strategic Consulting
└── 각 서비스별 상세 페이지

Portfolio → Selected Works
├── Featured Projects (3-5개 하이라이트)
├── Archive (전체 목록)
└── Case Study 상세

About → Studio
├── Philosophy
├── Process
├── Team (선택적)
└── Awards/Recognition

Contact → Inquiry
├── Project Inquiry Form
├── Location/Contact Info
└── FAQ
```

### 1.5 콘텐츠 전략
- **Less is More**: 텍스트 최소화, 여백 극대화
- **Exclusive Tone**: "프로젝트 문의하기" → "작업 의뢰하기"
- **Curated Portfolio**: 모든 작업물 X, 엄선된 작업물만
- **No Pricing**: 가격 공개 X (맞춤 견적 강조)

---

## 2. Design (디자인)

### 2.1 디자인 철학
**영감**: 럭셔리 향수 브랜드, 패션 하우스, 갤러리
- Aesop, Byredo, Le Labo (화장품/향수)
- Celine, The Row (패션)
- White Cube, Gagosian (갤러리)

**핵심 원칙**:
1. **공간의 미학**: 요소 간 충분한 여백, 숨 쉴 공간
2. **절제된 표현**: 화려함 없이 품격 있게
3. **재료의 품질**: 타이포그래피, 이미지 품질에 집중
4. **의도적 불편함**: 너무 쉽게 접근 가능하지 않게

### 2.2 컬러 시스템 재정의
**기존**: Teal 중심 (일반적)
**새로운**: 모노크롬 + 시그니처 악센트

```css
/* Light Mode */
--bg-primary: #FAFAF9;      /* Warm white */
--bg-secondary: #F5F5F4;    /* Stone 100 */
--text-primary: #1C1917;    /* Stone 900 */
--text-secondary: #78716C;  /* Stone 500 */
--accent: #B8860B;          /* Dark Goldenrod - 시그니처 */
--accent-subtle: #D4AF37;   /* Metallic Gold */

/* Dark Mode */
--bg-primary: #0C0A09;      /* Stone 950 */
--bg-secondary: #1C1917;    /* Stone 900 */
--text-primary: #FAFAF9;    /* Stone 50 */
--text-secondary: #A8A29E;  /* Stone 400 */
--accent: #D4AF37;          /* Metallic Gold */
```

### 2.3 타이포그래피
**기존**: Pretendard (실용적)
**새로운**: 듀얼 폰트 시스템

```
Heading: 세리프 폰트 (Cormorant Garamond, Playfair Display, Noto Serif KR)
- 고급스러움, 전통적 크래프트맨십 느낌

Body: 산세리프 (Pretendard 유지 또는 Plus Jakarta Sans)
- 현대적, 가독성

Display: 초대형 타이틀용 (클램프 8-12vw)
- 임팩트, 갤러리 느낌
```

### 2.4 레이아웃 원칙
1. **비대칭 그리드**: 12컬럼 → 불규칙 배치
2. **대형 여백**: 섹션 간 200px+ 간격
3. **풀스크린 섹션**: 스크롤 기반 경험
4. **오버랩 요소**: 이미지/텍스트 겹침

### 2.5 인터랙션 & 애니메이션
- **Subtle & Slow**: 빠른 트랜지션 X, 우아하고 느린 움직임
- **Scroll-triggered**: 스크롤에 반응하는 요소들
- **Hover states**: 섬세한 호버 효과 (underline reveal, opacity shift)
- **Page transitions**: 페이지 전환 애니메이션

### 2.6 이미지 & 비주얼
- **High-contrast B&W**: 포트폴리오 이미지 흑백 처리 (hover시 컬러)
- **Editorial style**: 잡지 같은 레이아웃
- **Negative space**: 이미지 주변 충분한 여백
- **No stock photos**: 실제 작업물 또는 아트워크만

### 2.7 UI 컴포넌트 스타일
```
Buttons:
- Primary: 배경 없이 underline만 (텍스트 링크 스타일)
- Secondary: 얇은 테두리 + 여백 많은 버튼

Cards:
- 테두리 없음 또는 매우 미세한 테두리
- 그림자 대신 여백으로 구분
- 호버시 미세한 scale 또는 opacity 변화

Navigation:
- 미니멀한 텍스트 네비게이션
- 햄버거 메뉴 → 풀스크린 오버레이
- 로고 중앙 또는 좌측, 나머지 우측
```

---

## 3. Development (개발)

### 3.1 현재 이슈 목록
1. **다크모드 불일치**
   - 카드 테두리 흰색인데 흰색 텍스트 문제
   - 일부 요소 다크/라이트 전환시 깜빡임
   - `dark:` 클래스와 `dark ?` 조건문 혼용

2. **스타일 일관성 부족**
   - 버튼 스타일 페이지마다 다름
   - 여백/간격 불규칙
   - 호버 효과 불일치

3. **성능**
   - 이미지 최적화 필요
   - 불필요한 re-render

### 3.2 리팩토링 가이드

#### 테마 시스템 통일
```tsx
// ThemeContext에서 CSS 변수 기반으로 변경
// Tailwind dark: 클래스 대신 CSS 변수 사용

// globals.css
:root {
  --color-bg: theme('colors.stone.50');
  --color-text: theme('colors.stone.900');
  --color-accent: #B8860B;
}

.dark {
  --color-bg: theme('colors.stone.950');
  --color-text: theme('colors.stone.50');
  --color-accent: #D4AF37;
}

// 컴포넌트에서
<div className="bg-[var(--color-bg)] text-[var(--color-text)]">
```

#### 컴포넌트 구조
```
src/
├── components/
│   ├── ui/           # 기본 UI 요소
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Typography.tsx
│   │   └── Container.tsx
│   ├── layout/       # 레이아웃 관련
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Navigation.tsx
│   │   └── PageTransition.tsx
│   └── sections/     # 페이지 섹션
│       ├── Hero.tsx
│       ├── About.tsx
│       └── ...
├── styles/
│   ├── globals.css
│   └── variables.css # CSS 변수 정의
└── lib/
    └── animations.ts # Framer Motion 프리셋
```

### 3.3 개발 체크리스트

#### Phase 1: 기반 정리
- [ ] CSS 변수 기반 테마 시스템 구축
- [ ] 기본 UI 컴포넌트 생성 (Button, Typography, Container)
- [ ] 다크모드 전환 로직 개선
- [ ] 글로벌 스타일 정리

#### Phase 2: 레이아웃
- [ ] Header/Navigation 리디자인
- [ ] Footer 리디자인
- [ ] 페이지 전환 애니메이션 추가
- [ ] 반응형 그리드 시스템

#### Phase 3: 페이지별 구현
- [ ] Home 페이지 재구성
- [ ] Services → Atelier 페이지
- [ ] Portfolio → Selected Works
- [ ] About → Studio
- [ ] Contact → Inquiry

#### Phase 4: 인터랙션
- [ ] Scroll 애니메이션 (Framer Motion / GSAP)
- [ ] 호버 효과 통일
- [ ] 로딩 상태
- [ ] 마이크로 인터랙션

### 3.4 기술 스택 권장
```
현재:
- Next.js (Pages Router)
- Tailwind CSS
- TypeScript

추가 권장:
- Framer Motion (애니메이션)
- GSAP (복잡한 스크롤 애니메이션)
- next/font (웹폰트 최적화)
- sharp (이미지 최적화)
```

---

## 4. 작업 완료 현황

### Phase 1: 완료
- [x] CSS 변수 기반 테마 시스템 구축
- [x] 다크모드 텍스트/테두리 가시성 문제 해결
- [x] 버튼 스타일 통일 (btn-primary, btn-outline)
- [x] 컬러 시스템 변경 (Teal → Gold)
- [x] 타이포그래피 업데이트 (Cormorant Garamond 세리프 추가)

### Phase 2: 완료
- [x] Layout (Header/Footer) 리디자인
- [x] Home 페이지 리디자인
- [x] About → Studio 페이지 리디자인
- [x] Services → Atelier 페이지 리디자인
- [x] Portfolio → Works 페이지 리디자인
- [x] Contact → Inquiry 페이지 리디자인

### 추후 작업 (선택적)
1. Framer Motion 애니메이션 추가
2. 포트폴리오 상세 페이지 구현
3. CMS 연동 (포트폴리오 관리)
4. 다국어 지원
5. 성능 최적화

---

## 5. 레퍼런스

### 영감받을 사이트
- https://www.aesop.com (프리미엄 화장품)
- https://www.byredo.com (향수)
- https://basicagency.com (디자인 에이전시)
- https://www.studiofeixen.ch (스튜디오)
- https://antoniobrandao.com (개인 포트폴리오)

### 피해야 할 것
- 과한 그라데이션
- 네온 컬러
- 3D/Glassmorphism 과용
- 스톡 이미지
- "24시간 내 답변" 같은 저가 마케팅 문구

---

## Notes
- 이 문서는 리디자인 작업의 기준점으로 사용
- 작업 진행시 이 문서를 참고하여 일관성 유지
- 변경사항 발생시 이 문서 업데이트
