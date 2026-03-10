import Hero from './components/Hero';
import XiaoNuoya from './components/XiaoNuoya';
import HotNews from './components/HotNews';
import HoldingsImpact from './components/HoldingsImpact';
import Recommendations from './components/Recommendations';
import Feedback from './components/Feedback';

function MeshGradient() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none" style={{ 
      background: 'linear-gradient(135deg, #1a0a2e 0%, #0f0f1a 50%, #0a1a1a 100%)'
    }}>
      <div className="absolute top-10 left-10 w-72 h-72 bg-amber-600/40 rounded-full blur-[100px]" />
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-purple-600/35 rounded-full blur-[120px]" />
      <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-blue-600/30 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 w-56 h-56 bg-green-600/25 rounded-full blur-[80px]" />
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <XiaoNuoya />
      <MeshGradient />
      <Hero />
      
      <main className="max-w-md mx-auto px-4 pb-8 md:max-w-2xl md:px-6 lg:max-w-6xl lg:px-8">
        <div className="space-y-6 lg:flex lg:gap-8">
          <div className="flex-1 lg:w-2/3 lg:order-1 order-1">
            <HotNews />
          </div>
          
          <div className="lg:w-1/3 lg:sticky lg:top-8 lg:self-start space-y-6 lg:order-2 order-4">
            <HoldingsImpact />
            <Recommendations />
          </div>
          
          <div className="lg:w-2/3 lg:order-3 order-2">
            <Feedback />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
