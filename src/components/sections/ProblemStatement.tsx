import React from "react";
import { Reveal } from "../ui/Reveal";

export function ProblemStatement() {
    return (
        <section className="bg-white py-20 md:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl">
                    <Reveal>
                        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-[--color-ink] tracking-tight leading-[1.1] mb-10 md:mb-12">
                            Your ad spend isn&apos;t the problem.<br className="hidden sm:block" />
                            Your creative is.
                        </h2>
                    </Reveal>

                    <Reveal delay={100}>
                        <p className="font-sans text-lg md:text-xl text-[#555] leading-relaxed max-w-[55ch] mb-12 md:mb-16">
                            Polished brand videos don&apos;t feel native in a feed. People scroll past them. UGC doesn&apos;t get scrolled past — it gets watched, trusted, and clicked.
                            <br /><br />
                            MakeUGC gives you on-demand creator content built for paid social. Not branded. Not produced. Real.
                        </p>
                    </Reveal>

                    <Reveal delay={200}>
                        <div className="flex flex-col gap-4">
                            <div className="bg-[#f2ede6] text-[--color-sage] font-sans text-sm md:text-base px-6 py-4 rounded-xl inline-flex w-fit items-center whitespace-nowrap">
                                <span className="font-medium">Ad fatigue</span>
                                <span className="mx-3 opacity-50">→</span>
                                <span>Fresh creatives every week</span>
                            </div>
                            <div className="bg-[#f2ede6] text-[--color-sage] font-sans text-sm md:text-base px-6 py-4 rounded-xl inline-flex w-fit items-center whitespace-nowrap">
                                <span className="font-medium">Agency retainers</span>
                                <span className="mx-3 opacity-50">→</span>
                                <span>Flexible tiers from day one</span>
                            </div>
                            <div className="bg-[#f2ede6] text-[--color-sage] font-sans text-sm md:text-base px-6 py-4 rounded-xl inline-flex w-fit items-center whitespace-nowrap">
                                <span className="font-medium">Generic AI</span>
                                <span className="mx-3 opacity-50">→</span>
                                <span>Human + AI, blended right</span>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
