import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import XiaoNuoya from './components/XiaoNuoya';
import HotNews from './components/HotNews';
import HoldingsImpact from './components/HoldingsImpact';
import Recommendations from './components/Recommendations';
import Feedback from './components/Feedback';

function ThemeToggle({ theme, setTheme }) {
  return (
    <button
      onClick={() => setTheme(theme === 'newspaper' ? 'dark' : 'newspaper')}
      className="fixed top-4 right-4 z-50 p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
      style={{ 
        backgroundColor: 'var(--color-bg-card)',
        border: '1px solid var(--color-border)'
      }}
      title={theme === 'newspaper' ? '切换到深色主题' : '切换到报纸主题'}
    >
      {theme === 'newspaper' ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: 'var(--color-text-primary)' }}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: 'var(--color-text-primary)' }}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )}
    </button>
  );
}

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

function MeshGradient({ theme }) {
  if (theme === 'dark') {
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
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none" style={{ 
      background: '#FFFEF5'
    }}>
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState('newspaper');
  
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved) setTheme(saved);
  }, []);
  
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark-theme' : ''}`} style={{ backgroundColor: 'var(--color-bg-primary)' }}>
      <ThemeToggle theme={theme} setTheme={setTheme} />
      {theme === 'newspaper' && <NewsletterHeader />}
      <XiaoNuoya />
      <MeshGradient theme={theme} />
      <Hero />
      
      <main className="max-w-md mx-auto px-4 pb-12 md:max-w-2xl md:px-6 lg:max-w-6xl lg:px-8">
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
