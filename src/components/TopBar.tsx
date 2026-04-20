import React from 'react';
import { useAppStore } from '@/store/appStore';
import { GUIDE_STEPS } from '@/data/properties';
import { Bell, Sparkles, Star, FileOutput, LayoutDashboard, Layers, User } from 'lucide-react';

const SECONDARY_NAV_ITEMS = [
  { screen: 'watchlist', icon: Star, label: 'Watchlist' },
  { screen: 'report', icon: FileOutput, label: 'Report' },
  { screen: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { screen: 'architecture', icon: Layers, label: 'Architecture' },
  { screen: 'profile', icon: User, label: 'Profile' },
];

const SCREEN_TITLES: Record<string, { t: string; s: string }> = {
  home: { t: 'EstateIQ', s: 'AI-powered property intelligence' },
  onboarding: { t: 'Get Started', s: 'Personalise your search profile' },
  search: { t: 'Property Search', s: 'Browse & filter opportunities' },
  details: { t: 'Property Details', s: '' },
  trends: { t: 'Market Trends', s: 'Price appreciation & inventory analysis' },
  risk: { t: 'Risk & ROI', s: 'Compare risk profiles & calculate returns' },
  watchlist: { t: 'Watchlist', s: 'Saved properties & intelligent alerts' },
  report: { t: 'AI Report', s: 'Comprehensive investment analysis' },
  dashboard: { t: 'Dashboard', s: 'Portfolio overview & market KPIs' },
  architecture: { t: 'Architecture', s: 'Client, services, data stores, and integrations' },
  profile: { t: 'My Profile', s: 'Account settings & subscription' },
};

const NEXT_FLOW_SCREEN: Record<string, string> = {
  home: 'onboarding',
  onboarding: 'search',
  search: 'details',
  details: 'trends',
  trends: 'risk',
  risk: 'watchlist',
  watchlist: 'report',
  report: 'dashboard',
  dashboard: 'search',
  architecture: 'search',
  profile: 'search',
};

export default function TopBar() {
  const { activeScreen, guided, alerts, setScreen, setGuided } = useAppStore();
  const unread = alerts.filter(a => !a.isRead).length;
  const titles = SCREEN_TITLES[activeScreen] || SCREEN_TITLES.home;
  const handleAiInsight = () => {
    setGuided(true);
    setScreen(NEXT_FLOW_SCREEN[activeScreen] || 'onboarding');
  };

  return (
    <div>
      <header className="px-6 py-4 border-b-2 border-border bg-card/80 backdrop-blur-xl flex justify-between items-center gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-xl font-bold">{titles.t}</h1>
          <p className="text-sm text-muted-foreground">{titles.s}</p>
        </div>
        <div className="flex gap-2 items-center">
          <button
            onClick={handleAiInsight}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-1.5"
          >
            <Sparkles size={16} /> AI Insight
          </button>
          <div className="relative">
            <button
              onClick={() => setScreen('watchlist')}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/20 transition-all"
              title="Alerts"
            >
              <Bell size={20} />
            </button>
            {unread > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-destructive text-destructive-foreground text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {unread > 9 ? '9+' : unread}
              </span>
            )}
          </div>
        </div>
      </header>

      <div className="px-6 py-2 border-b-2 border-border bg-card/70 backdrop-blur-xl flex items-center gap-2 overflow-x-auto">
        <span className="text-[10px] uppercase tracking-wide text-muted-foreground font-bold whitespace-nowrap">More</span>
        {SECONDARY_NAV_ITEMS.map(({ screen, icon: Icon, label }) => (
          <button
            key={screen}
            onClick={() => setScreen(screen)}
            className={`px-3 py-1.5 rounded-lg border text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all
              ${activeScreen === screen
                ? 'border-secondary bg-secondary/15 text-foreground'
                : 'border-border text-muted-foreground hover:text-foreground hover:bg-muted/20'
              }`}
          >
            <Icon size={14} />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {guided && GUIDE_STEPS[activeScreen] && (
        <div className="px-6 py-3 border-b-2 border-secondary/10 bg-secondary/5 backdrop-blur-xl flex justify-between items-center gap-4 flex-wrap">
          <div className="flex items-center gap-3 flex-1">
            <span className="text-xl">💡</span>
            <div>
              <div className="font-bold text-sm">Suggested Next Step</div>
              <div className="text-xs text-muted-foreground">{GUIDE_STEPS[activeScreen]}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
