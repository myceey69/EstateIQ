import React from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/appStore';
import { PROPERTIES, fmt } from '@/data/properties';

export default function TrendsScreen() {
  const { selectedId, setScreen, role } = useAppStore();
  const p = selectedId ? PROPERTIES.find(x => x.id === selectedId) : null;

  const months = ['Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May','Jun'];
  const base = p ? Math.round(p.price / 1000 * 0.88) : 820;
  const rate = p ? (parseFloat(p.appreciation) / 100 / 12) : 0.012;
  const vals = months.map((_, i) => Math.round(base * Math.pow(1 + rate, i)));
  const W = 500, H = 160, pad = 30;
  const mn = Math.min(...vals) - 5, mx = Math.max(...vals) + 10;
  const xS = (W - pad * 2) / (vals.length - 1);
  const yS = (v: number) => H - pad - ((v - mn) / (mx - mn)) * (H - pad * 2);
  const pts = vals.map((v, i) => `${pad + i * xS},${yS(v)}`).join(' ');
  const area = `M ${pad},${H - pad} ` + vals.map((v, i) => `L ${pad + i * xS},${yS(v)}`).join(' ') + ` L ${pad + (vals.length - 1) * xS},${H - pad} Z`;

  const roleLines: Record<string, string> = {
    buyer: '🏠 Buyer View: Track price direction to time your offer.',
    investor: '📈 Investor View: Appreciation trend impacts your exit cap rate.',
    agent: '🤝 Agent View: Market timing signal for client advisory.',
  };

  const roleExpls: Record<string, string> = {
    buyer: p ? `${p.name} has appreciated ${p.appreciation} over 12 months. Waiting could cost ~${fmt(Math.round(p.price * parseFloat(p.appreciation) / 100 / 12))}/month.` : '',
    investor: p ? `With ${p.appreciation} appreciation and ${p.capRate}% cap rate, projected return is ${p.roi}. Doubles in ~${Math.ceil(72 / parseFloat(p.roi))} years.` : '',
    agent: p ? `Comparable sales rose ${p.appreciation} YoY. Confidence: ${p.conf}. Advise buyers to act within 2-3 weeks.` : '',
  };

  return (
    <div className="p-6 overflow-y-auto h-full lg:pb-6 pb-20">
      <div className="grid lg:grid-cols-[1.35fr_1fr] gap-5 items-start">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-panel rounded-3xl p-6 shadow-2xl">
          <h3 className="font-display text-lg font-bold mb-2">Price Trends & Forecast</h3>
          <p className="text-sm text-muted-foreground mb-4">Understand market timing and price direction.</p>

          <div className="p-3 rounded-xl bg-primary/10 border-2 border-primary/25 text-sm text-muted-foreground font-semibold mb-4">
            {roleLines[role]}
          </div>

          {/* SVG Chart */}
          <div className="w-full h-44 rounded-xl border-2 border-border/50 bg-muted/20 overflow-hidden mb-4">
            <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
              <defs>
                <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(239,84%,67%)" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="hsl(239,84%,67%)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={area} fill="url(#cg)" />
              <polyline points={pts} fill="none" stroke="hsl(239,84%,67%)" strokeWidth="2.5" strokeLinejoin="round" />
              {vals.map((v, i) => (
                <React.Fragment key={i}>
                  <circle cx={pad + i * xS} cy={yS(v)} r="3.5" fill="hsl(239,84%,67%)" stroke="white" strokeWidth="1.5" />
                  <text x={pad + i * xS} y={H - 4} textAnchor="middle" fill="rgba(196,202,217,0.55)" fontSize="9" fontFamily="Open Sans">{months[i]}</text>
                  <text x={pad + i * xS} y={yS(v) - 8} textAnchor="middle" fill="rgba(196,202,217,0.7)" fontSize="8" fontFamily="Open Sans">${v}K</text>
                </React.Fragment>
              ))}
            </svg>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4">
            {[
              { label: '12-mo Trend', val: p?.appreciation || '+13.7%', cls: 'text-success' },
              { label: 'Confidence', val: p?.conf || 'High' },
              { label: 'Inventory', val: 'Tight' },
            ].map(k => (
              <div key={k.label} className="bg-muted/20 border-2 border-border/50 rounded-xl p-3 text-center">
                <div className="text-[10px] text-muted-foreground font-bold uppercase mb-1">{k.label}</div>
                <div className={`font-display text-lg font-bold ${k.cls || ''}`}>{k.val}</div>
              </div>
            ))}
          </div>

          <div className="flex gap-3 flex-wrap">
            <button onClick={() => setScreen('details')} className="px-4 py-2 rounded-lg border-2 border-border font-bold text-sm hover:bg-muted/20">← Back</button>
            <button onClick={() => setScreen('risk')} className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold text-sm shadow-md">Check Risk →</button>
          </div>
        </motion.div>

        <div className="glass-panel rounded-3xl p-6 shadow-2xl lg:sticky lg:top-6">
          <h3 className="font-display text-lg font-bold mb-4">Trend Explanation</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {p ? roleExpls[role] : 'Select a property to see a trend explanation.'}
          </p>
        </div>
      </div>
    </div>
  );
}
