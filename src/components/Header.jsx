import { mockUserInfo } from '../data/mockData';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-[var(--color-bg-primary)]/80 backdrop-blur-md border-b border-[var(--color-border)]">
      <div className="max-w-md mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-[var(--color-text-primary)]">
              诺亚 Daily
            </h1>
            <p className="text-xs text-[var(--color-text-muted)]">
              {new Date().toLocaleDateString('zh-CN', { month: 'long', day: 'numeric', weekday: 'long' })}
            </p>
          </div>
          
          <div className="text-right">
            <p className="text-xs text-[var(--color-text-muted)]">总资产</p>
            <p className="text-base font-semibold text-[var(--color-text-primary)]">
              ¥{(mockUserInfo.totalAssets / 10000).toFixed(0)}万
            </p>
            <p className={`text-xs ${mockUserInfo.dailyChange >= 0 ? 'text-[var(--color-positive)]' : 'text-[var(--color-negative)]'}`}>
              {mockUserInfo.dailyChange >= 0 ? '+' : ''}¥{mockUserInfo.dailyChange.toLocaleString()} ({mockUserInfo.dailyChangePercent}%)
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
