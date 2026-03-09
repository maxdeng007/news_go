import Hero from './components/Hero';
import XiaoNuoya from './components/XiaoNuoya';
import HotNews from './components/HotNews';
import HoldingsImpact from './components/HoldingsImpact';
import Recommendations from './components/Recommendations';
import Feedback from './components/Feedback';

function MeshGradient() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0d0d12] to-[#0a0a0b]" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 400 400%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')] opacity-[0.03]" />
      
      <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-gradient-to-br from-amber-500/20 via-orange-500/15 to-transparent rounded-full blur-[80px] animate-pulse" />
      <div className="absolute top-[10%] right-[-5%] w-[40vw] h-[40vw] bg-gradient-to-bl from-purple-500/15 via-fuchsia-500/10 to-transparent rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '0.5s' }} />
      <div className="absolute bottom-[20%] left-[10%] w-[35vw] h-[35vw] bg-gradient-to-tr from-blue-500/12 via-cyan-500/8 to-transparent rounded-full blur-[90px] animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-[-10%] right-[20%] w-[45vw] h-[45vw] bg-gradient-to-tl from-green-500/10 via-emerald-500/8 to-transparent rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1.5s' }} />
      
      <div className="absolute top-[30%] left-[30%] w-[20vw] h-[20vw] bg-amber-500/8 rounded-full blur-[60px] animate-pulse" style={{ animationDelay: '0.3s' }} />
      <div className="absolute top-[60%] right-[30%] w-[15vw] h-[15vw] bg-purple-500/6 rounded-full blur-[50px] animate-pulse" style={{ animationDelay: '0.8s' }} />
      <div className="absolute bottom-[40%] left-[40%] w-[18vw] h-[18vw] bg-blue-500/6 rounded-full blur-[55px] animate-pulse" style={{ animationDelay: '1.2s' }} />
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <XiaoNuoya />
      <MeshGradient />
      <Hero />
      
      <main className="max-w-md mx-auto px-4 pb-8">
        <HotNews />
        <HoldingsImpact />
        <Recommendations />
        <Feedback />
      </main>
    </div>
  );
}

export default App;
