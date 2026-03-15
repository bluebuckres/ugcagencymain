import type { Metadata, Viewport } from "next";
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
  title: "MakeUGC — UGC Video Ads for D2C & E-commerce Brands",
  description:
    "Connect your brand with India's top UGC creators. Scroll-stopping video ads for Meta, Instagram & YouTube — from self-serve to full AI+human production.",
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
      <head>
        {/* Preconnect to NeetoCal for faster script fetch */}
        <link rel="preconnect" href="https://cdn.neetocal.com" />
        {/* Preload NeetoCal embed script so it starts downloading with the HTML */}
        <link rel="preload" href="https://cdn.neetocal.com/javascript/embed.js" as="script" />
      </head>
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
      </body>
    </html>
  );
}
