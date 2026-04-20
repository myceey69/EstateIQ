import React from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/appStore';

const LAYERS = [
  { name: 'Client Layer', items: ['Web Application', 'Mobile App', 'UI Controller'] },
  { name: 'Application Backend', items: ['API Gateway', 'Search Service', 'Profile Service', 'Recommendation Engine', 'NLP Service', 'Chatbot & Query', 'Analytics Service'] },
  { name: 'Data Layer', items: ['User Profiles DB', 'Property Listings DB', 'Search History DB'] },
  { name: 'External Services', items: ['MLS / Property Feed', 'Maps & Geolocation', 'Market Data API', 'AI / LLM Provider'] },
];

const SERVICES = ['api-gateway', 'search-service', 'user-profile-service', 'recommendation-engine', 'nlp-service', 'chatbot-query-analysis', 'analytics-service'];

const EXTERNAL = ['MLS / Property Feed API', 'Maps & Geolocation API', 'Market Data API', 'AI / LLM Provider'];

export default function ArchitectureScreen() {
  const { setScreen } = useAppStore();

  return (
    <div className="p-6 overflow-y-auto h-full lg:pb-6 pb-20">
      <div className="grid lg:grid-cols-[1.35fr_1fr] gap-5 items-start">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-panel rounded-3xl p-6 shadow-2xl">
          <h3 className="font-display text-lg font-bold mb-2">System Architecture</h3>
          <p className="text-sm text-muted-foreground mb-4">Live view of the layered architecture: clients, services, data, and integrations.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            {LAYERS.map(l => (
              <div key={l.name} className="bg-muted/20 border-2 border-border/50 rounded-xl p-3">
                <div className="font-display text-sm font-bold mb-2">{l.name}</div>
                <div className="flex flex-wrap gap-1.5">
                  {l.items.map(item => (
                    <span key={item} className="px-2.5 py-1 rounded-full border border-border/50 bg-muted/20 text-[11px] text-muted-foreground">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="h-px bg-border/50 mb-4" />
          <h4 className="font-display text-sm font-bold mb-3">Service Health</h4>
          <div className="space-y-2">
            {SERVICES.map(name => (
              <div key={name} className="flex items-center justify-between p-3 rounded-xl bg-muted/20 border-2 border-border/50">
                <span className="text-xs font-bold">{name}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-success bg-success/15 text-success">
                  UP
                </span>
              </div>
            ))}
          </div>

          <div className="flex gap-3 flex-wrap mt-4">
            <button onClick={() => setScreen('dashboard')} className="px-4 py-2 rounded-lg border-2 border-border font-bold text-sm hover:bg-muted/20">← Back</button>
          </div>
        </motion.div>

        <div className="glass-panel rounded-3xl p-6 shadow-2xl lg:sticky lg:top-6">
          <h3 className="font-display text-lg font-bold mb-4">Gateway Diagnostics</h3>
          <div className="text-sm text-muted-foreground leading-relaxed space-y-2">
            <p><strong className="text-foreground">Gateway route map:</strong> Client → API Gateway → Domain Services → Data + External APIs</p>
            <p><strong className="text-foreground">Services online:</strong> {SERVICES.length}</p>
            <p><strong className="text-foreground">Analytics snapshot:</strong> 6 properties tracked</p>
          </div>

          <div className="h-px bg-border/50 my-4" />
          <h4 className="font-display text-sm font-bold mb-3">External Services Layer</h4>
          <div className="space-y-2">
            {EXTERNAL.map(name => (
              <div key={name} className="flex items-center justify-between p-3 rounded-xl bg-muted/20 border-2 border-border/50">
                <span className="text-xs font-bold">{name}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-warning bg-warning/15 text-warning">
                  STUB
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
