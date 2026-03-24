import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";
import { CreatorTypesTabs } from "@/components/sections/CreatorTypesTabs";
import {
    Briefcase, CurrencyInr, HouseLine, Images, ChartLineUp, Handshake,
    CheckCircle, XCircle, WarningCircle, Check, Lightbulb, ChatCircleText, WarningOctagon, Info, MinusCircle, Package
} from "@phosphor-icons/react/dist/ssr";

export const metadata = {
    title: "Join as a UGC Creator — Get Paid to Create. No Follower Count Required. | MakeUGC India",
    description: "MakeUGC connects real, camera-comfortable creators with brands that need authentic video content for paid ads. Name your rate. Get paid per video.",
};

const WhyJoin = () => {
    const reasons = [
        { icon: <Briefcase size={28} />, title: "Consistent brand briefs", desc: "No cold pitching. No DM-chasing. We bring the work to you." },
        { icon: <CurrencyInr size={28} />, title: "You set your own rate", desc: "Tell us what you charge. No platform-imposed pay cuts." },
        { icon: <HouseLine size={28} />, title: "Work from anywhere", desc: "Phone camera + good lighting is all you need." },
        { icon: <Images size={28} />, title: "Real brand portfolio", desc: "Legitimate paid work you can show future clients." },
        { icon: <ChartLineUp size={28} />, title: "Creator dashboard", desc: "(Coming soon) Track briefs, payments, and messages in one place." },
        { icon: <Handshake size={28} />, title: "We handle brands", desc: "You focus on creating. We handle client communication." },
    ];

    return (
        <section className="bg-white py-20 md:py-32 border-b border-[--color-border]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Reveal>
                    <h2 className="font-display text-3xl md:text-5xl tracking-tight leading-[1.1] text-[--color-ink] mb-16 text-center">Why MakeUGC?</h2>
                </Reveal>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 max-w-5xl mx-auto">
                    {reasons.map((r, idx) => (
                        <Reveal key={idx} delay={idx * 100}>
                            <div className="flex items-start gap-6 group">
                                <div className="text-[--color-sage] group-hover:text-[--color-tan] transition-colors mt-1 shrink-0">
                                    {r.icon}
                                </div>
                                <div>
                                    <h3 className="font-sans text-lg font-medium text-[--color-ink] mb-1">{r.title}</h3>
                                    <p className="font-sans text-base text-[--color-muted] leading-relaxed max-w-[40ch]">{r.desc}</p>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

const CreatorTypeTable = () => {
    return (
        <section className="bg-white py-20 md:py-32 border-b border-[--color-border]">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <Reveal>
                    <div className="text-center mb-12">
                        <h2 className="font-display text-3xl md:text-5xl tracking-tight leading-[1.1] text-[--color-ink] mb-4">Creator Type at a Glance</h2>
                        <p className="font-sans text-[--color-muted] max-w-[60ch] mx-auto">Swipe to view full comparison on mobile.</p>
                    </div>
                </Reveal>
                <div className="w-full overflow-x-auto pb-6 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
                    <div className="min-w-[700px] border border-[--color-border] rounded-2xl overflow-hidden shadow-sm">
                        <div className="grid grid-cols-5 bg-[--color-cream] text-xs font-mono uppercase tracking-widest text-[--color-ink] border-b border-[--color-border] p-4 items-center">
                            <div className="col-span-1 pl-4">Type</div>
                            <div className="text-center">On Camera?</div>
                            <div className="text-center">Followers Needed?</div>
                            <div className="text-center">Set Your Rate?</div>
                            <div className="text-center">Product Shipped?</div>
                        </div>
                        {[
                            { type: "UGC Creator", camera: true, cameraText: "Yes", followers: false, rate: true, product: true },
                            { type: "UGC + Influencer", camera: true, cameraText: "Yes", followers: "10K+", rate: true, product: true },
                            { type: "Photographer", camera: "Sometimes", followers: false, rate: true, product: true },
                            { type: "Video Editor", camera: false, followers: false, rate: true, product: false }
                        ].map((row, idx) => (
                            <div key={idx} className="grid grid-cols-5 text-sm font-sans py-5 px-4 border-b border-[--color-border] last:border-0 hover:bg-[--color-cream]/30 transition-colors items-center">
                                <div className="col-span-1 text-[--color-ink] font-medium pl-4">{row.type}</div>
                                <div className="text-center flex flex-col items-center gap-1 justify-center relative">
                                    {row.camera === true ? <CheckCircle size={20} className="text-[--color-tan]" weight="fill" /> : row.camera === false ? <MinusCircle size={20} className="text-[--color-border]" weight="fill" /> : <Info size={20} className="text-[--color-sage]" weight="fill" />}
                                    {typeof row.camera === "string" && <span className="text-[--color-muted] text-xs mt-1 absolute -bottom-5">{row.camera}</span>}
                                </div>
                                <div className="text-center flex flex-col items-center gap-1 justify-center">
                                    {row.followers === false ? <MinusCircle size={20} className="text-[--color-border]" weight="fill" /> : <span className="font-mono bg-[--color-cream] border border-[--color-border] px-2 py-0.5 rounded-full text-xs text-[--color-ink]">{row.followers}</span>}
                                </div>
                                <div className="text-center flex justify-center">
                                    {row.rate ? <CheckCircle size={20} className="text-[--color-tan]" weight="fill" /> : <MinusCircle size={20} className="text-[--color-border]" weight="fill" />}
                                </div>
                                <div className="text-center flex justify-center">
                                    {row.product ? <CheckCircle size={20} className="text-[--color-tan]" weight="fill" /> : <MinusCircle size={20} className="text-[--color-border]" weight="fill" />}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const EarningsCallout = () => (
    <section className="bg-[--color-cream] py-20 md:py-32 border-b border-[--color-border]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Reveal><h2 className="font-display text-3xl md:text-5xl tracking-tight leading-[1.1] text-[--color-ink] mb-6">Pricing — You Decide</h2></Reveal>
            <Reveal delay={100}>
                <p className="font-sans text-base text-[--color-muted] max-w-[60ch] mx-auto leading-relaxed mb-16">
                    We don&apos;t impose rates. You set your price per deliverable when you fill your profile. Brands review your profile and rate before selecting you.
                </p>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 mb-16">
                <Reveal delay={200}>
                    <div className="bg-white border border-[--color-border] p-8 rounded-2xl">
                        <div className="font-display text-4xl md:text-5xl text-[--color-tan] mb-4 tracking-tight">Your Rate</div>
                        <div className="font-sans text-[--color-sage] font-mono text-xs uppercase tracking-widest mt-2">per video (you decide)</div>
                    </div>
                </Reveal>
                <Reveal delay={300}>
                    <div className="bg-white border border-[--color-border] p-8 rounded-2xl">
                        <div className="font-mono text-4xl md:text-5xl text-[--color-tan] mb-4 tracking-tight">₹30,000+</div>
                        <div className="font-sans text-[--color-sage] font-mono text-xs uppercase tracking-widest mt-2">per month for top creators</div>
                    </div>
                </Reveal>
            </div>

            <Reveal delay={400}>
                <div className="bg-white border border-[--color-border] p-6 rounded-xl max-w-2xl mx-auto text-left flex flex-col md:flex-row gap-6 mb-12">
                    <div className="shrink-0 text-[--color-tan] mt-1"><Lightbulb size={24} weight="duotone" /></div>
                    <div>
                        <h4 className="font-sans text-sm font-medium text-[--color-ink] mb-1">Tip for new creators:</h4>
                        <p className="font-sans text-sm text-[--color-muted] leading-relaxed">Start with a competitive rate to build your profile and ratings. As you complete more briefs and earn positive feedback, increase your rate.</p>
                    </div>
                </div>
            </Reveal>

            <Reveal delay={500}>
                <div className="text-center">
                    <h4 className="font-sans font-mono text-xs uppercase tracking-widest text-[--color-muted] mb-4">How payment works:</h4>
                    <p className="font-sans text-sm text-[--color-ink]">50% upfront on brief acceptance • 50% within 3 days of delivery • Direct UPI/Bank Transfer</p>
                </div>
            </Reveal>
        </div>
    </section>
);

const HowToApply = () => {
    const steps = [
        { num: "1", title: "Visit app.makeugc.in", desc: "Go to our platform and click 'Sign Up as Creator'." },
        { num: "2", title: "Select Creator Type", desc: "Choose your type (you can select more than one if you qualify)." },
        { num: "3", title: "Fill Profile", desc: "Add full name, city, niche, languages, rates, and UPI details." },
        { num: "4", title: "Upload Photo", desc: "Add a clear, well-lit portrait. No heavy filters or group photos." },
        { num: "5", title: "Intro Video / Portfolio", desc: "Upload your intro video (UGC) or portfolio samples (Editors/Photogs)." },
    ];

    return (
        <section className="bg-white py-20 md:py-32 border-b border-[--color-border]">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <Reveal>
                    <h2 className="font-display text-3xl md:text-5xl tracking-tight leading-[1.1] text-[--color-ink] mb-16 text-center">How to Apply — Step by Step</h2>
                </Reveal>

                <div className="relative border-l border-[--color-border] ml-4 md:ml-8 space-y-12">
                    {steps.map((step, idx) => (
                        <Reveal key={idx} delay={idx * 100}>
                            <div className="relative pl-8 md:pl-12">
                                <div className="absolute -left-5 top-0 bg-[--color-tan] w-10 h-10 rounded-full flex items-center justify-center font-mono text-white text-sm font-medium border-4 border-white">
                                    {step.num}
                                </div>
                                <h3 className="font-display text-xl md:text-2xl font-medium text-[--color-ink] mb-2 pt-1.5">{step.title}</h3>
                                <p className="font-sans text-base text-[--color-muted] leading-relaxed max-w-[50ch]">{step.desc}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>

                <Reveal delay={600}>
                    <div className="mt-16 bg-[--color-cream] p-6 md:p-8 rounded-2xl border border-[--color-border] flex gap-4">
                        <div className="text-[--color-tan] mt-0.5"><WarningCircle size={24} weight="regular" /></div>
                        <p className="font-sans text-sm text-[--color-ink] leading-relaxed">
                            <strong className="block mb-1">Incomplete profiles are not reviewed.</strong>
                            Fill everything. A complete profile is the single biggest factor in getting matched to briefs faster.
                        </p>
                    </div>
                </Reveal>
            </div>
        </section>
    );
};

const IntroVideoGuide = () => (
    <section className="bg-[--color-cream] py-20 md:py-32 border-b border-[--color-border]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
                <div className="text-center mb-16">
                    <h2 className="font-display text-3xl md:text-5xl tracking-tight leading-[1.1] text-[--color-ink] mb-4">Your Intro Video — Read Carefully</h2>
                    <p className="font-sans text-base text-[--color-muted] italic">For UGC Creators and Influencers only</p>
                </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white border border-[--color-border] rounded-2xl p-8 md:p-12 mb-12">
                <div>
                    <h3 className="font-mono text-xs uppercase tracking-widest text-[--color-muted] mb-6">What to Cover</h3>
                    <ul className="space-y-4">
                        {[
                            "Your name and city",
                            "What kind of content you make / your niche",
                            "Your energy and communication style",
                            "Why you're excited to work with brands"
                        ].map((item, idx) => (
                            <li key={idx} className="flex gap-3">
                                <span className="text-[--color-sage] mt-1 shrink-0"><CheckCircle size={18} /></span>
                                <span className="font-sans text-sm text-[--color-ink]">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3 className="font-mono text-xs uppercase tracking-widest text-[--color-muted] mb-6">Technical Requirements</h3>
                    <ul className="space-y-3">
                        <li className="flex gap-3"><span className="text-[--color-sage] shrink-0 mt-0.5"><Check size={16} /></span> <span className="font-sans text-sm text-[--color-ink]">Under 2 minutes</span></li>
                        <li className="flex gap-3"><span className="text-[--color-sage] shrink-0 mt-0.5"><Check size={16} /></span> <span className="font-sans text-sm text-[--color-ink]">Face fully visible, well-lit</span></li>
                        <li className="flex gap-3"><span className="text-[--color-sage] shrink-0 mt-0.5"><Check size={16} /></span> <span className="font-sans text-sm text-[--color-ink]">Quiet space — no traffic/fan noise</span></li>
                        <li className="flex gap-3"><span className="text-[--color-sage] shrink-0 mt-0.5"><Check size={16} /></span> <span className="font-sans text-sm text-[--color-ink]">Stable shot — prop phone or use tripod</span></li>
                        <li className="flex gap-3"><span className="text-[--color-muted] shrink-0 mt-0.5"><XCircle size={16} /></span> <span className="font-sans text-sm text-[--color-ink]">No sunglasses or heavy filters</span></li>
                        <li className="flex gap-3"><span className="text-[--color-muted] shrink-0 mt-0.5"><XCircle size={16} /></span> <span className="font-sans text-sm text-[--color-ink]">No reading from a script on screen</span></li>
                        <li className="flex gap-3"><span className="text-[--color-muted] shrink-0 mt-0.5"><XCircle size={16} /></span> <span className="font-sans text-sm text-[--color-ink]">No dark, blurry, or shaky footage</span></li>
                    </ul>
                </div>
            </div>

            <div className="bg-white border border-[--color-border] rounded-2xl p-8 max-w-3xl mx-auto text-center border-l-4 border-l-[--color-tan]">
                <h3 className="font-mono text-xs uppercase tracking-widest text-[--color-muted] mb-4">Sample Script (Say it in your own words)</h3>
                <p className="font-sans text-base text-[--color-ink] leading-relaxed italic">
                    &quot;Hi, I&apos;m [Name] from [City]. I create content around [niche/interests]. My style is [natural / energetic / calm / conversational] and I love making videos that feel real and relatable. I&apos;m looking forward to collaborating with brands and delivering content that actually connects with people.&quot;
                </p>
            </div>
        </div>
    </section>
);

const CreatorRules = () => (
    <section className="bg-white py-20 md:py-32 border-b border-[--color-border]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
                <div className="text-center mb-16">
                    <h2 className="font-display text-3xl md:text-5xl tracking-tight leading-[1.1] text-[--color-ink] mb-4">Creator Code of Conduct</h2>
                    <p className="font-sans text-base text-[--color-muted] max-w-[65ch] mx-auto leading-relaxed">
                        We maintain a zero-tolerance policy for dishonest or unprofessional behaviour. Violations result in permanent removal from the platform — no warnings, no second chances for serious breaches.
                    </p>
                </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="bg-[--color-cream] p-8 rounded-2xl border border-[--color-border]">
                    <h3 className="font-mono text-xs text-[--color-sage] uppercase tracking-widest mb-6 flex items-center gap-2"><CheckCircle weight="fill" /> Always Do This</h3>
                    <ul className="space-y-4">
                        {[
                            "Follow the brief exactly — script, key messages, tone.",
                            "Shoot in good lighting — quality reflects on the brand.",
                            "Submit before deadline — communicate before if delayed.",
                            "Keep raw footage for 7 days in case of revisions.",
                            "Be yourself — authentic content outperforms acting."
                        ].map((item, idx) => (
                            <li key={idx} className="flex gap-3 font-sans text-sm text-[--color-ink] leading-relaxed">
                                <span className="text-[--color-sage] mt-1 shrink-0">•</span> {item}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="bg-[--color-cream] p-8 rounded-2xl border border-[--color-border]">
                    <h3 className="font-mono text-xs text-red-500 uppercase tracking-widest mb-6 flex items-center gap-2"><XCircle weight="fill" /> Never Do This</h3>
                    <ul className="space-y-4">
                        {[
                            "Go silent after accepting a brief (most common ban reason).",
                            "Submit content that doesn't match the brief.",
                            "Make false or exaggerated claims about a product.",
                            "Post brand content on your channels without permission.",
                            "Submit dark, blurry, or unusable footage.",
                            "Accept a brief when you're unavailable."
                        ].map((item, idx) => (
                            <li key={idx} className="flex gap-3 font-sans text-sm text-[--color-ink] leading-relaxed">
                                <span className="text-[--color-muted] mt-1 shrink-0">•</span> {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="border border-red-200 bg-red-50/50 p-8 rounded-2xl max-w-full">
                <h3 className="font-mono text-xs text-red-600 uppercase tracking-widest mb-4 flex items-center gap-2"><WarningOctagon weight="fill" className="text-lg" /> Permanently Banned Behaviour</h3>
                <p className="font-sans text-sm text-[--color-ink] leading-relaxed mb-6">The following result in an immediate and permanent ban from MakeUGC:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                    {[
                        "Making false product claims in content",
                        "Keeping a product without delivering content",
                        "Sharing brand briefs with third parties",
                        "Submitting AI-generated or fake footage",
                        "Abusive communication with brands/team",
                        "Creating fake reviews or misleading content"
                    ].map((item, idx) => (
                        <div key={idx} className="flex gap-3 items-start font-sans text-sm text-[--color-ink]">
                            <span className="text-red-500 mt-0.5 shrink-0"><XCircle weight="fill" /></span> <span>{item}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-12 bg-[--color-cream] p-8 rounded-2xl border border-[--color-border]">
                <h3 className="font-mono text-xs uppercase tracking-widest text-[--color-muted] mb-4">Revision Policy</h3>
                <ul className="space-y-3 font-sans text-sm text-[--color-ink] leading-relaxed">
                    <li>• Each brief includes up to <strong>2 revision rounds</strong>.</li>
                    <li>• Revisions needed because you didn&apos;t follow the brief = your responsibility.</li>
                    <li>• Revisions because the brand changed their mind = paid separately.</li>
                    <li>• A pattern of low-quality submissions will affect your rating.</li>
                </ul>
            </div>
        </div>
    </section>
);

const CreatorFAQ = () => (
    <section id="faq" className="bg-[--color-cream] py-20 md:py-32 border-b border-[--color-border]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
                <h2 className="font-display text-3xl md:text-5xl text-[--color-ink] tracking-tight mb-16 text-center">FAQ</h2>
            </Reveal>
            <div className="space-y-2 relative z-10">
                <Accordion
                    question="Do I need a professional camera?"
                    answer="No. Most UGC is shot on smartphones. What matters is lighting, audio, and confidence on camera."
                />
                <Accordion
                    question="How often will I get briefs?"
                    answer="Depends on your niche and activity. Active creators in popular niches get 4–10 briefs a month."
                />
                <Accordion
                    question="How do I get paid?"
                    answer="Bank transfer within 7–10 days of approved delivery."
                />
                <Accordion
                    question="Can I work with multiple platforms?"
                    answer="Yes. We don't ask for exclusivity."
                />
                <Accordion
                    question="What if a brand asks for revisions?"
                    answer="Minor revisions are expected. Brief-specific guidelines reduce this significantly."
                />
                <Accordion
                    question="Do I get to keep the free products?"
                    answer="It depends on the brand. While you usually keep the products, some may request high-value items to be returned. Generally, products valued under ₹500 are yours to keep."
                />
                <Accordion
                    question="Do I have to edit the videos myself?"
                    answer="In most cases, we only require the raw/trimmed clips. We handle the final professional editing, captions, and music."
                />
                <Accordion
                    question="What languages are in demand?"
                    answer="English, Hindi, and regional languages like Tamil, Bengali, Punjabi, Malayalam, Telugu, Kannada, and Marathi are all highly requested by brands."
                />
            </div>
        </div>
    </section>
);

const CommunitySection = () => (
    <section className="bg-white py-20 md:py-32 border-b border-[--color-border]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Reveal>
                <h2 className="font-display text-3xl md:text-5xl tracking-tight leading-[1.1] text-[--color-ink] mb-6">Join Our Creator Community</h2>
                <p className="font-sans text-base text-[--color-muted] max-w-[60ch] mx-auto leading-relaxed mb-12">
                    All approved creators get access to our private WhatsApp group where we share new brief alerts, tips to improve your rate, direct support, and payment updates.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4 mb-20">
                    <a href="https://chat.whatsapp.com/IZxyjlqTfxR6Nt0wURBjEH" target="_blank" rel="noopener noreferrer" className="bg-[#25D366] text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-[#20bd5a] transition-colors shadow-sm cursor-pointer inline-flex items-center justify-center gap-2">
                        <ChatCircleText size={20} weight="fill" /> WhatsApp Community <span className="font-sans font-light opacity-80 pl-1">→</span>
                    </a>
                    <p className="font-sans text-xs text-[--color-muted] mt-4 sm:mt-0 sm:self-center italic">(Profile approval required)</p>
                </div>
            </Reveal>

            <Reveal delay={200}>
                <div className="max-w-lg mx-auto border-t border-[--color-border] pt-16">
                    <h3 className="font-mono text-xs uppercase tracking-widest text-[--color-muted] mb-8">Questions? Contact Us</h3>
                    <div className="flex flex-col gap-6 font-sans text-sm text-[--color-ink]">
                        <div className="flex justify-between items-center border-b border-[--color-border] pb-4">
                            <span className="text-[--color-muted]">WhatsApp</span>
                            <a href="https://wa.me/919239161632" className="text-[--color-sage] hover:underline">+91 9239161632</a>
                        </div>
                        <div className="flex justify-between items-center border-b border-[--color-border] pb-4">
                            <span className="text-[--color-muted]">Email</span>
                            <a href="mailto:creators@makeugc.in" className="text-[--color-sage] hover:underline">creators@makeugc.in</a>
                        </div>
                        <div className="flex justify-between items-center pb-4">
                            <span className="text-[--color-muted]">Website</span>
                            <a href="https://app.makeugc.in" className="text-[--color-sage] hover:underline">app.makeugc.in</a>
                        </div>
                    </div>
                </div>
            </Reveal>
        </div>
    </section>
);

const CTABand = () => (
    <section className="bg-[--color-tan] py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Reveal>
                <h2 className="font-display text-4xl md:text-5xl text-white mb-6">Ready? Apply Now.</h2>
            </Reveal>
            <Reveal delay={100}>
                <p className="font-sans text-lg text-white/80 mb-10">Takes less than 10 minutes. Brands are waiting.</p>
            </Reveal>
            <Reveal delay={200}>
                <Button href="https://app.makeugc.in/sign-up" className="!bg-white !text-[--color-tan] hover:!bg-white/90">
                    Sign Up as Creator <span className="ml-2 font-sans font-light">→</span>
                </Button>
            </Reveal>
            <Reveal delay={300}>
                <p className="font-sans text-xs text-white/60 max-w-3xl mx-auto leading-relaxed mt-16 italic">
                    By applying, you agree to MakeUGC&apos;s creator terms and code of conduct. All content created under a paid brief becomes brand property upon final payment. Your personal data is never shared with third parties. MakeUGC reserves the right to suspend or permanently remove creator accounts for conduct violations.
                </p>
                <div className="font-display text-lg text-white/40 mt-8">MakeUGC — Built for creators who show up.</div>
            </Reveal>
        </div>
    </section>
);

export default function CreatorsPage() {
    return (
        <main className="flex-grow flex flex-col">
            {/* Hero */}
            <section className="relative bg-[--color-cream] pt-40 pb-20 md:pt-48 md:pb-32 flex flex-col overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
                        <div className="max-w-2xl">
                            <Reveal>
                                <h1 className="font-display text-5xl md:text-7xl tracking-tight leading-[1.05] text-[--color-ink] mb-4">
                                    Get Paid to Create.
                                </h1>
                            </Reveal>
                            <Reveal delay={100}>
                                <p className="font-display italic text-2xl text-[--color-sage] mb-10 tracking-tight">
                                    No follower count required. You set your price.
                                </p>
                            </Reveal>
                            <Reveal delay={200}>
                                <p className="font-sans text-lg md:text-xl text-[--color-muted] max-w-[55ch] leading-relaxed mb-12">
                                    MakeUGC connects real, camera-comfortable creators with brands that need authentic video content for paid ads. Work from home. On your schedule. Name your rate. Get paid per video.
                                </p>
                            </Reveal>
                            <Reveal delay={300}>
                                <div className="flex items-center gap-4">
                                    <Button href="https://app.makeugc.in/sign-up" variant="primary">
                                        Get Paid to Create <span className="ml-2 font-sans font-light cursor-pointer">→</span>
                                    </Button>
                                    <span className="font-mono text-xs uppercase tracking-widest text-[--color-muted] hidden sm:block">app.makeugc.in/sign-up</span>
                                </div>
                            </Reveal>
                        </div>

                        <div className="relative w-full h-[350px] md:h-[500px] lg:h-[600px] flex justify-center items-center">
                            <Reveal delay={400} className="w-full h-full">
                                <div className="relative w-full h-full">
                                    <Image src="/image/creator1.webp" alt="MakeUGC Creator" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain lg:object-right-bottom" priority />
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>

            <WhyJoin />
            <CreatorTypesTabs />
            <CreatorTypeTable />
            <EarningsCallout />
            <HowToApply />
            <IntroVideoGuide />
            <CreatorRules />
            <CreatorFAQ />
            <CommunitySection />
            <CTABand />
        </main>
    );
}
