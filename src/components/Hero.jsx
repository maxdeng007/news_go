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

export default function Hero() {
  const greeting = getGreeting();
  const today = new Date();
  const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  const weekday = weekdays[today.getDay()];
  const month = today.toLocaleDateString('en-US', { month: 'short' }).replace('.', '');
  const day = today.getDate();
  const issueNumber = Math.floor((new Date() - new Date('2024-01-01')) / (1000 * 60 * 60 * 24)) + 1;
  
  return (
    <div className="max-w-md mx-auto px-4 pt-6 pb-4 md:max-w-2xl md:px-6 lg:max-w-6xl lg:px-8">
      <div className="glass-card p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs px-2 py-0.5 rounded-sm bg-[var(--color-bg-hover)] border border-[var(--color-border)] text-[var(--color-text-muted)] font-mono">
                第{issueNumber}期
              </span>
              <h1 className="newsletter-masthead text-xl md:text-2xl text-[var(--color-text-primary)] leading-tight">
                <span className="bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-secondary)] bg-clip-text text-transparent">
                  Noah Daily
                </span>
              </h1>
              <span className="text-xs text-[var(--color-text-muted)] hidden sm:inline">
                洞悉每日全球新趋势
              </span>
            </div>
            <p className="text-base sm:text-lg text-[var(--color-text-primary)]">
              <span className="text-[var(--color-accent)]">{greeting.full.split('，')[0]}</span>
              <span className="text-[var(--color-text-secondary)]">，{mockUserInfo.name}先生</span>
            </p>
          </div>
          <div className="flex flex-col items-end text-[var(--color-text-primary)] flex-shrink-0">
            <div className="flex items-baseline">
              <span className="text-sm text-[var(--color-text-muted)]">{month}.</span>
              <span className="text-3xl sm:text-4xl font-bold leading-none bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-secondary)] bg-clip-text text-transparent">{day}</span>
            </div>
            <span className="text-xs text-[var(--color-text-muted)]">{weekday}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
