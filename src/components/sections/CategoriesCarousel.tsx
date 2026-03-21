"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

const CATEGORIES = [
    { title: "Tech & Gaming", file: "Tech & Gaming.webp" },
    { title: "Beauty & Skincare", file: "Beauty & Skincare.webp" },
    { title: "Fashion & Jewellery", file: "Fashion & Jewellery.webp" },
    { title: "Food & Beverage", file: "Food & Beverage.webp" },
    { title: "Fitness & Health", file: "Fitness & Health.webp" },
    { title: "Home & Living", file: "Home & Living.webp" },
    { title: "Software & Digital", file: "Software & Digital.webp" },
    { title: "Baby & Parenting", file: "Baby & Parenting.webp" },
    { title: "Automotive", file: "Automotive.webp" },
    { title: "Finance & Fintech", file: "Finance & Fintech.webp" },
    { title: "Travel & Hospitality", file: "Travel & Hospitality.webp" },
    { title: "Education & E-learning", file: "Education & E-learning.webp" },
    { title: "Pet Care", file: "Pet Care.webp" },
    { title: "Media and Entertainment", file: "Media and Entertainment.png" }
];

export const CategoriesCarousel = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);

    const handleScroll = () => {
        if (!scrollContainerRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        setShowLeftArrow(scrollLeft > 20);
        setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 20);
    };

    const scroll = (direction: "left" | "right") => {
        if (!scrollContainerRef.current) return;
        const scrollAmount = direction === "left" ? -400 : 400;
        scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    };

    useEffect(() => {
        handleScroll();
        window.addEventListener("resize", handleScroll);
        return () => window.removeEventListener("resize", handleScroll);
    }, []);

    return (
        <section className="bg-[--color-cream] py-20 md:py-32 border-b border-[--color-border] overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Reveal>
                    <div className="flex justify-between items-end mb-10 md:mb-12">
                        <h2 className="font-display text-3xl md:text-5xl text-[--color-ink] tracking-tight leading-[1.1]">
                            Explore by Category
                        </h2>
                        
                        {/* Desktop Navigation Arrows */}
                        <div className="hidden md:flex gap-3">
                            <button 
                                onClick={() => scroll("left")}
                                disabled={!showLeftArrow}
                                className={`w-12 h-12 rounded-full flex items-center justify-center border border-[--color-border] transition-all duration-300 ${showLeftArrow ? 'bg-white text-[--color-ink] hover:border-[--color-tan] shadow-sm hover:shadow-md' : 'bg-transparent text-[--color-muted] opacity-50 cursor-not-allowed'}`}
                                aria-label="Scroll left"
                            >
                                <CaretLeft size={24} />
                            </button>
                            <button 
                                onClick={() => scroll("right")}
                                disabled={!showRightArrow}
                                className={`w-12 h-12 rounded-full flex items-center justify-center border border-[--color-border] transition-all duration-300 ${showRightArrow ? 'bg-white text-[--color-ink] hover:border-[--color-tan] shadow-sm hover:shadow-md' : 'bg-transparent text-[--color-muted] opacity-50 cursor-not-allowed'}`}
                                aria-label="Scroll right"
                            >
                                <CaretRight size={24} />
                            </button>
                        </div>
                    </div>
                </Reveal>

                <Reveal delay={100}>
                    <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0">
                        {/* Mobile Fade & Arrow - Right */}
                        <div className="absolute right-0 top-0 bottom-10 w-16 bg-gradient-to-l from-[--color-cream] to-transparent pointer-events-none md:hidden flex justify-end items-center pr-2 z-10">
                            <span className="text-[--color-sage] animate-pulse drop-shadow-sm bg-white/80 rounded-full p-1 border border-[--color-border]/50">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                            </span>
                        </div>
                        
                        <div 
                            ref={scrollContainerRef}
                            onScroll={handleScroll}
                            className="grid grid-rows-2 grid-flow-col gap-4 sm:gap-6 pb-8 pt-2 overflow-x-auto scrollbar-hide snap-x snap-mandatory pr-10 sm:pr-0"
                            style={{ scrollBehavior: 'smooth' }}
                        >
                            {CATEGORIES.map((category, idx) => (
                                <div key={idx} className="shrink-0 snap-start w-[140px] sm:w-[200px] md:w-[240px] flex flex-col items-start group cursor-pointer">
                                    <div className="w-full aspect-[4/5] sm:aspect-square relative rounded-2xl md:rounded-3xl overflow-hidden bg-white/50 border border-[--color-border]/50 shadow-sm transition-shadow duration-300 group-hover:shadow-[0_8px_24px_-8px_rgba(199,166,137,0.2)]">
                                        <Image 
                                            src={`/Category/${category.file}`} 
                                            alt={category.title} 
                                            fill 
                                            sizes="(max-width: 640px) 140px, (max-width: 768px) 200px, 240px"
                                            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                                        />
                                    </div>
                                    <h3 className="w-full text-left mt-3 font-sans font-medium text-[14px] sm:text-[15px] md:text-base text-[--color-ink] group-hover:text-[--color-tan] transition-colors pr-2 leading-snug">
                                        {category.title}
                                    </h3>
                                </div>
                            ))}
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
};
