import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import JsonLd from "@/components/seo/JsonLd";
import { getBlogPosts, getBlogPostBySlug } from "@/lib/blogData";
import { ShareWidget } from "@/components/blog/ShareWidget";
import { Accordion } from "@/components/ui/Accordion";

export const revalidate = 3600; // 1 hr ISR

export async function generateStaticParams() {
    const posts = getBlogPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getBlogPostBySlug(slug);
    if (!post) return { title: 'Post Not Found | MakeUGC' };

    return {
        title: `${post.title} | MakeUGC Blog`,
        description: post.excerpt,
    };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getBlogPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const allPosts = getBlogPosts();
    const relatedPosts = allPosts.filter(p => p.slug !== post.slug).slice(0, 2);

    const articleSchema = {
        headline: post.title,
        author: {
            "@type": "Organization",
            name: post.author
        },
        datePublished: new Date(post.postedOn).toISOString(),
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

            <article className="pt-40 pb-20 md:pt-48 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 lg:gap-16">
                    {/* Left Column: Content */}
                    <div>
                        <Link href="/blog" className="font-sans text-sm font-medium text-[--color-sage] hover:underline underline-offset-4 mb-8 inline-block">
                            ← Back to Blog
                        </Link>
                        
                        <div className="mb-10">
                            <div className="flex flex-wrap items-center gap-4 font-mono text-xs uppercase tracking-widest text-[--color-tan] font-medium mb-4">
                                <span>{post.category}</span>
                            </div>

                            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1] text-[--color-ink] mb-8">
                                {post.title}
                            </h1>

                            {/* Meta Data and Share Row */}
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 py-6 border-y border-[--color-border] mb-12">
                                <div className="flex items-center gap-6">
                                    <div className="w-12 h-12 bg-[--color-cream] rounded-full flex items-center justify-center shrink-0">
                                        <span className="font-display text-xl text-[--color-tan] mt-1">{post.author.charAt(0)}</span>
                                    </div>
                                    <div className="flex flex-col font-mono text-xs text-[--color-muted] space-y-1">
                                        <div><span className="font-semibold text-[--color-ink]">Posted On:</span> {post.postedOn}</div>
                                        <div><span className="font-semibold text-[--color-ink]">Updated On:</span> {post.updatedOn}</div>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="bg-[--color-cream] px-2 py-1 rounded text-[--color-ink] text-[10px]">{post.readTime}</span>
                                        </div>
                                    </div>
                                </div>
                                <ShareWidget title={post.title} />
                            </div>
                        </div>

                        {/* Content Body */}
                        <div
                            className="prose prose-lg prose-headings:font-display prose-headings:font-normal prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-a:text-[--color-sage] prose-a:underline-offset-4 hover:prose-a:text-[--color-tan] text-[--color-ink] max-w-none prose-li:marker:text-[--color-tan]"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />

                        {/* FAQs */}
                        {post.faqs && post.faqs.length > 0 && (
                            <div className="mt-16 pt-10 border-t border-[--color-border]">
                                <h2 className="font-display text-3xl md:text-5xl tracking-tight leading-[1.1] text-[--color-ink] mb-8">Frequently Asked Questions</h2>
                                <div className="space-y-2">
                                    {post.faqs.map((faq, index) => (
                                        <Accordion key={index} question={faq.question} answer={faq.answer} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Related Posts Below Content */}
                        {relatedPosts.length > 0 && (
                            <div className="mt-20 pt-10 border-t border-[--color-border]">
                                <h3 className="font-display text-2xl md:text-3xl text-[--color-ink] mb-8">Read other Blogs</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {relatedPosts.map(related => (
                                        <Link key={related.slug} href={`/blog/${related.slug}`} className="block group">
                                            <div className="bg-[--color-cream] rounded-2xl p-6 border border-[--color-border] h-full flex flex-col transition-all hover:border-[--color-tan] hover:shadow-sm">
                                                <div className="font-mono text-xs uppercase tracking-widest text-[--color-sage] mb-3">{related.category}</div>
                                                <h4 className="font-display text-xl text-[--color-ink] mb-4 group-hover:text-[--color-tan] transition-colors">{related.title}</h4>
                                                <div className="mt-auto font-mono text-xs text-[--color-muted]">{related.postedOn} • {related.readTime}</div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column: CTA Sidebar */}
                    <div className="relative mt-8 lg:mt-[150px]">
                        <div className="lg:sticky lg:top-32">
                            <div className="bg-white border border-[--color-border] rounded-2xl p-8 transition-transform hover:-translate-y-1 hover:shadow-[0_8px_32px_-8px_rgba(199,166,137,0.15)] flex flex-col items-center text-center">
                                <div className="w-16 h-16 bg-[--color-cream] rounded-full flex items-center justify-center mb-6">
                                    <span className="font-display text-3xl text-[--color-tan]">★</span>
                                </div>
                                <h3 className="font-display text-2xl text-[--color-ink] mb-3">Scale with UGC</h3>
                                <p className="font-sans text-sm text-[--color-muted] leading-relaxed mb-6">
                                    Stop trusting organic reach. Get ad-ready UGC from vetted creators that bypasses ad-blindness and scales on Meta.
                                </p>
                                <Button href="/contact" variant="primary" className="w-full justify-center text-center">
                                    Book a Call <span className="ml-2">→</span>
                                </Button>
                                <div className="mt-4 font-mono text-xs uppercase tracking-widest text-[--color-sage]">
                                    Starts at ₹3,000/video
                                </div>
                            </div>

                            {/* Optional Secondary Widget in sidebar (e.g. Newsletter or Quick Links) */}
                            <div className="mt-8 border-t border-[--color-border] pt-8">
                                <h4 className="font-mono text-xs uppercase tracking-widest text-[--color-muted] mb-4">Quick Links</h4>
                                <ul className="space-y-3 font-sans text-sm">
                                    <li><Link href="/brands" className="text-[--color-sage] hover:text-[--color-tan] hover:underline underline-offset-4">Solutions for Brands</Link></li>
                                    <li><Link href="/creators" className="text-[--color-sage] hover:text-[--color-tan] hover:underline underline-offset-4">Join our Creator Network</Link></li>
                                    <li><Link href="/pricing" className="text-[--color-sage] hover:text-[--color-tan] hover:underline underline-offset-4">View Pricing Plans</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
            </article>

            {/* Bottom CTA Band */}
            <section className="bg-[--color-cream] py-20 border-t border-[--color-border] mt-auto">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h2 className="font-display text-3xl md:text-4xl text-[--color-ink] mb-6">Need creative that converts?</h2>
                    <p className="font-sans text-lg text-[--color-muted] mb-8">Stop guessing what works on paid social. Let our creators build it for you.</p>
                    <Button href="/contact" variant="primary">Start a Project <span className="ml-2">→</span></Button>
                </div>
            </section>
        </main>
    );
}
