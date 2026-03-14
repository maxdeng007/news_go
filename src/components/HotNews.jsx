import { useState, useEffect, useRef } from 'react';
import { mockNews } from '../data/mockData';
import NewsDrawer from './NewsDrawer';

export default function HotNews() {
  const hotNews = mockNews.filter(n => n.hot);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [selectedNews, setSelectedNews] = useState(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    setProgress(0);
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveIndex((prev) => (prev + 1) % hotNews.length);
          return 0;
        }
        return prev + 2;
      });
    }, 100);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [activeIndex, hotNews.length]);

  const handleDotClick = (idx) => {
    setActiveIndex(idx);
    setProgress(0);
  };

  const activeNews = hotNews[activeIndex];

  return (
    <section>
      <div className="flex items-center gap-3 mb-6">
        <h2 className="newsletter-section-title text-[var(--color-text-primary)]">
          今日头条
        </h2>
        <div className="flex-1 h-px bg-gradient-to-r from-[var(--color-border)] to-transparent" />
      </div>

      <div className="relative">
        <div 
          className="relative h-56 sm:h-60 md:h-64 lg:h-72 rounded-sm overflow-hidden border border-[var(--color-border-light)]"
        >
          <div 
            className="absolute top-0 left-0 right-0 h-0.5 bg-[var(--color-border-light)] z-20"
          >
            <div 
              className="h-full bg-[var(--color-accent)] transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          {hotNews.map((news, index) => (
            <div
              key={news.id}
              onClick={() => setSelectedNews(news)}
              className={`absolute inset-0 transition-all duration-700 cursor-pointer ${
                index === activeIndex 
                  ? 'opacity-100 scale-100' 
                  : 'opacity-0 scale-105 pointer-events-none'
              }`}
            >
              <img 
                src={news.image} 
                alt={news.title}
                className="w-full h-full object-cover grayscale-[30%]"
                style={{
                  transform: index === activeIndex ? 'scale(1.02)' : 'scale(1)',
                  transition: 'transform 6s ease-out',
                  filter: 'grayscale(30%)',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FFFEF5] via-[#FFFEF5]/20 to-black/30" />
              
              <div className="absolute top-4 left-4">
                <span className="px-2 py-1 text-xs font-semibold tracking-wider bg-[var(--color-accent)] text-white rounded-sm">
                  热点
                </span>
              </div>
              
              <div className="absolute top-4 right-4">
                <span className="px-2 py-1 text-xs text-[var(--color-text-muted)] bg-[#FFFEF5]/80 rounded-sm">
                  {news.category}
                </span>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-[#FFFEF5] to-transparent">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono text-[var(--color-text-muted)]">
                    {news.timestamp}
                  </span>
                </div>
                <h3 className="newsletter-headline text-xl text-[var(--color-text-primary)] leading-tight mb-2 line-clamp-2">
                  {news.title}
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2 font-serif">
                  {news.summary}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center gap-2 mt-3">
          {hotNews.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleDotClick(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === activeIndex 
                  ? 'w-6 bg-[var(--color-accent)]' 
                  : 'w-1.5 bg-[var(--color-border-light)] hover:bg-[var(--color-text-muted)]'
              }`}
            />
          ))}
        </div>
      </div>

      {selectedNews && (
        <NewsDrawer 
          news={selectedNews} 
          onClose={() => setSelectedNews(null)} 
        />
      )}
    </section>
  );
}
