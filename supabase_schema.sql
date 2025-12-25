-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- USERS TABLE
create table public.users (
  id uuid default uuid_generate_v4() primary key,
  email text unique not null,
  password text not null, -- Hashed password
  name text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- CAREER PLANS TABLE
create table public.career_plans (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  title text not null,
  data jsonb not null, -- Stores the big plan object
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- CAREER PATHS TABLE (Global content)
create table public.career_paths (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  category text not null,
  description text,
  difficulty_level text check (difficulty_level in ('Beginner', 'Intermediate', 'Advanced')),
  required_skills text[], -- Array of strings
  tools text[],
  growth_score integer,
  avg_salary text,
  learning_duration_months integer,
  demand text check (demand in ('High', 'Medium', 'Low')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- SKILLS TABLE
create table public.skills (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  category text,
  level text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- LEARNING RESOURCES TABLE
create table public.learning_resources (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  type text check (type in ('Course', 'Video', 'Article', 'Project', 'Certification')),
  description text,
  skill_tags text[],
  difficulty_level text check (difficulty_level in ('Beginner', 'Intermediate', 'Advanced')),
  estimated_time text,
  provider text,
  url text,
  rating numeric,
  career_mapping text[], -- Array of career IDs
  status text check (status in ('Active', 'Archived')) default 'Active',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- STARTUP IDEAS TABLE
create table public.startup_ideas (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  problem_statement text,
  solution_summary text,
  target_users text,
  industry text,
  difficulty_level text check (difficulty_level in ('Beginner', 'Intermediate', 'Advanced')),
  required_skills text[],
  market_size_estimate text,
  revenue_model text[],
  validation_score integer,
  risk_level text check (risk_level in ('Low', 'Medium', 'High')),
  execution_steps text[],
  status text check (status in ('Idea', 'Validated', 'Building')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- OTPS TABLE
create table public.otps (
  email text primary key,
  otp text not null,
  expires_at timestamp with time zone not null
);

-- ROW LEVEL SECURITY JSON POLICIES (OPTIONAL - ENABLE IF USING SUPABASE AUTH LATER)
-- For now, we are using the Service Role or Anon key with our own server-side logic in db.ts, 
-- but enabling RLS is good practice.

alter table public.users enable row level security;
alter table public.career_plans enable row level security;

-- Allow public access for now (simulating current file behavior) 
-- WARNING: In production, you would lock this down to 'auth.uid() = id'
create policy "Allow all access" on public.users for all using (true);
create policy "Allow all access" on public.career_plans for all using (true);
create policy "Allow all access" on public.career_paths for all using (true);
create policy "Allow all access" on public.skills for all using (true);
create policy "Allow all access" on public.learning_resources for all using (true);
create policy "Allow all access" on public.startup_ideas for all using (true);
create policy "Allow all access" on public.otps for all using (true);
