"use client";
import React from "react";
import { HeroSection } from "../features/home/HeroSection";
import FeatureCards from "../components/ui/FeatureCards";
import Footer from "../components/layout/Footer";
import TemplateUsageGuide from "../components/ui/TemplateUsageGuide";

const LINEN = "var(--color-retro-linen)";

export default function Home() {
  return (
    <main className="w-full min-h-screen" style={{ backgroundColor: LINEN }}>
      <HeroSection />
      <div id="tools">
        <FeatureCards />
      </div>
      <TemplateUsageGuide />
      <Footer />
    </main>
  );
}