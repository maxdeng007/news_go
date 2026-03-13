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
  const issueNumber = Math.floor((today - new Date('2024-01-01')) / (1000 * 60 * 60 * 24)) + 1;
  
  return (
    <div className="border-b-2 border-[var(--color-accent)] py-4 mb-4">
      <div className="max-w-md mx-auto px-4 md:max-w-2xl md:px-6 lg:max-w-6xl lg:px-8">
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <h1 className="newsletter-masthead text-2xl md:text-3xl text-[var(--color-text-primary)] leading-tight">
              Noah Daily
            </h1>
            <p className="text-sm text-[var(--color-text-muted)] mt-1">
              洞悉每日全球新趋势
            </p>
          </div>
          
          <div className="flex flex-col items-end text-[var(--color-text-primary)]">
            <div className="flex items-baseline">
              <span className="text-sm">{month}.</span>
              <span className="text-4xl font-bold leading-none">{day}</span>
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
