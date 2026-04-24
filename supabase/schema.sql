-- FiguSwap — Supabase Schema
-- Ejecutar en el SQL Editor de tu proyecto Supabase

-- Profiles (extiende auth.users)
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  username text unique not null,
  display_name text,
  avatar_url text,
  is_public boolean default true,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Profiles are viewable by everyone if public"
  on profiles for select using (is_public = true or auth.uid() = id);

create policy "Users can update own profile"
  on profiles for update using (auth.uid() = id);

create policy "Users can insert own profile"
  on profiles for insert with check (auth.uid() = id);

-- Sticker states (synced from local)
create table public.user_stickers (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  sticker_id text not null,
  status text check (status in ('none', 'have', 'repeated')) default 'none',
  repeated_count integer default 0,
  updated_at timestamptz default now(),
  unique(user_id, sticker_id)
);

alter table public.user_stickers enable row level security;

create policy "Users can manage own stickers"
  on user_stickers for all using (auth.uid() = user_id);

create policy "Public stickers are viewable if profile is public"
  on user_stickers for select using (
    exists (
      select 1 from profiles
      where profiles.id = user_stickers.user_id
      and profiles.is_public = true
    )
  );

-- Daily progress (for charts)
create table public.daily_progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  date date not null,
  owned_count integer default 0,
  unique(user_id, date)
);

alter table public.daily_progress enable row level security;

create policy "Users can manage own daily progress"
  on daily_progress for all using (auth.uid() = user_id);

-- Achievements
create table public.user_achievements (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  achievement_id text not null,
  unlocked_at timestamptz default now(),
  unique(user_id, achievement_id)
);

alter table public.user_achievements enable row level security;

create policy "Users can manage own achievements"
  on user_achievements for all using (auth.uid() = user_id);

-- Function to get user by username (for exchange feature)
create or replace function get_user_repeated(p_username text)
returns table(sticker_id text) as $$
  select us.sticker_id
  from user_stickers us
  join profiles p on p.id = us.user_id
  where p.username = p_username
    and us.status = 'repeated'
    and p.is_public = true;
$$ language sql security definer;
