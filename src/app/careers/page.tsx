import React from "react";
import { Button } from "@/components/ui/Button";

export const metadata = {
    title: "Careers | MakeUGC India",
    description: "Join MakeUGC. We are hiring creative strategists, video editors, and growth marketers.",
};

const openRoles = [
    {
        title: "Creative Strategist (Performance Video)",
        location: "Remote / Kolkata",
        type: "Full-Time",
        desc: "Write high-converting direct-response hooks and body copy for UGC and AI-generated video ads across beauty, fitness, and D2C brands. Must understand Meta Ads Manager basics."
    },
    {
        title: "Video Editor (Short-Form / Ads)",
        location: "Remote",
        type: "Full-Time / Contract",
        desc: "Edit raw UGC footage into fast-paced, caption-heavy 9:16 ads. Must know Premiere Pro/CapCut like the back of your hand and have a reel of paid social examples."
    },
    {
        title: "Creator Partnerships Manager",
        location: "Remote / Kolkata",
        type: "Full-Time",
        desc: "Vet incoming creator applications, onboard talent, and ensure brief compliance. You are the bridge between the creators and our brand clients."
    },
    {
        title: "Brand Partnerships Manager (BDE)",
        location: "On-Site: Kolkata",
        type: "Full-Time",
        desc: "Manage relationships with Brands/Clients/Agencies and ensure timely delivery of UGC content, and outreach to new brands/clients/agencies."
    }
];

export default function CareersPage() {
    return (
        <main className="flex-grow flex flex-col bg-white pt-40 pb-32">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <h1 className="font-display text-5xl md:text-6xl text-[--color-ink] tracking-tight mb-6">Work intimately with performance creative.</h1>
                <p className="font-sans text-xl text-[--color-muted] leading-relaxed mb-16 max-w-2xl">
                    We&apos;re building the infrastructure that powers how D2C brands scale on paid social.
                </p>

                <h2 className="font-display text-3xl text-[--color-ink] mb-8 border-b border-[--color-border] pb-4">Open Roles</h2>

                <div className="space-y-6">
                    {openRoles.map((role, idx) => (
                        <div key={idx} className="p-8 rounded-2xl border border-[--color-border] bg-white flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-sm transition-shadow">
                            <div className="md:w-3/4">
                                <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-[--color-sage] mb-3">
                                    <span>{role.location}</span>
                                    <span>•</span>
                                    <span>{role.type}</span>
                                </div>
                                <h3 className="font-display text-2xl text-[--color-ink] mb-3">{role.title}</h3>
                                <p className="font-sans text-[--color-muted] leading-relaxed">{role.desc}</p>
                            </div>
                            <div className="md:w-1/4 shrink-0 text-left md:text-right">
                                <Button href={`mailto:recruitment@makeugc.in?subject=Application: ${role.title}`} variant="secondary">Apply Now</Button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 bg-[--color-cream] p-10 rounded-2xl border border-[--color-border] text-center">
                    <h3 className="font-display text-2xl text-[--color-ink] mb-4">Don&apos;t see a fit?</h3>
                    <p className="font-sans text-[--color-muted] mb-6">Send your portfolio to <a href="mailto:supriyo@makeugc.in" className="text-[--color-sage] underline underline-offset-4">supriyo@makeugc.in</a> anyway. We&apos;re always looking for talent.</p>
                </div>
            </div>
        </main>
    );
}
