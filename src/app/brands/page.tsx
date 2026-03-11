import React from "react";
import { Button } from "@/components/ui/Button";
import { Services } from "@/components/sections/Services";
import { Accordion } from "@/components/ui/Accordion";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Reveal } from "@/components/ui/Reveal";

export const metadata = {
    title: "UGC for Brands — Self-Serve, Managed & AI UGC Production | MakeUGC India",
    description: "MakeUGC helps D2C brands get high-converting UGC video ads. Self-serve creator access, fully managed production, or AI-generated UGC. Delivery in 48–72 hours.",
};

const ProcessWalkthrough = () => (
    <section className="bg-[--color-cream] py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
                <h2 className="font-display text-4xl md:text-5xl text-[--color-ink] tracking-tight leading-[1.1] mb-16 md:mb-20">
                    How it works for brands
                </h2>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 gap-y-16">
                {[
                    { step: "01", title: "Submit brief", icon: "→" },
                    { step: "02", title: "We scope & match", icon: "→" },
                    { step: "03", title: "Production begins", icon: "→" },
                    { step: "04", title: "Quality review", icon: "→" },
                    { step: "05", title: "Delivery + revise", icon: "→" },
                    { step: "06", title: "You run it", icon: "✓" }
                ].map((item, idx) => (
                    <Reveal key={idx} delay={idx * 100}>
                        <div className="relative group">
                            <span className="font-mono text-xs tracking-widest text-[--color-sage] mb-4 block">STEP {item.step}</span>
                            <h3 className="font-display text-2xl text-[--color-ink] mb-4 group-hover:text-[--color-tan] transition-colors">{item.title}</h3>
                            <div className="w-8 h-px bg-[--color-border] group-hover:w-16 transition-all duration-300"></div>
                        </div>
                    </Reveal>
                ))}
            </div>
        </div>
    </section>
);

const FormatsDelivered = () => (
    <section className="bg-white py-20 md:py-32 border-y border-[--color-border]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Reveal>
                <h2 className="font-sans font-medium text-sm text-[--color-sage] tracking-widest uppercase mb-12">
                    Formats Delivered
                </h2>
            </Reveal>
            <Reveal delay={100}>
                <div className="flex flex-wrap justify-center gap-4 md:gap-8 gap-y-6">
                    {["9:16 Reels", "1:1 Feed", "16:9 YouTube", "Raw Footage", "Voiceover-Only"].map((format, idx) => (
                        <span key={idx} className="font-display text-xl md:text-3xl text-[--color-ink] opacity-80 hover:opacity-100 hover:text-[--color-tan] transition-all duration-300">
                            {format}
                        </span>
                    ))}
                </div>
            </Reveal>
        </div>
    </section>
);

const BrandFAQ = () => (
    <section className="bg-white py-20 md:py-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
                <h2 className="font-display text-4xl text-[--color-ink] tracking-tight mb-16">Brand FAQ</h2>
            </Reveal>

            <div className="space-y-2">
                <Accordion
                    question="How fast can I get my first video?"
                    answer="Self-serve: 3–5 days. Managed & Studio: 5–7 days. AI UGC: 24–48 hours."
                />
                <Accordion
                    question="Do I own the content?"
                    answer="Yes. Full IP transfer and usage rights included in every plan."
                />
                <Accordion
                    question="Can I request revisions?"
                    answer="Yes. Managed and Studio plans include revision rounds. Self-serve is between you and the creator."
                />
                <Accordion
                    question="Do you work with agencies?"
                    answer="Yes. We have a white-label-ready model for agencies managing multiple brand clients."
                />
                <Accordion
                    question="What niches do your creators cover?"
                    answer="Beauty, fashion, fitness, food, tech, parenting, finance, travel, home, and more."
                />
            </div>
        </div>
    </section>
);

export default function BrandsPage() {
    return (
        <main className="flex-grow flex flex-col">
            {/* Hero */}
            <section className="relative bg-[--color-cream] pt-40 pb-20 md:pt-48 md:pb-32 flex flex-col overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
                    <div className="max-w-3xl">
                        <Reveal>
                            <h1 className="font-display text-5xl md:text-7xl tracking-tight leading-[1.05] text-[--color-ink] mb-8">
                                Performance UGC. <br /> Built for paid social.
                            </h1>
                        </Reveal>
                        <Reveal delay={100}>
                            <p className="font-sans text-lg md:text-xl text-[--color-muted] max-w-[55ch] leading-relaxed mb-12">
                                Four production models, one platform — from DIY creator access to full in-house studio.
                            </p>
                        </Reveal>
                        <Reveal delay={200}>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button href="/contact" variant="primary">Start a Project <span className="ml-2 font-sans font-light">→</span></Button>
                                <Button href="/pricing" variant="secondary">See Pricing <span className="ml-2 font-sans font-light">→</span></Button>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* Services component imported directly matches the 'Expanded' section in blueprint */}
            <Services />

            {/* Process Walkthrough */}
            <ProcessWalkthrough />

            {/* Formats Delivered Row */}
            <FormatsDelivered />

            {/* FAQ */}
            <BrandFAQ />

            {/* Final CTA */}
            <div className="bg-[--color-tan]">
                <section className="py-24 md:py-32 max-w-4xl mx-auto px-4 text-center">
                    <h2 className="font-display text-4xl md:text-5xl lg:text-5xl text-white tracking-tight mb-10">
                        Ready to scale your performance creative?
                    </h2>

                    <Button
                        href="/contact"
                        className="w-full sm:w-auto !bg-white !text-[--color-tan] hover:!bg-white/90"
                    >
                        Start Your First Project <span className="ml-2 font-sans font-light">→</span>
                    </Button>
                </section>
            </div>

        </main>
    );
}
