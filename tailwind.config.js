/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx}',
        './src/app/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                // Premium Stone Palette
                stone: {
                    50: '#FAFAF9',
                    100: '#F5F5F4',
                    200: '#E7E5E4',
                    300: '#D6D3D1',
                    400: '#A8A29E',
                    500: '#78716C',
                    600: '#57534E',
                    700: '#44403C',
                    800: '#292524',
                    900: '#1C1917',
                    950: '#0C0A09',
                },

                // Teal Accent (로고 컬러)
                teal: {
                    DEFAULT: '#3D7A80',
                    50: '#E8F2F3',
                    100: '#D1E5E7',
                    200: '#A3CBCE',
                    300: '#75B1B6',
                    400: '#4A9299',
                    500: '#3D7A80',
                    600: '#316267',
                    700: '#254A4E',
                    800: '#193234',
                    900: '#0C191B',
                },
            },
            fontFamily: {
                // 본문용 - 한국어 가독성 우선
                sans: ['Pretendard Variable', 'Pretendard', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
                // 제목용 - 클래식한 세리프
                serif: ['Cormorant Garamond', 'Noto Serif KR', 'Georgia', 'serif'],
                // 디스플레이용 - 모던하고 독특한 느낌
                display: ['Syne', 'Pretendard Variable', 'sans-serif'],
                // 모노스페이스 - 숫자, 코드용
                mono: ['JetBrains Mono', 'SF Mono', 'Consolas', 'monospace'],
            },
            fontSize: {
                // Display sizes for hero sections - 더 극적인 사이즈
                'display-xl': ['clamp(4rem, 12vw, 10rem)', { lineHeight: '0.9', letterSpacing: '-0.03em', fontWeight: '600' }],
                'display-lg': ['clamp(3rem, 8vw, 7rem)', { lineHeight: '0.95', letterSpacing: '-0.02em', fontWeight: '500' }],
                'display-md': ['clamp(2.5rem, 6vw, 5rem)', { lineHeight: '1', letterSpacing: '-0.02em', fontWeight: '500' }],
                'display-sm': ['clamp(1.75rem, 4vw, 2.5rem)', { lineHeight: '1.15', letterSpacing: '-0.01em', fontWeight: '500' }],
                // 숫자용 - 포트폴리오 넘버링 등
                'number-xl': ['clamp(5rem, 15vw, 12rem)', { lineHeight: '0.85', letterSpacing: '-0.05em', fontWeight: '300' }],
                'number-lg': ['clamp(3rem, 10vw, 8rem)', { lineHeight: '0.9', letterSpacing: '-0.04em', fontWeight: '300' }],
            },
            letterSpacing: {
                tightest: '-0.05em',
                tighter: '-0.03em',
                tight: '-0.02em',
                normal: '-0.01em',
                wide: '0.05em',
                wider: '0.1em',
                widest: '0.2em',
                ultrawide: '0.3em',
            },
            spacing: {
                '18': '4.5rem',
                '22': '5.5rem',
                '26': '6.5rem',
                '30': '7.5rem',
                '34': '8.5rem',
                '38': '9.5rem',
            },
            maxWidth: {
                '8xl': '88rem',
                '9xl': '96rem',
            },
            animation: {
                'fade-in': 'fadeIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards',
                'slide-up': 'slideUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards',
                'slide-left': 'slideLeft 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards',
                'reveal': 'reveal 1s cubic-bezier(0.4, 0, 0.2, 1) forwards',
                'marquee': 'marquee 30s linear infinite',
                'float': 'float 6s ease-in-out infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(40px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                slideLeft: {
                    '0%': { transform: 'translateX(40px)', opacity: '0' },
                    '100%': { transform: 'translateX(0)', opacity: '1' },
                },
                reveal: {
                    '0%': { clipPath: 'inset(0 100% 0 0)' },
                    '100%': { clipPath: 'inset(0 0 0 0)' },
                },
                marquee: {
                    '0%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(-50%)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
            },
            transitionDuration: {
                '400': '400ms',
                '600': '600ms',
                '800': '800ms',
                '1000': '1000ms',
            },
            transitionTimingFunction: {
                'premium': 'cubic-bezier(0.4, 0, 0.2, 1)',
                'smooth': 'cubic-bezier(0.23, 1, 0.32, 1)',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'grid-pattern': 'linear-gradient(to right, var(--color-border) 1px, transparent 1px), linear-gradient(to bottom, var(--color-border) 1px, transparent 1px)',
            },
            backgroundSize: {
                'grid': '80px 80px',
            },
        },
    },
    plugins: [],
};
