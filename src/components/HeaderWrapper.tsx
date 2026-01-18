import { CircuitBackground } from './CircuitBackground';
import { TopNotificationBar } from './TopNotificationBar';
import { Navbar } from './Navbar';

export const HeaderWrapper = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[calc(var(--notification-height)+var(--header-height))]">
      {/* Circuit Background Layer */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-card to-background">
        <CircuitBackground />
      </div>
      
      {/* Content Layer */}
      <div className="relative z-10">
        <TopNotificationBar />
        <Navbar />
      </div>
    </div>
  );
};
