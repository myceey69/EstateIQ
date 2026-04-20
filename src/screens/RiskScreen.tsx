import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/appStore';
import { PROPERTIES, fmt } from '@/data/properties';

export default function RiskScreen() {
  const { selectedId, setScreen, role } = useAppStore();
  const p = selectedId ? PROPERTIES.find(x => x.id === selectedId) : null;

  const [rent, setRent] = useState(p?.monthlyRent || 3500);
  const [expenses, setExpenses] = useState(8000);

  const price = p?.price || 879000;
  const noi = (rent - expenses / 12) * 12;
  const capRate = price > 0 ? ((noi / price) * 100).toFixed(2) : '0';
  const grossYield = price > 0 ? ((rent * 12 / price) * 100).toFixed(1) : '0';

  return (
    <div className="p-6 overflow-y-auto h-full lg:pb-6 pb-20">
      <div className="grid lg:grid-cols-[1.35fr_1fr] gap-5 items-start">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-panel rounded-3xl p-6 shadow-2xl">
          <h3 className="font-display text-lg font-bold mb-2">Risk & Return Analysis</h3>
          <p className="text-sm text-muted-foreground mb-4">Understand risk factors and potential returns.</p>

          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="bg-muted/20 border-2 border-border/50 rounded-xl p-4 text-center">
              <div className="text-[10px] text-muted-foreground font-bold uppercase mb-2">Overall Risk</div>
              <div className={`font-display text-xl font-bold ${p?.risk === 'Low' ? 'text-success' : p?.risk === 'High' ? 'text-destructive' : 'text-warning'}`}>{p?.risk || '—'}</div>
            </div>
            <div className="bg-muted/20 border-2 border-border/50 rounded-xl p-4 text-center">
              <div className="text-[10px] text-muted-foreground font-bold uppercase mb-2">Potential ROI</div>
              <div className="font-display text-xl font-bold">{p?.roi || '—'}</div>
            </div>
            <div className="bg-muted/20 border-2 border-border/50 rounded-xl p-4 text-center">
              <div className="text-[10px] text-muted-foreground font-bold uppercase mb-2">Recommendation</div>
              <div className="font-display text-xl font-bold">{p ? (p.risk === 'Low' ? 'Buy ✓' : 'Evaluate') : '—'}</div>
            </div>
          </div>

          {p && (
            <div className="text-sm text-muted-foreground leading-relaxed mb-4">
              <p>
                Risk score <strong className={p.risk === 'Low' ? 'text-success' : 'text-warning'}>{p.riskScore}/100</strong> — {p.risk === 'Low' ? 'Low exposure. Stable rental demand.' : 'Some volatility possible. Strong fundamentals offset this.'}
              </p>
              <p className="mt-2">Highlights: {p.highlights.map(h => <em key={h}>{h}</em>).reduce<React.ReactNode[]>((acc, el, i) => i === 0 ? [el] : [...acc, ' · ', el], [])}</p>
            </div>
          )}

          <div className="h-px bg-border/50 mb-4" />

          {/* ROI Calculator */}
          <div className="bg-muted/20 border-2 border-border/50 rounded-xl p-5">
            <h4 className="font-display text-base font-bold mb-1">📐 Quick ROI Calculator</h4>
            <p className="text-xs text-muted-foreground mb-4">Estimate returns for the selected property.</p>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="text-xs font-bold text-muted-foreground uppercase">Monthly Rent ($)</label>
                <input type="number" value={rent} onChange={e => setRent(Number(e.target.value))} min={500} max={30000} step={100}
                  className="w-full mt-2 p-3 rounded-xl border-2 border-border bg-muted/30 font-display text-lg font-bold focus:border-secondary focus:outline-none transition-all" />
              </div>
              <div>
                <label className="text-xs font-bold text-muted-foreground uppercase">Annual Expenses ($)</label>
                <input type="number" value={expenses} onChange={e => setExpenses(Number(e.target.value))} min={0} max={200000} step={500}
                  className="w-full mt-2 p-3 rounded-xl border-2 border-border bg-muted/30 font-display text-lg font-bold focus:border-secondary focus:outline-none transition-all" />
              </div>
            </div>
            <div className="p-3 rounded-xl bg-success/10 border-2 border-success/30 text-sm font-semibold leading-relaxed">
              💡 <strong>Annual NOI:</strong> {fmt(Math.round(noi))} | <strong>Cap Rate:</strong> {capRate}% | <strong>Gross Yield:</strong> {grossYield}%
            </div>
          </div>

          <div className="flex gap-3 flex-wrap mt-4">
            <button onClick={() => setScreen('trends')} className="px-4 py-2 rounded-lg border-2 border-border font-bold text-sm hover:bg-muted/20">← Back</button>
            <button onClick={() => setScreen('watchlist')} className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold text-sm shadow-md">Watchlist →</button>
          </div>
        </motion.div>

        {/* Risk breakdown */}
        <div className="glass-panel rounded-3xl p-6 shadow-2xl lg:sticky lg:top-6">
          <h3 className="font-display text-lg font-bold mb-4">Risk Breakdown</h3>
          <div className="space-y-2.5">
            {[...PROPERTIES].sort((a, b) => a.riskScore - b.riskScore).map(q => (
              <div key={q.id} className="flex items-center gap-3">
                <span className="w-24 text-xs font-bold text-muted-foreground truncate">{q.name.split(' ').slice(0, 2).join(' ')}</span>
                <div className="flex-1 h-2.5 rounded-full bg-muted/30 overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{
                    width: `${q.riskScore}%`,
                    background: q.risk === 'Low' ? 'hsl(160,84%,39%)' : q.risk === 'High' ? 'hsl(0,84%,60%)' : 'hsl(38,92%,50%)',
                  }} />
                </div>
                <span className="w-6 text-xs font-bold text-right" style={{ color: q.risk === 'Low' ? 'hsl(160,84%,39%)' : q.risk === 'High' ? 'hsl(0,84%,60%)' : 'hsl(38,92%,50%)' }}>
                  {q.riskScore}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
