import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Fraunces, DM_Sans, DM_Mono, Sora } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/nav/Navbar";
import Footer from "@/components/layout/Footer";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { PostHogProvider } from "@/components/providers/PostHogProvider";
import { TrustedBrands } from "@/components/sections/TrustedBrands";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const dmMono = DM_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-dm-mono",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#086972",
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.makeugc.in"),
  title: {
    default: "MakeUGC — UGC Video Ads for D2C & E-commerce Brands",
    template: "%s | MakeUGC",
  },
  description:
    "Connect your brand with India's top UGC creators. Scroll-stopping video ads for Meta, Instagram & YouTube — from self-serve to full AI+human production.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "MakeUGC — UGC Video Ads for D2C & E-commerce Brands",
    description: "Connect your brand with India's top UGC creators. Scroll-stopping video ads for Meta, Instagram & YouTube.",
    url: "https://www.makeugc.in",
    siteName: "MakeUGC",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MakeUGC — Performance UGC for Brands",
    description: "Scroll-stopping video ads for Meta, Instagram & YouTube.",
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icons/icon-192.png",
  },
};

import LayoutWrapper from "@/components/layout/LayoutWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${dmSans.variable} ${dmMono.variable} ${sora.variable}`}>
      <head />
      <body className="antialiased min-h-[100dvh] flex flex-col relative w-full overflow-x-hidden">
        <div className="grain-overlay" aria-hidden="true"></div>
        <PostHogProvider>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
          <ThemeSwitcher />
        </PostHogProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(
                    function(registration) {
                      console.log('Service Worker registration successful with scope: ', registration.scope);
                    },
                    function(err) {
                      console.log('Service Worker registration failed: ', err);
                    }
                  );
                });
              }
            `,
          }}
        />

        {/* ── NeetoCal: initialise the embed queue as early as possible ── */}
        <Script id="neetocal-init" strategy="afterInteractive">
          {`window.neetoCal = window.neetoCal || { embed: function() { (neetoCal.q = neetoCal.q || []).push(arguments); } };`}
        </Script>

        {/* ── NeetoCal embed SDK ── */}
        <Script
          id="neetocal-sdk"
          src="https://cdn.neetocal.com/javascript/embed.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
