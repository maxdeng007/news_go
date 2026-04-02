import { useMemo } from 'react';
import Hero from './components/Hero';
import XiaoNuoya from './components/XiaoNuoya';
import HotNews from './components/HotNews';
import HoldingsImpact from './components/HoldingsImpact';
import Recommendations from './components/Recommendations';
import Feedback from './components/Feedback';

function NewsletterHeader() {
  const today = new Date();
  const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  const weekday = weekdays[today.getDay()];
  const month = today.toLocaleDateString('en-US', { month: 'short' }).replace('.', '');
  const day = today.getDate();
  
  return (
    <div className="border-b border-[var(--color-border)] py-4 mb-0 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-[rgba(0,255,255,0.05)] via-[rgba(168,85,247,0.03)] to-transparent" />
      <div className="max-w-md mx-auto px-4 md:max-w-2xl md:px-6 lg:max-w-6xl lg:px-8 relative">
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <h1 className="newsletter-masthead text-2xl md:text-3xl text-[var(--color-text-primary)] leading-tight">
              <span className="bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-secondary)] bg-clip-text text-transparent">
                Noah Daily
              </span>
            </h1>
            <p className="text-sm text-[var(--color-text-muted)] mt-1">
              洞悉每日全球新趋势
            </p>
          </div>
          
          <div className="flex flex-col items-end text-[var(--color-text-primary)]">
            <div className="flex items-baseline">
              <span className="text-sm text-[var(--color-text-muted)]">{month}.</span>
              <span className="text-4xl font-bold leading-none bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-secondary)] bg-clip-text text-transparent">{day}</span>
            </div>
            <span className="text-xs text-[var(--color-text-muted)]">{weekday}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

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
      <NewsletterHeader />
      <XiaoNuoya />
      <MeshGradient />
      <Hero />
      
      <main id="main-content" className="max-w-md mx-auto px-4 pb-12 md:max-w-2xl md:px-6 lg:max-w-6xl lg:px-8">
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
