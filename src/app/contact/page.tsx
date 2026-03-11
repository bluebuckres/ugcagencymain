import React from 'react';
import { ContactForm } from '@/components/sections/ContactForm';
import { Reveal } from '@/components/ui/Reveal';
import { EnvelopeSimple, BuildingOffice, Headset } from "@phosphor-icons/react/dist/ssr";

export const metadata = {
    title: "Contact MakeUGC | Start Your Next UGC Project",
    description: "Get in touch with the MakeUGC team. Book a demo, request a quote, or ask about our creator network. Based in India.",
};

const ContactCard = ({ icon, title, desc, linkText, href }: { icon: React.ReactNode, title: string, desc: string, linkText?: string, href?: string }) => (
    <div className="bg-white p-8 rounded-2xl border border-[--color-border] flex flex-col h-full">
        <div className="text-[--color-tan] mb-6">{icon}</div>
        <h3 className="font-display text-2xl text-[--color-ink] mb-3">{title}</h3>
        <p className="font-sans text-[--color-muted] leading-relaxed flex-grow mb-6">{desc}</p>

        {href && (
            <a href={href} className="font-sans font-medium text-[--color-sage] hover:underline underline-offset-4 mt-auto">
                {linkText} <span className="ml-1">→</span>
            </a>
        )}
    </div>
);

export default function ContactPage() {
    return (
        <main className="flex-grow flex flex-col bg-[--color-cream]">
            <section className="pt-40 pb-20 md:pt-48 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-24">

                    {/* Left side text and cards */}
                    <div className="flex flex-col">
                        <Reveal>
                            <h1 className="font-display text-5xl md:text-7xl tracking-tight leading-[1.05] text-[--color-ink] mb-6">
                                Let&apos;s talk performance.
                            </h1>
                        </Reveal>
                        <Reveal delay={100}>
                            <p className="font-sans text-lg md:text-xl text-[--color-muted] leading-relaxed mb-16 max-w-md">
                                Whether you need 5 videos for a Black Friday test or 50 videos a month for evergreen scaling, we&apos;re ready.
                            </p>
                        </Reveal>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-auto">
                            <Reveal delay={200}>
                                <ContactCard
                                    icon={<EnvelopeSimple size={32} />}
                                    title="Email Us"
                                    desc="For general queries, creator partnerships, and press."
                                    linkText="connect@makeugc.in"
                                    href="mailto:connect@makeugc.in"
                                />
                            </Reveal>
                            <Reveal delay={300}>
                                <ContactCard
                                    icon={<Headset size={32} />}
                                    title="Book a Demo"
                                    desc="See the platform, discuss your ad strategy."
                                    linkText="Schedule Call"
                                    href="#"
                                />
                            </Reveal>
                        </div>
                    </div>

                    {/* Right side form */}
                    <div className="bg-white p-8 md:p-12 rounded-3xl border border-[--color-border] shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[--color-tan] opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                        <Reveal delay={400}>
                            <div className="mb-10 relative z-10">
                                <h2 className="font-display text-3xl text-[--color-ink] mb-2">Request a Quote or Demo</h2>
                                <p className="font-sans text-[--color-muted]">Fill out the details below and our team will get back to you shortly.</p>
                            </div>
                            <div className="relative z-10">
                                <ContactForm />
                            </div>
                        </Reveal>
                    </div>

                </div>
            </section>
        </main>
    );
}
