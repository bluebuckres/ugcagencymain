"use client";

import React, { useState, useEffect } from "react";
import { Palette } from "@phosphor-icons/react";

export default function ThemeSwitcher() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeColor, setActiveColor] = useState("Tan (Default)");

    // Predefined color themes
    const themes = [
        { name: "Dark Cyan (Default)", hex: "#086972" },
        { name: "Peacock Blue", hex: "#006b8f" },
        { name: "Dark Cyan", hex: "#008b8b" },
        { name: "Forest Green", hex: "#2e8b57" },
        { name: "Burnt Orange", hex: "#cc5500" },
        { name: "Deep Purple", hex: "#673ab7" },
        { name: "Crimson Red", hex: "#dc143c" },
    ];

    // Apply color to the CSS variable on the document root
    const applyTheme = (theme: { name: string, hex: string }) => {
        if (typeof document !== "undefined") {
            document.documentElement.style.setProperty("--color-tan", theme.hex);

            // Adjust hover states slightly darker
            const adjustColor = (color: string, amount: number) => {
                return '#' + color.replace(/^#/, '').replace(/../g, color => ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
            }
            // Add a darker variant for hover effects (if used in custom CSS)
            document.documentElement.style.setProperty("--color-tan-dark", adjustColor(theme.hex, -30));

            setActiveColor(theme.name);
            localStorage.setItem("makeugc-theme", JSON.stringify(theme));
        }
    };

    // Load saved theme on mount
    useEffect(() => {
        const saved = localStorage.getItem("makeugc-theme");
        if (saved) {
            applyTheme(JSON.parse(saved));
        }
    }, []);

    // Return nothing in production if you want to hide this
    if (process.env.NODE_ENV === "production" && !process.env.NEXT_PUBLIC_SHOW_THEME_SWITCHER) {
        return null;
    }

    return (
        <div className="fixed bottom-6 right-6 z-50 font-sans shadow-2xl">
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-white p-4 rounded-full border border-[--color-border] shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 group focus:outline-none"
                aria-label="Theme Settings"
            >
                <Palette size={24} className="text-[--color-ink] group-hover:text-[--color-tan] transition-colors" />
            </button>

            {/* Panel */}
            <div
                className={`absolute bottom-full right-0 mb-4 w-64 bg-white border border-[--color-border] rounded-2xl shadow-xl overflow-hidden transition-all duration-300 origin-bottom-right ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                    }`}
            >
                <div className="p-4 border-b border-[--color-border] bg-[--color-cream]">
                    <h3 className="text-sm font-medium text-[--color-ink]">Theme Settings</h3>
                    <p className="text-xs text-[--color-muted] mt-1">Experiment with primary CTA colors</p>
                </div>

                <div className="p-2 max-h-64 overflow-y-auto">
                    {themes.map((theme) => (
                        <button
                            key={theme.name}
                            onClick={() => applyTheme(theme)}
                            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-colors hover:bg-[--color-cream] ${activeColor === theme.name ? "bg-[--color-cream]" : ""
                                }`}
                        >
                            <span
                                className="w-6 h-6 rounded-full shrink-0 shadow-sm border border-black/10"
                                style={{ backgroundColor: theme.hex }}
                            />
                            <span className="text-sm text-[--color-ink] text-left flex-grow">
                                {theme.name}
                            </span>
                            {activeColor === theme.name && (
                                <span className="w-2 h-2 rounded-full bg-[--color-ink]" />
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
