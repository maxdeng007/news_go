import { mockUserInfo } from '../data/mockData';

function getGreeting() {
  const hour = new Date().getHours();
  const timeMessages = {
    early: { short: '🌃 夜深了', full: '🌃 夜深了，注意休息' },
    morning: { short: '☀️ 早上好', full: '☀️ 早上好！新的一天充满可能' },
    noon: { short: '🍜 中午好', full: '🍜 中午好，休息一下看看市场' },
    afternoon: { short: '📈 下午好', full: '📈 下午好！来看今天的投资机会' },
    evening: { short: '🌙 晚上好', full: '🌙 晚上好！来看看今天的收获' },
  };
  
  if (hour < 6) return timeMessages.early;
  if (hour < 10) return timeMessages.morning;
  if (hour < 14) return timeMessages.noon;
  if (hour < 18) return timeMessages.afternoon;
  if (hour < 22) return timeMessages.evening;
  return timeMessages.early;
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
    <div className="max-w-md mx-auto px-4 pt-6 pb-4 md:max-w-2xl md:px-6 lg:max-w-6xl lg:px-8">
      <div className="glass-card p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-1">
              <span className="hidden sm:inline bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent-secondary)] to-[var(--color-accent-tertiary)] bg-clip-text text-transparent">
                {greeting.full}
              </span>
              <span className="sm:hidden bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent-secondary)] to-[var(--color-accent-tertiary)] bg-clip-text text-transparent">
                {greeting.short}，{mockUserInfo.name}
              </span>
            </h1>
            <p className="text-sm text-[var(--color-text-muted)]">
              {dateStr} • 财富洞察第 {Math.floor((new Date() - new Date('2024-01-01')) / (1000 * 60 * 60 * 24)) + 1} 期
            </p>
          </div>
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-secondary)] flex items-center justify-center opacity-80">
            <span className="text-lg font-bold text-[#000000]">{mockUserInfo.name[0]}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
