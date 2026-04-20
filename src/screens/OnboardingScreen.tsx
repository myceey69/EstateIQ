import React from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/appStore';
import { fmt } from '@/data/properties';

const PRIORITIES = [
  { id: 'Great Schools', icon: '🎓', label: 'Great Schools' },
  { id: 'Commute', icon: '🚗', label: 'Short Commute' },
  { id: 'Safety', icon: '🔒', label: 'Safe Area' },
  { id: 'Amenities', icon: '🏪', label: 'Amenities' },
  { id: 'Stability', icon: '📊', label: 'Stable Market' },
  { id: 'High ROI', icon: '📈', label: 'High ROI' },
];

export default function OnboardingScreen() {
  const { role, budget, setBudget, mustHaves, toggleMustHave, wizStep, setWizStep, setScreen } = useAppStore();

  return (
    <div className="p-6 overflow-y-auto h-full lg:pb-6 pb-20">
      <div className="grid lg:grid-cols-[1.35fr_1fr] gap-5 items-start">
        <motion.div key={wizStep} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-panel rounded-3xl p-6 shadow-2xl">
          <h3 className="font-display text-lg font-bold mb-2">Personalize Your Experience</h3>
          <p className="text-sm text-muted-foreground mb-6">Answer 3 quick questions so we can rank properties for you.</p>

          {/* Steps */}
          <div className="flex items-center gap-3 mb-8">
            {[1, 2, 3].map((n, i) => (
              <React.Fragment key={n}>
                <button
                  onClick={() => setWizStep(n)}
                  className={`w-11 h-11 rounded-full flex items-center justify-center font-display text-lg font-bold border-2 transition-all
                    ${wizStep === n
                      ? 'bg-gradient-to-br from-primary to-secondary text-primary-foreground border-secondary shadow-lg'
                      : 'bg-muted/30 text-muted-foreground border-border'
                    }`}
                >
                  {n}
                </button>
                {i < 2 && <div className="flex-1 h-0.5 bg-border/50 rounded-full" />}
              </React.Fragment>
            ))}
          </div>

          {wizStep === 1 && (
            <div className="animate-fade-up">
              <h4 className="font-display text-xl font-bold mb-2">Step 1: Your Budget</h4>
              <p className="text-sm text-muted-foreground mb-6">Drag to set your maximum price.</p>
              <div className="mb-6">
                <label className="block text-xs font-bold text-muted-foreground uppercase mb-3">Maximum Budget</label>
                <input
                  type="range"
                  min={500000} max={2000000} step={50000}
                  value={budget}
                  onChange={e => setBudget(Number(e.target.value))}
                  className="w-full mb-4"
                />
                <div className="text-center p-4 rounded-xl bg-secondary/10 border-2 border-secondary/30 font-display text-3xl font-bold text-secondary">
                  {fmt(budget)}
                </div>
              </div>
              <button onClick={() => setWizStep(2)} className="px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-2">
                Next: Priorities <span>→</span>
              </button>
            </div>
          )}

          {wizStep === 2 && (
            <div className="animate-fade-up">
              <h4 className="font-display text-xl font-bold mb-2">Step 2: Your Priorities</h4>
              <p className="text-sm text-muted-foreground mb-6">Select everything that matters most.</p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {PRIORITIES.map(p => (
                  <button
                    key={p.id}
                    onClick={() => toggleMustHave(p.id)}
                    className={`p-5 rounded-xl border-2 flex flex-col items-center gap-2 transition-all
                      ${mustHaves.includes(p.id)
                        ? 'bg-secondary/20 border-secondary shadow-md'
                        : 'bg-muted/20 border-border/50 hover:border-secondary hover:-translate-y-0.5'
                      }`}
                  >
                    <span className="text-3xl">{p.icon}</span>
                    <span className="font-bold text-sm">{p.label}</span>
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={() => setWizStep(1)} className="px-5 py-3 rounded-lg border-2 border-border font-bold hover:bg-muted/20 transition-all">← Back</button>
                <button onClick={() => setWizStep(3)} className="px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold shadow-lg transition-all flex items-center gap-2">
                  Next: Review →
                </button>
              </div>
            </div>
          )}

          {wizStep === 3 && (
            <div className="animate-fade-up">
              <h4 className="font-display text-xl font-bold mb-2">Step 3: Confirm Your Profile</h4>
              <p className="text-sm text-muted-foreground mb-6">Here's what we know about you.</p>
              <div className="border-2 border-border/50 bg-muted/20 rounded-xl p-4 mb-6 space-y-0">
                {[
                  ['Role', role.charAt(0).toUpperCase() + role.slice(1)],
                  ['Budget', fmt(budget)],
                  ['Priorities', mustHaves.length > 0 ? mustHaves.join(', ') : 'None selected'],
                ].map(([label, val], i) => (
                  <div key={label} className={`flex justify-between py-3 ${i > 0 ? 'border-t border-border/30' : ''}`}>
                    <span className="font-bold text-sm">{label}</span>
                    <span className="text-sm text-muted-foreground text-right">{val}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={() => setWizStep(2)} className="px-5 py-3 rounded-lg border-2 border-border font-bold hover:bg-muted/20 transition-all">← Back</button>
              <button onClick={() => setScreen('search')} className="px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold shadow-lg transition-all flex items-center gap-2">
                ✓ Start Searching
              </button>
              </div>
            </div>
          )}
        </motion.div>

        <div className="glass-panel rounded-3xl p-6 shadow-2xl lg:sticky lg:top-6">
          <h3 className="font-display text-lg font-bold mb-4">Why We Ask</h3>
          <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
            <p><strong className="text-foreground">Budget</strong> filters and ranks listings so you see the best matches first.</p>
            <p><strong className="text-foreground">Priorities</strong> shape the AI score — e.g. "Safe Area" boosts properties with high safety ratings.</p>
            <p><strong className="text-foreground">Role</strong> changes what insights appear — buyer, investor, and agent views are all different.</p>
            <p>You can update these anytime from your Profile.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
