import { useState } from 'react';

const mockRecommendations = [
  {
    id: 1,
    title: "关注新能源车上游",
    description: "锂矿价格企稳反弹，可适当配置",
    risk: "中风险",
    tags: ["新能源", "上游"]
  },
  {
    id: 2,
    title: "黄金回调即是机会",
    description: "地缘+降息预期支撑金价",
    risk: "低风险",
    tags: ["贵金属", "避险"]
  },
  {
    id: 3,
    title: "AI算力仍是主线",
    description: "算力需求持续爆发，关注龙头",
    risk: "高风险",
    tags: ["AI", "科技"]
  }
];

export default function Recommendations() {
  const [expanded, setExpanded] = useState(null);

  return (
    <section className="mb-6">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">新闻推荐</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-[var(--color-border)] to-transparent" />
        <span className="text-xs text-[var(--color-text-muted)]">根据持仓</span>
      </div>

      <div className="space-y-3 stagger-children">
        {mockRecommendations.map((rec) => (
          <div
            key={rec.id}
            className="bg-[var(--color-bg-card)] rounded-xl p-4 border border-[var(--color-border)] hover:border-[var(--color-border-light)] transition-all cursor-pointer"
            onClick={() => setExpanded(expanded === rec.id ? null : rec.id)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <h3 className="text-base font-medium text-[var(--color-text-primary)]">
                    {rec.title}
                  </h3>
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    rec.risk === '低风险'
                      ? 'bg-green-500/20 text-green-400'
                      : rec.risk === '中风险'
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {rec.risk}
                  </span>
                </div>
                
                <p className="text-sm text-[var(--color-text-secondary)]">
                  {rec.description}
                </p>

                {expanded === rec.id && (
                  <div className="mt-3 pt-3 border-t border-[var(--color-border)] animate-slide-up">
                    <p className="text-xs text-[var(--color-text-muted)] mb-2">相关标签</p>
                    <div className="flex flex-wrap gap-1.5">
                      {rec.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 text-xs bg-[var(--color-bg-hover)] text-[var(--color-text-secondary)] rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <svg
                className={`w-5 h-5 text-[var(--color-text-muted)] transition-transform ${
                  expanded === rec.id ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
