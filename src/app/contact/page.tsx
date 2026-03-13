import React from 'react';
import { NeetoCalEmbed } from '@/components/sections/ContactForm';
import { Reveal } from '@/components/ui/Reveal';
import { EnvelopeSimple, Phone } from "@phosphor-icons/react/dist/ssr";

export const metadata = {
    title: "Schedule a Call | MakeUGC",
    description: "Book a call with the MakeUGC team. Discuss your UGC strategy, get a demo of our platform, or plan your next campaign.",
};

export default function ContactPage() {
    return (
        <main className="flex-grow flex flex-col bg-[--color-cream]">
            {/* Hero header */}
            <section className="pt-36 pb-10 md:pt-44 md:pb-14 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full text-center">
                <Reveal>
                    <h1 className="font-display text-4xl md:text-6xl lg:text-7xl tracking-tight leading-[1.05] text-[--color-ink] mb-4">
                        Schedule a Call
                    </h1>
                </Reveal>
                <Reveal delay={100}>
                    <p className="font-sans text-lg md:text-xl text-[--color-muted] leading-relaxed max-w-xl mx-auto">
                        Pick a time that works for you. We&apos;ll discuss your brand goals, walk you through the platform, and craft a plan.
                    </p>
                </Reveal>
            </section>

            {/* NeetoCal Embed — no Reveal wrapper; skeleton handles perceived load */}
            <section className="pb-16 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
                <div className="bg-white rounded-3xl border border-[--color-border] shadow-sm overflow-hidden p-4 md:p-8">
                    <NeetoCalEmbed />
                </div>
            </section>

            {/* Quick contact info cards */}
            <section className="pb-20 md:pb-28 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Reveal delay={300}>
                        <div className="bg-white p-6 rounded-2xl border border-[--color-border] flex items-start gap-4">
                            <div className="text-[--color-tan] shrink-0 mt-0.5">
                                <EnvelopeSimple size={28} />
                            </div>
                            <div>
                                <h3 className="font-display text-lg text-[--color-ink] mb-1">Email Us</h3>
                                <p className="font-sans text-sm text-[--color-muted] mb-2">For queries, partnerships &amp; press.</p>
                                <a href="mailto:connect@makeugc.in" className="font-sans text-sm font-medium text-[--color-sage] hover:underline underline-offset-4">
                                    connect@makeugc.in <span className="ml-1">→</span>
                                </a>
                            </div>
                        </div>
                    </Reveal>
                    <Reveal delay={400}>
                        <div className="bg-white p-6 rounded-2xl border border-[--color-border] flex items-start gap-4">
                            <div className="text-[--color-tan] shrink-0 mt-0.5">
                                <Phone size={28} />
                            </div>
                            <div>
                                <h3 className="font-display text-lg text-[--color-ink] mb-1">Call Us</h3>
                                <p className="font-sans text-sm text-[--color-muted] mb-2">Mon–Sat 10AM–7PM IST</p>
                                <a href="tel:+919239161632" className="font-sans text-sm font-medium text-[--color-sage] hover:underline underline-offset-4">
                                    +91 92391 61632 <span className="ml-1">→</span>
                                </a>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>
        </main>
    );
}
