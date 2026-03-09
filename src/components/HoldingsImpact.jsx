import { useState } from 'react';
import { mockHoldings, mockAIResponses } from '../data/mockData';

function AIAnalysisButton({ onClick, isLoading }) {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-gradient-to-r from-[var(--color-accent)] to-amber-500 text-white rounded-lg animate-pulse-glow hover:from-amber-500 hover:to-amber-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? (
        <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      ) : (
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      )}
      AI解读
    </button>
  );
}

function AIReview({ response, onClose }) {
  if (!response) return null;

  return (
    <div className="mt-3 p-4 bg-gradient-to-br from-[var(--color-bg-hover)] to-[var(--color-bg-card)] rounded-xl border border-[var(--color-accent)]/30 animate-slide-up">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-[var(--color-accent)]/20 flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-[var(--color-accent)]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </span>
          <span className="text-sm font-medium text-[var(--color-text-primary)]">AI解读</span>
        </div>
        <button
          onClick={onClose}
          className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]"
        >
          收起
        </button>
      </div>
      
      <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-3">
        {response.response}
      </p>
      
      <div className="flex items-center gap-3 pt-3 border-t border-[var(--color-border)]">
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-[var(--color-text-muted)]">判断：</span>
          <span className={`text-xs font-medium px-2 py-0.5 rounded ${
            response.insight.includes('利好') || response.insight.includes('强利好')
              ? 'bg-[var(--color-positive)]/20 text-[var(--color-positive)]'
              : response.insight.includes('谨慎')
              ? 'bg-[var(--color-negative)]/20 text-[var(--color-negative)]'
              : 'bg-[var(--color-text-muted)]/20 text-[var(--color-text-secondary)]'
          }`}>
            {response.insight}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-[var(--color-text-muted)]">风险：</span>
          <span className="text-xs text-[var(--color-text-secondary)]">{response.risk}</span>
        </div>
      </div>
    </div>
  );
}

export default function HoldingsImpact() {
  const [selectedHolding, setSelectedHolding] = useState(null);
  const [aiResponse, setAIResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAIAnalysis = async (holding) => {
    setSelectedHolding(holding.id);
    setIsLoading(true);
    setAIResponse(null);

    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const response = mockAIResponses[holding.id];
    setAIResponse(response);
    setIsLoading(false);
  };

  const handleCloseAI = () => {
    setAIResponse(null);
    setSelectedHolding(null);
  };

  return (
    <section className="mb-6">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">持仓关联</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-[var(--color-border)] to-transparent" />
        <span className="text-xs text-[var(--color-text-muted)]">与今日新闻</span>
      </div>

      <div className="space-y-3 stagger-children">
        {mockHoldings.map((holding) => (
          <div
            key={holding.id}
            className={`bg-[var(--color-bg-card)] rounded-xl p-4 border transition-all ${
              holding.correlation === 'positive'
                ? 'border-l-4 border-l-[var(--color-positive)] border-[var(--color-border)]'
                : 'border-l-4 border-l-[var(--color-negative)] border-[var(--color-border)]'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
                    {holding.name}
                  </h3>
                  <span className="text-xs text-[var(--color-text-muted)]">{holding.code}</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded ${
                    holding.correlation === 'positive'
                      ? 'bg-[var(--color-positive)]/20 text-[var(--color-positive)]'
                      : 'bg-[var(--color-negative)]/20 text-[var(--color-negative)]'
                  }`}>
                    {holding.correlation === 'positive' ? '正相关' : '负相关'}
                  </span>
                </div>
                
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-[var(--color-text-secondary)]">
                    持仓: <span className="text-[var(--color-text-primary)] font-medium">¥{(holding.value / 10000).toFixed(0)}万</span>
                  </span>
                  <span className={`font-medium ${holding.change >= 0 ? 'text-[var(--color-positive)]' : 'text-[var(--color-negative)]'}`}>
                    {holding.change >= 0 ? '+' : ''}{holding.change}%
                  </span>
                </div>

                <div className="mt-2 flex items-center gap-2">
                  <span className="text-xs text-[var(--color-text-muted)]">关联度</span>
                  <div className="flex-1 h-1.5 bg-[var(--color-bg-hover)] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        holding.correlation === 'positive'
                          ? 'bg-gradient-to-r from-[var(--color-positive)] to-green-400'
                          : 'bg-gradient-to-r from-[var(--color-negative)] to-red-400'
                      }`}
                      style={{ width: `${holding.correlationScore}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-[var(--color-text-muted)]">{holding.correlationScore}%</span>
                </div>

                {selectedHolding === holding.id && (
                  <AIReview response={aiResponse} onClose={handleCloseAI} />
                )}
              </div>

              <div className="flex-shrink-0 ml-3">
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
        ))}
      </div>
    </section>
  );
}
