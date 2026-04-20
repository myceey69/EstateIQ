import React from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/appStore';
import { PROPERTIES, ROLE_META } from '@/data/properties';

export default function HomeScreen() {
  const { role, setScreen } = useAppStore();

  const leads: Record<string, string> = {
    buyer: 'We help you understand fair prices, find neighbourhoods that fit your lifestyle, and know exactly what to do next — without spreadsheets.',
    investor: 'We surface the best cap rates, appreciation trends, and ROI projections — so you invest with confidence, not guesswork.',
    agent: 'We give you live market data, comparable sales, and lead scoring so you can advise clients with precision.',
  };

  return (
    <div className="p-6 overflow-y-auto h-full lg:pb-6 pb-20">
      <div className="grid lg:grid-cols-[1.35fr_1fr] gap-5 items-start">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-panel rounded-3xl p-8 shadow-2xl">
          <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-primary to-secondary font-display text-xs font-bold mb-4 shadow-md">
            EstateIQ
          </span>
          <h2 className="font-display text-3xl font-bold leading-tight mb-4">Make Smarter Real Estate Decisions</h2>
          <p className="text-base text-muted-foreground leading-relaxed mb-8">{leads[role]}</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              { icon: '👤', val: 'Personalized', lbl: 'Based on your role & budget' },
              { icon: '✨', val: 'AI-Powered', lbl: 'Smart insights & valuations' },
              { icon: '⚖️', val: 'Compare & Decide', lbl: 'Watchlist, alerts & reports' },
            ].map((s, i) => (
              <div key={i} className="text-center p-5 rounded-xl bg-muted/20 border-2 border-border/50">
                <div className="text-3xl mb-2">{s.icon}</div>
                <div className="font-display text-sm font-bold mb-1">{s.val}</div>
                <div className="text-xs text-muted-foreground">{s.lbl}</div>
              </div>
            ))}
          </div>

          <div className="h-px bg-border/50 mb-6" />

          <div className="flex gap-3 flex-wrap">
            <button onClick={() => setScreen('onboarding')} className="px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-2">
              Get Started <span>→</span>
            </button>
            <button onClick={() => setScreen('search')} className="px-6 py-3 rounded-lg border-2 border-border bg-muted/10 font-bold hover:bg-muted/20 transition-all">
              Browse Properties
            </button>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-panel rounded-3xl p-6 shadow-2xl">
          <h3 className="font-display text-lg font-bold mb-5">How It Works</h3>
          <div className="space-y-3">
            {[
              { n: 1, t: 'Tell Us About You', d: 'Set your budget, priorities, and role' },
              { n: 2, t: 'Browse & Filter', d: 'AI-ranked listings, map pins, smart filters' },
              { n: 3, t: 'Analyze & Compare', d: 'Valuation, trends, risk, ROI in plain English' },
              { n: 4, t: 'Watchlist & Alerts', d: 'Save favorites, get price change alerts' },
            ].map(s => (
              <div key={s.n} className="flex gap-4 items-start p-4 rounded-xl bg-muted/20 border-2 border-border/50 hover:border-secondary transition-all hover:translate-x-0.5">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-display text-base font-bold shadow-md flex-shrink-0 text-primary-foreground">
                  {s.n}
                </div>
                <div>
                  <div className="font-display text-sm font-bold mb-1">{s.t}</div>
                  <div className="text-xs text-muted-foreground">{s.d}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
