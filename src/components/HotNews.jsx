import { useState, useRef, useEffect } from 'react';
import { mockNews } from '../data/mockData';

function HotBadge({ level }) {
  const colors = [
    'bg-gradient-to-r from-red-500 to-orange-500',
    'bg-gradient-to-r from-orange-500 to-amber-500',
    'bg-gradient-to-r from-amber-500 to-yellow-500'
  ];
  const fireEmojis = ['🔥', '🔥🔥', '🔥🔥🔥'];
  
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold ${colors[level] || colors[0]} text-white rounded-full shadow-lg shadow-red-500/30`}>
      {fireEmojis[level] || fireEmojis[0]}
    </span>
  );
}

export default function HotNews() {
  const hotNews = mockNews.filter(n => n.hot);
  const scrollRef = useRef(null);
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(true);
  
  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setShowLeftFade(el.scrollLeft > 10);
    setShowRightFade(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };
  
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <section className="mb-8 -mx-4 px-4">
      <div className="flex items-center gap-3 mb-4 px-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl animate-bounce">🔥</span>
          <h2 className="text-xl font-bold text-[var(--color-text-primary)]">今日热点</h2>
        </div>
        <div className="flex-1 h-px bg-gradient-to-r from-red-500/50 via-orange-500/30 to-transparent" />
      </div>

      <div className="relative">
        {/* Gradient overlays for scroll indication */}
        {showLeftFade && (
          <div className="absolute left-0 top-0 bottom-2 w-8 bg-gradient-to-r from-[var(--color-bg-primary)] to-transparent z-10 pointer-events-none" />
        )}
        {showRightFade && (
          <div className="absolute right-0 top-0 bottom-2 w-8 bg-gradient-to-l from-[var(--color-bg-primary)] to-transparent z-10 pointer-events-none" />
        )}
        
        <div 
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 px-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
        >
          {hotNews.map((news, index) => (
            <div
              key={news.id}
              className="flex-shrink-0 w-72 group cursor-pointer"
            >
              <div className="relative h-40 rounded-2xl overflow-hidden mb-3 shadow-xl shadow-black/30">
                <img 
                  src={news.image} 
                  alt={news.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                
                <div className="absolute top-3 left-3">
                  <HotBadge level={index % 3} />
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <h3 className="text-sm font-semibold text-white line-clamp-2 leading-tight drop-shadow-lg">
                    {news.title}
                  </h3>
                </div>
                
                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                  <span className="px-2 py-0.5 text-xs bg-black/60-white/90 text rounded backdrop-blur-sm font-medium">
                    {news.category}
                  </span>
                </div>
                
                {/* Time indicator */}
                <div className="absolute bottom-3 right-3">
                  <span className="text-xs text-white/70 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z"/>
                    </svg>
                    {news.timestamp}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Dot indicators */}
        <div className="flex justify-center gap-1.5 mt-2">
          {hotNews.map((_, idx) => (
            <div
              key={idx}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                idx === 0 ? 'w-4 bg-red-500' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
