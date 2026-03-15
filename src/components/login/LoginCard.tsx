"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, LockKey, EnvelopeSimple } from "@phosphor-icons/react";

type LoginRole = "brand" | "creator";

export function LoginCard() {
  const [role, setRole] = useState<LoginRole>("brand");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login redirect for demo purposes
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 1000);
  };

  return (
    <div className="bg-white rounded-2xl p-8 md:p-10 border border-[--color-border] shadow-[0_8px_32px_-8px_rgba(199,166,137,0.15)] w-full max-w-[480px]">
      
      {/* Role Toggle Tabs */}
      <div className="flex p-1 bg-[--color-cream] rounded-xl mb-8">
        <button
          onClick={() => setRole("brand")}
          className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
            role === "brand" 
              ? "bg-white text-[--color-ink] shadow-sm ring-1 ring-black/5" 
              : "text-[--color-muted] hover:text-[--color-ink]"
          }`}
        >
          Brand / Agency
        </button>
        <button
          onClick={() => setRole("creator")}
          className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
            role === "creator" 
              ? "bg-white text-[--color-ink] shadow-sm ring-1 ring-black/5" 
              : "text-[--color-muted] hover:text-[--color-ink]"
          }`}
        >
          Creator
        </button>
      </div>

      {/* Login Header */}
      <div className="mb-8">
        <h2 className="font-display text-2xl text-[--color-ink] mb-2">
          {role === "brand" ? "Brand Portal Login" : "Creator Portal Login"}
        </h2>
        <p className="font-sans text-sm text-[--color-muted]">
          Enter your email and password to access your account.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Email Input */}
        <div className="space-y-1.5">
          <label htmlFor="email" className="font-sans text-sm font-medium text-[--color-ink]">
            Work Email
          </label>
          <div className="relative">
            <EnvelopeSimple size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-[--color-muted]" />
            <input 
              id="email" 
              type="email" 
              required
              placeholder="name@company.com"
              className="w-full bg-white border border-[--color-border] rounded-xl py-2.5 pl-10 pr-4 text-sm font-sans text-[--color-ink] placeholder:text-gray-300 focus:outline-none focus:border-[--color-tan] focus:ring-1 focus:ring-[--color-tan]/30 transition-all"
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="font-sans text-sm font-medium text-[--color-ink]">
              Password
            </label>
            <Link href="#" className="font-sans text-xs font-medium text-[--color-tan] hover:text-[#b8956f] transition-colors">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <LockKey size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-[--color-muted]" />
            <input 
              id="password" 
              type="password" 
              required
              placeholder="••••••••"
              className="w-full bg-white border border-[--color-border] rounded-xl py-2.5 pl-10 pr-4 text-sm font-sans text-[--color-ink] placeholder:text-gray-300 focus:outline-none focus:border-[--color-tan] focus:ring-1 focus:ring-[--color-tan]/30 transition-all"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-[--color-tan] text-white py-3 rounded-full text-sm font-medium mt-4 hover:bg-[#b8956f] transition-all active:scale-[0.98] disabled:opacity-70 flex justify-center items-center gap-2"
        >
          {isLoading ? "Signing in..." : "Sign In"}
          {!isLoading && <ArrowRight size={16} />}
        </button>
      </form>

      {/* Footer Links */}
      <div className="mt-8 pt-6 border-t border-[--color-border] text-center">
        <p className="font-sans text-sm text-[--color-muted]">
          {role === "brand" ? "Don't have a brand account? " : "Not a MakeUGC creator yet? "}
          <Link 
            href={role === "brand" ? "/brands" : "/creators"} 
            className="font-medium text-[--color-ink] hover:text-[--color-tan] transition-colors underline underline-offset-4"
          >
            {role === "brand" ? "Start a project" : "Apply now"}
          </Link>
        </p>
      </div>

    </div>
  );
}
