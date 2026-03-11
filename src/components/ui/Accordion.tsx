"use client";
import React, { useState, useRef } from 'react';
import { Plus, Minus } from '@phosphor-icons/react';

interface AccordionProps {
    question: string;
    answer: React.ReactNode;
    isOpen?: boolean;
}

export function Accordion({ question, answer, isOpen = false }: AccordionProps) {
    const [open, setOpen] = useState(isOpen);
    const contentRef = useRef<HTMLDivElement>(null);

    const toggleAccordion = () => {
        setOpen(!open);
    };

    return (
        <div className="border-b border-[--color-border] py-4">
            <button
                onClick={toggleAccordion}
                className="w-full flex justify-between items-center text-left focus:outline-none group"
            >
                <h4 className="font-sans text-base font-medium text-[--color-ink] pr-8 group-hover:text-[--color-tan] transition-colors">{question}</h4>
                <span className="text-[--color-tan] shrink-0">
                    {open ? <Minus size={20} /> : <Plus size={20} />}
                </span>
            </button>
            <div
                ref={contentRef}
                style={{
                    maxHeight: open ? `${contentRef.current?.scrollHeight}px` : '0px',
                }}
                className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
            >
                <div className="pt-4 pb-2 font-sans text-sm text-[--color-muted] leading-relaxed">
                    {answer}
                </div>
            </div>
        </div>
    );
}
