import { mockNews } from '../data/mockData';

export default function HotNews() {
  return (
    <section className="mb-6">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">今日热点</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-[var(--color-border)] to-transparent" />
      </div>

      <div className="space-y-3 stagger-children">
        {mockNews.filter(n => n.hot).map((news, index) => (
          <div
            key={news.id}
            className="group bg-[var(--color-bg-card)] rounded-xl overflow-hidden border border-[var(--color-border)] hover:border-[var(--color-border-light)] transition-all cursor-pointer"
          >
            <div className="relative h-36 overflow-hidden">
              <img 
                src={news.image} 
                alt={news.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-card)] via-transparent to-transparent" />
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="px-2 py-0.5 text-xs font-medium bg-[var(--color-accent)]/90 text-white rounded-full backdrop-blur-sm">
                  {news.category}
                </span>
              </div>
              <div className="absolute bottom-3 right-3 text-xs text-[var(--color-text-muted)] bg-[var(--color-bg-primary)]/80 px-2 py-1 rounded backdrop-blur-sm">
                {news.timestamp}
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="text-base font-medium text-[var(--color-text-primary)] mb-1.5 group-hover:text-[var(--color-accent)] transition-colors line-clamp-2">
                {news.title}
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2">
                {news.summary}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
