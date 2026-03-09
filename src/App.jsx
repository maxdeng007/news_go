import Header from './components/Header';
import XiaoNuoya from './components/XiaoNuoya';
import HotNews from './components/HotNews';
import HoldingsImpact from './components/HoldingsImpact';
import Recommendations from './components/Recommendations';
import Feedback from './components/Feedback';

function App() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <XiaoNuoya />
      <Header />
      
      <main className="max-w-md mx-auto px-4 pt-4 pb-8">
        <HotNews />
        <HoldingsImpact />
        <Recommendations />
        <Feedback />
      </main>
    </div>
  );
}

export default App;
