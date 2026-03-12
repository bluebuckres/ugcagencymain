"use client";
import { useEffect, useRef } from 'react';

export function NeetoCalEmbed() {
    const containerRef = useRef<HTMLDivElement>(null);
    const initialized = useRef(false);

    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;

        // Declare neetoCal on window
        const win = window as any;
        win.neetoCal = win.neetoCal || {
            embed: function (...args: any[]) {
                (win.neetoCal.q = win.neetoCal.q || []).push(args);
            },
        };

        // Load the embed script
        const script = document.createElement('script');
        script.src = 'https://cdn.neetocal.com/javascript/embed.js';
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            win.neetoCal.embed({
                type: "inline",
                id: "6799c111-4acd-4187-b7bc-8a3f7c526af5",
                organization: "makeugc",
                elementSelector: "#inline-embed-container",
                styles: "height: 100%; width: 100%;",
                queryParams: { dynamicHeight: true },
                isSidebarAndCoverImgHidden: "false",
                shouldForwardQueryParams: "false",
            });
        };

        return () => {
            // Cleanup
            if (script.parentNode) {
                script.parentNode.removeChild(script);
            }
        };
    }, []);

    return (
        <div
            ref={containerRef}
            id="inline-embed-container"
            style={{ width: '100%', minHeight: '600px' }}
        >
            {/* NeetoCal widget will be rendered here */}
        </div>
    );
}
