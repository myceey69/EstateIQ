import React from 'react';
import { useAppStore, Role } from '@/store/appStore';
import { ROLE_META } from '@/data/properties';
import { Home, FileText, Search, BarChart3, Shield, FileOutput, LogOut } from 'lucide-react';

const PRIMARY_NAV_ITEMS = [
  { screen: 'home', icon: Home, label: 'Welcome' },
  { screen: 'onboarding', icon: FileText, label: 'Get Started' },
  { screen: 'search', icon: Search, label: 'Find Properties' },
  { screen: 'details', icon: FileOutput, label: 'Property Details' },
  { screen: 'trends', icon: BarChart3, label: 'Market Trends' },
  { screen: 'risk', icon: Shield, label: 'Risk & ROI' },
];

const PROGRESS_LABELS = ['Set Role', 'Set Budget', 'Browse Market', 'Add Watchlist', 'View Report'];

export default function Sidebar() {
  const { role, setRole, activeScreen, setScreen, storyboard, setStoryboard, guided, setGuided, user, watchlist, mustHaves, budget, logout, selectedId } = useAppStore();

  const progressChecks = [
    true,
    budget !== 850000 || mustHaves.length > 0,
    selectedId !== null,
    watchlist.length > 0,
    activeScreen === 'report',
  ];
  const progressDone = progressChecks.filter(Boolean).length;
  const progressPct = Math.round((progressDone / progressChecks.length) * 100);
  const nextStep = PROGRESS_LABELS.find((_, i) => !progressChecks[i]);

  const initials = user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);

  return (
    <aside className="hidden lg:flex flex-col w-[340px] h-screen border-r-2 border-border bg-sidebar overflow-y-auto overflow-x-hidden p-5 gap-0 flex-shrink-0">
      {/* Brand */}
      <div className="flex items-center gap-3 mb-5 pb-4 border-b-2 border-border">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg flex-shrink-0">
          <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
            <rect x="8" y="12" width="32" height="28" rx="3" stroke="white" strokeWidth="2.5"/>
            <path d="M24 4L40 16H8L24 4Z" fill="white" opacity="0.9"/>
            <circle cx="20" cy="24" r="2" fill="white"/>
            <circle cx="28" cy="24" r="2" fill="white"/>
            <rect x="22" y="32" width="4" height="6" fill="white"/>
          </svg>
        </div>
        <div>
          <div className="font-display text-lg font-bold">EstateIQ</div>
          <div className="text-xs text-muted-foreground">Smart Real Estate</div>
        </div>
      </div>

      {/* User */}
      <div className="glass-panel rounded-lg p-3 flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-display font-bold text-sm text-primary-foreground flex-shrink-0">
          {initials}
        </div>
        <div>
          <div className="font-bold text-sm">{user.name}</div>
          <div className="text-xs text-muted-foreground">{user.plan} Plan</div>
        </div>
      </div>

      {/* Role selector */}
      <div className="glass-panel rounded-2xl p-4 mb-4 shadow-lg">
        <div className="font-display text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">I am a...</div>
        <div className="flex bg-muted/30 border-2 border-white/20 rounded-xl p-1 gap-1 mb-3">
          {(['buyer', 'investor', 'agent'] as Role[]).map(r => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`flex-1 py-2 px-1 rounded-lg text-xs font-bold transition-all flex flex-col items-center gap-1
                ${role === r
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
                }`}
            >
              <span className="text-lg">{r === 'buyer' ? '🏡' : r === 'investor' ? '💼' : '👤'}</span>
              <span className="capitalize">{r}</span>
            </button>
          ))}
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed h-8">{ROLE_META[role]}</p>

        <div className="h-px bg-border/50 my-3" />

        <div className="flex justify-between items-center">
          <div>
            <div className="text-sm font-bold">Story Mode</div>
            <div className="text-xs text-muted-foreground">Step explanations</div>
          </div>
          <button
            onClick={() => setStoryboard(!storyboard)}
            className={`w-12 h-7 rounded-full border-2 relative transition-all flex-shrink-0 ${storyboard ? 'bg-secondary/20 border-secondary/50' : 'bg-muted/30 border-border'}`}
          >
            <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full shadow transition-transform ${storyboard ? 'translate-x-5 bg-secondary' : 'translate-x-0 bg-foreground'}`} />
          </button>
        </div>

        <div className="h-px bg-border/50 my-3" />

        <div className="flex justify-between items-center">
          <div>
            <div className="text-sm font-bold">Guided Help</div>
            <div className="text-xs text-muted-foreground">Suggests next step</div>
          </div>
          <button
            onClick={() => setGuided(!guided)}
            className={`w-12 h-7 rounded-full border-2 relative transition-all flex-shrink-0 ${guided ? 'bg-secondary/20 border-secondary/50' : 'bg-muted/30 border-border'}`}
          >
            <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full shadow transition-transform ${guided ? 'translate-x-5 bg-secondary' : 'translate-x-0 bg-foreground'}`} />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 mb-4 flex-1">
        {PRIMARY_NAV_ITEMS.map(({ screen, icon: Icon, label }) => (
          <button
            key={screen}
            onClick={() => setScreen(screen)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border-2 text-left text-sm font-bold transition-all
              ${activeScreen === screen
                ? 'bg-muted/40 border-secondary text-foreground shadow-md'
                : 'border-transparent text-muted-foreground hover:bg-muted/20 hover:text-foreground hover:translate-x-0.5'
              }`}
            >
              <Icon size={18} className="flex-shrink-0" />
              <span className="flex-1">{label}</span>
            </button>
          ))}
        </nav>

      {/* Progress */}
      <div className="glass-panel rounded-2xl p-4 mb-2 shadow-lg">
        <div className="flex justify-between items-center mb-2">
          <div className="text-xs font-bold text-muted-foreground uppercase">Your Progress</div>
          <div className="text-lg font-bold text-secondary">{progressPct}%</div>
        </div>
        <div className="h-2.5 rounded-full bg-muted/30 border border-border overflow-hidden">
          <div className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-500" style={{ width: `${progressPct}%` }} />
        </div>
        <div className="text-xs text-muted-foreground mt-2">
          {nextStep ? `Next: ${nextStep}` : '🎉 All steps complete!'}
        </div>
      </div>

      <button
        onClick={logout}
        className="w-full mt-2 py-2.5 rounded-lg border-2 border-border bg-transparent text-muted-foreground font-bold text-sm hover:bg-muted/20 transition-all flex items-center justify-center gap-2"
      >
        <LogOut size={16} /> Sign Out
      </button>
    </aside>
  );
}
