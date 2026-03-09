import { mockUserInfo } from '../data/mockData';

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

function formatCurrency(amount) {
  if (amount >= 10000) {
    return (amount / 10000).toFixed(1) + '万';
  }
  return amount.toString();
}

export default function Hero() {
  const greeting = getGreeting();
  const dateStr = formatDate();
  const isPositive = mockUserInfo.dailyChange >= 0;
  
  return (
    <div className="px-4 pt-6 pb-4">
      <div className="animate-fade-in">
        <div className="flex items-start justify-between mb-1">
          <div>
            <p className="text-lg text-[var(--color-text-secondary)] mb-0.5">
              {greeting}，{mockUserInfo.name} 👋
            </p>
            <p className="text-sm text-[var(--color-text-muted)]">
              {dateStr}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-[var(--color-text-muted)] mb-0.5">总资产</p>
            <p className="text-xl font-bold text-[var(--color-text-primary)]">
              ¥{formatCurrency(mockUserInfo.totalAssets)}
            </p>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-[var(--color-border)]">
          <div className="flex items-center gap-2">
            <div className={`text-sm font-semibold ${isPositive ? 'text-[var(--color-positive)]' : 'text-[var(--color-negative)]'}`}>
              {isPositive ? '+' : ''}¥{mockUserInfo.dailyChange.toLocaleString()}
            </div>
            <span className={`text-xs px-1.5 py-0.5 rounded ${
              isPositive 
                ? 'bg-[var(--color-positive)]/20 text-[var(--color-positive)]'
                : 'bg-[var(--color-negative)]/20 text-[var(--color-negative)]'
            }`}>
              {isPositive ? '+' : ''}{mockUserInfo.dailyChangePercent}%
            </span>
          </div>
          
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-[var(--color-text-muted)]">风险偏好</span>
            <span className="text-xs px-2 py-0.5 bg-[var(--color-bg-hover)] rounded text-[var(--color-text-secondary)]">
              {mockUserInfo.riskLevel}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
