import { useState, useRef, useEffect } from 'react';
import { mockUserInfo } from '../data/mockData';

function MeshGradient() {
  return (
    <div className="absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-[var(--color-bg-primary)]" />
      <div className="absolute top-[15%] left-[10%] w-[80vw] h-[80vw] max-w-96 max-h-96 bg-[var(--color-accent)]/30 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[15%] right-[10%] w-[70vw] h-[70vw] max-w-80 max-h-80 bg-purple-500/25 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-[50%] right-[20%] w-[50vw] h-[50vw] max-w-64 max-h-64 bg-blue-500/20 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '0.5s' }} />
      <div className="absolute bottom-[40%] left-[5%] w-[60vw] h-[60vw] max-w-72 max-h-72 bg-amber-500/20 rounded-full blur-[90px] animate-pulse" style={{ animationDelay: '1.5s' }} />
    </div>
  );
}

function GlassCard({ children }) {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 shadow-2xl" />
      <div className="relative p-5">
        {children}
      </div>
    </div>
  );
}

export default function XiaoNuoya() {
  const [isVisible, setIsVisible] = useState(true);
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
    setIsVisible(false);
    setShowContent(true);
  };

  const handleSkip = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsVisible(false);
    setShowContent(true);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <MeshGradient />
      </div>
      
      <div className="relative w-full h-full">
        <button
          onClick={handleSkip}
          className="absolute top-4 right-4 z-50 px-4 py-2 bg-white/10 backdrop-blur-md text-sm text-white/80 rounded-lg border border-white/20 hover:bg-white/20 transition-colors"
        >
          跳过
        </button>

        <button
          onClick={toggleSound}
          className="absolute top-4 left-4 z-50 p-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/20 transition-colors"
        >
          {isMuted ? (
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
            </svg>
          ) : (
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
          )}
        </button>

        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            className="w-full h-full object-contain bg-transparent"
            src="/nuoya.mp4"
            onEnded={handleVideoEnd}
            playsInline
          />
          
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <GlassCard>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-amber-600 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <span className="text-sm font-semibold text-[var(--color-text-primary)]">小诺亚</span>
                <span className="text-xs text-[var(--color-text-muted)]">AI主播</span>
              </div>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                {displayedText}
                <span className="animate-pulse">|</span>
              </p>
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
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
                  className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
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
