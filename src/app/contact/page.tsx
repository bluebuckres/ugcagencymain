import React, { Suspense } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import { EnvelopeSimple, Phone, Briefcase, CalendarCheck, ArrowRight, Lightning, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { ContactServiceBanner } from '@/components/sections/ContactServiceBanner';
import { BookCallButton } from '@/components/sections/BookCallButton';

export const metadata: Metadata = {
    title: "Get Started",
    description: "Submit a creative brief on the MakeUGC dashboard or book a strategy call. Whether you're a brand or an agency, launch your first UGC campaign in minutes.",
    alternates: {
        canonical: "https://www.makeugc.in/contact",
    },
};

export default function ContactPage() {
    return (
        <main className="flex-grow flex flex-col">
            {/* ─── Hero ─── */}
            <section className="bg-[--color-cream] pt-36 pb-14 md:pt-44 md:pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <Reveal>
                        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl tracking-tight leading-[1.05] text-[--color-ink] mb-5">
                            Let&apos;s build something<br className="hidden md:inline" /> that converts.
                        </h1>
                    </Reveal>
                    <Reveal delay={100}>
                        <p className="font-sans text-lg md:text-xl text-[--color-muted] leading-relaxed max-w-2xl mx-auto mb-8">
                            Transform your performance marketing with authentic UGC. Whether you&apos;re an ambitious brand or a scaling agency, we provide the infrastructure to launch winning campaigns in 48 hours.
                        </p>
                    </Reveal>
                    <Reveal delay={150}>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="/how-it-works" className="px-6 py-3 rounded-xl border-2 border-[--color-tan] text-[--color-ink] font-sans font-medium hover:bg-[--color-tan] hover:text-white transition-colors w-full sm:w-auto">
                                How it works
                            </Link>
                            <Link href="/pricing" className="px-6 py-3 rounded-xl border-2 border-[--color-border] text-[--color-muted] font-sans font-medium hover:border-[--color-tan] hover:text-[--color-tan] transition-colors w-full sm:w-auto">
                                View Pricing
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ─── Service Banner (from search params) ─── */}
            <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full -mt-2 mb-4">
                <Suspense fallback={null}>
                    <ContactServiceBanner />
                </Suspense>
            </section>

            {/* ─── Dual CTA Cards ─── */}
            <section className="bg-[--color-cream] pb-16 md:pb-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">

                    {/* Card 1 — Submit a Brief */}
                    <Reveal delay={150}>
                        <div className="bg-white rounded-3xl border border-[--color-border] p-8 md:p-10 flex flex-col h-full group hover:shadow-[0_8px_40px_-12px_rgba(8,105,114,0.15)] hover:-translate-y-1 transition-all duration-300">
                            <div className="w-14 h-14 rounded-2xl bg-[--color-cream] border border-[--color-border] flex items-center justify-center mb-6 group-hover:bg-[--color-tan] group-hover:border-[--color-tan] transition-colors">
                                <Briefcase size={28} className="text-[--color-tan] group-hover:text-white transition-colors" />
                            </div>

                            <h2 className="font-display text-2xl md:text-3xl text-[--color-ink] mb-3">
                                Submit a Brief
                            </h2>

                            <p className="font-sans text-[--color-muted] leading-relaxed mb-6 flex-grow">
                                Ready to scale? Input your campaign objectives, target audience, and creative hooks. Our platform matches you with the perfect creators to deliver high-ROAS assets.
                            </p>

                            <ul className="space-y-3 mb-8">
                                {[
                                    "Direct dashboard access for Brands",
                                    "Multi-client support for Scaling Agencies",
                                    "Launch a campaign in under 5 minutes",
                                ].map((item) => (
                                    <li key={item} className="flex items-start gap-3">
                                        <CheckCircle size={18} weight="fill" className="text-[--color-tan] mt-0.5 shrink-0" />
                                        <span className="font-sans text-sm text-[--color-ink]">{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href="https://app.makeugc.in"
                                className="inline-flex items-center justify-center gap-2 bg-[--color-ink] text-white font-sans font-medium px-6 py-4 rounded-2xl hover:bg-[--color-tan] transition-colors w-full text-center"
                            >
                                <Lightning size={20} weight="fill" />
                                Open Dashboard
                                <ArrowRight size={18} className="ml-auto" />
                            </Link>

                            <div className="mt-8 pt-6 border-t border-[--color-border] flex items-center justify-between">
                                <span className="font-sans text-[10px] uppercase tracking-widest text-[--color-muted] font-bold">Scaling an Agency?</span>
                                <Link href="mailto:partners@makeugc.in" className="font-sans text-xs text-[--color-tan] font-bold hover:underline">Partner with us &rarr;</Link>
                            </div>
                        </div>
                    </Reveal>

                    {/* Card 2 — Book a Strategy Call */}
                    <Reveal delay={250}>
                        <div className="bg-white rounded-3xl border border-[--color-border] p-8 md:p-10 flex flex-col h-full group hover:shadow-[0_8px_40px_-12px_rgba(8,105,114,0.15)] hover:-translate-y-1 transition-all duration-300">
                            <div className="w-14 h-14 rounded-2xl bg-[--color-cream] border border-[--color-border] flex items-center justify-center mb-6 group-hover:bg-[--color-tan] group-hover:border-[--color-tan] transition-colors">
                                <CalendarCheck size={28} className="text-[--color-tan] group-hover:text-white transition-colors" />
                            </div>

                            <h2 className="font-display text-2xl md:text-3xl text-[--color-ink] mb-3">
                                Book a Strategy Call
                            </h2>

                            <p className="font-sans text-[--color-muted] leading-relaxed mb-6 flex-grow">
                                Prefer a conversation? Pick a time that works. We&apos;ll walk you through the platform, discuss your creative goals, and craft a performance plan.
                            </p>

                            <ul className="space-y-3 mb-8">
                                {[
                                    "15-min deep dive into your funnel",
                                    "Benchmark against top-performing ads",
                                    "Custom high-volume creative strategy",
                                ].map((item) => (
                                    <li key={item} className="flex items-start gap-3">
                                        <CheckCircle size={18} weight="fill" className="text-[--color-tan] mt-0.5 shrink-0" />
                                        <span className="font-sans text-sm text-[--color-ink]">{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <BookCallButton
                                className="inline-flex items-center justify-center gap-2 bg-[--color-cream] text-[--color-ink] border border-[--color-border] font-sans font-medium px-6 py-4 rounded-2xl hover:bg-[--color-tan] hover:text-white hover:border-[--color-tan] transition-colors w-full text-center cursor-pointer"
                            >
                                <CalendarCheck size={20} weight="fill" />
                                Pick a Time
                                <ArrowRight size={18} className="ml-auto" />
                            </BookCallButton>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ─── Social Proof Strip ─── */}
            <section className="bg-white border-y border-[--color-border] py-10 md:py-14 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-6 md:gap-16 text-center">
                    <Reveal>
                        <div>
                            <div className="font-display text-3xl md:text-4xl text-[--color-ink]">200+</div>
                            <div className="font-sans text-sm text-[--color-muted] mt-1">Brands launched</div>
                        </div>
                    </Reveal>
                    <div className="hidden md:block w-px h-12 bg-[--color-border]" />
                    <Reveal delay={100}>
                        <div>
                            <div className="font-display text-3xl md:text-4xl text-[--color-ink]">48 hrs</div>
                            <div className="font-sans text-sm text-[--color-muted] mt-1">Average delivery</div>
                        </div>
                    </Reveal>
                    <div className="hidden md:block w-px h-12 bg-[--color-border]" />
                    <Reveal delay={200}>
                        <div>
                            <div className="font-display text-3xl md:text-4xl text-[--color-ink]">1,200+</div>
                            <div className="font-sans text-sm text-[--color-muted] mt-1">Vetted creators</div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ─── Quick Contact Info ─── */}
            <section className="bg-[--color-cream] py-16 md:py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <Reveal>
                        <h2 className="font-display text-3xl text-[--color-ink] text-center mb-10">Other ways to reach us</h2>
                    </Reveal>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Reveal delay={100}>
                            <div className="bg-white p-6 rounded-2xl border border-[--color-border] flex items-start gap-4 hover:shadow-sm transition-shadow">
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
                        <Reveal delay={200}>
                            <div className="bg-white p-6 rounded-2xl border border-[--color-border] flex items-start gap-4 hover:shadow-sm transition-shadow">
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
                </div>
            </section>
        </main>
    );
}
