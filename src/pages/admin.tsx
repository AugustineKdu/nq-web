import React, { useState, useEffect, useCallback } from "react";
import { Save, Plus, Trash2, Settings, BarChart3, FolderOpen, Check, Lock, LogOut, Briefcase, Edit3, X, Globe, RefreshCw, Database, Home, Menu, Moon, Sun, TrendingUp, Eye, Users, Languages, Info, Phone, Wrench, ChevronUp, ChevronDown } from "lucide-react";
import Head from "next/head";
import Link from "next/link";

interface PortfolioProject {
    id: number;
    title: string;
    titleKo?: string;
    client: string;
    category: string;
    year: string;
    description: string;
    descriptionKo?: string;
    longDescription?: string;
    tags: string[];
    featured: boolean;
    url?: string;
    isActive?: boolean;
    order?: number;
}

interface SiteSettings {
    id: string;
    email: string;
    phone: string;
    location: string;
    locationKo: string;
    contactFormUrl: string;
    ceoName: string;
    companyName: string;
    companyNameKo: string;
    showPhone?: boolean;
    showEmail?: boolean;
    showLocation?: boolean;
}

interface AnalyticsData {
    totalViews: number;
    todayViews: number;
    dailyViews: { date: string; count: number }[];
    topPages: { path: string; count: number }[];
}

interface SiteStats {
    id: string;
    projectCount: string;
    clientCount: string;
    satisfaction: string;
    since: string;
}

interface HomeContent {
    id: string;
    lang: string;
    heroEyebrow: string;
    heroHeadline: string[];
    heroSubtext: string;
    heroCta: string;
    servicesEyebrow: string;
    servicesHeadline: string;
    servicesViewAll: string;
    processEyebrow: string;
    processHeadline: string;
    aiEyebrow: string;
    aiHeadline: string;
    aiDescription: string;
    ctaSubtext: string;
    ctaButton: string;
}

interface AboutContent {
    id: string;
    lang: string;
    headline: string;
    intro: string;
    description: string;
    futureDescription: string;
    futureSubtext: string;
    ctaSubtext: string;
}

interface ServicesPageContent {
    id: string;
    lang: string;
    heroDescription: string;
    pricingDescription: string;
    ctaSubtext: string;
}

interface ContactPageContent {
    id: string;
    lang: string;
    heroIntro: string;
    heroDescription: string;
    formDescription: string;
    formButton: string;
    ctaSubtext: string;
}

interface ServiceItem {
    id: number;
    lang: string;
    number: string;
    title: string;
    subtitle: string;
    description: string;
    details: string[];
    order: number;
    pageType: string;
}

interface ProcessStep {
    id: number;
    lang: string;
    num: string;
    title: string;
    desc: string;
    order: number;
    pageType: string;
}

interface FaqItem {
    id: number;
    lang: string;
    question: string;
    answer: string;
    order: number;
}

const PORTFOLIO_CATEGORIES = ["Digital Product", "Mobile App", "Design", "Web"] as const;
const DEFAULT_PASSWORD = "nqadmin1234";

export default function Admin() {
    const [dark, setDark] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [activeTab, setActiveTab] = useState<"analytics" | "settings" | "stats" | "portfolio" | "password" | "home" | "about" | "services-page" | "contact-page">("analytics");
    const [saved, setSaved] = useState(false);
    const [loading, setLoading] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Analytics State
    const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);

    // Settings State
    const [settings, setSettings] = useState<SiteSettings>({
        id: "main",
        email: "hello@nqsolution.com",
        phone: "+82 10-1234-5678",
        location: "Seoul, South Korea",
        locationKo: "서울, 대한민국",
        contactFormUrl: "https://forms.google.com",
        ceoName: "홍길동",
        companyName: "NQ Solution",
        companyNameKo: "엔큐솔루션",
        showPhone: true,
        showEmail: true,
        showLocation: true
    });

    // Stats State
    const [stats, setStats] = useState<SiteStats>({
        id: "main",
        projectCount: "50+",
        clientCount: "30+",
        satisfaction: "100%",
        since: "2023"
    });

    // Portfolio State
    const [portfolioProjects, setPortfolioProjects] = useState<PortfolioProject[]>([]);
    const [editingProject, setEditingProject] = useState<PortfolioProject | null>(null);
    const [newPortfolioProject, setNewPortfolioProject] = useState<Partial<PortfolioProject>>({
        title: "", titleKo: "", client: "", category: "Web", year: new Date().getFullYear().toString(),
        description: "", descriptionKo: "", longDescription: "", tags: [], url: "", isActive: true, featured: false
    });
    const [tagInput, setTagInput] = useState("");

    // Password Change State
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Page Content States
    const [homeContentKo, setHomeContentKo] = useState<HomeContent | null>(null);
    const [homeContentEn, setHomeContentEn] = useState<HomeContent | null>(null);
    const [aboutContentKo, setAboutContentKo] = useState<AboutContent | null>(null);
    const [aboutContentEn, setAboutContentEn] = useState<AboutContent | null>(null);
    const [servicesContentKo, setServicesContentKo] = useState<ServicesPageContent | null>(null);
    const [servicesContentEn, setServicesContentEn] = useState<ServicesPageContent | null>(null);
    const [contactContentKo, setContactContentKo] = useState<ContactPageContent | null>(null);
    const [contactContentEn, setContactContentEn] = useState<ContactPageContent | null>(null);

    // Service Items, Process Steps, FAQ Items
    const [serviceItems, setServiceItems] = useState<ServiceItem[]>([]);
    const [processSteps, setProcessSteps] = useState<ProcessStep[]>([]);
    const [faqItems, setFaqItems] = useState<FaqItem[]>([]);

    // Translation loading state
    const [translating, setTranslating] = useState(false);

    // Fetch data from API
    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const [
                settingsRes, statsRes, projectsRes, analyticsRes,
                homeKoRes, homeEnRes, aboutKoRes, aboutEnRes,
                servicesKoRes, servicesEnRes, contactKoRes, contactEnRes,
                serviceItemsRes, processStepsRes, faqItemsRes
            ] = await Promise.all([
                fetch("/api/settings"),
                fetch("/api/stats"),
                fetch("/api/projects"),
                fetch("/api/analytics?days=30"),
                fetch("/api/home-content?lang=ko"),
                fetch("/api/home-content?lang=en"),
                fetch("/api/about-content?lang=ko"),
                fetch("/api/about-content?lang=en"),
                fetch("/api/services-content?lang=ko"),
                fetch("/api/services-content?lang=en"),
                fetch("/api/contact-content?lang=ko"),
                fetch("/api/contact-content?lang=en"),
                fetch("/api/services"),
                fetch("/api/process"),
                fetch("/api/faq")
            ]);

            if (settingsRes.ok) {
                const data = await settingsRes.json();
                setSettings(prev => ({ ...prev, ...data }));
            }
            if (statsRes.ok) {
                const data = await statsRes.json();
                setStats(data);
            }
            if (projectsRes.ok) {
                const data = await projectsRes.json();
                setPortfolioProjects(data);
            }
            if (analyticsRes.ok) {
                const data = await analyticsRes.json();
                setAnalytics(data);
            }
            if (homeKoRes.ok) setHomeContentKo(await homeKoRes.json());
            if (homeEnRes.ok) setHomeContentEn(await homeEnRes.json());
            if (aboutKoRes.ok) setAboutContentKo(await aboutKoRes.json());
            if (aboutEnRes.ok) setAboutContentEn(await aboutEnRes.json());
            if (servicesKoRes.ok) setServicesContentKo(await servicesKoRes.json());
            if (servicesEnRes.ok) setServicesContentEn(await servicesEnRes.json());
            if (contactKoRes.ok) setContactContentKo(await contactKoRes.json());
            if (contactEnRes.ok) setContactContentEn(await contactEnRes.json());
            if (serviceItemsRes.ok) setServiceItems(await serviceItemsRes.json());
            if (processStepsRes.ok) setProcessSteps(await processStepsRes.json());
            if (faqItemsRes.ok) setFaqItems(await faqItemsRes.json());
        } catch (error) {
            console.error("Failed to fetch data:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        // Check session
        const session = sessionStorage.getItem("nq-admin-session");
        if (session === "authenticated") {
            setIsAuthenticated(true);
        }

        // Initialize password
        const savedPassword = localStorage.getItem("nq-admin-password");
        if (!savedPassword) {
            localStorage.setItem("nq-admin-password", DEFAULT_PASSWORD);
        }

        // Check system theme
        if (typeof window !== "undefined") {
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            const savedTheme = localStorage.getItem("nq-admin-theme");
            setDark(savedTheme ? savedTheme === "dark" : prefersDark);
        }
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            fetchData();
        }
    }, [isAuthenticated, fetchData]);

    const toggleTheme = () => {
        setDark(!dark);
        localStorage.setItem("nq-admin-theme", !dark ? "dark" : "light");
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        const storedPassword = localStorage.getItem("nq-admin-password") || DEFAULT_PASSWORD;

        if (password === storedPassword) {
            setIsAuthenticated(true);
            sessionStorage.setItem("nq-admin-session", "authenticated");
            setPasswordError(false);
        } else {
            setPasswordError(true);
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        sessionStorage.removeItem("nq-admin-session");
        setPassword("");
    };

    const handlePasswordChange = () => {
        if (newPassword !== confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }
        if (newPassword.length < 6) {
            alert("비밀번호는 6자 이상이어야 합니다.");
            return;
        }
        localStorage.setItem("nq-admin-password", newPassword);
        setNewPassword("");
        setConfirmPassword("");
        showSaveNotification();
    };

    // Save settings to API
    const saveSettings = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/settings", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(settings)
            });
            if (res.ok) {
                showSaveNotification();
            } else {
                const errorData = await res.json().catch(() => ({}));
                console.error("Settings save failed:", res.status, errorData);
                alert(`저장에 실패했습니다. (${res.status})`);
            }
        } catch (error) {
            console.error("Failed to save settings:", error);
            alert("저장에 실패했습니다. 네트워크 오류");
        } finally {
            setLoading(false);
        }
    };

    // Save stats to API
    const saveStats = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/stats", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(stats)
            });
            if (res.ok) {
                showSaveNotification();
            } else {
                const errorData = await res.json().catch(() => ({}));
                console.error("Stats save failed:", res.status, errorData);
                alert(`저장에 실패했습니다. (${res.status})`);
            }
        } catch (error) {
            console.error("Failed to save stats:", error);
            alert("저장에 실패했습니다. 네트워크 오류");
        } finally {
            setLoading(false);
        }
    };

    // Save page content
    const savePageContent = async (endpoint: string, contentKo: unknown, contentEn: unknown) => {
        setLoading(true);
        try {
            const [resKo, resEn] = await Promise.all([
                fetch(endpoint, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(contentKo)
                }),
                fetch(endpoint, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(contentEn)
                })
            ]);
            if (resKo.ok && resEn.ok) {
                showSaveNotification();
            } else {
                const errors = [];
                if (!resKo.ok) errors.push(`KO: ${resKo.status}`);
                if (!resEn.ok) errors.push(`EN: ${resEn.status}`);
                console.error("Content save failed:", errors);
                alert(`저장에 실패했습니다. (${errors.join(", ")})`);
            }
        } catch (error) {
            console.error("Failed to save content:", error);
            alert("저장에 실패했습니다. 네트워크 오류");
        } finally {
            setLoading(false);
        }
    };

    // Translate text from Korean to English
    const translateText = async (text: string): Promise<string> => {
        try {
            const res = await fetch("/api/translate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text, targetLang: "en" })
            });
            if (res.ok) {
                const data = await res.json();
                return data.translatedText || text;
            }
            return text;
        } catch {
            return text;
        }
    };

    // Auto-translate home content
    const translateHomeContent = async () => {
        if (!homeContentKo) return;
        setTranslating(true);
        try {
            const [heroSubtext, heroCta, servicesHeadline, servicesViewAll, processHeadline, aiHeadline, aiDescription, ctaSubtext, ctaButton] = await Promise.all([
                translateText(homeContentKo.heroSubtext),
                translateText(homeContentKo.heroCta),
                translateText(homeContentKo.servicesHeadline),
                translateText(homeContentKo.servicesViewAll),
                translateText(homeContentKo.processHeadline),
                translateText(homeContentKo.aiHeadline),
                translateText(homeContentKo.aiDescription),
                translateText(homeContentKo.ctaSubtext),
                translateText(homeContentKo.ctaButton)
            ]);

            const translatedHeadlines = await Promise.all(homeContentKo.heroHeadline.map(h => translateText(h)));

            setHomeContentEn({
                ...homeContentEn!,
                lang: "en",
                heroHeadline: translatedHeadlines,
                heroSubtext,
                heroCta,
                servicesHeadline,
                servicesViewAll,
                processHeadline,
                aiHeadline,
                aiDescription,
                ctaSubtext,
                ctaButton
            });
            showSaveNotification();
        } finally {
            setTranslating(false);
        }
    };

    // Auto-translate about content
    const translateAboutContent = async () => {
        if (!aboutContentKo) return;
        setTranslating(true);
        try {
            const [intro, description, futureDescription, futureSubtext, ctaSubtext] = await Promise.all([
                translateText(aboutContentKo.intro),
                translateText(aboutContentKo.description),
                translateText(aboutContentKo.futureDescription),
                translateText(aboutContentKo.futureSubtext),
                translateText(aboutContentKo.ctaSubtext)
            ]);

            setAboutContentEn({
                ...aboutContentEn!,
                lang: "en",
                headline: aboutContentKo.headline, // Keep company name
                intro,
                description,
                futureDescription,
                futureSubtext,
                ctaSubtext
            });
            showSaveNotification();
        } finally {
            setTranslating(false);
        }
    };

    // Auto-translate services content
    const translateServicesContent = async () => {
        if (!servicesContentKo) return;
        setTranslating(true);
        try {
            const [heroDescription, pricingDescription, ctaSubtext] = await Promise.all([
                translateText(servicesContentKo.heroDescription),
                translateText(servicesContentKo.pricingDescription),
                translateText(servicesContentKo.ctaSubtext)
            ]);

            setServicesContentEn({
                ...servicesContentEn!,
                lang: "en",
                heroDescription,
                pricingDescription,
                ctaSubtext
            });
            showSaveNotification();
        } finally {
            setTranslating(false);
        }
    };

    // Auto-translate contact content
    const translateContactContent = async () => {
        if (!contactContentKo) return;
        setTranslating(true);
        try {
            const [heroIntro, heroDescription, formDescription, formButton, ctaSubtext] = await Promise.all([
                translateText(contactContentKo.heroIntro),
                translateText(contactContentKo.heroDescription),
                translateText(contactContentKo.formDescription),
                translateText(contactContentKo.formButton),
                translateText(contactContentKo.ctaSubtext)
            ]);

            setContactContentEn({
                ...contactContentEn!,
                lang: "en",
                heroIntro,
                heroDescription,
                formDescription,
                formButton,
                ctaSubtext
            });
            showSaveNotification();
        } finally {
            setTranslating(false);
        }
    };

    // Add project to API
    const addPortfolioProject = async () => {
        if (!newPortfolioProject.title || !newPortfolioProject.client) return;
        setLoading(true);
        try {
            const res = await fetch("/api/projects", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...newPortfolioProject,
                    order: portfolioProjects.length + 1
                })
            });
            if (res.ok) {
                await fetchData();
                setNewPortfolioProject({
                    title: "", titleKo: "", client: "", category: "Web", year: new Date().getFullYear().toString(),
                    description: "", descriptionKo: "", longDescription: "", tags: [], url: "", isActive: true, featured: false
                });
                setTagInput("");
                showSaveNotification();
            }
        } catch (error) {
            console.error("Failed to add project:", error);
            alert("프로젝트 추가에 실패했습니다.");
        } finally {
            setLoading(false);
        }
    };

    // Update project via API
    const updatePortfolioProject = async () => {
        if (!editingProject) return;
        setLoading(true);
        try {
            const res = await fetch("/api/projects", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editingProject)
            });
            if (res.ok) {
                await fetchData();
                setEditingProject(null);
                showSaveNotification();
            }
        } catch (error) {
            console.error("Failed to update project:", error);
            alert("프로젝트 수정에 실패했습니다.");
        } finally {
            setLoading(false);
        }
    };

    // Delete project via API
    const removePortfolioProject = async (id: number) => {
        if (!confirm("정말 삭제하시겠습니까?")) return;
        setLoading(true);
        try {
            const res = await fetch(`/api/projects?id=${id}`, {
                method: "DELETE"
            });
            if (res.ok) {
                await fetchData();
                showSaveNotification();
            }
        } catch (error) {
            console.error("Failed to delete project:", error);
            alert("프로젝트 삭제에 실패했습니다.");
        } finally {
            setLoading(false);
        }
    };

    // Reorder portfolio projects
    const reorderProject = async (index: number, direction: "up" | "down") => {
        if (direction === "up" && index === 0) return;
        if (direction === "down" && index === portfolioProjects.length - 1) return;

        const newIndex = direction === "up" ? index - 1 : index + 1;
        const newProjects = [...portfolioProjects];
        const [removed] = newProjects.splice(index, 1);
        newProjects.splice(newIndex, 0, removed);

        // Update order values
        const orders = newProjects.map((p, i) => ({ id: p.id, order: i }));

        setLoading(true);
        try {
            const res = await fetch("/api/projects", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ orders })
            });
            if (res.ok) {
                setPortfolioProjects(newProjects);
                showSaveNotification();
            }
        } catch (error) {
            console.error("Failed to reorder projects:", error);
            alert("순서 변경에 실패했습니다.");
        } finally {
            setLoading(false);
        }
    };

    // Tags
    const addTag = (isEditing: boolean) => {
        if (!tagInput.trim()) return;
        if (isEditing && editingProject) {
            setEditingProject({ ...editingProject, tags: [...(editingProject.tags || []), tagInput.trim()] });
        } else {
            setNewPortfolioProject({ ...newPortfolioProject, tags: [...(newPortfolioProject.tags || []), tagInput.trim()] });
        }
        setTagInput("");
    };

    const removeTag = (tag: string, isEditing: boolean) => {
        if (isEditing && editingProject) {
            setEditingProject({ ...editingProject, tags: editingProject.tags.filter(t => t !== tag) });
        } else {
            setNewPortfolioProject({ ...newPortfolioProject, tags: (newPortfolioProject.tags || []).filter(t => t !== tag) });
        }
    };

    const showSaveNotification = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const tabs = [
        { id: "analytics", label: "방문자 분석", icon: TrendingUp },
        { id: "home", label: "홈페이지", icon: Home },
        { id: "about", label: "회사소개", icon: Info },
        { id: "services-page", label: "서비스", icon: Wrench },
        { id: "contact-page", label: "문의", icon: Phone },
        { id: "settings", label: "사이트 설정", icon: Settings },
        { id: "stats", label: "통계 수치", icon: BarChart3 },
        { id: "portfolio", label: "포트폴리오", icon: Briefcase },
        { id: "password", label: "비밀번호 변경", icon: Lock },
    ];

    // Login Screen
    if (!isAuthenticated) {
        return (
            <>
                <Head>
                    <title>관리자 로그인 | NQ Solution</title>
                    <meta name="robots" content="noindex, nofollow" />
                </Head>
                <div className={`min-h-screen flex items-center justify-center ${dark ? "bg-[#0a0a0a]" : "bg-[#fafafa]"}`}>
                    <div className={`w-full max-w-md p-8 rounded-2xl ${
                        dark ? "bg-neutral-900 border border-neutral-800" : "bg-white border border-neutral-200 shadow-lg"
                    }`}>
                        <div className="text-center mb-8">
                            <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                                dark ? "bg-teal-500/10" : "bg-teal-500/10"
                            }`}>
                                <Lock className="w-8 h-8 text-teal-500" />
                            </div>
                            <h1 className={`text-2xl font-medium ${dark ? "text-white" : "text-neutral-900"}`}>
                                관리자 로그인
                            </h1>
                            <p className={`text-sm mt-2 ${dark ? "text-neutral-400" : "text-neutral-600"}`}>
                                NQ Solution CMS
                            </p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-6">
                            <div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setPasswordError(false);
                                    }}
                                    placeholder="비밀번호"
                                    className={`w-full px-4 py-3 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500/50 ${
                                        dark
                                            ? "bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500"
                                            : "bg-neutral-50 border border-neutral-200 text-neutral-900 placeholder-neutral-400"
                                    } ${passwordError ? "border-red-500 focus:ring-red-500/50" : ""}`}
                                />
                                {passwordError && (
                                    <p className="text-red-500 text-sm mt-2">
                                        비밀번호가 올바르지 않습니다
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 bg-teal-500 text-white rounded-xl font-medium hover:bg-teal-600 transition-colors"
                            >
                                로그인
                            </button>
                        </form>
                    </div>
                </div>
            </>
        );
    }

    // Admin Dashboard - Custom layout without normal header
    return (
        <>
            <Head>
                <title>관리자 대시보드 | NQ Solution</title>
                <meta name="robots" content="noindex, nofollow" />
            </Head>
            <div className={`min-h-screen ${dark ? "bg-[#0a0a0a]" : "bg-[#f5f5f5]"}`}>
                {/* Admin Header */}
                <header className={`sticky top-0 z-50 border-b ${dark ? "border-neutral-800 bg-neutral-900/95 backdrop-blur" : "border-neutral-200 bg-white/95 backdrop-blur"}`}>
                    <div className="px-4 sm:px-6 lg:px-8 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setSidebarOpen(!sidebarOpen)}
                                    className={`md:hidden p-2 rounded-lg ${dark ? "hover:bg-neutral-800" : "hover:bg-neutral-100"}`}
                                >
                                    <Menu className="w-5 h-5" />
                                </button>
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${dark ? "bg-teal-500/10" : "bg-teal-500/10"}`}>
                                        <Database className="w-5 h-5 text-teal-500" />
                                    </div>
                                    <div>
                                        <h1 className={`text-lg font-medium ${dark ? "text-white" : "text-neutral-900"}`}>
                                            NQ Admin
                                        </h1>
                                        <p className={`text-xs ${dark ? "text-neutral-500" : "text-neutral-500"}`}>
                                            콘텐츠 관리 시스템
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                {loading && (
                                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm ${dark ? "bg-neutral-800 text-neutral-400" : "bg-neutral-100 text-neutral-600"}`}>
                                        <RefreshCw className="w-4 h-4 animate-spin" />
                                        <span className="hidden sm:inline">로딩중...</span>
                                    </div>
                                )}
                                {saved && (
                                    <div className="flex items-center gap-2 px-3 py-1.5 bg-teal-500 text-white rounded-lg text-sm">
                                        <Check className="w-4 h-4" />
                                        <span className="hidden sm:inline">저장됨</span>
                                    </div>
                                )}
                                <button
                                    onClick={toggleTheme}
                                    className={`p-2 rounded-lg transition-colors ${dark ? "text-neutral-400 hover:bg-neutral-800" : "text-neutral-600 hover:bg-neutral-100"}`}
                                >
                                    {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                                </button>
                                <Link
                                    href="/"
                                    className={`p-2 rounded-lg transition-colors ${dark ? "text-neutral-400 hover:bg-neutral-800" : "text-neutral-600 hover:bg-neutral-100"}`}
                                    title="홈페이지로 이동"
                                >
                                    <Home className="w-5 h-5" />
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                        dark
                                            ? "text-neutral-400 hover:text-white hover:bg-neutral-800"
                                            : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
                                    }`}
                                >
                                    <LogOut className="w-4 h-4" />
                                    <span className="hidden sm:inline">로그아웃</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="flex">
                    {/* Sidebar */}
                    <aside className={`${sidebarOpen ? "block" : "hidden"} md:block fixed md:sticky top-[73px] left-0 h-[calc(100vh-73px)] w-64 z-40 ${dark ? "bg-neutral-900 border-r border-neutral-800" : "bg-white border-r border-neutral-200"}`}>
                        <nav className="p-4 space-y-1">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => {
                                        setActiveTab(tab.id as typeof activeTab);
                                        setSidebarOpen(false);
                                    }}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                                        activeTab === tab.id
                                            ? "bg-teal-500 text-white"
                                            : dark
                                                ? "text-neutral-300 hover:bg-neutral-800"
                                                : "text-neutral-600 hover:bg-neutral-100"
                                    }`}
                                >
                                    <tab.icon className="w-5 h-5" />
                                    {tab.label}
                                </button>
                            ))}
                        </nav>

                        <div className={`absolute bottom-0 left-0 right-0 p-4 border-t ${dark ? "border-neutral-800" : "border-neutral-200"}`}>
                            <div className={`text-xs ${dark ? "text-neutral-500" : "text-neutral-400"}`}>
                                <p>데이터베이스 연동</p>
                                <p className="flex items-center gap-1 mt-1">
                                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                    PostgreSQL 연결됨
                                </p>
                            </div>
                        </div>
                    </aside>

                    {/* Mobile overlay */}
                    {sidebarOpen && (
                        <div
                            className="fixed inset-0 bg-black/50 z-30 md:hidden"
                            onClick={() => setSidebarOpen(false)}
                        />
                    )}

                    {/* Main Content */}
                    <main className="flex-1 p-4 sm:p-6 lg:p-8 md:ml-0">
                        <div className={`max-w-4xl mx-auto p-6 sm:p-8 rounded-2xl ${
                            dark ? "bg-neutral-900 border border-neutral-800" : "bg-white border border-neutral-200"
                        }`}>
                            {/* Analytics Tab */}
                            {activeTab === "analytics" && (
                                <div className="space-y-8">
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <h2 className={`text-xl font-medium ${dark ? "text-white" : "text-neutral-900"}`}>
                                                방문자 분석
                                            </h2>
                                            <button
                                                onClick={fetchData}
                                                disabled={loading}
                                                className={`p-2 rounded-lg transition-colors ${dark ? "hover:bg-neutral-800" : "hover:bg-neutral-100"}`}
                                            >
                                                <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                                            </button>
                                        </div>
                                        <p className={`text-sm mb-8 ${dark ? "text-neutral-400" : "text-neutral-600"}`}>
                                            최근 30일간의 사이트 방문 현황입니다.
                                        </p>

                                        {/* Stats Cards */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                                            <div className={`p-6 rounded-xl ${dark ? "bg-neutral-800" : "bg-neutral-100"}`}>
                                                <div className="flex items-center gap-3 mb-2">
                                                    <Eye className="w-5 h-5 text-teal-500" />
                                                    <span className={`text-sm ${dark ? "text-neutral-400" : "text-neutral-600"}`}>오늘 방문</span>
                                                </div>
                                                <p className={`text-3xl font-bold ${dark ? "text-white" : "text-neutral-900"}`}>
                                                    {analytics?.todayViews || 0}
                                                </p>
                                            </div>
                                            <div className={`p-6 rounded-xl ${dark ? "bg-neutral-800" : "bg-neutral-100"}`}>
                                                <div className="flex items-center gap-3 mb-2">
                                                    <Users className="w-5 h-5 text-teal-500" />
                                                    <span className={`text-sm ${dark ? "text-neutral-400" : "text-neutral-600"}`}>30일 총 방문</span>
                                                </div>
                                                <p className={`text-3xl font-bold ${dark ? "text-white" : "text-neutral-900"}`}>
                                                    {analytics?.totalViews || 0}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Daily Views Chart */}
                                        <div className={`p-6 rounded-xl mb-8 ${dark ? "bg-neutral-800" : "bg-neutral-100"}`}>
                                            <h3 className={`text-sm font-medium mb-4 ${dark ? "text-neutral-300" : "text-neutral-700"}`}>
                                                일별 방문 추이
                                            </h3>
                                            {analytics?.dailyViews && analytics.dailyViews.length > 0 ? (
                                                <div className="flex items-end gap-1 h-32">
                                                    {analytics.dailyViews.slice(-14).map((day, i) => {
                                                        const maxCount = Math.max(...analytics.dailyViews.map(d => d.count), 1);
                                                        const height = (day.count / maxCount) * 100;
                                                        return (
                                                            <div
                                                                key={i}
                                                                className="flex-1 flex flex-col items-center gap-1"
                                                            >
                                                                <div
                                                                    className="w-full bg-teal-500 rounded-t transition-all"
                                                                    style={{ height: `${Math.max(height, 4)}%` }}
                                                                    title={`${day.date}: ${day.count}회`}
                                                                />
                                                                <span className={`text-[10px] ${dark ? "text-neutral-500" : "text-neutral-400"}`}>
                                                                    {day.date.slice(-2)}
                                                                </span>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            ) : (
                                                <p className={`text-center py-8 ${dark ? "text-neutral-500" : "text-neutral-400"}`}>
                                                    아직 데이터가 없습니다
                                                </p>
                                            )}
                                        </div>

                                        {/* Top Pages */}
                                        <div className={`p-6 rounded-xl ${dark ? "bg-neutral-800" : "bg-neutral-100"}`}>
                                            <h3 className={`text-sm font-medium mb-4 ${dark ? "text-neutral-300" : "text-neutral-700"}`}>
                                                인기 페이지
                                            </h3>
                                            {analytics?.topPages && analytics.topPages.length > 0 ? (
                                                <div className="space-y-3">
                                                    {analytics.topPages.map((page, i) => (
                                                        <div key={i} className="flex items-center justify-between">
                                                            <span className={`text-sm ${dark ? "text-neutral-300" : "text-neutral-700"}`}>
                                                                {page.path === "/" ? "홈페이지" : page.path}
                                                            </span>
                                                            <span className={`text-sm font-medium ${dark ? "text-teal-400" : "text-teal-600"}`}>
                                                                {page.count}회
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className={`text-center py-4 ${dark ? "text-neutral-500" : "text-neutral-400"}`}>
                                                    아직 데이터가 없습니다
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Settings Tab */}
                            {activeTab === "settings" && (
                                <div className="space-y-8">
                                    <div>
                                        <h2 className={`text-xl font-medium mb-2 ${dark ? "text-white" : "text-neutral-900"}`}>
                                            사이트 설정
                                        </h2>
                                        <p className={`text-sm mb-8 ${dark ? "text-neutral-400" : "text-neutral-600"}`}>
                                            웹사이트 전체에 표시되는 기본 정보를 설정합니다.
                                        </p>

                                        <div className="space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className={`block text-sm font-medium mb-2 ${dark ? "text-neutral-300" : "text-neutral-700"}`}>
                                                        <span className="inline-flex items-center gap-2">
                                                            회사명
                                                            <span className="px-1.5 py-0.5 text-[10px] rounded bg-blue-500/20 text-blue-400">EN</span>
                                                        </span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={settings.companyName}
                                                        onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                                                        className={`w-full px-4 py-3 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500/50 ${
                                                            dark
                                                                ? "bg-neutral-800 border border-neutral-700 text-white"
                                                                : "bg-neutral-50 border border-neutral-200 text-neutral-900"
                                                        }`}
                                                    />
                                                </div>
                                                <div>
                                                    <label className={`block text-sm font-medium mb-2 ${dark ? "text-neutral-300" : "text-neutral-700"}`}>
                                                        <span className="inline-flex items-center gap-2">
                                                            회사명
                                                            <span className="px-1.5 py-0.5 text-[10px] rounded bg-green-500/20 text-green-400">KO</span>
                                                        </span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={settings.companyNameKo}
                                                        onChange={(e) => setSettings({ ...settings, companyNameKo: e.target.value })}
                                                        className={`w-full px-4 py-3 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500/50 ${
                                                            dark
                                                                ? "bg-neutral-800 border border-neutral-700 text-white"
                                                                : "bg-neutral-50 border border-neutral-200 text-neutral-900"
                                                        }`}
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className={`block text-sm font-medium mb-2 ${dark ? "text-neutral-300" : "text-neutral-700"}`}>
                                                    문의 폼 URL
                                                </label>
                                                <input
                                                    type="url"
                                                    value={settings.contactFormUrl}
                                                    onChange={(e) => setSettings({ ...settings, contactFormUrl: e.target.value })}
                                                    className={`w-full px-4 py-3 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500/50 ${
                                                        dark
                                                            ? "bg-neutral-800 border border-neutral-700 text-white"
                                                            : "bg-neutral-50 border border-neutral-200 text-neutral-900"
                                                    }`}
                                                    placeholder="https://forms.google.com/..."
                                                />
                                                <p className={`text-xs mt-2 ${dark ? "text-neutral-500" : "text-neutral-500"}`}>
                                                    Contact 페이지의 문의하기 버튼 클릭 시 이동할 URL
                                                </p>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className={`block text-sm font-medium mb-2 ${dark ? "text-neutral-300" : "text-neutral-700"}`}>
                                                        이메일
                                                    </label>
                                                    <input
                                                        type="email"
                                                        value={settings.email}
                                                        onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                                                        className={`w-full px-4 py-3 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500/50 ${
                                                            dark
                                                                ? "bg-neutral-800 border border-neutral-700 text-white"
                                                                : "bg-neutral-50 border border-neutral-200 text-neutral-900"
                                                        }`}
                                                    />
                                                </div>
                                                <div>
                                                    <label className={`block text-sm font-medium mb-2 ${dark ? "text-neutral-300" : "text-neutral-700"}`}>
                                                        전화번호
                                                    </label>
                                                    <input
                                                        type="tel"
                                                        value={settings.phone}
                                                        onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                                                        className={`w-full px-4 py-3 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500/50 ${
                                                            dark
                                                                ? "bg-neutral-800 border border-neutral-700 text-white"
                                                                : "bg-neutral-50 border border-neutral-200 text-neutral-900"
                                                        }`}
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className={`block text-sm font-medium mb-2 ${dark ? "text-neutral-300" : "text-neutral-700"}`}>
                                                        <span className="inline-flex items-center gap-2">
                                                            위치
                                                            <span className="px-1.5 py-0.5 text-[10px] rounded bg-blue-500/20 text-blue-400">EN</span>
                                                        </span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={settings.location}
                                                        onChange={(e) => setSettings({ ...settings, location: e.target.value })}
                                                        className={`w-full px-4 py-3 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500/50 ${
                                                            dark
                                                                ? "bg-neutral-800 border border-neutral-700 text-white"
                                                                : "bg-neutral-50 border border-neutral-200 text-neutral-900"
                                                        }`}
                                                    />
                                                </div>
                                                <div>
                                                    <label className={`block text-sm font-medium mb-2 ${dark ? "text-neutral-300" : "text-neutral-700"}`}>
                                                        <span className="inline-flex items-center gap-2">
                                                            위치
                                                            <span className="px-1.5 py-0.5 text-[10px] rounded bg-green-500/20 text-green-400">KO</span>
                                                        </span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={settings.locationKo}
                                                        onChange={(e) => setSettings({ ...settings, locationKo: e.target.value })}
                                                        className={`w-full px-4 py-3 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500/50 ${
                                                            dark
                                                                ? "bg-neutral-800 border border-neutral-700 text-white"
                                                                : "bg-neutral-50 border border-neutral-200 text-neutral-900"
                                                        }`}
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className={`block text-sm font-medium mb-2 ${dark ? "text-neutral-300" : "text-neutral-700"}`}>
                                                    대표자 이름
                                                </label>
                                                <input
                                                    type="text"
                                                    value={settings.ceoName}
                                                    onChange={(e) => setSettings({ ...settings, ceoName: e.target.value })}
                                                    className={`w-full px-4 py-3 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500/50 ${
                                                        dark
                                                            ? "bg-neutral-800 border border-neutral-700 text-white"
                                                            : "bg-neutral-50 border border-neutral-200 text-neutral-900"
                                                    }`}
                                                    placeholder="홍길동"
                                                />
                                            </div>
                                        </div>

                                        {/* Contact Visibility Settings */}
                                        <div className={`p-6 rounded-xl mt-6 ${dark ? "bg-neutral-800" : "bg-neutral-100"}`}>
                                            <h3 className={`text-sm font-medium mb-4 ${dark ? "text-neutral-300" : "text-neutral-700"}`}>
                                                연락처 표시 설정
                                            </h3>
                                            <p className={`text-xs mb-4 ${dark ? "text-neutral-500" : "text-neutral-500"}`}>
                                                Contact 페이지에서 표시할 연락처 정보를 선택하세요.
                                            </p>
                                            <div className="flex flex-wrap gap-6">
                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={settings.showEmail ?? true}
                                                        onChange={(e) => setSettings({ ...settings, showEmail: e.target.checked })}
                                                        className="w-4 h-4 rounded border-neutral-300 text-teal-500 focus:ring-teal-500"
                                                    />
                                                    <span className={`text-sm ${dark ? "text-neutral-300" : "text-neutral-700"}`}>이메일 표시</span>
                                                </label>
                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={settings.showPhone ?? true}
                                                        onChange={(e) => setSettings({ ...settings, showPhone: e.target.checked })}
                                                        className="w-4 h-4 rounded border-neutral-300 text-teal-500 focus:ring-teal-500"
                                                    />
                                                    <span className={`text-sm ${dark ? "text-neutral-300" : "text-neutral-700"}`}>전화번호 표시</span>
                                                </label>
                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={settings.showLocation ?? true}
                                                        onChange={(e) => setSettings({ ...settings, showLocation: e.target.checked })}
                                                        className="w-4 h-4 rounded border-neutral-300 text-teal-500 focus:ring-teal-500"
                                                    />
                                                    <span className={`text-sm ${dark ? "text-neutral-300" : "text-neutral-700"}`}>위치 표시</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={saveSettings}
                                        disabled={loading}
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-teal-500 text-white rounded-xl font-medium hover:bg-teal-600 transition-colors disabled:opacity-50"
                                    >
                                        <Save className="w-4 h-4" />
                                        설정 저장
                                    </button>
                                </div>
                            )}

                            {/* Stats Tab */}
                            {activeTab === "stats" && (
                                <div className="space-y-8">
                                    <div>
                                        <h2 className={`text-xl font-medium mb-2 ${dark ? "text-white" : "text-neutral-900"}`}>
                                            통계 설정
                                        </h2>
                                        <p className={`text-sm mb-8 ${dark ? "text-neutral-400" : "text-neutral-600"}`}>
                                            홈페이지와 Contact 페이지에 표시되는 통계 수치입니다.
                                        </p>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div>
                                                <label className={`block text-sm font-medium mb-2 ${dark ? "text-neutral-300" : "text-neutral-700"}`}>
                                                    완료 프로젝트 수
                                                </label>
                                                <input
                                                    type="text"
                                                    value={stats.projectCount}
                                                    onChange={(e) => setStats({ ...stats, projectCount: e.target.value })}
                                                    className={`w-full px-4 py-3 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500/50 ${
                                                        dark
                                                            ? "bg-neutral-800 border border-neutral-700 text-white"
                                                            : "bg-neutral-50 border border-neutral-200 text-neutral-900"
                                                    }`}
                                                    placeholder="50+"
                                                />
                                            </div>
                                            <div>
                                                <label className={`block text-sm font-medium mb-2 ${dark ? "text-neutral-300" : "text-neutral-700"}`}>
                                                    클라이언트 수
                                                </label>
                                                <input
                                                    type="text"
                                                    value={stats.clientCount}
                                                    onChange={(e) => setStats({ ...stats, clientCount: e.target.value })}
                                                    className={`w-full px-4 py-3 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500/50 ${
                                                        dark
                                                            ? "bg-neutral-800 border border-neutral-700 text-white"
                                                            : "bg-neutral-50 border border-neutral-200 text-neutral-900"
                                                    }`}
                                                    placeholder="30+"
                                                />
                                            </div>
                                            <div>
                                                <label className={`block text-sm font-medium mb-2 ${dark ? "text-neutral-300" : "text-neutral-700"}`}>
                                                    만족도
                                                </label>
                                                <input
                                                    type="text"
                                                    value={stats.satisfaction}
                                                    onChange={(e) => setStats({ ...stats, satisfaction: e.target.value })}
                                                    className={`w-full px-4 py-3 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500/50 ${
                                                        dark
                                                            ? "bg-neutral-800 border border-neutral-700 text-white"
                                                            : "bg-neutral-50 border border-neutral-200 text-neutral-900"
                                                    }`}
                                                    placeholder="100%"
                                                />
                                            </div>
                                            <div>
                                                <label className={`block text-sm font-medium mb-2 ${dark ? "text-neutral-300" : "text-neutral-700"}`}>
                                                    창립년도
                                                </label>
                                                <input
                                                    type="text"
                                                    value={stats.since}
                                                    onChange={(e) => setStats({ ...stats, since: e.target.value })}
                                                    className={`w-full px-4 py-3 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500/50 ${
                                                        dark
                                                            ? "bg-neutral-800 border border-neutral-700 text-white"
                                                            : "bg-neutral-50 border border-neutral-200 text-neutral-900"
                                                    }`}
                                                    placeholder="2023"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={saveStats}
                                        disabled={loading}
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-teal-500 text-white rounded-xl font-medium hover:bg-teal-600 transition-colors disabled:opacity-50"
                                    >
                                        <Save className="w-4 h-4" />
                                        통계 저장
                                    </button>
                                </div>
                            )}

                            {/* Portfolio Tab */}
                            {activeTab === "portfolio" && (
                                <div className="space-y-8">
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <h2 className={`text-xl font-medium ${dark ? "text-white" : "text-neutral-900"}`}>
                                                포트폴리오 관리
                                            </h2>
                                            <button
                                                onClick={fetchData}
                                                disabled={loading}
                                                className={`p-2 rounded-lg transition-colors ${dark ? "hover:bg-neutral-800" : "hover:bg-neutral-100"}`}
                                            >
                                                <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                                            </button>
                                        </div>
                                        <p className={`text-sm mb-6 ${dark ? "text-neutral-400" : "text-neutral-600"}`}>
                                            포트폴리오 페이지에 표시되는 모든 프로젝트를 관리합니다. ({portfolioProjects.length}개)
                                        </p>

                                        {/* Project List */}
                                        <div className="space-y-3 mb-8">
                                            {portfolioProjects.map((project, index) => (
                                                <div
                                                    key={project.id}
                                                    className={`p-4 rounded-xl ${
                                                        dark ? "bg-neutral-800" : "bg-neutral-100"
                                                    }`}
                                                >
                                                    <div className="flex items-start justify-between gap-4">
                                                        {/* Reorder Buttons */}
                                                        <div className="flex flex-col gap-0.5">
                                                            <button
                                                                onClick={() => reorderProject(index, "up")}
                                                                disabled={index === 0 || loading}
                                                                className={`p-1 rounded transition-colors ${
                                                                    index === 0
                                                                        ? "opacity-30 cursor-not-allowed"
                                                                        : dark
                                                                            ? "text-neutral-400 hover:text-teal-400 hover:bg-neutral-700"
                                                                            : "text-neutral-500 hover:text-teal-500 hover:bg-neutral-200"
                                                                }`}
                                                            >
                                                                <ChevronUp className="w-4 h-4" />
                                                            </button>
                                                            <button
                                                                onClick={() => reorderProject(index, "down")}
                                                                disabled={index === portfolioProjects.length - 1 || loading}
                                                                className={`p-1 rounded transition-colors ${
                                                                    index === portfolioProjects.length - 1
                                                                        ? "opacity-30 cursor-not-allowed"
                                                                        : dark
                                                                            ? "text-neutral-400 hover:text-teal-400 hover:bg-neutral-700"
                                                                            : "text-neutral-500 hover:text-teal-500 hover:bg-neutral-200"
                                                                }`}
                                                            >
                                                                <ChevronDown className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                                                                <p className={`font-medium ${dark ? "text-white" : "text-neutral-900"}`}>
                                                                    {project.title}
                                                                </p>
                                                                {project.titleKo && (
                                                                    <span className={`text-sm ${dark ? "text-neutral-400" : "text-neutral-500"}`}>
                                                                        ({project.titleKo})
                                                                    </span>
                                                                )}
                                                                {project.isActive && (
                                                                    <span className="px-2 py-0.5 text-xs rounded-full bg-green-500/10 text-green-500">운영중</span>
                                                                )}
                                                                {project.featured && (
                                                                    <span className="px-2 py-0.5 text-xs rounded-full bg-teal-500/10 text-teal-500">대표</span>
                                                                )}
                                                            </div>
                                                            <p className={`text-sm ${dark ? "text-neutral-400" : "text-neutral-600"}`}>
                                                                {project.client} • {project.category} • {project.year}
                                                            </p>
                                                            <p className={`text-sm mt-1 truncate ${dark ? "text-neutral-500" : "text-neutral-500"}`}>
                                                                {project.description}
                                                            </p>
                                                            {project.tags && project.tags.length > 0 && (
                                                                <div className="flex flex-wrap gap-1 mt-2">
                                                                    {project.tags.map((tag, i) => (
                                                                        <span key={i} className={`text-xs px-2 py-0.5 rounded ${dark ? "bg-neutral-700 text-neutral-300" : "bg-neutral-200 text-neutral-600"}`}>
                                                                            {tag}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            )}
                                                            {project.url && (
                                                                <a href={project.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-teal-500 mt-2 hover:underline">
                                                                    <Globe className="w-3 h-3" /> {project.url}
                                                                </a>
                                                            )}
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <button
                                                                onClick={() => setEditingProject(project)}
                                                                className={`p-2 rounded-lg transition-colors ${
                                                                    dark
                                                                        ? "text-neutral-400 hover:text-teal-400 hover:bg-neutral-700"
                                                                        : "text-neutral-500 hover:text-teal-500 hover:bg-neutral-200"
                                                                }`}
                                                            >
                                                                <Edit3 className="w-4 h-4" />
                                                            </button>
                                                            <button
                                                                onClick={() => removePortfolioProject(project.id)}
                                                                className={`p-2 rounded-lg transition-colors ${
                                                                    dark
                                                                        ? "text-neutral-400 hover:text-red-400 hover:bg-neutral-700"
                                                                        : "text-neutral-500 hover:text-red-500 hover:bg-neutral-200"
                                                                }`}
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            {portfolioProjects.length === 0 && (
                                                <div className={`text-center py-12 ${dark ? "text-neutral-500" : "text-neutral-400"}`}>
                                                    <FolderOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                                    <p>등록된 프로젝트가 없습니다</p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Add/Edit Project Form */}
                                        <div className={`p-6 rounded-xl border-2 border-dashed ${
                                            dark ? "border-neutral-700" : "border-neutral-300"
                                        }`}>
                                            <div className="flex items-center justify-between mb-4">
                                                <p className={`font-medium ${dark ? "text-neutral-300" : "text-neutral-700"}`}>
                                                    {editingProject ? "프로젝트 수정" : "새 프로젝트 추가"}
                                                </p>
                                                {editingProject && (
                                                    <button
                                                        onClick={() => setEditingProject(null)}
                                                        className={`p-1.5 rounded ${dark ? "hover:bg-neutral-700" : "hover:bg-neutral-200"}`}
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>

                                            {/* Project Name - Dual Language */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                                <div>
                                                    <label className={`block text-xs font-medium mb-1.5 ${dark ? "text-neutral-400" : "text-neutral-500"}`}>
                                                        <span className="inline-flex items-center gap-1.5">
                                                            프로젝트명 *
                                                            <span className="px-1 py-0.5 text-[9px] rounded bg-blue-500/20 text-blue-400">EN</span>
                                                        </span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={editingProject ? editingProject.title : newPortfolioProject.title}
                                                        onChange={(e) => editingProject
                                                            ? setEditingProject({...editingProject, title: e.target.value})
                                                            : setNewPortfolioProject({...newPortfolioProject, title: e.target.value})}
                                                        placeholder="E-Commerce Platform"
                                                        className={`w-full px-4 py-2.5 rounded-lg ${dark ? "bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500" : "bg-white border border-neutral-200 placeholder-neutral-400"}`}
                                                    />
                                                </div>
                                                <div>
                                                    <label className={`block text-xs font-medium mb-1.5 ${dark ? "text-neutral-400" : "text-neutral-500"}`}>
                                                        <span className="inline-flex items-center gap-1.5">
                                                            프로젝트명
                                                            <span className="px-1 py-0.5 text-[9px] rounded bg-green-500/20 text-green-400">KO</span>
                                                        </span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={editingProject ? editingProject.titleKo || "" : newPortfolioProject.titleKo}
                                                        onChange={(e) => editingProject
                                                            ? setEditingProject({...editingProject, titleKo: e.target.value})
                                                            : setNewPortfolioProject({...newPortfolioProject, titleKo: e.target.value})}
                                                        placeholder="이커머스 플랫폼"
                                                        className={`w-full px-4 py-2.5 rounded-lg ${dark ? "bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500" : "bg-white border border-neutral-200 placeholder-neutral-400"}`}
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                                <input
                                                    type="text"
                                                    value={editingProject ? editingProject.client : newPortfolioProject.client}
                                                    onChange={(e) => editingProject
                                                        ? setEditingProject({...editingProject, client: e.target.value})
                                                        : setNewPortfolioProject({...newPortfolioProject, client: e.target.value})}
                                                    placeholder="클라이언트 *"
                                                    className={`px-4 py-2.5 rounded-lg ${dark ? "bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500" : "bg-white border border-neutral-200 placeholder-neutral-400"}`}
                                                />
                                                <input
                                                    type="text"
                                                    value={editingProject ? editingProject.url || "" : newPortfolioProject.url}
                                                    onChange={(e) => editingProject
                                                        ? setEditingProject({...editingProject, url: e.target.value})
                                                        : setNewPortfolioProject({...newPortfolioProject, url: e.target.value})}
                                                    placeholder="웹사이트 URL (선택)"
                                                    className={`px-4 py-2.5 rounded-lg ${dark ? "bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500" : "bg-white border border-neutral-200 placeholder-neutral-400"}`}
                                                />
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                                <select
                                                    value={editingProject ? editingProject.category : newPortfolioProject.category}
                                                    onChange={(e) => editingProject
                                                        ? setEditingProject({...editingProject, category: e.target.value})
                                                        : setNewPortfolioProject({...newPortfolioProject, category: e.target.value})}
                                                    className={`px-4 py-2.5 rounded-lg ${dark ? "bg-neutral-800 border border-neutral-700 text-white" : "bg-white border border-neutral-200"}`}
                                                >
                                                    {PORTFOLIO_CATEGORIES.map((cat) => (
                                                        <option key={cat} value={cat}>{cat}</option>
                                                    ))}
                                                </select>
                                                <input
                                                    type="text"
                                                    value={editingProject ? editingProject.year : newPortfolioProject.year}
                                                    onChange={(e) => editingProject
                                                        ? setEditingProject({...editingProject, year: e.target.value})
                                                        : setNewPortfolioProject({...newPortfolioProject, year: e.target.value})}
                                                    placeholder="연도"
                                                    className={`px-4 py-2.5 rounded-lg ${dark ? "bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500" : "bg-white border border-neutral-200 placeholder-neutral-400"}`}
                                                />
                                            </div>

                                            {/* Description - Dual Language */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                                <div>
                                                    <label className={`block text-xs font-medium mb-1.5 ${dark ? "text-neutral-400" : "text-neutral-500"}`}>
                                                        <span className="inline-flex items-center gap-1.5">
                                                            설명
                                                            <span className="px-1 py-0.5 text-[9px] rounded bg-blue-500/20 text-blue-400">EN</span>
                                                        </span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={editingProject ? editingProject.description : newPortfolioProject.description}
                                                        onChange={(e) => editingProject
                                                            ? setEditingProject({...editingProject, description: e.target.value})
                                                            : setNewPortfolioProject({...newPortfolioProject, description: e.target.value})}
                                                        placeholder="Mobile-first shopping platform"
                                                        className={`w-full px-4 py-2.5 rounded-lg ${dark ? "bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500" : "bg-white border border-neutral-200 placeholder-neutral-400"}`}
                                                    />
                                                </div>
                                                <div>
                                                    <label className={`block text-xs font-medium mb-1.5 ${dark ? "text-neutral-400" : "text-neutral-500"}`}>
                                                        <span className="inline-flex items-center gap-1.5">
                                                            설명
                                                            <span className="px-1 py-0.5 text-[9px] rounded bg-green-500/20 text-green-400">KO</span>
                                                        </span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={editingProject ? editingProject.descriptionKo || "" : newPortfolioProject.descriptionKo}
                                                        onChange={(e) => editingProject
                                                            ? setEditingProject({...editingProject, descriptionKo: e.target.value})
                                                            : setNewPortfolioProject({...newPortfolioProject, descriptionKo: e.target.value})}
                                                        placeholder="모바일 퍼스트 쇼핑 플랫폼"
                                                        className={`w-full px-4 py-2.5 rounded-lg ${dark ? "bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500" : "bg-white border border-neutral-200 placeholder-neutral-400"}`}
                                                    />
                                                </div>
                                            </div>

                                            <textarea
                                                value={editingProject ? editingProject.longDescription || "" : newPortfolioProject.longDescription}
                                                onChange={(e) => editingProject
                                                    ? setEditingProject({...editingProject, longDescription: e.target.value})
                                                    : setNewPortfolioProject({...newPortfolioProject, longDescription: e.target.value})}
                                                placeholder="상세 설명 (선택)"
                                                rows={3}
                                                className={`w-full px-4 py-2.5 rounded-lg mb-4 ${dark ? "bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500" : "bg-white border border-neutral-200 placeholder-neutral-400"}`}
                                            />

                                            {/* Tags */}
                                            <div className="mb-4">
                                                <div className="flex gap-2 mb-2">
                                                    <input
                                                        type="text"
                                                        value={tagInput}
                                                        onChange={(e) => setTagInput(e.target.value)}
                                                        onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag(!!editingProject))}
                                                        placeholder="태그 추가 (Enter)"
                                                        className={`flex-1 px-4 py-2 rounded-lg ${dark ? "bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500" : "bg-white border border-neutral-200 placeholder-neutral-400"}`}
                                                    />
                                                    <button
                                                        onClick={() => addTag(!!editingProject)}
                                                        className={`px-4 py-2 rounded-lg ${dark ? "bg-neutral-700 text-white hover:bg-neutral-600" : "bg-neutral-200 hover:bg-neutral-300"}`}
                                                    >
                                                        추가
                                                    </button>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {(editingProject ? editingProject.tags : newPortfolioProject.tags || []).map((tag, i) => (
                                                        <span key={i} className={`inline-flex items-center gap-1 px-2 py-1 rounded text-sm ${dark ? "bg-neutral-700 text-neutral-300" : "bg-neutral-200 text-neutral-600"}`}>
                                                            {tag}
                                                            <button onClick={() => removeTag(tag, !!editingProject)} className="hover:text-red-500">
                                                                <X className="w-3 h-3" />
                                                            </button>
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Checkboxes */}
                                            <div className="flex gap-6 mb-4">
                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={editingProject ? editingProject.isActive ?? true : newPortfolioProject.isActive ?? true}
                                                        onChange={(e) => editingProject
                                                            ? setEditingProject({...editingProject, isActive: e.target.checked})
                                                            : setNewPortfolioProject({...newPortfolioProject, isActive: e.target.checked})}
                                                        className="w-4 h-4 rounded border-neutral-300 text-teal-500 focus:ring-teal-500"
                                                    />
                                                    <span className={`text-sm ${dark ? "text-neutral-300" : "text-neutral-700"}`}>서비스 운영중</span>
                                                </label>
                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={editingProject ? editingProject.featured : newPortfolioProject.featured ?? false}
                                                        onChange={(e) => editingProject
                                                            ? setEditingProject({...editingProject, featured: e.target.checked})
                                                            : setNewPortfolioProject({...newPortfolioProject, featured: e.target.checked})}
                                                        className="w-4 h-4 rounded border-neutral-300 text-teal-500 focus:ring-teal-500"
                                                    />
                                                    <span className={`text-sm ${dark ? "text-neutral-300" : "text-neutral-700"}`}>대표 프로젝트</span>
                                                </label>
                                            </div>

                                            <button
                                                onClick={editingProject ? updatePortfolioProject : addPortfolioProject}
                                                disabled={loading}
                                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-500 text-white rounded-lg font-medium hover:bg-teal-600 transition-colors disabled:opacity-50"
                                            >
                                                {editingProject ? (
                                                    <>
                                                        <Check className="w-4 h-4" />
                                                        수정 완료
                                                    </>
                                                ) : (
                                                    <>
                                                        <Plus className="w-4 h-4" />
                                                        추가
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Password Tab */}
                            {activeTab === "password" && (
                                <div className="space-y-8">
                                    <div>
                                        <h2 className={`text-xl font-medium mb-2 ${dark ? "text-white" : "text-neutral-900"}`}>
                                            비밀번호 변경
                                        </h2>
                                        <p className={`text-sm mb-8 ${dark ? "text-neutral-400" : "text-neutral-600"}`}>
                                            관리자 로그인 비밀번호를 변경합니다.
                                        </p>

                                        <div className="space-y-6 max-w-md">
                                            <div>
                                                <label className={`block text-sm font-medium mb-2 ${dark ? "text-neutral-300" : "text-neutral-700"}`}>
                                                    새 비밀번호
                                                </label>
                                                <input
                                                    type="password"
                                                    value={newPassword}
                                                    onChange={(e) => setNewPassword(e.target.value)}
                                                    className={`w-full px-4 py-3 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500/50 ${
                                                        dark
                                                            ? "bg-neutral-800 border border-neutral-700 text-white"
                                                            : "bg-neutral-50 border border-neutral-200 text-neutral-900"
                                                    }`}
                                                    placeholder="6자 이상"
                                                />
                                            </div>
                                            <div>
                                                <label className={`block text-sm font-medium mb-2 ${dark ? "text-neutral-300" : "text-neutral-700"}`}>
                                                    비밀번호 확인
                                                </label>
                                                <input
                                                    type="password"
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    className={`w-full px-4 py-3 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500/50 ${
                                                        dark
                                                            ? "bg-neutral-800 border border-neutral-700 text-white"
                                                            : "bg-neutral-50 border border-neutral-200 text-neutral-900"
                                                    }`}
                                                    placeholder="비밀번호 재입력"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handlePasswordChange}
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-teal-500 text-white rounded-xl font-medium hover:bg-teal-600 transition-colors"
                                    >
                                        <Save className="w-4 h-4" />
                                        비밀번호 변경
                                    </button>
                                </div>
                            )}

                            {/* Home Page Content Tab */}
                            {activeTab === "home" && homeContentKo && homeContentEn && (
                                <div className="space-y-8">
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <h2 className={`text-xl font-medium ${dark ? "text-white" : "text-neutral-900"}`}>
                                                홈페이지 콘텐츠
                                            </h2>
                                            <button
                                                onClick={translateHomeContent}
                                                disabled={translating}
                                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                                    dark ? "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30" : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                                                } disabled:opacity-50`}
                                            >
                                                <Languages className="w-4 h-4" />
                                                {translating ? "번역중..." : "자동 번역"}
                                            </button>
                                        </div>
                                        <p className={`text-sm mb-8 ${dark ? "text-neutral-400" : "text-neutral-600"}`}>
                                            홈페이지의 각 섹션 텍스트를 수정합니다. 한글 수정 후 자동 번역 버튼을 누르면 영어가 자동으로 채워집니다.
                                        </p>

                                        {/* Hero Section */}
                                        <div className={`p-6 rounded-xl mb-6 ${dark ? "bg-neutral-800" : "bg-neutral-100"}`}>
                                            <h3 className={`text-sm font-medium mb-4 ${dark ? "text-neutral-300" : "text-neutral-700"}`}>
                                                Hero 섹션
                                            </h3>
                                            <div className="space-y-4">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className={`block text-xs font-medium mb-1.5 ${dark ? "text-neutral-400" : "text-neutral-500"}`}>
                                                            <span className="inline-flex items-center gap-1.5">
                                                                헤드라인 1
                                                                <span className="px-1 py-0.5 text-[9px] rounded bg-green-500/20 text-green-400">KO</span>
                                                            </span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={homeContentKo.heroHeadline[0] || ""}
                                                            onChange={(e) => setHomeContentKo({
                                                                ...homeContentKo,
                                                                heroHeadline: [e.target.value, homeContentKo.heroHeadline[1] || ""]
                                                            })}
                                                            className={`w-full px-4 py-2.5 rounded-lg ${dark ? "bg-neutral-700 border border-neutral-600 text-white" : "bg-white border border-neutral-200"}`}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className={`block text-xs font-medium mb-1.5 ${dark ? "text-neutral-400" : "text-neutral-500"}`}>
                                                            <span className="inline-flex items-center gap-1.5">
                                                                헤드라인 1
                                                                <span className="px-1 py-0.5 text-[9px] rounded bg-blue-500/20 text-blue-400">EN</span>
                                                            </span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={homeContentEn.heroHeadline[0] || ""}
                                                            onChange={(e) => setHomeContentEn({
                                                                ...homeContentEn,
                                                                heroHeadline: [e.target.value, homeContentEn.heroHeadline[1] || ""]
                                                            })}
                                                            className={`w-full px-4 py-2.5 rounded-lg ${dark ? "bg-neutral-700 border border-neutral-600 text-white" : "bg-white border border-neutral-200"}`}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className={`block text-xs font-medium mb-1.5 ${dark ? "text-neutral-400" : "text-neutral-500"}`}>
                                                            <span className="inline-flex items-center gap-1.5">
                                                                헤드라인 2
                                                                <span className="px-1 py-0.5 text-[9px] rounded bg-green-500/20 text-green-400">KO</span>
                                                            </span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={homeContentKo.heroHeadline[1] || ""}
                                                            onChange={(e) => setHomeContentKo({
                                                                ...homeContentKo,
                                                                heroHeadline: [homeContentKo.heroHeadline[0] || "", e.target.value]
                                                            })}
                                                            className={`w-full px-4 py-2.5 rounded-lg ${dark ? "bg-neutral-700 border border-neutral-600 text-white" : "bg-white border border-neutral-200"}`}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className={`block text-xs font-medium mb-1.5 ${dark ? "text-neutral-400" : "text-neutral-500"}`}>
                                                            <span className="inline-flex items-center gap-1.5">
                                                                헤드라인 2
                                                                <span className="px-1 py-0.5 text-[9px] rounded bg-blue-500/20 text-blue-400">EN</span>
                                                            </span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={homeContentEn.heroHeadline[1] || ""}
                                                            onChange={(e) => setHomeContentEn({
                                                                ...homeContentEn,
                                                                heroHeadline: [homeContentEn.heroHeadline[0] || "", e.target.value]
                                                            })}
                                                            className={`w-full px-4 py-2.5 rounded-lg ${dark ? "bg-neutral-700 border border-neutral-600 text-white" : "bg-white border border-neutral-200"}`}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className={`block text-xs font-medium mb-1.5 ${dark ? "text-neutral-400" : "text-neutral-500"}`}>
                                                            <span className="inline-flex items-center gap-1.5">
                                                                서브텍스트
                                                                <span className="px-1 py-0.5 text-[9px] rounded bg-green-500/20 text-green-400">KO</span>
                                                            </span>
                                                        </label>
                                                        <textarea
                                                            value={homeContentKo.heroSubtext}
                                                            onChange={(e) => setHomeContentKo({ ...homeContentKo, heroSubtext: e.target.value })}
                                                            rows={2}
                                                            className={`w-full px-4 py-2.5 rounded-lg ${dark ? "bg-neutral-700 border border-neutral-600 text-white" : "bg-white border border-neutral-200"}`}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className={`block text-xs font-medium mb-1.5 ${dark ? "text-neutral-400" : "text-neutral-500"}`}>
                                                            <span className="inline-flex items-center gap-1.5">
                                                                서브텍스트
                                                                <span className="px-1 py-0.5 text-[9px] rounded bg-blue-500/20 text-blue-400">EN</span>
                                                            </span>
                                                        </label>
                                                        <textarea
                                                            value={homeContentEn.heroSubtext}
                                                            onChange={(e) => setHomeContentEn({ ...homeContentEn, heroSubtext: e.target.value })}
                                                            rows={2}
                                                            className={`w-full px-4 py-2.5 rounded-lg ${dark ? "bg-neutral-700 border border-neutral-600 text-white" : "bg-white border border-neutral-200"}`}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className={`block text-xs font-medium mb-1.5 ${dark ? "text-neutral-400" : "text-neutral-500"}`}>
                                                            <span className="inline-flex items-center gap-1.5">
                                                                CTA 버튼
                                                                <span className="px-1 py-0.5 text-[9px] rounded bg-green-500/20 text-green-400">KO</span>
                                                            </span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={homeContentKo.heroCta}
                                                            onChange={(e) => setHomeContentKo({ ...homeContentKo, heroCta: e.target.value })}
                                                            className={`w-full px-4 py-2.5 rounded-lg ${dark ? "bg-neutral-700 border border-neutral-600 text-white" : "bg-white border border-neutral-200"}`}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className={`block text-xs font-medium mb-1.5 ${dark ? "text-neutral-400" : "text-neutral-500"}`}>
                                                            <span className="inline-flex items-center gap-1.5">
                                                                CTA 버튼
                                                                <span className="px-1 py-0.5 text-[9px] rounded bg-blue-500/20 text-blue-400">EN</span>
                                                            </span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={homeContentEn.heroCta}
                                                            onChange={(e) => setHomeContentEn({ ...homeContentEn, heroCta: e.target.value })}
                                                            className={`w-full px-4 py-2.5 rounded-lg ${dark ? "bg-neutral-700 border border-neutral-600 text-white" : "bg-white border border-neutral-200"}`}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Services Section */}
                                        <div className={`p-6 rounded-xl mb-6 ${dark ? "bg-neutral-800" : "bg-neutral-100"}`}>
                                            <h3 className={`text-sm font-medium mb-4 ${dark ? "text-neutral-300" : "text-neutral-700"}`}>
                                                서비스 섹션
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className={`block text-xs font-medium mb-1.5 ${dark ? "text-neutral-400" : "text-neutral-500"}`}>
                                                        <span className="inline-flex items-center gap-1.5">
                                                            헤드라인
                                                            <span className="px-1 py-0.5 text-[9px] rounded bg-green-500/20 text-green-400">KO</span>
                                                        </span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={homeContentKo.servicesHeadline}
                                                        onChange={(e) => setHomeContentKo({ ...homeContentKo, servicesHeadline: e.target.value })}
                                                        className={`w-full px-4 py-2.5 rounded-lg ${dark ? "bg-neutral-700 border border-neutral-600 text-white" : "bg-white border border-neutral-200"}`}
                                                    />
                                                </div>
                                                <div>
                                                    <label className={`block text-xs font-medium mb-1.5 ${dark ? "text-neutral-400" : "text-neutral-500"}`}>
                                                        <span className="inline-flex items-center gap-1.5">
                                                            헤드라인
                                                            <span className="px-1 py-0.5 text-[9px] rounded bg-blue-500/20 text-blue-400">EN</span>
                                                        </span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={homeContentEn.servicesHeadline}
                                                        onChange={(e) => setHomeContentEn({ ...homeContentEn, servicesHeadline: e.target.value })}
                                                        className={`w-full px-4 py-2.5 rounded-lg ${dark ? "bg-neutral-700 border border-neutral-600 text-white" : "bg-white border border-neutral-200"}`}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* AI Section */}
                                        <div className={`p-6 rounded-xl mb-6 ${dark ? "bg-neutral-800" : "bg-neutral-100"}`}>
                                            <h3 className={`text-sm font-medium mb-4 ${dark ? "text-neutral-300" : "text-neutral-700"}`}>
                                                AI 섹션
                                            </h3>
                                            <div className="space-y-4">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className={`block text-xs font-medium mb-1.5 ${dark ? "text-neutral-400" : "text-neutral-500"}`}>
                                                            <span className="inline-flex items-center gap-1.5">
                                                                헤드라인
                                                                <span className="px-1 py-0.5 text-[9px] rounded bg-green-500/20 text-green-400">KO</span>
                                                            </span>
                                                        </label>
                                                        <textarea
                                                            value={homeContentKo.aiHeadline}
                                                            onChange={(e) => setHomeContentKo({ ...homeContentKo, aiHeadline: e.target.value })}
                                                            rows={2}
                                                            className={`w-full px-4 py-2.5 rounded-lg ${dark ? "bg-neutral-700 border border-neutral-600 text-white" : "bg-white border border-neutral-200"}`}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className={`block text-xs font-medium mb-1.5 ${dark ? "text-neutral-400" : "text-neutral-500"}`}>
                                                            <span className="inline-flex items-center gap-1.5">
                                                                헤드라인
                                                                <span className="px-1 py-0.5 text-[9px] rounded bg-blue-500/20 text-blue-400">EN</span>
                                                            </span>
                                                        </label>
                                                        <textarea
                                                            value={homeContentEn.aiHeadline}
                                                            onChange={(e) => setHomeContentEn({ ...homeContentEn, aiHeadline: e.target.value })}
                                                            rows={2}
                                                            className={`w-full px-4 py-2.5 rounded-lg ${dark ? "bg-neutral-700 border border-neutral-600 text-white" : "bg-white border border-neutral-200"}`}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className={`block text-xs font-medium mb-1.5 ${dark ? "text-neutral-400" : "text-neutral-500"}`}>
                                                            <span className="inline-flex items-center gap-1.5">
                                                                설명
                                                                <span className="px-1 py-0.5 text-[9px] rounded bg-green-500/20 text-green-400">KO</span>
                                                            </span>
                                                        </label>
                                                        <textarea
                                                            value={homeContentKo.aiDescription}
                                                            onChange={(e) => setHomeContentKo({ ...homeContentKo, aiDescription: e.target.value })}
                                                            rows={3}
                                                            className={`w-full px-4 py-2.5 rounded-lg ${dark ? "bg-neutral-700 border border-neutral-600 text-white" : "bg-white border border-neutral-200"}`}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className={`block text-xs font-medium mb-1.5 ${dark ? "text-neutral-400" : "text-neutral-500"}`}>
                                                            <span className="inline-flex items-center gap-1.5">
                                                                설명
                                                                <span className="px-1 py-0.5 text-[9px] rounded bg-blue-500/20 text-blue-400">EN</span>
                                                            </span>
                                                        </label>
                                                        <textarea
                                                            value={homeContentEn.aiDescription}
                                                            onChange={(e) => setHomeContentEn({ ...homeContentEn, aiDescription: e.target.value })}
                                                            rows={3}
                                                            className={`w-full px-4 py-2.5 rounded-lg ${dark ? "bg-neutral-700 border border-neutral-600 text-white" : "bg-white border border-neutral-200"}`}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* CTA Section */}
                                        <div className={`p-6 rounded-xl mb-6 ${dark ? "bg-neutral-800" : "bg-neutral-100"}`}>
                                            <h3 className={`text-sm font-medium mb-4 ${dark ? "text-neutral-300" : "text-neutral-700"}`}>
                                                CTA 섹션
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className={`block text-xs font-medium mb-1.5 ${dark ? "text-neutral-400" : "text-neutral-500"}`}>
                                                        <span className="inline-flex items-center gap-1.5">
                                                            서브텍스트
                                                            <span className="px-1 py-0.5 text-[9px] rounded bg-green-500/20 text-green-400">KO</span>
                                                        </span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={homeContentKo.ctaSubtext}
                                                        onChange={(e) => setHomeContentKo({ ...homeContentKo, ctaSubtext: e.target.value })}
                                                        className={`w-full px-4 py-2.5 rounded-lg ${dark ? "bg-neutral-700 border border-neutral-600 text-white" : "bg-white border border-neutral-200"}`}
                                                    />
                                                </div>
                                                <div>
                                                    <label className={`block text-xs font-medium mb-1.5 ${dark ? "text-neutral-400" : "text-neutral-500"}`}>
                                                        <span className="inline-flex items-center gap-1.5">
                                                            서브텍스트
                                                            <span className="px-1 py-0.5 text-[9px] rounded bg-blue-500/20 text-blue-400">EN</span>
                                                        </span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={homeContentEn.ctaSubtext}
                                                        onChange={(e) => setHomeContentEn({ ...homeContentEn, ctaSubtext: e.target.value })}
                                                        className={`w-full px-4 py-2.5 rounded-lg ${dark ? "bg-neutral-700 border border-neutral-600 text-white" : "bg-white border border-neutral-200"}`}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => savePageContent("/api/home-content", homeContentKo, homeContentEn)}
                                        disabled={loading}
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-teal-500 text-white rounded-xl font-medium hover:bg-teal-600 transition-colors disabled:opacity-50"
                                    >
                                        <Save className="w-4 h-4" />
                                        홈페이지 저장
                                    </button>
                                </div>
                            )}

                            {/* About Page Content Tab */}
                            {activeTab === "about" && aboutContentKo && aboutContentEn && (
                                <div className="space-y-8">
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <h2 className={`text-xl font-medium ${dark ? "text-white" : "text-neutral-900"}`}>
                                                회사소개 콘텐츠
                                            </h2>
                                            <button
                                                onClick={translateAboutContent}
                                                disabled={translating}
                                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                                    dark ? "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30" : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                                                } disabled:opacity-50`}
                                            >
                                                <Languages className="w-4 h-4" />
                                                {translating ? "번역중..." : "자동 번역"}
                                            </button>
                                        </div>
                                        <p className={`text-sm mb-8 ${dark ? "text-neutral-400" : "text-neutral-600"}`}>
                                            회사소개 페이지의 각 섹션 텍스트를 수정합니다.
                                        </p>

                                        {/* Hero Section */}
                                        <div className={`p-6 rounded-xl mb-6 ${dark ? "bg-neutral-800" : "bg-neutral-100"}`}>
                                            <h3 className={`text-sm font-medium mb-4 ${dark ? "text-neutral-300" : "text-neutral-700"}`}>
                                                Hero 섹션
                                            </h3>
                                            <div className="space-y-4">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className={`block text-xs font-medium mb-1.5 ${dark ? "text-neutral-400" : "text-neutral-500"}`}>
                                                            <span className="inline-flex items-center gap-1.5">
                                                                인트로
                                                                <span className="px-1 py-0.5 text-[9px] rounded bg-green-500/20 text-green-400">KO</span>
                                                            </span>
                                                        </label>
                                                        <textarea
                                                            value={aboutContentKo.intro}
                                                            onChange={(e) => setAboutContentKo({ ...aboutContentKo, intro: e.target.value })}
                                                            rows={2}
                                                            className={`w-full px-4 py-2.5 rounded-lg ${dark ? "bg-neutral-700 border border-neutral-600 text-white" : "bg-white border border-neutral-200"}`}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className={`block text-xs font-medium mb-1.5 ${dark ? "text-neutral-400" : "text-neutral-500"}`}>
                                                            <span className="inline-flex items-center gap-1.5">
                                                                인트로
                                                                <span className="px-1 py-0.5 text-[9px] rounded bg-blue-500/20 text-blue-400">EN</span>
                                                            </span>
                                                        </label>
                                                        <textarea
                                                            value={aboutContentEn.intro}
                                                            onChange={(e) => setAboutContentEn({ ...aboutContentEn, intro: e.target.value })}
                                                            rows={2}
                                                            className={`w-full px-4 py-2.5 rounded-lg ${dark ? "bg-neutral-700 border border-neutral-600 text-white" : "bg-white border border-neutral-200"}`}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className={`block text-xs font-medium mb-1.5 ${dark ? "text-neutral-400" : "text-neutral-500"}`}>
                                                            <span className="inline-flex items-center gap-1.5">
                                                                설명
                                                                <span className="px-1 py-0.5 text-[9px] rounded bg-green-500/20 text-green-400">KO</span>
                                                            </span>
                                                        </label>
                                                        <textarea
                                                            value={aboutContentKo.description}
                                                            onChange={(e) => setAboutContentKo({ ...aboutContentKo, description: e.target.value })}
                                                            rows={3}
                                                            className={`w-full px-4 py-2.5 rounded-lg ${dark ? "bg-neutral-700 border border-neutral-600 text-white" : "bg-white border border-neutral-200"}`}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className={`block text-xs font-medium mb-1.5 ${dark ? "text-neutral-400" : "text-neutral-500"}`}>
                                                            <span className="inline-flex items-center gap-1.5">
                                                                설명
                                                                <span className="px-1 py-0.5 text-[9px] rounded bg-blue-500/20 text-blue-400">EN</span>
                                                            </span>
                                                        </label>
                                                        <textarea
                                                            value={aboutContentEn.description}
                                                            onChange={(e) => setAboutContentEn({ ...aboutContentEn, description: e.target.value })}
                                                            rows={3}
                                                            className={`w-full px-4 py-2.5 rounded-lg ${dark ? "bg-neutral-700 border border-neutral-600 text-white" : "bg-white border border-neutral-200"}`}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Future Section */}
                                        <div className={`p-6 rounded-xl mb-6 ${dark ? "bg-neutral-800" : "bg-neutral-100"}`}>
                                            <h3 className={`text-sm font-medium mb-4 ${dark ? "text-neutral-300" : "text-neutral-700"}`}>
                                                미래 비전 섹션
                                            </h3>
                                            <div className="space-y-4">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className={`block text-xs font-medium mb-1.5 ${dark ? "text-neutral-400" : "text-neutral-500"}`}>
                                                            <span className="inline-flex items-center gap-1.5">
                                                                비전 설명
                                                                <span className="px-1 py-0.5 text-[9px] rounded bg-green-500/20 text-green-400">KO</span>
                                                            </span>
                                                        </label>
                                                        <textarea
                                                            value={aboutContentKo.futureDescription}
                                                            onChange={(e) => setAboutContentKo({ ...aboutContentKo, futureDescription: e.target.value })}
                                                            rows={3}
                                                            className={`w-full px-4 py-2.5 rounded-lg ${dark ? "bg-neutral-700 border border-neutral-600 text-white" : "bg-white border border-neutral-200"}`}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className={`block text-xs font-medium mb-1.5 ${dark ? "text-neutral-400" : "text-neutral-500"}`}>
                                                            <span className="inline-flex items-center gap-1.5">
                                                                비전 설명
                                                                <span className="px-1 py-0.5 text-[9px] rounded bg-blue-500/20 text-blue-400">EN</span>
                                                            </span>
                                                        </label>
                                                        <textarea
                                                            value={aboutContentEn.futureDescription}
                                                            onChange={(e) => setAboutContentEn({ ...aboutContentEn, futureDescription: e.target.value })}
                                                            rows={3}
                                                            className={`w-full px-4 py-2.5 rounded-lg ${dark ? "bg-neutral-700 border border-neutral-600 text-white" : "bg-white border border-neutral-200"}`}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className={`block text-xs font-medium mb-1.5 ${dark ? "text-neutral-400" : "text-neutral-500"}`}>
                                                            <span className="inline-flex items-center gap-1.5">
                                                                서브텍스트
                                                                <span className="px-1 py-0.5 text-[9px] rounded bg-green-500/20 text-green-400">KO</span>
                                                            </span>
                                                        </label>
                                                        <textarea
                                                            value={aboutContentKo.futureSubtext}
                                                            onChange={(e) => setAboutContentKo({ ...aboutContentKo, futureSubtext: e.target.value })}
                                                            rows={2}
                                                            className={`w-full px-4 py-2.5 rounded-lg ${dark ? "bg-neutral-700 border border-neutral-600 text-white" : "bg-white border border-neutral-200"}`}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className={`block text-xs font-medium mb-1.5 ${dark ? "text-neutral-400" : "text-neutral-500"}`}>
                                                            <span className="inline-flex items-center gap-1.5">
                                                                서브텍스트
                                                                <span className="px-1 py-0.5 text-[9px] rounded bg-blue-500/20 text-blue-400">EN</span>
                                                            </span>
                                                        </label>
                                                        <textarea
                                                            value={aboutContentEn.futureSubtext}
                                                            onChange={(e) => setAboutContentEn({ ...aboutContentEn, futureSubtext: e.target.value })}
                                                            rows={2}
                                                            className={`w-full px-4 py-2.5 rounded-lg ${dark ? "bg-neutral-700 border border-neutral-600 text-white" : "bg-white border border-neutral-200"}`}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* CTA Section */}
                                        <div className={`p-6 rounded-xl mb-6 ${dark ? "bg-neutral-800" : "bg-neutral-100"}`}>
                                            <h3 className={`text-sm font-medium mb-4 ${dark ? "text-neutral-300" : "text-neutral-700"}`}>
                                                CTA 섹션
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className={`block text-xs font-medium mb-1.5 ${dark ? "text-neutral-400" : "text-neutral-500"}`}>
                                                        <span className="inline-flex items-center gap-1.5">
                                                            서브텍스트
                                                            <span className="px-1 py-0.5 text-[9px] rounded bg-green-500/20 text-green-400">KO</span>
                                                        </span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={aboutContentKo.ctaSubtext}
                                                        onChange={(e) => setAboutContentKo({ ...aboutContentKo, ctaSubtext: e.target.value })}
                                                        className={`w-full px-4 py-2.5 rounded-lg ${dark ? "bg-neutral-700 border border-neutral-600 text-white" : "bg-white border border-neutral-200"}`}
                                                    />
                                                </div>
                                                <div>
                                                    <label className={`block text-xs font-medium mb-1.5 ${dark ? "text-neutral-400" : "text-neutral-500"}`}>
                                                        <span className="inline-flex items-center gap-1.5">
                                                            서브텍스트
                                                            <span className="px-1 py-0.5 text-[9px] rounded bg-blue-500/20 text-blue-400">EN</span>
                                                        </span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={aboutContentEn.ctaSubtext}
                                                        onChange={(e) => setAboutContentEn({ ...aboutContentEn, ctaSubtext: e.target.value })}
                                                        className={`w-full px-4 py-2.5 rounded-lg ${dark ? "bg-neutral-700 border border-neutral-600 text-white" : "bg-white border border-neutral-200"}`}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => savePageContent("/api/about-content", aboutContentKo, aboutContentEn)}
                                        disabled={loading}
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-teal-500 text-white rounded-xl font-medium hover:bg-teal-600 transition-colors disabled:opacity-50"
                                    >
                                        <Save className="w-4 h-4" />
                                        회사소개 저장
                                    </button>
                                </div>
                            )}

                            {/* Services Page Content Tab */}
                            {activeTab === "services-page" && servicesContentKo && servicesContentEn && (
                                <div className="space-y-8">
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <h2 className={`text-xl font-medium ${dark ? "text-white" : "text-neutral-900"}`}>
                                                서비스 페이지 콘텐츠
                                            </h2>
                                            <button
                                                onClick={translateServicesContent}
                                                disabled={translating}
                                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                                    dark ? "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30" : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                                                } disabled:opacity-50`}
                                            >
                                                <Languages className="w-4 h-4" />
                                                {translating ? "번역중..." : "자동 번역"}
                                            </button>
                                        </div>
                                        <p className={`text-sm mb-8 ${dark ? "text-neutral-400" : "text-neutral-600"}`}>
                                            서비스 페이지의 각 섹션 텍스트를 수정합니다.
                                        </p>

                                        {/* Hero Section */}
                                        <div className={`p-6 rounded-xl mb-6 ${dark ? "bg-neutral-800" : "bg-neutral-100"}`}>
                                            <h3 className={`text-sm font-medium mb-4 ${dark ? "text-neutral-300" : "text-neutral-700"}`}>
                                                Hero 섹션
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className={`block text-xs font-medium mb-1.5 ${dark ? "text-neutral-400" : "text-neutral-500"}`}>
                                                        <span className="inline-flex items-center gap-1.5">
                                                            설명
                                                            <span className="px-1 py-0.5 text-[9px] rounded bg-green-500/20 text-green-400">KO</span>
                                                        </span>
                                                    </label>
                                                    <textarea
                                                        value={servicesContentKo.heroDescription}
                                                        onChange={(e) => setServicesContentKo({ ...servicesContentKo, heroDescription: e.target.value })}
                                                        rows={3}
                                                        className={`w-full px-4 py-2.5 rounded-lg ${dark ? "bg-neutral-700 border border-neutral-600 text-white" : "bg-white border border-neutral-200"}`}
                                                    />
                                                </div>
                                                <div>
                                                    <label className={`block text-xs font-medium mb-1.5 ${dark ? "text-neutral-400" : "text-neutral-500"}`}>
                                                        <span className="inline-flex items-center gap-1.5">
                                                            설명
                                                            <span className="px-1 py-0.5 text-[9px] rounded bg-blue-500/20 text-blue-400">EN</span>
                                                        </span>
                                                    </label>
                                                    <textarea
                                                        value={servicesContentEn.heroDescription}
                                                        onChange={(e) => setServicesContentEn({ ...servicesContentEn, heroDescription: e.target.value })}
                                                        rows={3}
                                                        className={`w-full px-4 py-2.5 rounded-lg ${dark ? "bg-neutral-700 border border-neutral-600 text-white" : "bg-white border border-neutral-200"}`}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Pricing Section */}
                                        <div className={`p-6 rounded-xl mb-6 ${dark ? "bg-neutral-800" : "bg-neutral-100"}`}>
                                            <h3 className={`text-sm font-medium mb-4 ${dark ? "text-neutral-300" : "text-neutral-700"}`}>
                                                가격 안내 섹션
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className={`block text-xs font-medium mb-1.5 ${dark ? "text-neutral-400" : "text-neutral-500"}`}>
                                                        <span className="inline-flex items-center gap-1.5">
                                                            설명
                                                            <span className="px-1 py-0.5 text-[9px] rounded bg-green-500/20 text-green-400">KO</span>
                                                        </span>
                                                    </label>
                                                    <textarea
                                                        value={servicesContentKo.pricingDescription}
                                                        onChange={(e) => setServicesContentKo({ ...servicesContentKo, pricingDescription: e.target.value })}
                                                        rows={3}
                                                        className={`w-full px-4 py-2.5 rounded-lg ${dark ? "bg-neutral-700 border border-neutral-600 text-white" : "bg-white border border-neutral-200"}`}
                                                    />
                                                </div>
                                                <div>
                                                    <label className={`block text-xs font-medium mb-1.5 ${dark ? "text-neutral-400" : "text-neutral-500"}`}>
                                                        <span className="inline-flex items-center gap-1.5">
                                                            설명
                                                            <span className="px-1 py-0.5 text-[9px] rounded bg-blue-500/20 text-blue-400">EN</span>
                                                        </span>
                                                    </label>
                                                    <textarea
                                                        value={servicesContentEn.pricingDescription}
                                                        onChange={(e) => setServicesContentEn({ ...servicesContentEn, pricingDescription: e.target.value })}
                                                        rows={3}
                                                        className={`w-full px-4 py-2.5 rounded-lg ${dark ? "bg-neutral-700 border border-neutral-600 text-white" : "bg-white border border-neutral-200"}`}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* CTA Section */}
                                        <div className={`p-6 rounded-xl mb-6 ${dark ? "bg-neutral-800" : "bg-neutral-100"}`}>
                                            <h3 className={`text-sm font-medium mb-4 ${dark ? "text-neutral-300" : "text-neutral-700"}`}>
                                                CTA 섹션
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className={`block text-xs font-medium mb-1.5 ${dark ? "text-neutral-400" : "text-neutral-500"}`}>
                                                        <span className="inline-flex items-center gap-1.5">
                                                            서브텍스트
                                                            <span className="px-1 py-0.5 text-[9px] rounded bg-green-500/20 text-green-400">KO</span>
                                                        </span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={servicesContentKo.ctaSubtext}
                                                        onChange={(e) => setServicesContentKo({ ...servicesContentKo, ctaSubtext: e.target.value })}
                                                        className={`w-full px-4 py-2.5 rounded-lg ${dark ? "bg-neutral-700 border border-neutral-600 text-white" : "bg-white border border-neutral-200"}`}
                                                    />
                                                </div>
                                                <div>
                                                    <label className={`block text-xs font-medium mb-1.5 ${dark ? "text-neutral-400" : "text-neutral-500"}`}>
                                                        <span className="inline-flex items-center gap-1.5">
                                                            서브텍스트
                                                            <span className="px-1 py-0.5 text-[9px] rounded bg-blue-500/20 text-blue-400">EN</span>
                                                        </span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={servicesContentEn.ctaSubtext}
                                                        onChange={(e) => setServicesContentEn({ ...servicesContentEn, ctaSubtext: e.target.value })}
                                                        className={`w-full px-4 py-2.5 rounded-lg ${dark ? "bg-neutral-700 border border-neutral-600 text-white" : "bg-white border border-neutral-200"}`}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Service Items Preview */}
                                        {serviceItems.length > 0 && (
                                            <div className={`p-6 rounded-xl mb-6 ${dark ? "bg-neutral-800" : "bg-neutral-100"}`}>
                                                <h3 className={`text-sm font-medium mb-4 ${dark ? "text-neutral-300" : "text-neutral-700"}`}>
                                                    서비스 항목 ({serviceItems.filter(s => s.lang === "ko").length}개)
                                                </h3>
                                                <p className={`text-xs mb-4 ${dark ? "text-neutral-500" : "text-neutral-500"}`}>
                                                    서비스 항목은 /api/services 엔드포인트를 통해 관리됩니다.
                                                </p>
                                                <div className="space-y-2">
                                                    {serviceItems.filter(s => s.lang === "ko").map((item, i) => (
                                                        <div key={i} className={`p-3 rounded-lg ${dark ? "bg-neutral-700" : "bg-white"}`}>
                                                            <span className={`text-sm ${dark ? "text-neutral-300" : "text-neutral-700"}`}>
                                                                {item.number}. {item.title}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Process Steps Preview */}
                                        {processSteps.length > 0 && (
                                            <div className={`p-6 rounded-xl ${dark ? "bg-neutral-800" : "bg-neutral-100"}`}>
                                                <h3 className={`text-sm font-medium mb-4 ${dark ? "text-neutral-300" : "text-neutral-700"}`}>
                                                    프로세스 단계 ({processSteps.filter(p => p.lang === "ko").length}개)
                                                </h3>
                                                <p className={`text-xs mb-4 ${dark ? "text-neutral-500" : "text-neutral-500"}`}>
                                                    프로세스 단계는 /api/process 엔드포인트를 통해 관리됩니다.
                                                </p>
                                                <div className="space-y-2">
                                                    {processSteps.filter(p => p.lang === "ko").map((step, i) => (
                                                        <div key={i} className={`p-3 rounded-lg ${dark ? "bg-neutral-700" : "bg-white"}`}>
                                                            <span className={`text-sm ${dark ? "text-neutral-300" : "text-neutral-700"}`}>
                                                                {step.num}. {step.title}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <button
                                        onClick={() => savePageContent("/api/services-content", servicesContentKo, servicesContentEn)}
                                        disabled={loading}
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-teal-500 text-white rounded-xl font-medium hover:bg-teal-600 transition-colors disabled:opacity-50"
                                    >
                                        <Save className="w-4 h-4" />
                                        서비스 페이지 저장
                                    </button>
                                </div>
                            )}

                            {/* Contact Page Content Tab */}
                            {activeTab === "contact-page" && contactContentKo && contactContentEn && (
                                <div className="space-y-8">
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <h2 className={`text-xl font-medium ${dark ? "text-white" : "text-neutral-900"}`}>
                                                문의 페이지 콘텐츠
                                            </h2>
                                            <button
                                                onClick={translateContactContent}
                                                disabled={translating}
                                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                                    dark ? "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30" : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                                                } disabled:opacity-50`}
                                            >
                                                <Languages className="w-4 h-4" />
                                                {translating ? "번역중..." : "자동 번역"}
                                            </button>
                                        </div>
                                        <p className={`text-sm mb-8 ${dark ? "text-neutral-400" : "text-neutral-600"}`}>
                                            문의 페이지의 각 섹션 텍스트를 수정합니다.
                                        </p>

                                        {/* Hero Section */}
                                        <div className={`p-6 rounded-xl mb-6 ${dark ? "bg-neutral-800" : "bg-neutral-100"}`}>
                                            <h3 className={`text-sm font-medium mb-4 ${dark ? "text-neutral-300" : "text-neutral-700"}`}>
                                                Hero 섹션
                                            </h3>
                                            <div className="space-y-4">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className={`block text-xs font-medium mb-1.5 ${dark ? "text-neutral-400" : "text-neutral-500"}`}>
                                                            <span className="inline-flex items-center gap-1.5">
                                                                인트로
                                                                <span className="px-1 py-0.5 text-[9px] rounded bg-green-500/20 text-green-400">KO</span>
                                                            </span>
                                                        </label>
                                                        <textarea
                                                            value={contactContentKo.heroIntro}
                                                            onChange={(e) => setContactContentKo({ ...contactContentKo, heroIntro: e.target.value })}
                                                            rows={2}
                                                            className={`w-full px-4 py-2.5 rounded-lg ${dark ? "bg-neutral-700 border border-neutral-600 text-white" : "bg-white border border-neutral-200"}`}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className={`block text-xs font-medium mb-1.5 ${dark ? "text-neutral-400" : "text-neutral-500"}`}>
                                                            <span className="inline-flex items-center gap-1.5">
                                                                인트로
                                                                <span className="px-1 py-0.5 text-[9px] rounded bg-blue-500/20 text-blue-400">EN</span>
                                                            </span>
                                                        </label>
                                                        <textarea
                                                            value={contactContentEn.heroIntro}
                                                            onChange={(e) => setContactContentEn({ ...contactContentEn, heroIntro: e.target.value })}
                                                            rows={2}
                                                            className={`w-full px-4 py-2.5 rounded-lg ${dark ? "bg-neutral-700 border border-neutral-600 text-white" : "bg-white border border-neutral-200"}`}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className={`block text-xs font-medium mb-1.5 ${dark ? "text-neutral-400" : "text-neutral-500"}`}>
                                                            <span className="inline-flex items-center gap-1.5">
                                                                설명
                                                                <span className="px-1 py-0.5 text-[9px] rounded bg-green-500/20 text-green-400">KO</span>
                                                            </span>
                                                        </label>
                                                        <textarea
                                                            value={contactContentKo.heroDescription}
                                                            onChange={(e) => setContactContentKo({ ...contactContentKo, heroDescription: e.target.value })}
                                                            rows={2}
                                                            className={`w-full px-4 py-2.5 rounded-lg ${dark ? "bg-neutral-700 border border-neutral-600 text-white" : "bg-white border border-neutral-200"}`}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className={`block text-xs font-medium mb-1.5 ${dark ? "text-neutral-400" : "text-neutral-500"}`}>
                                                            <span className="inline-flex items-center gap-1.5">
                                                                설명
                                                                <span className="px-1 py-0.5 text-[9px] rounded bg-blue-500/20 text-blue-400">EN</span>
                                                            </span>
                                                        </label>
                                                        <textarea
                                                            value={contactContentEn.heroDescription}
                                                            onChange={(e) => setContactContentEn({ ...contactContentEn, heroDescription: e.target.value })}
                                                            rows={2}
                                                            className={`w-full px-4 py-2.5 rounded-lg ${dark ? "bg-neutral-700 border border-neutral-600 text-white" : "bg-white border border-neutral-200"}`}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Form Section */}
                                        <div className={`p-6 rounded-xl mb-6 ${dark ? "bg-neutral-800" : "bg-neutral-100"}`}>
                                            <h3 className={`text-sm font-medium mb-4 ${dark ? "text-neutral-300" : "text-neutral-700"}`}>
                                                폼 섹션
                                            </h3>
                                            <div className="space-y-4">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className={`block text-xs font-medium mb-1.5 ${dark ? "text-neutral-400" : "text-neutral-500"}`}>
                                                            <span className="inline-flex items-center gap-1.5">
                                                                폼 설명
                                                                <span className="px-1 py-0.5 text-[9px] rounded bg-green-500/20 text-green-400">KO</span>
                                                            </span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={contactContentKo.formDescription}
                                                            onChange={(e) => setContactContentKo({ ...contactContentKo, formDescription: e.target.value })}
                                                            className={`w-full px-4 py-2.5 rounded-lg ${dark ? "bg-neutral-700 border border-neutral-600 text-white" : "bg-white border border-neutral-200"}`}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className={`block text-xs font-medium mb-1.5 ${dark ? "text-neutral-400" : "text-neutral-500"}`}>
                                                            <span className="inline-flex items-center gap-1.5">
                                                                폼 설명
                                                                <span className="px-1 py-0.5 text-[9px] rounded bg-blue-500/20 text-blue-400">EN</span>
                                                            </span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={contactContentEn.formDescription}
                                                            onChange={(e) => setContactContentEn({ ...contactContentEn, formDescription: e.target.value })}
                                                            className={`w-full px-4 py-2.5 rounded-lg ${dark ? "bg-neutral-700 border border-neutral-600 text-white" : "bg-white border border-neutral-200"}`}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className={`block text-xs font-medium mb-1.5 ${dark ? "text-neutral-400" : "text-neutral-500"}`}>
                                                            <span className="inline-flex items-center gap-1.5">
                                                                버튼 텍스트
                                                                <span className="px-1 py-0.5 text-[9px] rounded bg-green-500/20 text-green-400">KO</span>
                                                            </span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={contactContentKo.formButton}
                                                            onChange={(e) => setContactContentKo({ ...contactContentKo, formButton: e.target.value })}
                                                            className={`w-full px-4 py-2.5 rounded-lg ${dark ? "bg-neutral-700 border border-neutral-600 text-white" : "bg-white border border-neutral-200"}`}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className={`block text-xs font-medium mb-1.5 ${dark ? "text-neutral-400" : "text-neutral-500"}`}>
                                                            <span className="inline-flex items-center gap-1.5">
                                                                버튼 텍스트
                                                                <span className="px-1 py-0.5 text-[9px] rounded bg-blue-500/20 text-blue-400">EN</span>
                                                            </span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={contactContentEn.formButton}
                                                            onChange={(e) => setContactContentEn({ ...contactContentEn, formButton: e.target.value })}
                                                            className={`w-full px-4 py-2.5 rounded-lg ${dark ? "bg-neutral-700 border border-neutral-600 text-white" : "bg-white border border-neutral-200"}`}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* CTA Section */}
                                        <div className={`p-6 rounded-xl mb-6 ${dark ? "bg-neutral-800" : "bg-neutral-100"}`}>
                                            <h3 className={`text-sm font-medium mb-4 ${dark ? "text-neutral-300" : "text-neutral-700"}`}>
                                                CTA 섹션
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className={`block text-xs font-medium mb-1.5 ${dark ? "text-neutral-400" : "text-neutral-500"}`}>
                                                        <span className="inline-flex items-center gap-1.5">
                                                            서브텍스트
                                                            <span className="px-1 py-0.5 text-[9px] rounded bg-green-500/20 text-green-400">KO</span>
                                                        </span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={contactContentKo.ctaSubtext}
                                                        onChange={(e) => setContactContentKo({ ...contactContentKo, ctaSubtext: e.target.value })}
                                                        className={`w-full px-4 py-2.5 rounded-lg ${dark ? "bg-neutral-700 border border-neutral-600 text-white" : "bg-white border border-neutral-200"}`}
                                                    />
                                                </div>
                                                <div>
                                                    <label className={`block text-xs font-medium mb-1.5 ${dark ? "text-neutral-400" : "text-neutral-500"}`}>
                                                        <span className="inline-flex items-center gap-1.5">
                                                            서브텍스트
                                                            <span className="px-1 py-0.5 text-[9px] rounded bg-blue-500/20 text-blue-400">EN</span>
                                                        </span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={contactContentEn.ctaSubtext}
                                                        onChange={(e) => setContactContentEn({ ...contactContentEn, ctaSubtext: e.target.value })}
                                                        className={`w-full px-4 py-2.5 rounded-lg ${dark ? "bg-neutral-700 border border-neutral-600 text-white" : "bg-white border border-neutral-200"}`}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* FAQ Items Preview */}
                                        {faqItems.length > 0 && (
                                            <div className={`p-6 rounded-xl ${dark ? "bg-neutral-800" : "bg-neutral-100"}`}>
                                                <h3 className={`text-sm font-medium mb-4 ${dark ? "text-neutral-300" : "text-neutral-700"}`}>
                                                    FAQ 항목 ({faqItems.length}개)
                                                </h3>
                                                <p className={`text-xs mb-4 ${dark ? "text-neutral-500" : "text-neutral-500"}`}>
                                                    FAQ 항목은 /api/faq 엔드포인트를 통해 관리됩니다.
                                                </p>
                                                <div className="space-y-2">
                                                    {faqItems.filter(f => f.lang === "ko").map((item, i) => (
                                                        <div key={i} className={`p-3 rounded-lg ${dark ? "bg-neutral-700" : "bg-white"}`}>
                                                            <span className={`text-sm ${dark ? "text-neutral-300" : "text-neutral-700"}`}>
                                                                Q. {item.question}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <button
                                        onClick={() => savePageContent("/api/contact-content", contactContentKo, contactContentEn)}
                                        disabled={loading}
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-teal-500 text-white rounded-xl font-medium hover:bg-teal-600 transition-colors disabled:opacity-50"
                                    >
                                        <Save className="w-4 h-4" />
                                        문의 페이지 저장
                                    </button>
                                </div>
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}

// Disable Layout for admin page
Admin.getLayout = (page: React.ReactElement) => page;
