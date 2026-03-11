import React from 'react';
import Link from 'next/link';
import { Reveal } from '../ui/Reveal';

export function HowItWorks() {
    const steps = [
        {
            num: "01",
            title: "Share your brief",
            desc: "Tell us your product, audience, and goal. Upload a reference or let us script it."
        },
        {
            num: "02",
            title: "We match & produce",
            desc: "Right creator, right script, right edit — delivered on time."
        },
        {
            num: "03",
            title: "You run and scale",
            desc: "Receive platform-ready files. Test hooks. Scale what converts."
        }
    ];

    return (
        <section className="bg-[--color-cream] py-20 md:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <Reveal>
                    <div className="mb-16 md:mb-24">
                        <h2 className="font-display text-4xl md:text-5xl text-[--color-ink] tracking-tight leading-[1.1]">
                            Simple. Fast. Repeatable.
                        </h2>
                    </div>
                </Reveal>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 mb-16">
                    {steps.map((step, idx) => (
                        <Reveal key={idx} delay={idx * 150}>
                            <div className="relative">
                                <span className="absolute -top-12 -left-4 font-display text-8xl text-[--color-tan] opacity-10 leading-none select-none tracking-tighter">
                                    {step.num}
                                </span>
                                <div className="relative z-10">
                                    <div className="w-8 h-px bg-[--color-border] mb-6"></div>
                                    <h3 className="font-display text-2xl text-[--color-ink] font-medium mb-4">{step.title}</h3>
                                    <p className="font-sans text-base text-[--color-muted] leading-relaxed max-w-[35ch]">
                                        {step.desc}
                                    </p>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>

                <Reveal delay={450}>
                    <Link href="/how-it-works" className="inline-flex items-center font-sans text-sm font-medium text-[--color-sage] hover:underline underline-offset-4 transition-all">
                        See How It Works in Detail <span className="ml-1">→</span>
                    </Link>
                </Reveal>

            </div>
        </section>
    );
}
