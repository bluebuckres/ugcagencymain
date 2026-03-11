import React from "react";
import { TestimonialCard } from "../ui/TestimonialCard";
import { Reveal } from "../ui/Reveal";

export function Testimonials() {
    const testimonials = [
        {
            quote:
                "We cut creative production time by 70% and saw a 3x improvement in ROAS within the first month. The scale is unmatched.",
            author: "Aditi S.",
            role: "Head of Growth",
            brand: "D2C Skincare Brand",
        },
        {
            quote:
                "The AI UGC feature let us test 30 variants in a week. That would've taken 2 months any other way. A complete game changer for our ad sprints.",
            author: "Karan R.",
            role: "Performance Marketing Lead",
            brand: "E-commerce Startup",
        },
        {
            quote:
                "Finally, a UGC platform that actually understands paid ads — not just content. Their managed tier removed all the operational headache from our team.",
            author: "Sneha P.",
            role: "Founder",
            brand: "Growth Agency",
        },
    ];

    return (
        <section className="bg-[--color-cream] py-20 md:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Reveal>
                    <h2 className="font-display text-4xl md:text-5xl text-[--color-ink] tracking-tight leading-[1.1] mb-16 md:mb-20 text-center">
                        What brands say.
                    </h2>
                </Reveal>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((test, idx) => (
                        <Reveal key={idx} delay={idx * 150}>
                            <div className="h-full">
                                <TestimonialCard {...test} />
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
