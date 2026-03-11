import React from 'react';
import { ServiceTierCard } from '../ui/ServiceTierCard';

export function Services() {
    const tiers = [
        {
            badge: 'STARTER',
            title: 'Self-Serve',
            description: 'You pick the creator. You run it.',
            features: [
                'Vetted creator profiles with sample work',
                'Filter: niche, platform, content style',
                'Raw footage or edit-ready delivery',
                'Secure payments & IP ownership'
            ],
            ctaText: 'Get Creator Access',
            href: '/pricing',
            isPopular: false
        },
        {
            badge: 'GROWTH · ⭐ MOST POPULAR',
            title: 'Managed Production',
            description: 'Brief us. We do the rest.',
            features: [
                'Conversion-focused script writing',
                'Creator casting & full supervision',
                'Platform-optimised deliverables (9:16, 1:1, 16:9)',
                'Revision rounds included',
                'Usage rights & brand safety'
            ],
            ctaText: 'Start a Project',
            href: '/contact',
            isPopular: true
        },
        {
            badge: 'SCALE',
            title: 'Full Studio Production',
            description: 'End-to-end. Volume. No compromises.',
            features: [
                'Creative strategy & content calendar',
                'Multi-creator, multi-format output',
                'In-house studio option (model on-camera)',
                'Dedicated account manager',
                'Priority delivery SLA'
            ],
            ctaText: 'Let\'s Produce',
            href: '/contact',
            isPopular: false
        },
        {
            badge: 'AI-POWERED · NEW',
            title: 'AI UGC',
            description: '50 creatives. 24 hours. No crew.',
            features: [
                'AI presenter or voiceover-led video ads',
                'Human creative direction throughout',
                'Multiple hook & CTA variants per brief',
                'Rapid testing before scaling',
                'Human + AI hybrid available'
            ],
            ctaText: 'Explore AI UGC',
            href: '/ai-ugc',
            isPopular: false
        }
    ];

    return (
        <section className="bg-white py-20 md:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-16 md:mb-24 max-w-2xl">
                    <h2 className="font-display text-4xl md:text-5xl text-[--color-ink] tracking-tight leading-[1.1] mb-6">
                        One Platform.<br />Four Ways to Work.
                    </h2>
                    <p className="font-sans text-lg text-[--color-muted] leading-relaxed">
                        From founder-run brands to agency teams running 50 clients — pick your model.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    {tiers.map((tier, idx) => (
                        <ServiceTierCard key={idx} {...tier} />
                    ))}
                </div>
            </div>
        </section>
    );
}
