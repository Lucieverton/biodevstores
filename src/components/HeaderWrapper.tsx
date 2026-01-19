import { CircuitBackground } from './CircuitBackground';
import { Navbar } from './Navbar';

export const HeaderWrapper = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Navbar com circuito interativo - agora no topo */}
      <div className="relative h-[var(--header-height)]">
        <div className="absolute inset-0 bg-gradient-to-r from-background via-card to-background">
          <CircuitBackground />
        </div>
        <div className="relative z-10 h-full">
          <Navbar />
        </div>
      </div>
    </div>
  );
};
