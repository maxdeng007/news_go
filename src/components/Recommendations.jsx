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
    <section>
      <div className="flex items-center gap-3 mb-6">
        <h2 className="newsletter-headline text-[var(--color-text-primary)]">CIO观点</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-[var(--color-border)] to-transparent" />
      </div>
      
      <div className="border-l-2 border-[var(--color-accent)] pl-4 space-y-6">
        {mockRecommendations.map((rec, index) => {
          const risk = riskConfig[rec.riskLevel];
          const isExpanded = expanded === rec.id;
          
          return (
            <article
              key={rec.id}
              className="cursor-pointer group"
              onClick={() => setExpanded(isExpanded ? null : rec.id)}
            >
              <div className="flex items-start gap-3 mb-2">
                <span className="text-xs font-mono text-[var(--color-accent)] mt-0.5">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="flex-1">
                  <h3 className="newsletter-headline text-lg text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors">
                    {rec.title}
                  </h3>
                </div>
              </div>
              
              <p className="text-sm text-[var(--color-text-secondary)] mb-3 pl-7">
                {rec.description}
              </p>
              
              <div className="flex items-center gap-3 pl-7">
                <span className={`text-xs px-2 py-0.5 rounded-sm font-medium ${risk.bg} ${risk.text}`}>
                  {risk.label}
                </span>
                <div className="flex gap-2">
                  {rec.tags.map((tag) => (
                    <span key={tag} className="text-xs text-[var(--color-text-muted)]">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              
              {isExpanded && (
                <div className="mt-3 pl-7">
                  <div className="p-4 bg-[var(--color-bg-secondary)] rounded-sm border-l-2 border-[var(--color-accent)]">
                    <p className="text-sm text-[var(--color-text-primary)] leading-relaxed font-serif italic">
                      {rec.reason}
                    </p>
                  </div>
                </div>
              )}
              
              {index < mockRecommendations.length - 1 && (
                <div className="mt-6 border-b border-[var(--color-border-light)]" />
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
