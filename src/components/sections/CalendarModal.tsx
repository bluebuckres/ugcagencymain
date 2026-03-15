"use client";

import React, { useEffect, useRef, useState } from "react";
import { X } from "@phosphor-icons/react";

function CalendarSkeleton() {
    return (
        <div className="relative overflow-hidden w-full h-full min-h-[500px] flex flex-col pt-2" aria-label="Preparing calendar…">
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
                    top: 0; right: 0; bottom: 0; left: 0;
                    transform: translateX(-100%);
                    background-image: linear-gradient(90deg, rgba(255,255,255,0) 0, rgba(255,255,255,0.5) 20%, rgba(255,255,255,0.8) 60%, rgba(255,255,255,0));
                    animation: shimmer 2s infinite;
                }
            `}} />

            <div className="space-y-8 animate-in fade-in duration-500">
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-orange-50 flex items-center justify-center">
                            <div className="w-5 h-5 border-2 border-[--color-tan] border-t-transparent rounded-full animate-spin"></div>
                        </div>
                        <h3 className="font-display text-2xl text-[--color-ink]">Schedule your call</h3>
                    </div>
                    <p className="text-[--color-muted] font-sans">Preparing your booking experience...</p>
                </div>

                <div className="space-y-6 pt-4">
                    <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[--color-tan]" style={{ animation: "progressSim 3s ease-out forwards" }} />
                    </div>
                    <style dangerouslySetInnerHTML={{ __html: `
                        @keyframes progressSim {
                            0% { width: 0%; } 20% { width: 30%; } 50% { width: 60%; } 100% { width: 90%; }
                        }
                    `}} />

                    <div className="flex items-center justify-between">
                        <div className="h-8 w-40 bg-gray-100 rounded-lg shimmer-container" />
                        <div className="flex gap-2">
                            <div className="h-8 w-8 bg-gray-100 rounded-full shimmer-container" />
                            <div className="h-8 w-8 bg-gray-100 rounded-full shimmer-container" />
                        </div>
                    </div>

                    <div className="grid grid-cols-7 gap-3">
                        {Array.from({ length: 7 }).map((_, i) => (
                            <div key={`dh-${i}`} className="h-4 bg-gray-50 rounded shimmer-container" />
                        ))}
                    </div>

                    <div className="grid grid-cols-7 gap-3">
                        {Array.from({ length: 28 }).map((_, i) => (
                            <div key={`d-${i}`} className="aspect-square bg-gray-50/50 rounded-xl shimmer-container border border-gray-100/50" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function NeetoCalEmbedInline() {
    const initialized = useRef(false);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const handleIframeMessage = (event: MessageEvent) => {
            if (event.origin.includes("neetocal.com")) {
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
                elementSelector: "#modal-cal-container",
                styles: "height: 100%; width: 100%;",
                queryParams: { dynamicHeight: true },
                isSidebarAndCoverImgHidden: "false",
                shouldForwardQueryParams: "false",
            });

            const container = document.querySelector("#modal-cal-container");
            if (container) {
                const observer = new MutationObserver((mutations, obs) => {
                    const iframe = container.querySelector("iframe");
                    if (iframe) {
                        obs.disconnect();
                        iframe.onload = () => {
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
                existingScript.addEventListener("load", initEmbed);
            }
        } else {
            const script = document.createElement("script");
            script.src = "https://cdn.neetocal.com/javascript/embed.js";
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
        <div className="w-full relative min-h-[400px] md:min-h-[550px]">
            <div
                className={`absolute inset-0 z-10 bg-white transition-all duration-700 ease-in-out ${ready ? "opacity-0 pointer-events-none" : "opacity-100"}`}
            >
                <CalendarSkeleton />
            </div>
            <div
                id="modal-cal-container"
                className={`w-full min-h-[400px] md:min-h-[550px] transition-all duration-700 ease-out ${ready ? "opacity-100" : "opacity-0"}`}
            />
        </div>
    );
}

interface CalendarModalProps {
    open: boolean;
    onClose: () => void;
}

export function CalendarModal({ open, onClose }: CalendarModalProps) {
    useEffect(() => {
        if (!open) return;
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleEscape);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "";
        };
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[999]" role="dialog" aria-modal="true">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal — bottom sheet on mobile, centered on desktop */}
            <div className="absolute inset-x-0 bottom-0 md:inset-0 md:flex md:items-center md:justify-center md:p-6 pointer-events-none">
                <div
                    className="pointer-events-auto relative z-10 bg-white w-full md:max-w-3xl md:rounded-3xl rounded-t-3xl border border-[--color-border] shadow-2xl flex flex-col"
                    style={{
                        maxHeight: "calc(100dvh - 40px)",
                    }}
                >
                    {/* Mobile drag indicator */}
                    <div className="md:hidden flex justify-center pt-3 pb-1">
                        <div className="w-10 h-1 rounded-full bg-[--color-border]" />
                    </div>

                    {/* Header */}
                    <div className="shrink-0 px-5 md:px-8 pt-4 md:pt-6 pb-4 flex items-center justify-between border-b border-[--color-border]">
                        <div>
                            <h2 className="font-display text-xl md:text-2xl text-[--color-ink]">Book a Strategy Call</h2>
                            <p className="font-sans text-xs md:text-sm text-[--color-muted] mt-0.5">Pick a time — we&apos;ll handle the rest.</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[--color-cream] hover:bg-[--color-border] active:scale-95 flex items-center justify-center transition-all text-[--color-ink] shrink-0 ml-4"
                            aria-label="Close calendar"
                        >
                            <X size={18} weight="bold" />
                        </button>
                    </div>

                    {/* Scrollable Calendar Body */}
                    <div
                        className="flex-1 overflow-y-auto overscroll-contain px-3 md:px-6 py-4 md:py-6"
                        style={{ WebkitOverflowScrolling: "touch" }}
                    >
                        <NeetoCalEmbedInline />
                    </div>
                </div>
            </div>
        </div>
    );
}

