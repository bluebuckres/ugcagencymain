import React from "react";
import { Metadata } from 'next';
import { Reveal } from "@/components/ui/Reveal";
import { HowItWorksInteractive } from "@/components/sections/HowItWorksInteractive";

export const metadata: Metadata = {
    title: "How It Works | MakeUGC",
    description: "Learn how MakeUGC connects D2C brands with top UGC creators in India. A simple 5-step process from brief to performance-ready video ads.",
    alternates: {
        canonical: "https://www.makeugc.in/how-it-works",
    },
};

export default function HowItWorksPage() {
    return (
        <main className="flex-grow flex flex-col">
            <section className="bg-[--color-cream] pt-40 pb-20 md:pt-48 md:pb-32">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <Reveal>
                        <h1 className="font-display text-5xl md:text-7xl tracking-tight leading-[1.05] text-[--color-ink] mb-16">
                            How It Works
                        </h1>
                    </Reveal>

                    <HowItWorksInteractive />
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
