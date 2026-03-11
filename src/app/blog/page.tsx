import React from "react";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import JsonLd from "@/components/seo/JsonLd";

export const metadata = {
    title: "MakeUGC Blog | Performance Marketing & UGC Insights",
    description: "Insights, guides, and case studies on how to scale D2C brands using User-Generated Content (UGC).",
};

// Mock data for the static build
const mockPosts = [
    {
        slug: "ugc-vs-influencer-marketing-difference",
        title: "UGC vs Influencer Marketing: Why D2C Brands Are Switching",
        excerpt: "Understand the core differences in ROAS, production workflow, and why UGC is outperforming traditional influencer campaigns on Meta ads.",
        category: "Strategy",
        readTime: "5 min read",
        date: "Oct 12, 2024"
    },
    {
        slug: "how-to-write-ugc-script-converts",
        title: "How to Write a UGC Script That Actually Converts",
        excerpt: "The exact hook formulas, pacing, and visual cues we use at MakeUGC to generate sub-$10 CPAs for skincare brands.",
        category: "Creative",
        readTime: "8 min read",
        date: "Oct 05, 2024"
    },
    {
        slug: "ai-ugc-future-of-ad-testing",
        title: "Testing 50 Hooks in 24 Hours: The Rise of AI UGC",
        excerpt: "How performance teams are using AI-generated avatars to rapidly test creative variants without booking expensive studio days.",
        category: "AI & Tech",
        readTime: "6 min read",
        date: "Sep 28, 2024"
    },
    {
        slug: "best-ugc-hooks-2024",
        title: "10 Direct-Response Hooks Stealing Attention in 2024",
        excerpt: "Stop the scroll. We break down the top 10 visual and verbal hooks dominating Indian D2C ad accounts this year.",
        category: "Creative",
        readTime: "7 min read",
        date: "Sep 15, 2024"
    }
];

export default function BlogIndex() {
    return (
        <main className="flex-grow flex flex-col bg-[--color-cream]">
            <JsonLd
                type="ItemList"
                data={{
                    itemListElement: mockPosts.map((post, index) => ({
                        "@type": "ListItem",
                        "position": index + 1,
                        "url": `https://www.makeugc.in/blog/${post.slug}`
                    }))
                }}
            />

            <section className="pt-40 pb-20 md:pt-48 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                <Reveal>
                    <div className="max-w-3xl mb-16 md:mb-24">
                        <h1 className="font-display text-5xl md:text-7xl tracking-tight leading-[1.05] text-[--color-ink] mb-6">
                            Performance creative insights.
                        </h1>
                        <p className="font-sans text-lg md:text-xl text-[--color-muted] leading-relaxed">
                            Guides, tear-downs, and data on what&apos;s working in paid social right now.
                        </p>
                    </div>
                </Reveal>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-12">
                    {mockPosts.map((post, idx) => (
                        <Reveal key={post.slug} delay={idx * 100}>
                            <Link href={`/blog/${post.slug}`} className="block group h-full">
                                <article className="bg-white p-8 md:p-10 rounded-3xl border border-[--color-border] h-full flex flex-col transition-all duration-300 hover:shadow-[0_8px_32px_-8px_rgba(199,166,137,0.15)] hover:-translate-y-1">
                                    <div className="flex items-center gap-4 font-mono text-xs uppercase tracking-widest text-[--color-muted] mb-6">
                                        <span className="text-[--color-sage] font-medium">{post.category}</span>
                                        <span>•</span>
                                        <span>{post.readTime}</span>
                                    </div>

                                    <h2 className="font-display text-2xl md:text-3xl text-[--color-ink] mb-4 group-hover:text-[--color-tan] transition-colors">
                                        {post.title}
                                    </h2>

                                    <p className="font-sans text-[--color-muted] leading-relaxed mb-8 flex-grow">
                                        {post.excerpt}
                                    </p>

                                    <div className="font-mono text-xs text-[--color-muted] mt-auto flex items-center justify-between border-t border-[--color-border] pt-6">
                                        <span>{post.date}</span>
                                        <span className="text-[--color-sage] group-hover:underline underline-offset-4">Read Article →</span>
                                    </div>
                                </article>
                            </Link>
                        </Reveal>
                    ))}
                </div>
            </section>
        </main>
    );
}
