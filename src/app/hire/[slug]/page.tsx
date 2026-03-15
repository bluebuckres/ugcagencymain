import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";

// TODO: Replace with real DB fetch (e.g., Supabase)
// This is a scaffold — wire up your actual creator data source here.
const getCreator = async (slug: string) => {
    // Placeholder: in production, fetch from DB
    return null;
};

interface CreatorProfile {
    slug: string;
    name: string;
    city: string;
    niches: string[];
    reviewCount: number;
    jobsDone: number;
    bio: string;
    imageUrl: string;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const creator = await getCreator(params.slug) as CreatorProfile | null;
    if (!creator) return { title: "Creator Not Found | MakeUGC" };

    // noindex thin pages — creator profiles with no reviews/jobs hurt domain authority
    const isThinPage = creator.reviewCount === 0 && creator.jobsDone === 0;

    return {
        title: `${creator.name} — UGC Creator in ${creator.city} | MakeUGC`,
        description: `Hire ${creator.name}, a vetted UGC creator in ${creator.city} specializing in ${creator.niches.join(", ")}. View portfolio and book on MakeUGC.`,
        alternates: {
            canonical: `https://www.makeugc.in/hire/${params.slug}`,
        },
        ...(isThinPage && {
            robots: {
                index: false,
                follow: true,
            },
        }),
    };
}

export default async function HireCreatorPage({ params }: { params: { slug: string } }) {
    const creator = await getCreator(params.slug) as CreatorProfile | null;

    if (!creator) {
        notFound();
    }

    return (
        <main className="flex-grow flex flex-col bg-[--color-cream]">
            <section className="pt-40 pb-20 md:pt-48 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
                <h1 className="font-display text-4xl md:text-5xl text-[--color-ink] mb-4">{creator.name}</h1>
                <p className="font-sans text-lg text-[--color-muted]">{creator.city} · {creator.niches.join(", ")}</p>
                <p className="font-sans text-base text-[--color-muted] mt-8 leading-relaxed">{creator.bio}</p>

                <div className="mt-12">
                    <Button href="/contact" variant="primary">
                        Hire {creator.name} <span className="ml-2">→</span>
                    </Button>
                </div>

                {/* Internal links — cross-link to similar creators */}
                <div className="mt-16 pt-8 border-t border-[--color-border]">
                    <h3 className="font-sans text-sm font-medium text-[--color-muted] uppercase tracking-widest mb-4">Explore More</h3>
                    <div className="flex flex-wrap gap-3">
                        <Link href="/creators" className="font-sans text-sm text-[--color-sage] hover:text-[--color-tan] underline underline-offset-4">Browse All Creators</Link>
                        <span className="text-[--color-border]">·</span>
                        <Link href="/brands" className="font-sans text-sm text-[--color-sage] hover:text-[--color-tan] underline underline-offset-4">For Brands</Link>
                        <span className="text-[--color-border]">·</span>
                        <Link href="/how-it-works" className="font-sans text-sm text-[--color-sage] hover:text-[--color-tan] underline underline-offset-4">How It Works</Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
