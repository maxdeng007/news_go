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

export default function Hero() {
  const greeting = getGreeting();
  const dateStr = formatDate();
  
  return (
    <div className="px-4 pt-6 pb-4 lg:px-8">
      <div>
        <div>
          <h1 className="newsletter-hero-headline text-[var(--color-text-primary)] mb-2">
            {greeting}，{mockUserInfo.name}
          </h1>
          <p className="text-sm text-[var(--color-text-muted)] newsletter-body">
            {dateStr} • 财富洞察第 {Math.floor((new Date() - new Date('2024-01-01')) / (1000 * 60 * 60 * 24)) + 1} 期
          </p>
        </div>
        
        <div className="flex items-center gap-3 pt-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-600" />
            <span className="text-xs text-[var(--color-text-muted)]">市场开盘中</span>
          </div>
          
          <div className="flex-1" />
          
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-[var(--color-text-muted)]">风险偏好</span>
            <span className="text-xs px-2 py-1 bg-[var(--color-bg-hover)] text-[var(--color-text-secondary)] rounded-sm border border-[var(--color-border-light)]">
              {mockUserInfo.riskLevel}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
