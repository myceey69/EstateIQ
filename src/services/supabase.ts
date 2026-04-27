const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://kljiikvwzmodsecodkid.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtsamlpa3Z3em1vZHNlY29ka2lkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyNzM3MDMsImV4cCI6MjA5MTg0OTcwM30.JOXtcaMmreY_LlycquoEZWqTlueqXIlHmGe9hON40VE';

const settingsCache = new Map<string, string>();

export async function getAppSetting(key: string) {
  if (settingsCache.has(key)) return settingsCache.get(key) || '';

  const url = `${SUPABASE_URL}/rest/v1/app_settings?key=eq.${encodeURIComponent(key)}&select=value&limit=1`;
  const response = await fetch(url, {
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      Accept: 'application/json',
    },
  });

  if (!response.ok) return '';
  const data = await response.json();
  const value = typeof data?.[0]?.value === 'string' ? data[0].value : '';
  if (value) settingsCache.set(key, value);
  return value;
}
