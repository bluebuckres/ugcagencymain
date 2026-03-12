import React from 'react';
import Image from 'next/image';

interface CreatorCardProps {
    name: string;
    city: string;
    niches: string[];
    platforms: string[];
    delivery: string;
    rating: number;
    imageUrl: string;
}

export function CreatorCard({ name, city, niches, platforms, delivery, rating, imageUrl }: CreatorCardProps) {
    return (
        <div className="bg-white border border-[--color-border] rounded-2xl p-6 hover:shadow-[0_8px_32px_-8px_rgba(8,105,114,0.15)] hover:-translate-y-[2px] transition-all duration-300 flex flex-col h-full group">
            <div className="flex items-center gap-4 mb-6">
                <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 border border-[--color-border]">
                    <Image src={imageUrl} alt={name} fill className="object-cover" />
                </div>
                <div>
                    <h4 className="font-sans text-sm font-medium text-[--color-ink]">{name}</h4>
                    <p className="font-sans text-xs text-[--color-muted]">{city}</p>
                </div>
            </div>

            <div className="space-y-4 flex-grow">
                <div>
                    <div className="flex flex-wrap gap-2">
                        {niches.map((niche) => (
                            <span key={niche} className="font-mono text-[10px] bg-[--color-cream] border border-[--color-border] text-[--color-sage] uppercase tracking-widest px-2 py-1 rounded-full">
                                {niche}
                            </span>
                        ))}
                    </div>
                </div>
                <div>
                    <p className="font-sans text-xs text-[--color-muted]">Platforms: <span className="text-[--color-ink]">{platforms.join(', ')}</span></p>
                </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[--color-border] flex items-center justify-between">
                <div className="flex items-center gap-3 font-mono text-xs text-[--color-muted]">
                    <span>{delivery}</span>
                    <span>|</span>
                    <span className="flex items-center gap-1 text-[--color-tan]">★ {rating}</span>
                </div>
            </div>

            <div className="mt-4 pt-2">
                <span className="font-sans text-sm font-medium text-[--color-sage] group-hover:underline underline-offset-4">
                    View Profile →
                </span>
            </div>
        </div>
    );
}
