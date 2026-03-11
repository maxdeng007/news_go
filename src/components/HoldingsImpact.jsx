import { useState, useRef, forwardRef } from 'react';
import { mockHoldings, mockAIResponses } from '../data/mockData';

const stockIcons = {
  '股票': (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z"/>
    </svg>
  ),
  '基金': (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z"/>
    </svg>
  )
};

const GlassCard = forwardRef(function GlassCard({ children, correlation }, ref) {
  const isPositive = correlation === 'positive';
  
  return (
    <div 
      ref={ref}
      className="relative rounded-xl border bg-[var(--color-bg-card)] shadow-sm hover:shadow-md transition-shadow"
      style={{ 
        borderColor: isPositive ? 'var(--color-positive)' : 'var(--color-negative)',
      }}
    >
      {children}
    </div>
  );
});

function CorrelationScore({ score, type }) {
  const isPositive = type === 'positive';
  const color = isPositive ? 'var(--color-positive)' : 'var(--color-negative)';
  
  return (
    <div className="absolute -right-1 -bottom-1 pointer-events-none select-none">
      <div 
        className="text-[64px] font-bold leading-none"
        style={{ 
          background: `linear-gradient(90deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.4) 40%, ${color} 100%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          color: color,
        }}
      >
        {score}
      </div>
    </div>
  );
}

function AIAnalysisButton({ onClick, isLoading }) {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-[var(--color-accent)] text-white rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
    >
      {isLoading ? (
        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      ) : (
        <>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          AI解读
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
    <div className="px-4 pb-4 mt-3 pt-3 border-t border-[var(--color-border)]">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-[var(--color-text-muted)]">AI 分析</span>
        <button
          onClick={onClose}
          className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] cursor-pointer"
        >
          关闭
        </button>
      </div>
      
      <div className="p-3 rounded bg-[var(--color-bg-hover)] border-l-2 border-[var(--color-accent)]">
        <p 
          className="text-sm leading-relaxed text-[var(--color-text-primary)]"
          dangerouslySetInnerHTML={{ __html: highlightKeywords(response.response) }}
        />
      </div>
      
      <div className="flex items-center gap-3 mt-2 text-xs text-[var(--color-text-muted)]">
        <span className={`px-1.5 py-0.5 rounded ${
          response.insight.includes('利好') || response.insight.includes('强利好')
            ? 'bg-[var(--color-positive-bg)] text-[var(--color-positive)]'
            : response.insight.includes('谨慎')
            ? 'bg-[var(--color-negative-bg)] text-[var(--color-negative)]'
            : 'bg-[var(--color-bg-hover)]'
        }`}>
          {response.insight}
        </span>
        <span>置信度 85%</span>
        <span>风险 {response.risk}</span>
      </div>
    </div>
  );
}

export default function HoldingsImpact() {
  const [selectedHolding, setSelectedHolding] = useState(null);
  const [aiResponse, setAIResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const cardRefs = useRef({});

  const handleAIAnalysis = async (holding) => {
    setSelectedHolding(holding.id);
    setIsLoading(true);
    setAIResponse(null);

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
    <section className="mb-6">
      <div className="flex items-center gap-3 mb-4">
        <h2 className="newsletter-headline text-xl md:text-2xl text-[var(--color-text-primary)]">持仓分析</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-[var(--color-border)] to-transparent" />
      </div>
      <div className="space-y-4 stagger-children">
        {mockHoldings.map((holding) => (
          <GlassCard 
            key={holding.id} 
            correlation={holding.correlation}
            ref={(el) => (cardRefs.current[holding.id] = el)}
          >
            <CorrelationScore score={holding.correlationScore} type={holding.correlation} />
            
            <div className="relative p-4 pb-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${
                      holding.correlation === 'positive' 
                        ? 'border-[var(--color-positive)] text-[var(--color-positive)]'
                        : 'border-[var(--color-negative)] text-[var(--color-negative)]'
                    }`}>
                      {stockIcons[holding.type]}
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
                        {holding.name}
                      </h3>
                      <span className="text-xs text-[var(--color-text-muted)]">{holding.code}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm mb-3">
                    <span className="text-[var(--color-text-secondary)]">
                      持仓: <span className="text-[var(--color-text-primary)] font-medium">¥{(holding.value / 10000).toFixed(0)}万</span>
                    </span>
                    <span className={`font-bold ${holding.change >= 0 ? 'text-[var(--color-positive)]' : 'text-[var(--color-negative)]'}`}>
                      {holding.change >= 0 ? '+' : ''}{holding.change}%
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded font-medium ${
                      holding.correlation === 'positive'
                        ? 'bg-[var(--color-positive-bg)] text-[var(--color-positive)]'
                        : 'bg-[var(--color-negative-bg)] text-[var(--color-negative)]'
                    }`}>
                      {holding.correlation === 'positive' ? '正相关' : '负相关'}
                    </span>
                    <span className="text-xs text-[var(--color-text-muted)]">
                      关联度 {holding.correlationScore}%
                    </span>
                  </div>
                </div>

                <div className="flex-shrink-0">
                  {selectedHolding === holding.id && isLoading ? (
                    <div className="w-10 h-10 rounded-lg bg-[var(--color-bg-hover)] flex items-center justify-center">
                      <svg className="w-5 h-5 animate-spin text-[var(--color-accent)]" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                    </div>
                  ) : (
                    <AIAnalysisButton
                      onClick={() => handleAIAnalysis(holding)}
                      isLoading={false}
                    />
                  )}
                </div>
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
