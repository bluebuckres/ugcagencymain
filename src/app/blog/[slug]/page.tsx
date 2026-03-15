import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import JsonLd from "@/components/seo/JsonLd";

// Mock data matching the index
const db = {
    "ugc-vs-influencer-marketing-difference": {
        title: "UGC vs Influencer Marketing: Why D2C Brands Are Switching",
        category: "Strategy",
        date: "Oct 12, 2024",
        readTime: "5 min read",
        author: "MakeUGC Growth Team",
        content: `
      <p>For the last five years, "influencer marketing" was the default playbook for D2C brands looking to scale. You pay someone with a large following to post your product, hoping their audience converts.</p>
      
      <h2>The Problem with Influencers in 2024</h2>
      <p>Influencer rates have skyrocketed, but organic reach has plummeted. You're paying a premium for distribution that the algorithm no longer guarantees. Worse, influencer content often looks like exactly what it is: a sponsored ad.</p>

      <h2>Enter Performance UGC</h2>
      <p>User-Generated Content (UGC) flips the model. Instead of paying for a creator's audience, you are paying strictly for their <strong>content creation skills</strong>.</p>
      
      <p>UGC creators are effectively freelance actors and shooters who understand how to make content native to TikTok and Instagram Reels. You buy the video, you own the IP, and you run it through your own ad account.</p>

      <h3>Why UGC Wins on Paid Social:</h3>
      <ul>
        <li><strong>It stops the scroll:</strong> Authentic, native-looking content bypasses the user's "ad blocker" instinct.</li>
        <li><strong>Cost-effective testing:</strong> You can buy 10 UGC videos for the price of 1 mid-tier influencer post, allowing you to test multiple hooks and find the winner.</li>
        <li><strong>Full control:</strong> You control the targeting, the spend, and the scaling through Meta Ads.</li>
      </ul>
      
      <p>Stop renting audiences. Start buying high-converting assets.</p>
    `
    }
};

export const revalidate = 3600; // 1 hr ISR

export async function generateStaticParams() {
    return Object.keys(db).map((slug) => ({
        slug: slug,
    }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
    const post = db[params.slug as keyof typeof db];
    if (!post) return { title: 'Post Not Found | MakeUGC' };

    return {
        title: `${post.title} | MakeUGC Blog`,
        description: `Read about ${post.title} on the MakeUGC performance marketing blog.`,
    };
}

export default function BlogPost({ params }: { params: { slug: string } }) {
    const post = db[params.slug as keyof typeof db];

    if (!post) {
        notFound();
    }

    const articleSchema = {
        headline: post.title,
        author: {
            "@type": "Organization",
            name: post.author
        },
        datePublished: new Date(post.date).toISOString(),
        publisher: {
            "@type": "Organization",
            name: "MakeUGC",
            logo: {
                "@type": "ImageObject",
                url: "https://www.makeugc.in/ugc-logo-2.svg"
            }
        }
    };

    return (
        <main className="flex-grow flex flex-col bg-white">
            <JsonLd type="Article" data={articleSchema} />

            <article className="pt-40 pb-20 md:pt-48 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto w-full">
                {/* Breadcrumb / Meta */}
                <div className="mb-10">
                    <Link href="/blog" className="font-sans text-sm font-medium text-[--color-sage] hover:underline underline-offset-4 mb-8 inline-block">
                        ← Back to Blog
                    </Link>
                    <div className="flex flex-wrap items-center gap-4 font-mono text-xs uppercase tracking-widest text-[--color-muted] mb-6">
                        <span className="text-[--color-tan] font-medium">{post.category}</span>
                        <span className="hidden sm:inline">•</span>
                        <span>{post.date}</span>
                        <span className="hidden sm:inline">•</span>
                        <span>{post.readTime}</span>
                    </div>

                    <h1 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1] text-[--color-ink] mb-8">
                        {post.title}
                    </h1>
                </div>

                {/* Content Body */}
                <div
                    className="prose prose-lg prose-headings:font-display prose-headings:font-normal prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-a:text-[--color-sage] prose-a:underline-offset-4 hover:prose-a:text-[--color-tan] text-[--color-ink] max-w-none prose-li:marker:text-[--color-tan]"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Author Bio Box */}
                <div className="mt-16 pt-8 border-t border-[--color-border] flex items-center gap-6">
                    <div className="w-12 h-12 bg-[--color-cream] rounded-full flex items-center justify-center shrink-0">
                        <span className="font-display text-xl text-[--color-tan] mt-1">M</span>
                    </div>
                    <div>
                        <p className="font-sans font-medium text-[--color-ink]">Written by {post.author}</p>
                        <p className="font-sans text-sm text-[--color-muted]">We test thousands of ads a month. We share what works here.</p>
                    </div>
                </div>

                {/* Internal Links — SEO link juice */}
                <div className="mt-12 pt-8 border-t border-[--color-border]">
                    <h3 className="font-sans text-sm font-medium text-[--color-muted] uppercase tracking-widest mb-4">Related Pages</h3>
                    <div className="flex flex-wrap gap-3">
                        <Link href="/creators" className="font-sans text-sm text-[--color-sage] hover:text-[--color-tan] underline underline-offset-4 transition-colors">Browse UGC Creators</Link>
                        <span className="text-[--color-border]">·</span>
                        <Link href="/brands" className="font-sans text-sm text-[--color-sage] hover:text-[--color-tan] underline underline-offset-4 transition-colors">For Brands</Link>
                        <span className="text-[--color-border]">·</span>
                        <Link href="/ai-ugc" className="font-sans text-sm text-[--color-sage] hover:text-[--color-tan] underline underline-offset-4 transition-colors">AI UGC Videos</Link>
                        <span className="text-[--color-border]">·</span>
                        <Link href="/pricing" className="font-sans text-sm text-[--color-sage] hover:text-[--color-tan] underline underline-offset-4 transition-colors">UGC Pricing</Link>
                        <span className="text-[--color-border]">·</span>
                        <Link href="/how-it-works" className="font-sans text-sm text-[--color-sage] hover:text-[--color-tan] underline underline-offset-4 transition-colors">How It Works</Link>
                    </div>
                </div>
            </article>

            {/* CTA Band */}
            <section className="bg-[--color-cream] py-20 border-t border-[--color-border]">
                <div className="max-w-3xl mx-auto px-4 text-center">
                    <h2 className="font-display text-3xl md:text-4xl text-[--color-ink] mb-6">Need creative that converts?</h2>
                    <p className="font-sans text-lg text-[--color-muted] mb-8">Stop guessing what works on paid social. Let our creators build it for you.</p>
                    <Button href="/contact" variant="primary">Start a Project <span className="ml-2">→</span></Button>
                </div>
            </section>
        </main>
    );
}
