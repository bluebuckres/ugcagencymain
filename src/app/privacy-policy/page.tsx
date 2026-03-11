import React from "react";

export const metadata = {
    title: "Privacy Policy | MakeUGC India",
    description: "Privacy policy and data handling practices for MakeUGC users and creators.",
};

export default function PrivacyPolicy() {
    return (
        <main className="flex-grow flex flex-col bg-white pt-40 pb-32">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <h1 className="font-display text-4xl md:text-5xl text-[--color-ink] tracking-tight mb-12">Privacy Policy</h1>
                <div className="prose prose-lg text-[--color-ink] max-w-none font-sans leading-relaxed">
                    <p>Last Updated: October 2024</p>
                    <p>This Privacy Policy describes how MakeUGC ("we", "our", or "us") collects, uses, and shares your personal information when you use our website or platform.</p>

                    <h2>1. Information We Collect</h2>
                    <p>We collect information you provide directly to us, such as when you create an account, submit a brief, or apply as a creator. This includes:</p>
                    <ul>
                        <li>Contact information (name, email, phone number)</li>
                        <li>Professional information (brand name, niche, social media handles)</li>
                        <li>Payment information (processed securely through our third-party payment providers)</li>
                        <li>Content submissions (videos, images, scripts)</li>
                    </ul>

                    <h2>2. How We Use Information</h2>
                    <p>We use the information we collect to:</p>
                    <ul>
                        <li>Provide, maintain, and improve our services</li>
                        <li>Process transactions and send related information</li>
                        <li>Match brands with appropriate creators based on criteria</li>
                        <li>Communicate with you about products, services, offers, and events</li>
                    </ul>

                    <h2>3. Information Sharing</h2>
                    <p>We share information in the following circumstances:</p>
                    <ul>
                        <li><strong>Between Brands and Creators:</strong> Necessary details for brief completion are shared between matched parties.</li>
                        <li><strong>Service Providers:</strong> We share data with vendors, consultants, and service providers who need access to such information to carry out work on our behalf.</li>
                        <li><strong>Legal Requirements:</strong> We may disclose information if required by law or in response to valid requests by public authorities.</li>
                    </ul>

                    <h2>4. Data Security</h2>
                    <p>We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.</p>

                    <h2>5. Contact Us</h2>
                    <p>If you have any questions about this Privacy Policy, please contact us at connect@makeugc.in.</p>
                </div>
            </div>
        </main>
    );
}
