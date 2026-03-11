import React from 'react';
import { Check } from '@phosphor-icons/react/dist/ssr';
import { Button } from './Button';

interface ServiceTierCardProps {
    badge: string;
    isPopular?: boolean;
    title: string;
    description: string;
    features: string[];
    ctaText: string;
    href: string;
}

export function ServiceTierCard({ badge, isPopular = false, title, description, features, ctaText, href }: ServiceTierCardProps) {
    return (
        <div className="bg-white border border-[--color-border] rounded-2xl p-8 hover:shadow-[0_8px_32px_-8px_rgba(199,166,137,0.15)] hover:-translate-y-[2px] transition-all duration-300 flex flex-col h-full">
            <div className="mb-6">
                <span className={`inline-block font-mono text-xs uppercase tracking-widest px-3 py-1 rounded-full mb-4 ${isPopular ? 'bg-[--color-tan] text-white' : 'bg-[--color-cream] text-[--color-sage]'
                    }`}>
                    {badge}
                </span>
                <h3 className="font-display text-2xl font-medium text-[--color-ink] mb-2">{title}</h3>
                <p className="font-sans text-sm text-[--color-muted]">{description}</p>
            </div>

            <ul className="space-y-3 flex-grow mb-8 border-t border-[--color-border] pt-6">
                {features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                        <Check weight="bold" className="text-[--color-sage] shrink-0 mt-0.5" size={16} />
                        <span className="font-sans text-sm text-[--color-ink]">{feature}</span>
                    </li>
                ))}
            </ul>

            <div className="mt-auto">
                <Button variant={isPopular ? 'primary' : 'secondary'} href={href} className="w-full">
                    {ctaText} <span className="ml-2">→</span>
                </Button>
            </div>
        </div>
    );
}
