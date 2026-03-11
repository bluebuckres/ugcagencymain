import React from 'react';
import { Storefront, ShoppingCart, Target, DeviceMobileCamera } from '@phosphor-icons/react/dist/ssr';

export function WhoItsFor() {
    const audienceroles = [
        {
            icon: <Storefront size={24} weight="regular" />,
            title: "D2C Brands",
            desc: "You're scaling on Meta. You need fresh creatives every week. Here they are."
        },
        {
            icon: <ShoppingCart size={24} weight="regular" />,
            title: "E-Commerce Stores",
            desc: "UGC video outperforms static. Always. Let's prove it with your product."
        },
        {
            icon: <Target size={24} weight="regular" />,
            title: "Agencies & Growth Teams",
            desc: "Run UGC for your clients at scale. White-label ready. No in-house team needed."
        },
        {
            icon: <DeviceMobileCamera size={24} weight="regular" />,
            title: "App & SaaS Companies",
            desc: "Testimonials, walkthroughs, review-format ads. Built to drive installs and sign-ups."
        }
    ];

    return (
        <section className="bg-[--color-cream] py-20 md:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="font-display text-4xl md:text-5xl text-[--color-ink] tracking-tight leading-[1.1] mb-16 md:mb-20 max-w-2xl">
                    Built for brands that run ads.
                </h2>

                <div className="flex flex-col">
                    {audienceroles.map((role, idx) => (
                        <div key={idx} className="group flex flex-col md:flex-row md:items-center py-8 border-t border-[--color-border] last:border-b transition-colors hover:bg-white/40">
                            <div className="flex items-center gap-6 md:w-1/3 mb-4 md:mb-0 px-4">
                                <span className="text-[--color-sage] bg-white p-3 rounded-xl border border-[--color-border] shadow-sm group-hover:text-[--color-tan] transition-colors">
                                    {role.icon}
                                </span>
                                <h3 className="font-display text-xl md:text-2xl text-[--color-ink] font-medium">
                                    {role.title}
                                </h3>
                            </div>
                            <div className="md:w-2/3 px-4">
                                <p className="font-sans text-base text-[--color-muted] leading-relaxed max-w-[60ch]">
                                    <span className="hidden md:inline text-[--color-sage] mr-4">—</span>
                                    {role.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
