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
      
      <main className="max-w-md mx-auto px-4 pb-8 md:max-w-2xl md:px-6 lg:max-w-4xl lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:grid-cols-3">
          <div className="md:col-span-2 lg:col-span-2">
            <HotNews />
          </div>
          <div className="md:col-span-2 lg:col-span-1">
            <HoldingsImpact />
          </div>
          <div className="md:col-span-1 lg:col-span-1">
            <Recommendations />
          </div>
          <div className="md:col-span-2 lg:col-span-2">
            <Feedback />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
