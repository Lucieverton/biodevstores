import { Zap } from 'lucide-react';

export const TopNotificationBar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-10 bg-gradient-to-r from-card via-muted to-card border-b border-border/50">
      <div className="container mx-auto h-full flex items-center justify-center gap-2 px-4">
        <Zap className="w-4 h-4 text-neon-yellow animate-pulse" />
        <span className="text-sm font-medium">
          <span className="text-neon-yellow">Agenda 85% preenchida</span>
          <span className="text-muted-foreground"> — Garanta sua vaga antes do fechamento!</span>
        </span>
      </div>
    </div>
  );
};
