import React from 'react';

interface TestimonialCardProps {
    quote: string;
    author: string;
    role: string;
    brand: string;
}

export function TestimonialCard({ quote, author, role, brand }: TestimonialCardProps) {
    return (
        <div className="bg-white border border-[--color-border] rounded-2xl p-8 relative hover:-translate-y-[2px] transition-transform duration-300">
            <span className="font-display text-6xl text-[--color-tan] opacity-40 absolute top-4 left-6 leading-none">
                &ldquo;
            </span>
            <div className="relative z-10 pt-4">
                <p className="font-sans text-base text-[--color-ink] leading-relaxed mb-6">
                    {quote}
                </p>
                <div className="font-mono text-xs text-[--color-muted] mt-4">
                    <span className="text-[--color-ink] font-medium">{author}</span> — {role}, {brand}
                </div>
            </div>
        </div>
    );
}
