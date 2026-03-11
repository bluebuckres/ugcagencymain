import React from "react";
import { Button } from "../ui/Button";

export function FinalCTA() {
    return (
        <section className="bg-[--color-tan] py-24 md:py-32">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1] mb-6">
                    Your next high-performing ad starts here.
                </h2>
                <p className="font-sans text-lg md:text-xl text-white/80 leading-relaxed mb-12 max-w-2xl mx-auto">
                    Join 200+ brands getting scroll-stopping UGC — from creator access to full AI-powered production.
                </p>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                    <Button
                        href="/contact"
                        className="w-full sm:w-auto !bg-white !text-[--color-tan] hover:!bg-white/90"
                    >
                        Start a Project <span className="ml-2 font-sans font-light">→</span>
                    </Button>
                    <Button
                        href="/contact"
                        variant="ghost"
                        className="w-full sm:w-auto"
                    >
                        Talk to Us
                    </Button>
                </div>
            </div>
        </section>
    );
}
