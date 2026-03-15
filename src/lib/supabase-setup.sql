-- ============================================================
-- MakeUGC — Supabase Setup Script
-- Run this entire file in the Supabase SQL Editor in one go.
-- ============================================================

-- 1. TABLE
create table if not exists services (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  category     text not null,
  type         text not null check (type in ('self-serve', 'managed')),
  icon_key     text not null,
  keywords     text[] not null default '{}',
  niches       text[] not null default '{}',
  search_vector tsvector
);

-- 2. TRIGGER FUNCTION FOR SEARCH
-- We use a trigger because array_to_string is not immutable and fails in generated columns
create or replace function services_search_trigger() returns trigger as $$
begin
  new.search_vector :=
    to_tsvector('english', coalesce(new.name, '')) ||
    to_tsvector('english', coalesce(new.category, '')) ||
    to_tsvector('english', array_to_string(new.keywords, ' '));
  return new;
end
$$ language plpgsql;

-- 3. CREATE TRIGGER
drop trigger if exists services_search_update on services;
create trigger services_search_update
before insert or update on services
for each row execute function services_search_trigger();

-- 4. GIN INDEX
create index if not exists services_search_idx
  on services using gin(search_vector);

-- 5. RPC FUNCTION
create or replace function search_services(
  query  text,
  niche  text default null
)
returns setof services
language sql stable as $$
  select * from services
  where
    search_vector @@ plainto_tsquery('english', query)
    and (
      niche is null
      or niche = any(niches)
      or array_length(niches, 1) is null
    )
  order by
    ts_rank(search_vector, plainto_tsquery('english', query)) desc
  limit 6;
$$;

-- 5. SEED DATA
insert into services (name, category, type, icon_key, keywords, niches) values
  (
    'Creator Hiring',
    'Talent',
    'self-serve',
    'users',
    array['creator','hire','talent','influencer','ugc creator','find creator'],
    array[]::text[]
  ),
  (
    'AI UGC Generation',
    'AI',
    'managed',
    'robot',
    array['ai','ugc','artificial','generate','avatar','ai content','ai video'],
    array[]::text[]
  ),
  (
    'Local Language UGC',
    'Localisation',
    'managed',
    'translate',
    array['local','language','hindi','regional','vernacular','translate','bhojpuri','tamil','marathi'],
    array[]::text[]
  ),
  (
    'Video & Photo Production',
    'Production',
    'managed',
    'video',
    array['video','photo','shoot','production','ads','content','reel','film'],
    array[]::text[]
  ),
  (
    'Creative Strategy & Meta Ads',
    'Marketing',
    'managed',
    'lightbulb',
    array['meta','ads','strategy','facebook','instagram','performance','creative'],
    array[]::text[]
  ),
  (
    'Event & On-Ground Collabs',
    'Events',
    'managed',
    'ticket',
    array['event','collab','on-ground','activation','launch','pop-up','offline'],
    array[]::text[]
  );
