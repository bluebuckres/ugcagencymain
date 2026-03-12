import React from 'react';
import { LogoTicker } from '@/components/ui/LogoTicker';

export function TrustedBrands() {
    return (
        <section className="bg-[#f5f5f0] py-16 md:py-20 overflow-hidden border-t border-[--color-border]">
            {/* Heading */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10 md:mb-14">
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-[--color-ink] tracking-tight mb-3">
                    Trusted globally
                </h2>
                <p className="font-sans text-base md:text-lg text-[--color-muted] max-w-xl mx-auto">
                    From e-com, D2C, agencies to enterprises
                </p>
            </div>

            {/* Logo marquee */}
            <div className="[&>div]:bg-transparent [&>div]:border-y-0">
                <LogoTicker />
            </div>
        </section>
    );
}
