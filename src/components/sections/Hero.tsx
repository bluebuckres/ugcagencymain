"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/Button";
import Image from "next/image";
import { LogoTicker } from "../ui/LogoTicker";

export function Hero() {
    const [rotationOffsets, setRotationOffsets] = useState([2, -1, 3]);
    const containerRef = useRef<HTMLDivElement>(null);

    // Parallax subtle effect
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const { innerWidth, innerHeight } = window;
            const yAxis = (e.clientX / innerWidth - 0.5) * 10;
            const xAxis = (e.clientY / innerHeight - 0.5) * 10;
            containerRef.current.style.transform = `translate(${yAxis}px, ${xAxis}px)`;
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <section className="relative bg-[--color-cream] min-h-[100dvh] pt-32 pb-0 flex flex-col overflow-hidden">
            <div className="flex-grow flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-8 items-center pt-8 md:pt-16 lg:pt-0">

                    {/* Left Text Column */}
                    <div className="flex flex-col items-start z-10 max-w-2xl">
                        <h1 className="font-display text-5xl md:text-7xl tracking-tight leading-[1.05] text-[--color-ink] mb-6">
                            India&apos;s performance-first <br />creator service platform.
                        </h1>
                        <p className="font-sans text-base md:text-lg text-[--color-muted] max-w-[50ch] leading-relaxed mb-10">
                            On-demand UGC for D2C brands and e-commerce stores. Human UGC, AI UGC, or both — delivered in 48 hours.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mb-12 w-full sm:w-auto">
                            <Button href="/contact" variant="primary">
                                Start a Project <span className="ml-2 font-sans font-light">→</span>
                            </Button>
                            <Button href="/creators" variant="secondary">
                                Browse Creators <span className="ml-1 font-sans font-light">↗</span>
                            </Button>
                        </div>

                        <div className="font-mono text-[10px] md:text-xs tracking-widest uppercase text-[--color-sage] flex flex-wrap gap-x-4 gap-y-2 max-w-lg items-center">
                            <span>Trusted by 200+ Brands</span>
                            <span className="hidden sm:inline">·</span>
                            <span>1,200+ Vetted Creators</span>
                            <span className="hidden sm:inline">·</span>
                            <span>Delivered in 72 hrs</span>
                        </div>
                    </div>

                    {/* Right Visual Stack */}
                    <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[600px] hidden sm:block perspective-1000">
                        <div ref={containerRef} className="absolute inset-0 transition-transform duration-300 ease-out" style={{ transformStyle: 'preserve-3d' }}>
                            {/* Card 3 - Back (Left) */}
                            <div
                                className="absolute top-[12%] left-[2%] w-[42%] h-[70%] bg-white rounded-2xl shadow-lg border border-[--color-border] overflow-hidden group"
                                style={{ transform: `rotate(${rotationOffsets[2] - 12}deg) translateZ(-50px)`, zIndex: 1 }}
                            >
                                <div className="absolute inset-0 bg-black/10 mix-blend-multiply z-10 group-hover:opacity-0 transition-opacity duration-300"></div>
                                <Image src="/image/hero3.webp" alt="UGC Creator Example 3" fill sizes="(max-width: 768px) 100vw, 42vw" className="object-cover group-hover:scale-105 transition-transform duration-500" priority />
                            </div>

                            {/* Card 2 - Middle (Center) */}
                            <div
                                className="absolute top-[4%] left-[29%] w-[42%] h-[70%] bg-white rounded-2xl shadow-xl border border-[--color-border] overflow-hidden group"
                                style={{ transform: `rotate(${rotationOffsets[1]}deg) translateZ(0px)`, zIndex: 2 }}
                            >
                                <div className="absolute inset-0 bg-black/5 mix-blend-multiply z-10 group-hover:opacity-0 transition-opacity duration-300"></div>
                                <Image src="/image/hero2.webp" alt="UGC Creator Example 2" fill sizes="(max-width: 768px) 100vw, 42vw" className="object-cover group-hover:scale-105 transition-transform duration-500" priority />
                            </div>

                            {/* Card 1 - Front (Right) */}
                            <div
                                className="absolute top-[12%] left-[56%] w-[42%] h-[70%] bg-white rounded-2xl shadow-2xl border-4 border-white overflow-hidden group"
                                style={{ transform: `rotate(${rotationOffsets[0] + 12}deg) translateZ(50px)`, zIndex: 3 }}
                            >
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur tracking-widest text-[10px] uppercase font-mono px-3 py-1 rounded-full text-[--color-ink] z-20 shadow-sm">
                                    Top Performing
                                </div>
                                <Image src="/image/hero1.webp" alt="UGC Creator Example 1" fill sizes="(max-width: 768px) 100vw, 42vw" className="object-cover group-hover:scale-105 transition-transform duration-500" priority />
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Ticker anchored to bottom of hero */}
            <div className="w-full mt-16 md:mt-0 pb-8 place-self-end">
                <LogoTicker />
            </div>
        </section>
    );
}
