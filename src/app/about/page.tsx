import React from "react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export const metadata = {
    title: "About MakeUGC | The Performance Creative Platform",
    description: "Learn why MakeUGC was built. We're an Indian platform connecting D2C brands with vetted creators to produce scroll-stopping, high-converting video ads.",
};

const StorySection = () => (
    <section className="bg-white py-20 md:py-32 border-b border-[--color-border]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
                <h2 className="font-display text-4xl text-[--color-ink] mb-12">The Story</h2>
            </Reveal>
            <Reveal delay={100}>
                <div className="prose prose-lg font-sans text-[--color-ink] max-w-[75ch] leading-relaxed space-y-6">
                    <p>
                        We built MakeUGC because we saw a massive gap in the Indian performance marketing ecosystem.
                        Brands knew that user-generated content was outperforming studio-shot ads, but sourcing it was a nightmare.
                    </p>
                    <p>
                        Growth teams were spending hours sending DMs on Instagram, negotiating rates, chasing creators for deliverables, and teaching them how to shoot a proper direct-response hook. By the time the video was ready, the campaign was already delayed, and the video rarely hit the performance metrics needed.
                    </p>
                    <p>
                        MakeUGC fixes the pipeline.
                    </p>
                    <p>
                        We created a unified platform where vetting, briefing, production, and payment happen in one place. We focus strictly on <strong>performance creative</strong>—meaning our creators understand hooks, CTAs, safe zones, and pacing. We don&apos;t care about follower counts; we care about conversion rates.
                    </p>
                </div>
            </Reveal>
        </div>
    </section>
);

const WhatWeBelieve = () => (
    <section className="bg-[--color-cream] py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal><h2 className="font-display text-4xl text-[--color-ink] mb-16 md:mb-24 text-center">What We Believe</h2></Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
                {[
                    {
                        title: "Creative is the new targeting.",
                        desc: "With privacy updates restricting precise ad targeting, the only variable left to optimize is the creative itself. Good UGC does the targeting for you by stopping the right scroller."
                    },
                    {
                        title: "It's about the hook, not the gear.",
                        desc: "A $10,000 RED camera won't save a boring script. A smartphone shot with great lighting, authentic delivery, and a psychological hook will win every time."
                    },
                    {
                        title: "Volume solves fatigue.",
                        desc: "Even the best ad fatigues in 2 weeks. Scalable ad accounts don't rely on one hero video; they rely on a constant pipeline of fresh, iteratable creatives."
                    }
                ].map((item, idx) => (
                    <Reveal key={idx} delay={idx * 150}>
                        <div className="border-t border-[--color-ink] pt-6">
                            <h3 className="font-display text-2xl text-[--color-ink] mb-4">{item.title}</h3>
                            <p className="font-sans text-[--color-muted] leading-relaxed">{item.desc}</p>
                        </div>
                    </Reveal>
                ))}
            </div>
        </div>
    </section>
);

const DifferenceSection = () => (
    <section className="bg-white py-20 md:py-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal><h2 className="font-display text-4xl text-[--color-ink] mb-16">What Makes Us Different</h2></Reveal>

            <div className="space-y-12">
                {[
                    {
                        title: "We are not an influencer marketing agency.",
                        desc: "We don't sell reach, distribution, or follower counts. We sell high-quality, conversion-focused video assets that you own outright to run on your own ad accounts."
                    },
                    {
                        title: "We vet for performance, not aesthetics.",
                        desc: "Every creator on MakeUGC passes a test for camera presence, audio clarity, and ability to follow a direct-response brief. We reject 70% of applicants."
                    },
                    {
                        title: "We blend Human and AI.",
                        desc: "We don't view AI as a replacement for human creators. We use AI avatars to scale testing, rapidly iterate hooks, and lower the barrier to entry, while relying on humans for genuine emotion and trust."
                    }
                ].map((item, idx) => (
                    <Reveal key={idx} delay={idx * 150}>
                        <div className="flex flex-col md:flex-row gap-4 md:gap-12 group">
                            <h3 className="font-display text-2xl text-[--color-sage] md:w-1/3 shrink-0">{item.title}</h3>
                            <p className="font-sans text-lg text-[--color-ink] leading-relaxed md:w-2/3">{item.desc}</p>
                        </div>
                    </Reveal>
                ))}
            </div>
        </div>
    </section>
);

export default function AboutPage() {
    return (
        <main className="flex-grow flex flex-col">
            <section className="bg-[--color-ink] pt-40 pb-20 md:pt-48 md:pb-32 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <Reveal>
                        <h1 className="font-display text-5xl md:text-7xl tracking-tight leading-[1.05] mb-8">
                            Fixing the creative pipeline.
                        </h1>
                    </Reveal>
                    <Reveal delay={100}>
                        <p className="font-sans text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
                            Built in India to power the next generation of performance marketing for D2C and e-commerce brands globally.
                        </p>
                    </Reveal>
                </div>
            </section>

            <StorySection />
            <WhatWeBelieve />
            <DifferenceSection />

            <section className="bg-[--color-tan] py-24 text-center">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="font-display text-4xl text-white mb-8">Join the Team</h2>
                    <p className="font-sans text-lg text-white/80 mb-10">We&apos;re always looking for sharp creative strategists, editors, and growth marketers.</p>
                    <Button href="/careers" className="!bg-white !text-[--color-tan] hover:!bg-white/90">
                        View Open Roles <span className="ml-2 font-sans font-light">→</span>
                    </Button>
                </div>
            </section>
        </main>
    );
}
