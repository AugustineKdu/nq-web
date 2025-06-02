/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx}',
        // src/app 폴더를 쓰지 않는다면, 이 라인을 지워도 무방합니다.
        './src/app/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                // 라이트/다크 팔레트 예시. 필요에 따라 수정하세요.
                light: {
                    primary: '#2563EB',
                    secondary: '#10B981',
                    accent: '#F59E0B',
                    background: '#FFFFFF',
                    surface: '#F8FAFC',
                    textPrimary: '#1E293B',
                    textSecondary: '#64748B',
                },
                dark: {
                    primary: '#3B82F6',
                    secondary: '#34D399',
                    accent: '#FBBF24',
                    background: '#0F172A',
                    surface: '#1E293B',
                    textPrimary: '#F1F5F9',
                    textSecondary: '#94A3B8',
                    gradientStart: '#1E40AF',
                    gradientEnd: '#7C3AED',
                },
                // 공통 색상(예: 팔레트 50~900까지)
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