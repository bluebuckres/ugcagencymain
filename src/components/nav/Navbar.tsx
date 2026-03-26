"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight, List, X, Tag, CaretDown, MagnifyingGlass, UserCircle, VideoCamera, Lightbulb, Users, Robot, Translate, Ticket, SpinnerGap, Warning } from "@phosphor-icons/react";
import { searchServices } from "@/actions/searchServices";
import type { Service } from "@/types/service";

// Map Supabase icon_key → Phosphor icon
const ICON_MAP: Record<string, React.ReactNode> = {
    users:     <Users size={18} />,
    robot:     <Robot size={18} />,
    translate: <Translate size={18} />,
    video:     <VideoCamera size={18} />,
    lightbulb: <Lightbulb size={18} />,
    ticket:    <Ticket size={18} />,
};

const TRENDING_PILLS = ["UGC Video", "AI Content", "Creator Hiring", "Meta Ads", "Regional UGC"];

export default function Navbar() {
    const router = useRouter();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    // Search & niche states
    const [isLocationOpen, setIsLocationOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [selectedNiche, setSelectedNiche] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<Service[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const debounceRef = useRef<NodeJS.Timeout | null>(null);

    // Industry / Niche options
    const niches = [
        "Beauty & Skincare", "Fashion & Apparel", "Fitness & Wellness",
        "Food & Beverage", "Home & Living", "Tech & Gadgets",
        "Baby & Parenting", "Finance & Fintech", "Travel & Hospitality",
        "Pet Care", "Health & Supplements", "Jewellery & Accessories",
        "Education & E-learning", "Automotive", "Gaming",
        "Sports & Outdoors", "Sustainable & Eco", "Real Estate",
        "Entertainment & Media", "Luxury & Premium", "D2C & E-commerce",
        "SaaS & Software",
    ];

    // Static fallback services for when Supabase is not yet configured or no search is active
    const fallbackServices = [
        { name: "Video & Photo Production", type: "managed", icon: <VideoCamera size={20} className="text-[--color-muted] group-hover:text-[--color-tan] transition-colors" /> },
        { name: "Creative Strategy & Meta Ads", type: "managed", icon: <Lightbulb size={20} className="text-[--color-muted] group-hover:text-[--color-tan] transition-colors" /> },
        { name: "Creator Hiring", type: "self-serve", icon: <Users size={20} className="text-[--color-muted] group-hover:text-[--color-tan] transition-colors" /> },
        { name: "AI UGC Generation", type: "managed", icon: <Robot size={20} className="text-[--color-muted] group-hover:text-[--color-tan] transition-colors" /> },
        { name: "Local Language UGC", type: "managed", icon: <Translate size={20} className="text-[--color-muted] group-hover:text-[--color-tan] transition-colors" /> },
        { name: "Event & On-Ground Collabs", type: "managed", icon: <Ticket size={20} className="text-[--color-muted] group-hover:text-[--color-tan] transition-colors" /> },
    ];

    // Debounced search
    const runSearch = useCallback(async (q: string) => {
        if (!q.trim()) {
            setSearchResults([]);
            setHasSearched(false);
            setIsSearching(false);
            return;
        }
        setIsSearching(true);
        try {
            const results = await searchServices(q, selectedNiche);
            setSearchResults(results);
            setHasSearched(true);
        } catch {
            setSearchResults([]);
            setHasSearched(true);
        } finally {
            setIsSearching(false);
        }
    }, [selectedNiche]);

    const handleSearchChange = (value: string) => {
        setSearchQuery(value);
        if (debounceRef.current) clearTimeout(debounceRef.current);
        if (!value.trim()) {
            setSearchResults([]);
            setHasSearched(false);
            setIsSearching(false);
            return;
        }
        setIsSearching(true);
        debounceRef.current = setTimeout(() => runSearch(value), 500);
    };

    // Refresh search when niche changes
    useEffect(() => {
        if (searchQuery.trim() && hasSearched) {
            runSearch(searchQuery);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedNiche, runSearch]);

    const handleServiceClick = (service: Service) => {
        const params = new URLSearchParams({
            service: service.name,
            serviceId: service.id,
            category: service.category,
        });
        if (selectedNiche) params.set("niche", selectedNiche);

        if (service.type === "self-serve") {
            router.push(`https://app.makeugc.in?${params.toString()}`);
        } else {
            router.push(`/contact?${params.toString()}`);
        }
        setIsSearchOpen(false);
        setSearchQuery("");
        setSearchResults([]);
        setHasSearched(false);
    };

    const handleTrendingClick = (pill: string) => {
        setSearchQuery(pill);
        runSearch(pill);
    };

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

    // Render search results dropdown content
    const renderSearchDropdown = () => {
        // Loading state
        if (isSearching) {
            return (
                <div className="px-5 py-8 flex flex-col items-center gap-3">
                    <SpinnerGap size={24} className="text-[--color-tan] animate-spin" />
                    <span className="font-sans text-sm text-[--color-muted]">Searching services...</span>
                </div>
            );
        }

        // Results
        if (hasSearched && searchResults.length > 0) {
            return (
                <>
                    <div className="px-4 py-2 font-mono text-xs text-[--color-muted] uppercase tracking-widest border-b border-[--color-border] mb-1">Results</div>
                    {searchResults.map((service) => (
                        <button
                            key={service.id}
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => handleServiceClick(service)}
                            className="w-full text-left px-5 py-3 font-sans text-sm text-[--color-ink] hover:bg-[--color-cream] transition-colors flex items-center justify-between group"
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white border border-[--color-border] rounded-lg group-hover:border-[--color-tan] transition-colors text-[--color-muted] group-hover:text-[--color-tan]">
                                    {ICON_MAP[service.icon_key] || <MagnifyingGlass size={18} />}
                                </div>
                                <div>
                                    <span className="font-medium group-hover:text-[--color-tan] transition-colors block">{service.name}</span>
                                    <span className="font-mono text-[10px] text-[--color-muted]">{service.category}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${service.type === 'self-serve' ? 'bg-green-50 text-green-600 border border-green-200' : 'bg-purple-50 text-purple-600 border border-purple-200'}`}>
                                    {service.type === 'self-serve' ? 'Self-serve' : 'Managed'}
                                </span>
                                <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-[--color-tan]" />
                            </div>
                        </button>
                    ))}
                </>
            );
        }

        // No results
        if (hasSearched && searchResults.length === 0) {
            return (
                <div className="px-5 py-8 flex flex-col items-center gap-3 text-center">
                    <Warning size={24} className="text-[--color-muted]" />
                    <span className="font-sans text-sm text-[--color-muted]">No services matched &ldquo;{searchQuery}&rdquo;</span>
                    <span className="font-sans text-xs text-[--color-muted]/60">Try a different keyword</span>
                </div>
            );
        }

        // Default: trending pills + fallback services
        return (
            <>
                <div className="px-4 py-2 font-mono text-xs text-[--color-muted] uppercase tracking-widest border-b border-[--color-border] mb-2">Trending</div>
                <div className="flex flex-wrap gap-2 px-4 pb-3">
                    {TRENDING_PILLS.map((pill, idx) => (
                        <button
                            key={idx}
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => handleTrendingClick(pill)}
                            className="font-mono text-xs bg-[--color-cream] text-[--color-sage] border border-[--color-border] px-3 py-1.5 rounded-full hover:border-[--color-tan] hover:text-[--color-tan] transition-colors"
                        >
                            {pill}
                        </button>
                    ))}
                </div>
                <div className="px-4 py-2 font-mono text-xs text-[--color-muted] uppercase tracking-widest border-b border-[--color-border] mb-1 mt-1">Popular Services</div>
                {fallbackServices.map((service, idx) => (
                    <button 
                        key={idx} 
                        onMouseDown={(e) => e.preventDefault()} 
                        onClick={() => {
                            const params = new URLSearchParams({ service: service.name });
                            if (selectedNiche) params.set("niche", selectedNiche);
                            
                            if (service.type === "self-serve") {
                                router.push(`https://app.makeugc.in?${params.toString()}`);
                            } else {
                                router.push(`/contact?${params.toString()}`);
                            }
                            setIsSearchOpen(false);
                            setSearchQuery("");
                        }}
                        className="w-full text-left px-5 py-3 font-sans text-sm text-[--color-ink] hover:bg-[--color-cream] transition-colors flex items-center justify-between group"
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white border border-[--color-border] rounded-lg group-hover:border-[--color-tan] transition-colors">
                                {service.icon}
                            </div>
                            <span className="font-medium group-hover:text-[--color-tan] transition-colors">{service.name}</span>
                        </div>
                        <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-[--color-tan]" />
                    </button>
                ))}
            </>
        );
    };

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

                    {/* Middle Section: Location and Service Search (Hidden for now) */}
                    {false && (
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
                                <Tag size={22} className="text-[--color-sage] shrink-0" />
                                <span className="font-sans text-sm text-[--color-ink] truncate text-left flex-grow">
                                    {selectedNiche ?? "Select Industry"}
                                </span>
                                <CaretDown size={16} className={`text-[--color-muted] transition-transform shrink-0 ${isLocationOpen ? "rotate-180" : ""}`} />
                            </button>

                            {isLocationOpen && (
                                <div className="absolute top-full left-0 mt-2 w-full min-w-[240px] bg-white border border-[--color-border] rounded-2xl shadow-xl py-2 max-h-[380px] overflow-y-auto">
                                    <div className="px-4 py-2 font-mono text-xs text-[--color-muted] uppercase tracking-widest border-b border-[--color-border] mb-2">Industry / Niche</div>
                                    {niches.map((niche, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => { setSelectedNiche(niche); setIsLocationOpen(false); }}
                                            className={`w-full text-left px-5 py-3 font-sans text-sm hover:bg-[--color-cream] hover:text-[--color-tan] transition-colors ${selectedNiche === niche ? "text-[--color-tan] font-medium bg-[--color-cream]" : "text-[--color-ink]"}`}
                                        >
                                            {niche}
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
                                {isSearching
                                    ? <SpinnerGap size={22} className="text-[--color-tan] animate-spin shrink-0" />
                                    : <MagnifyingGlass size={22} className="text-[--color-muted] shrink-0" />
                                }
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => handleSearchChange(e.target.value)}
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

                            {/* Search Results Dropdown */}
                            {isSearchOpen && (
                                <div className="absolute top-full left-0 mt-2 w-full bg-white border border-[--color-border] rounded-2xl shadow-xl py-2 max-h-[400px] overflow-y-auto">
                                    {renderSearchDropdown()}
                                </div>
                            )}
                        </div>
                    </div>
                    )}

                    {/* Right Section: Profile & Universal Menu */}
                    <div className="flex items-center gap-2 md:gap-4 z-50">
                        <Link
                            href="https://app.makeugc.in"
                            className="flex items-center gap-2 group p-2 md:px-4 md:py-2 hover:bg-[--color-cream] rounded-2xl transition-colors shrink-0"
                            title="Creator Profile"
                        >
                            <UserCircle size={32} className="text-[--color-ink] group-hover:text-[--color-tan] transition-colors" />
                        </Link>

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

                {/* Mobile Search & Location (Hidden for now) */}
                {false && (
                <div className="lg:hidden w-full px-4 pb-3 pt-2">
                    <div className="flex items-center w-full shadow-sm rounded-xl">
                        <button
                            className="flex items-center justify-center bg-[--color-cream] border border-[--color-border] rounded-l-xl px-3 py-3 w-1/3 focus:outline-none"
                            onClick={() => setIsLocationOpen(!isLocationOpen)}
                        >
                            <Tag size={18} className="text-[--color-sage] mr-1 shrink-0" />
                            <span className="font-sans text-xs text-[--color-ink] truncate">{selectedNiche ?? "Industry"}</span>
                        </button>
                        <div className="flex items-center bg-white border border-l-0 border-[--color-border] rounded-r-xl px-3 py-3 flex-grow focus-within:border-[--color-tan] transition-colors relative">
                            {isSearching
                                ? <SpinnerGap size={18} className="text-[--color-tan] animate-spin mr-2 shrink-0" />
                                : <MagnifyingGlass size={18} className="text-[--color-muted] mr-2 shrink-0" />
                            }
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => handleSearchChange(e.target.value)}
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

                            {/* Mobile Search Dropdown */}
                            {isSearchOpen && (
                                <div className="absolute top-full right-0 left-0 mt-2 w-[calc(100%+33.333%)] -ml-[33.333%] bg-white border border-[--color-border] rounded-2xl shadow-xl py-2 max-h-[300px] overflow-y-auto z-50">
                                    {renderSearchDropdown()}
                                </div>
                            )}

                            {/* Mobile Industry / Niche Dropdown */}
                            {isLocationOpen && (
                                <div className="absolute top-full right-0 left-0 mt-2 w-[calc(100%+33.333%)] -ml-[33.333%] bg-white border border-[--color-border] rounded-2xl shadow-xl py-2 max-h-[300px] overflow-y-auto z-50">
                                    <div className="px-4 py-2 font-mono text-xs text-[--color-muted] uppercase tracking-widest border-b border-[--color-border] mb-2">Industry / Niche</div>
                                    {niches.map((niche, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => { setSelectedNiche(niche); setIsLocationOpen(false); }}
                                            className={`w-full text-left px-4 py-3 font-sans text-sm hover:bg-[--color-cream] transition-colors ${selectedNiche === niche ? "text-[--color-tan] font-medium" : "text-[--color-ink]"}`}
                                        >
                                            {niche}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                )}
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
                        <Link href="/blog" onClick={() => setIsMobileOpen(false)} className="text-[--color-ink] hover:text-[--color-tan] transition-colors">Insights Blog</Link>
                        <Link href="/careers" onClick={() => setIsMobileOpen(false)} className="text-[--color-ink] hover:text-[--color-tan] transition-colors">Careers</Link>

                        <div className="pt-8 mt-6 border-t border-[--color-border] space-y-4">
                            <Link href="/contact" onClick={() => setIsMobileOpen(false)} className="bg-[--color-ink] text-white px-6 py-4 rounded-2xl text-lg font-sans font-medium flex items-center justify-center gap-2 w-full hover:bg-[--color-tan] transition-colors">
                                Start a Project
                                <ArrowRight size={20} />
                            </Link>

                            <Link href="https://app.makeugc.in" onClick={() => setIsMobileOpen(false)} className="bg-[--color-cream] text-[--color-ink] border border-[--color-border] px-6 py-4 rounded-2xl text-lg font-sans font-medium flex items-center justify-center gap-2 w-full hover:bg-white transition-colors">
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
