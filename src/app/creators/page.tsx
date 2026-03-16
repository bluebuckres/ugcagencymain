import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";
import { Briefcase, CurrencyInr, HouseLine, Images, ChartLineUp } from "@phosphor-icons/react/dist/ssr";

export const metadata = {
    title: "Join as a UGC Creator — Get Paid to Create Brand Videos | MakeUGC India",
    description: "Join MakeUGC's vetted creator network. Get paid to make video ads for top D2C and e-commerce brands. No follower count required. Based in India.",
};

const WhyJoin = () => {
    const reasons = [
        { icon: <Briefcase size={28} />, title: "Consistent briefs", desc: "No cold pitching or DM-chasing" },
        { icon: <CurrencyInr size={28} />, title: "Clear pay per deliverable", desc: "Know what you earn before you shoot" },
        { icon: <HouseLine size={28} />, title: "Work from anywhere", desc: "Home studio, ring light, phone camera" },
        { icon: <Images size={28} />, title: "Build a portfolio", desc: "Real brand work, real usage rights" },
        { icon: <ChartLineUp size={28} />, title: "Creator dashboard", desc: "Manage briefs, track payments, message brands" },
    ];

    return (
        <section className="bg-white py-16 md:py-24 border-b border-[--color-border]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Reveal>
                    <h2 className="font-display text-4xl text-[--color-ink] mb-12 text-center">Why Join MakeUGC?</h2>
                </Reveal>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 justify-center">
                    {reasons.map((r, idx) => (
                        <Reveal key={idx} delay={idx * 100}>
                            <div className="bg-[--color-cream] p-6 rounded-2xl border border-[--color-border] h-full flex flex-col group hover:border-[--color-tan] transition-colors">
                                <div className="text-[--color-sage] mb-4 group-hover:text-[--color-tan] transition-colors bg-white w-12 h-12 rounded-full flex items-center justify-center shadow-sm">{r.icon}</div>
                                <h3 className="font-sans text-lg font-medium text-[--color-ink] mb-2">{r.title}</h3>
                                <p className="font-sans text-sm text-[--color-muted] leading-relaxed flex-grow">{r.desc}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

const WhoWeAreLookingFor = () => (
    <section className="bg-[--color-cream] py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
                <h2 className="font-display text-4xl text-[--color-ink] mb-12">Who We&apos;re Looking For</h2>
            </Reveal>
            <div className="bg-white rounded-2xl p-8 md:p-12 border border-[--color-border] shadow-sm">
                <p className="font-sans text-lg font-medium text-[--color-ink] mb-8">You&apos;re a fit if you are:</p>
                <ul className="space-y-6">
                    {[
                        "Comfortable on camera (no experience required — just confidence)",
                        "Based in India, 18 or older",
                        "Able to deliver content on agreed timelines",
                        "Fluent in English, Hindi, or any regional language",
                        "From any niche: beauty, fitness, food, lifestyle, tech, parenting, finance, travel"
                    ].map((item, idx) => (
                        <li key={idx} className="flex gap-4">
                            <span className="text-[--color-sage] font-sans font-light mt-0.5">→</span>
                            <span className="font-sans text-[--color-muted] leading-relaxed">{item}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </section>
);

const HowItWorksCreators = () => (
    <section className="bg-white py-16 md:py-24 border-t border-[--color-border]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal><h2 className="font-display text-4xl text-[--color-ink] mb-12 text-center">How It Works</h2></Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {[
                    { num: "01", title: "Apply", desc: "Submit a short intro video & details." },
                    { num: "02", title: "Get vetted", desc: "We review within 2–5 days." },
                    { num: "03", title: "Get briefs", desc: "Matched to briefs in your niche." },
                    { num: "04", title: "Deliver", desc: "Shoot, follow brief, and submit." },
                    { num: "05", title: "Get paid", desc: "Direct bank transfer. No middlemen." },
                ].map((step, idx) => (
                    <Reveal key={idx} delay={idx * 100}>
                        <div className="bg-[--color-cream] p-6 rounded-2xl border border-[--color-border] h-full relative overflow-hidden group">
                            <div className="absolute top-4 right-4 text-[--color-sage]/20 font-display text-6xl group-hover:text-[--color-tan]/20 transition-colors pointer-events-none">{step.num}</div>
                            <h4 className="font-display text-xl text-[--color-ink] mb-3 relative z-10 pt-4">{step.title}</h4>
                            <p className="font-sans text-sm text-[--color-muted] leading-relaxed relative z-10">{step.desc}</p>
                        </div>
                    </Reveal>
                ))}
            </div>
        </div>
    </section>
);

const EarningsCallout = () => (
    <section className="bg-[--color-tan] py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Reveal><h2 className="font-display text-4xl text-white mb-6">Creator Earnings</h2></Reveal>
            <Reveal delay={100}>
                <p className="font-sans text-lg text-white/80 max-w-2xl mx-auto leading-relaxed mb-16">
                    Creators on MakeUGC earn per video delivered. Rates depend on content type, usage rights, and brief complexity.
                </p>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 mb-16">
                <Reveal delay={200}>
                    <div className="bg-white/10 border border-white/20 p-8 rounded-2xl backdrop-blur-sm">
                        <div className="font-mono text-3xl md:text-4xl text-white mb-2 tracking-tight">₹500 <span className="text-2xl opacity-50">–</span> ₹5,000</div>
                        <div className="font-sans text-white/70 uppercase tracking-widest text-xs mt-4">per video (typical range)</div>
                    </div>
                </Reveal>
                <Reveal delay={300}>
                    <div className="bg-white/10 border border-white/20 p-8 rounded-2xl backdrop-blur-sm">
                        <div className="font-mono text-3xl md:text-4xl text-white mb-2 tracking-tight">₹50,000+</div>
                        <div className="font-sans text-white/70 uppercase tracking-widest text-xs mt-4">per month for top creators</div>
                    </div>
                </Reveal>
            </div>

            <Reveal delay={400}>
                <Button href="https://app.makeugc.in" className="!bg-white !text-[--color-tan] hover:!bg-white/90">
                    Apply as a Creator <span className="ml-2 font-sans font-light">→</span>
                </Button>
            </Reveal>
        </div>
    </section>
);

const CreatorFAQ = () => (
    <section id="faq" className="bg-white py-20 md:py-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
                <h2 className="font-display text-4xl text-[--color-ink] tracking-tight mb-16 text-center">FAQ</h2>
            </Reveal>
            <div className="space-y-2">
                <Accordion
                    question="Do I need a professional camera?"
                    answer="No. Most UGC is shot on smartphones. What matters is lighting, audio, and confidence on camera."
                />
                <Accordion
                    question="How often will I get briefs?"
                    answer="Depends on your niche and activity. Active creators in popular niches get 4–10 briefs a month."
                />
                <Accordion
                    question="How do I get paid?"
                    answer="Bank transfer within 7–10 days of approved delivery."
                />
                <Accordion
                    question="Can I work with multiple platforms?"
                    answer="Yes. We don't ask for exclusivity."
                />
                <Accordion
                    question="What if a brand asks for revisions?"
                    answer="Minor revisions are expected. Brief-specific guidelines reduce this significantly."
                />
                <Accordion
                    question="Do I get to keep the free products?"
                    answer="It depends on the brand. While you usually keep the products, some may request high-value items to be returned. Generally, products valued under ₹500 are yours to keep."
                />
                <Accordion
                    question="Do I have to edit the videos myself?"
                    answer="In most cases, we only require the raw/trimmed clips. We handle the final professional editing, captions, and music."
                />
                <Accordion
                    question="What languages are in demand?"
                    answer="English, Hindi, and regional languages like Tamil, Bengali, Punjabi, Malayalam, Telugu, Kannada, and Marathi are all highly requested by brands."
                />
            </div>
        </div>
    </section>
);

export default function CreatorsPage() {
    return (
        <main className="flex-grow flex flex-col">
            {/* Hero */}
            <section className="relative bg-[--color-cream] pt-40 pb-20 md:pt-48 md:pb-32 flex flex-col overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
                        <div className="max-w-2xl">
                            <Reveal>
                                <h1 className="font-display text-5xl md:text-7xl tracking-tight leading-[1.05] text-[--color-ink] mb-4">
                                    Get paid to create.
                                </h1>
                            </Reveal>
                            <Reveal delay={100}>
                                <p className="font-display italic text-2xl text-[--color-sage] mb-10 tracking-tight">
                                    No follower count required.
                                </p>
                            </Reveal>
                            <Reveal delay={200}>
                                <p className="font-sans text-lg md:text-xl text-[--color-muted] max-w-[55ch] leading-relaxed mb-12">
                                    MakeUGC connects real, camera-comfortable creators with brands that need authentic video content for paid ads. Work from home. On your schedule. Get paid per video.
                                </p>
                            </Reveal>
                            <Reveal delay={300}>
                                <Button href="https://app.makeugc.in" variant="primary">
                                    Apply as a Creator <span className="ml-2 font-sans font-light">→</span>
                                </Button>
                            </Reveal>
                        </div>

                        <div className="relative w-full h-[350px] md:h-[500px] lg:h-[600px] flex justify-center items-center">
                            <Reveal delay={400} className="w-full h-full">
                                <div className="relative w-full h-full">
                                    <Image src="/image/creator1.webp" alt="MakeUGC Creator" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain lg:object-right-bottom" priority />
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>

            <WhyJoin />
            <WhoWeAreLookingFor />
            <HowItWorksCreators />
            <EarningsCallout />
            <CreatorFAQ />
        </main>
    );
}
