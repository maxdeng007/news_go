import { useState, useRef, useEffect } from 'react';
import { mockUserInfo } from '../data/mockData';

function PaperTexture() {
  return (
    <div className="absolute inset-0 -z-10" style={{ background: '#FFFEF5' }}>
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        backgroundSize: '200px 200px'
      }} />
    </div>
  );
}

function GlassCard({ children }) {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-[var(--color-bg-card)] rounded-sm border border-[var(--color-border-light)]" />
      <div className="relative p-5">
        {children}
      </div>
    </div>
  );
}

export default function XiaoNuoya() {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [displayedText, setDisplayedText] = useState('');
  const videoRef = useRef(null);

  const transcript = "你好！我是小诺亚。今天市场有个大消息——美联储突然转向，新能源和AI板块直接爆了！你的持仓怎么样？哪些股票受影响？立即查看你的专属分析。";

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.play().catch(() => {});
    }
  }, []);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < transcript.length) {
        setDisplayedText(transcript.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 80);
    return () => clearInterval(interval);
  }, []);

  const toggleSound = async () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.muted = false;
        try {
          await videoRef.current.play();
        } catch (e) {
          console.log('Play with sound failed');
        }
        setIsMuted(false);
      } else {
        videoRef.current.muted = true;
        setIsMuted(true);
      }
    }
  };

  const handleVideoEnd = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      setShowContent(true);
    }, 500);
  };

  const handleSkip = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      setShowContent(true);
    }, 500);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className={`fixed inset-0 z-50 overflow-hidden transition-all duration-500 ${isExiting ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}`}>
      <PaperTexture />
      
      <div className="relative w-full h-full">
        <button
          onClick={handleSkip}
          className="absolute top-4 right-4 z-50 px-4 py-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer border border-[var(--color-border-light)] bg-[var(--color-bg-card)] rounded-sm"
        >
          跳过
        </button>

        <button
          onClick={toggleSound}
          className="absolute top-4 left-4 z-50 p-2 border border-[var(--color-border-light)] bg-[var(--color-bg-card)] rounded-sm hover:bg-[var(--color-bg-hover)] transition-colors cursor-pointer"
        >
          {isMuted ? (
            <svg className="w-5 h-5 text-[var(--color-text-primary)]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
            </svg>
          ) : (
            <svg className="w-5 h-5 text-[var(--color-text-primary)]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
          )}
        </button>

        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            className="w-full h-full object-contain"
            src="/nuoya.webm"
            onEnded={handleVideoEnd}
            playsInline
          />
          
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <GlassCard>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-sm flex items-center justify-center flex-shrink-0 bg-[var(--color-bg-secondary)] border border-[var(--color-border-light)]">
                  <svg className="w-4 h-4 text-[var(--color-accent)]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <span className="text-sm font-semibold text-[var(--color-text-primary)]">小诺亚</span>
                <span className="text-xs text-[var(--color-text-muted)]">AI主播</span>
              </div>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed font-serif">
                {displayedText}
                <span className="animate-pulse">|</span>
              </p>
              <div className="mt-4 pt-3 border-t border-[var(--color-border-light)] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <span className="w-1 h-3 bg-[var(--color-accent)] rounded-full animate-pulse" />
                    <span className="w-1 h-3 bg-[var(--color-accent)] rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                    <span className="w-1 h-3 bg-[var(--color-accent)] rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                  </div>
                  <span className="text-xs text-[var(--color-text-muted)]">{isMuted ? '已静音' : '播放中'}</span>
                </div>
                <button
                  onClick={handleSkip}
                  className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer"
                >
                  跳过 →
                </button>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}
