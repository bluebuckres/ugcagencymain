import React from "react";
import { CreatorCard } from "../ui/CreatorCard";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";

export function CreatorNetwork() {
    const niches = [
        "BEAUTY & SKINCARE",
        "FASHION",
        "FITNESS",
        "FOOD & BEVERAGE",
        "HOME & LIVING",
        "TECH & GADGETS",
        "BABY & PARENTING",
        "FINANCE",
        "TRAVEL",
        "PET CARE",
    ];

    const sampleCreators = [
        {
            name: "Priya S.",
            city: "Mumbai",
            niches: ["Beauty", "Lifestyle"],
            platforms: ["Meta", "Reels"],
            delivery: "72 hrs",
            rating: 4.9,
            imageUrl: "https://picsum.photos/seed/priya/150/150",
        },
        {
            name: "Rahul M.",
            city: "Bangalore",
            niches: ["Tech", "Finance"],
            platforms: ["YouTube", "Meta"],
            delivery: "72 hrs",
            rating: 4.8,
            imageUrl: "https://picsum.photos/seed/rahul/150/150",
        },
        {
            name: "Aanya K.",
            city: "Delhi",
            niches: ["Fashion", "Travel"],
            platforms: ["Instagram", "TikTok"],
            delivery: "72 hrs",
            rating: 5.0,
            imageUrl: "https://picsum.photos/seed/aanya/150/150",
        },
    ];

    return (
        <section className="bg-white py-20 md:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mb-16 md:mb-20">
                    <Reveal>
                        <h2 className="font-display text-4xl md:text-5xl text-[--color-ink] tracking-tight leading-[1.1] mb-6">
                            1,000+ real creators. Every niche. Every format.
                        </h2>
                    </Reveal>
                    <Reveal delay={100}>
                        <p className="font-sans text-lg text-[--color-muted] leading-relaxed mb-8">
                            Not influencers. Not actors. Real people who know how to create content that feels native in a paid feed.
                            <br /><br />
                            Every creator on MakeUGC is vetted for content quality, on-camera presence, and delivery reliability.
                        </p>
                    </Reveal>
                    <Reveal delay={200}>
                        <div className="flex flex-wrap gap-x-2 gap-y-3 pt-4">
                            {niches.map((niche) => (
                                <span
                                    key={niche}
                                    className="font-mono text-[10px] md:text-xs bg-[--color-cream] border border-[--color-border] text-[--color-sage] uppercase px-3 py-1.5 rounded-full whitespace-nowrap"
                                >
                                    {niche}
                                </span>
                            ))}
                        </div>
                    </Reveal>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
                    {sampleCreators.map((creator, idx) => (
                        <Reveal key={idx} delay={300 + idx * 100}>
                            <CreatorCard {...creator} />
                        </Reveal>
                    ))}
                </div>

                <Reveal delay={600}>
                    <Button variant="secondary" href="https://app.makeugc.in" className="w-full sm:w-auto">
                        Browse All Creators <span className="ml-2 font-sans font-light">→</span>
                    </Button>
                </Reveal>
            </div>
        </section>
    );
}
