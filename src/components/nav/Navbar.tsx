"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, List, X, MapPin, CaretDown, MagnifyingGlass, UserCircle, VideoCamera, Lightbulb, Users, Robot, Translate, Ticket } from "@phosphor-icons/react";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    // New states for the interactive UI elements
    const [isLocationOpen, setIsLocationOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    // Mock Data for Dropdowns
    const cities = ["Mumbai", "Delhi", "Bangalore", "Gurgaon", "Pune", "Remote View"];
    const services = [
        { name: "Video & Photo Production", icon: <VideoCamera size={20} className="text-[--color-muted] group-hover:text-[--color-tan] transition-colors" /> },
        { name: "Creative Strategy & Meta Ads", icon: <Lightbulb size={20} className="text-[--color-muted] group-hover:text-[--color-tan] transition-colors" /> },
        { name: "Creator Hiring", icon: <Users size={20} className="text-[--color-muted] group-hover:text-[--color-tan] transition-colors" /> },
        { name: "AI UGC Generation", icon: <Robot size={20} className="text-[--color-muted] group-hover:text-[--color-tan] transition-colors" /> },
        { name: "Local Language UGC", icon: <Translate size={20} className="text-[--color-muted] group-hover:text-[--color-tan] transition-colors" /> },
        { name: "Event & On-Ground Collabs", icon: <Ticket size={20} className="text-[--color-muted] group-hover:text-[--color-tan] transition-colors" /> },
    ];

    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setIsScrolled(window.scrollY > 10);
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <header
                className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ease-in-out ${isScrolled || isLocationOpen || isSearchOpen
                    ? "bg-white border-b border-[--color-border] py-3 shadow-sm"
                    : "bg-white/90 backdrop-blur-md border-b border-[--color-border]/50 py-4"
                    }`}
            >
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap lg:flex-nowrap items-center justify-between gap-4">

                    {/* Left Section: Logo */}
                    <Link href="/" className="inline-flex items-center outline-none shrink-0 z-50">
                        <Image
                            src="/ugc-logo-2.svg"
                            alt="MakeUGC"
                            width={160}
                            height={48}
                            className="h-8 md:h-10 w-auto object-contain scale-[1.5] md:scale-[2] origin-left transition-transform"
                            priority
                        />
                    </Link>

                    {/* Middle Section: Location and Service Search (Urban Company Style) */}
                    <div className="hidden lg:flex items-center flex-grow max-w-3xl mx-8 relative">
                        {/* Location Selector */}
                        <div className="relative z-50">
                            <button
                                onClick={() => {
                                    setIsLocationOpen(!isLocationOpen);
                                    setIsSearchOpen(false);
                                }}
                                className="flex items-center gap-2 bg-white border border-[--color-border] rounded-l-2xl px-5 py-3 min-w-[200px] hover:bg-[--color-cream] transition-colors focus:outline-none"
                            >
                                <MapPin size={22} className="text-[--color-sage]" />
                                <span className="font-sans text-sm text-[--color-ink] truncate text-left flex-grow">Select City</span>
                                <CaretDown size={16} className={`text-[--color-muted] transition-transform ${isLocationOpen ? "rotate-180" : ""}`} />
                            </button>

                            {/* Location Dropdown */}
                            {isLocationOpen && (
                                <div className="absolute top-full left-0 mt-2 w-full min-w-[220px] bg-white border border-[--color-border] rounded-2xl shadow-xl py-2">
                                    <div className="px-4 py-2 font-mono text-xs text-[--color-muted] uppercase tracking-widest border-b border-[--color-border] mb-2">Available Locations</div>
                                    {cities.map((city, idx) => (
                                        <button key={idx} className="w-full text-left px-5 py-3 font-sans text-sm text-[--color-ink] hover:bg-[--color-cream] hover:text-[--color-tan] transition-colors">
                                            {city}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Search Bar */}
                        <div className="relative z-40 flex-grow -ml-px">
                            <div
                                className={`flex items-center gap-3 bg-white border ${isSearchOpen ? 'border-[--color-tan] ring-1 ring-[--color-tan]' : 'border-[--color-border]'} rounded-r-2xl px-5 py-3 transition-colors`}
                            >
                                <MagnifyingGlass size={22} className="text-[--color-muted]" />
                                <input
                                    type="text"
                                    placeholder="Search for 'Video Ads', 'AI UGC'..."
                                    className="w-full font-sans text-sm text-[--color-ink] placeholder:text-[--color-muted] focus:outline-none bg-transparent"
                                    onFocus={() => {
                                        setIsSearchOpen(true);
                                        setIsLocationOpen(false);
                                    }}
                                    onBlur={() => {
                                        setTimeout(() => setIsSearchOpen(false), 200);
                                    }}
                                />
                            </div>

                            {/* Service Metadata Dropdown */}
                            {isSearchOpen && (
                                <div className="absolute top-full left-0 mt-2 w-full bg-white border border-[--color-border] rounded-2xl shadow-xl py-2 max-h-[400px] overflow-y-auto">
                                    <div className="px-4 py-2 font-mono text-xs text-[--color-muted] uppercase tracking-widest border-b border-[--color-border] mb-2">Popular Services Metadata</div>
                                    {services.map((service, idx) => (
                                        <button key={idx} className="w-full text-left px-5 py-3 font-sans text-sm text-[--color-ink] hover:bg-[--color-cream] transition-colors flex items-center justify-between group">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-white border border-[--color-border] rounded-lg group-hover:border-[--color-tan] transition-colors">
                                                    {service.icon}
                                                </div>
                                                <span className="font-medium group-hover:text-[--color-tan] transition-colors">{service.name}</span>
                                            </div>
                                            <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-[--color-tan]" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Section: Profile & Universal Menu */}
                    <div className="flex items-center gap-2 md:gap-4 z-50">
                        {/* Profile Icon */}
                        <Link
                            href="/creators"
                            className="flex items-center gap-2 group p-2 md:px-4 md:py-2 hover:bg-[--color-cream] rounded-2xl transition-colors shrink-0"
                            title="Creator Profile"
                        >
                            <UserCircle size={32} className="text-[--color-ink] group-hover:text-[--color-tan] transition-colors" />
                            <span className="hidden sm:block font-sans text-sm font-medium text-[--color-ink] group-hover:text-[--color-tan] transition-colors whitespace-nowrap">Creator Profile</span>
                        </Link>

                        {/* Universal Hamburger Menu (Now on Desktop too) */}
                        <button
                            onClick={() => setIsMobileOpen(true)}
                            className="p-2 md:px-4 md:py-2 text-[--color-ink] hover:bg-[--color-cream] rounded-2xl transition-colors flex items-center gap-2 group shrink-0"
                            aria-label="Open Navigation Menu"
                        >
                            <List size={32} className="group-hover:text-[--color-tan] transition-colors" />
                            <span className="hidden sm:block font-sans text-sm font-medium group-hover:text-[--color-tan] transition-colors">Menu</span>
                        </button>
                    </div>
                </div>

                {/* Mobile Search & Location (Shows below the navbar row) */}
                <div className="lg:hidden w-full px-4 pb-3 pt-2">
                    <div className="flex items-center w-full shadow-sm rounded-xl">
                        <button
                            className="flex items-center justify-center bg-[--color-cream] border border-[--color-border] rounded-l-xl px-3 py-3 w-1/3 focus:outline-none"
                            onClick={() => setIsLocationOpen(!isLocationOpen)}
                        >
                            <MapPin size={18} className="text-[--color-sage] mr-1 shrink-0" />
                            <span className="font-sans text-xs text-[--color-ink] truncate">City</span>
                        </button>
                        <div className="flex items-center bg-white border border-l-0 border-[--color-border] rounded-r-xl px-3 py-3 flex-grow focus-within:border-[--color-tan] transition-colors relative">
                            <MagnifyingGlass size={18} className="text-[--color-muted] mr-2 shrink-0" />
                            <input
                                type="text"
                                placeholder="Search services..."
                                className="w-full font-sans text-sm text-[--color-ink] placeholder:text-[--color-muted] focus:outline-none bg-transparent"
                                onFocus={() => {
                                    setIsSearchOpen(true);
                                    setIsLocationOpen(false);
                                }}
                                onBlur={() => {
                                    setTimeout(() => setIsSearchOpen(false), 200);
                                }}
                            />

                            {/* Mobile Service Metadata Dropdown */}
                            {isSearchOpen && (
                                <div className="absolute top-full right-0 left-0 mt-2 w-[calc(100%+33.333%)] -ml-[33.333%] bg-white border border-[--color-border] rounded-2xl shadow-xl py-2 max-h-[300px] overflow-y-auto z-50">
                                    <div className="px-4 py-2 font-mono text-xs text-[--color-muted] uppercase tracking-widest border-b border-[--color-border] mb-2">Available Services</div>
                                    {services.map((service, idx) => (
                                        <button key={idx} className="w-full text-left px-4 py-3 font-sans text-sm text-[--color-ink] hover:bg-[--color-cream] transition-colors flex items-center gap-3">
                                            <div className="p-1.5 bg-white border border-[--color-border] rounded-md">
                                                {service.icon}
                                            </div>
                                            <span className="truncate">{service.name}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Universal Drawer (Mobile & Desktop) */}
            <div
                className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-300 ${isMobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                onClick={() => setIsMobileOpen(false)}
            >
                <div
                    className={`absolute right-0 top-0 bottom-0 w-full md:w-[450px] bg-white shadow-2xl flex flex-col pt-8 px-8 transition-transform duration-300 ease-in-out ${isMobileOpen ? "translate-x-0" : "translate-x-full"}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex justify-between items-center mb-12">
                        <span className="font-mono text-xs uppercase tracking-widest text-[--color-muted]">Navigation Menu</span>
                        <button onClick={() => setIsMobileOpen(false)} className="p-3 bg-[--color-cream] rounded-full hover:bg-[--color-border] transition-colors text-[--color-ink]">
                            <X size={24} />
                        </button>
                    </div>

                    <nav className="flex flex-col gap-6 text-3xl font-display overflow-y-auto pb-8">
                        <Link href="/brands" onClick={() => setIsMobileOpen(false)} className="text-[--color-ink] hover:text-[--color-tan] transition-colors">For Brands</Link>
                        <Link href="/creators" onClick={() => setIsMobileOpen(false)} className="text-[--color-ink] hover:text-[--color-tan] transition-colors">For Creators</Link>
                        <Link href="/pricing" onClick={() => setIsMobileOpen(false)} className="text-[--color-ink] hover:text-[--color-tan] transition-colors">Pricing</Link>
                        <Link href="/ai-ugc" onClick={() => setIsMobileOpen(false)} className="text-[--color-ink] hover:text-[--color-tan] transition-colors">AI UGC</Link>
                        <Link href="/how-it-works" onClick={() => setIsMobileOpen(false)} className="text-[--color-ink] hover:text-[--color-tan] transition-colors">How It Works</Link>
                        <Link href="/about" onClick={() => setIsMobileOpen(false)} className="text-[--color-ink] hover:text-[--color-tan] transition-colors">About Us</Link>
                        <Link href="/blog" onClick={() => setIsMobileOpen(false)} className="text-[--color-ink] hover:text-[--color-tan] transition-colors">Insights Blog</Link>
                        <Link href="/careers" onClick={() => setIsMobileOpen(false)} className="text-[--color-ink] hover:text-[--color-tan] transition-colors">Careers</Link>

                        <div className="pt-8 mt-6 border-t border-[--color-border] space-y-4">
                            <Link href="/contact" onClick={() => setIsMobileOpen(false)} className="bg-[--color-ink] text-white px-6 py-4 rounded-2xl text-lg font-sans font-medium flex items-center justify-center gap-2 w-full hover:bg-[--color-tan] transition-colors">
                                Start a Project
                                <ArrowRight size={20} />
                            </Link>

                            <Link href="/creators" onClick={() => setIsMobileOpen(false)} className="bg-[--color-cream] text-[--color-ink] border border-[--color-border] px-6 py-4 rounded-2xl text-lg font-sans font-medium flex items-center justify-center gap-2 w-full hover:bg-white transition-colors">
                                <UserCircle size={24} />
                                Create Creator Profile
                            </Link>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    );
}
