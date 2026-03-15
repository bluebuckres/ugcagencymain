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

export function HowItWorksInteractive() {
    const [tab, setTab] = useState<'brands' | 'creators'>('brands');

    return (
        <>
            <div className="flex max-w-xl mx-auto mb-16">
                <FlowTab active={tab === 'brands'} onClick={() => setTab('brands')} text="For Brands" />
                <FlowTab active={tab === 'creators'} onClick={() => setTab('creators')} text="For Creators" />
            </div>

            <div className="text-left bg-white p-8 md:p-16 rounded-3xl border border-[--color-border] shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[--color-tan] opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                <TimelineSteps steps={tab === 'brands' ? BrandSteps : CreatorSteps} />
            </div>
        </>
    );
}
