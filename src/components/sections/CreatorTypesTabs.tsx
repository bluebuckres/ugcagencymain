"use client";

import React, { useState } from "react";
import { Check, VideoCamera, Users, Camera, Scissors, ChatCircleText, Lightbulb } from "@phosphor-icons/react";
import { Reveal } from "@/components/ui/Reveal";

export const CreatorTypesTabs = () => {
    const [activeTab, setActiveTab] = useState(0);

    const types = [
        {
            icon: <VideoCamera size={24} />,
            title: "UGC Creator",
            subtitle: "No followers needed. Just a phone and confidence.",
            for: "You're comfortable on camera and can talk naturally about a product. No professional experience needed — brands want real people, not actors.",
            do: ["Shoot short product videos, reviews, unboxings, or talking-head content from home", "Follow a brand brief (script + direction provided)", "Submit raw footage via Google Drive", "Brands use your videos for paid ads — your personal account is never tagged"],
            need: ["Smartphone with a decent camera (iPhone or Android, last 3–4 years)", "Basic lighting (window light or a ₹500 ring light)", "A quiet space to shoot", "Ability to meet deadlines (typically 3–5 days per brief)"],
            languages: "English, Hindi, Tamil, Telugu, Kannada, Bengali, Marathi, Malayalam, Gujarati",
            link: "https://chat.whatsapp.com/CHQvhLOafvk0SAH6x0pYWb?mode=gi_t",
            linkText: "Join UGC WhatsApp Community"
        },
        {
            icon: <Users size={24} />,
            title: "UGC + Influencer",
            subtitle: "10,000+ followers. You bring reach AND content.",
            for: "You already have an engaged following on Instagram, YouTube, or any platform. Brands want both your content AND your audience.",
            do: ["Everything a UGC Creator does, PLUS:", "Brands may request a post, reel, or story on your own account", "You get paid more because your reach adds extra value", "You choose which deals to accept — we always share the full brief before you commit"],
            need: ["10,000+ followers on at least one platform", "An engaged audience (quality over just a big number)", "Clear niche (beauty, fitness, tech, food, etc.)"],
            note: "Even with followers, on-camera confidence and content quality matter most. Your rate reflects both your reach and your skill.",
            link: "https://chat.whatsapp.com/Dlqz5UFzZdI5JXHJNYXHu2?mode=gi_t",
            linkText: "Join Influencer WhatsApp Community"
        },
        {
            icon: <Camera size={24} />,
            title: "Photographer",
            subtitle: "Product and lifestyle photography. Remote-friendly.",
            for: "You can shoot high-quality product or lifestyle photos. DSLR, mirrorless, or a high-end phone — all accepted.",
            do: ["Brands courier products to your address", "You shoot as per the creative brief (product shots, flat lays, lifestyle images)", "Submit edited photos via Google Drive", "Keep the product after delivery"],
            need: ["Camera (DSLR, mirrorless, or flagship phone)", "Basic editing skills (Lightroom, Snapseed, or similar)", "Clean or neutral shooting space", "Ability to shoot in good light"],
            portfolio: "3–5 sample photos (personal work accepted if no brand work yet)",
            link: "https://chat.whatsapp.com/ET57w00Z0vNBSrPbFtg0KM?mode=gi_t",
            linkText: "Join Photographer WhatsApp Community"
        },
        {
            icon: <Scissors size={24} />,
            title: "Video Editor",
            subtitle: "Edit from home. No camera. No shoots.",
            for: "You edit short-form video content — Reels, ad-format videos, talking-head cuts. You work remotely with raw files sent to you via Drive.",
            do: ["Receive raw creator footage via Google Drive", "Edit as per brand brief (subtitles, transitions, music, text overlays, pacing)", "Deliver final exports in correct formats (9:16, 1:1, 16:9)", "You never need to be on camera"],
            need: ["Laptop with editing software (CapCut, Premiere Pro, etc.)", "Reliable internet connection", "Strong sense of pacing and short-form content style", "Ability to meet turnaround deadlines (typically 2–3 days)"],
            portfolio: "2–3 edited video samples (personal or brand work)",
            link: "https://chat.whatsapp.com/J4vFH0PgQGbKU4x5RP418W?mode=gi_t",
            linkText: "Join Editor WhatsApp Community"
        }
    ];

    const activeContent = types[activeTab];

    return (
        <section className="bg-[--color-cream] py-20 md:py-32 border-b border-[--color-border]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="font-display text-3xl md:text-5xl tracking-tight leading-[1.1] text-[--color-ink] mb-4">Choose Your Creator Type</h2>
                    <p className="font-sans text-base text-[--color-muted] max-w-[60ch] mx-auto">We work with 4 types of creators. Pick the one that fits you best.</p>
                </div>
                
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative items-start">
                    <div className="lg:w-[320px] shrink-0 relative lg:sticky lg:top-32 w-full">
                        {/* Mobile Scroll Indicator */}
                        <div className="absolute right-0 top-0 bottom-4 w-12 bg-gradient-to-l from-[--color-cream] to-transparent pointer-events-none lg:hidden flex justify-end items-center pr-1 z-10">
                            <span className="text-[--color-sage] animate-pulse">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                            </span>
                        </div>
                        
                        <div className="flex lg:flex-col gap-2 md:gap-3 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide pr-8 lg:pr-0">
                            {types.map((type, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveTab(idx)}
                                    className={`text-left flex items-center gap-3 md:gap-4 px-4 py-3 sm:px-5 sm:py-4 lg:px-6 lg:py-5 rounded-xl md:rounded-2xl transition-all duration-300 ease-out whitespace-nowrap lg:whitespace-normal group border shrink-0 ${
                                        activeTab === idx 
                                            ? "bg-white text-[--color-ink] shadow-[0_4px_24px_-8px_rgba(199,166,137,0.15)] border-[--color-border]/80" 
                                            : "bg-transparent border-transparent text-[--color-muted] hover:bg-white/40 hover:text-[--color-ink]"
                                    }`}
                                >
                                    <span className={`transition-colors duration-300 ${activeTab === idx ? "text-[--color-tan]" : "text-[--color-sage] group-hover:text-[--color-tan]"}`}>
                                        {type.icon}
                                    </span>
                                    <div className="font-sans text-[15px] sm:text-base lg:text-lg font-medium">{type.title}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="w-full lg:flex-1 relative pb-12">
                        <div className="bg-white border border-[--color-border] rounded-[2rem] p-8 md:p-12 lg:p-14 shadow-sm animate-in fade-in slide-in-from-right-4 duration-500 min-h-full" key={activeTab}>
                            <div className="mb-10 pb-8 border-b border-[--color-border]">
                                <h3 className="font-display text-3xl md:text-4xl text-[--color-ink] mb-4">{activeContent.title}</h3>
                                <p className="font-sans text-lg text-[--color-sage] italic">{activeContent.subtitle}</p>
                            </div>
                            
                            <div className="space-y-12">
                                <div>
                                    <p className="font-sans text-xs font-mono uppercase tracking-widest text-[--color-muted] mb-4">Who this is for</p>
                                    <p className="font-sans text-base text-[--color-ink] leading-relaxed max-w-[65ch]">{activeContent.for}</p>
                                </div>
                                
                                <div className="grid md:grid-cols-2 gap-10 md:gap-16">
                                    <div>
                                        <p className="font-sans text-xs font-mono uppercase tracking-widest text-[--color-muted] mb-5">What you&apos;ll do</p>
                                        <ul className="space-y-4">
                                            {activeContent.do.map((item, i) => (
                                                <li key={i} className="flex gap-4 font-sans text-[15px] text-[--color-ink] leading-relaxed">
                                                    <span className="text-[--color-sage] mt-1 shrink-0"><Check size={16} weight="bold" /></span>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <p className="font-sans text-xs font-mono uppercase tracking-widest text-[--color-muted] mb-5">You need</p>
                                        <ul className="space-y-4">
                                            {activeContent.need.map((item, i) => (
                                                <li key={i} className="flex gap-4 font-sans text-[15px] text-[--color-ink] leading-relaxed">
                                                    <span className="text-[--color-sage] mt-1 shrink-0"><Check size={16} weight="bold" /></span>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                
                                <div className="grid md:grid-cols-2 gap-8">
                                    {activeContent.languages && (
                                        <div>
                                            <p className="font-sans text-xs font-mono uppercase tracking-widest text-[--color-muted] mb-3">Languages in demand</p>
                                            <p className="font-sans text-[15px] text-[--color-ink] max-w-[40ch] leading-relaxed">{activeContent.languages}</p>
                                        </div>
                                    )}
                                    {activeContent.portfolio && (
                                        <div>
                                            <p className="font-sans text-xs font-mono uppercase tracking-widest text-[--color-muted] mb-3">Portfolio requirement</p>
                                            <p className="font-sans text-[15px] text-[--color-ink] leading-relaxed">{activeContent.portfolio}</p>
                                        </div>
                                    )}
                                </div>

                                {activeContent.note && (
                                    <div className="bg-[--color-cream] p-6 rounded-2xl border border-[--color-border] flex gap-5 items-start mt-6">
                                        <Lightbulb size={24} className="text-[--color-tan] shrink-0 fill-current mt-0.5" weight="duotone" />
                                        <p className="font-sans text-[15px] leading-relaxed text-[--color-ink] italic">{activeContent.note}</p>
                                    </div>
                                )}
                            </div>

                            <div className="mt-14 pt-8 border-t border-[--color-border]">
                                <a href={activeContent.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-sm text-[--color-sage] border border-[--color-sage]/30 px-6 py-3 rounded-full hover:bg-[--color-sage] hover:text-white transition-all duration-300 font-medium tracking-wide">
                                    <ChatCircleText size={20} /> <span className="uppercase font-mono text-xs">{activeContent.linkText}</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
