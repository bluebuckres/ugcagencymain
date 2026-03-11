import React from 'react';
import Image from 'next/image';

export function LogoTicker() {
    // List of logos loaded from the public/brand_logo folder
    const logos = [
        { src: "/brand_logo/Pepperfry_New_Logo.png", alt: "Pepperfry" },
        { src: "/brand_logo/Snitch-logo.png", alt: "Snitch" },
        { src: "/brand_logo/soulestore.png", alt: "The Souled Store" },
        { src: "/brand_logo/beyoung.png", alt: "Beyoung" },
        { src: "/brand_logo/blue-tokai.webp", alt: "Blue Tokai" },
        { src: "/brand_logo/minimalist-logo.webp", alt: "Minimalist" },
        { src: "/brand_logo/noise.jpg", alt: "Noise" },
        { src: "/brand_logo/rare-rabbit.png", alt: "Rare Rabbit" },
        { src: "/brand_logo/themancompany.jpeg", alt: "The Man Company" },
        { src: "/brand_logo/Urban_monkey.png", alt: "Urban Monkey" },
        { src: "/brand_logo/vishal mega.png", alt: "Vishal Mega Mart" },
        { src: "/brand_logo/wholetruth.svg", alt: "The Whole Truth" },
        { src: "/brand_logo/bewakoof.jpg", alt: "Bewakoof" }
    ];

    return (
        <div className="overflow-hidden bg-[--color-cream] py-8 border-y border-[--color-border]">
            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker {
          animation: ticker 40s linear infinite;
        }
        .animate-ticker:hover {
          animation-play-state: paused;
        }
      `}} />
            <div className="flex animate-ticker w-max items-center">
                {/* We duplicate the array to allow infinite seamless scrolling */}
                {[...logos, ...logos].map((logo, idx) => (
                    <div key={idx} className="flex-shrink-0 px-8 lg:px-12 flex items-center justify-center opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-opacity duration-300">
                        <Image
                            src={logo.src}
                            alt={logo.alt}
                            width={120}
                            height={60}
                            className="h-10 md:h-12 w-auto object-contain mix-blend-multiply"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
