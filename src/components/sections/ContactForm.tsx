"use client";
import { useEffect, useRef, useState } from 'react';

function CalendarSkeleton() {
    return (
        <div className="animate-pulse space-y-6" aria-label="Loading calendar…">
            {/* Header bar */}
            <div className="flex items-center justify-between">
                <div className="h-6 w-48 bg-gray-200 rounded-lg" />
                <div className="h-6 w-24 bg-gray-200 rounded-lg" />
            </div>
            {/* Day-of-week row */}
            <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 7 }).map((_, i) => (
                    <div key={`dh-${i}`} className="h-4 bg-gray-100 rounded" />
                ))}
            </div>
            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 35 }).map((_, i) => (
                    <div key={`d-${i}`} className="h-10 bg-gray-100 rounded-lg" />
                ))}
            </div>
            {/* Time-slot list */}
            <div className="space-y-3 pt-4 border-t border-gray-100">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={`ts-${i}`} className="h-12 bg-gray-100 rounded-xl" />
                ))}
            </div>
        </div>
    );
}

export function NeetoCalEmbed() {
    const containerRef = useRef<HTMLDivElement>(null);
    const initialized = useRef(false);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;

        const win = window as any;
        win.neetoCal = win.neetoCal || {
            embed: function (...args: any[]) {
                (win.neetoCal.q = win.neetoCal.q || []).push(args);
            },
        };

        const initEmbed = () => {
            win.neetoCal.embed({
                type: "inline",
                id: "6799c111-4acd-4187-b7bc-8a3f7c526af5",
                organization: "makeugc",
                elementSelector: "#inline-embed-container",
                styles: "height: 100%; width: 100%;",
                queryParams: { dynamicHeight: true },
                isSidebarAndCoverImgHidden: "false",
                shouldForwardQueryParams: "false",
            });
            // Give the iframe a moment to paint, then hide skeleton
            setTimeout(() => setReady(true), 400);
        };

        // Check if the preloaded script is already cached / loaded
        const existingScript = document.querySelector(
            'script[src="https://cdn.neetocal.com/javascript/embed.js"]'
        ) as HTMLScriptElement | null;

        if (existingScript) {
            // Script tag already in DOM (from layout preload)
            if ((existingScript as any)._loaded) {
                initEmbed();
            } else {
                existingScript.addEventListener('load', initEmbed);
            }
            return;
        }

        // Fallback: inject the script ourselves
        const script = document.createElement('script');
        script.src = 'https://cdn.neetocal.com/javascript/embed.js';
        script.async = true;
        document.body.appendChild(script);
        script.onload = () => {
            (script as any)._loaded = true;
            initEmbed();
        };

        return () => {
            if (script.parentNode) {
                script.parentNode.removeChild(script);
            }
        };
    }, []);

    return (
        <div ref={containerRef} style={{ width: '100%', minHeight: '600px', position: 'relative' }}>
            {/* Skeleton shown until embed paints */}
            {!ready && (
                <div className="absolute inset-0 z-10 bg-white p-4 md:p-8">
                    <CalendarSkeleton />
                </div>
            )}
            <div
                id="inline-embed-container"
                style={{ width: '100%', minHeight: '600px' }}
            />
        </div>
    );
}
