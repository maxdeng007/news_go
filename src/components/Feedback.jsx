import { useState } from 'react';

export default function Feedback() {
  const [voted, setVoted] = useState(null);

  const handleVote = (type) => {
    setVoted(type);
  };

  return (
    <section>
      <div className="border-t-2 border-[var(--color-border-light)] pt-6">
        <div className="bg-[var(--color-bg-secondary)] rounded-sm p-5 border border-[var(--color-border-light)]">
          {voted ? (
            <div className="text-center py-2">
              <p className="text-sm text-[var(--color-text-primary)] font-serif italic">
                感谢您的反馈！
              </p>
              <p className="text-xs text-[var(--color-text-muted)] mt-1">
                这将帮助我们优化内容质量
              </p>
            </div>
          ) : (
            <>
              <p className="text-center text-sm text-[var(--color-text-secondary)] mb-4 font-serif">
                本期内容对您是否有帮助？
              </p>
              
              <div className="flex items-center justify-center gap-6">
                <button
                  onClick={() => handleVote('up')}
                  className="flex flex-col items-center gap-2 px-4 py-3 border border-[var(--color-border-light)] bg-[var(--color-bg-card)] text-[var(--color-text-secondary)] rounded-sm hover:border-[var(--color-positive)] hover:text-[var(--color-positive)] transition-colors cursor-pointer"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                  <span className="text-xs">真不错</span>
                </button>

                <button
                  onClick={() => handleVote('down')}
                  className="flex flex-col items-center gap-2 px-4 py-3 border border-[var(--color-border-light)] bg-[var(--color-bg-card)] text-[var(--color-text-secondary)] rounded-sm hover:border-[var(--color-negative)] hover:text-[var(--color-negative)] transition-colors cursor-pointer"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                  </svg>
                  <span className="text-xs">很一般</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
