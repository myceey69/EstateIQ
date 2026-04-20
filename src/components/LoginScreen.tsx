import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore, Role } from '@/store/appStore';

export default function LoginScreen() {
  const [email, setEmail] = useState('demo@estateiq.com');
  const [password, setPassword] = useState('demo1234');
  const [error, setError] = useState('');
  const login = useAppStore(s => s.login);

  const handleLogin = () => {
    if (email === 'demo@estateiq.com' && password === 'demo1234') {
      login();
    } else {
      setError('Invalid credentials. Try demo@estateiq.com / demo1234');
    }
  };

  const quickLogin = (role: Role) => login(role);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background p-5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel rounded-3xl p-10 w-full max-w-md text-center shadow-2xl"
      >
        <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <rect x="8" y="12" width="32" height="28" rx="3" stroke="white" strokeWidth="2.5"/>
            <path d="M24 4L40 16H8L24 4Z" fill="white" opacity="0.9"/>
            <circle cx="20" cy="24" r="2" fill="white"/>
            <circle cx="28" cy="24" r="2" fill="white"/>
            <rect x="22" y="32" width="4" height="6" fill="white"/>
          </svg>
        </div>
        <h1 className="font-display text-3xl font-black mb-1">EstateIQ</h1>
        <p className="text-muted-foreground text-sm mb-8">AI-Powered Real Estate Assistant</p>

        <div className="text-left space-y-4">
          <div>
            <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              className="w-full px-4 py-3 rounded-lg border-2 border-border bg-muted/30 text-foreground focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              className="w-full px-4 py-3 rounded-lg border-2 border-border bg-muted/30 text-foreground focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all"
              placeholder="Password"
            />
          </div>
          {error && (
            <div className="bg-destructive/15 border-2 border-destructive rounded-lg p-3 text-destructive text-sm">
              {error}
            </div>
          )}
          <button
            onClick={handleLogin}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold text-base shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
          >
            Sign In <span>→</span>
          </button>
          <p className="text-center text-muted-foreground text-xs mt-2">Demo credentials are pre-filled — just click Sign In</p>
        </div>

        <div className="flex items-center gap-3 my-6 text-muted-foreground text-xs">
          <div className="flex-1 h-px bg-border" />
          <span>or jump in as</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <div className="flex gap-2">
          {([['buyer', '🏡 Buyer'], ['investor', '💼 Investor'], ['agent', '👤 Agent']] as [Role, string][]).map(([role, label]) => (
            <button
              key={role}
              onClick={() => quickLogin(role)}
              className="flex-1 py-3 rounded-lg border-2 border-border bg-muted/20 text-muted-foreground font-bold text-sm hover:border-primary hover:bg-primary/10 hover:text-foreground transition-all"
            >
              {label}
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
