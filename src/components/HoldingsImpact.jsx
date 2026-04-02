import { useState, useRef, forwardRef } from 'react';
import { mockHoldings, mockAIResponses } from '../data/mockData';

const TrendIcon = ({ change }) => {
  if (change >= 0) {
    return (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 14l5-5 5 5z"/>
      </svg>
    );
  }
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 10l5 5 5-5z"/>
    </svg>
  );
};

const GlassCard = forwardRef(function GlassCard({ children, correlation }, ref) {
  return (
    <div 
      ref={ref}
      className="relative rounded-xl border border-[var(--color-border-light)] glass-card transition-all duration-300 ease-out-quart hover:shadow-lg hover:-translate-y-1"
    >
      {children}
    </div>
  );
});

function CorrelationScore({ score, type }) {
  const getCorrelationColor = (score) => {
    if (score >= 81) return 'var(--color-negative)';
    if (score >= 41) return 'var(--color-accent-secondary)';
    return 'var(--color-positive)';
  };
  
  const getCorrelationLabel = (score) => {
    if (score >= 81) return '高';
    if (score >= 41) return '中';
    return '低';
  };
  
  const color = getCorrelationColor(score);
  
  return (
    <div className="absolute -right-1 -top-1 pointer-events-none select-none p-2">
      <div 
        className="text-[48px] font-bold leading-none"
        style={{ 
          background: `linear-gradient(135deg, ${color} 0%, transparent 80%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          opacity: 0.45,
          textShadow: `0 0 20px ${color}`,
        }}
      >
        {getCorrelationLabel(score)}
      </div>
    </div>
  );
}

function AIAnalysisButton({ onClick, isLoading }) {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className="w-full sm:w-auto sm:ml-auto sm:px-6 py-2.5 text-sm font-semibold bg-gradient-to-r from-[rgba(0,255,255,0.15)] to-[rgba(168,85,247,0.15)] text-[var(--color-accent)] border border-[rgba(0,255,255,0.3)] rounded-lg hover:from-[rgba(0,255,255,0.25)] hover:to-[rgba(168,85,247,0.25)] hover:border-[rgba(0,255,255,0.5)] hover:shadow-[0_0_30px_rgba(0,255,255,0.2)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-200 cursor-pointer inline-flex items-center justify-center gap-2"
    >
      {isLoading ? (
        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75 fill-[var(--color-accent)]" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      ) : (
        <>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M7.5 5.6L10 7 8.6 4.5 10 2 7.5 3.4 5 2l1.4 2.5L5 7zm12 9.8L17 14l1.4 2.5L17 19l2.5-1.4L22 19l-1.4-2.5L22 14zM22 2l-2.5 1.4L17 2l1.4 2.5L17 7l2.5-1.4L22 7l-1.4-2.5zm-7.63 5.29a.996.996 0 00-1.41 0L1.29 18.96a.996.996 0 000 1.41l2.34 2.34c.39.39 1.02.39 1.41 0L16.7 11.05a.996.996 0 000-1.41l-2.33-2.35zm-1.03 5.49l-2.12-2.12 2.44-2.44 2.12 2.12-2.44 2.44z"/>
          </svg>
          <span className="tracking-wide">AI 解读</span>
        </>
      )}
    </button>
  );
}

function AIReview({ response, onClose }) {
  if (!response) return null;

  const highlightKeywords = (text) => {
    const keywords = [
      { pattern: /[+-]?\d+(\.\d+)?%/g, class: 'font-bold' },
      { pattern: /(利好|利空|谨慎|中性|强利好|强利空)/g, class: 'font-bold' },
      { pattern: /(建议|关注|配置|逢低|加仓|买入)/g, class: 'font-bold' },
      { pattern: /(风险|波动|回调|下跌)/g, class: 'font-bold' },
    ];

    let result = text;
    keywords.forEach(({ pattern, class: className }) => {
      result = result.replace(pattern, match => `<span class="${className}">${match}</span>`);
    });
    return result;
  };

  return (
    <div className="px-5 pb-5 pt-4 mt-2 border-t border-[rgba(0,255,255,0.1)] glass-card-intense animate-fade-in">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-[var(--color-accent)]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
          </svg>
          <span className="text-xs font-semibold text-[var(--color-accent)] tracking-wider neon-text-cyan">AI 分析</span>
        </div>
        <button
          onClick={onClose}
          className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] cursor-pointer"
        >
          关闭
        </button>
      </div>
      
      <div className="relative">
        <span className="absolute -top-1 -left-1 text-3xl text-[var(--color-accent)] opacity-40 font-serif">"</span>
        <blockquote className="pl-5 pr-2 text-base leading-relaxed text-[var(--color-text-primary)]" dangerouslySetInnerHTML={{ __html: highlightKeywords(response.response) }} />
        <span className="absolute -bottom-3 -right-1 text-3xl text-[var(--color-accent)] opacity-40 font-serif">"</span>
      </div>
      
      <div className="flex items-center gap-4 mt-4 pt-3 border-t border-[var(--color-border-light)] text-xs text-[var(--color-text-muted)]">
        <span className={`px-2 py-1 rounded-sm font-medium ${
          response.insight.includes('利好') || response.insight.includes('强利好')
            ? 'bg-[var(--color-positive-bg)] text-[var(--color-positive)]'
            : response.insight.includes('谨慎')
            ? 'bg-[var(--color-negative-bg)] text-[var(--color-negative)]'
            : 'bg-[var(--color-bg-hover)]'
        }`}>
          {response.insight}
        </span>
        <span>风险 {response.risk}</span>
      </div>
    </div>
  );
}

export default function HoldingsImpact() {
  const [selectedHolding, setSelectedHolding] = useState(null);
  const [aiResponse, setAIResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const cardRefs = useRef({});

  const loadingMessages = [
    '正在分析市场数据...',
    '解读持仓关联性...',
    '挖掘投资机会...',
    '生成智能建议...',
  ];

  const handleAIAnalysis = async (holding) => {
    setSelectedHolding(holding.id);
    setIsLoading(true);
    setAIResponse(null);
    
    const randomMessage = loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
    setLoadingMessage(randomMessage);

    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const response = mockAIResponses[holding.id];
    setAIResponse(response);
    setIsLoading(false);
    
    setTimeout(() => {
      const cardElement = cardRefs.current[holding.id];
      if (cardElement) {
        cardElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleCloseAI = () => {
    setAIResponse(null);
    setSelectedHolding(null);
  };

  return (
    <section className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="newsletter-section-title text-[var(--color-text-primary)]">受影响持仓</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-[var(--color-border)] to-transparent" />
      </div>
      <div className="space-y-6 stagger-children">
        {mockHoldings.map((holding) => (
          <GlassCard 
            key={holding.id} 
            correlation={holding.correlation}
            ref={(el) => (cardRefs.current[holding.id] = el)}
          >
            <CorrelationScore score={holding.correlationScore} type={holding.correlation} />
            
            <div className="relative p-5 pb-3">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-3 py-1 rounded-sm font-semibold tracking-wide ${
                    holding.correlation === 'positive'
                      ? 'bg-[var(--color-positive-bg)] text-[var(--color-positive)]'
                      : 'bg-[var(--color-negative-bg)] text-[var(--color-negative)]'
                  }`}>
                    {holding.correlation === 'positive' ? '正相关' : '负相关'}
                  </span>
                  <span className={`text-xs px-3 py-1 rounded-sm font-semibold tracking-wide ${
                    (() => {
                      const score = holding.correlationScore;
                      if (score >= 81) return 'bg-[rgba(168,85,247,0.2)] text-purple-400';
                      if (score >= 41) return 'bg-[rgba(168,85,247,0.15)] text-purple-300';
                      return 'bg-[rgba(168,85,247,0.1)] text-purple-200';
                    })()
                  }`}>
                    相关度 {
                      (() => {
                        const score = holding.correlationScore;
                        if (score >= 81) return '高';
                        if (score >= 41) return '中';
                        return '低';
                      })()
                    }
                  </span>
                </div>
              </div>

              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1 min-w-0">
                  <div>
                    <h3 className="newsletter-headline text-lg text-[var(--color-text-primary)]">
                      {holding.name}
                    </h3>
                    <span className="text-xs text-[var(--color-text-muted)] font-mono">{holding.code}</span>
                  </div>
                  
                  <div className="flex items-baseline gap-6 mt-4">
                    <div className="flex flex-col">
                      <span className="text-xs text-[var(--color-text-muted)] mb-0.5">持仓金额</span>
                      <span className="text-base font-semibold text-[var(--color-text-primary)]">
                        ¥{(holding.value / 10000).toFixed(0)}万
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-[var(--color-text-muted)] mb-0.5">今日涨跌</span>
                      <span className={`text-base font-semibold ${holding.change !== undefined && holding.change !== null ? (holding.change >= 0 ? 'text-[var(--color-positive)]' : 'text-[var(--color-negative)]') : 'text-[var(--color-text-muted)]'}`}>
                        {holding.change !== undefined && holding.change !== null ? `${holding.change >= 0 ? '+' : ''}${holding.change}%` : '--'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border-light)]">
                {selectedHolding === holding.id && isLoading ? (
                  <div className="flex items-center gap-2 px-3 py-2 text-xs text-[var(--color-text-muted)] bg-[var(--color-bg-hover)] rounded-sm" role="status" aria-live="polite">
                    <svg className="w-4 h-4 animate-spin text-[var(--color-accent)]" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span className="whitespace-nowrap">{loadingMessage}</span>
                  </div>
                ) : (
                  <AIAnalysisButton
                    onClick={() => handleAIAnalysis(holding)}
                    isLoading={false}
                  />
                )}
              </div>
            </div>

            {selectedHolding === holding.id && (
              <AIReview response={aiResponse} onClose={handleCloseAI} />
            )}
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
