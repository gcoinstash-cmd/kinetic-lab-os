-- KINETIC LAB — Supabase Production Schema (PostgreSQL)
-- Ghost Factory™ Verified Architecture with Row-Level Security (RLS)
-- High-Performance Biomechanics & Athletic Testing OS

create table if not exists public.athlete_profiles (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text unique not null,
  phone text,
  discipline text check (discipline in ('sprint', 'football', 'soccer', 'olympic')) default 'sprint',
  team_organization text not null,
  event_position text not null,
  top_speed_mph numeric(4, 2),
  ten_yard_split text,
  reactive_strength_index numeric(4, 2),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.biomechanical_assessments (
  id uuid primary key default gen_random_uuid(),
  ticket_id text unique not null,
  athlete_id uuid references public.athlete_profiles(id) on delete set null,
  protocol_title text not null,
  protocol_category text check (protocol_category in ('biomechanics', 'velocity', 'force_plate', 'recovery')) default 'force_plate',
  assessment_date date not null,
  time_slot text not null,
  status text check (status in ('inspection', 'parts_ordered', 'in_progress', 'quality_check', 'ready')) default 'inspection',
  fee numeric(10, 2) not null,
  asymmetry_index_pct numeric(4, 1),
  lead_biomechanist text not null,
  testing_chamber text not null,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.force_plate_runs (
  id uuid primary key default gen_random_uuid(),
  assessment_id uuid references public.biomechanical_assessments(id) on delete cascade,
  trial_number integer not null,
  peak_grf_newtons numeric(6, 1) not null,
  ground_contact_time_ms integer not null,
  eccentric_impulse_ns numeric(6, 2) not null,
  limb_asymmetry_pct numeric(4, 1) not null,
  is_personal_record boolean default false,
  timestamp timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.lab_billing_retainers (
  id uuid primary key default gen_random_uuid(),
  organization_name text not null,
  tier text check (tier in ('Solo Athlete', 'Combine Cohort', 'Pro Squad Retainer')) default 'Solo Athlete',
  contract_valuation numeric(12, 2) not null,
  status text check (status in ('Draft', 'Escrow Funded', 'Active Cycle', 'Settled')) default 'Active Cycle',
  contract_end date,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.athlete_profiles enable row level security;
alter table public.biomechanical_assessments enable row level security;
alter table public.force_plate_runs enable row level security;
alter table public.lab_billing_retainers enable row level security;

-- Policies (Public Read Access / Authenticated Write)
create policy "Allow public read access to athlete profiles" on public.athlete_profiles for select using (true);
create policy "Allow public read access to assessments" on public.biomechanical_assessments for select using (true);
create policy "Allow public read access to force plate data" on public.force_plate_runs for select using (true);
create policy "Allow public read access to retainers" on public.lab_billing_retainers for select using (true);
