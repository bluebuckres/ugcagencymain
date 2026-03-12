import React from 'react';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { Robot, Translate, Clock, Repeat } from "@phosphor-icons/react/dist/ssr";

export const metadata = {
    title: "AI UGC — Generate Video Ads in 24 Hours | MakeUGC India",
    description: "Scale your ad testing with AI-generated UGC. Human creative direction, AI execution. 50 creatives in 24 hours. Multilingual lip-syncing available.",
};

const FeatureHighlight = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
    <div className="flex gap-6 group p-8 rounded-2xl border border-[--color-border] bg-white hover:shadow-[0_8px_32px_-8px_rgba(8,105,114,0.15)] transition-all">
        <div className="text-[--color-tan] shrink-0 mt-1 p-3 bg-[--color-cream] rounded-xl">{icon}</div>
        <div>
            <h3 className="font-sans text-xl font-medium text-[--color-ink] mb-3">{title}</h3>
            <p className="font-sans text-[--color-muted] leading-relaxed">{desc}</p>
        </div>
    </div>
);

const HumanPlusAIDetail = () => (
    <section className="bg-[--color-ink] rounded-[2.5rem] md:rounded-[4rem] mx-4 sm:mx-6 lg:mx-8 my-16 md:my-24 py-20 md:py-32 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div>
                    <Reveal>
                        <h2 className="font-display text-4xl md:text-5xl tracking-tight mb-8">
                            AI execution.<br />
                            <span className="text-[--color-tan]">Human direction.</span>
                        </h2>
                    </Reveal>
                    <Reveal delay={100}>
                        <p className="font-sans text-lg text-white/80 leading-relaxed mb-6">
                            Pure AI looks like AI. That&apos;s why we don&apos;t just hit &quot;generate&quot;.
                        </p>
                        <p className="font-sans text-lg text-white/80 leading-relaxed mb-10">
                            Our creative strategists write the hooks, pick the avatars, direct the tonality, and edit the final cut. The AI just replaces the camera and the studio — not the creative brain.
                        </p>
                    </Reveal>
                    <Reveal delay={200}>
                        <ul className="space-y-4">
                            {[
                                "Strategist-written scripts (tested for conversion)",
                                "Human-selected AI avatars based on target demo",
                                "Manual lip-sync and expression tuning",
                                "Pro editing, captioning, and sound design"
                            ].map((item, idx) => (
                                <li key={idx} className="flex gap-4">
                                    <span className="text-[--color-tan] font-sans font-light mt-0.5">→</span>
                                    <span className="font-sans text-white/90 leading-relaxed">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </Reveal>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 backdrop-blur relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[--color-tan] opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="relative z-10 flex flex-col gap-8">
                        <div>
                            <div className="font-mono text-xs tracking-widest text-[--color-tan] mb-2 uppercase">Step 1</div>
                            <div className="font-display text-xl text-white">Human Strategist</div>
                            <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent mt-4 ml-2"></div>
                        </div>
                        <div>
                            <div className="font-mono text-xs tracking-widest text-[--color-tan] mb-2 uppercase">Step 2</div>
                            <div className="font-display text-xl text-white">AI Generation</div>
                            <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent mt-4 ml-2"></div>
                        </div>
                        <div>
                            <div className="font-mono text-xs tracking-widest text-[--color-tan] mb-2 uppercase">Step 3</div>
                            <div className="font-display text-xl text-white">Human Editor</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export default function AIUGCPage() {
    return (
        <main className="flex-grow flex flex-col items-center">
            {/* Hero */}
            <section className="relative bg-[--color-cream] pt-40 pb-20 md:pt-48 md:pb-32 flex flex-col overflow-hidden w-full items-center text-center">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
                    <Reveal>
                        <h1 className="font-display text-5xl md:text-7xl tracking-tight leading-[1.05] text-[--color-ink] mb-6">
                            Infinite scale. Zero shoot days.
                        </h1>
                    </Reveal>
                    <Reveal delay={100}>
                        <p className="font-sans text-lg md:text-xl text-[--color-muted] leading-relaxed mb-12 max-w-2xl mx-auto">
                            Generate hyper-realistic UGC ads with AI avatars. Test 30 hooks in the time it takes an agency to reply to your email.
                        </p>
                    </Reveal>
                    <Reveal delay={200}>
                        <Button href="/contact" variant="primary">
                            Request AI Demo <span className="ml-2 font-sans font-light">→</span>
                        </Button>
                    </Reveal>
                </div>
            </section>

            <section className="bg-[--color-cream] py-10 md:py-20 w-full border-b border-[--color-border]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <FeatureHighlight icon={<Robot size={24} />} title="Hyper-Realistic Avatars" desc="Digital twins that look, move, and emote like real people." />
                        <FeatureHighlight icon={<Translate size={24} />} title="Multilingual" desc="Translate one ad into 15+ languages with perfect lip-syncing." />
                        <FeatureHighlight icon={<Clock size={24} />} title="24-Hour Turnaround" desc="From brief submission to final rendered file in a day." />
                        <FeatureHighlight icon={<Repeat size={24} />} title="Variant Testing" desc="Change the hook, offer, or CTA without reshooting." />
                    </div>
                </div>
            </section>

            <HumanPlusAIDetail />

            {/* Comparison Segment */}
            <section className="bg-white py-20 md:py-32 w-full">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Reveal>
                        <h2 className="font-display text-4xl text-[--color-ink] tracking-tight mb-16 text-center">When to use AI vs Human</h2>
                    </Reveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[--color-border] border border-[--color-border] rounded-3xl overflow-hidden">

                        <div className="bg-white p-8 md:p-12">
                            <h3 className="font-display text-3xl text-[--color-ink] mb-8">Human UGC</h3>
                            <ul className="space-y-6">
                                {[
                                    "Physical product demonstrations (textures, smells, unboxing)",
                                    "Vlogs and 'day in the life' formats",
                                    "Authentic, unscripted product reactions",
                                    "Building long-term creator partnerships"
                                ].map((item, idx) => (
                                    <li key={idx} className="flex gap-4">
                                        <span className="text-[--color-tan] font-sans font-medium mt-0.5">✓</span>
                                        <span className="font-sans text-[--color-muted] leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-[--color-cream] p-8 md:p-12">
                            <h3 className="font-display text-3xl text-[--color-ink] mb-8">AI UGC</h3>
                            <ul className="space-y-6">
                                {[
                                    "Rapid hook testing (A/B testing 10 hooks with same body)",
                                    "Digital products, SaaS, and App installs",
                                    "Translating top-performing ads for global markets",
                                    "Tight deadlines (Need creatives live tomorrow)"
                                ].map((item, idx) => (
                                    <li key={idx} className="flex gap-4">
                                        <span className="text-[--color-sage] font-sans font-medium mt-0.5">✓</span>
                                        <span className="font-sans text-[--color-ink] leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>
                </div>
            </section>
        </main>
    );
}
