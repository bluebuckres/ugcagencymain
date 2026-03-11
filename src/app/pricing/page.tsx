import React from 'react';
import { Button } from '@/components/ui/Button';
import { Accordion } from '@/components/ui/Accordion';
import { Reveal } from '@/components/ui/Reveal';
import { Check, X } from "@phosphor-icons/react/dist/ssr";

export const metadata = {
    title: "UGC Pricing — MakeUGC | Transparent Plans for Every Stage of Growth",
    description: "Simple, transparent UGC pricing for D2C brands. From self-serve creator access to full studio production and AI UGC. No hidden fees.",
};

const PricingCards = () => {
    const plans = [
        {
            name: "Self-Serve",
            badge: "STARTER",
            price: "₹2,999",
            pricePrefix: "Starts at",
            desc: "Direct access to our vetted creator network. You manage the creative.",
            features: [
                { text: "Creator access", included: true },
                { text: "Delivery in 5–7 days", included: true },
                { text: "Editing available as add-on", included: true },
                { text: "Script writing", included: false },
                { text: "Creator supervision", included: false },
                { text: "Dedicated account manager", included: false },
            ] as { text: string; included: boolean; bold?: boolean }[],
            buttonText: "Get Started",
            variant: "secondary" as const,
            highlight: false,
        },
        {
            name: "Managed",
            badge: "GROWTH",
            price: "₹5,999",
            pricePrefix: "Starts at",
            desc: "We handle the scripting, supervision, and editing. You get ready-to-run ads.",
            features: [
                { text: "Everything in Starter, plus:", included: true, bold: true },
                { text: "Professional script writing", included: true },
                { text: "Creator supervision", included: true },
                { text: "Professional video editing", included: true },
                { text: "Delivery in 5–7 days", included: true },
                { text: "Dedicated account manager", included: false },
            ] as { text: string; included: boolean; bold?: boolean }[],
            buttonText: "Get Started",
            variant: "primary" as const,
            highlight: true,
        },
        {
            name: "Studio",
            badge: "SCALE",
            price: "₹9,999",
            pricePrefix: "Starts at",
            desc: "Full production pipeline for high-volume, enterprise-grade campaigns.",
            features: [
                { text: "Everything in Managed, plus:", included: true, bold: true },
                { text: "Dedicated account manager", included: true },
                { text: "Custom SLA & delivery times", included: true },
                { text: "Premium creator tier access", included: true },
                { text: "Advanced hook variations", included: true },
                { text: "Priority support", included: true },
            ] as { text: string; included: boolean; bold?: boolean }[],
            buttonText: "Get Started",
            variant: "secondary" as const,
            highlight: false,
        },
        {
            name: "AI UGC",
            badge: "NEW",
            price: "₹2,999",
            pricePrefix: "Starts at",
            desc: "Hyper-realistic AI avatars reading our high-converting scripts.",
            features: [
                { text: "AI-generated avatars", included: true },
                { text: "Human-directed acting", included: true },
                { text: "Professional script writing", included: true },
                { text: "Rapid 24–48 hr delivery", included: true },
                { text: "Multilingual capabilities", included: true },
                { text: "Editing included", included: true },
            ] as { text: string; included: boolean; bold?: boolean }[],
            buttonText: "Get Started",
            variant: "secondary" as const,
            highlight: false,
            bgClass: "bg-[--color-ink] text-white",
            borderClass: "border-transparent",
        }
    ];

    return (
        <section className="bg-white py-12 md:py-24 border-b border-[--color-border]">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8 items-stretch pt-8">
                    {plans.map((plan, idx) => (
                        <div
                            key={idx}
                            className={`relative flex flex-col p-8 rounded-3xl border ${plan.borderClass || 'border-[--color-border]'} ${plan.bgClass || 'bg-[--color-cream]'} ${plan.highlight ? 'ring-2 ring-[--color-tan] shadow-xl md:-translate-y-4' : ''} transition-transform duration-300 hover:-translate-y-2`}
                        >
                            {plan.highlight && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[--color-tan] text-white font-mono text-xs uppercase tracking-widest py-1.5 px-4 rounded-full">
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-8 flex-grow-0">
                                <div className={`font-mono text-xs tracking-widest uppercase mb-3 ${plan.bgClass ? 'text-[--color-tan]' : 'text-[--color-sage]'}`}>{plan.badge}</div>
                                <h3 className="font-display text-3xl mb-4">{plan.name}</h3>
                                <p className={`font-sans text-sm h-16 ${plan.bgClass ? 'text-white/70' : 'text-[--color-muted]'}`}>{plan.desc}</p>
                            </div>

                            <div className="mb-8 flex-grow-0">
                                <div className={`font-sans text-sm mb-1 ${plan.bgClass ? 'text-white/60' : 'text-[--color-muted]'}`}>{plan.pricePrefix}</div>
                                <div className="font-mono text-4xl tracking-tight">{plan.price}</div>
                            </div>

                            <div className="flex-grow">
                                <ul className="space-y-4 mb-8">
                                    {plan.features.map((feature, fIdx) => (
                                        <li key={fIdx} className="flex items-start gap-3">
                                            <div className="mt-0.5 shrink-0">
                                                {feature.included ? (
                                                    <Check size={18} className={plan.bgClass ? 'text-[--color-sage]' : 'text-[--color-tan]'} weight="bold" />
                                                ) : (
                                                    <X size={18} className={plan.bgClass ? 'text-white/20' : 'text-[--color-border]'} />
                                                )}
                                            </div>
                                            <span className={`font-sans text-sm leading-snug ${plan.bgClass ? (feature.included ? 'text-white/90' : 'text-white/40') : (feature.included ? 'text-[--color-ink]' : 'text-[--color-muted]/60')} ${feature.bold ? 'font-semibold' : ''}`}>
                                                {feature.text}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mt-auto">
                                <Button
                                    href="/contact"
                                    variant={plan.variant}
                                    className={`w-full ${plan.bgClass && plan.variant === 'secondary' ? '!border-white/20 !text-white hover:!bg-white/10' : ''}`}
                                >
                                    {plan.buttonText}
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const PricingFAQ = () => (
    <section className="bg-[--color-cream] py-20 md:py-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
                <h2 className="font-display text-4xl text-[--color-ink] tracking-tight mb-16 text-center">Frequently Asked Questions</h2>
            </Reveal>
            <div className="space-y-2">
                <Accordion
                    question="Is there a minimum order quantity?"
                    answer="Self-serve has no minimum. Managed and Studio plans are designed for slightly higher volumes and rely on scoped commitments to ensure dedicated production resources. Contact us for specifics."
                />
                <Accordion
                    question="How does the revision process work?"
                    answer="Under our Managed and Studio plans, we include one free round of minor revisions per video (e.g., text overlays, pacing adjustments). If a creator explicitly did not follow the brief, a reshoot is provided free of charge."
                />
                <Accordion
                    question="Do prices include full commercial usage rights?"
                    answer="Yes. Every video delivered across all plans automatically includes perpetual, worldwide commercial usage rights so you can run them immediately as paid ads."
                />
                <Accordion
                    question="Can we pick specific creators ourselves?"
                    answer="With the Self-Serve plan, you have direct control over viewing and picking creators. In the Managed and Studio tiers, our creative strategists match the best-performing creators to your brand's demographic target for higher conversions."
                />
                <Accordion
                    question="Are raw video files included in the delivery?"
                    answer="Standard deliveries include the final edited, ready-to-run ads. Raw, unedited footage (b-roll, bloopers, full takes) can be provided for an additional fee so your internal team can remix them later."
                />
                <Accordion
                    question="How fast is the turnaround time?"
                    answer="Self-Serve and Managed projects generally deliver final edited videos within 5–7 days following product receipt by the creator. AI UGC guarantees an ultra-fast 24–48 hour turnaround after script approval."
                />
                <Accordion
                    question="What payment methods do you accept?"
                    answer="We accept standard corporate bank transfers, NEFT/RTGS, UPI, and all major credit cards via our secure online payment gateway."
                />
            </div>
        </div>
    </section>
);

export default function PricingPage() {
    return (
        <main className="flex-grow flex flex-col">
            <section className="bg-[--color-cream] pt-40 pb-12 md:pt-48 md:pb-16 text-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Reveal>
                        <h1 className="font-display text-5xl md:text-7xl tracking-tight leading-[1.05] text-[--color-ink] mb-6 max-w-4xl mx-auto">
                            Straightforward pricing.<br />No surprises.
                        </h1>
                    </Reveal>
                    <Reveal delay={100}>
                        <p className="font-sans text-lg md:text-xl text-[--color-muted] max-w-[65ch] mx-auto leading-relaxed">
                            Whether you&apos;re testing UGC for the first time or running 50 creatives a month — there&apos;s a flexible plan designed for your growth stage.
                        </p>
                    </Reveal>
                </div>
            </section>

            <PricingCards />
            <PricingFAQ />
        </main>
    );
}
