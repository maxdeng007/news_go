import { mockUserInfo, mockNews } from '../data/mockData';

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 6) return '深夜好';
  if (hour < 12) return '早上好';
  if (hour < 14) return '中午好';
  if (hour < 18) return '下午好';
  if (hour < 22) return '晚上好';
  return '夜深了';
}

function formatDate() {
  const now = new Date();
  const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
  
  const weekday = weekdays[now.getDay()];
  const month = months[now.getMonth()];
  const day = now.getDate();
  
  return `${month}${day}日 ${weekday}`;
}

const mockIndices = [
  { name: '上证指数', code: 'SH000001', price: 3428.65, change: 0.82, up: true },
  { name: '深证成指', code: 'SZ399001', price: 11245.32, change: -0.35, up: false },
  { name: '创业板指', code: 'SZ399006', price: 1856.78, change: 1.24, up: true },
  { name: '沪深300', code: 'SH000300', price: 4185.92, change: 0.56, up: true },
];

export default function Hero() {
  const greeting = getGreeting();
  const dateStr = formatDate();
  const hotNews = mockNews.filter(n => n.hot).slice(0, 2);
  
  return (
    <div className="px-4 pt-6 pb-4 lg:px-8">
      <div className="lg:grid lg:grid-cols-2 lg:gap-8">
        <div className="space-y-4">
          <div>
            <h1 className="newsletter-headline text-2xl md:text-3xl lg:text-4xl text-[var(--color-text-primary)] mb-2">
              {greeting}，{mockUserInfo.name}
            </h1>
            <p className="text-sm text-[var(--color-text-muted)] newsletter-body">
              {dateStr} • 财富洞察第 {Math.floor((new Date() - new Date('2024-01-01')) / (1000 * 60 * 60 * 24)) + 1} 期
            </p>
          </div>
          
          <div className="flex items-center gap-3 pb-3 border-b border-[var(--color-border)]">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-600" />
              <span className="text-xs text-[var(--color-text-muted)]">市场开盘中</span>
            </div>
            
            <div className="flex-1" />
            
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-[var(--color-text-muted)]">风险偏好</span>
              <span className="text-xs px-2 py-1 bg-[var(--color-bg-hover)] text-[var(--color-text-secondary)] rounded border border-[var(--color-border)]">
                {mockUserInfo.riskLevel}
              </span>
            </div>
          </div>
          
          <div className="rounded-xl p-4 border border-[var(--color-border)] bg-[var(--color-bg-card)]">
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-4 h-4 text-[var(--color-accent)]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
              </svg>
              <span className="text-sm font-medium text-[var(--color-accent)]">今日要闻</span>
            </div>
            
            <div className="space-y-2">
              {hotNews.map((news) => (
                <div 
                  key={news.id}
                  className="flex items-start gap-2 cursor-pointer group"
                >
                  <span className="text-xs text-[var(--color-text-muted)] mt-0.5">•</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[var(--color-text-primary)] leading-tight group-hover:text-[var(--color-accent)] transition-colors">
                      {news.title}
                    </p>
                    <p className="text-xs text-[var(--color-text-muted)] mt-0.5 truncate">
                      {news.summary}
                    </p>
                  </div>
                  <span className="text-xs px-1.5 py-0.5 bg-[var(--color-bg-hover)] text-[var(--color-text-muted)] rounded border border-[var(--color-border)] flex-shrink-0">
                    {news.category}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="hidden lg:block lg:self-end">
          <div className="rounded-xl p-3 border border-[var(--color-border)] bg-[var(--color-bg-card)]">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-3.5 h-3.5 text-[var(--color-positive)]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z"/>
              </svg>
              <span className="text-xs font-medium text-[var(--color-positive)]">市场指数</span>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              {mockIndices.map((idx) => (
                <div key={idx.code} className="flex items-center justify-between p-2 rounded-lg border border-[var(--color-border)] hover:bg-[var(--color-bg-hover)] transition-colors cursor-pointer">
                  <div>
                    <p className="text-xs font-medium text-[var(--color-text-primary)]">{idx.name}</p>
                    <p className="text-[10px] text-[var(--color-text-muted)]">{idx.code}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold text-[var(--color-text-primary)]">{idx.price.toLocaleString()}</p>
                    <p className={`text-[10px] font-medium ${idx.up ? 'text-[var(--color-positive)]' : 'text-[var(--color-negative)]'}`}>
                      {idx.up ? '+' : ''}{idx.change}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
