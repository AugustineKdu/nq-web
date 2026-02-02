import { useEffect } from "react";
import { useRouter } from "next/router";

export function usePageView() {
    const router = useRouter();

    useEffect(() => {
        // Track initial page view
        const trackPageView = (path: string) => {
            // Don't track admin pages
            if (path.startsWith("/admin")) return;

            fetch("/api/analytics", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ path })
            }).catch(() => {
                // Silently fail - analytics shouldn't break the site
            });
        };

        // Track current page
        trackPageView(router.asPath);

        // Track route changes
        const handleRouteChange = (url: string) => {
            trackPageView(url);
        };

        router.events.on("routeChangeComplete", handleRouteChange);

        return () => {
            router.events.off("routeChangeComplete", handleRouteChange);
        };
    }, [router]);
}
