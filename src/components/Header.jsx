function getFormattedDate() {
  const today = new Date();
  const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  const weekday = weekdays[today.getDay()];
  const month = today.toLocaleDateString('en-US', { month: 'short' }).replace('.', '');
  const day = today.getDate();
  return { month, day, weekday };
}

export default function Header() {
  const { month, day, weekday } = getFormattedDate();
  
  return (
    <header className="sticky top-0 z-40 bg-[var(--color-bg-primary)]/95 backdrop-blur-sm border-b border-[var(--color-border-light)]">
      <div className="max-w-md mx-auto px-4 py-3">
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <h1 className="newsletter-masthead text-xl text-[var(--color-text-primary)] leading-tight">
              Noah Daily
            </h1>
            <p className="text-sm text-[var(--color-text-muted)] mt-0.5">
              洞悉每日全球新趋势
            </p>
          </div>
          
          <div className="flex flex-col items-end text-[var(--color-text-primary)]">
            <div className="flex items-baseline">
              <span className="text-xs">{month}.</span>
              <span className="text-3xl font-bold leading-none">{day}</span>
            </div>
            <span className="text-xs text-[var(--color-text-muted)]">{weekday}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
