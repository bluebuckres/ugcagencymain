"use client";
import React, { useRef, useState, useEffect } from "react";
import { TestimonialCard } from "../ui/TestimonialCard";
import { Reveal } from "../ui/Reveal";
import { CaretLeft, CaretRight } from "@phosphor-icons/react/dist/ssr";

export function Testimonials() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener('resize', checkScroll);
        return () => window.removeEventListener('resize', checkScroll);
    }, []);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = direction === 'left' ? -400 : 400;
            scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            // Delay check slightly to let smooth scroll start
            setTimeout(checkScroll, 300);
        }
    };

    const testimonials = [
        {
            brand: "Snitch",
            author: "Manish Thanvi",
            role: "Head of Brand",
            quote: "Finding creators who actually match our aesthetic used to be a massive bottleneck. We were spending days just sifting through DMs and portfolios. MakeUGC fixed that. Their creator picking process is sharp—they understand the visual identity we're going for and only send over relevant profiles. The content turnaround is fast, and the videos actually convert. It's just a much cleaner, faster way to handle our top-of-funnel ad creatives."
        },
        {
            brand: "Minimalist",
            author: "Akash Nihalani",
            role: "General Manager - Marketing",
            quote: "For a science-first skincare brand, trust is everything. We can't use hyper-enthusiastic, scripted videos; we need authentic, clear communication. MakeUGC's platform allowed us to handpick creators who genuinely know how to talk about ingredients naturally. We've also been testing their AI UGC features to iterate on different hooks, which has helped us scale our ad testing without blowing up our production budget. It's a highly practical tool for our performance marketing stack."
        },
        {
            brand: "Noise",
            author: "Prerna Kapur",
            role: "Associate Director - Marketing",
            quote: "Managing UGC at scale is usually a logistical headache. What I appreciate about MakeUGC is the total lack of friction. We pass the brief, select the creators from their curated picks, and the assets come in ready for our paid campaigns. The AI generation capability has also been surprisingly effective for quickly generating hook variations. It saves my team hours of back-and-forth negotiations every single week."
        },
        {
            brand: "Pepperfry",
            author: "Mahip Dwivedi",
            role: "VP & Head of Marketing",
            quote: "Furniture and home decor require a very specific type of lifestyle content to perform well on social. MakeUGC takes the heavy lifting out of sourcing. Instead of managing dozens of individual creator relationships, we just use the platform to pick who fits the brief, and MakeUGC handles the rest. The ability to blend real creator footage with their AI tools for different ad formats has given us a lot of flexibility."
        },
        {
            brand: "The Whole Truth",
            author: "Aditi Gupta",
            role: "Lead - Brand Marketing",
            quote: "Our entire brand ethos is built on not lying to consumers, which means standard, overly-enthusiastic influencer ads don't work for us. We use MakeUGC because it actually lets us filter for creators who feel like real customers, not actors. Being able to pick the exact right person and use their AI tools to subtly adjust the video pacing for different platforms has made our performance marketing much more efficient without compromising our brand voice."
        },
        {
            brand: "The Souled Store",
            author: "Rahul Dash",
            role: "Head of Performance Marketing",
            quote: "When you are dropping new pop-culture merch every week, ad fatigue sets in incredibly fast. We need a high volume of creatives, and managing that in-house was burning out our team. MakeUGC gives us a centralized place to pick creators, drop briefs, and get assets back in days. The AI UGC feature is a massive bonus for us—it lets us take one good creator video and spin out multiple hook variations for Instagram Reels without doing reshoots."
        },
        {
            brand: "Blue Tokai",
            author: "Neha Sharma",
            role: "Senior Brand Manager",
            quote: "Coffee is a highly aesthetic, sensory product. We can't just use anyone with a smartphone; we need creators who understand lighting, b-roll, and pacing. MakeUGC's creator picking process is excellent for this. They vet the talent so we don't have to. We get beautiful, natural-looking brewing tutorials and lifestyle content that plug directly into our Facebook ad accounts. It's a very practical, low-friction platform."
        },
        {
            brand: "Bewakoof",
            author: "Prashant Singh",
            role: "Director of Growth",
            quote: "We test hundreds of ad creatives a month. Relying entirely on agency shoots is too slow and expensive. MakeUGC is a core part of our workflow now. We select the creators, get the raw, native-looking content, and put it straight into our campaigns. It removes the entire headache of negotiating rates and chasing influencers for deliverables. The content is raw, it's relatable, and most importantly, it drives a low CPA."
        },
        {
            brand: "The Man Company",
            author: "Rishu Garg",
            role: "Head of Marketing",
            quote: "Men's grooming requires clear, instructional content—how to use a beard wash, how a perfume actually sits. MakeUGC helps us source guys who can naturally talk to the camera without sounding like they are reading a script. The platform handles the operational mess of UGC so my team can just focus on strategy. We've also started leveraging their AI features to tweak ad formats, which saves a lot of editing time."
        },
        {
            brand: "Rare Rabbit",
            author: "Siddharth Shetty",
            role: "Brand Director",
            quote: "We were initially hesitant to heavily lean into UGC because we didn't want to dilute our premium positioning with low-quality phone footage. MakeUGC changed our minds. The ability to handpick creators based on their past portfolio quality means we maintain our visual standards. We get aspirational, high-quality styling videos that perform exceptionally well for our retargeting campaigns."
        },
        {
            brand: "Beyoung",
            author: "Karan Jain",
            role: "VP - Growth",
            quote: "Our target audience is massive and highly regional. MakeUGC's biggest advantage for us is the diversity of their creator pool. We can easily pick creators who resonate with Tier-2 and Tier-3 audiences, rather than just standard metro-city influencers. The turnaround is quick, the pricing makes sense for scaling, and the videos drive actual conversions rather than just vanity metrics."
        },
        {
            brand: "Urban Monkey",
            author: "Yashraj Singh",
            role: "Digital Marketing Lead",
            quote: "Streetwear has a very specific subculture and vibe. Most platforms just hand you generic lifestyle influencers who don't fit the brand at all. MakeUGC actually lets us filter and pick creators who authentically live the culture. The content we get back is raw, edgy, and fits perfectly on TikTok and Reels. It doesn't look like an ad, which is exactly why it works."
        },
        {
            brand: "Vishal Mega Mart",
            author: "Amit Kumar",
            role: "General Manager - Marketing",
            quote: "For a retail brand of our scale, we need content that speaks to everyday Indian families. MakeUGC gives us access to a wide network of relatable creators who can showcase our apparel in a natural, everyday setting. It takes the hassle out of mass-sourcing local talent, and their AI tools help us optimize those videos for different regional campaigns very efficiently."
        }
    ];

    return (
        <section className="bg-[--color-cream] py-20 md:py-32 overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
                    <Reveal>
                        <h2 className="font-display text-4xl md:text-5xl text-[--color-ink] tracking-tight leading-[1.1]">
                            What brands say.
                        </h2>
                    </Reveal>

                    {/* Navigation Arrows */}
                    <Reveal delay={100}>
                        <div className="flex gap-4">
                            <button
                                onClick={() => scroll('left')}
                                disabled={!canScrollLeft}
                                className={`w-12 h-12 flex items-center justify-center rounded-full border border-[--color-border] transition-colors ${canScrollLeft ? 'bg-white text-[--color-ink] hover:border-[--color-tan]' : 'bg-transparent text-[--color-muted] opacity-50 cursor-not-allowed'}`}
                                aria-label="Scroll left"
                            >
                                <CaretLeft size={20} weight="bold" />
                            </button>
                            <button
                                onClick={() => scroll('right')}
                                disabled={!canScrollRight}
                                className={`w-12 h-12 flex items-center justify-center rounded-full border border-[--color-border] transition-colors ${canScrollRight ? 'bg-white text-[--color-ink] hover:border-[--color-tan]' : 'bg-transparent text-[--color-muted] opacity-50 cursor-not-allowed'}`}
                                aria-label="Scroll right"
                            >
                                <CaretRight size={20} weight="bold" />
                            </button>
                        </div>
                    </Reveal>
                </div>

                {/* Horizontal Scrolling Track */}
                <Reveal delay={200}>
                    <div
                        ref={scrollContainerRef}
                        onScroll={checkScroll}
                        className="flex gap-6 md:gap-8 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {testimonials.map((test, idx) => (
                            <div key={idx} className="min-w-[320px] md:min-w-[400px] lg:min-w-[450px] snap-center h-auto flex flex-col">
                                <TestimonialCard {...test} />
                            </div>
                        ))}
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
