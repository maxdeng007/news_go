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
    <div className="px-4 pt-6 pb-4 relative overflow-hidden lg:px-0">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-transparent pointer-events-none" style={{ marginLeft: '-50%', marginRight: '-50%', width: '200%' }} />
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-amber-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-tr from-purple-500/8 to-transparent rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative animate-fade-in lg:grid lg:grid-cols-2 lg:gap-8">
        <div className="space-y-4">
          <div>
            <p className="text-xl text-[var(--color-text-primary)] mb-1 font-light">
              {greeting}，<span className="font-semibold">{mockUserInfo.name}</span>
              <svg className="w-5 h-5 inline-block ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
            </p>
            <p className="text-sm text-[var(--color-text-muted)]">
              {dateStr}
            </p>
          </div>
          
          <div 
            className="rounded-xl p-4"
            style={{
              background: 'linear-gradient(135deg, rgba(245,158,11,0.1) 0%, rgba(15,15,18,0.8) 100%)',
              border: '1px solid rgba(245,158,11,0.2)',
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
              </svg>
              <span className="text-sm font-medium text-amber-400">今日要闻</span>
            </div>
            
            <div className="space-y-2">
              {hotNews.map((news) => (
                <div 
                  key={news.id}
                  className="flex items-start gap-2 cursor-pointer group"
                >
                  <span className="text-xs text-zinc-500 mt-0.5">•</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[var(--color-text-primary)] leading-tight group-hover:text-amber-400 transition-colors">
                      {news.title}
                    </p>
                    <p className="text-xs text-zinc-500 mt-0.5 truncate">
                      {news.summary}
                    </p>
                  </div>
                  <span className="text-xs px-1.5 py-0.5 bg-zinc-800 text-zinc-400 rounded flex-shrink-0">
                    {news.category}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-3 pt-2 border-t border-[var(--color-border)]/50">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
              <span className="text-xs text-[var(--color-text-muted)]">市场开盘中</span>
            </div>
            
            <div className="flex-1" />
            
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-[var(--color-text-muted)]">风险偏好</span>
              <span className="text-xs px-2 py-1 bg-gradient-to-r from-amber-500/10 to-orange-500/10 text-amber-400 rounded-full border border-amber-500/20">
                {mockUserInfo.riskLevel}
              </span>
            </div>
          </div>
        </div>
        
        <div className="hidden lg:block">
          <div 
            className="rounded-xl p-4"
            style={{
              background: 'linear-gradient(135deg, rgba(20,20,25,0.9) 0%, rgba(15,15,18,0.95) 100%)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z"/>
              </svg>
              <span className="text-sm font-medium text-emerald-400">市场指数</span>
            </div>
            
            <div className="space-y-3">
              {mockIndices.map((idx) => (
                <div key={idx.code} className="flex items-center justify-between p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                  <div>
                    <p className="text-sm font-medium text-[var(--color-text-primary)]">{idx.name}</p>
                    <p className="text-xs text-[var(--color-text-muted)]">{idx.code}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-[var(--color-text-primary)]">{idx.price.toLocaleString()}</p>
                    <p className={`text-xs font-medium ${idx.up ? 'text-green-400' : 'text-red-400'}`}>
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
