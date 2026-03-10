import { useState, useEffect, useRef } from 'react';
import { mockNews } from '../data/mockData';

export default function HotNews() {
  const hotNews = mockNews.filter(n => n.hot);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
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
    <section className="mb-8 -mx-4 px-4">
      <div className="flex items-center gap-3 mb-4">
        <h2 
          className="text-lg font-bold"
          style={{
            background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          今日热点
        </h2>
        <div className="flex-1 h-px bg-gradient-to-r from-amber-500/30 to-transparent" />
      </div>

      <div className="relative">
        <div 
          className="relative h-56 sm:h-60 md:h-64 lg:h-72 rounded-2xl overflow-hidden"
          style={{
            border: '1px solid rgba(245,158,11,0.3)',
            boxShadow: '0 0 30px rgba(245,158,11,0.15)',
          }}
        >
          <div 
            className="absolute top-0 left-0 right-0 h-1 bg-zinc-800 z-20"
            style={{ opacity: 0.5 }}
          >
            <div 
              className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          {hotNews.map((news, index) => (
            <div
              key={news.id}
              className={`absolute inset-0 transition-all duration-700 ${
                index === activeIndex 
                  ? 'opacity-100 scale-100' 
                  : 'opacity-0 scale-105 pointer-events-none'
              }`}
            >
              <img 
                src={news.image} 
                alt={news.title}
                className="w-full h-full object-cover"
                style={{
                  transform: index === activeIndex ? 'scale(1.05)' : 'scale(1)',
                  transition: 'transform 5s ease-out',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
              
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full shadow-lg shadow-red-500/40">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                  热点
                </span>
              </div>
              
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <span className="px-2.5 py-1 text-xs font-medium bg-white/10 backdrop-blur-md text-white/90 rounded-full border border-white/20">
                  {news.category}
                </span>
                <span className="px-2.5 py-1 text-xs font-medium bg-white/10 backdrop-blur-md text-white/70 rounded-full border border-white/20">
                  {news.timestamp}
                </span>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-lg font-bold text-white leading-tight drop-shadow-lg mb-2 line-clamp-2">
                  {news.title}
                </h3>
                <p className="text-sm text-white/70 line-clamp-2 mb-3">
                  {news.summary}
                </p>
                <button 
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-medium rounded-lg cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-amber-500/30"
                  onClick={() => console.log('View news:', news.id)}
                >
                  查看详情
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center gap-2 mt-4">
          {hotNews.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleDotClick(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === activeIndex 
                  ? 'w-8 bg-gradient-to-r from-amber-400 to-orange-500' 
                  : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
