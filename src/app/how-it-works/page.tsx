"use client";
import React, { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";

const FlowTab = ({ active, onClick, text }: { active: boolean, onClick: () => void, text: string }) => (
    <button
        onClick={onClick}
        className={`flex-1 py-4 font-sans text-lg font-medium transition-all outline-none border-b-2 ${active ? 'border-[--color-tan] text-[--color-ink]' : 'border-[--color-border] text-[--color-muted] hover:text-[--color-ink]'}`}
    >
        {text}
    </button>
);

const TimelineSteps = ({ steps }: { steps: { num: string, title: string, desc: string }[] }) => (
    <div className="space-y-12">
        {steps.map((step, idx) => (
            <Reveal key={idx} delay={idx * 100}>
                <div className="flex flex-col md:flex-row gap-6 md:gap-12 group">
                    <div className="font-display text-4xl md:text-5xl text-[--color-tan] opacity-30 md:w-24 shrink-0 -mt-1 group-hover:opacity-100 transition-opacity">
                        {step.num}
                    </div>
                    <div>
                        <h3 className="font-sans text-xl font-medium text-[--color-ink] mb-3">{step.title}</h3>
                        <p className="font-sans text-[--color-muted] leading-relaxed max-w-2xl">{step.desc}</p>
                    </div>
                </div>
            </Reveal>
        ))}
    </div>
);

const BrandSteps = [
    { num: "01", title: "Submit your brief", desc: "Product details, audience, goals, references" },
    { num: "02", title: "We scope your project", desc: "Assign tier, confirm timeline and deliverables" },
    { num: "03", title: "Production begins", desc: "Script, creator cast, shoot, edit" },
    { num: "04", title: "Quality review", desc: "Our team checks before you see anything" },
    { num: "05", title: "Delivery + revisions", desc: "Receive files, request tweaks, approve and run" },
];

const CreatorSteps = [
    { num: "01", title: "Apply and build profile", desc: "Intro video, niche, availability" },
    { num: "02", title: "Vetting", desc: "2–5 business day review" },
    { num: "03", title: "Receive matched briefs", desc: "Niche-matched, clear instructions" },
    { num: "04", title: "Deliver content", desc: "Shoot, submit, iterate if needed" },
    { num: "05", title: "Get paid", desc: "Approval triggers payment" },
];

export default function HowItWorksPage() {
    const [tab, setTab] = useState<'brands' | 'creators'>('brands');

    return (
        <main className="flex-grow flex flex-col">
            <section className="bg-[--color-cream] pt-40 pb-20 md:pt-48 md:pb-32">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <Reveal>
                        <h1 className="font-display text-5xl md:text-7xl tracking-tight leading-[1.05] text-[--color-ink] mb-16">
                            How It Works
                        </h1>
                    </Reveal>

                    <div className="flex max-w-xl mx-auto mb-16">
                        <FlowTab active={tab === 'brands'} onClick={() => setTab('brands')} text="For Brands" />
                        <FlowTab active={tab === 'creators'} onClick={() => setTab('creators')} text="For Creators" />
                    </div>

                    <div className="text-left bg-white p-8 md:p-16 rounded-3xl border border-[--color-border] shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[--color-tan] opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                        <TimelineSteps steps={tab === 'brands' ? BrandSteps : CreatorSteps} />
                    </div>
                </div>
            </section>

            <section className="bg-white border-y border-[--color-border] py-20 md:py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                        <Reveal>
                            <div>
                                <h3 className="font-display text-3xl text-[--color-ink] mb-8">Delivery Timelines</h3>
                                <ul className="space-y-4">
                                    <li className="flex justify-between items-center py-4 border-b border-[--color-border]">
                                        <span className="font-sans font-medium text-[--color-ink]">AI UGC</span>
                                        <span className="font-mono text-sm text-[--color-sage]">24–48 hours</span>
                                    </li>
                                    <li className="flex justify-between items-center py-4 border-b border-[--color-border]">
                                        <span className="font-sans font-medium text-[--color-ink]">Self-Serve</span>
                                        <span className="font-mono text-sm text-[--color-sage]">You set timeline</span>
                                    </li>
                                    <li className="flex justify-between items-center py-4 border-b border-[--color-border]">
                                        <span className="font-sans font-medium text-[--color-ink]">Managed</span>
                                        <span className="font-mono text-sm text-[--color-sage]">5–7 days</span>
                                    </li>
                                    <li className="flex justify-between items-center py-4 border-b border-[--color-border]">
                                        <span className="font-sans font-medium text-[--color-ink]">Full Studio</span>
                                        <span className="font-mono text-sm text-[--color-sage]">Custom</span>
                                    </li>
                                </ul>
                            </div>
                        </Reveal>
                        <Reveal delay={100}>
                            <div>
                                <h3 className="font-display text-3xl text-[--color-ink] mb-8">Quality Standards</h3>
                                <p className="font-sans text-[--color-muted] mb-6">Every deliverable is checked for:</p>
                                <ul className="space-y-4">
                                    {[
                                        "Brief compliance (product shown correctly, messaging on-point)",
                                        "Technical quality (resolution, audio, lighting)",
                                        "Platform fit (correct format, safe zones, caption-ready)",
                                        "Brand safety (no off-brand language, visuals, or context)",
                                    ].map((item, idx) => (
                                        <li key={idx} className="flex gap-4">
                                            <span className="text-[--color-sage] font-sans font-light mt-0.5">→</span>
                                            <span className="font-sans text-[--color-ink] leading-relaxed">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>
        </main>
    );
}
