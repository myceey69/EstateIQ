import React from 'react';
import { useAppStore } from '@/store/appStore';
import { Home, Search, LayoutDashboard, Layers, Bookmark, User } from 'lucide-react';

const ITEMS = [
  { screen: 'home', icon: Home, label: 'Home' },
  { screen: 'search', icon: Search, label: 'Search' },
  { screen: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { screen: 'architecture', icon: Layers, label: 'Arch' },
  { screen: 'watchlist', icon: Bookmark, label: 'Watchlist' },
  { screen: 'profile', icon: User, label: 'Profile' },
];

export default function BottomNav() {
  const { activeScreen, setScreen } = useAppStore();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t-2 border-border bg-card/95 backdrop-blur-xl flex h-16">
      {ITEMS.map(({ screen, icon: Icon, label }) => (
        <button
          key={screen}
          onClick={() => setScreen(screen)}
          className={`flex-1 flex flex-col items-center justify-center gap-0.5 text-[10px] font-bold transition-all
            ${activeScreen === screen ? 'text-secondary' : 'text-muted-foreground'}`}
        >
          <Icon size={20} />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}
