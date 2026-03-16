"use client";

import React, { useEffect } from "react";

interface BookCallButtonProps {
    className?: string;
    children?: React.ReactNode;
}

/**
 * Registers the NeetoCal elementClick popup after the button mounts.
 * This guarantees the DOM element exists before NeetoCal binds its
 * click/touch listener — critical for iOS/Android reliability.
 */
export function BookCallButton({ className, children }: BookCallButtonProps) {
    useEffect(() => {
        const win = window as any;

        function register() {
            if (typeof win.neetoCal?.embed !== "function") {
                return setTimeout(register, 50);
            }
            win.neetoCal.embed({
                type: "elementClick",
                id: "6799c111-4acd-4187-b7bc-8a3f7c526af5",
                organization: "makeugc",
                elementSelector: "#open-popup-button",
                isSidebarAndCoverImgHidden: "false",
                shouldForwardQueryParams: "false",
            });
        }

        register();
    }, []);

    return (
        <button
            id="open-popup-button"
            className={className}
        >
            {children || "Book a Strategy Call"}
        </button>
    );
}
