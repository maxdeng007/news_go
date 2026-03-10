import { useState } from 'react';

export default function Feedback() {
  const [voted, setVoted] = useState(null);

  const handleVote = (type) => {
    setVoted(type);
  };

  return (
    <section className="mb-8 px-4">
      <div className="bg-[var(--color-bg-card)] rounded-xl p-5 border border-[var(--color-border)]">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-full bg-[var(--color-bg-hover)] flex items-center justify-center">
              <svg className="w-5 h-5 text-[var(--color-accent)]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
              </svg>
            </div>
            <p className="text-sm text-[var(--color-text-secondary)]">
              这篇内容对您有帮助吗？
            </p>
          </div>
          
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => handleVote('up')}
              disabled={voted !== null}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg border transition-all duration-200 cursor-pointer ${
                voted === 'up'
                  ? 'border-[var(--color-positive)] bg-[var(--color-positive)]/20 text-[var(--color-positive)]'
                  : 'border-[var(--color-border)] hover:border-[var(--color-positive)] hover:bg-[var(--color-positive)]/10 text-[var(--color-text-secondary)]'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/>
              </svg>
              <span className="text-sm font-medium">有帮助</span>
            </button>

            <button
              onClick={() => handleVote('down')}
              disabled={voted !== null}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg border transition-all duration-200 cursor-pointer ${
                voted === 'down'
                  ? 'border-[var(--color-negative)] bg-[var(--color-negative)]/20 text-[var(--color-negative)]'
                  : 'border-[var(--color-border)] hover:border-[var(--color-negative)] hover:bg-[var(--color-negative)]/10 text-[var(--color-text-secondary)]'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z"/>
              </svg>
              <span className="text-sm font-medium">没帮助</span>
            </button>
          </div>

          {voted && (
            <p className="mt-3 text-xs text-[var(--color-text-muted)] animate-fade-in">
              感谢您的反馈！这将帮助我们优化推荐算法
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
