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
      <div>
        <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl text-[var(--color-text-primary)] mb-2 font-semibold">
            <span className="hidden sm:inline">{greeting.full}</span>
            <span className="sm:hidden">{greeting.short}，{mockUserInfo.name}</span>
          </h1>
          <p className="hidden sm:block text-sm text-[var(--color-text-muted)] newsletter-body">
            {dateStr} • 财富洞察第 {Math.floor((new Date() - new Date('2024-01-01')) / (1000 * 60 * 60 * 24)) + 1} 期
          </p>
        </div>
      </div>
    </div>
  );
}
