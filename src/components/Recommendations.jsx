import { useState } from 'react';

const mockRecommendations = [
  {
    id: 1,
    title: "关注新能源车上游",
    description: "锂矿价格企稳反弹，可适当配置",
    risk: "中风险",
    riskLevel: 2,
    tags: ["新能源", "上游", "锂电"],
    reason: "新能源车销量突破500万辆，行业景气度持续回升",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
      </svg>
    ),
    color: "from-green-500 to-emerald-600",
    accentColor: "#22c55e",
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400&h=200&fit=crop"
  },
  {
    id: 2,
    title: "黄金回调即是机会",
    description: "地缘+降息预期支撑金价",
    risk: "低风险",
    riskLevel: 1,
    tags: ["贵金属", "避险", "黄金"],
    reason: "黄金价格突破历史新高，避险需求强劲",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2L2 19h20L12 2zm0 4l6.5 11h-13L12 6z"/>
      </svg>
    ),
    color: "from-yellow-500 to-amber-600",
    accentColor: "#f59e0b",
    image: "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=400&h=200&fit=crop"
  },
  {
    id: 3,
    title: "AI算力仍是主线",
    description: "算力需求持续爆发，关注龙头",
    risk: "高风险",
    riskLevel: 3,
    tags: ["AI", "科技", "算力"],
    reason: "AI芯片需求爆发，台积电季度营收创新高",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M21 10.12h-6.78l2.74-2.82c-2.73-2.7-7.15-2.8-9.88-.1-2.73 2.71-2.73 7.08 0 9.79s7.15 2.71 9.88 0c1.36-1.35 2.04-2.99 2.04-4.79h2c0 2.37-.9 4.67-2.56 6.45l1.78 1.78c2.41-2.34 3.78-5.73 3.78-9.44 0-2.07-.45-4.06-1.28-5.89l1.77 1.77z"/>
      </svg>
    ),
    color: "from-purple-500 to-indigo-600",
    accentColor: "#8b5cf6",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=200&fit=crop"
  }
];

const riskConfig = {
  1: { label: '低风险', color: 'from-green-500/20 to-green-600/10', textColor: 'text-green-400', borderColor: 'border-green-500/30', glow: 'shadow-green-500/20' },
  2: { label: '中风险', color: 'from-yellow-500/20 to-yellow-600/10', textColor: 'text-yellow-400', borderColor: 'border-yellow-500/30', glow: 'shadow-yellow-500/20' },
  3: { label: '高风险', color: 'from-red-500/20 to-red-600/10', textColor: 'text-red-400', borderColor: 'border-red-500/30', glow: 'shadow-red-500/20' }
};

export default function Recommendations() {
  const [expanded, setExpanded] = useState(null);

  return (
    <section className="mb-6">
      <div className="flex items-center gap-3 mb-4">
        <h2 className="newsletter-headline text-xl md:text-2xl text-[var(--color-text-primary)]">投资观点</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-[var(--color-border)] to-transparent" />
      </div>

      <div className="grid grid-cols-1 gap-4">
        {mockRecommendations.map((rec, index) => {
          const risk = riskConfig[rec.riskLevel];
          const isExpanded = expanded === rec.id;
          const isHot = index === 0;
          
          return (
            <div
              key={rec.id}
              className="relative rounded-2xl overflow-hidden cursor-pointer group"
              onClick={() => setExpanded(isExpanded ? null : rec.id)}
            >
              <div 
                className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity"
                style={{
                  background: `linear-gradient(135deg, ${rec.accentColor}40 0%, transparent 70%)`
                }}
              />
              
              <div className="relative">
                <div className="flex gap-4 p-4">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                    {isHot && (
                      <div 
                        className="absolute top-0 left-0 z-10 px-1.5 py-0.5 rounded-tl-lg rounded-br-lg text-[10px] font-bold text-white"
                        style={{
                          background: 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)',
                        }}
                      >
                        HOT
                      </div>
                    )}
                    <img 
                      src={rec.image} 
                      alt={rec.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="text-base font-bold text-[var(--color-text-primary)] leading-tight">
                        {rec.title}
                      </h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${risk.color} ${risk.textColor} border ${risk.borderColor} flex-shrink-0`}>
                        {risk.label}
                      </span>
                    </div>
                    
                    <p className="text-sm text-[var(--color-text-secondary)] mb-2">
                      {rec.description}
                    </p>
                    
                    <div className="flex items-center gap-2 flex-wrap">
                      {rec.tags.map((tag) => (
                        <span key={tag} className="text-xs px-2 py-0.5 bg-[var(--color-bg-hover)] text-[var(--color-text-muted)] rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                {isExpanded && (
                  <div className="px-4 pb-4 pt-0 animate-slide-up">
                    <div className="p-3 bg-[var(--color-bg-primary)]/60 rounded-xl border border-[var(--color-border)]">
                      <div className="flex items-center gap-2 mb-2">
                        <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
                        </svg>
                        <span className="text-xs font-medium text-amber-400">推荐理由</span>
                      </div>
                      <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                        {rec.reason}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="absolute bottom-4 right-4">
                <div className={`w-6 h-6 rounded-full bg-[var(--color-bg-hover)] flex items-center justify-center transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                  <svg className="w-4 h-4 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
