import React from "react";

export const metadata = {
    title: "Anti-Discrimination Policy | MakeUGC India",
    description: "MakeUGC's commitment to fair casting, equal opportunity, and anti-discrimination.",
};

export default function AntiDiscriminationPolicy() {
    return (
        <main className="flex-grow flex flex-col bg-white pt-40 pb-32">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <h1 className="font-display text-4xl md:text-5xl text-[--color-ink] tracking-tight mb-12">Anti-Discrimination Policy</h1>
                <div className="prose prose-lg text-[--color-ink] max-w-none font-sans leading-relaxed">
                    <p>At MakeUGC, we believe that high-converting creative comes from authentic, diverse voices.</p>

                    <h2>Our Commitment</h2>
                    <p>MakeUGC strictly prohibits discrimination against any creator, client, or employee on the basis of:</p>
                    <ul>
                        <li>Race, color, or ethnic origin</li>
                        <li>Religion or belief</li>
                        <li>Gender identity or expression</li>
                        <li>Sexual orientation</li>
                        <li>Age</li>
                        <li>Disability</li>
                        <li>Physical appearance or body type</li>
                    </ul>

                    <h2>Fair Casting Practices</h2>
                    <p>We mandate that all brands using our platform evaluate creators based solely on their ability to deliver high-quality, brief-compliant content. We actively monitor briefs and communications for discriminatory language or exclusionary casting requests that do not serve a legitimate product-demonstration purpose.</p>

                    <h2>Pay Equity</h2>
                    <p>Our payment structures for deliverables are standardized across tiers and formats. A 15-second Reel commands the same base rate regardless of the creator&apos;s background.</p>

                    <h2>Reporting Violations</h2>
                    <p>If you experience or witness a violation of this policy on our platform, please immediately contact us at connect@makeugc.in. We investigate all claims and reserve the right to ban brands or creators who violate these terms.</p>
                </div>
            </div>
        </main>
    );
}
