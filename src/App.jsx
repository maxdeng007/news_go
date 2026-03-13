import Hero from './components/Hero';
import XiaoNuoya from './components/XiaoNuoya';
import HotNews from './components/HotNews';
import HoldingsImpact from './components/HoldingsImpact';
import Recommendations from './components/Recommendations';
import Feedback from './components/Feedback';

function NewsletterHeader() {
  const today = new Date();
  const dateStr = today.toLocaleDateString('zh-CN', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  const issueNumber = Math.floor((today - new Date('2024-01-01')) / (1000 * 60 * 60 * 24)) + 1;
  
  return (
    <div className="border-b-2 border-[var(--color-accent)] py-4 mb-8">
      <div className="max-w-md mx-auto px-4 md:max-w-2xl md:px-6 lg:max-w-6xl lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0">
          <div className="flex items-center gap-4">
            <h1 className="newsletter-masthead text-2xl md:text-3xl text-[var(--color-text-primary)]">
              诺亚日报
            </h1>
            <span className="hidden sm:inline text-xs text-[var(--color-text-muted)]">
              •
            </span>
            <span className="hidden sm:inline text-sm text-[var(--color-text-muted)]">
              No. {issueNumber}
            </span>
          </div>
          <div className="text-sm text-[var(--color-text-muted)]">
            {dateStr}
          </div>
          <div className="hidden md:block text-sm text-[var(--color-text-muted)] italic">
            您的智能财富顾问
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
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none" style={{ 
      background: '#FFFEF5'
    }}>
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--color-accent)] focus:text-white focus:rounded-sm"
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
