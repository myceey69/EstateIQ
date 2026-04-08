import React from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/appStore';
import { PROPERTIES, fmt } from '@/data/properties';

export default function DetailsScreen() {
  const { selectedId, setScreen, role, watchlist, toggleWatchlist } = useAppStore();
  const p = selectedId ? PROPERTIES.find(x => x.id === selectedId) : null;
  const inWL = p ? watchlist.includes(p.id) : false;

  if (!p) {
    return (
      <div className="p-6 h-full flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">📋</div>
          <h3 className="font-display text-xl font-bold mb-2">No Property Selected</h3>
          <p className="text-muted-foreground mb-4">Browse the search screen to select a property.</p>
          <button onClick={() => setScreen('search')} className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold shadow-md">
            Go to Search
          </button>
        </div>
      </div>
    );
  }

  const explains: Record<string, string> = {
    buyer: `Is this a fair price? AI fair range is ${fmt(p.fairLow)}–${fmt(p.fairHigh)}. At ${p.priceLabel}, this is ${p.price < p.fairLow ? 'below' : p.price > p.fairHigh ? 'above' : 'within'} the expected range. Signal: ${p.signal}.`,
    investor: `Cap Rate: ${p.capRate}% — ${p.capRate >= 5 ? 'excellent for San Jose.' : 'moderate; strong for a prime market.'} Appreciation: ${p.appreciation} YoY. Total return = ~${p.roi}.`,
    agent: `Listing at ${p.priceLabel} vs fair range ${fmt(p.fairLow)}–${fmt(p.fairHigh)}. Market signal: ${p.appreciation} appreciation. ${parseFloat(p.appreciation) > 10 ? 'High buyer interest.' : 'Steady demand.'}`,
  };

  return (
    <div className="p-6 overflow-y-auto h-full lg:pb-6 pb-20">
      <div className="grid lg:grid-cols-[1.35fr_1fr] gap-5 items-start">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-panel rounded-3xl p-6 shadow-2xl">
          <div className="flex justify-between items-start gap-4 flex-wrap mb-4">
            <div>
              <h3 className="font-display text-xl font-bold">{p.name}</h3>
              <p className="text-sm text-muted-foreground">{p.address}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => toggleWatchlist(p.id, p.name)}
                className={`px-4 py-2 rounded-lg border-2 font-bold text-sm transition-all flex items-center gap-1.5
                  ${inWL ? 'bg-success/15 border-success text-success' : 'border-border hover:border-success'}`}
              >
                {inWL ? '🔔 Watching' : '⭐ Watchlist'}
              </button>
            </div>
          </div>

          <div className="h-px bg-border/50 mb-4" />

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            {[
              { label: 'Listing Price', val: p.priceLabel },
              { label: 'AI Fair Range', val: `${fmt(p.fairLow)}–${fmt(p.fairHigh)}`, cls: 'text-success' },
              { label: 'Signal', val: p.signal },
              { label: 'Cap Rate', val: `${p.capRate}%` },
            ].map(k => (
              <div key={k.label} className="bg-muted/20 border-2 border-border/50 rounded-xl p-4 text-center">
                <div className="text-[10px] text-muted-foreground font-bold uppercase mb-2">{k.label}</div>
                <div className={`font-display text-lg font-bold ${k.cls || ''}`}>{k.val}</div>
              </div>
            ))}
          </div>

          <div className="h-px bg-border/50 mb-4" />

          <h4 className="font-display text-sm font-bold mb-3">Neighborhood Scores</h4>
          <div className="space-y-2.5 mb-4">
            {Object.entries(p.scores).map(([k, v]) => (
              <div key={k} className="flex items-center gap-3">
                <span className="w-20 text-xs font-bold text-muted-foreground capitalize">{k}</span>
                <div className="flex-1 h-2.5 rounded-full bg-muted/30 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-500" style={{ width: `${v * 10}%` }} />
                </div>
                <span className="w-8 text-xs font-bold text-secondary text-right">{v}/10</span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 p-3 rounded-xl bg-success/10 border-2 border-success/30 mb-4">
            <span className="text-xs font-bold text-success">Recommended Next Step:</span>
            <span className="text-sm">{p.nextStep}</span>
          </div>

          <div className="flex gap-3 flex-wrap">
            <button onClick={() => setScreen('search')} className="px-4 py-2 rounded-lg border-2 border-border font-bold text-sm hover:bg-muted/20 transition-all">← Back</button>
            <button onClick={() => setScreen('trends')} className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold text-sm shadow-md">See Trends →</button>
          </div>
        </motion.div>

        <div className="glass-panel rounded-3xl p-6 shadow-2xl lg:sticky lg:top-6">
          <h3 className="font-display text-lg font-bold mb-4">What This Means</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{explains[role]}</p>
          <div className="h-px bg-border/50 my-4" />
          <div className="flex flex-wrap gap-2">
            {p.highlights.map(h => (
              <span key={h} className="px-3 py-1 rounded-full bg-secondary/10 border border-secondary/30 text-xs font-bold text-secondary">{h}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
