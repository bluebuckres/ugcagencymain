import Link from "next/link";
import { LinkedinLogo, InstagramLogo, XLogo } from "@phosphor-icons/react/dist/ssr";

export default function Footer() {
    return (
        <footer className="bg-[--color-cream] border-t border-[--color-border] px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">

                {/* ── Mobile compact footer ── */}
                <div className="md:hidden py-6 space-y-4">

                    {/* Row 1: Brand name + tagline + social */}
                    <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                            <Link href="/" className="font-display font-medium text-lg tracking-tight text-[--color-ink]">
                                MakeUGC<span className="text-[--color-tan]">.in</span>
                            </Link>
                            <p className="font-sans text-xs text-[--color-muted] leading-relaxed max-w-[200px]">
                                India&apos;s performance first UGC platform for D2C &amp; e-commerce brands.
                            </p>
                        </div>
                        <div className="flex gap-3 items-center shrink-0 pt-0.5">
                            <a href="https://in.linkedin.com/company/makeugc-in" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-[--color-sage] hover:text-[--color-tan] transition-standard">
                                <LinkedinLogo size={20} />
                            </a>
                            <a href="https://www.instagram.com/makeugc.in/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-[--color-sage] hover:text-[--color-tan] transition-standard">
                                <InstagramLogo size={20} />
                            </a>
                            <a href="https://x.com/makeugc_in" target="_blank" rel="noopener noreferrer" aria-label="X" className="text-[--color-sage] hover:text-[--color-tan] transition-standard">
                                <XLogo size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Row 2: Contact details */}
                    <div className="flex flex-wrap gap-x-4 gap-y-0.5 py-3 border-y border-[--color-border]">
                        <a href="mailto:connect@makeugc.in" className="font-sans text-xs text-[--color-muted] hover:text-[--color-ink] transition-standard">connect@makeugc.in</a>
                        <a href="mailto:creators@makeugc.in" className="font-sans text-xs text-[--color-muted] hover:text-[--color-ink] transition-standard">creators@makeugc.in</a>
                        <a href="tel:+919239161632" className="font-sans text-xs text-[--color-muted] hover:text-[--color-ink] transition-standard">+91 92391 61632</a>
                        <span className="basis-full font-sans text-xs text-[--color-muted]/60">Mon–Sat 10AM–7PM IST</span>
                    </div>

                    {/* Row 3: Nav links — 3 columns with headings */}
                    <div className="grid grid-cols-3 gap-x-3 gap-y-3">
                        <div className="space-y-2">
                            <p className="font-sans font-semibold text-[10px] uppercase tracking-widest text-[--color-ink]">Brands</p>
                            <Link href="/brands" className="block font-sans text-xs text-[--color-muted] hover:text-[--color-tan] transition-standard">Self-Serve</Link>
                            <Link href="/brands" className="block font-sans text-xs text-[--color-muted] hover:text-[--color-tan] transition-standard">Managed UGC</Link>
                            <Link href="/brands" className="block font-sans text-xs text-[--color-muted] hover:text-[--color-tan] transition-standard">Full Studio</Link>
                            <Link href="/ai-ugc" className="block font-sans text-xs text-[--color-muted] hover:text-[--color-tan] transition-standard">AI UGC</Link>
                            <Link href="/pricing" className="block font-sans text-xs text-[--color-muted] hover:text-[--color-tan] transition-standard">Pricing</Link>
                        </div>
                        <div className="space-y-2">
                            <p className="font-sans font-semibold text-[10px] uppercase tracking-widest text-[--color-ink]">Creators</p>
                            <Link href="/creators" className="block font-sans text-xs text-[--color-muted] hover:text-[--color-tan] transition-standard">Join as a Creator</Link>
                            <Link href="/how-it-works" className="block font-sans text-xs text-[--color-muted] hover:text-[--color-tan] transition-standard">How It Works</Link>
                            <Link href="/creators#faq" className="block font-sans text-xs text-[--color-muted] hover:text-[--color-tan] transition-standard">Creator FAQ</Link>
                            <Link href="#" className="block font-sans text-xs text-[--color-muted] hover:text-[--color-tan] transition-standard">Guidelines</Link>
                        </div>
                        <div className="space-y-2">
                            <p className="font-sans font-semibold text-[10px] uppercase tracking-widest text-[--color-ink]">Company</p>
                            <Link href="/about" className="block font-sans text-xs text-[--color-muted] hover:text-[--color-tan] transition-standard">About Us</Link>
                            <Link href="/blog" className="block font-sans text-xs text-[--color-muted] hover:text-[--color-tan] transition-standard">Blog</Link>
                            <Link href="/careers" className="block font-sans text-xs text-[--color-muted] hover:text-[--color-tan] transition-standard">Careers</Link>
                            <Link href="/contact" className="block font-sans text-xs text-[--color-muted] hover:text-[--color-tan] transition-standard">Contact</Link>
                        </div>
                    </div>

                    {/* Bottom strip: copyright + legal */}
                    <div className="pt-3 border-t border-[--color-border] flex flex-wrap items-center justify-between gap-y-1">
                        <p className="font-sans text-[10px] text-[--color-muted]">© {new Date().getFullYear()} MakeUGC. All rights reserved.</p>
                        <div className="flex gap-3">
                            <Link href="/privacy-policy" className="font-sans text-[10px] text-[--color-muted] hover:text-[--color-ink] transition-standard">Privacy</Link>
                            <Link href="/terms" className="font-sans text-[10px] text-[--color-muted] hover:text-[--color-ink] transition-standard">Terms</Link>
                            <Link href="/anti-discrimination" className="font-sans text-[10px] text-[--color-muted] hover:text-[--color-ink] transition-standard">Anti-Disc.</Link>
                        </div>
                    </div>
                </div>

                {/* ── Desktop full footer (unchanged) ── */}
                <div className="hidden md:block pt-16 pb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">

                        {/* Brand Col */}
                        <div className="lg:col-span-2 space-y-6">
                            <Link href="/" className="inline-block group outline-none">
                                <span className="font-display font-medium text-2xl tracking-tight text-[--color-ink]">
                                    MakeUGC<span className="text-[--color-tan]">.in</span>
                                </span>
                            </Link>
                            <p className="text-[--color-muted] font-sans text-sm max-w-xs leading-relaxed">
                                India&apos;s performance UGC platform for D2C, e-commerce &amp; digital-first brands.
                            </p>
                            <div className="pt-2 flex flex-col gap-1.5">
                                <a href="mailto:connect@makeugc.in" className="font-sans text-sm text-[--color-muted] hover:text-[--color-ink] transition-standard">connect@makeugc.in</a>
                                <a href="mailto:creators@makeugc.in" className="font-sans text-sm text-[--color-muted] hover:text-[--color-ink] transition-standard">creators@makeugc.in</a>
                                <p className="font-sans text-sm text-[--color-muted] pt-1">+91 9239161632</p>
                                <span className="font-sans text-xs text-[--color-muted]/70">Mon–Sat 10AM–7PM IST</span>
                            </div>
                        </div>

                        {/* Nav Cols */}
                        <div className="space-y-4">
                            <h4 className="font-sans font-medium text-[--color-ink] text-sm">For Brands</h4>
                            <ul className="space-y-3">
                                <li><Link href="/brands" className="font-sans text-sm text-[--color-muted] hover:text-[--color-tan] transition-standard">Self-Serve</Link></li>
                                <li><Link href="/brands" className="font-sans text-sm text-[--color-muted] hover:text-[--color-tan] transition-standard">Managed UGC</Link></li>
                                <li><Link href="/brands" className="font-sans text-sm text-[--color-muted] hover:text-[--color-tan] transition-standard">Full Studio</Link></li>
                                <li><Link href="/ai-ugc" className="font-sans text-sm text-[--color-muted] hover:text-[--color-tan] transition-standard">AI UGC</Link></li>
                                <li><Link href="/pricing" className="font-sans text-sm text-[--color-muted] hover:text-[--color-tan] transition-standard">Pricing</Link></li>
                            </ul>
                        </div>

                        <div className="space-y-4">
                            <h4 className="font-sans font-medium text-[--color-ink] text-sm">For Creators</h4>
                            <ul className="space-y-3">
                                <li><Link href="/creators" className="font-sans text-sm text-[--color-muted] hover:text-[--color-tan] transition-standard">Join as a Creator</Link></li>
                                <li><Link href="/how-it-works" className="font-sans text-sm text-[--color-muted] hover:text-[--color-tan] transition-standard">How It Works</Link></li>
                                <li><Link href="/creators#faq" className="font-sans text-sm text-[--color-muted] hover:text-[--color-tan] transition-standard">Creator FAQ</Link></li>
                                <li><Link href="#" className="font-sans text-sm text-[--color-muted] hover:text-[--color-tan] transition-standard">Guidelines</Link></li>
                            </ul>
                        </div>

                        <div className="space-y-4">
                            <h4 className="font-sans font-medium text-[--color-ink] text-sm">Company</h4>
                            <ul className="space-y-3">
                                <li><Link href="/about" className="font-sans text-sm text-[--color-muted] hover:text-[--color-tan] transition-standard">About Us</Link></li>
                                <li><Link href="/blog" className="font-sans text-sm text-[--color-muted] hover:text-[--color-tan] transition-standard">Blog</Link></li>
                                <li><Link href="/careers" className="font-sans text-sm text-[--color-muted] hover:text-[--color-tan] transition-standard">Careers</Link></li>
                            </ul>
                            <div className="pt-4 flex gap-3 items-center">
                                <a href="https://in.linkedin.com/company/makeugc-in" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-[--color-sage] hover:text-[--color-tan] transition-standard">
                                    <LinkedinLogo size={22} />
                                </a>
                                <a href="https://www.instagram.com/makeugc.in/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-[--color-sage] hover:text-[--color-tan] transition-standard">
                                    <InstagramLogo size={22} />
                                </a>
                                <a href="https://x.com/makeugc_in" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="text-[--color-sage] hover:text-[--color-tan] transition-standard">
                                    <XLogo size={22} />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* SEO Internal Links — City × Service combinations */}
                    <div className="py-8 border-t border-[--color-border]">
                        <h4 className="font-sans text-xs font-medium text-[--color-muted] uppercase tracking-widest mb-4">Popular Searches</h4>
                        <div className="flex flex-wrap gap-x-4 gap-y-2">
                            {[
                                { label: "UGC Creators in Mumbai", href: "/creators" },
                                { label: "UGC Creators in Delhi", href: "/creators" },
                                { label: "UGC Creators in Bangalore", href: "/creators" },
                                { label: "UGC Agency India", href: "/brands" },
                                { label: "AI UGC Videos", href: "/ai-ugc" },
                                { label: "UGC for D2C Brands", href: "/brands" },
                                { label: "Hire UGC Creators", href: "/creators" },
                                { label: "UGC Video Ads Pricing", href: "/pricing" },
                            ].map((link) => (
                                <Link key={link.label} href={link.href} className="font-sans text-xs text-[--color-muted] hover:text-[--color-tan] transition-standard">
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="pt-8 border-t border-[--color-border] flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="font-sans text-xs text-[--color-muted]">
                            © {new Date().getFullYear()} MakeUGC. All rights reserved. <span className="ml-2 hidden md:inline">•</span> <span className="md:ml-2 block md:inline mt-2 md:mt-0">*Stats as of 31 Dec 2025</span>
                        </p>
                        <div className="flex flex-wrap gap-4 md:gap-6 justify-center">
                            <Link href="/privacy-policy" className="font-sans text-xs text-[--color-muted] hover:text-[--color-ink] transition-standard">Privacy Policy</Link>
                            <Link href="/terms" className="font-sans text-xs text-[--color-muted] hover:text-[--color-ink] transition-standard">Terms of Service</Link>
                            <Link href="/anti-discrimination" className="font-sans text-xs text-[--color-muted] hover:text-[--color-ink] transition-standard">Anti-Discrimination Policy</Link>
                        </div>
                    </div>
                </div>

            </div>
        </footer>
    );
}
