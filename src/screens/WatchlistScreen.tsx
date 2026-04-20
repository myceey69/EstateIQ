import React from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/appStore';
import { PROPERTIES, fmt } from '@/data/properties';

export default function WatchlistScreen() {
  const { watchlist, alerts, toggleWatchlist, setSelectedId, setScreen, markAlertRead } = useAppStore();
  const props = PROPERTIES.filter(p => watchlist.includes(p.id));

  const alertIcon = (type: string) => type === 'priceChange' ? '💰' : type === 'newMatch' ? '🏠' : '📊';

  return (
    <div className="p-6 overflow-y-auto h-full lg:pb-6 pb-20">
      <div className="grid lg:grid-cols-[1.35fr_1fr] gap-5 items-start">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-panel rounded-3xl p-6 shadow-2xl">
          <h3 className="font-display text-lg font-bold mb-2">Your Watchlist</h3>
          <p className="text-sm text-muted-foreground mb-4">Save properties and receive price change & market shift alerts.</p>

          {props.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-5xl mb-4">🔔</div>
              <div className="font-display text-xl font-bold mb-2">Watchlist is Empty</div>
              <p className="text-muted-foreground text-sm mb-5">Add properties from Search or Details to get price alerts.</p>
              <button onClick={() => setScreen('search')} className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold shadow-md">
                Browse Properties →
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {props.map(p => {
                const pAlerts = alerts.filter(a => a.propertyId === p.id);
                return (
                  <div key={p.id} className="bg-muted/20 border-2 border-border/50 rounded-xl p-4">
                    <div className="flex justify-between items-start gap-3 flex-wrap mb-3">
                      <div>
                        <div className="font-display text-base font-bold">{p.name}</div>
                        <div className="text-xs text-muted-foreground mt-1">{p.priceLabel} · {p.signal} · {p.risk} Risk</div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => { setSelectedId(p.id); setScreen('details'); }} className="px-3 py-1.5 rounded-lg border-2 border-border text-xs font-bold hover:bg-muted/20 transition-all">
                          Details
                        </button>
                        <button onClick={() => toggleWatchlist(p.id, p.name)} className="px-3 py-1.5 rounded-lg border-2 border-destructive/40 text-xs font-bold text-destructive hover:bg-destructive/10 transition-all">
                          Remove
                        </button>
                      </div>
                    </div>
                    {pAlerts.length > 0 && (
                      <div className="space-y-2">
                        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Recent Alerts</div>
                        {pAlerts.slice(0, 3).map(a => (
                          <div key={a.id} onClick={() => markAlertRead(a.id)} className={`flex gap-3 items-start p-3 rounded-xl border-2 cursor-pointer transition-all
                            ${a.isRead ? 'border-border/50 bg-muted/10' : 'border-primary/30 bg-primary/5'}`}>
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-base flex-shrink-0 ${a.isRead ? 'bg-muted/20' : 'bg-primary/15'}`}>
                              {alertIcon(a.type)}
                            </div>
                            <div className="min-w-0">
                              <div className={`text-xs font-bold truncate ${a.isRead ? 'text-muted-foreground' : ''}`}>
                                {a.type === 'priceChange' ? 'Price Change' : a.type === 'newMatch' ? 'New Match' : 'Market Shift'}
                              </div>
                              <div className="text-[11px] text-muted-foreground leading-snug">{a.message}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    {pAlerts.length === 0 && <p className="text-xs text-muted-foreground">Watching — no alerts yet.</p>}
                  </div>
                );
              })}
            </div>
          )}

          <div className="flex gap-3 flex-wrap mt-4">
            <button onClick={() => setScreen('search')} className="px-4 py-2 rounded-lg border-2 border-border font-bold text-sm hover:bg-muted/20">🔍 Find More</button>
          </div>
        </motion.div>

        {/* Compare */}
        <div className="glass-panel rounded-3xl p-6 shadow-2xl lg:sticky lg:top-6">
          <h3 className="font-display text-lg font-bold mb-4">Side-by-Side Compare</h3>
          {props.length >= 2 ? (
            <div className="space-y-3">
              <div className="text-[10px] font-bold text-muted-foreground uppercase mb-2">Top 2 Comparison</div>
              {(['price', 'capRate', 'riskScore', 'score'] as const).map(k => {
                const labels: Record<string, string> = { price: 'Price', capRate: 'Cap Rate', riskScore: 'Risk', score: 'AI Score' };
                const fmtVal = (v: number) => k === 'price' ? fmt(v) : k === 'capRate' ? v + '%' : String(v);
                return (
                  <div key={k} className="flex items-center gap-3">
                    <span className="w-16 text-xs font-bold text-muted-foreground">{labels[k]}</span>
                    <span className="flex-1 text-xs font-bold text-secondary">{props[0].name.split(' ')[0]}: {fmtVal(props[0][k])}</span>
                    <span className="text-xs font-bold text-warning">{props[1].name.split(' ')[0]}: {fmtVal(props[1][k])}</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Save at least 2 properties to compare side-by-side.</p>
          )}

          <div className="h-px bg-border/50 my-4" />
          <h4 className="font-display text-sm font-bold mb-3">Recent Alerts</h4>
          {alerts.length === 0 ? (
            <p className="text-xs text-muted-foreground">No alerts yet.</p>
          ) : (
            <div className="space-y-2">
              {alerts.slice(0, 5).map(a => (
                <div key={a.id} onClick={() => markAlertRead(a.id)} className={`flex gap-3 items-start p-2.5 rounded-lg border cursor-pointer text-xs transition-all
                  ${a.isRead ? 'border-border/50' : 'border-primary/30 bg-primary/5'}`}>
                  <span>{alertIcon(a.type)}</span>
                  <div className="min-w-0">
                    <div className="font-bold truncate">{a.propertyTitle}</div>
                    <div className="text-muted-foreground">{a.message}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
