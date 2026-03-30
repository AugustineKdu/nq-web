declare module 'next-themes';
declare module 'next-i18next';
declare module 'next-i18next.config.js';

interface KakaoChannel {
    chat(options: { channelPublicId: string }): void;
    addChannel(options: { channelPublicId: string }): void;
}

interface KakaoStatic {
    init(appKey: string): void;
    isInitialized(): boolean;
    Channel: KakaoChannel;
}

interface Window {
    Kakao?: KakaoStatic;
}
