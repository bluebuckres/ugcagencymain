"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "@phosphor-icons/react";

const screens = [
    {
        src: "/image/metrics.webp",
        alt: "Health & Conversion HUD — Campaign metrics dashboard",
        label: "Campaign Metrics",
        desc: "Real-time Health & Conversion HUD with creator approval and content rates.",
    },
    {
        src: "/image/massage.webp",
        alt: "In-app messaging — brand to creator direct chat",
        label: "Direct Messaging",
        desc: "Unified inbox for brand ↔ creator comms — direct, project, and content chats.",
    },
    {
        src: "/image/payment.webp",
        alt: "Payment dashboard — total, completed, pending, failed",
        label: "Payments",
        desc: "Full payment tracking with Razorpay — completed, pending & failed at a glance.",
    },
    {
        src: "/image/app_nav.webp",
        alt: "UGC Studio navigation — users, brands, creators, projects",
        label: "UGC Studio",
        desc: "All-in-one sidebar: Users, Brands, Creators, Content, Reviews, Payments & more.",
    },
];

export function AppPreview() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [activeIdx, setActiveIdx] = useState(0);

    const scrollTo = (idx: number) => {
        const target = idx < 0 ? 0 : idx >= screens.length ? screens.length - 1 : idx;
        setActiveIdx(target);
        const el = scrollRef.current?.children[target] as HTMLElement;
        el?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    };

    return (
        <section className="py-8 md:py-16 overflow-hidden bg-white">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                {/* The "Matte Black" Rounded & Elevated Container */}
                <div
                    className="relative w-full py-10 md:py-16 px-4 sm:px-8 lg:px-12 overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.3)]"
                    style={{
                        background: "linear-gradient(135deg, #0a0a0a 0%, #111 100%)",
                        borderRadius: "2.5rem",
                    }}
                >
                    {/* Background Texture Overlay */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

                    {/* Header - Centered and Smaller */}
                    <div className="relative z-10 text-center space-y-3 mb-12">
                        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[--color-tan] font-bold">Platform Preview</p>
                        <h2 className="font-display text-3xl md:text-4xl text-white leading-tight">
                            Built for Speed & Scale
                        </h2>
                        <p className="font-sans text-xs text-white/50 leading-relaxed max-w-lg mx-auto">
                            Manage creators, content, and payments effortlessly from <span className="text-[--color-tan]">app.makeugc.in</span>
                        </p>
                    </div>

                    {/* Screens Grid (Desktop: 4-col, Mobile: Scrollable) */}
                    <div
                        ref={scrollRef}
                        className="relative z-10 flex md:grid md:grid-cols-4 gap-4 md:gap-6 overflow-x-auto md:overflow-hidden snap-x snap-mandatory scrollbar-hide px-2 md:px-0"
                        style={{ scrollbarWidth: "none" }}
                        onScroll={(e) => {
                            const container = e.currentTarget;
                            // Calculate card width based on the first child's width if available, or a fallback
                            const firstChild = container.children[0] as HTMLElement;
                            const cardWidth = firstChild ? firstChild.offsetWidth + (parseInt(getComputedStyle(container).gap) || 0) : 0;

                            if (cardWidth > 0) {
                                const newIdx = Math.round(container.scrollLeft / cardWidth);
                                if (newIdx >= 0 && newIdx < screens.length) {
                                    setActiveIdx(newIdx);
                                }
                            }
                        }}
                    >
                        {screens.map((screen, idx) => (
                            <div
                                key={idx}
                                className="snap-center shrink-0 flex flex-col items-center gap-4 transition-all duration-500"
                                style={{ width: "clamp(200px, 60vw, 100%)" }} // Width only applies for mobile flex
                            >
                                {/* Phone frame - Compact Elevation */}
                                <div
                                    className="relative w-full overflow-hidden aspect-[9/19.5] transition-all duration-300 group"
                                    style={{
                                        borderRadius: "2rem",
                                        border: "1px solid rgba(255,255,255,0.08)",
                                        background: "#050505",
                                        boxShadow: "0 10px 30px -5px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.05)",
                                    }}
                                >
                                    <Image
                                        src={screen.src}
                                        alt={screen.alt}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 240px, 300px"
                                        priority={idx < 4}
                                    />
                                    {/* Glass reflection effect */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none"></div>
                                </div>
                                {/* Label */}
                                <div className="text-center space-y-1 px-1">
                                    <p className="font-mono text-[10px] uppercase tracking-widest text-[--color-tan] font-bold">{screen.label}</p>
                                    <p className="font-sans text-[10px] text-white/40 leading-relaxed max-w-[180px] mx-auto">{screen.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Mobile Only: Dot indicators (Hidden on desktop) */}
                    <div className="relative z-10 flex md:hidden justify-center gap-2 mt-6">
                        {screens.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => {
                                    const el = scrollRef.current?.children[idx] as HTMLElement;
                                    el?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
                                }}
                                aria-label={`View screen ${idx + 1}`}
                                className={`h-1 rounded-full transition-all duration-500 ${activeIdx === idx ? "w-6 bg-[--color-tan]" : "w-1.5 bg-white/10"}`}
                            />
                        ))}
                    </div>

                    {/* CTA - Smaller */}
                    <div className="relative z-10 flex justify-center mt-10">
                        <Link
                            href="https://app.makeugc.in"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-[--color-tan] text-white font-sans font-semibold text-xs px-6 py-3 rounded-full hover:bg-white hover:text-black transition-all duration-300 shadow-lg group"
                        >
                            Explore UGC Studio
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
