"use client";

import React, { useState } from "react";
import { CalendarModal } from "./CalendarModal";

interface BookCallButtonProps {
    className?: string;
    children?: React.ReactNode;
}

export function BookCallButton({ className, children }: BookCallButtonProps) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className={className}
            >
                {children || "Book a Strategy Call"}
            </button>
            <CalendarModal open={open} onClose={() => setOpen(false)} />
        </>
    );
}
