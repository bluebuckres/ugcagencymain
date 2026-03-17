"use client";

import React, { useState } from "react";
import { TwitterLogo, LinkedinLogo, Link as LinkIcon, Check } from "@phosphor-icons/react";

export function ShareWidget({ url, title }: { url?: string; title?: string }) {
  const [copied, setCopied] = useState(false);
  const shareUrl = typeof window !== 'undefined' ? window.location.href : (url || "https://makeugc.in");
  const shareTitle = title || "MakeUGC Blog";

  const handleCopyLink = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareOnTwitter = () => {
    window.open(`https://x.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`, '_blank');
  };

  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-xs uppercase tracking-widest text-[--color-muted] mr-2">Share:</span>
      <button
        onClick={shareOnTwitter}
        className="w-10 h-10 rounded-full border border-[--color-border] flex items-center justify-center text-[--color-ink] hover:bg-[--color-tan] hover:text-white hover:border-[--color-tan] transition-colors"
        aria-label="Share on X"
      >
        <TwitterLogo weight="regular" size={18} />
      </button>
      <button
        onClick={shareOnLinkedIn}
        className="w-10 h-10 rounded-full border border-[--color-border] flex items-center justify-center text-[--color-ink] hover:bg-[--color-tan] hover:text-white hover:border-[--color-tan] transition-colors"
        aria-label="Share on LinkedIn"
      >
        <LinkedinLogo weight="regular" size={18} />
      </button>
      <button
        onClick={handleCopyLink}
        className="w-10 h-10 rounded-full border border-[--color-border] flex items-center justify-center text-[--color-ink] hover:bg-[--color-tan] hover:text-white hover:border-[--color-tan] transition-colors"
        aria-label="Copy Link"
      >
        {copied ? <Check weight="bold" size={18} /> : <LinkIcon weight="regular" size={18} />}
      </button>
    </div>
  );
}
