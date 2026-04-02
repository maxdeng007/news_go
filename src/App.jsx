import { useMemo } from 'react';
import Hero from './components/Hero';
import XiaoNuoya from './components/XiaoNuoya';
import HotNews from './components/HotNews';
import HoldingsImpact from './components/HoldingsImpact';
import Recommendations from './components/Recommendations';
import Feedback from './components/Feedback';

function SectionDivider({ label }) {
  return (
    <div className="flex items-center gap-4 my-8">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent" />
      <span className="newsletter-section-label text-xs text-[var(--color-text-muted)]">
        {label}
      </span>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent" />
    </div>
  );
}

function MeshGradient() {
  const particles = useMemo(() => 
    Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: ((i * 37 + 13) % 100),
      delay: (i * 0.47),
      duration: 12 + (i * 0.41),
      size: 1 + (i % 3) * 0.8,
    }))
  , []);
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      
      <div className="aurora-container">
        <div className="aurora-orb aurora-1" />
        <div className="aurora-orb aurora-2" />
        <div className="aurora-orb aurora-3" />
        <div className="aurora-orb aurora-4" />
        <div className="aurora-orb aurora-5" />
      </div>
      
      <div className="particles">
        {particles.map((p) => (
          <div 
            key={p.id} 
            className="particle"
            style={{
              left: `${p.left}%`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              width: `${p.size}px`,
              height: `${p.size}px`,
            }}
          />
        ))}
      </div>
      
      <div className="mesh-glow-1" />
      <div className="mesh-glow-2" />
      <div className="mesh-glow-3" />
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen relative">
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--color-accent)] focus:text-[var(--color-bg-primary)] focus:rounded-sm"
      >
        跳到主要内容
      </a>
      <XiaoNuoya />
      <MeshGradient />
      <Hero />
      
      <main id="main-content" className="max-w-md mx-auto px-4 pt-4 pb-12 md:max-w-2xl md:px-6 lg:max-w-6xl lg:px-8">
        <section className="mb-12">
          <HotNews />
        </section>
        <div className="lg:grid lg:grid-cols-3 lg:gap-12">
          <div className="lg:col-span-2 mb-12 lg:mb-0">
            <HoldingsImpact />
          </div>
          <div className="lg:sticky lg:top-8 lg:self-start lg:col-span-1">
            <Recommendations />
          </div>
        </div>
        
        <section className="mt-12">
          <Feedback />
        </section>
      </main>
    </div>
  );
}

export default App;
