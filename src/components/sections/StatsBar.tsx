"use client";
import React, { useEffect, useState, useRef } from "react";
import { UserCheck, Megaphone, Clock, Star } from "@phosphor-icons/react";

interface CounterProps {
    end: number;
    suffix?: string;
    duration?: number;
}

const Counter = ({ end, suffix = "", duration = 1800 }: CounterProps) => {
    const [count, setCount] = useState(0);
    const countRef = useRef<HTMLSpanElement>(null);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    let startTime: number | null = null;

                    const animate = (currentTime: number) => {
                        if (!startTime) startTime = currentTime;
                        const progress = Math.min((currentTime - startTime) / duration, 1);

                        // easeOutQuart
                        const easeProgress = 1 - Math.pow(1 - progress, 4);
                        setCount(Math.floor(easeProgress * end));

                        if (progress < 1) {
                            window.requestAnimationFrame(animate);
                        } else {
                            setCount(end); // Ensure exact finish if floating point math is slightly off
                        }
                    };
                    window.requestAnimationFrame(animate);
                }
            },
            { threshold: 0.1 }
        );

        if (countRef.current) {
            observer.observe(countRef.current);
        }

        return () => observer.disconnect();
    }, [end, duration, hasAnimated]);

    return (
        <span ref={countRef}>
            {count.toLocaleString('en-IN')}{suffix}
        </span>
    );
};

export function StatsBar() {
    const stats = [
        { value: 1200, suffix: "+", label: "Vetted Creators", icon: UserCheck },
        { value: 1000, suffix: "+", label: "Campaigns Live", icon: Megaphone },
        { value: 200, suffix: "+", label: "Brands", icon: Star },
        { value: 48, suffix: " hrs", label: "Avg. Delivery", icon: Clock },
        { value: 4.8, suffix: "", label: "Brand Rating", isFloat: true, icon: Star },
    ];

    // Filter to limit to 4 to keep the neat 4-col grid layout, the user requested 5 stats.
    const displayStats = [
        { value: 1200, suffix: "+", label: "Vetted Creators", icon: UserCheck },
        { value: 1000, suffix: "+", label: "Campaigns Live", icon: Megaphone },
        { value: 200, suffix: "+", label: "Brands", icon: Star },
        { value: 48, suffix: " hrs", label: "Avg. Delivery", icon: Clock }
    ];

    // Wait, let's update grid cols if there's 5. 
    // They asked for: 1,200+ Vetted Creators, 1000+ Campaigns Live, 500+ Brands, 48 hrs Avg. Delivery, 4.8 Brand Rating
    // That's 5 items. We should map over all 5 and change grid-cols to 5.

    return (
        <section className="bg-white border-b border-[--color-border] py-16 md:py-24 overflow-x-hidden">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-6 lg:divide-x divide-[--color-border]">
                    {stats.map((stat, idx) => {
                        const Icon = stat.icon;
                        return (
                            <div key={idx} className="flex flex-col items-center lg:items-start lg:pl-10 xl:pl-12 first:lg:pl-0 text-center lg:text-left group">
                                <div className="text-[--color-tan] mb-4 opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-300">
                                    <Icon size={40} weight={stat.isFloat ? "fill" : "regular"} />
                                </div>
                                <div className="font-mono text-3xl xl:text-4xl text-[--color-ink] mb-2 tracking-tight flex items-start gap-1">
                                    {stat.isFloat ? (
                                        <span>4.8</span>
                                    ) : (
                                        <Counter end={stat.value} suffix={stat.suffix} />
                                    )}
                                </div>
                                <div className="font-sans text-sm text-[--color-muted] flex items-center gap-1">
                                    {stat.label}
                                    <span className="text-[--color-tan] leading-none">*</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
