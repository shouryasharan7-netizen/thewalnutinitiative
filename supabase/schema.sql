-- =====================================================================
-- THE WALNUT INITIATIVE (TWI) — Supabase schema
-- Postgres + RLS best practices:
--   * every table has RLS enabled
--   * policies are written per-operation (select/insert/update/delete)
--   * auth.uid() is used to scope rows to the owning user
--   * public read is granted only where content is meant to be public
-- =====================================================================

-- ---------------------------------------------------------------------
-- Extensions
-- ---------------------------------------------------------------------
create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------
-- user_profiles
-- One row per authenticated user. Created automatically on signup
-- via trigger on auth.users.
-- ---------------------------------------------------------------------
create table if not exists public.user_profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.user_profiles enable row level security;

create policy "Profiles are viewable by their owner"
  on public.user_profiles for select
  using (auth.uid() = id);

create policy "Users can insert their own profile"
  on public.user_profiles for insert
  with check (auth.uid() = id);

create policy "Users can update their own profile"
  on public.user_profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Auto-create a profile row whenever a new auth user is created.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.user_profiles (id, full_name)
  values (new.id, new.raw_user_meta_data ->> 'full_name');
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ---------------------------------------------------------------------
-- blogs
-- Public read for everyone (published posts). Writes restricted —
-- in production this would be limited to an "editor" role; for now
-- we lock writes down entirely (service role / dashboard only).
-- ---------------------------------------------------------------------
create table if not exists public.blogs (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text not null,
  content text not null,
  cover_image_url text,
  author_name text not null default 'TWI Team',
  category text not null default 'Neuroscience',
  published boolean not null default true,
  published_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

alter table public.blogs enable row level security;

create policy "Published blogs are publicly readable"
  on public.blogs for select
  using (published = true);

-- ---------------------------------------------------------------------
-- courses
-- Public catalog, publicly readable. Enrollment/progress lives in a
-- separate table so course metadata stays cheap to read for anyone.
-- ---------------------------------------------------------------------
create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text not null,
  category text not null default 'Neuroscience',
  level text not null default 'Beginner' check (level in ('Beginner','Intermediate','Advanced')),
  total_lessons int not null default 1 check (total_lessons > 0),
  duration_hours numeric not null default 1,
  cover_image_url text,
  created_at timestamptz not null default now()
);

alter table public.courses enable row level security;

create policy "Courses are publicly readable"
  on public.courses for select
  using (true);

-- ---------------------------------------------------------------------
-- course_progress
-- Tracks each user's progress through a course.
-- Strict RLS: a user can only see/insert/update their OWN progress row.
-- ---------------------------------------------------------------------
create table if not exists public.course_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  course_id uuid not null references public.courses (id) on delete cascade,
  lessons_completed int not null default 0 check (lessons_completed >= 0),
  completed boolean not null default false,
  updated_at timestamptz not null default now(),
  unique (user_id, course_id)
);

alter table public.course_progress enable row level security;

create policy "Users can view their own progress"
  on public.course_progress for select
  using (auth.uid() = user_id);

create policy "Users can insert their own progress"
  on public.course_progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own progress"
  on public.course_progress for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete their own progress"
  on public.course_progress for delete
  using (auth.uid() = user_id);

-- ---------------------------------------------------------------------
-- contact_messages
-- Anyone (incl. anonymous) can INSERT (submit the contact form).
-- Nobody can SELECT from the client — read only via dashboard/service role.
-- ---------------------------------------------------------------------
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

create policy "Anyone can submit a contact message"
  on public.contact_messages for insert
  with check (true);

-- Explicitly: no select/update/delete policy exists for anon/authenticated,
-- so those operations are denied by default with RLS enabled.

-- ---------------------------------------------------------------------
-- updated_at helper trigger (blogs/courses don't need it; profiles/progress do)
-- ---------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_updated_at on public.user_profiles;
create trigger set_updated_at before update on public.user_profiles
  for each row execute procedure public.set_updated_at();

drop trigger if exists set_updated_at on public.course_progress;
create trigger set_updated_at before update on public.course_progress
  for each row execute procedure public.set_updated_at();

-- ---------------------------------------------------------------------
-- Seed data (safe to re-run)
-- ---------------------------------------------------------------------
insert into public.blogs (slug, title, excerpt, content, category, author_name)
values
  ('rewiring-stigma', 'Rewiring the Conversation Around Stigma', 'What neuroscience actually tells us about mental illness — and why the "chemical imbalance" story is too simple.', 'Full article body goes here.', 'Mental Health', 'Anya Kapoor'),
  ('teen-brain-development', 'What Is Actually Happening in a Teenage Brain', 'Synaptic pruning, the limbic system, and why adolescence is not a design flaw.', 'Full article body goes here.', 'Neuroscience', 'Rahul Mehta'),
  ('workshop-recap-june', 'Workshop Recap: Neuroscience 101 for High Schoolers', 'Highlights, questions, and the moment forty students realized memory is not a recording.', 'Full article body goes here.', 'Community', 'TWI Team')
on conflict (slug) do nothing;

insert into public.courses (slug, title, description, category, level, total_lessons, duration_hours)
values
  ('intro-to-neuroscience', 'Introduction to Neuroscience', 'A beginner-friendly tour of the brain: neurons, neurotransmitters, and how thought physically happens.', 'Neuroscience', 'Beginner', 8, 6),
  ('mental-health-first-aid', 'Youth Mental Health First Aid', 'Recognize warning signs, respond with care, and know when and how to get someone real help.', 'Mental Health', 'Beginner', 6, 4),
  ('neuro-research-methods', 'Research Methods in Cognitive Science', 'How psych and neuro studies are actually designed — and how to read one critically.', 'Research', 'Intermediate', 10, 9)
on conflict (slug) do nothing;
