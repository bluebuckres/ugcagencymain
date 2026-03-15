"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/nav/Navbar";
import Footer from "@/components/layout/Footer";
import { TrustedBrands } from "@/components/sections/TrustedBrands";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <TrustedBrands />
      <Footer />
    </>
  );
}
