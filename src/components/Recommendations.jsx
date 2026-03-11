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
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=200&fit=crop"
  }
];

const riskConfig = {
  1: { label: '低风险', bg: 'bg-[var(--color-positive-bg)]', text: 'text-[var(--color-positive)]' },
  2: { label: '中风险', bg: 'bg-yellow-50', text: 'text-yellow-700' },
  3: { label: '高风险', bg: 'bg-[var(--color-negative-bg)]', text: 'text-[var(--color-negative)]' }
};

export default function Recommendations() {
  const [expanded, setExpanded] = useState(null);

  return (
    <section className="mb-6">
      <div className="space-y-4">
        {mockRecommendations.map((rec, index) => {
          const risk = riskConfig[rec.riskLevel];
          const isExpanded = expanded === rec.id;
          
          return (
            <div
              key={rec.id}
              className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setExpanded(isExpanded ? null : rec.id)}
            >
              <div className="flex gap-4 p-4">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  {index === 0 && (
                    <div className="absolute top-0 left-0 z-10 px-1.5 py-0.5 bg-[var(--color-accent)] text-white text-[10px] font-bold">
                      推荐
                    </div>
                  )}
                  <img 
                    src={rec.image} 
                    alt={rec.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="text-base font-semibold text-[var(--color-text-primary)] leading-tight">
                      {rec.title}
                    </h3>
                  </div>
                  
                  <p className="text-sm text-[var(--color-text-secondary)] mb-2">
                    {rec.description}
                  </p>
                  
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded ${risk.bg} ${risk.text}`}>
                      {risk.label}
                    </span>
                    {rec.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="text-xs text-[var(--color-text-muted)]">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex-shrink-0">
                  <svg className={`w-5 h-5 text-[var(--color-text-muted)] transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              
              {isExpanded && (
                <div className="px-4 pb-4 pt-0">
                  <div className="p-3 rounded-lg bg-[var(--color-bg-hover)] border border-[var(--color-border)]">
                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                      {rec.reason}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
