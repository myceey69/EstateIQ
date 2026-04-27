import React from 'react';
import { Bot, Send, User } from 'lucide-react';
import { PROPERTIES } from '@/data/properties';
import { useAppStore } from '@/store/appStore';
import { askGemini } from '@/services/gemini';

type Message = { role: 'assistant' | 'user'; text: string; error?: boolean };

export default function AiChatScreen() {
  const { liveProperties } = useAppStore();
  const [messages, setMessages] = React.useState<Message[]>([
    { role: 'assistant', text: 'Ask me about EstateIQ properties, ROI, valuation, neighborhood scores, or market strategy.' },
  ]);
  const [input, setInput] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const inventory = liveProperties.length ? liveProperties : PROPERTIES;

  const send = async () => {
    const question = input.trim();
    if (!question || loading) return;
    setMessages(prev => [...prev, { role: 'user', text: question }]);
    setInput('');
    setLoading(true);
    try {
      const answer = await askGemini(question, inventory);
      setMessages(prev => [...prev, { role: 'assistant', text: answer }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        text: error instanceof Error ? error.message : 'Gemini request failed.',
        error: true,
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 overflow-y-auto h-full lg:pb-6 pb-20">
      <div className="glass-panel rounded-3xl shadow-2xl h-full min-h-[650px] flex flex-col overflow-hidden">
        <div className="p-5 border-b-2 border-border flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground">
            <Bot size={22} />
          </div>
          <div>
            <h3 className="font-display text-lg font-bold">EstateIQ AI Chat</h3>
            <p className="text-xs text-muted-foreground">Powered by Gemini Flash Preview</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {messages.map((message, index) => (
            <div key={index} className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {message.role === 'assistant' && <div className="w-8 h-8 rounded-lg bg-secondary/20 text-secondary flex items-center justify-center flex-shrink-0"><Bot size={16} /></div>}
              <div className={`max-w-[82%] rounded-2xl border-2 p-3 text-sm leading-relaxed whitespace-pre-wrap ${
                message.error
                  ? 'bg-destructive/10 border-destructive text-foreground'
                  : message.role === 'user'
                    ? 'bg-secondary/15 border-secondary'
                    : 'bg-muted/20 border-border/50'
              }`}>
                {message.text}
              </div>
              {message.role === 'user' && <div className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center flex-shrink-0"><User size={16} /></div>}
            </div>
          ))}
          {loading && <div className="text-xs text-muted-foreground px-11">Thinking...</div>}
        </div>

        <div className="p-4 border-t-2 border-border bg-card/70 flex gap-2">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') void send(); }}
            placeholder="Ask EstateIQ..."
            className="flex-1 px-4 py-3 rounded-xl border-2 border-border bg-muted/30 focus:border-secondary focus:outline-none text-sm"
          />
          <button onClick={() => void send()} disabled={loading || !input.trim()} className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground flex items-center justify-center disabled:opacity-50">
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
