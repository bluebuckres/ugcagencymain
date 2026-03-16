'use client';

import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';

// Initialize PostHog with proxy
if (typeof window !== 'undefined') {
    posthog.init('phc_pPwLGTzkb58fgL5MjeHgoSWahKp8JWxPThYXbK4ChTt', {
        api_host: 'https://s.makeugc.in',
        defaults: '2026-01-30',
        capture_pageview: false // We capture manually below to handle Next.js App Router
    });
}

function PostHogPageView() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (pathname && posthog) {
            let url = window.origin + pathname;
            if (searchParams && searchParams.toString()) {
                url = url + "?" + searchParams.toString();
            }
            posthog.capture('$pageview', {
                $current_url: url,
            });
        }
    }, [pathname, searchParams]);

    return null;
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
    return (
        <PHProvider client={posthog}>
            <Suspense fallback={null}>
                <PostHogPageView />
            </Suspense>
            {children}
        </PHProvider>
    );
}
