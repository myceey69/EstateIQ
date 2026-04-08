import React from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/appStore';
import { PROPERTIES, fmt } from '@/data/properties';

export default function DashboardScreen() {
  const { role, watchlist, alerts, setScreen } = useAppStore();
  const unread = alerts.filter(a => !a.isRead).length;
  const avgCap = (PROPERTIES.reduce((s, p) => s + p.capRate, 0) / PROPERTIES.length).toFixed(1);
  const avgScore = Math.round(PROPERTIES.reduce((s, p) => s + p.score, 0) / PROPERTIES.length);
  const lowRisk = PROPERTIES.filter(p => p.risk === 'Low').length;
  const wlProps = PROPERTIES.filter(p => watchlist.includes(p.id));

  const todayByRole: Record<string, React.ReactNode> = {
    buyer: <>📝 Complete onboarding for personalised picks.<br/>🔍 {PROPERTIES.length} properties in your filters.</>,
    investor: <>📊 Berryessa Duplex leads at <strong>5.5% cap rate</strong>.<br/>📈 Alum Rock shows <strong>+22%</strong> YoY growth.</>,
    agent: <>🎯 12 active buyer searches in 95125.<br/>⏱️ Avg days on market: <strong>14</strong>.</>,
  };

  const insightsByRole: Record<string, [string, string, string][]> = {
    buyer: [['🏠', 'Best Value', 'Willow Glen — 9% below market'], ['📍', 'Top Schools', 'Cambrian Park — 9/10'], ['⚡', 'Act Now', '3 competing offers']],
    investor: [['📈', 'Best Cap', 'Berryessa 5.5%'], ['💰', 'Best ROI', 'Alum Rock 9.1%'], ['🛡️', 'Safest', 'Cambrian Park — 22/100']],
    agent: [['🎯', 'Hot Leads', '12 active searches'], ['📊', 'Trend', '+14% avg YoY'], ['⏱️', 'DOM', '14 days avg']],
  };

  return (
    <div className="p-6 overflow-y-auto h-full lg:pb-6 pb-20">
      <div className="grid lg:grid-cols-[1.35fr_1fr] gap-5 items-start">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-panel rounded-3xl p-6 shadow-2xl">
          <h3 className="font-display text-lg font-bold mb-1">Your Dashboard</h3>
          <p className="text-sm text-muted-foreground mb-4">{role.charAt(0).toUpperCase() + role.slice(1)} hub — {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</p>

          <div className="grid grid-cols-3 gap-3 mb-5">
            {[
              { val: PROPERTIES.length, lbl: 'Tracked' },
              { val: avgScore, lbl: 'Avg Score' },
              { val: avgCap + '%', lbl: 'Avg Cap' },
              { val: watchlist.length, lbl: 'Watchlisted' },
              { val: lowRisk, lbl: 'Low Risk' },
              { val: unread, lbl: 'Unread' },
            ].map((s, i) => (
              <div key={i} className="text-center p-4 rounded-xl bg-muted/20 border-2 border-border/50">
                <div className="font-display text-2xl font-bold text-secondary">{s.val}</div>
                <div className="text-[10px] text-muted-foreground font-bold uppercase mt-1">{s.lbl}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="bg-muted/20 border-2 border-border/50 rounded-xl p-4">
              <h4 className="font-display text-sm font-bold mb-2">Today's Actions</h4>
              <div className="text-sm text-muted-foreground leading-relaxed">{todayByRole[role]}</div>
            </div>
            <div className="bg-muted/20 border-2 border-border/50 rounded-xl p-4">
              <h4 className="font-display text-sm font-bold mb-2">Key Insights</h4>
              <div className="space-y-2">
                {(insightsByRole[role] || []).map(([icon, title, val], i) => (
                  <div key={i} className="text-sm">
                    <span className="text-lg mr-1">{icon}</span> <strong>{title}:</strong> <span className="text-muted-foreground">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-3 flex-wrap">
            <button onClick={() => setScreen('search')} className="px-4 py-2 rounded-lg border-2 border-border font-bold text-sm hover:bg-muted/20">🔍 Explore</button>
          </div>
        </motion.div>

        <div className="glass-panel rounded-3xl p-6 shadow-2xl lg:sticky lg:top-6">
          <h3 className="font-display text-lg font-bold mb-4">Watchlist Summary</h3>
          {wlProps.length === 0 ? (
            <p className="text-sm text-muted-foreground">No saved properties yet.</p>
          ) : (
            <div className="space-y-0">
              {wlProps.map(p => (
                <div key={p.id} className="flex justify-between py-2 border-b border-border/30">
                  <span className="font-bold text-xs">{p.name}</span>
                  <span className="text-xs text-secondary">{p.priceLabel}</span>
                </div>
              ))}
              <button onClick={() => setScreen('watchlist')} className="w-full mt-3 py-2 rounded-lg bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold text-sm shadow-md">
                View Watchlist →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
