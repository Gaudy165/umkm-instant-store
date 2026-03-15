import React from 'react';
import Hero from './components/Hero';
import Features from './components/Features';
import Showcase from './components/Showcase';
import Footer from './components/Footer';
import ScrollReveal from './components/ScrollReveal';

export default function MarketingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 selection:bg-blue-100 selection:text-blue-900">

      {/* ── Hero ── */}
      <ScrollReveal delay={0}>
        <Hero />
      </ScrollReveal>

      {/* ── Features ── */}
      <ScrollReveal delay={0}>
        <Features />
      </ScrollReveal>

      {/* ── Showcase ── */}
      <ScrollReveal delay={0}>
        <Showcase />
      </ScrollReveal>

      {/* ── Footer ── */}
      <ScrollReveal delay={0}>
        <Footer />
      </ScrollReveal>

    </div>
  );
}

