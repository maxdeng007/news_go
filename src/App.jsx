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
    <div className="border-b border-[var(--color-border)] py-3 mb-6">
      <div className="max-w-md mx-auto px-4 md:max-w-2xl md:px-6 lg:max-w-6xl lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs text-[var(--color-text-muted)] newsletter-section-label">
              诺亚日报
            </span>
            <span className="hidden sm:inline text-xs text-[var(--color-text-muted)]">
              •
            </span>
            <span className="hidden sm:inline text-xs text-[var(--color-text-muted)]">
              No. {issueNumber}
            </span>
          </div>
          <div className="text-xs text-[var(--color-text-muted)]">
            {dateStr}
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden md:inline text-xs text-[var(--color-text-muted)]">
              您的智能财富顾问
            </span>
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
      background: 'linear-gradient(135deg, #1a0a2e 0%, #0f0f1a 50%, #0a1a1a 100%)'
    }}>
      <div className="absolute top-10 left-10 w-72 h-72 bg-amber-600/40 rounded-full blur-[100px]" />
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-purple-600/35 rounded-full blur-[120px]" />
      <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-blue-600/30 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 w-56 h-56 bg-green-600/25 rounded-full blur-[80px]" />
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <NewsletterHeader />
      <XiaoNuoya />
      <MeshGradient />
      <Hero />
      
      <main className="max-w-md mx-auto px-4 pb-8 md:max-w-2xl md:px-6 lg:max-w-6xl lg:px-8">
        <SectionDivider label="今日要闻" />
        <HotNews />
        
        <SectionDivider label="持仓分析" />
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          <div className="lg:col-span-2">
            <HoldingsImpact />
          </div>
          <div className="lg:sticky lg:top-8 lg:self-start lg:col-span-1">
            <Recommendations />
          </div>
        </div>
        
        <SectionDivider label="读者互动" />
        <Feedback />
      </main>
    </div>
  );
}

export default App;
