"use client";

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { Reveal } from '@/components/ui/Reveal';
import { CheckCircle } from "@phosphor-icons/react";

export function ContactServiceBanner() {
    const searchParams = useSearchParams();
    const service = searchParams.get("service");
    const niche = searchParams.get("niche");

    if (!service) return null;

    return (
        <Reveal delay={150}>
            <div className="mb-8 p-4 rounded-2xl bg-green-50 border border-green-200 flex items-center gap-3 max-w-xl mx-auto">
                <CheckCircle size={24} className="text-green-600 shrink-0" />
                <div className="font-sans text-sm text-[--color-ink]">
                    Enquiring about: <strong className="text-green-700">{service}</strong>
                    {niche ? <span className="text-[--color-muted]"> for {niche}</span> : ""}
                </div>
            </div>
        </Reveal>
    );
}
