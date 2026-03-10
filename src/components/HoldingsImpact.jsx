import { useState } from 'react';
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

function GlassCard({ children, correlation }) {
  const isPositive = correlation === 'positive';
  const borderColor = isPositive
    ? 'border-green-500/30'
    : 'border-red-500/30';
  const glowColor = isPositive
    ? 'shadow-green-500/10'
    : 'shadow-red-500/10';
  
  return (
    <div 
      className={`relative rounded-2xl overflow-hidden backdrop-blur-xl border ${borderColor} shadow-lg ${glowColor} transition-all duration-200 hover:shadow-xl hover:scale-[1.01]`}
      style={{ 
        background: 'linear-gradient(135deg, rgba(20, 20, 25, 0.9) 0%, rgba(15, 15, 18, 0.95) 100%)',
      }}
    >
      <div className={`absolute inset-0 rounded-2xl pointer-events-none ${isPositive ? 'bg-green-500/5' : 'bg-red-500/5'}`} />
      {children}
    </div>
  );
}

function CorrelationScore({ score, type }) {
  const isPositive = type === 'positive';
  const color = isPositive ? '#15803a' : '#b91c1c';
  
  return (
    <div className="absolute -right-1 -bottom-1 pointer-events-none select-none overflow-hidden rounded-2xl">
      <div 
        className="text-[72px] font-black leading-none"
        style={{ 
          background: `linear-gradient(90deg, rgba(0,0,0,0.4) 0%, ${color} 100%)`,
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
      className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 text-white rounded-xl hover:from-amber-400 hover:to-orange-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-amber-500/30 cursor-pointer animate-pulse-glow"
      style={{
        boxShadow: '0 0 20px rgba(245, 158, 11, 0.4), 0 0 40px rgba(245, 158, 11, 0.2)',
      }}
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
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
        </>
      )}
    </button>
  );
}

function AIReview({ response, onClose }) {
  if (!response) return null;

  const highlightKeywords = (text) => {
    const keywords = [
      { pattern: /[+-]?\d+(\.\d+)?%/g, class: 'text-amber-400 font-bold' },
      { pattern: /(利好|利空|谨慎|中性|强利好|强利空)/g, class: 'text-amber-300 font-bold' },
      { pattern: /(宁德时代|贵州茅台|科大讯飞|黄金ETF|比亚迪)/g, class: 'text-white font-semibold' },
      { pattern: /(建议|关注|配置|逢低|加仓|买入)/g, class: 'text-green-400 font-bold' },
      { pattern: /(风险|波动|回调|下跌|谨慎)/g, class: 'text-red-400 font-bold' },
    ];

    let result = text;
    keywords.forEach(({ pattern, class: className }) => {
      result = result.replace(pattern, match => `<span class="${className}">${match}</span>`);
    });
    return result;
  };

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = response.response;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-4 animate-slide-up" style={{ marginLeft: '-1rem', marginRight: '-1rem', paddingLeft: '1rem', paddingRight: '1rem', paddingBottom: '1rem' }}>
      <div 
        className="relative rounded-2xl overflow-hidden transition-all duration-300"
        style={{
          background: 'linear-gradient(135deg, rgba(245,158,11,0.18) 0%, rgba(15,15,18,0.98) 50%, rgba(15,15,18,0.95) 100%)',
          border: '1px solid rgba(245,158,11,0.5)',
          boxShadow: '0 0 60px rgba(245,158,11,0.25), 0 0 100px rgba(245,158,11,0.1), inset 0 1px 0 rgba(255,255,255,0.08)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/15 via-amber-500/5 to-amber-500/10 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
        
        <div className="relative p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  boxShadow: '0 0 25px rgba(245,158,11,0.5)'
                }}
              >
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <div>
                <h3 
                  className="text-lg font-bold"
                  style={{
                    background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  AI智能分析
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-zinc-500">深度解读 · 基于最新市场数据</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/20 transition-all duration-200 cursor-pointer"
                title="复制内容"
              >
                {copied ? (
                  <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                )}
              </button>
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: 'AI投资分析',
                      text: response.response,
                    });
                  }
                }}
                className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/20 transition-all duration-200 cursor-pointer"
                title="分享"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </button>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/20 transition-all duration-200 cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          
          <div 
            className="rounded-xl p-4 mb-3"
            style={{
              background: 'rgba(0,0,0,0.4)',
              border: '1px solid rgba(245,158,11,0.2)'
            }}
          >
            <div className="flex items-center gap-2 mb-3 pb-3 border-b border-white/5">
              <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 2l5 5h-5V4zM6 20V4h5v7h7v9H6z"/>
              </svg>
              <span className="text-xs font-medium text-amber-400">分析内容</span>
            </div>
            <p 
              className="text-sm leading-relaxed text-zinc-200"
              dangerouslySetInnerHTML={{ __html: highlightKeywords(response.response) }}
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <div 
              className="flex items-center gap-2 px-3 py-2 rounded-lg"
              style={{
                background: response.insight.includes('利好') || response.insight.includes('强利好') 
                  ? 'rgba(34,197,94,0.12)' 
                  : response.insight.includes('谨慎')
                  ? 'rgba(239,68,68,0.12)'
                  : 'rgba(255,255,255,0.05)',
                border: response.insight.includes('利好') || response.insight.includes('强利好') 
                  ? '1px solid rgba(34,197,94,0.3)' 
                  : response.insight.includes('谨慎')
                  ? '1px solid rgba(239,68,68,0.3)'
                  : '1px solid rgba(255,255,255,0.1)'
              }}
            >
              <span className="text-xs text-zinc-400">
              <svg className="w-3.5 h-3.5 inline-block mr-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
              </svg>
              判断
            </span>
              <span 
                className="text-xs font-bold px-2 py-1 rounded"
                style={{
                  background: response.insight.includes('利好') || response.insight.includes('强利好') 
                    ? 'rgba(34,197,94,0.25)' 
                    : response.insight.includes('谨慎')
                    ? 'rgba(239,68,68,0.25)'
                    : 'rgba(255,255,255,0.1)',
                  color: response.insight.includes('利好') || response.insight.includes('强利好') 
                    ? '#4ade80' 
                    : response.insight.includes('谨慎')
                    ? '#f87171'
                    : '#a1a1aa'
                }}
              >
                {response.insight}
              </span>
            </div>
            <div 
              className="flex items-center gap-2 px-3 py-2 rounded-lg"
              style={{
                background: 'rgba(59,130,246,0.1)',
                border: '1px solid rgba(59,130,246,0.3)'
              }}
            >
              <span className="text-xs text-blue-400">
              <svg className="w-3.5 h-3.5 inline-block mr-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              置信度
            </span>
              <span className="text-xs font-bold px-2 py-1 rounded bg-blue-500/25 text-blue-300">
                85%
              </span>
            </div>
            <div 
              className="flex items-center gap-2 px-3 py-2 rounded-lg"
              style={{
                background: 'rgba(239,68,68,0.1)',
                border: '1px solid rgba(239,68,68,0.3)'
              }}
            >
              <span className="text-xs text-red-400">
              <svg className="w-3.5 h-3.5 inline-block mr-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
              </svg>
              风险
            </span>
              <span className="text-xs text-zinc-300">{response.risk}</span>
            </div>
            <div className="flex items-center justify-between pt-3 mt-3 border-t border-white/5">
              <div className="flex items-center gap-1 text-xs text-zinc-500">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                </svg>
                <span>分析时间: {new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-zinc-500">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span>AI生成 · 仅供参考</span>
              </div>
            </div>
          </div>
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
    <section className="mb-6 -mx-4 px-4">
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-lg font-bold text-[var(--color-text-primary)]">持仓关联</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-amber-500/30 to-transparent" />
        <span className="text-xs text-[var(--color-text-muted)]">与今日新闻</span>
      </div>

      <div className="space-y-4 stagger-children">
        {mockHoldings.map((holding) => (
          <GlassCard key={holding.id} correlation={holding.correlation}>
            <CorrelationScore score={holding.correlationScore} type={holding.correlation} />
            
            <div className="relative p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      holding.correlation === 'positive' 
                        ? 'bg-[var(--color-positive)]/20 text-[var(--color-positive)]'
                        : 'bg-[var(--color-negative)]/20 text-[var(--color-negative)]'
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
                      持仓: <span className="text-[var(--color-text-primary)] font-semibold">¥{(holding.value / 10000).toFixed(0)}万</span>
                    </span>
                    <span className={`font-bold text-lg ${holding.change >= 0 ? 'text-[var(--color-positive)]' : 'text-[var(--color-negative)]'}`}>
                      {holding.change >= 0 ? '+' : ''}{holding.change}%
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded-lg font-medium ${
                      holding.correlation === 'positive'
                        ? 'bg-[var(--color-positive)]/20 text-[var(--color-positive)]'
                        : 'bg-[var(--color-negative)]/20 text-[var(--color-negative)]'
                    }`}>
                      {holding.correlation === 'positive' ? '↗ 正相关' : '↙ 负相关'}
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
