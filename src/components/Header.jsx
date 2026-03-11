import { mockUserInfo } from '../data/mockData';

export default function Header() {
  const today = new Date();
  const dateStr = today.toLocaleDateString('zh-CN', { 
    month: 'long', 
    day: 'numeric' 
  });
  
  return (
    <header className="sticky top-0 z-40 bg-[var(--color-bg-primary)]/95 backdrop-blur-sm border-b border-[var(--color-border-light)]">
      <div className="max-w-md mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="newsletter-masthead text-lg text-[var(--color-text-primary)]">
              诺亚日报
            </h1>
            <p className="text-xs text-[var(--color-text-muted)]">
              {dateStr}
            </p>
          </div>
          
          <div className="text-right">
            <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">总资产</p>
            <p className="text-sm font-semibold text-[var(--color-text-primary)] font-mono">
              ¥{(mockUserInfo.totalAssets / 10000).toFixed(0)}万
            </p>
            <p className={`text-[10px] font-medium ${mockUserInfo.dailyChange >= 0 ? 'text-[var(--color-positive)]' : 'text-[var(--color-negative)]'}`}>
              {mockUserInfo.dailyChange >= 0 ? '+' : ''}¥{mockUserInfo.dailyChange.toLocaleString()} ({mockUserInfo.dailyChangePercent}%)
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
