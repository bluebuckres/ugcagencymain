import React from "react";

type JsonLdProps = {
    type: "Organization" | "Service" | "FAQPage" | "Review" | "Article" | "ItemList";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: Record<string, any>;
};

export default function JsonLd({ type, data }: JsonLdProps) {
    const jsonLdData = {
        "@context": "https://schema.org",
        "@type": type,
        ...data,
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
    );
}
