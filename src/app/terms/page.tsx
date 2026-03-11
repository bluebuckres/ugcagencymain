import React from "react";

export const metadata = {
    title: "Terms of Service | MakeUGC India",
    description: "Terms of service and usage agreements for MakeUGC brands and creators.",
};

export default function TermsOfService() {
    return (
        <main className="flex-grow flex flex-col bg-white pt-40 pb-32">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <h1 className="font-display text-4xl md:text-5xl text-[--color-ink] tracking-tight mb-12">Terms of Service</h1>
                <div className="prose prose-lg text-[--color-ink] max-w-none font-sans leading-relaxed">
                    <p>Last Updated: October 2024</p>

                    <h2>1. Agreement to Terms</h2>
                    <p>By accessing or using MakeUGC&apos;s services, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.</p>

                    <h2>2. Content Ownership and Licensing</h2>
                    <p><strong>For Brands:</strong> Upon final approval and payment of a project, you receive full commercial usage rights in perpetuity for the delivered video assets across digital advertising channels.</p>
                    <p><strong>For Creators:</strong> By submitting content through MakeUGC, you grant MakeUGC and the respective Client a perpetual, worldwide, irrevocable license to use, edit, and distribute the content for commercial purposes.</p>

                    <h2>3. Creator Obligations</h2>
                    <ul>
                        <li>Creators must follow the brand brief accurately.</li>
                        <li>Content must be original and not infringe on third-party intellectual property.</li>
                        <li>Creators must maintain professional communication and adhere to agreed timelines.</li>
                    </ul>

                    <h2>4. Brand Obligations</h2>
                    <ul>
                        <li>Brands must provide clear and accurate briefs.</li>
                        <li>Payments must be made according to the selected tier&apos;s schedule.</li>
                        <li>Feedback on deliverables must be constructive and provided within the stipulated review period.</li>
                    </ul>

                    <h2>5. AI Content Generation</h2>
                    <p>When opting for AI UGC, you acknowledge that the content is synthetically generated using licensed digital avatars. You agree to use this content entirely within the bounds of applicable advertising standards and not for deceptive practices.</p>

                    <h2>6. Limitation of Liability</h2>
                    <p>MakeUGC&apos;s liability is limited to the amount paid for the specific project in dispute. We are not liable for the performance of the ad creatives on third-party platforms (e.g., Meta, TikTok).</p>
                </div>
            </div>
        </main>
    );
}
