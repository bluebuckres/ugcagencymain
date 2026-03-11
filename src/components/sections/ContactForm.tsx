"use client";
import React, { useState } from 'react';

export function ContactForm() {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        // Simulate API call
        setTimeout(() => {
            setStatus('success');
        }, 1500);
    };

    if (status === 'success') {
        return (
            <div className="bg-[--color-cream] p-8 rounded-2xl border border-[--color-border] text-center space-y-4">
                <h3 className="font-display text-3xl text-[--color-ink]">We received it!</h3>
                <p className="font-sans text-[--color-muted]">Our team will review your details and reach out within 24 hours.</p>
                <button
                    onClick={() => setStatus('idle')}
                    className="font-sans text-sm font-medium text-[--color-sage] hover:underline underline-offset-4 mt-4 inline-block"
                >
                    Submit another request
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="relative">
                    <input
                        type="text"
                        id="name"
                        required
                        className="peer w-full bg-white border border-[--color-border] px-4 pt-6 pb-2 rounded-xl text-[--color-ink] font-sans focus:outline-none focus:border-[--color-tan] focus:ring-1 focus:ring-[--color-tan] transition-all"
                        placeholder=" "
                    />
                    <label
                        htmlFor="name"
                        className="absolute left-4 top-4 text-[--color-muted] font-sans text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:top-1 peer-focus:text-xs peer-focus:text-[--color-tan] pointer-events-none"
                    >
                        Your Name
                    </label>
                </div>

                {/* Company */}
                <div className="relative">
                    <input
                        type="text"
                        id="company"
                        required
                        className="peer w-full bg-white border border-[--color-border] px-4 pt-6 pb-2 rounded-xl text-[--color-ink] font-sans focus:outline-none focus:border-[--color-tan] focus:ring-1 focus:ring-[--color-tan] transition-all"
                        placeholder=" "
                    />
                    <label
                        htmlFor="company"
                        className="absolute left-4 top-4 text-[--color-muted] font-sans text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:top-1 peer-focus:text-xs peer-focus:text-[--color-tan] pointer-events-none"
                    >
                        Company/Brand
                    </label>
                </div>
            </div>

            {/* Email */}
            <div className="relative">
                <input
                    type="email"
                    id="email"
                    required
                    className="peer w-full bg-white border border-[--color-border] px-4 pt-6 pb-2 rounded-xl text-[--color-ink] font-sans focus:outline-none focus:border-[--color-tan] focus:ring-1 focus:ring-[--color-tan] transition-all"
                    placeholder=" "
                />
                <label
                    htmlFor="email"
                    className="absolute left-4 top-4 text-[--color-muted] font-sans text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:top-1 peer-focus:text-xs peer-focus:text-[--color-tan] pointer-events-none"
                >
                    Work Email
                </label>
            </div>

            {/* Select Interest */}
            <div className="relative">
                <select
                    id="interest"
                    required
                    className="w-full bg-white border border-[--color-border] px-4 py-4 rounded-xl text-[--color-ink] font-sans focus:outline-none focus:border-[--color-tan] focus:ring-1 focus:ring-[--color-tan] transition-all appearance-none"
                >
                    <option value="" disabled selected>What can we help you with?</option>
                    <option value="managed">Managed UGC Production</option>
                    <option value="ai">AI UGC Generation</option>
                    <option value="self-serve">Self-Serve Platform Access</option>
                    <option value="agency">Agency Partnership</option>
                    <option value="other">Something Else</option>
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[--color-muted]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
            </div>

            {/* Message */}
            <div className="relative">
                <textarea
                    id="message"
                    rows={4}
                    className="peer w-full bg-white border border-[--color-border] px-4 pt-6 pb-2 rounded-xl text-[--color-ink] font-sans focus:outline-none focus:border-[--color-tan] focus:ring-1 focus:ring-[--color-tan] transition-all resize-none"
                    placeholder=" "
                ></textarea>
                <label
                    htmlFor="message"
                    className="absolute left-4 top-4 text-[--color-muted] font-sans text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:top-1 peer-focus:text-xs peer-focus:text-[--color-tan] pointer-events-none"
                >
                    Brief Details (Optional)
                </label>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-[--color-ink] text-white py-4 rounded-xl font-sans font-medium hover:bg-black transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {status === 'submitting' ? 'Sending...' : 'Send Request'}
            </button>

            <p className="text-center font-sans text-xs text-[--color-muted]">
                By submitting, you agree to our <a href="/terms" className="underline hover:text-[--color-ink]">Terms of Service</a>.
            </p>
        </form>
    );
}
