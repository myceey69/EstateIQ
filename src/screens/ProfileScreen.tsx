import React from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/appStore';
import { fmt } from '@/data/properties';

export default function ProfileScreen() {
  const { user, role, budget, mustHaves, watchlist, alerts, setScreen, logout, upgradePlan } = useAppStore();
  const unread = alerts.filter(a => !a.isRead).length;
  const initials = user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);

  return (
    <div className="p-6 overflow-y-auto h-full lg:pb-6 pb-20">
      <div className="grid lg:grid-cols-[1.35fr_1fr] gap-5 items-start">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-panel rounded-3xl p-6 shadow-2xl">
          <h3 className="font-display text-lg font-bold mb-4">Your Profile</h3>

          <div className="flex items-center gap-5 flex-wrap mb-4">
            <div className="w-[72px] h-[72px] rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-display text-2xl font-bold text-primary-foreground shadow-lg flex-shrink-0">
              {initials}
            </div>
            <div>
              <div className="font-display text-xl font-bold">{user.name}</div>
              <div className="text-sm text-muted-foreground">{user.email}</div>
              <span className="inline-block mt-2 px-3 py-1 rounded-full bg-secondary/15 border-2 border-secondary/35 text-xs font-bold text-secondary">
                {user.plan} Plan
              </span>
            </div>
          </div>

          <div className="h-px bg-border/50 my-4" />
          <h4 className="font-display text-sm font-bold mb-3">Your Preferences</h4>
          <div className="bg-muted/20 border-2 border-border/50 rounded-xl p-4 space-y-0">
            {[
              ['Role', role.charAt(0).toUpperCase() + role.slice(1)],
              ['Budget', fmt(budget)],
              ['Priorities', mustHaves.length > 0 ? mustHaves.join(', ') : 'None selected'],
              ['Watchlist', `${watchlist.length} properties`],
              ['Unread Alerts', String(unread)],
            ].map(([label, val], i) => (
              <div key={label} className={`flex justify-between py-3 ${i > 0 ? 'border-t border-border/30' : ''}`}>
                <span className="font-bold text-sm">{label}</span>
                <span className="text-sm text-muted-foreground">{val}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-3 flex-wrap mt-4">
            <button onClick={() => setScreen('onboarding')} className="px-4 py-2 rounded-lg border-2 border-border font-bold text-sm hover:bg-muted/20">✏️ Edit Preferences</button>
            <button onClick={logout} className="px-4 py-2 rounded-lg border-2 border-border font-bold text-sm hover:bg-muted/20">↪ Sign Out</button>
          </div>
        </motion.div>

        <div className="glass-panel rounded-3xl p-6 shadow-2xl lg:sticky lg:top-6">
          <h3 className="font-display text-lg font-bold mb-4">Upgrade to Pro</h3>
          <div className="text-center py-2">
            <div className="text-4xl mb-3">🚀</div>
            <div className="font-display text-xl font-bold mb-1">EstateIQ Pro</div>
            <div className="font-display text-4xl font-black text-secondary mb-5">$19<span className="text-base text-muted-foreground font-normal">/mo</span></div>
            <ul className="text-left space-y-2 mb-6 text-sm">
              {['Unlimited AI Insights', 'Real-time price alerts', 'Full market data access', 'PDF report exports', 'Tour scheduling', 'Lead management (agents)'].map(f => (
                <li key={f}>✅ {f}</li>
              ))}
            </ul>
            <button onClick={upgradePlan} className="w-full py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
              ⭐ Upgrade Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
