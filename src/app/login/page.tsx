import Link from "next/link";
import { SEOContentBlock } from "@/components/login/SEOContentBlock";
import { LoginCard } from "@/components/login/LoginCard";

export default function LoginPage() {
  return (
    <div className="min-h-[100dvh] bg-[--color-cream] flex flex-col font-sans">
      
      {/* Mini Header / Logo */}
      <header className="absolute top-0 left-0 w-full p-6 md:px-12 z-10 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-1 group">
          <span className="font-display text-2xl tracking-tight text-[--color-ink] transition-colors">Make</span>
          <span className="font-display text-2xl tracking-tight text-[--color-tan] group-hover:text-[#b8956f] transition-colors">UGC</span>
          <span className="text-[--color-muted] font-medium text-xs ml-1 mt-1 opacity-60">app</span>
        </Link>
        
        {/* Help Link on Desktop */}
        <div className="hidden md:flex gap-6">
          <Link href="/contact" className="text-sm font-medium text-[--color-muted] hover:text-[--color-ink] transition-colors">
            Support
          </Link>
        </div>
      </header>

      {/* Main Split Layout Container */}
      <main className="flex-1 flex flex-col lg:flex-row w-full max-w-[1440px] mx-auto min-h-[100dvh]">
        
        {/* Left Side: SEO & Context Block (Hidden completely on small screens, shown 50% on lg) */}
        <div className="hidden lg:flex w-[55%] items-center pt-20 px-12 lg:px-20 xl:px-32 relative">
          
          {/* Subtle noise grid texture behind the text */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.03] pointer-events-none" />
          
          <div className="w-full relative z-10">
            <SEOContentBlock />
          </div>
        </div>

        {/* Right Side: Login Portal (Takes up 100% on mobile, 45% on desktop) */}
        <div className="w-full lg:w-[45%] flex flex-col items-center justify-center p-6 sm:p-12 relative bg-white/40 lg:bg-transparent">
          
          {/* Mobile SEO text (Shows only on small screens below the card) */}
          <div className="lg:hidden w-full max-w-[480px] mb-8 mt-16 text-center">
            <h1 className="font-display text-3xl text-[--color-ink] tracking-tight mb-2">
              Welcome to MakeUGC.
            </h1>
            <p className="font-sans text-sm text-[--color-muted]">
              India's performance UGC platform.
            </p>
          </div>

          <div className="w-full max-w-[480px] z-10 relative">
            <LoginCard />
          </div>
          
          {/* Optional: Add a subtle copyright text at bottom for mobile only since footer isn't shown */}
          <div className="lg:hidden mt-12 text-center text-xs text-[--color-muted]">
            © {new Date().getFullYear()} MakeUGC.in
          </div>
        </div>

      </main>
    </div>
  );
}
