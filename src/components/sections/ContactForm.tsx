"use client";
import { useEffect, useRef, useState } from 'react';

function CalendarSkeleton() {
    return (
        <div className="relative overflow-hidden w-full h-full min-h-[500px] flex flex-col pt-2" aria-label="Preparing calendar…">
            {/* Custom Shimmer Animation Style */}
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes shimmer {
                    100% { transform: translateX(100%); }
                }
                .shimmer-container {
                    position: relative;
                    overflow: hidden;
                }
                .shimmer-container::after {
                    content: "";
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    transform: translateX(-100%);
                    background-image: linear-gradient(
                        90deg,
                        rgba(255, 255, 255, 0) 0,
                        rgba(255, 255, 255, 0.5) 20%,
                        rgba(255, 255, 255, 0.8) 60%,
                        rgba(255, 255, 255, 0)
                    );
                    animation: shimmer 2s infinite;
                }
            `}} />

            <div className="space-y-8 animate-in fade-in duration-500">
                {/* Descriptive Loading Header */}
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-orange-50 flex items-center justify-center">
                            <div className="w-5 h-5 border-2 border-[--color-tan] border-t-transparent rounded-full animate-spin"></div>
                        </div>
                        <h3 className="font-display text-2xl text-[--color-ink]">Schedule your call</h3>
                    </div>
                    <p className="text-[--color-muted] font-sans">Preparing your booking experience...</p>
                </div>

                {/* Skeleton Grid for Calendar */}
                <div className="space-y-6 pt-4">
                    {/* Simulated Progress Bar */}
                    <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-[--color-tan] transition-all duration-[3000ms] ease-out"
                            style={{ 
                                width: '90%',
                                animation: 'progressSim 3s ease-out forwards'
                            }}
                        />
                    </div>
                    <style dangerouslySetInnerHTML={{ __html: `
                        @keyframes progressSim {
                            0% { width: 0%; }
                            20% { width: 30%; }
                            50% { width: 60%; }
                            100% { width: 90%; }
                        }
                    `}} />

                    {/* Month Header bar */}
                    <div className="flex items-center justify-between">
                        <div className="h-8 w-40 bg-gray-100 rounded-lg shimmer-container" />
                        <div className="flex gap-2">
                            <div className="h-8 w-8 bg-gray-100 rounded-full shimmer-container" />
                            <div className="h-8 w-8 bg-gray-100 rounded-full shimmer-container" />
                        </div>
                    </div>

                    {/* Day-of-week row */}
                    <div className="grid grid-cols-7 gap-3">
                        {Array.from({ length: 7 }).map((_, i) => (
                            <div key={`dh-${i}`} className="h-4 bg-gray-50 rounded shimmer-container" />
                        ))}
                    </div>

                    {/* Calendar grid cells */}
                    <div className="grid grid-cols-7 gap-3">
                        {Array.from({ length: 28 }).map((_, i) => (
                            <div key={`d-${i}`} className="aspect-square bg-gray-50/50 rounded-xl shimmer-container border border-gray-100/50" />
                        ))}
                    </div>

                    {/* Bottom loading bar */}
                    <div className="pt-6 border-t border-gray-100">
                        <div className="h-14 w-full bg-gray-50 rounded-2xl shimmer-container flex items-center px-4">
                            <div className="h-2 w-1/3 bg-gray-200 rounded-full" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function NeetoCalEmbed() {
    const containerRef = useRef<HTMLDivElement>(null);
    const initialized = useRef(false);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        // 1. Listen for NeetoCal's internal window messages
        // NeetoCal sends postMessages to handle dynamic height. 
        // Receiving this means the widget is actively rendering.
        const handleIframeMessage = (event: MessageEvent) => {
            if (event.origin.includes('neetocal.com')) {
                setReady(true);
            }
        };
        window.addEventListener("message", handleIframeMessage);

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

            // 2. MutationObserver to watch for the Iframe injection
            const container = document.querySelector("#inline-embed-container");
            if (container) {
                const observer = new MutationObserver((mutations, obs) => {
                    const iframe = container.querySelector('iframe');
                    if (iframe) {
                        obs.disconnect(); // Stop watching once the iframe is found

                        // Set ready when the iframe explicitly finishes loading its document
                        iframe.onload = () => {
                            // Minimal 150ms buffer to ensure NeetoCal's internal React hydration finishes
                            setTimeout(() => setReady(true), 150);
                        };
                    }
                });
                observer.observe(container, { childList: true, subtree: true });
            }
        };

        const existingScript = document.querySelector(
            'script[src="https://cdn.neetocal.com/javascript/embed.js"]'
        ) as HTMLScriptElement | null;

        if (existingScript) {
            if ((existingScript as any)._loaded) {
                initEmbed();
            } else {
                existingScript.addEventListener('load', initEmbed);
            }
        } else {
            const script = document.createElement('script');
            script.src = 'https://cdn.neetocal.com/javascript/embed.js';
            script.async = true;
            document.body.appendChild(script);
            script.onload = () => {
                (script as any)._loaded = true;
                initEmbed();
            };
        }

        return () => {
            window.removeEventListener("message", handleIframeMessage);
        };
    }, []);

    return (
        <div ref={containerRef} className="w-full relative min-h-[650px] overflow-hidden">
            <div
                className={`absolute inset-0 z-10 bg-white transition-all duration-700 ease-in-out px-4 md:px-0 ${ready ? 'opacity-0 pointer-events-none translate-y-4' : 'opacity-100'
                    }`}
            >
                <CalendarSkeleton />
            </div>

            <div
                id="inline-embed-container"
                className={`w-full min-h-[650px] transition-all duration-700 ease-out ${ready ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
            />
        </div>
    );
}