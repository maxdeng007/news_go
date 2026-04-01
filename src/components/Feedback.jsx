import { useState } from 'react';

export default function Feedback() {
  const [voted, setVoted] = useState(null);

  const handleVote = (type) => {
    setVoted(type);
  };

  return (
    <section>
      <div className="border-t border-[rgba(0,255,255,0.1)] pt-8">
        <div className="glass-card-intense rounded-2xl p-6">
          {voted ? (
            <div className="text-center py-4">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-r from-[rgba(0,255,255,0.2)] to-[rgba(168,85,247,0.2)] flex items-center justify-center">
                <svg className="w-6 h-6 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-sm text-[var(--color-text-primary)]">
                感谢您的反馈！
              </p>
              <p className="text-xs text-[var(--color-text-muted)] mt-1">
                这将帮助我们优化内容质量
              </p>
            </div>
          ) : (
            <>
              <p className="text-center text-sm text-[var(--color-text-secondary)] mb-5">
                本期内容对您是否有帮助？
              </p>
              
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => handleVote('up')}
                  className="flex flex-col items-center gap-2 px-6 py-4 glass-btn text-[var(--color-text-secondary)] rounded-xl hover:text-[#22d3ee] hover:border-[rgba(34,211,238,0.4)] transition-all duration-200 cursor-pointer"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                  <span className="text-xs">真不错</span>
                </button>

                <button
                  onClick={() => handleVote('down')}
                  className="flex flex-col items-center gap-2 px-6 py-4 glass-btn text-[var(--color-text-secondary)] rounded-xl hover:text-[#f472b6] hover:border-[rgba(244,114,182,0.4)] transition-all duration-200 cursor-pointer"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
