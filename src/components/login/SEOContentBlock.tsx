import { CheckCircle, Users, TrendUp, Handshake } from "@phosphor-icons/react/dist/ssr";

export function SEOContentBlock() {
  return (
    <div className="flex flex-col justify-center h-full max-w-[500px]">
      <div className="mb-10">
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-[--color-ink] tracking-tight leading-[1.1] mb-6">
          Welcome to MakeUGC.
        </h1>
        <p className="font-sans text-lg text-[--color-muted] leading-relaxed">
          India's performance UGC platform. Log in to manage your campaigns, source vetted creators, or submit your deliverables.
        </p>
      </div>

      <div className="space-y-6 pt-6 border-t border-[--color-border]">
        <h3 className="font-sans font-medium text-[--color-ink] uppercase tracking-widest text-xs mb-2">Platform Highlights</h3>
        
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-[--color-tan]/15 text-[--color-tan] flex items-center justify-center shrink-0">
            <TrendUp size={20} weight="fill" />
          </div>
          <div>
            <h4 className="font-sans font-medium text-[--color-ink]">For Brands & Agencies</h4>
            <p className="font-sans text-sm text-[--color-muted] mt-1">Access India's largest network of vetted performance creators. Post briefs, review shortlists, and launch high-converting campaigns.</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-[--color-sage]/15 text-[--color-sage] flex items-center justify-center shrink-0">
            <Users size={20} weight="fill" />
          </div>
          <div>
            <h4 className="font-sans font-medium text-[--color-ink]">For Creators</h4>
            <p className="font-sans text-sm text-[--color-muted] mt-1">Get matched with premium D2C brands. Manage your ongoing projects, submit content, and track your payments all in one place.</p>
          </div>
        </div>
      </div>
      
      {/* Trust Micro-line */}
      <div className="mt-12 flex items-center gap-2">
        <Handshake size={20} className="text-[#d8a868]" />
        <span className="font-mono text-xs text-[--color-muted] uppercase tracking-wider">Trusted by 500+ Top Indian Brands</span>
      </div>
    </div>
  );
}
