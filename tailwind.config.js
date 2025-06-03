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
                // NQ Solution 특화 색상
                nq: {
                    blue600: '#2563eb',
                    purple600: '#9333ea',
                    teal400: '#2dd4bf',
                    darkBlue: '#000000',      // 완전 검은색
                    deepBlue: '#0a0a0a',      // 아주 진한 회색
                    blue900: '#1e3a8a',
                    green500: '#22c55e',
                },
                // 라이트/다크 팔레트
                light: {
                    primary: '#2563eb',      // Blue 600
                    secondary: '#f3f3f7',
                    accent: '#e9ebef',
                    background: '#ffffff',
                    surface: '#f8fafc',
                    textPrimary: '#030213',
                    textSecondary: '#717182',
                    muted: '#ececf0',
                    destructive: '#d4183d',
                },
                dark: {
                    primary: '#fcfcfc',
                    secondary: '#1a1a1a',
                    accent: '#262626',
                    background: '#000000',
                    surface: '#0a0a0a',
                    textPrimary: '#ffffff',
                    textSecondary: '#a3a3a3',
                    muted: '#171717',
                    destructive: '#7d2d33',
                    gradientStart: '#2563eb',
                    gradientEnd: '#9333ea',
                },
                // 공통 색상 팔레트
                primary: {
                    50: '#eff6ff',
                    100: '#dbeafe',
                    200: '#bfdbfe',
                    300: '#93c5fd',
                    400: '#60a5fa',
                    500: '#3b82f6',
                    600: '#2563eb',
                    700: '#1d4ed8',
                    800: '#1e40af',
                    900: '#1e3a8a',
                },
                secondary: {
                    50: '#faf5ff',
                    100: '#f3e8ff',
                    200: '#e9d5ff',
                    300: '#d8b4fe',
                    400: '#c084fc',
                    500: '#a855f7',
                    600: '#9333ea',
                    700: '#7c3aed',
                    800: '#6b21a8',
                    900: '#581c87',
                },
            },
            fontFamily: {
                sans: ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'Roboto', 'sans-serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in-out',
                'slide-up': 'slideUp 0.5s ease-out',
                'slide-down': 'slideDown 0.3s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                slideDown: {
                    '0%': { transform: 'translateY(-10px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
            },
        },
    },
    plugins: [],
};