import React from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/appStore';
import { PROPERTIES, fmt } from '@/data/properties';

export default function ReportScreen() {
  const { selectedId, role, mustHaves, setScreen } = useAppStore();
  const p = selectedId ? PROPERTIES.find(x => x.id === selectedId) : PROPERTIES[0];
  if (!p) return null;

  const narratives: Record<string, string> = {
    buyer: `${p.name} sits ${p.price < p.fairLow ? 'below' : 'within'} the AI fair range of ${fmt(p.fairLow)}–${fmt(p.fairHigh)}. With a ${p.risk.toLowerCase()} risk profile and ${p.appreciation} annual appreciation, this is a ${p.score >= 85 ? 'strong' : 'solid'} opportunity for buyers prioritising ${mustHaves.length > 0 ? mustHaves.slice(0, 2).join(' and ') : 'value and stability'}.`,
    investor: `With a ${p.capRate}% cap rate and ${p.appreciation} YoY appreciation, ${p.name} projects a ${p.roi} total annual return. Risk score of ${p.riskScore}/100 places this in the ${p.risk.toLowerCase()}-risk tier.`,
    agent: `${p.name} is priced at ${p.priceLabel} vs fair range ${fmt(p.fairLow)}–${fmt(p.fairHigh)}. Signal: ${p.signal}. At ${p.appreciation} YoY appreciation, strong narrative for motivated buyers.`,
  };

  const recs: Record<string, string[]> = {
    buyer: [`Offer at ${fmt(Math.round(p.price * 0.97 / 1000) * 1000)}`, 'Schedule home inspection within 7 days', `School district rated ${p.scores.schools}/10`, `Walk score ${p.scores.walkability}/10`],
    investor: [`Cap rate ${p.capRate}% outperforms area avg`, `NOI projection: ${fmt(Math.round((p.monthlyRent - 1000) * 12))}/yr`, `10-year model yields ${fmt(Math.round(p.price * Math.pow(1 + parseFloat(p.appreciation) / 100, 10)))}`, '20% down optimises leverage'],
    agent: ['14 avg days on market', `Priced ${p.price < (p.fairLow + p.fairHigh) / 2 ? 'below' : 'at'} median comps`, '12 active searches in this zip', `Suggested list price: ${fmt(Math.round(p.price * 1.06 / 1000) * 1000)}`],
  };

  return (
    <div className="p-6 overflow-y-auto h-full lg:pb-6 pb-20">
      <div className="grid lg:grid-cols-[1.35fr_1fr] gap-5 items-start">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-panel rounded-3xl p-6 shadow-2xl">
          <h3 className="font-display text-lg font-bold mb-2">Property Summary Report</h3>
          <p className="text-sm text-muted-foreground mb-4">Switch your role in the sidebar to see different views.</p>

          <div className="border-2 border-border/50 rounded-xl p-5">
            <div className="flex justify-between items-start gap-4 flex-wrap mb-4">
              <div>
                <h4 className="font-display text-xl font-bold">{p.name}</h4>
                <p className="text-sm text-muted-foreground">{p.address} · {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
              </div>
              <span className="px-4 py-2 rounded-full bg-gradient-to-r from-primary to-secondary text-xs font-bold shadow-md whitespace-nowrap text-primary-foreground">
                {role.charAt(0).toUpperCase() + role.slice(1)} Brief
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              {[
                { label: 'Listing Price', val: p.priceLabel },
                { label: 'AI Fair Range', val: `${fmt(p.fairLow)}–${fmt(p.fairHigh)}` },
                { label: 'Signal', val: p.signal },
                { label: 'Risk', val: p.risk },
              ].map(k => (
                <div key={k.label} className="bg-muted/20 border-2 border-border/50 rounded-xl p-3">
                  <div className="text-[10px] text-muted-foreground font-bold uppercase mb-1">{k.label}</div>
                  <div className="font-display text-base font-bold">{k.val}</div>
                </div>
              ))}
            </div>

            <div className="h-px bg-border/50 my-4" />
            <h5 className="font-display text-sm font-bold mb-2">Summary</h5>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">{narratives[role]}</p>

            <div className="h-px bg-border/50 my-4" />
            <h5 className="font-display text-sm font-bold mb-2">Recommended Next Steps</h5>
            <ol className="pl-5 text-sm text-muted-foreground list-decimal space-y-1.5 leading-relaxed">
              {(recs[role] || []).map((r, i) => <li key={i}>{r}</li>)}
            </ol>
          </div>

          <div className="flex gap-3 flex-wrap mt-4">
            <button onClick={() => setScreen('risk')} className="px-4 py-2 rounded-lg border-2 border-border font-bold text-sm hover:bg-muted/20">← Back</button>
            <button onClick={() => setScreen('dashboard')} className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold text-sm shadow-md">Dashboard →</button>
          </div>
        </motion.div>

        <div className="glass-panel rounded-3xl p-6 shadow-2xl lg:sticky lg:top-6">
          <h3 className="font-display text-lg font-bold mb-4">Share & Export</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">Export this report to share with family, a partner, or your real estate agent.</p>
          <p className="text-sm text-muted-foreground mt-3">💡 Switch role for a tailored narrative.</p>
        </div>
      </div>
    </div>
  );
}
