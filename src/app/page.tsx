import { Hero } from "@/components/sections/Hero";
import { StatsBar } from "@/components/sections/StatsBar";
import { ProblemStatement } from "@/components/sections/ProblemStatement";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Services } from "@/components/sections/Services";
import { WhoItsFor } from "@/components/sections/WhoItsFor";
import { CreatorNetwork } from "@/components/sections/CreatorNetwork";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCTA } from "@/components/sections/FinalCTA";
import JsonLd from "@/components/seo/JsonLd";

export default function Home() {
  const orgSchema = {
    name: "MakeUGC",
    url: "https://www.makeugc.in",
    logo: "https://www.makeugc.in/ugc-logo-2.svg",
    description: "India's performance UGC platform for D2C brands and creators.",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-9239161632",
      contactType: "customer service",
      email: "connect@makeugc.in",
      availableLanguage: ["English", "Hindi"],
    },
    sameAs: [
      "https://www.linkedin.com/company/makeugc",
      "https://www.instagram.com/makeugc.in",
      "https://twitter.com/makeugcin",
    ],
  };

  return (
    <>
      <JsonLd type="Organization" data={orgSchema} />
      <main className="flex-grow flex flex-col">
        {/*
          Alternating background rhythm established in blueprint: 
          1. Hero (Cream)
          2. StatsBar (White)
          3. Problem (White, no header)
          4. How It Works (Cream)
          5. Services (White)
          6. Who It's For (Cream)
          7. Creator Network (White)
          8. Testimonials (Cream)
          9. Final CTA (Tan)
        */}
        <Hero />
        <StatsBar />
        <ProblemStatement />
        <HowItWorks />
        <Services />
        <WhoItsFor />
        <CreatorNetwork />
        <Testimonials />
        <FinalCTA />
      </main>
    </>
  );
}
