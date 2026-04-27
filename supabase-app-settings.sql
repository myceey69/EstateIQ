create table if not exists public.app_settings (
  key text primary key,
  value text not null,
  updated_at timestamptz not null default now()
);

alter table public.app_settings enable row level security;

drop policy if exists "Allow public app settings read" on public.app_settings;
create policy "Allow public app settings read"
on public.app_settings
for select
to anon, authenticated
using (key in ('gemini_api_key'));

-- Run this once in the Supabase SQL editor, replacing the placeholder.
-- update/insert keeps this file from committing the real key.
insert into public.app_settings (key, value, updated_at)
values ('gemini_api_key', 'PASTE_GEMINI_API_KEY_HERE', now())
on conflict (key) do update
set value = excluded.value,
    updated_at = now();
