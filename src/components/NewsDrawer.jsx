import { useState, useEffect } from 'react';

export default function NewsDrawer({ news, onClose }) {
  const [activeTab, setActiveTab] = useState('deep');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 10);
    document.body.style.overflow = 'hidden';
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  if (!news) return null;

  const isPositive = news.badge === '利好';
  const isNegative = news.badge === '利空';

  return (
    <>
      <div 
        className={`fixed inset-0 z-50 bg-[rgba(15,23,42,0.4)] backdrop-blur-sm transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        onClick={handleClose}
        aria-hidden="true"
      />
      <div 
        className={`fixed inset-x-0 bottom-0 z-50 bg-[var(--color-bg-primary)] rounded-t-3xl shadow-2xl h-[90vh] overflow-hidden transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
      >
        <div className="flex flex-col h-full">
          <div className="flex-shrink-0 px-6 pt-4 pb-2">
            <div className="flex justify-center">
              <div className="w-10 h-1 rounded-full bg-[var(--color-border-light)]" />
            </div>
          </div>
          
          <div className="flex-shrink-0 flex items-center justify-between px-6 pb-3">
            <h3 id="drawer-title" className="newsletter-headline text-lg text-[var(--color-text-primary)] pr-4 line-clamp-2 flex-1">
              {news.title}
            </h3>
            <button 
              onClick={handleClose}
              className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-full bg-[var(--color-bg-hover)] hover:bg-[var(--color-border-light)] transition-colors cursor-pointer"
              aria-label="关闭"
            >
              <svg className="w-5 h-5 text-[var(--color-text-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-shrink-0 px-6">
            <div className="flex p-1 bg-[var(--color-bg-hover)] rounded-sm">
              <button
                onClick={() => setActiveTab('deep')}
                className={`flex-1 py-2.5 text-sm font-medium rounded-sm transition-all duration-200 cursor-pointer ${
                  activeTab === 'deep' 
                    ? 'bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] shadow-sm' 
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]'
                }`}
              >
                深度报道
              </button>
              <button
                onClick={() => setActiveTab('chat')}
                className={`flex-1 py-2.5 text-sm font-medium rounded-sm transition-all duration-200 cursor-pointer ${
                  activeTab === 'chat' 
                    ? 'bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] shadow-sm' 
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]'
                }`}
              >
                AI对话
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto pb-8">
            {activeTab === 'deep' ? (
              <div className="px-6 pt-5 space-y-6">
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-3 py-1.5 rounded-full font-medium ${
                    isPositive 
                      ? 'bg-[var(--color-positive-bg)] text-[var(--color-positive)]'
                      : isNegative
                      ? 'bg-[var(--color-negative-bg)] text-[var(--color-negative)]'
                      : 'bg-[var(--color-bg-hover)] text-[var(--color-text-secondary)]'
                  }`}>
                    {news.badge}
                  </span>
                </div>

                <div className="p-4 rounded-sm bg-[var(--color-bg-secondary)] border border-[var(--color-border-light)]">
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-7 h-7 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center">
                      <svg className="w-4 h-4 text-[var(--color-accent)]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9.5 3A6.5 6.5 0 0116 9.5c0 1.61-.59 3.09-1.56 4.23l.27.27h.79l5 5-1.5 1.5-5-5v-.79l-.27-.27A6.516 6.516 0 019.5 16 6.5 6.5 0 013 9.5 6.5 6.5 0 019.5 3m0 2C7 5 5 7 5 9.5S7 14 9.5 14 14 12 14 9.5 12 5 9.5 5z"/>
                      </svg>
                    </div>
                    <span className="text-sm font-semibold text-[var(--color-text-primary)]">深度解读</span>
                  </div>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-7">
                    {news.deepAnalysis}
                  </p>
                  <div className="flex items-start gap-2 mt-4 pt-3 border-t border-[var(--color-border-light)]">
                    <svg className="w-3.5 h-3.5 text-[var(--color-text-muted)] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
                    </svg>
                    <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                      内容由AI生成，仅供参考，请以实际披露信息为准
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-sm bg-[var(--color-bg-secondary)] border border-[var(--color-border-light)]">
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-7 h-7 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center">
                      <svg className="w-4 h-4 text-[var(--color-accent)]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                    <span className="text-sm font-semibold text-[var(--color-text-primary)]">对您的投资影响</span>
                  </div>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-7">
                    {news.impact}
                  </p>
                  <div className="flex items-start gap-2 mt-4 pt-3 border-t border-[var(--color-border-light)]">
                    <svg className="w-3.5 h-3.5 text-[var(--color-text-muted)] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
                    </svg>
                    <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                      内容由AI生成，仅供参考，请以实际披露信息为准
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center min-h-[300px] px-6">
                <div className="w-16 h-16 rounded-2xl bg-[var(--color-bg-hover)] flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-[var(--color-text-muted)]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
                  </svg>
                </div>
                <p className="text-sm text-[var(--color-text-muted)]">诺chat组件</p>
                <p className="text-xs text-[var(--color-text-muted)] mt-1">即将上线，敬请期待</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
